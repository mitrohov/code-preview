import type {GetEventsCategory, PatchEventsCategory, PostEventsCategory} from "~/server/types/events-category";
import type {GetOrderPlatform, PatchOrderPlatform, PostOrderPlatform} from "~/server/types/order-platform";
import type {GetPurposeLesson, PatchPurposeLesson, PostPurposeLesson} from "~/server/types/purpose-lesson";
import type {GetEnglishLevel, PatchEnglishLevel, PostEnglishLevel} from "~/server/types/english-level";
import type {GetSettings, PatchSettings, PostSettings} from "~/server/types/settings";
import type {GetSchedule, PostSchedule, PathSchedule} from "~/server/types/schedule";
import type {GetStudent, PostStudent, PatchStudent} from "~/server/types/student";
import type {GetEvent, PostEvent, PatchEvent} from "~/server/types/event";
import type {GetContact, PatchContact, PostContact} from "~/server/types/contacts";
import type {GetPayment, PatchPayment, PostPayment} from "~/server/types/payment";
import type {ToastMessageOptions} from "primevue/toast";
import type {QueryResult} from "pg";

interface ToastMessages {
  getAll?: string
  getAllByStudentId?: string
  getOneById?: string
  createOne?: string
  createMany?: string
  updateOneById?: string
  deleteOneById?: string
  updateMany?: string
}

