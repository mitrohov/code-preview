export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token')
  if (to.path !== '/auth') {
    if (!token.value) {
      return navigateTo('/auth')
    }
  } else {
    if (token.value) {
      return navigateTo('/event-calendar')
    }
  }
})
