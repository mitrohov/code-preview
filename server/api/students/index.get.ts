import {studentService} from '~/server/types/student'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await studentService.getOneById(studentService.queries.getOneById(id))
  } else {
    response = await studentService.getAll(studentService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