export const useApiService = () => {
  class BaseService<GET, POST,PATCH> {
    apiUrl = '/api/'
    toast = useToast();
    isLoading = false

    constructor(
      readonly route: string,
      readonly arrayInStore: string,
      readonly store: any,
      readonly positiveMessages: ToastMessages,
      readonly negativeMessages: ToastMessages
    ) {
      if (store) {
        this.store = store()
      } else {
        this.store = null
      }
    }

    createUrl(id?: number): string {
      return id ? this.apiUrl + this.route + `?id=${id}` : this.apiUrl + this.route
    }
    createErrToast(message: string): ToastMessageOptions {
      return {
        severity: 'error',
        summary: 'Ошибка',
        detail: message,
        life: 5000
      }
    }
    createSuccessToast(message: string): ToastMessageOptions {
      return {
        severity: 'success',
        summary: 'Успех',
        detail: message,
        life: 5000
      }
    }
    async getAll(): Promise<GET[] | void> {
      this.isLoading = false

      return await $fetch(this.createUrl(), {method: 'GET'})
        .then(response => {
          if (this.store) {
            this.store[this.arrayInStore] = response
          }
          return response as GET[]
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.getAll) {
            this.toast.add(this.createErrToast(this.negativeMessages.getAll));
          }
        })
        .finally(() => this.isLoading = false)
    }
    async createOne(body: POST): Promise<QueryResult | void> {
      this.isLoading = true
      const response: QueryResult | void = await $fetch(
        this.createUrl(),
        {
          method: 'POST',
          body: body as FormData
        }
      )
        .then(response => {
          if (this.positiveMessages.createOne) {
            this.toast.add(this.createSuccessToast(this.positiveMessages.createOne));
          }
          return response as QueryResult
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.createOne) {
            this.toast.add(this.createErrToast(this.negativeMessages.createOne));
          }
        })
      await this.getAll()
      this.isLoading = false
      return response
    }
    async createMany(body: POST[]): Promise<QueryResult | void> {
      this.isLoading = true
      const response: QueryResult | void = await $fetch(
        this.createUrl(),
        {
          method: 'POST',
          body: body
        }
      )
        .then(response => {
          if (this.positiveMessages.createMany) {
            this.toast.add(this.createSuccessToast(this.positiveMessages.createMany));
          }
          return response as QueryResult
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.createMany) {
            this.toast.add(this.createErrToast(this.negativeMessages.createMany));
          }
        })
      await this.getAll()
      this.isLoading = false
      return response
    }
    async updateMany(body: PATCH[]): Promise<QueryResult | void> {
      this.isLoading = true
      const response: QueryResult | void = await $fetch(
        this.createUrl(),
        {
          method: 'PATCH',
          body: body as FormData[]
        }
      )
        .then(response => {
          if (this.positiveMessages.updateMany) {
            this.toast.add(this.createSuccessToast(this.positiveMessages.updateMany));
          }
          return response as QueryResult
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.updateMany) {
            this.toast.add(this.createErrToast(this.negativeMessages.updateMany));
          }
        })
      await this.getAll()
      this.isLoading = false
      return response
    }
    async updateOneById(body: PATCH, id: number): Promise<QueryResult | void> {
      this.isLoading = true
      const response: QueryResult | void = await $fetch(
        this.createUrl(id),
        {
          method: 'PATCH',
          body: body as FormData
        }
      )
        .then(response => {
          if (this.positiveMessages.updateOneById) {
            this.toast.add(this.createSuccessToast(this.positiveMessages.updateOneById));
          }
          return response as QueryResult
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.updateOneById) {
            this.toast.add(this.createErrToast(this.negativeMessages.updateOneById));
          }
        })
      await this.getAll()
      this.isLoading = false
      return response
    }
    async getOneById(id: number): Promise<GET | void> {
      this.isLoading = true
      return await $fetch(`${this.createUrl(id)}`, {method: 'GET'})
        .then(response => response as GET)
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.getOneById) {
            this.toast.add(this.createErrToast(this.negativeMessages.getOneById));
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
    async deleteOneById(id: number): Promise<QueryResult | void> {
      this.isLoading = true
      const response = await $fetch(`${this.createUrl()}?id=${id}`, {method: 'DELETE'})
        .then(response => {
          if (this.positiveMessages.deleteOneById) {
            this.toast.add(this.createSuccessToast(this.positiveMessages.deleteOneById));
          }
          return response as QueryResult
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.deleteOneById) {
            this.toast.add(this.createErrToast(this.negativeMessages.deleteOneById));
          }
        })
      this.isLoading = false
      await this.getAll()
      return response
    }
  }

  class PaymentService extends BaseService<GetPayment, PostPayment, PatchPayment>{
    constructor(
      readonly route: string,
      readonly arrayInStore: string,
      readonly storeFunc: any,
      readonly positiveMessages: ToastMessages,
      readonly negativeMessages: ToastMessages
    ) {
      super(route, arrayInStore, storeFunc, positiveMessages, negativeMessages)
    }
    async getByStudentIdForLesson(id: number): Promise<GetPayment[] | void> {
      this.isLoading = false

      return await $fetch(`${this.apiUrl}${this.route}/student?id=${id}`, {method: 'GET'})
        .then(response => {
          if (this.store) {
            this.store[this.arrayInStore] = response
          }
          return response as GetPayment[]
        })
        .catch((error) => {
          console.log(error.message)
          this.toast.add(this.createErrToast('Не удалось загрузить платежи выбранного ученика'));
        })
        .finally(() => this.isLoading = false)
    }
  }

  class ScheduleService extends BaseService<GetSchedule, PostSchedule, PathSchedule>{
    constructor(
      readonly route: string,
      readonly arrayInStore: string,
      readonly storeFunc: any,
      readonly positiveMessages: ToastMessages,
      readonly negativeMessages: ToastMessages
    ) {
      super(route, arrayInStore, storeFunc, positiveMessages, negativeMessages)
    }

    async getAllByStudentId(id: number): Promise<PathSchedule[] | void> {
      this.isLoading = false

      return await $fetch(`${this.createUrl()}/student/${id}`, {method: 'GET'})
        .then(response => {
          if (this.store) {
            this.store[this.arrayInStore] = response
          }
          return response as GetSchedule[]
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.getAll) {
            this.toast.add(this.createErrToast(this.negativeMessages.getAll));
          }
        })
        .finally(() => this.isLoading = false)
    }
    async updateMany(body: PathSchedule[]): Promise<QueryResult | void> {
      this.isLoading = true
      const response: QueryResult | void = await $fetch(
        this.createUrl(),
        {
          method: 'PATCH',
          body: body
        }
      )
        .then(response => {
          if (this.positiveMessages.updateMany) {
            this.toast.add(this.createSuccessToast(this.positiveMessages.updateMany));
          }
          return response as QueryResult
        })
        .catch((error) => {
          console.log(error.message)
          if (this.negativeMessages.updateMany) {
            this.toast.add(this.createErrToast(this.negativeMessages.updateMany));
          }
        })
      this.isLoading = false
      return response
    }
  }

  return {
    contacts: new BaseService<GetContact, PostContact, PatchContact>(
      'contacts',
      'contacts',
      useContactsStore,
      {
        createOne: 'Контакт успешно создан',
        deleteOneById: 'Контакт успешно удален',
        updateOneById: 'Контакт успешно обновлен',
      },
      {
        getAll: 'Не удалось загрузить контакты',
        getOneById: 'Не удалось загрузить контакт',
        createOne: 'Не удалось создать контакт',
        deleteOneById: 'Не удалось удалить контакт',
        updateOneById: 'Не удалось обновить контакты',
      }
    ),
    orderPlatform: new BaseService<GetOrderPlatform, PostOrderPlatform, PatchOrderPlatform>(
      'order-platforms',
      'orderPlatforms',
      useOrderPlatformsStore,
      {
        createOne: 'Платформа успешно создана',
        deleteOneById: 'Платформа успешно удалена',
        updateOneById: 'Платформа успешно обновлена',
      },
      {
        getAll: 'Не удалось загрузить платформы',
        getOneById: 'Не удалось загрузить платформу',
        createOne: 'Не удалось создать платформу',
        deleteOneById: 'Не удалось удалить платформу',
        updateOneById: 'Не удалось обновить платформу',
      }
    ),
    purposeLessons: new BaseService<GetPurposeLesson, PostPurposeLesson, PatchPurposeLesson>(
      'purpose-lesson',
      'purposesLesson',
      usePurposesLessonStore,
      {
        createOne: 'Цель успешно создана',
        deleteOneById: 'Цель успешно удалена',
        updateOneById: 'Цель успешно обновлена',
      },
      {
        getAll: 'Не удалось загрузить цели',
        getOneById: 'Не удалось загрузить цель',
        createOne: 'Не удалось создать цель',
        deleteOneById: 'Не удалось удалить цель',
        updateOneById: 'Не удалось обновить цель',
      }
    ),
    englishLevels: new BaseService<GetEnglishLevel, PostEnglishLevel, PatchEnglishLevel>(
      'english-levels',
      'englishLevels',
      useEnglishLevelsStore,
      {
        createOne: 'Уровень успешно создан',
        deleteOneById: 'Уровень успешно удален',
        updateOneById: 'Уровень успешно обновлен',
      },
      {
        getAll: 'Не удалось загрузить уровни',
        getOneById: 'Не удалось загрузить уровень',
        createOne: 'Не удалось создать уровень',
        deleteOneById: 'Не удалось удалить уровень',
        updateOneById: 'Не удалось обновить уровень',
      }
    ),
    eventColors: new BaseService<GetEnglishLevel, PostEnglishLevel, PatchEnglishLevel>(
      'event-colors',
      'eventColors',
      useEventColorsStore,
      {},
      {}
    ),
    settings: new BaseService<GetSettings, PostSettings, PatchSettings>(
      'settings',
      'settings',
      useSettingsStore,
      {
        updateOneById: 'Настройки успешно обновлены',
      },
      {
        getOneById: 'Не удалось загрузить настройки',
        updateOneById: 'Не удалось обновить настройки',
      }
    ),
    eventCategories: new BaseService<GetEventsCategory, PostEventsCategory, PatchEventsCategory>(
      'event-categories',
      'eventCategories',
      useEventCategoriesStore,
      {
        createOne: 'Категория успешно создана',
        updateOneById: 'Категория успешно обновлена',
      },
      {
        getAll: 'Не удалось загрузить категории',
        getOneById: 'Не удалось загрузить категорию',
        createOne: 'Не удалось создать категорию',
        deleteOneById: 'Не удалось удалить категорию',
        updateOneById: 'Не удалось обновить категорию',
      }
    ),
    payments: new PaymentService(
      'payments',
      'payments',
      usePaymentsStore,
      {
        createOne: 'Платеж успешно создан',
        deleteOneById: 'Платформа успешно удален',
        updateOneById: 'Платеж успешно обновлен',
      },
      {
        getAll: 'Не удалось загрузить платежи',
        getOneById: 'Не удалось загрузить платеж',
        createOne: 'Не удалось создать платеж',
        deleteOneById: 'Не удалось удалить платеж',
        updateOneById: 'Не удалось обновить платеж',
      }
    ),
    schedules: new ScheduleService(
      'schedules',
      'schedules',
      null,
      {},
      {
        getAllByStudentId: 'Не удалось загрузить расписание',
        createMany: 'Не удалось создать расписание',
        deleteOneById: 'Не удалось удалить расписание',
        updateMany: 'Не удалось обновить расписание',
      }
    ),
    events: new BaseService<GetEvent, PostEvent, PatchEvent>(
      'events',
      'events',
      useEventsStore,
      {
        createOne: 'Событие успешно создано',
        createMany: 'События успешно созданы',
        deleteOneById: 'Событие успешно удалено',
        updateOneById: 'Событие успешно обновлено',
      },
      {
        getAll: 'Не удалось загрузить события',
        getOneById: 'Не удалось загрузить событие',
        createOne: 'Не удалось создать событие',
        createMany: 'Не удалось создать события',
        deleteOneById: 'Не удалось удалить событие',
        updateOneById: 'Не удалось обновить событие',
      }
    ),
    students: new BaseService<GetStudent, PostStudent, PatchStudent>(
      'students',
      'students',
      useStudentStore,
      {
        createOne: 'Ученик успешно создан',
        deleteOneById: 'Ученик успешно удален',
        updateOneById: 'Ученик успешно обновлен',
      },
      {
        getAll: 'Не удалось загрузить учеников',
        getOneById: 'Не удалось загрузить ученика',
        createOne: 'Не удалось создать ученика',
        deleteOneById: 'Не удалось удалить ученика',
        updateOneById: 'Не удалось обновить ученика',
      }
    ),
  }
}
