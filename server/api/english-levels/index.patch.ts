import {englishLevelService} from '~/server/types/english-level'
import {PatchEnglishLevelSchema} from "~/server/schemas/english-level"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchEnglishLevelSchema.validate(body, { strict: true });
  const response = await englishLevelService.updateOneById(englishLevelService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
