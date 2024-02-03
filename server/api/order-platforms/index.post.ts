import {orderPlatformService} from '~/server/types/order-platform'
import {PostOrderPlatformSchema} from "~/server/schemas/order-platform"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostOrderPlatformSchema.validate(body, { strict: true });
  const response = await orderPlatformService.createOne(orderPlatformService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
