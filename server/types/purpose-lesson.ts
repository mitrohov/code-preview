import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostPurposeLessonSchema, PatchPurposeLessonSchema, GetPurposeLessonSchema} from "~/server/schemas/purpose-lesson"

export interface PostPurposeLesson extends InferType<typeof PostPurposeLessonSchema> {}
export interface PatchPurposeLesson extends InferType<typeof PatchPurposeLessonSchema> {}
export interface GetPurposeLesson extends InferType<typeof GetPurposeLessonSchema> {}

export class PurposeLessonService extends BaseApiService<GetPurposeLesson> {
  queries = {
    getAll: `SELECT * FROM ${DbTables.purpose_lesson} WHERE is_deleted = false AND is_system = false;`,
    getOneById(id: number): string {
      return `
        SELECT 
          purpose_lesson.id,
          purpose_lesson.title
        FROM ${DbTables.purpose_lesson}
        WHERE purpose_lesson.id = ${id};
      `
    },
    createOne(body: PostPurposeLesson): string {
      return `
        INSERT INTO ${DbTables.purpose_lesson} (title)
        VALUES ('${body.title}');
      `
    },
    updateOneById(body: PatchPurposeLesson): string {
      return `
        UPDATE ${DbTables.purpose_lesson}
        SET title = '${body.title}'
        WHERE id = ${body.id};
      `
    }
  }
}

export const purposeLessonService = new PurposeLessonService()
