import {BaseApiService} from "~/server/database/db-service";
import {DbTables} from "~/server/types/db-tables";
import type { InferType } from 'yup';
import {PostOrderPlatformSchema, PatchOrderPlatformSchema, GetOrderPlatformSchema} from "~/server/schemas/order-platform"

export interface PostOrderPlatform extends InferType<typeof PostOrderPlatformSchema> {}
export interface PatchOrderPlatform extends InferType<typeof PatchOrderPlatformSchema> {}
export interface GetOrderPlatform extends InferType<typeof GetOrderPlatformSchema> {}

export class OrderPlatformService extends BaseApiService<GetOrderPlatform> {
  queries = {
    getAll: `SELECT * FROM ${DbTables.order_platform} WHERE is_deleted = false;`,
    getOneById(id: number): string {
      return `
        SELECT 
          order_platform.id,
          order_platform.title
        FROM ${DbTables.order_platform}
        WHERE order_platform.id = ${id};
      `
    },
    createOne(body: PostOrderPlatform): string {
      return `
        INSERT INTO ${DbTables.order_platform} (title)
        VALUES ('${body.title}');
      `
    },
    updateOneById(body: PatchOrderPlatform): string {
      return `
        UPDATE ${DbTables.order_platform}
        SET title = '${body.title}'
        WHERE id = ${body.id};
      `
    }
  }
}

export const orderPlatformService = new OrderPlatformService()
