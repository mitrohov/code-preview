<template>
  <div v-if="props.orderPlatforms.length > 0" class="card">
    <data-table :value="props.orderPlatforms">
      <column field="title" header="Платформы"></column>
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
import type {TableContextItem} from "~/server/types/table-context-Item"
import type {GetOrderPlatform} from "~/server/types/order-platform";

const props = defineProps<{
  orderPlatforms: GetOrderPlatform[];
  contextItems: TableContextItem[]
}>();

const emit = defineEmits<{
  (e: "selectedId", id: number): number;
}>();
</script>
