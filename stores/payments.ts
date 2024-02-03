import type {GetPayment} from "~/server/types/payment"

interface PaymentsState {
  payments: GetPayment[]
}

export const usePaymentsStore = defineStore('paymentsStore', {
  state: (): PaymentsState => ({
    payments: []
  }),
  getters: {
    paymentsWithoutIsNotPay(): GetPayment[] {
      return this.payments.filter(payment => !payment.is_not_pay)
    },
    students(): string[] {
      return this.payments
        .filter(payment => !payment.is_not_pay)
        .map(payment => payment.student_fio)
    },
  },
})
