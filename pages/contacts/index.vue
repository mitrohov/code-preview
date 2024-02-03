<template>
  <div v-if="!apiService.contacts.isLoading" class="event-category-page">
    <div class="d-flex justify-between">
      <Button
          label="Добавить новый контакт"
          class="mb-20"
          @click="openContactForm"
      />
      <download-xlsx
          v-if="contactsStore.contacts.length > 0"
          :data="contactsStore.contacts"
          :fileName="'Контакты'"
      />
    </div>
    <contacts-table
        :contacts="contactsStore.contacts"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import type {TableContextItem} from "~/server/types/table-context-Item"
import {useContactsStore} from "~/stores/contacts";

const router = useRouter()
const contactsStore = useContactsStore()
const orderPlatformsStore = useOrderPlatformsStore()
const selectedId = ref<number | null>(null)
const apiService = useApiService()

const openContactForm = () => {
  router.push('/contacts/form')
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
            router.push(`/contacts/form?id=${selectedId.value}`)
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: async () => {
          if (selectedId.value) {
            await apiService.contacts.deleteOneById(selectedId.value)
          }
        }
      }
    ]
  }
];

onMounted(() => {
  if (contactsStore.contacts.length === 0) apiService.contacts.getAll()
  if (orderPlatformsStore.orderPlatforms.length === 0) apiService.orderPlatform.getAll()
})
</script>
