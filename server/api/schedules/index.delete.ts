import {scheduleService} from '~/server/types/schedule'
export default eventHandler(async (event) => {
  const query = getQuery(event)
  const id = Number(query.id)

  if (id) {
    const response = await scheduleService.deleteOneById(scheduleService.queries.deleteOneById(id))
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  }

  throw createError({ statusCode: 500, message: 'Not event category id' })
})
