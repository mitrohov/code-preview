<template>
  <div v-if="!apiService.events.isLoading && !apiService.students.isLoading" class="events-page">
    <div v-if="studentStore.students.length > 0" class="d-flex justify-between">
      <Button
          label="Добавить новое событие"
          class="mb-20"
          @click="openNewEventForm"
      />
      <download-xlsx
          v-if="eventsStore.events.length > 0"
          :data="eventsStore.events"
          :fileName="'События'"
      />
    </div>
    <events-table
        v-if="eventsStore.events.length > 0"
        :events="eventsStore.events"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
    <div v-else>Нет данных</div>
    <events-delete-warning
        :show="showDeleteWarning"
        @delete="deleteEvent"
        @close="showDeleteWarning = false"
    />
    <Dialog
        v-model:visible="showEventDescription"
        modal
        header="Описание события"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div v-if="selectedEvent?.description" v-html="selectedEvent.description"></div>
      <div v-else>У этого события нет описания</div>
    </Dialog>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import {useEventsStore} from '~/stores/events'
import {useStudentStore} from "~/stores/students";
import type { TableContextItem } from "~/server/types/table-context-Item"
import type {GetEvent} from "~/server/types/event";

const router = useRouter()
const apiService = useApiService()
const eventsStore = useEventsStore()
const studentStore = useStudentStore()
const selectedId = ref<number | null>(null)
const showDeleteWarning = ref<boolean>(false)
const showEventDescription = ref<boolean>(false)
const selectedEvent = ref<GetEvent | null>(null)

const openDescription = () => {
  if (selectedId.value) {
    const selected = eventsStore.events.find(event => event.id === selectedId.value)
    if (selected) {
      selectedEvent.value = selected
      showEventDescription.value = true
    }
  }
}

const copyEvent = (eventId: number) => {
  const copyEvent = eventsStore.events.find(event => event.id === eventId)
  if (copyEvent) {
    eventsStore.copyEvent = {
      student_id: copyEvent.student_id,
      event_category_id: copyEvent.event_category_id,
      title: copyEvent.title,
      has_home_work: copyEvent.has_home_work,
      description: copyEvent.description,
      start_time: copyEvent.start_time,
      end_time: copyEvent.end_time,
      is_lesson: copyEvent.is_lesson,
      payment_id: copyEvent.payment_id,
      is_missed: copyEvent.is_missed
    };
  }
}

const deleteEvent = async () => {
  if (selectedId.value) {
    await apiService.events.deleteOneById(selectedId.value)
    await apiService.payments.getAll()
    showDeleteWarning.value = false
  }
}

const contextItems: TableContextItem[] = [
  {
    label: 'Действия',
    items: [
      {
        label: 'Посмотреть описание',
        icon: 'pi pi-file',
        command: () => {
          openDescription()
        }
      }
    ]
  },
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          if (selectedId.value) {
            router.push(`/events/form?id=${selectedId.value}`)
          }
        }
      },
      {
        label: 'Дублировать',
        icon: 'pi pi-copy',
        command: () => {
          if (selectedId.value) {
            copyEvent(selectedId.value)
            router.push(`/events/form`)
          }
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          if (selectedId.value) {
            showDeleteWarning.value = true
          }
        }
      }
    ]
  }
];

const openNewEventForm = () => {
  router.push('/events/form')
}

onMounted(async () => {
  await Promise.all([apiService.events.getAll(), apiService.students.getAll()])
})
</script>
