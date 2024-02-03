import {type EventForCalendar, type GetEvent, type PostEvent} from "~/server/types/event"
import moment from 'moment';

interface StudentsState {
  events: GetEvent[]
  copyEvent: PostEvent | null
}

export const useEventsStore = defineStore('eventsStore', {
  state: (): StudentsState => ({
    events: [],
    copyEvent: null
  }),
  getters: {
    eventsForEventsCalendar(): EventForCalendar[] {
      return this.events.map(event => {
        return {

          id: `${event.id}`,
          title: event.title,
          with: event.is_lesson ? event.student_fio : '',
          time: {
            start: moment.unix(Number(event.start_time)).format('YYYY-MM-DD HH:mm'),
            end: moment.unix(Number(event.end_time)).format('YYYY-MM-DD HH:mm')
          },
          colorScheme: event.color_code.charAt(0).toLowerCase() + event.color_code.substr(1),
          isEditable: true,
          description: event.description || '',
          is_lesson: event.is_lesson,
          has_home_work: event.has_home_work,
          isCustom: true,
          qty_lessons_left: event.qty_lessons_left,
        }
      })
    },
    eventCategoryTitles(): string[] {
      const values = this.events.map(event => {
        return event.event_category_title
      })
      return [...new Set(values)];
    },
    studentsFio(): string[] {
      const values = this.events.map(event => {
        return event.student_fio
      })
      return [...new Set(values)];
    },
  },
})
