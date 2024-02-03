<template>
  <div v-if="!isLoading" class="student-form">
    <div class="student-form">
      <div>
        <Button label="Назад" severity="secondary" @click="routeToStudentsTable" />
      </div>
      <div v-if="!route.query.id" class="student-form_title">
        Новый ученик
      </div>
      <ui-input-text
          v-model="fio"
          :error-message="errors.fio"
          id="fio"
          label="ФИО"
      />
      <ui-input-number
          v-model="qty_lessons_per_month"
          :error-message="errors.qty_lessons_per_month"
          :min="1"
          :max="20"
          type="text"
          id="qtyLessons"
          label="Количество занятий в месяц"
      />
      <ui-input-number
          v-model="qty_lessons_per_week"
          :error-message="errors.qty_lessons_per_week"
          :min="1"
          :max="20"
          type="text"
          id="qtyLessons"
          label="Количество занятий в неделю"
      />
      <ui-input-number
          v-model="lesson_cost"
          :error-message="errors.lesson_cost"
          :min="500"
          :max="3000"
          id="lessonCost"
          label="Стоимость урока"
      />
      <ui-input-number
          v-model="lesson_time"
          :error-message="errors.lesson_time"
          :min="30"
          :max="120"
          id="lessonTime"
          label="Время урока в минутах"
      />
      <ui-input-text
          v-model="phone"
          :error-message="errors.phone"
          id="phone"
          label="Мобильный телефон"
      />
      <ui-input-number
          v-model="day_month_of_payment"
          :error-message="errors.day_month_of_payment"
          :min="1"
          :max="31"
          id="lessonTime"
          label="Число месяца для оплаты"
      />
      <ui-dropdown
          v-if="englishLevelsStore.englishLevels.length > 0"
          v-model="english_level_id"
          :error-message="errors.english_level_id"
          :options="englishLevelsStore.englishLevels"
          optionLabel="title"
          optionValue="id"
          label="Категория"
          id="english-level"
      />
      <ui-dropdown
          v-if="purposesLessonStore.purposesLesson.length > 0"
          v-model="purpose_lesson_id"
          :error-message="errors.purpose_lesson_id"
          :options="purposesLessonStore.purposesLesson"
          optionLabel="title"
          optionValue="id"
          label="Цель занятий"
          id="purpose-lesson-id"
      />
      <ui-editor
          v-model="social"
          id="social"
          label="Социальные сети"
      />
      <ui-editor
          v-model="description"
          id="wishes"
          label="Пожелания к урокам"
      />
      <div class="student-form_schedule">
        Расписание
      </div>
      <students-form-schedule
          v-for="(schedule, index) in schedulesForUpdate"
          :key="index"
          :schedule="schedule"
          :delete-btn="index > 0"
          @updateDayWeek="updateDayWeek($event, index, 'schedulesForUpdate')"
          @updateTime="updateTime($event, index, 'schedulesForUpdate')"
          @delete="deleteSchedule(index, 'schedulesForUpdate')"
      />
      <students-form-schedule
          v-for="(schedule, index) in schedulesForCreate"
          :key="index"
          :schedule="schedule"
          :delete-btn="!(index === 0 && schedulesForUpdate.length === 0)"
          @updateDayWeek="updateDayWeek($event, index, 'schedulesForCreate')"
          @updateTime="updateTime($event, index, 'schedulesForCreate')"
          @delete="deleteSchedule(index, 'schedulesForCreate')"
      />
      <div>
        <Button icon="pi pi-plus" size="small" label="Добавить занятие" @click="addSchedule" />
      </div>

      <div class="mt-20">
        <Button label="Сохранить" @click="onSubmit" />
      </div>
    </div>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type { PostStudent, PatchStudent } from "~/server/types/student"
import type { PostSchedule, PathSchedule } from "~/server/types/schedule"
import {PostStudentSchema} from "~/server/schemas/student"
import { useForm } from 'vee-validate';
import moment from "moment/moment";

const router = useRouter()
const route = useRoute()
const purposesLessonStore = usePurposesLessonStore()
const englishLevelsStore = useEnglishLevelsStore()
const apiService = useApiService()
const schedulesForCreate = ref<PostSchedule[]>([])
const schedulesForUpdate = ref<PathSchedule[]>([])
const isLoading = ref<boolean>(false)

type SchedulesArray = 'schedulesForUpdate' | 'schedulesForCreate'

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: PostStudentSchema,
});

