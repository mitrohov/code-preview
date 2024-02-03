import {contactsService} from '~/server/types/contacts'
import {PostContactSchema} from "~/server/schemas/contact"

export default eventHandler(async (event) => {
  const body = await readBody(event)
  const data = await PostContactSchema.validate(body, { strict: true });
  const response = await contactsService.createOne(contactsService.queries.createOne(data))
  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
