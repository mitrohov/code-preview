import {orderPlatformService} from '~/server/types/order-platform'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await orderPlatformService.getOneById(orderPlatformService.queries.getOneById(id))
  } else {
    response = await orderPlatformService.getAll(orderPlatformService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
