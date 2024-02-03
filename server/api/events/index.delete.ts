import {eventsService} from '~/server/types/event'
export default eventHandler(async (event) => {
  const query = getQuery(event)
  const id = Number(query.id)

  if (id) {
    const response = await eventsService.deleteOneById(eventsService.queries.deleteOneById(id))
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  }

  throw createError({ statusCode: 500, message: 'Not event category id' })
})
