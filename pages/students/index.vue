<template>
  <div v-if="!isLoading" class="student-page">
    <div class="d-flex justify-between">
      <Button
          label="Добавить нового ученика"
          class="mb-20"
          @click="openNewStudentForm"
      />
      <download-xlsx
          v-if="studentStore.students.length > 0"
          :data="studentStore.students"
          :fileName="'Ученики'"
      />
    </div>
    <students-table
        v-if="studentStore.students.length > 0"
        :students="studentStore.students"
        :contextItems="contextItems"
        @selectedId="studentStore.selectedStudentId = $event"
    />
    <div v-else>
      Нет добавленных учеников
    </div>
    <Dialog
        v-model:visible="showDeleteWarning"
        modal
        header="Предупреждение о удалении"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        Удаление ученика приведет к скрытию связанных с ним:<br>
        - Расписаний<br>
        - Событий<br>
        - Оплат<br><br>

        Вы уверены, что хотите продолжить?
      </div>
      <div class="d-flex justify-between mt-20">
        <div>
          <Button label="Отменить" severity="secondary" @click="showDeleteWarning = false" />
        </div>
        <div>
          <Button label="Удалить" severity="danger" @click="deleteStudent" />
        </div>
      </div>
    </Dialog>
    <Dialog
        v-model:visible="showStudentDescription"
        modal
        :header="studentStore.selectedStudent?.fio"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div
          v-if="studentStore.selectedStudent?.phone"
          v-html="studentStore.selectedStudent?.phone"
      ></div>
      <div v-else>У этого ученика нет мобильного номера</div>

      <div class="mt-10">
        <div
            v-if="studentStore.selectedStudent?.social"
            v-html="studentStore.selectedStudent?.social"
        ></div>
        <div v-else>У этого ученика нет социальный сетей</div>
      </div>
      <div class="mt-10">
        <div
            v-if="studentStore.selectedStudent?.description"
            v-html="studentStore.selectedStudent?.description"
        ></div>
        <div v-else>У этого ученика нет описания</div>
      </div>
    </Dialog>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import {useStudentStore} from '~/stores/students'
import {useEnglishLevelsStore} from '~/stores/english-levels'
import {usePurposesLessonStore} from '~/stores/purpose-lesson'
import {usePaymentsStore} from '~/stores/payments'
import {useEventCategoriesStore} from '~/stores/event-categories'
import type {TableContextItem} from "~/server/types/table-context-Item"
import type {PostEvent} from '~/server/types/event'
import moment from "moment/moment";

const router = useRouter()
const studentStore = useStudentStore()
const paymentsStore = usePaymentsStore()
const purposesLessonStore = usePurposesLessonStore()
const englishLevelsStore = useEnglishLevelsStore()
const eventCategoriesStore = useEventCategoriesStore()
const toast = useToast();
const apiService = useApiService()
const showDeleteWarning = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const showStudentDescription = ref<boolean>(false)

const openDescription = () => {
  if (studentStore.selectedStudent) {
    showStudentDescription.value = true
  }
}

