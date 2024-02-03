import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostStudentSchema, PatchStudentSchema, GetEventSchema} from "~/server/schemas/student"


export interface PostStudent extends InferType<typeof PostStudentSchema> {}
export interface PatchStudent extends InferType<typeof PatchStudentSchema> {}
export interface GetStudent extends InferType<typeof GetEventSchema> {}

export class StudentService extends BaseApiService<GetStudent> {
  queries = {
    getAll: `
      SELECT
        s.id,
        s.fio,
        s.qty_lessons_per_month,
        s.qty_lessons_per_week,
        s.lesson_time,
        s.lesson_cost,
        s.phone,
        s.social,
        s.description,
        s.day_month_of_payment,
        el.title AS english_level_title,
        pl.title AS purpose_lesson_title,
        JSONB_AGG(
          JSONB_BUILD_OBJECT(
            'day_week', sch.day_week,
            'time', EXTRACT(EPOCH FROM sch.time),
            'student_id', sch.student_id
          )
        ) AS schedules,
        s.qty_lessons_per_month * s.lesson_cost AS payment_amount_per_month
      FROM
        ${DbTables.student} s
      INNER JOIN
        ${DbTables.schedule} sch ON sch.student_id = s.id
      INNER JOIN
        ${DbTables.english_level} el ON el.id = s.english_level_id
      INNER JOIN
        ${DbTables.purpose_lesson} pl ON pl.id = s.purpose_lesson_id
      WHERE
        s.is_system = false AND s.is_deleted = false
      GROUP BY
        s.id, s.fio, s.qty_lessons_per_month, s.qty_lessons_per_week, s.lesson_time, s.lesson_cost, s.description, s.day_month_of_payment, el.title, pl.title
      ORDER BY
        s.id;
    `,
    getOneById(id: number): string {
      return `
        SELECT
          s.id,
          s.fio,
          s.qty_lessons_per_month,
          s.lesson_time,
          s.lesson_cost,
          s.description,
          s.phone,
          s.social,
          s.english_level_id,
          s.qty_lessons_per_week,
          s.purpose_lesson_id,
          s.day_month_of_payment,
          JSONB_AGG(
            JSONB_BUILD_OBJECT(
              'day_week', sch.day_week,
              'time', EXTRACT(EPOCH FROM sch.time),
              'student_id', sch.student_id
            )
          ) AS schedules,
          s.qty_lessons_per_month * s.lesson_cost AS payment_amount_per_month
        FROM
          ${DbTables.student} s
        INNER JOIN
          ${DbTables.schedule} sch ON sch.student_id = s.id
        WHERE
          s.id = ${id}
        GROUP BY
          s.id, s.fio, s.qty_lessons_per_month, s.lesson_time, s.lesson_cost, s.description, s.day_month_of_payment
        ORDER BY
          s.id;
      `
    },
    deleteOneById(id: number): string {
      return `
        UPDATE ${DbTables.event}
        SET is_deleted = true
        WHERE student_id = ${id};
        
        UPDATE ${DbTables.payment}
        SET is_deleted = true
        WHERE student_id = ${id};
        
        UPDATE ${DbTables.schedule}
        SET is_deleted = true
        WHERE student_id = ${id};
        
        UPDATE ${DbTables.student}
        SET is_deleted = true
        WHERE id = ${id};
      `
    },
    createOne(body: PostStudent): string {
      return `
        INSERT INTO ${DbTables.student} (
            fio,
            qty_lessons_per_month,
            lesson_time,
            lesson_cost,
            description,
            phone,
            social,
            english_level_id,
            qty_lessons_per_week,
            purpose_lesson_id,
            day_month_of_payment
        )
        VALUES (
            '${body.fio}',
            ${body.qty_lessons_per_month},
            ${body.lesson_time},
            ${body.lesson_cost},
            '${body.description}',
            '${body.phone}',
            '${body.social}',
            ${body.english_level_id},
             ${body.qty_lessons_per_week},
             ${body.purpose_lesson_id},
            '${body.day_month_of_payment}'
        )
        RETURNING id;
      `
    },
    updateOneById(body: PatchStudent): string {
      return `
        UPDATE ${DbTables.student}
        SET
          fio = '${body.fio}',
          qty_lessons_per_month = ${body.qty_lessons_per_month},
          lesson_time = '${body.lesson_time}',
          lesson_cost = ${body.lesson_cost},
          purpose_lesson_id = ${body.purpose_lesson_id},
          english_level_id = ${body.english_level_id},
          description = '${body.description}',
          phone = '${body.phone}',
          social = '${body.social}',
          qty_lessons_per_week = '${body.qty_lessons_per_week}',
          day_month_of_payment = '${body.day_month_of_payment}'
        WHERE
          id = ${body.id};
      `
    },
  }
}

export const studentService = new StudentService()
