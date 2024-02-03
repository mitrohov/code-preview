import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostEventSchema, PatchEventSchema, GetEventSchema} from "~/server/schemas/event"

export interface PostEvent extends InferType<typeof PostEventSchema> {}
export interface PatchEvent extends InferType<typeof PatchEventSchema> {}
export interface GetEvent extends InferType<typeof GetEventSchema> {}

export interface TimeForEventCalendar {
  start: string
  end: string
}

export interface EventForCalendar {
  id: string,
  title: string
  with: string
  time: TimeForEventCalendar
  colorScheme: string
  isEditable: boolean
  description: string
  is_lesson: boolean
  has_home_work: boolean
  isCustom: boolean
  qty_lessons_left: string
}

export class EventsService extends BaseApiService<GetEvent> {
  queries = {
    getAll: `
      WITH EventCountPerPayment AS (
        SELECT
          payment_id,
          COUNT(*) AS payment_lesson_qty
        FROM ${DbTables.event}
        WHERE is_deleted = false
        GROUP BY payment_id
      )
      
      SELECT
        e.id,
        e.title,
        EXTRACT(EPOCH FROM e.start_time) AS start_time,
        EXTRACT(EPOCH FROM e.end_time) AS end_time,
        e.event_category_id,
        e.has_home_work,
        e.is_lesson,
        e.description,
        e.student_id,
        e.is_missed,
        s.fio AS student_fio,
        ec.title AS event_category_title,
        c.code AS color_code,
        p.is_not_pay AS payment_is_not_pay,
        p.date AS payment_date,
        p.title AS payment_title,
        p.lesson_qty - COALESCE(ecp.payment_lesson_qty, 0) AS qty_lessons_left
      FROM ${DbTables.event} e
      INNER JOIN ${DbTables.student} s ON e.student_id = s.id
      INNER JOIN ${DbTables.event_category} ec ON e.event_category_id = ec.id
      LEFT JOIN ${DbTables.color} c ON ec.color_id = c.id
      LEFT JOIN ${DbTables.payment} p ON e.payment_id = p.id
      LEFT JOIN EventCountPerPayment ecp ON ecp.payment_id = e.payment_id
      WHERE e.is_deleted = false
      ORDER BY e.start_time DESC;
    `,
    getOneById(id: number): string {
      return `
        SELECT 
          event.id,
          event.title,
          EXTRACT(EPOCH FROM event.start_time) AS start_time,
          EXTRACT(EPOCH FROM event.end_time) AS end_time,
          event.has_home_work,
          event.description,
          event.is_lesson,
          event.is_missed,
          event.student_id,
          event.payment_id,
          event.event_category_id
        FROM ${DbTables.event}
        WHERE event.id = ${id}
      `
    },
    deleteOneById(id: number): string {
      return `        
        UPDATE ${DbTables.event}
        SET is_deleted = true
        WHERE id = ${id};
      `
    },
    createOne(body: PostEvent): string {
      return `
        INSERT INTO ${DbTables.event}
        (title, student_id, event_category_id, has_home_work, description, is_lesson, start_time, end_time, payment_id, is_missed)
        VALUES 
        (
          '${body.title}',
          ${body.student_id}, 
          ${body.event_category_id}, 
          ${body.has_home_work}, 
          '${body.description}',
          '${body.is_lesson}',
          TO_TIMESTAMP(${body.start_time}),
          TO_TIMESTAMP(${body.end_time}),
          ${body.payment_id},
          ${body.is_missed}
        );
      `
    },
    updateOneById(body: PatchEvent): string {
      return `
        UPDATE ${DbTables.event}
        SET
          student_id = ${body.student_id},
          title = '${body.title}',
          event_category_id = ${body.event_category_id},
          has_home_work = ${body.has_home_work},
          is_lesson = ${body.is_lesson},
          is_missed = ${body.is_missed},
          description = '${body.description}',
          start_time = TO_TIMESTAMP(${body.start_time}),
          end_time = TO_TIMESTAMP(${body.end_time}),
          payment_id = ${body.payment_id}
        WHERE
          id = ${body.id};
      `
    },
    createMany(events: PostEvent[]): string {
      let values = ' '

      events.forEach(event => {
        values += `('${event.title}', ${event.student_id}, ${event.event_category_id}, ${event.has_home_work}, '${event.description}', ${event.is_lesson}, TO_TIMESTAMP(${event.start_time}), TO_TIMESTAMP(${event.end_time}), ${event.payment_id}, ${event.is_missed}), `
      })
      values = values.slice(0, -2)
      values += ';'

      return `INSERT INTO ${DbTables.event} (title, student_id, event_category_id, has_home_work, description, is_lesson, start_time, end_time, payment_id, is_missed) VALUES ${values}`
    }
  }
}

export const eventsService = new EventsService()

