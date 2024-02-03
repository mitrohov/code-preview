<template>
  <div v-if="props.categories.length > 0" class="card">
    <data-table :value="props.categories">
      <column field="title" header="Категория"></column>
      <column field="title" header="Цвет">
        <template #body="{ data }">
          <ui-tag
              :background="data.color_code"
              :title="data.color_title"
              :padding="'10px'"
              :color="'black'"
          />
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

const props = defineProps<{
  categories: Event[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();
</script>
