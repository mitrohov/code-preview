import {scheduleService, PostSchedule} from '~/server/types/schedule'
import {PostScheduleSchema} from "~/server/schemas/schedule"
export default eventHandler(async (event) => {
  const body = await readBody(event)

  if (Array.isArray(body)) {
    const data: PostSchedule[] = [];

    for await (const item of body) {
      const schedule = await PostScheduleSchema.validate(item, { strict: true });
      data.push(schedule)
    }

    const response = await scheduleService.createMany(scheduleService.queries.createMany(data))
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  }
})
