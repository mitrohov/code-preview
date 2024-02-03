import {scheduleService} from '~/server/types/schedule'

export default eventHandler(async (event) => {
  if (event.context?.params?.id) {
    const id = Number(event.context?.params?.id)
    const response = await scheduleService.getManyById(scheduleService.queries.getAllByStudentId(id))
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  } else {
    throw createError({ statusCode: 500, message: 'Not student id' })
  }
})
