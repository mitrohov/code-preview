<template>
  <events-form
      :eventId="eventId"
      showBackBtn
      @saved="routeToEventsTable"
      @close="routeToEventsTable"
  />
</template>

<script lang="ts" setup>
const router = useRouter()
const route = useRoute()
const eventId = ref<string | null>(null)

const routeToEventsTable = () => {
  router.push('/events')
}

onMounted(() => {
  if (route.query.id) {
    eventId.value = route.query.id as string
  }
})
</script>

