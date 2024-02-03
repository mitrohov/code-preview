import {eventsCategoryService} from '~/server/types/events-category'
import {PostEventCategorySchema} from "~/server/schemas/event-category"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostEventCategorySchema.validate(body, { strict: true });
  const response = await eventsCategoryService.createOne(eventsCategoryService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
