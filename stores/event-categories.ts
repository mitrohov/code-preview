import type {GetEventsCategory} from "~/server/types/events-category"

interface EventCategoryState {
  eventCategories: GetEventsCategory[]
}

export const useEventCategoriesStore = defineStore('eventCategoriesStore', {
  state: (): EventCategoryState => ({
    eventCategories: []
  })
})
