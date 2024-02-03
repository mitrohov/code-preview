<template>
  <div v-if="!apiService.purposeLessons.isLoading" class="purpose-lesson-page">
    <Button
        label="Добавить новую цель"
        class="mb-20"
        @click="openPurposeLessonForm"
    />
    <purposes-lesson-table
        :purposes-lesson="purposesLessonStore.purposesLesson"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type {TableContextItem} from "~/server/types/table-context-Item"
import {usePurposesLessonStore} from "~/stores/purpose-lesson";

const router = useRouter()
const purposesLessonStore = usePurposesLessonStore()
const apiService = useApiService()
const selectedId = ref<number | null>(null)

const openPurposeLessonForm = () => {
  router.push('/purpose-lesson/form')
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
            router.push(`/purpose-lesson/form?id=${selectedId.value}`)
          }
        }
      },
    ]
  }
];

onMounted(() => {
  if (purposesLessonStore.purposesLesson.length === 0) {
    apiService.purposeLessons.getAll()
  }
})
</script>
