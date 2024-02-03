import {eventsService} from '~/server/types/event'
import {PatchEventSchema} from "~/server/schemas/event"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchEventSchema.validate(body, { strict: true });
  const response = await eventsService.updateOneById(eventsService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
