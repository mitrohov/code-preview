import {authModule} from "~/server/types/auth";

export default defineEventHandler((event) => {
  if (event.node.req.url !== '/') {
    const {token} = parseCookies(event)
    if (token) {
      if (!authModule.jwtVerify(token)) {
        setCookie(event, 'token', '', {
          sameSite: true
        })
      }
    }
  }
})
