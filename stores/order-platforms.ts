import type {GetOrderPlatform} from "~/server/types/order-platform"

interface EnglishLevelsState {
  orderPlatforms: GetOrderPlatform[]
}

export const useOrderPlatformsStore = defineStore('orderPlatformsStore', {
  state: (): EnglishLevelsState => ({
    orderPlatforms: []
  }),
  getters: {
    orderPlatformTitles(): string[] {
      const titles = this.orderPlatforms.map(orderPlatform => {
        return orderPlatform.title
      })
      return [...new Set(titles)];
    },
  },
})
