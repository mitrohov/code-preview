import {contactsService} from '~/server/types/contacts'
import {PatchContactSchema} from "~/server/schemas/contact"
export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PatchContactSchema.validate(body, { strict: true });
  const response = await contactsService.updateOneById(contactsService.queries.updateOneById(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
