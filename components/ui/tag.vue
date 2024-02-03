<template>
  <Tag :style="{ background: props.background, padding: props.padding, color: 'black' }">
    {{ props.title }}
  </Tag>
</template>

<script lang="ts" setup>
const props = defineProps<{
  background: string;
  title: string;
  padding: string;
  color: string;
}>();
</script>
