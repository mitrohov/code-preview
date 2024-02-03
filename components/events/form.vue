<template>
  <div v-if="!isLoading" class="form">
    <div v-if="showBackBtn">
      <Button label="Назад" @click="$emit('close')" />
    </div>
    <ui-input-switch
        v-model="is_lesson"
        id="has-home-work"
        true-label="Это урок английского"
        false-label="Это другое событие"
    />
    <ui-dropdown
        v-if="eventCategoriesStore.eventCategories.length > 0"
        v-model="event_category_id"
        :errorMessage="errors.event_category_id"
        :options="eventCategoriesStore.eventCategories"
        optionLabel="title"
        optionValue="id"
        label="Категория"
        id="student"
    />
    <ui-dropdown
        v-if="studentStore.students.length > 0 && is_lesson"
        v-model="student_id"
        :errorMessage="errors.student_id"
        :options="studentStore.students"
        optionLabel="fio"
        optionValue="id"
        label="Ученик"
        id="student"
    />
    <ui-dropdown
        v-if="availablePayments.length > 0 && is_lesson"
        v-model="payment_id"
        :errorMessage="errors.payment_id"
        :options="availablePayments"
        optionLabel="title"
        optionValue="id"
        label="Оплата за урок"
        id="payment"
    />
    <ui-input-text
        v-model="title"
        :error-message="errors.title"
        id="event-title"
        label="Название события"
    />
    <ui-input-switch
        v-if="is_lesson"
        v-model="has_home_work"
        id="has-home-work"
        true-label="Домашняя работа подготовлена"
        false-label="Домашняя работа не подготовлена"
    />
    <ui-input-switch
        v-if="is_lesson"
        v-model="is_missed"
        id="has-home-work"
        true-label="Урок пропущен"
        false-label="Урок не пропущен"
    />
    <ui-calendar
        v-model="start_time"
        showTime
        id="end_time"
        label="Время начала"
    />
    <ui-calendar
        v-model="end_time"
        showTime
        id="end_time"
        label="Время начала"
    />
    <ui-editor
        v-model="description"
        id="wishes"
        label="Описание события"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostEvent, PatchEvent } from "~/server/types/event"
import type { GetPayment } from "~/server/types/payment"
import {PostEventSchema} from "~/server/schemas/event"
import {useForm} from "vee-validate";
import moment from 'moment';

const apiService = useApiService()
const studentStore = useStudentStore()
const eventsStore = useEventsStore()
const eventCategoriesStore = useEventCategoriesStore()
const isLoading = ref<boolean>(false)
const availablePayments = ref<GetPayment[]>([])

const props = defineProps<{
  eventId: string | null
  showBackBtn: boolean
}>();

const emit = defineEmits<{
  (e: "saved"): void;
  (e: "close"): void;
}>();

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostEventSchema,
});

const [student_id] = defineField('student_id');
const [event_category_id] = defineField('event_category_id');
const [title] = defineField('title');
const [has_home_work] = defineField('has_home_work');
const [description] = defineField('description');
const [start_time] = defineField('start_time');
const [end_time] = defineField('end_time');
const [payment_id] = defineField('payment_id');
const [is_lesson] = defineField('is_lesson');
const [is_missed] = defineField('is_missed');

watch(() => is_lesson.value, (value) => {
  if (!value && availablePayments.value.length > 0) {
    const notPayId = availablePayments.value.find(payment => payment.is_not_pay)
    if (notPayId) {
      payment_id.value = notPayId.id
    }
  }
})

watch(() => student_id.value, async () => {
  await getPaymentsByStudentIdForLesson()
})

const loadFormData = async () => {
  if (studentStore.students.length === 0) {
    await apiService.students.getAll()
  }
  if (eventCategoriesStore.eventCategories.length === 0) {
    await apiService.eventCategories.getAll()
  }
}

const onSubmit = handleSubmit(async (values) => {
  if (props.eventId) {
    const body = { id: Number(props.eventId), ...values } as PatchEvent
    await apiService.events.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostEvent
    await apiService.events.createOne(body)
  }
  await apiService.payments.getAll()
  emit('saved')
});

const getPaymentsByStudentIdForLesson = async () => {
  const response = await apiService.payments.getByStudentIdForLesson(student_id.value)
  if (response) {
    availablePayments.value = response
  }
}

const setValues = (data: PostEvent) => {
  student_id.value = data.student_id
  event_category_id.value = data.event_category_id
  title.value = data.title
  has_home_work.value = data.has_home_work
  description.value = data.description
  start_time.value = data.start_time
  end_time.value = data.end_time
  payment_id.value = data.payment_id
  is_lesson.value = data.is_lesson
  is_missed.value = data.is_missed
}

onMounted(async () => {
  isLoading.value = true
  await loadFormData()

  if (props.eventId) {
    const response = await apiService.events.getOneById(Number(props.eventId))
    if (response) {
      setValues(response)
    }
  } else {
    if (eventsStore.copyEvent) {
      setValues(JSON.parse(JSON.stringify(eventsStore.copyEvent)))
      eventsStore.copyEvent = null
    } else {
      const forLessonCategory = eventCategoriesStore.eventCategories.find(category =>  category.for_lesson)
      if (forLessonCategory) event_category_id.value = forLessonCategory.id
      start_time.value = moment().format('X')
      end_time.value = moment().format('X')
      has_home_work.value = false
      description.value = ''
      is_lesson.value = true
      is_missed.value = false
    }
  }
  isLoading.value = false
})
</script>
