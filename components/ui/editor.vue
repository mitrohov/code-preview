<template>
  <label :for="props.id">{{ props.label }}</label>
  <div class="card">
    <Editor
        :id="props.id"
        :modelValue="props.modelValue"
        editorStyle="height: 320px"
        @update:modelValue="emit('update:modelValue', $event)"
    />
  </div>
</template>

<script lang="ts" setup>
import Editor from 'primevue/editor';

const props = defineProps<{
  modelValue: string | undefined;
  id: string;
  label: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): string;
}>();
</script>
