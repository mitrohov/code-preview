import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostEventCategorySchema, PatchEventCategorySchema, GetEventCategorySchema} from "~/server/schemas/event-category"

export interface PostEventsCategory extends InferType<typeof PostEventCategorySchema> {}
export interface PatchEventsCategory extends InferType<typeof PatchEventCategorySchema> {}
export interface GetEventsCategory extends InferType<typeof GetEventCategorySchema> {}

export class EventsCategoryService extends BaseApiService<GetEventsCategory> {
  queries = {
    getAll: `
      SELECT 
        event_category.id,
        event_category.title,
        event_category.color_id,
        event_category.color_id,
        event_category.for_lesson,
        color.title AS color_title,
        color.code AS color_code
      FROM ${DbTables.event_category}
      INNER JOIN color ON event_category.color_id = color.id
      WHERE event_category.is_deleted = false;
    `,
    getOneById(id: number): string {
      return `
        SELECT 
          event_category.id,
          event_category.title,
          event_category.color_id,
          color.title AS color_title,
          color.code AS color_code
        FROM ${DbTables.event_category}
        INNER JOIN color ON event_category.color_id = color.id
        WHERE event_category.id = ${id};
      `
    },
    createOne(body: PostEventsCategory): string {
      return `
        INSERT INTO ${DbTables.event_category} (title, color_id)
        VALUES 
        ('${body.title}', ${body.color_id});
      `
    },
    updateOneById(body: PatchEventsCategory): string {
      return `
        UPDATE ${DbTables.event_category}
        SET
          title = '${body.title}',
          color_id = ${body.color_id}
        WHERE
          id = ${body.id};
      `
    }
  }
}

export const eventsCategoryService = new EventsCategoryService()
