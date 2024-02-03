import {orderPlatformService} from '~/server/types/order-platform'
import {PatchOrderPlatformSchema} from "~/server/schemas/order-platform"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchOrderPlatformSchema.validate(body, { strict: true });
  const response = await orderPlatformService.updateOneById(orderPlatformService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
