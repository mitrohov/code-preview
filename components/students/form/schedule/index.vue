<template>
  <div class="student-form_schedule-container">
    <ui-dropdown
        v-model="props.schedule.day_week"
        :options="studentStore.daysWeek"
        optionLabel="label"
        optionValue="day"
        label="День недели"
        id="dayWeek"
    />
    <ui-calendar
        :modelValue="props.schedule.time"
        label="Время"
        id="time"
        timeOnly
        class="mt-20"
        @update:modelValue="emit('updateTime', $event)"
    />
    <div v-if="props.deleteBtn" class="d-flex justify-end mt-10">
      <Button
          icon="pi pi-trash"
          severity="danger"
          size="small"
          label="Удалить занятие"
          @click="emit('delete')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStudentStore} from '~/stores/students'
import type {GetSchedule, PostSchedule} from "~/server/types/schedule"
import type {DayWeek} from "~/server/types/day-week"

const studentStore = useStudentStore()

const props = defineProps<{
  schedule: GetSchedule | PostSchedule;
  deleteBtn: boolean;
}>();

const emit = defineEmits<{
  (e: "updateDayWeek", value: DayWeek): DayWeek;
  (e: "updateTime", value: string): string;
  (e: "delete"): void;
}>();
</script>
