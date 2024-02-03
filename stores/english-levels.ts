import type {GetEnglishLevel} from "~/server/types/english-level"

interface EnglishLevelsState {
  englishLevels: GetEnglishLevel[]
}

export const useEnglishLevelsStore = defineStore('englishLevelsStore', {
  state: (): EnglishLevelsState => ({
    englishLevels: []
  }),
  getters: {
    englishLevelTitles(): string[] {
      const titles= this.englishLevels.map(englishLevel => {
        return englishLevel.title
      })
      return [...new Set(titles)];
    },
  },
})
