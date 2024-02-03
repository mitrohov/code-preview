import {paymentService} from '~/server/types/payment'
import {PatchPaymentSchema} from "~/server/schemas/payment"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchPaymentSchema.validate(body, { strict: true });
  const response = await paymentService.updateOneById(paymentService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
