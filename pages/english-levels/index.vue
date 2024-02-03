<template>
  <div v-if="!apiService.englishLevels.isLoading" class="event-category-page">
    <Button
        label="Добавить новый уровень"
        class="mb-20"
        @click="openEnglishLevelForm"
    />
    <english-levels-table
        :english-levels="englishLevelsStore.englishLevels"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type {TableContextItem} from "~/server/types/table-context-Item"
import {useEnglishLevelsStore} from "~/stores/english-levels";

const router = useRouter()
const englishLevelsStore = useEnglishLevelsStore()
const selectedId = ref<number | null>(null)
const apiService = useApiService()

const openEnglishLevelForm = () => {
  router.push('/english-levels/form')
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
            router.push(`/english-levels/form?id=${selectedId.value}`)
          }
        }
      },
    ]
  }
];

onMounted(async () => {
  if (englishLevelsStore.englishLevels.length === 0) {
    await apiService.englishLevels.getAll()
  }
})
</script>
