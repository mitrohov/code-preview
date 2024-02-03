<template>
  <div v-if="!isLoading" class="form">
    <div>
      <Button label="Назад" severity="secondary" @click="routeToPaymentsTable" />
    </div>
    <div v-if="!route.query.id" class="form_title">
      Новая оплата
    </div>
    <ui-input-text
        v-model="title"
        :error-message="errors.title"
        id="payment-title"
        label="Название платежа"
    />
    <ui-dropdown
        v-if="studentStore.students.length > 0"
        :model-value="student_id"
        :error-message="errors.student_id"
        :options="studentStore.students"
        optionLabel="fio"
        optionValue="id"
        label="Ученик"
        id="student"
        :disabled="route.query.id"
        @update:model-value="updateSelectedStudent($event)"
    />
    <div v-if="studentStore.selectedStudent" class="payment-form_lesson_cost">
      <div>
        Стоимость одного занятия - {{ studentStore.selectedStudent?.lesson_cost }} рублей
      </div>
      <div>
        Занятий в месяц - {{ studentStore.selectedStudent?.qty_lessons_per_month }}
      </div>
    </div>
    <ui-input-number
        v-model="sum"
        :error-message="errors.sum"
        :min="500"
        :max="20000"
        type="text"
        id="sum"
        label="Сумма"
    />
    <ui-input-number
        v-model="lesson_qty"
        :error-message="errors.lesson_qty"
        :min="1"
        :max="20"
        type="text"
        id="sum"
        label="Количество уроков"
    />
    <ui-calendar
        v-model="date"
        id="date"
        label="Дата оплаты"
    />
    <div class="mt-20">
      <Button label="Сохранить" @click="onSubmit" />
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import {useStudentStore} from '~/stores/students'
import type { PostPayment, PatchPayment } from "~/server/types/payment"
import {PostPaymentSchema} from "~/server/schemas/payment"
import {useForm} from "vee-validate";
import moment from "moment/moment";

const router = useRouter()
const route = useRoute()
const studentStore = useStudentStore()
const isLoading = ref<boolean>(false)
const apiService = useApiService()

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostPaymentSchema,
});

const [title] = defineField('title');
const [date] = defineField('date');
const [sum] = defineField('sum');
const [lesson_qty] = defineField('lesson_qty');
const [student_id] = defineField('student_id');

const updateSelectedStudent = (studentId: number) => {
  studentStore.selectedStudentId = studentId
  student_id.value = studentId
}

const routeToPaymentsTable = () => {
  router.push('/payments')
}

const setValues = (data: PostPayment) => {
  title.value = data.title
  date.value = data.date
  sum.value = data.sum
  lesson_qty.value = data.lesson_qty
  student_id.value = data.student_id
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) {
    const body = { id: Number(route.query.id), ...values } as PatchPayment
    await apiService.payments.updateOneById(body, body.id)
  } else {
    const body = { ...values } as PostPayment
    await apiService.payments.createOne(body)
  }
  routeToPaymentsTable()
});

onMounted(async () => {
  isLoading.value = true
  await apiService.students.getAll()

  if (route.query.id) {
    const response = await apiService.payments.getOneById(Number(route.query.id))
    setValues(response as PostPayment)
  } else {
    date.value = moment().format('X')
  }
  isLoading.value = false
})
</script>
