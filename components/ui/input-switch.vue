<template>
  <div class="ui-input-switch">
    <input-switch
        :modelValue="props.modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
    />
    <label :for="props.id">
      {{ props.modelValue ? props.trueLabel : falseLabel }}
    </label>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean | undefined;
  id: string;
  trueLabel: string;
  falseLabel: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): boolean;
}>();
</script>

<style lang="scss" scoped>
.ui-input-switch {
  display: flex;
  align-items: center;
  label {
    margin-left: 10px;
  }
}
</style>
