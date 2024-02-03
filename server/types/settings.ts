import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostSettingsSchema, PatchSettingsSchema, GetSettingsSchema} from "~/server/schemas/settings"

export interface PostSettings extends InferType<typeof PostSettingsSchema> {}
export interface PatchSettings extends InferType<typeof PatchSettingsSchema> {}
export interface GetSettings extends InferType<typeof GetSettingsSchema> {}

export class SettingsService extends BaseApiService<GetSettings> {
  queries = {
    getOneById(id: number) {
      return `SELECT * FROM ${DbTables.settings} WHERE id = ${id};`
    },
    updateOneById(body: PatchSettings) {
      return `
        UPDATE ${DbTables.settings}
        SET standard_hours_per_month = '${body.standard_hours_per_month}'
        WHERE id = ${body.id};
      `
    }
  }
}

export const settingsService = new SettingsService()
