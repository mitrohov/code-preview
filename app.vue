<template>
  <NuxtLayout :name="layout">
    <Toast />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const route = useRoute()

const layout = computed((): string => {
  if (route.href === '/auth') {
    return 'auth'
  }
  return 'default'
})
</script>
