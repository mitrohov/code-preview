import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostEnglishLevelSchema, PatchEnglishLevelSchema, GetEnglishLevelSchema} from "~/server/schemas/english-level"

export interface PostEnglishLevel extends InferType<typeof PostEnglishLevelSchema> {}
export interface PatchEnglishLevel extends InferType<typeof PatchEnglishLevelSchema> {}
export interface GetEnglishLevel extends InferType<typeof GetEnglishLevelSchema> {}

export class EnglishLevelService extends BaseApiService<GetEnglishLevel> {
  queries = {
    getAll: `SELECT * FROM ${DbTables.english_level} WHERE is_deleted = false AND is_system = false;`,
    getOneById(id: number): string {
      return `
        SELECT 
          english_level.id,
          english_level.title
        FROM ${DbTables.english_level}
        WHERE english_level.id = ${id};
      `
    },
    createOne(body: PostEnglishLevel): string {
      return `
        INSERT INTO ${DbTables.english_level} (title)
        VALUES ('${body.title}');
      `
    },
    updateOneById(body: PatchEnglishLevel): string {
      return `
        UPDATE ${DbTables.english_level}
        SET title = '${body.title}'
        WHERE id = ${body.id};
      `
    }
  }
}

export const englishLevelService = new EnglishLevelService()
