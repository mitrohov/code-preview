import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostContactSchema, PatchContactSchema, GetContactSchema} from "~/server/schemas/contact"

export interface PostContact extends InferType<typeof PostContactSchema> {}
export interface PatchContact extends InferType<typeof PatchContactSchema> {}
export interface GetContact extends InferType<typeof GetContactSchema> {}

export class ContactsService extends BaseApiService<GetContact> {
  queries = {
    getAll: `
      SELECT
        c.id,
        c.fio,
        c.mobile_number,
        c.description,
        c.socials,
        op.title as order_platform_title
      FROM ${DbTables.contact} c 
      INNER JOIN
        ${DbTables.order_platform} op ON op.id = c.order_platform_id
      WHERE c.is_deleted = false;
    `,
    getOneById(id: number): string {
      return `
        SELECT 
          contact.id,
          contact.mobile_number,
          contact.socials,
          contact.fio,
          contact.description,
          contact.order_platform_id  
        FROM ${DbTables.contact}
        WHERE contact.id = ${id};
      `
    },
    createOne(body: PostContact): string {
      return `
        INSERT INTO ${DbTables.contact} 
        (mobile_number, socials, fio, description, order_platform_id)
        VALUES (
          '${body.mobile_number}',
          '${body.socials}',
          '${body.fio}',
          '${body.description}',
          ${body.order_platform_id}
        );
      `
    },
    deleteOneById(id: number): string {
      return `
        UPDATE ${DbTables.contact}
        SET is_deleted = true
        WHERE id = ${id};
      `
    },
    updateOneById(body: PatchContact): string {
      return `
        UPDATE ${DbTables.contact}        
        SET 
          mobile_number = '${body.mobile_number}',
          socials = '${body.socials}',
          fio = '${body.fio}',
          description = '${body.description}',
          order_platform_id = ${body.order_platform_id}
        WHERE id = ${body.id};
      `
    }
  }
}
export const contactsService = new ContactsService()
