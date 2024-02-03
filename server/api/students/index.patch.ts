import {studentService} from '~/server/types/student'
import {PatchStudentSchema} from "~/server/schemas/student"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchStudentSchema.validate(body, { strict: true });
  const response = await studentService.updateOneById(studentService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
