import {eventsService, PostEvent} from '~/server/types/event'
import {PostEventSchema} from "~/server/schemas/event"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  let response

  if (Array.isArray(body)) {
    const data: PostEvent[] = [];
    for await (const item of body) {
      const schedule = await PostEventSchema.validate(item, { strict: true });
      data.push(schedule)
    }
    response = await eventsService.createMany(eventsService.queries.createMany(data))
  } else {
    const data = await PostEventSchema.validate(body, { strict: true });
    response = await eventsService.createOne(eventsService.queries.createOne(data))
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
