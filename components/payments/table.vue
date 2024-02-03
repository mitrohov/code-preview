<template>
  <div class="event-table">
    <data-table
        v-if="props.payments.length > 0"
        :value="props.payments"
        v-model:filters="filters"
        :globalFilterFields="globalFilterFields"
        filterDisplay="row"
    >
      <column field="student_fio" header="Ученик">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="paymentsStore.students"
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
      <column field="title" header="Название платежа">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="date" header="Дата платежа">
        <template #body="{ data }">
          {{ moment.unix(data.date).format('DD-MM-YYYY') }}
        </template>
      </column>
      <column field="sum" header="Сумма">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="lesson_qty" header="Оплачено уроков">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="qty_lessons_left" header="Осталось уроков">
        <template #body="{ data }">
          <template v-if="data.qty_lessons_left > '1'">
            {{ data.qty_lessons_left }}
          </template>
          <template v-else-if="data.qty_lessons_left === '1'">
            <Tag severity="warning" :value="data.qty_lessons_left" style="padding: 5px 8px" />
          </template>
          <template v-else-if="data.qty_lessons_left === '0'">
            <Tag severity="danger" :value="data.qty_lessons_left" style="padding: 5px 8px" />
          </template>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
              style="width: 120px"
          />
        </template>
      </column>
      <column field="" header="Уроки">
        <template #body="{ data }">
          <div class="event-table_events">
            <div v-for="(event, index) in data.events" :key="index">
              <template v-if="event.title && event.start_time">
                <div>
                  {{ event.title }}
                </div>
                <div>
                  {{ moment.unix(event.start_time).format('DD-MM-YYYY HH:mm') }}
                </div>
              </template>
              <template v-else>
                Нет
              </template>
            </div>
          </div>
        </template>
      </column>
      <column field="">
        <template #body="{ data }">
          <ui-table-context-nav :items="contextItems" @onAction="emit('selectedId', data.id)" />
        </template>
      </column>
    </data-table>
    <div v-else>Нет добавленных оплат</div>
  </div>
</template>

<script lang="ts" setup>
import type { GetPayment } from "~/server/types/payment"
import type { TableContextItem } from "~/server/types/table-context-Item"
import moment from 'moment';
import {FilterMatchMode} from "primevue/api";

const props = defineProps<{
  payments: GetPayment[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();

const paymentsStore = usePaymentsStore()

const globalFilterFields = ref<string[]>([
  'title',
  'sum',
  'lesson_qty',
  'qty_lessons_left',
  'student_fio'
])

const filters = ref({
  title: { value: null, matchMode: FilterMatchMode.CONTAINS },
  sum: { value: null, matchMode: FilterMatchMode.CONTAINS },
  lesson_qty: { value: null, matchMode: FilterMatchMode.CONTAINS },
  qty_lessons_left: { value: null, matchMode: FilterMatchMode.CONTAINS },
  student_fio: { value: null, matchMode: FilterMatchMode.EQUALS }
});
</script>

<style lang="scss">
.event-table {
  &_events {
    display: grid;
    grid-row-gap: 5px;
  }
}
</style>
