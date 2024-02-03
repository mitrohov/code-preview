import {scheduleService, PathSchedule} from '~/server/types/schedule'
import {PatchScheduleSchema} from "~/server/schemas/schedule"
export default eventHandler(async (event) => {
  const body = await readBody(event)

  if (Array.isArray(body)) {
    const data: PathSchedule[] = [];

    for await (const item of body) {
      const schedule = await PatchScheduleSchema.validate(item, { strict: true });
      data.push(schedule)
    }

    const response = await scheduleService.updateMany(scheduleService.queries.updateMany(data))
    if (response) return response
    throw createError({ statusCode: 500, message: 'Database error' })
  }
})
