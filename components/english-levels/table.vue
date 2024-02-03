<template>
  <div v-if="props.englishLevels.length > 0" class="card">
    <data-table :value="props.englishLevels">
      <column field="title" header="Категория"></column>
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

const props = defineProps<{
  englishLevels: GetEnglishLevel[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();
</script>
