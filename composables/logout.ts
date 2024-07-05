const isLogin = useIsLoginStore()

export const logout = async () => {
  const WS = useWSStore()
  const cookie = useCookie('userToken')
  cookie.value = null
  isLogin.userData = {
    aboutMe: '',
    address: '',
    auth: 0,
    avatar: '',
    createTime: 0,
    email: '',
    gender: 0,
    id: '',
    nickName: '',
    phone: '',
    teamName: '',
    updateTime: 0,
    userName: 0
  }
  isLogin.isLogin = false
  if (WS.socket && WS.socket.connected) {
    WS.socket.disconnect()
  }
  alert('已登出')
  await navigateTo('/')
}
