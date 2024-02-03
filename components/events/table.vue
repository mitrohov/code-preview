<template>
  <div class="card">
    <data-table
        v-model:filters="filters"
        :value="props.events"
        dataKey="id"
        filterDisplay="row"
        :globalFilterFields="globalFilterFields"
    >
      <column field="time" header="Дата и время">
        <template #body="{ data }">
          <div class="d-flex flex-column" style="width: 130px">
            <div>С {{ moment.unix(data.start_time).format('HH:mm DD-MM-YYYY') }}</div>
            <div>До {{ moment.unix(data.end_time).format('HH:mm DD-MM-YYYY') }}</div>
          </div>
        </template>
      </column>
      <column field="title" header="Событие">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="event_category_title" header="Категория">
        <template #body="{ data }">
          <ui-tag
              :background="data.color_code"
              :title="data.event_category_title"
              :padding="'10px'"
              :color="'black'"
          />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="eventsStore.eventCategoryTitles"
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
      <column field="student_fio" header="Ученик">
        <template #body="{ data }">
          <template v-if="data.is_lesson">{{ data.student_fio }}</template>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="eventsStore.studentsFio"
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
      <column field="payment_is_not_pay" header="Оплата">
        <template #body="{ data }">
          <template v-if="data.is_lesson">
            <div v-if="!data.payment_is_not_pay">
              {{ data.payment_title }}
            </div>
            <Tag v-else severity="danger" value="Нет" style="padding: 5px 8px" />
          </template>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <TriStateCheckbox
              v-model="filterModel.value"
              @change="filterCallback()"
          />
        </template>
      </column>
      <column field="has_home_work" header="Дом. раб.">
        <template #body="{ data }">
          <template v-if="data.is_lesson">
            <Tag v-if="data.has_home_work" severity="success" value="Есть" style="padding: 5px 8px" />
            <Tag v-else severity="warning" value="Нет" style="padding: 5px 8px" />
          </template>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <TriStateCheckbox
              v-model="filterModel.value"
              @change="filterCallback()"
          />
        </template>
      </column>
      <column field="is_missed" header="Пропуск">
        <template #body="{ data }">
          <template v-if="data.is_lesson">
            <Tag v-if="data.is_missed" severity="danger" value="Пропуск" style="padding: 5px 8px" />
            <Tag v-else severity="success" value="Нет" style="padding: 5px 8px" />
          </template>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <TriStateCheckbox
              v-model="filterModel.value"
              @change="filterCallback()"
          />
        </template>
      </column>
      <column field="">
        <template #body="{ data }">
          <ui-table-context-nav
              :items="contextItems"
              @onAction="emit('selectedId', data.id)"
          />
        </template>
      </column>
    </data-table>
  </div>
</template>

<script lang="ts" setup>
import {FilterMatchMode} from 'primevue/api';
import type { TableContextItem } from "~/server/types/table-context-Item"
import moment from 'moment';

const props = defineProps<{
  events: Event[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();

const eventsStore = useEventsStore()
const globalFilterFields = ref<string[]>([
  'title',
  'event_category_title',
  'student_fio.name',
  'has_home_work',
  'payment_is_not_pay',
  'is_missed'
])

const filters = ref({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  event_category_title: { value: null, matchMode: FilterMatchMode.EQUALS },
  student_fio: { value: null, matchMode: FilterMatchMode.EQUALS },
  has_home_work: { value: null, matchMode: FilterMatchMode.EQUALS },
  payment_is_not_pay: { value: null, matchMode: FilterMatchMode.NOT_EQUALS },
  is_missed: { value: null, matchMode: FilterMatchMode.EQUALS },
});
</script>

<style lang="scss">
.p-column-filter-menu-button,
.p-column-filter-clear-button {
  display: none;
}
</style>
