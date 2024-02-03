import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostPaymentSchema, PatchPaymentSchema, GetPaymentSchema} from "~/server/schemas/payment"
import type {QueryResult} from "pg";

export interface PostPayment extends InferType<typeof PostPaymentSchema> {}
export interface PatchPayment extends InferType<typeof PatchPaymentSchema> {}
export interface GetPayment extends InferType<typeof GetPaymentSchema> {}

export class PaymentService extends BaseApiService<GetPayment> {
  queries = {
    getAll: `
      WITH EventData AS (
        SELECT 
            event.id AS event_id,
            event.title AS event_title,
            EXTRACT(EPOCH FROM event.start_time) AS start_time,
            EXTRACT(EPOCH FROM event.end_time) AS end_time,
            event.payment_id
        FROM ${DbTables.event}
        INNER JOIN event_category ON event.event_category_id = event_category.id
        LEFT JOIN color ON event_category.color_id = color.id
        WHERE event.is_deleted = false
      )
      
      SELECT 
          p.id,
          p.title,
          EXTRACT(EPOCH FROM p.date) AS date,
          p.sum,
          p.lesson_qty,
          p.is_not_pay,
          p.student_id,
          s.fio AS student_fio,
          jsonb_agg(
              jsonb_build_object(
                  'id', ed.event_id,
                  'title', ed.event_title,
                  'start_time', ed.start_time,
                  'end_time', ed.end_time
              )
          ) AS events,
          (p.lesson_qty - COALESCE(COUNT(ed.event_id), 0)) AS qty_lessons_left
      FROM ${DbTables.payment} p
      INNER JOIN ${DbTables.student} s ON p.student_id = s.id
      LEFT JOIN EventData AS ed ON p.id = ed.payment_id
      WHERE p.is_deleted = false
      GROUP BY p.id, p.title, p.date, p.sum, p.lesson_qty, p.student_id, s.fio
      ORDER BY p.date DESC;
    `,
    getOneById(id: number): string {
      return `
        SELECT 
          payment.id,
          payment.title,
          payment.is_not_pay,
          payment.sum,
          payment.lesson_qty,
          payment.student_id,
          EXTRACT(EPOCH FROM payment.date) AS date,
          EXTRACT(EPOCH FROM payment.date) AS date2,
          student.fio AS student_fio
        FROM ${DbTables.payment}
        INNER JOIN ${DbTables.student} ON payment.student_id = student.id
        WHERE payment.id = ${id};
      `
    },
    createOne(body: PostPayment): string {
      return `
        INSERT INTO ${DbTables.payment}
        (title, date, sum, lesson_qty, student_id, is_not_pay)
        VALUES (
        '${body.title}',
        TO_TIMESTAMP(${body.date}),
        ${body.sum},
        ${body.lesson_qty},
        ${body.student_id},
        false);
      `
    },
    updateOneById(body: PatchPayment): string {
      return `
        UPDATE ${DbTables.payment}
        SET
          title = '${body.title}',
          date = TO_TIMESTAMP(${body.date}),
          sum = '${body.sum}',
          lesson_qty = '${body.lesson_qty}',
          student_id = ${body.student_id}
        WHERE
          id = ${body.id};
      `
    },
    getByStudentIdForLesson(id: number): string {
      return `
        SELECT 
            p.*
        FROM ${DbTables.payment} p
        LEFT JOIN (
            SELECT payment_id, COUNT(*) AS event_count
            FROM ${DbTables.event}
            GROUP BY payment_id
        ) e ON p.id = e.payment_id
        WHERE (p.student_id = ${id} OR p.is_not_pay = true) AND p.is_deleted = false
          AND ((p.is_not_pay = true) OR (e.event_count IS NULL OR (p.lesson_qty - e.event_count) > 0));
      `
    }
  }

  async getByStudentIdForLesson(id: number): Promise<GetPayment[] | undefined> {
    try {
      const res: QueryResult = await this.client.query(this.queries.getByStudentIdForLesson(id))
      return res.rows as GetPayment[]
    } catch (error) {
      console.log(error)
      return
    }
  }

  async deleteOneById(id: string): Promise<QueryResult | undefined> {
    try {
      // Находим платеж "Без оплаты"
      const notPayRes = await this.client.query(`
        SELECT *
        FROM ${DbTables.payment}
        WHERE is_not_pay = true;
      `)
      const paymentNotPayId = notPayRes.rows[0].id
      // Всем связанным события к удаленному платежу привязываем платеж "Без оплаты"
      await this.client.query(`
        UPDATE ${DbTables.event}
        SET payment_id = ${paymentNotPayId}
        WHERE payment_id = ${id};
      `)
      // Удаляем платеж
      return await this.client.query(`
        UPDATE ${DbTables.payment}
        SET is_deleted = true
        WHERE id = ${id};
      `)
    } catch (error) {
      console.log(error)
      return
    }
  }
}

export const paymentService = new PaymentService()

