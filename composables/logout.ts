const isLogin = useIsLoginStore()

export const logout = () => {
  const cookie = useCookie('userToken')
  cookie.value = null
  isLogin.isLogin = false
  alert('已登出')
}
