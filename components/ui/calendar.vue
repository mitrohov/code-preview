<template>
  <div class="d-flex flex-column">
    <label :for="props.id">{{ props.label }}</label>
    <div class="d-flex">
      <Calendar
          :modelValue="value"
          :showTime="props.showTime"
          :timeOnly="props.timeOnly"
          :id="props.id"
          :label="props.label"
          dateFormat="dd-mm-yy"
          class="mt-5 w-full"
          @update:modelValue="$emit('update:modelValue', moment($event).format('X'))"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import moment from 'moment';

const props = defineProps<{
  modelValue: string | undefined;
  id: string;
  label: string;
  timeOnly?: boolean;
  showTime?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): string;
  (e: "delete"): void;
}>();

const value = computed((): Date => {
  return moment.unix(Number(props.modelValue)).toDate()
})
</script>

<style lang="scss" scoped>
#deleteBtn {
  height: 34.5px;
  width: 34.5px;
  margin-top: 5px;
}
</style>
