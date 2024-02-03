import {eventsCategoryService} from '~/server/types/events-category'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await eventsCategoryService.getOneById(eventsCategoryService.queries.getOneById(id))
  } else {
    response = await eventsCategoryService.getAll(eventsCategoryService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
