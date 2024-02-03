<template>
  <div class="d-flex flex-column">
    <label :for="props.id">{{ props.label }}</label>
    <Dropdown
        :modelValue="props.modelValue"
        :options="props.options"
        :optionLabel="props.optionLabel"
        :optionValue="props.optionValue"
        :label="props.label"
        :class="{ 'p-invalid' : props.errorMessage }"
        :disabled="props.disabled"
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
  modelValue: string | number | undefined;
  label: string;
  optionLabel: string;
  optionValue: string;
  options: any;
  errorMessage?: string;
  disabled?: boolean
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): string;
}>();
</script>



