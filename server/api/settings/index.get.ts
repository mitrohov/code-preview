import {settingsService} from '~/server/types/settings'

export default eventHandler(async () => {
  const response = await settingsService.getOneById(settingsService.queries.getOneById(1))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
