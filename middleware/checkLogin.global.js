const list = ['/admin', '/member', '/create/success', 'member/my-projects', '/create']

export default defineNuxtRouteMiddleware(async () => {
  const isLogin = useIsLoginStore()
  if (list.includes(to.path) && !isLogin.checkLogin()) {
    await isLogin.checkLogin()
    // console.log('checkLogin', to, from)
  }
})
