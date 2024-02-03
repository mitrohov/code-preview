import {purposeLessonService} from '~/server/types/purpose-lesson'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await purposeLessonService.getOneById(purposeLessonService.queries.getOneById(id))
  } else {
    response = await purposeLessonService.getAll(purposeLessonService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
