const isLogin = useIsLoginStore()

export const logout = async () => {
  const cookie = useCookie('userToken')
  cookie.value = null
  isLogin.isLogin = false
  alert('已登出')
  await navigateTo('/')
}
