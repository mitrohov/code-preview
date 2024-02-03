import {paymentService} from '~/server/types/payment'
export default eventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id

  if (id) {
    const response = await paymentService.deleteOneById(id as string)
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  }

  throw createError({ statusCode: 500, message: 'Not event category id' })
})
