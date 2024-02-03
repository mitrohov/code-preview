import {eventColorsService} from '~/server/types/event-color'

export default eventHandler(async () => {
  const response = await eventColorsService.getAll(eventColorsService.queries.getAll)
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
