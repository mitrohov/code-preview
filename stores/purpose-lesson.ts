import type {GetPurposeLesson} from "~/server/types/purpose-lesson"

interface usePurposesLessonState {
  purposesLesson: GetPurposeLesson[]
}

export const usePurposesLessonStore = defineStore('purposesLessonStore', {
  state: (): usePurposesLessonState => ({
    purposesLesson: []
  }),
  getters: {
    purposeLessonTitles(): string[] {
      const titles= this.purposesLesson.map(purposeLesson => {
        return purposeLesson.title
      })
      return [...new Set(titles)];
    },
  },
})
