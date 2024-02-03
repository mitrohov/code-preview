<template>
  <div v-if="!apiService.orderPlatform.isLoading" class="order-platforms-page">
    <Button
        label="Добавить новую платформу"
        class="mb-20"
        @click="openOrderPlatformsForm"
    />
    <order-platforms-table
        :order-platforms="orderPlatformsStore.orderPlatforms"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type {TableContextItem} from "~/server/types/table-context-Item"
import {useOrderPlatformsStore} from "~/stores/order-platforms";

const router = useRouter()
const orderPlatformsStore = useOrderPlatformsStore()
const selectedId = ref<number | null>(null)
const apiService = useApiService()

const openOrderPlatformsForm = () => {
  router.push('/order-platforms/form')
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
            router.push(`/order-platforms/form?id=${selectedId.value}`)
          }
        }
      },
    ]
  }
];

onMounted(async () => {
  if (orderPlatformsStore.orderPlatforms.length === 0) {
    await apiService.orderPlatform.getAll()
  }
})
</script>
