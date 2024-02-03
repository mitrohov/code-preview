import {englishLevelService} from '~/server/types/english-level'
import {PostEnglishLevelSchema} from "~/server/schemas/english-level"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostEnglishLevelSchema.validate(body, { strict: true });
  const response = await englishLevelService.createOne(englishLevelService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
