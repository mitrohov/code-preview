<template>
  <div class="dashboard">
    <dashboard-workload :value="studentStore.totalLessonTimeInHoursPerMonth" />
    <div class="dashboard_indicators">
      <Fieldset legend="Количество уроков в месяц">
        <div class="fieldset-content">
          {{ studentStore.totalQtyLessonsPerMonth }}
        </div>
      </Fieldset>
      <Fieldset legend="Количество часов в месяц">
        <div class="fieldset-content">
          {{ studentStore.totalLessonTimeInHoursPerMonth }}
        </div>
      </Fieldset>
      <Fieldset legend="Доход в месяц">
        <div class="fieldset-content">
          {{ studentStore.totalPaymentAmountPerMonth }}
        </div>
      </Fieldset>
      <Fieldset legend="Налог в месяц">
        <div class="fieldset-content">
          {{ studentStore.taxPerMonth }}
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useStudentStore} from '~/stores/students'

const studentStore = useStudentStore()
const apiService = useApiService()
const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await Promise.all([apiService.students.getAll(), apiService.settings.getOneById(1)])
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.dashboard {
  &_indicators {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    margin-top: 40px;
  }
  .fieldset-content {
    font-size: 26px;
  }
}
</style>
