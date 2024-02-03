<template>
  <div class="ui-knob">
    <div v-if="props.title" class="ui-knob_title">{{ props.title }}</div>
    <div class="ui-knob_element">
      <Knob
          v-model="props.value"
          :size="props.size"
          :valueTemplate="props.valueTemplate"
          :readonly="props.readonly"
          :valueColor="valueColor"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  value: number;
  size?: number;
  valueTemplate?: string;
  readonly?: boolean;
  min: number;
  max: number;
  title: string | null;
  valueColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  size: 100,
  valueTemplate: '{value}',
  readonly: false,
  min: 0,
  max: 100,
  title: null,
  valueColor: 'var(--gray-400, LightGray)'
})
</script>

<style lang="scss" scoped>
.ui-knob {
  &_title {
    margin-bottom: 10px;
    font-size: 16px;
    display: flex;
    justify-content: center;
  }
  &_element {
    display: flex;
    justify-content: center;
  }
}
</style>
