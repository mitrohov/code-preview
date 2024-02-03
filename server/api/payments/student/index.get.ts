import {paymentService} from '~/server/types/payment'

export default eventHandler(async (event) => {
  const query = getQuery(event)

  if (query.id) {
    const id: number = Number(query.id)
    const response = await paymentService.getByStudentIdForLesson(id)
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  } else {
    throw createError({ statusCode: 500, message: 'Not student id' })
  }


})
