import {eventsService} from '~/server/types/event'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await eventsService.getOneById(eventsService.queries.getOneById(id))
  } else {
    response = await eventsService.getAll(eventsService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
