<template>
  <div
      v-if="!apiService.payments.isLoading && !apiService.students.isLoading"
      class="payment-page"
  >
    <div class="d-flex justify-between">
      <Button
          v-if="studentStore.students.length > 0"
          label="Добавить новую оплату"
          class="mb-20"
          @click="openNewPaymentForm"
      />
      <download-xlsx
          v-if="paymentsStore.paymentsWithoutIsNotPay.length > 0"
          :data="paymentsStore.paymentsWithoutIsNotPay"
          :fileName="'Оплаты'"
      />
    </div>
    <PaymentsTable
        v-if="paymentsStore.paymentsWithoutIsNotPay.length > 0"
        :payments="paymentsStore.paymentsWithoutIsNotPay"
        :contextItems="contextItems"
        @selectedId="selectedId = $event"
    />
    <div v-else>
      Нет добавленных оплат
    </div>
    <Dialog
        v-model:visible="showDeleteWarning"
        modal
        header="Предупреждение о удалении"
        :style="{ width: '50rem' }"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        Удаление оплаты приведет к изменению всех привязанных к оплате событий к статусу "Без оплаты"!<br>
        Вы уверены, что хотите продолжить?
      </div>
      <div class="d-flex justify-between mt-20">
        <div>
          <Button label="Отменить" severity="secondary" @click="showDeleteWarning = false" />
        </div>
        <div>
          <Button label="Удалить" severity="danger" @click="deletePayment" />
        </div>
      </div>
    </Dialog>
  </div>
  <ui-progress-spinner v-else />
</template>

<script lang="ts" setup>
import {usePaymentsStore} from '~/stores/payments'
import {useStudentStore} from "~/stores/students";
import type {TableContextItem} from "~/server/types/table-context-Item"

const router = useRouter()
const paymentsStore = usePaymentsStore()
const studentStore = useStudentStore()
const selectedId = ref<number | null>(null)
const showDeleteWarning = ref<boolean>(false)
const apiService = useApiService()

const contextItems: TableContextItem[] = [
  {
    label: 'Управление',
    items: [
      {
        label: 'Редактировать',
        icon: 'pi pi-pencil',
        command: () => {
          editPayment()
        }
      },
      {
        label: 'Удалить',
        icon: 'pi pi-trash',
        command: () => {
          showDeleteWarning.value = true
        }
      }
    ]
  }
];

const deletePayment = async () => {
  if (selectedId.value) {
    await apiService.payments.deleteOneById(selectedId.value)
    showDeleteWarning.value = false
  }
}

const editPayment = () => {
  if (selectedId.value) {
    router.push(`/payments/form?id=${selectedId.value}`)
  }
}

const openNewPaymentForm = () => {
  router.push('/payments/form')
}

onMounted(() => {
  Promise.all([apiService.payments.getAll(), apiService.students.getAll()])
})
</script>