const createLessonOnCurrentMonth = async () => {
  await Promise.all([
    apiService.payments.getAll(),
    apiService.eventCategories.getAll()
  ]);
  const paymentIsNotPay = paymentsStore.payments.find(payment => payment.is_not_pay);
  const categoryForLesson = eventCategoriesStore.eventCategories.find(category => category.for_lesson);
  const allNewEvents: PostEvent[] = [];

  if (studentStore.selectedStudent && paymentIsNotPay && categoryForLesson) {
    const { lesson_time } = studentStore.selectedStudent;

    studentStore.selectedStudent?.schedules?.forEach(schedule => {
      const start = moment.unix(Number(schedule.time));
      const startTime = start.format('HH:mm');
      const endTime = start.add(lesson_time, 'minutes').format('HH:mm');
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();

      while (currentMonth === currentDate.getMonth()) {
        const currentDayWeek = currentDate.getDay() === 0 ? 7 : currentDate.getDay(); // Преобразуем в формат от 1 до 7

        if (currentDayWeek === schedule.day_week) {
          const lessonDate = new Date(currentDate);
          lessonDate.setDate(lessonDate.getDate() - lessonDate.getDay() + schedule.day_week);

          const lessonStartTime = `${lessonDate.getFullYear()}-${(lessonDate.getMonth() + 1).toString().padStart(2, '0')}-${lessonDate.getDate().toString().padStart(2, '0')} ${startTime}`;
          const lessonEndTime = `${lessonDate.getFullYear()}-${(lessonDate.getMonth() + 1).toString().padStart(2, '0')}-${lessonDate.getDate().toString().padStart(2, '0')} ${endTime}`;

          if (studentStore.selectedStudentId) {
            allNewEvents.push({
              start_time: moment(lessonStartTime).format('X'),
              end_time: moment(lessonEndTime).format('X'),
              student_id: studentStore.selectedStudentId,
              event_category_id: categoryForLesson.id,
              title: 'Урок',
              has_home_work: false,
              description: '',
              payment_id: paymentIsNotPay.id,
              is_lesson: true,
              is_missed: false
            });
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    await apiService.events.createMany(allNewEvents)
  }
};

const createLessonOnNextMonth = async () => {
  await Promise.all([apiService.payments.getAll(), apiService.eventCategories.getAll()])
  const paymentIsNotPay = paymentsStore.payments.find(payment => payment.is_not_pay)
  const categoryForLesson = eventCategoriesStore.eventCategories.find(category => category.for_lesson)
  const allNewEvents: PostEvent[] = []

  if (studentStore.selectedStudent && paymentIsNotPay && categoryForLesson) {
    const { lesson_time } = studentStore.selectedStudent

    studentStore.selectedStudent?.schedules?.forEach(schedule => {
      const start = moment.unix(Number(schedule.time))
      const startTime = start.format('HH:mm')
      const endTime = start.add(lesson_time, 'minutes').format('HH:mm')
      const currentDate = new Date();
      const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

      while (nextMonth.getMonth() === currentDate.getMonth() + 1) {
        const currentDayWeek = nextMonth.getDay() === 0 ? 7 : nextMonth.getDay(); // Преобразуем в формат от 1 до 7

        if (currentDayWeek === schedule.day_week) {
          const lessonDate = new Date(nextMonth);
          lessonDate.setDate(lessonDate.getDate() - lessonDate.getDay() + schedule.day_week);

          const lessonStartTime = `${lessonDate.getFullYear()}-${(lessonDate.getMonth() + 1).toString().padStart(2, '0')}-${lessonDate.getDate().toString().padStart(2, '0')} ${startTime}`;
          const lessonEndTime = `${lessonDate.getFullYear()}-${(lessonDate.getMonth() + 1).toString().padStart(2, '0')}-${lessonDate.getDate().toString().padStart(2, '0')} ${endTime}`;

          if (studentStore.selectedStudentId) {
            allNewEvents.push({
              start_time: moment(lessonStartTime).format('X'),
              end_time: moment(lessonEndTime).format('X'),
              student_id: studentStore.selectedStudentId,
              event_category_id: categoryForLesson.id,
              title: 'Урок',
              has_home_work: false,
              description: '',
              payment_id: paymentIsNotPay.id,
              is_lesson: true,
              is_missed: false
            });
          }
        }
        nextMonth.setDate(nextMonth.getDate() + 1);
      }
    })

    await apiService.events.createMany(allNewEvents)
  }
}

const contextItems: TableContextItem[] = [
  {
    label: 'Создать уроки',
    items: [
      {
        label: 'На текущий месяц',
        icon: 'pi pi-book',
        command: () => {
          createLessonOnCurrentMonth()
        }
      },
      {
        label: 'На следующий месяц',
        icon: 'pi pi-book',
        command: () => {
          createLessonOnNextMonth()
        }
      },
    ]
  },
  {
    label: 'Действия',
    items: [
      {
        label: 'Посмотреть описание',
        icon: 'pi pi-file',
        command: () => {
          openDescription()
        }
      }
    ]
  },
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (studentStore.selectedStudentId) {
            router.push(`/students/form?id=${studentStore.selectedStudentId}`)
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          showDeleteWarning.value = true
        }
      }
    ]
  }
];

const deleteStudent = () => {
  if (studentStore.selectedStudentId) {
    apiService.students.deleteOneById(studentStore.selectedStudentId)
    showDeleteWarning.value = false
  }
}

const openNewStudentForm = () => {
  router.push('/students/form')
}

onMounted(async () => {
  isLoading.value = true
  if (studentStore.students.length === 0) await apiService.students.getAll()
  if (englishLevelsStore.englishLevels.length === 0) await apiService.englishLevels.getAll()
  if (purposesLessonStore.purposesLesson.length === 0) await apiService.purposeLessons.getAll()
  isLoading.value = false
})
</script>
