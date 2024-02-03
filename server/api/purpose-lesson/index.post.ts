import {purposeLessonService} from '~/server/types/purpose-lesson'
import {PostPurposeLessonSchema} from "~/server/schemas/purpose-lesson"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostPurposeLessonSchema.validate(body, { strict: true });
  const response = await purposeLessonService.createOne(purposeLessonService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
