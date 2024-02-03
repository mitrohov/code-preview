<template>
  <Dialog
      v-model:visible="props.show"
      modal
      header="Предупреждение о удалении"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      @update:visible="$emit('close')"
  >
    <div>
      Вы уверены, что хотите удалить событие?
    </div>
    <div class="d-flex justify-between mt-20">
      <div>
        <Button label="Отменить" severity="secondary" @click="$emit('close')" />
      </div>
      <div>
        <Button label="Удалить" severity="danger" @click="$emit('delete')" />
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "delete"): void;
}>();
</script>
