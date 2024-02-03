<template>
  <div class="card">
    <data-table
        v-if="props.students.length > 0"
        v-model:filters="filters"
        :value="props.students"
        :globalFilterFields="globalFilterFields"
        filterDisplay="row"
    >
      <column field="fio" header="ФИО">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="english_level_title" header="Уровень">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="englishLevelsStore.englishLevelTitles"
              :showClear="true"
              class="p-column-filter"
              style="width: 100px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="qty_lessons_per_week" header="Количество занятий в неделю">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="studentStore.qtyLessonsPerWeekValues"
              :showClear="true"
              class="p-column-filter"
              style="width: 80px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="purpose_lesson_title" header="Цель занятий">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="purposesLessonStore.purposeLessonTitles"
              :showClear="true"
              class="p-column-filter"
              style="width: 120px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="lesson_time" header="Длительность урока">
        <template #body="{ data }">
          <div>{{ data.lesson_time }} мин.</div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="studentStore.lessonTimeValues"
              :showClear="true"
              class="p-column-filter"
              style="width: 90px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="payment_amount_per_month" header="Оплата в месяц">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="studentStore.paymentAmountPerMonthValues"
              :showClear="true"
              class="p-column-filter"
              style="width: 100px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="day_month_of_payment" header="Дата оплаты">
        <template #body="{ data }">
          <div>Каждое {{ data.day_month_of_payment }} число месяца</div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="studentStore.dayMonthOfPaymentValues"
              :showClear="true"
              class="p-column-filter"
              style="width: 80px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="schedule" header="Расписание">
        <template #body="{ data }">
          <div style="width: 80px">
            <div v-for="(schedule, index) in data.schedules" :key="index">
              {{ studentStore.getDayWeek(schedule.day_week).shortLabel }} в
              {{ moment.unix(schedule.time).format('HH:mm') }}
            </div>
          </div>
        </template>
      </column>
      <column field="lesson_cost" header="Стоимость урока">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="">
        <template #body="{ data }">
          <ui-table-context-nav :items="contextItems" @onAction="emit('selectedId', data.id)" />
        </template>
      </column>
    </data-table>
    <div v-else>Нет добавленных студентов</div>
  </div>
</template>

<script lang="ts" setup>
import type { GetStudent } from "~/server/types/student"
import type { TableContextItem } from "~/server/types/table-context-Item"
import moment from "moment/moment";
import {FilterMatchMode} from "primevue/api";

const props = defineProps<{
  students: GetStudent[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();

const englishLevelsStore = useEnglishLevelsStore()
const purposesLessonStore = usePurposesLessonStore()
const studentStore = useStudentStore()

const globalFilterFields = ref<string[]>([
  'fio',
  'english_level_title',
  'qty_lessons_per_week',
  'purpose_lesson_title',
  'lesson_time',
  'payment_amount_per_month',
  'day_month_of_payment',
  'lesson_cost'
])

const filters = ref({
  fio: { value: null, matchMode: FilterMatchMode.CONTAINS },
  english_level_title: { value: null, matchMode: FilterMatchMode.EQUALS },
  qty_lessons_per_week: { value: null, matchMode: FilterMatchMode.EQUALS },
  purpose_lesson_title: { value: null, matchMode: FilterMatchMode.EQUALS },
  lesson_time: { value: null, matchMode: FilterMatchMode.EQUALS },
  payment_amount_per_month: { value: null, matchMode: FilterMatchMode.EQUALS },
  day_month_of_payment: { value: null, matchMode: FilterMatchMode.EQUALS },
  lesson_cost: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<style lang="scss">
.p-column-filter-menu-button,
.p-column-filter-clear-button {
  display: none;
}
</style>
