import {settingsService} from '~/server/types/settings'
import {PatchSettingsSchema} from "~/server/schemas/settings"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchSettingsSchema.validate(body, { strict: true });
  const response = await settingsService.updateOneById(settingsService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
