export default defineNuxtRouteMiddleware((to) => {
  checkLogin(to)
})
