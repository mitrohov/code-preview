import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostScheduleSchema, PatchScheduleSchema, GetScheduleSchema} from "~/server/schemas/schedule"

export interface GetSchedule extends InferType<typeof GetScheduleSchema> {}
export interface PostSchedule extends InferType<typeof PostScheduleSchema> {}
export interface PathSchedule extends InferType<typeof PatchScheduleSchema> {}

export class ScheduleService extends BaseApiService<GetSchedule> {
  queries = {
    createQueryForCreate(schedules: PostSchedule[]) {
      let values = ' '

      if (schedules.length > 1) {
        schedules.forEach(schedule => {
          values += `('${schedule.day_week}', TO_TIMESTAMP(${schedule.time}), ${schedule.student_id}),`
        })
        values = values.slice(0, -1)
        values += ';'
      } else {
        values += `('${schedules[0].day_week}', TO_TIMESTAMP(${schedules[0].time}), ${schedules[0].student_id});`
      }

      return `INSERT INTO schedule (day_week, time, student_id) VALUES ${values}`
    },
    updateMany(body: PathSchedule[]): string[] {
      return body.map(schedule => {
        return `
          UPDATE ${DbTables.schedule}
            SET
              day_week = ${schedule.day_week},
              time = TO_TIMESTAMP(${schedule.time}),
              student_id = ${schedule.student_id}
            WHERE
              id = ${schedule.id};
          `
      });
    },
    getAllByStudentId(id: number): string {
      return `
        SELECT 
          schedule.id,
          schedule.student_id,
          EXTRACT(EPOCH FROM schedule.time) AS time,
          schedule.day_week
        FROM ${DbTables.schedule}
        WHERE student_id = ${id}
      `
    },
    createMany(body: PostSchedule[]): string {
      return this.createQueryForCreate(body)
    },
    deleteOneById(id: number): string {
      return `DELETE FROM ${DbTables.schedule} WHERE id = ${id};`
    },
  }
}

export const scheduleService = new ScheduleService()
