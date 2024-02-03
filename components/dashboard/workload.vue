<template>
  <ui-knob
      :value="value"
      :size="100"
      :valueTemplate="'{value}%'"
      :min="0"
      :max="settingsStore.settings?.standard_hours_per_month"
      :title="'Загруженность'"
      :valueColor="valueColor"
      :readonly="true"
  />
</template>

<script lang="ts" setup>
interface Props {
  value: number;
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
})

const settingsStore = useSettingsStore()
const { percentageOfOneNumberFromAnother: perValue } = useHelpers()
const max = 100

const value = computed((): number => {
  if (props.value <= 100) {
    return props.value
  }
  return 100
})

const colors: Record<string, string> = {
  '0': '--red-900',
  '10': '--red-500',
  '20': '--red-300',
  '30': '--red-100',
  '40': '--yellow-500',
  '50': '--yellow-300',
  '60': '--yellow-100',
  '70':'--green-100',
  '80': '--green-300',
  '90': '--green-500',
  '100': '--green-700',
}

const valueColor = computed((): string => {
  const percent = perValue(props.value, max)
  let color = '--surface-border'

  Object.keys(colors).forEach(key => {
    if (percent >= Number(key)) {
      color = colors[key]
    }
  })

  return `var(${color}, LightGray)`
})
</script>
