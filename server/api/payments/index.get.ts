import {paymentService} from '~/server/types/payment'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await paymentService.getOneById(paymentService.queries.getOneById(id))
  } else {
    response = await paymentService.getAll(paymentService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
