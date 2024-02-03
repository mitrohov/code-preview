<template>
  <div v-if="props.contacts.length > 0" class="card">
    <data-table
        v-model:filters="filters"
        :value="props.contacts"
        :globalFilterFields="globalFilterFields"
        scrollable
        scrollHeight="calc(100vh - 140px)"
        filterDisplay="row"
    >
      <column field="fio" header="ФИО">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
          />
        </template>
      </column>
      <column field="mobile_number" header="Мобильный номер">
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
          />
        </template>
      </column>
      <column field="socials" header="Социальные сети">
        <template #body="{ data }">
          <div v-html="data.socials"></div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
          />
        </template>
      </column>
      <column field="description" header="Описание">
        <template #body="{ data }">
          <div v-html="data.description"></div>
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
              v-model="filterModel.value"
              type="text" @input="filterCallback()"
              class="p-column-filter"
          />
        </template>
      </column>
      <column field="order_platform_title" header="Откуда контакт">
        <template #filter="{ filterModel, filterCallback }">
          <Dropdown
              v-model="filterModel.value"
              :options="orderPlatformsStore.orderPlatformTitles"
              :showClear="true"
              class="p-column-filter"
              style="width: 140px"
              @change="filterCallback()"
          >
            <template #option="slotProps">
              <div>{{ slotProps.option }}</div>
            </template>
          </Dropdown>
        </template>
      </column>
      <column field="">
        <template #body="{ data }">
          <ui-table-context-nav :items="contextItems" @onAction="emit('selectedId', data.id)" />
        </template>
      </column>
    </data-table>
  </div>
  <div v-else>
    Нет данных
  </div>
</template>

<script lang="ts" setup>
import type { TableContextItem } from "~/server/types/table-context-Item"
import type {GetEnglishLevel} from "~/server/types/english-level";
import {FilterMatchMode} from "primevue/api";

const apiService = useApiService()

const props = defineProps<{
  contacts: GetEnglishLevel[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();

const orderPlatformsStore = useOrderPlatformsStore()

const globalFilterFields = ref<string[]>([
  'fio',
  'mobile_number',
  'socials',
  'description',
  'order_platform_title'
])

const filters = ref({
  fio: { value: null, matchMode: FilterMatchMode.CONTAINS },
  mobile_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
  socials: { value: null, matchMode: FilterMatchMode.CONTAINS },
  description: { value: null, matchMode: FilterMatchMode.CONTAINS },
  order_platform_title: { value: null, matchMode: FilterMatchMode.EQUALS }
});
</script>

<style lang="scss">
.p-column-filter-menu-button,
.p-column-filter-clear-button {
  display: none;
}
</style>
