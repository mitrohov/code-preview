import {eventsCategoryService} from '~/server/types/events-category'
import {PatchEventCategorySchema} from "~/server/schemas/event-category"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchEventCategorySchema.validate(body, { strict: true });
  const response = await eventsCategoryService.updateOneById(eventsCategoryService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
