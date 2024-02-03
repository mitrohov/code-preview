import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {GetEventColorSchema} from "~/server/schemas/event-color"

export interface GetEventColor extends InferType<typeof GetEventColorSchema> {}

export class EventColorsService extends BaseApiService<GetEventColor> {
  queries = {
    getAll: `SELECT * FROM ${DbTables.color}`,
  }
}

export const eventColorsService = new EventColorsService()
