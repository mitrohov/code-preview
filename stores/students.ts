import type {GetStudent} from "~/server/types/student"
import type {DayWeek} from "~/server/types/day-week"

interface StudentsState {
  students: GetStudent[]
  daysWeek: DayWeek[]
  selectedStudentId: number | null
}
export const useStudentStore = defineStore('studentStore', {
  state: (): StudentsState => ({
    students: [],
    daysWeek: [
      { label: 'Понедельник', shortLabel: 'Пн.', day: 1 },
      { label: 'Вторник', shortLabel: 'Вт.', day: 2 },
      { label: 'Среда', shortLabel: 'Ср.', day: 3 },
      { label: 'Четверг', shortLabel: 'Чт.', day: 4 },
      { label: 'Пятница', shortLabel: 'Пят.', day: 5 },
      { label: 'Суббота', shortLabel: 'Суб.', day: 6 },
      { label: 'Воскресенье', shortLabel: 'Вос.', day: 7 }
    ],
    selectedStudentId: null
  }),
  getters: {
    dayMonthOfPaymentValues(): number[] {
      const values = this.students.map(student => {
        return student.day_month_of_payment
      })
      return [...new Set(values)];
    },
    paymentAmountPerMonthValues(): number[] {
      const values = this.students.map(student => {
        return student.payment_amount_per_month
      })
      return [...new Set(values)];
    },
    lessonTimeValues(): number[] {
      const values = this.students.map(student => {
        return student.lesson_time
      })
      return [...new Set(values)];
    },
    qtyLessonsPerMonthValues(): number[] {
      const values = this.students.map(student => {
        return student.qty_lessons_per_month
      })
      return [...new Set(values)];
    },
    qtyLessonsPerWeekValues(): number[] {
      const values= this.students.map(student => {
        return student.qty_lessons_per_week
      })
      return [...new Set(values)];
    },
    selectedStudent: (state): GetStudent | null => {
      if (state.selectedStudentId) {
        const foundStudent = state.students.find(student => student.id === state.selectedStudentId)
        if (foundStudent) {
          return foundStudent
        }
      }
      return null
    },
    totalQtyLessonsPerMonth: (state): number => {
      return state.students.reduce((accumulator, student) => accumulator + student.qty_lessons_per_month, 0);
    },
    totalPaymentAmountPerMonth: (state): number => {
      return state.students.reduce((accumulator, student) => accumulator + student.payment_amount_per_month, 0);
    },
    taxPerMonth(state): number {
      const sum = state.students.reduce((accumulator, student) => accumulator + student.qty_lessons_per_month, 0);
      return sum * 0.04
    },
    totalLessonTimeInHoursPerMonth: (state): number => {
      const qtyMin = state.students.reduce((accumulator, student) => accumulator + (student.qty_lessons_per_month * student.lesson_time), 0);
      return qtyMin / 60
    },
  },
  actions: {
    getDayWeek(value: number) {
      return this.daysWeek.find(item => item.day === value)
    },
  }
})
