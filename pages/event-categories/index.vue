<template>
  <div v-if="!apiService.eventCategories.isLoading" class="event-category-page">
    <Button
        label="Добавить новую категорию"
        class="mb-20"
        @click="openNewEventCategoryForm"
    />
    <event-categories-table
        :categories="eventCategoriesStore.eventCategories"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import {useEventCategoriesStore} from '~/stores/event-categories'
import type {TableContextItem} from "~/server/types/table-context-Item"

const router = useRouter()
const eventCategoriesStore = useEventCategoriesStore()
const selectedId = ref<number | null>(null)
const apiService = useApiService()

const openNewEventCategoryForm = () => {
  router.push('/event-categories/form')
}

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (selectedId.value) {
            router.push(`/event-categories/form?id=${selectedId.value}`)
          }
        }
      }
    ]
  }
];

onMounted(async () => {
  if (eventCategoriesStore.eventCategories.length === 0) {
    await apiService.eventCategories.getAll()
  }
})
</script>
