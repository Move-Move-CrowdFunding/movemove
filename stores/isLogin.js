import { defineStore } from 'pinia'

export const useIsLoginStore = defineStore('isLogin', () => {
  const isLogin = ref(false)

  const checkLogin = () => {
    getFetchData({
      url: '/user/check-login',
      method: 'POST'
    })
      .then((res) => {
        console.log(res.message)
        // alert((res as ResponseData).message)
        isLogin.value = true
        getUserData()
      })
      .catch((err) => {
        console.log(err.message)
        // alert((err as ResponseData).message)
      })
  }

  const userData = ref({
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
  })

  const getUserData = async () => {
    await getFetchData({
      url: '/user',
      method: 'GET'
    })
      .then((res) => {
        console.log(res)
        userData.value = res.results
      })
      .catch((err) => console.log(err))
  }

  return { isLogin, checkLogin, userData, getUserData }
})
