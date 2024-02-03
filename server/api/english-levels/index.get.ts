import {englishLevelService} from '~/server/types/english-level'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await englishLevelService.getOneById(englishLevelService.queries.getOneById(id))
  } else {
    response = await englishLevelService.getAll(englishLevelService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
