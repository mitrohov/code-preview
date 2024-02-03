<template>
  <div class="d-flex flex-column">
    <label :for="props.id">{{ props.label }}</label>
    <input-text
        :modelValue="props.modelValue"
        :class="{ 'p-invalid' : props.errorMessage }"
        :label="props.label"
        type="text" :id="props.id"
        class="mt-5"
        @update:modelValue="$emit('update:modelValue', $event)"
    />
    <small v-if="props.errorMessage" class="p-error mt-5" id="text-error">
      {{ errorMessage }}
    </small>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string | undefined;
  id: string;
  label: string;
  errorMessage?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): string;
}>();
</script>
