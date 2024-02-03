import {paymentService} from '~/server/types/payment'
import {PostPaymentSchema} from "~/server/schemas/payment"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostPaymentSchema.validate(body, { strict: true });
  const response = await paymentService.createOne(paymentService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
