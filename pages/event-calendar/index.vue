<template>
  <div class="event-calendar">
    <template v-if="eventsStore.eventsForEventsCalendar.length > 0">
      <Qalendar
          :events="eventsStore.eventsForEventsCalendar"
          :config="settingsStore.events_calendar_config"
          @edit-event="openEditForm($event)"
          @delete-event="showDeleteWarning = true"
      >
        <template #weekDayEvent="eventProps">
          <div
              class="week-day-event"
              :style="{
                'color' : getColorScheme(eventProps.eventData.colorScheme).color,
                'backgroundColor' : getColorScheme(eventProps.eventData.colorScheme).backgroundColor
              }"
          >
            <template v-if="eventProps.eventData.is_lesson">
              <div class="week-day-event_student-fio">
                <i class="pi pi-user mr-5"></i>
                <span class="mr-5">{{ eventProps.eventData.with }}</span>
                <Tag
                    :severity="colorsLessonsLeft(Number(eventProps.eventData.qty_lessons_left))"
                    :value="eventProps.eventData.qty_lessons_left"
                    style="padding: 2px 4px"
                />
              </div>
              <div class="d-flex align-center">
                <span class="mr-5">{{ eventProps.eventData.title }}</span>
                <template v-if="eventProps.eventData.is_lesson">
                <span class="mr-10">
                  <i v-if="eventProps.eventData.has_home_work" class="pi pi-verified" style="color: green; font-size: 14px"></i>
                  <i v-else class="pi pi-times" style="color: red"></i>
                </span>
                </template>
              </div>
              <div>
                <span>{{ eventProps.eventData.time.start.split(' ')[1] }} -</span>
                <span>{{ eventProps.eventData.time.end.split(' ')[1] }}</span>
              </div>
            </template>
            <template v-else>
              <div>
                {{ eventProps.eventData.title }}
              </div>
              <div>
                <span>{{ eventProps.eventData.time.start.split(' ')[1] }} -</span>
                <span>{{ eventProps.eventData.time.end.split(' ')[1] }}</span>
              </div>
            </template>
          </div>
        </template>

        <template #monthEvent="eventProps">
          <div
              :style="{
                'color' : getColorScheme(eventProps.eventData.colorScheme).color,
                'backgroundColor' : getColorScheme(eventProps.eventData.colorScheme).backgroundColor
              }"
              class="month-event"
          >
            <div class="d-flex">
              <template v-if="eventProps.eventData.is_lesson">
                <span class="mr-5">{{ eventProps.eventData.with }}</span>
                <i v-if="eventProps.eventData.has_home_work" class="pi pi-verified" style="color: green; font-size: 14px"></i>
                <i v-else class="pi pi-times" style="color: red"></i>
              </template>
              <template v-else>
                <span class="mr-5">{{ eventProps.eventData.title }}</span>
              </template>
            </div>
          </div>
        </template>
      </Qalendar>
      <Dialog
          v-model:visible="showEventForm"
          modal
          header="Редактирование события"
          :style="{ width: '50rem' }"
          :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
      >
        <events-form
            :eventId="eventId"
            @saved="updateEvent"
        />
      </Dialog>
      <events-delete-warning
          :show="showDeleteWarning"
          @delete="deleteEvent"
          @close="showDeleteWarning = false"
      />
    </template>
    <div v-else>
      Нет добавленных событий
    </div>
  </div>
</template>

<script lang="ts" setup>
import {Qalendar} from "qalendar";

const eventsStore = useEventsStore()
const apiService = useApiService()
const settingsStore = useSettingsStore()
const showEventForm = ref<boolean>(false)
const showDeleteWarning = ref<boolean>(false)
const eventId = ref<string | null>(null)

const colorsLessonsLeft = (value: number): string => {
  if (value < 1) {
    return 'danger'
  } else if (value === 1) {
    return 'warning'
  }
  return 'success'
}

const getColorScheme = (schemeName: string) => {
  const scheme = settingsStore.events_calendar_config.style.colorSchemes[schemeName]
  if (scheme) {
    return scheme
  } else {
    return  {
      color: "#000000",
      backgroundColor: "#BDB76B",
    }
  }
}

const openEditForm = (id: string) => {
  eventId.value = id
  showEventForm.value = true
}

const updateEvent = () => {
  showEventForm.value = false
  apiService.events.getAll()
}

const deleteEvent = async (id: string) => {
  await apiService.events.deleteOneById(Number(id))
  showDeleteWarning.value = false
}

onMounted(async () => {
  if (eventsStore.events.length === 0) {
    await apiService.events.getAll()
  }
})
</script>

<style lang="scss">
.month-event {
  padding: 4px;
  font-size: 12px;
  border-radius: 4px;
  margin-top: 6px;
}
.week-day-event {
  display: grid;
  grid-row-gap: 4px;
  padding: 8px;
  width: 100%;
  height: 100%;
  background: aquamarine;
  border-radius: 4px;
  &_student-fio {
    font-weight: 700;
  }
}
</style>

<style lang="css">
@import "../../node_modules/qalendar/dist/style.css";

.calendar-week .current-time-line,
.calendar-week .current-time-line__circle:before,
.calendar-month__weekday.is-today .calendar-month__day-date,
.agenda__header-date {
  background-color: var(--primary-color) !important;
}
.agenda__header-day-name {
  color: var(--primary-color) !important;
}
.calendar-header__mode-options {
  margin-top: 5px;
  border-radius: 4px;
}
.is-today .week-timeline__date {
  background: var(--primary-color) !important;
  height: 35px;
  width: 35px;
}
.week-timeline__date {
  height: 35px !important;
  width: 35px !important;
  background: var(--surface-100) !important;
}
.calendar-header {
  margin-left: 10px;
}
.calendar-month__weekday {
  min-height: 100px;
}
.fa-calendar-day {
  display: none;
}
</style>
