import {authModule, type User} from "~/server/types/auth";

export default eventHandler(async (event) => {
  const user: User = await readBody(event)
  const token: string | undefined = await authModule.signIn(user.login, user.password)

  if (token) {
    setCookie(event, 'token', token, {
      sameSite: true
    })
    return {token}
  } else {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }
})
