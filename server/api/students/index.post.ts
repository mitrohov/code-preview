import {studentService} from '~/server/types/student'
import {PostStudentSchema} from "~/server/schemas/student"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostStudentSchema.validate(body, { strict: true });
  const response = await studentService.createOne(studentService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
