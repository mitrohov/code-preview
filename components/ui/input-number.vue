<template>
  <div class="d-flex flex-column">
    <label :for="props.id">{{ props.label }}</label>
    <input-number
        :modelValue="props.modelValue"
        :class="{ 'p-invalid' : props.errorMessage }"
        :id="props.id"
        :min="props.min"
        :max="props.max"
        :label="props.label"
        class="mt-5"
        @update:modelValue="emit('update:modelValue', $event)"
    />
    <small v-if="props.errorMessage" class="p-error mt-5" id="text-error">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: number | undefined;
  min?: number;
  max?: number;
  id: string;
  label: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: number): number;
}>();
</script>
