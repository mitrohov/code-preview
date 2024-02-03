import type {GetEventColor} from "~/server/types/event-color";

interface EventColorsState {
  eventColors: GetEventColor[]
}

export const useEventColorsStore = defineStore('eventColorsStore', {
  state: (): EventColorsState => ({
    eventColors: [],
  }),
  actions: {
    findColorById(colorId: number): GetEventColor {
      const foundColor = this.eventColors.find(eventColor => eventColor.id === colorId)
      if (!foundColor) {
        return this.eventColors[0]
      } else {
        return foundColor
      }
    }
  }
})
