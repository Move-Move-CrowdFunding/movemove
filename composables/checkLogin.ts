export const checkLogin = async (to: any) => {
  const isLogin = useIsLoginStore()
  if (to.meta.requiresAuth) {
    await isLogin.checkLogin()
    if (isLogin.isLogin) {
      return
    }
    return navigateTo('/login')
  }
}
