<template>
  <div class="d-flex justify-end">
    <Button
        type="button"
        icon="pi pi-ellipsis-v"
        aria-haspopup="true"
        aria-controls="overlay_menu"
        size="small"
        outlined
        @click="toggle"
    />
    <Menu
        :model="props.items"
        :popup="true"
        ref="menu"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableContextItem } from "~/server/types/table-context-Item"

const props = defineProps<{
  items: TableContextItem[];
}>();

const emit = defineEmits<{
  (e: "onAction"): void;
}>();

const menu = ref();

const toggle = (event: Event) => {
  menu.value.toggle(event);
  emit('onAction')
};
</script>
