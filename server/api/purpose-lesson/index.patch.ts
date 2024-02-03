import {purposeLessonService} from '~/server/types/purpose-lesson'
import {PatchPurposeLessonSchema} from "~/server/schemas/purpose-lesson"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchPurposeLessonSchema.validate(body, { strict: true });
  const response = await purposeLessonService.updateOneById(purposeLessonService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