const [fio] = defineField('fio');
const [qty_lessons_per_month] = defineField('qty_lessons_per_month');
const [lesson_cost] = defineField('lesson_cost');
const [description] = defineField('description');
const [lesson_time] = defineField('lesson_time');
const [day_month_of_payment] = defineField('day_month_of_payment');
const [qty_lessons_per_week] = defineField('qty_lessons_per_week');
const [purpose_lesson_id] = defineField('purpose_lesson_id');
const [english_level_id] = defineField('english_level_id');
const [social] = defineField('social');
const [phone] = defineField('phone');

const updateDayWeek = (dayWeek: number, index: number, array: SchedulesArray) => {
  if (array === 'schedulesForUpdate') {
    schedulesForUpdate.value[index].day_week = dayWeek
  }
  if (array === 'schedulesForCreate') {
    schedulesForCreate.value[index].day_week = dayWeek
  }
}

const updateTime = (time: string, index: number, array: SchedulesArray) => {
  if (array === 'schedulesForUpdate') {
    schedulesForUpdate.value[index].time = time
  }
  if (array === 'schedulesForCreate') {
    schedulesForCreate.value[index].time = time
  }
}

const addSchedule = () => {
  const studentId = route.query.id ? Number(route.query.id) : 0
  schedulesForCreate.value.push({ student_id: studentId, day_week: 1, time: moment().format('X') })
}

const deleteSchedule = async (index: number, array: SchedulesArray) => {
  if (array === 'schedulesForUpdate') {
    await apiService.schedules.deleteOneById(schedulesForUpdate.value[index].id)
    schedulesForUpdate.value.splice(index, 1);
  }
  if (array === 'schedulesForCreate') {
    schedulesForCreate.value.splice(index, 1);
  }
}

const routeToStudentsTable = () => {
  router.push('/students')
}

const updateStudent = async () => {
  const body = { id: Number(route.query.id), ...values } as PatchStudent
  await apiService.students.updateOneById(body, body.id)
  await apiService.schedules.updateMany(schedulesForUpdate.value)
  if (schedulesForCreate.value.length) {
    await apiService.schedules.createMany(schedulesForCreate.value)
  }
  await apiService.students.getAll()
}

const createSchedule = async (studentId: number) => {
  schedulesForCreate.value.forEach(schedule => {
    schedule.student_id = studentId
  })

  await apiService.schedules.createMany(schedulesForCreate.value)
}

const createStudent = async () => {
  const body = { ...values } as PostStudent
  const studentRes = await apiService.students.createOne(body)

  if (studentRes?.rowCount === 1) {
    await createSchedule(studentRes.rows[0].id)
  }

  await apiService.students.getAll()
}

const onSubmit = handleSubmit(async (values) => {
  if (route.query.id) await updateStudent()
  else await createStudent()
  routeToStudentsTable()
});

const setValues = (data: PostStudent) => {
  fio.value = data.fio
  qty_lessons_per_month.value = data.qty_lessons_per_month
  lesson_cost.value = data.lesson_cost
  description.value = data.description
  lesson_time.value = data.lesson_time
  day_month_of_payment.value = data.day_month_of_payment
  qty_lessons_per_week.value = data.qty_lessons_per_week
  purpose_lesson_id.value = data.purpose_lesson_id
  english_level_id.value = data.english_level_id
  social.value = data.social
  phone.value = data.phone
}

onMounted(async () => {
  await Promise.all([apiService.englishLevels.getAll(), apiService.purposeLessons.getAll()])
  purpose_lesson_id.value = purposesLessonStore.purposesLesson[0].id
  english_level_id.value = englishLevelsStore.englishLevels[0].id

  if (route.query.id) {
    const response = await apiService.students.getOneById(Number(route.query.id))
    const res = await apiService.schedules.getAllByStudentId(Number(route.query.id))
    if (res) schedulesForUpdate.value = res as PathSchedule[]
    if (response) setValues(response as PostStudent)
  } else {
    phone.value = ''
    social.value = ''
    description.value = ''

    addSchedule()
  }
})
</script>

<style lang="scss" scoped>
.student-form {
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;

  &_title {
    font-size: 26px;
    font-weight: 500;
  }
  &_schedule {
    margin-top: 20px;
    font-weight: 500;
    font-size: 20px;
  }
  &_schedule-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
