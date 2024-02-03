import {contactsService} from '~/server/types/contacts'

export default eventHandler(async (event) => {
  const query = getQuery(event)
  let response

  if (query.id) {
    const id = Number(query.id)
    response = await contactsService.getOneById(contactsService.queries.getOneById(id))
  } else {
    response = await contactsService.getAll(contactsService.queries.getAll)
  }

  if (response) return response
  throw createError({ statusCode: 500, message: 'Database error' })
})
