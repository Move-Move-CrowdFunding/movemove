<script setup lang="ts">
import type { ResponseData } from '~/types/response'
import { BaseDialog } from '#components'
definePageMeta({
  layout: 'custom-layout'
})
const modal = useModal()
const toast = useToast()

const isLogin = useIsLoginStore()

const currentView = ref('login')

const loginForm = ref({
  email: '',
  password: ''
})
const registerForm = ref({
  nickName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 註冊
const submitSignUp = async () => {
  await getFetchData({
    url: '/user/sign-up',
    method: 'POST',
    params: {
      nickName: registerForm.value.nickName,
      email: registerForm.value.email,
      password: registerForm.value.password
    }
  })
    .then((res) => {
      // console.log('res', res)
      alert((res as ResponseData).message)
      currentView.value = 'login'
      registerForm.value = {
        nickName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    })
    .catch((err) => {
      // console.log(err)
      alert((err as ResponseData).message)
    })
}

// 登入
const submitLogin = async () => {
  await getFetchData({
    url: '/user/login',
    method: 'POST',
    params: {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
  })
    .then((res) => {
      const { token, auth } = (res as ResponseData).results
      useCookie('userToken').value = token
      console.log('isLogin', isLogin)
      // 登入後 isLogin 本來是true，重整後就變成false
      isLogin.isLogin = true
      isLogin.getUserData()
      toast.add({
        title: (res as ResponseData).message,
        timeout: 1000,
        callback: async () => {
          await navigateTo(auth ? '/admin' : '/')
        }
      })
    })
    .catch((err) => {
      modal.open(BaseDialog, {
        title: (err as ResponseData).status,
        message: (err as ResponseData).message
      })
    })
}

const forgotPasswordForm = ref('')
const forgotPassword = () => {
  getFetchData({
    url: '/user/forget-password',
    method: 'POST',
    params: {
      email: forgotPasswordForm.value
    }
  })
    .then((res) => {
      alert((res as ResponseData).message)
      forgotPasswordForm.value = ''
    })
    .catch((err) => {
      alert((err as ResponseData).message)
    })
}
</script>
<template>
  <div
    class="flex min-h-dvh w-full flex-col overflow-y-auto overflow-x-hidden bg-[url('~/assets/images/login.jpeg')] bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-sm before:content-[''] md:flex-row md:items-start md:justify-start"
  >
    <div
      class="flex min-h-dvh w-full flex-1 flex-col items-center justify-center overflow-auto py-8 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-neutral-50/65 before:content-[''] md:flex-row md:py-4 md:before:left-[inherit] md:before:w-1/2"
    >
      <div
        class="flex justify-center px-4 md:mb-auto md:h-full md:w-1/2 md:items-start md:justify-start"
      >
        <BaseLogo
          class="mb-4 h-[24px] w-[135px] flex-shrink-0 overflow-hidden whitespace-nowrap bg-secondary-1 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:mb-0 md:h-[40px] md:w-[227px]"
        />
      </div>
      <!-- 登入 -->
      <template v-if="currentView === 'login'">
        <div
          class="relative z-10 flex w-full justify-center p-6 md:h-full md:w-1/2 md:items-center"
        >
          <div class="mx-auto flex w-full flex-col space-y-4 md:max-w-[500px]">
            <h3 class="peer text-center text-lg text-neutral-900">登入</h3>
            <div class="space-y-6 peer-[&]:mt-6">
              <BaseInputField
                v-model="loginForm.email"
                input-title="E-mail"
                placeholder="E-mail"
                is-required
              />
              <BaseInputField
                v-model="loginForm.password"
                type="password"
                input-title="Password"
                placeholder="Password"
                is-required
              />
            </div>
            <div class="flex items-center justify-between">
              <p>
                還沒有帳號？
                <a
                  class="cursor-pointer px-4 py-1 text-secondary-2 underline"
                  @click="currentView = 'register'"
                  >註冊</a
                >
              </p>
              <p
                class="cursor-pointer px-4 py-1 text-secondary-2 underline"
                @click="currentView = 'forgot'"
              >
                忘記密碼
              </p>
            </div>
            <UButton size="lg" @click="submitLogin"> 登入 </UButton>
          </div>
        </div>
      </template>

      <!-- 忘記密碼 -->
      <template v-if="currentView === 'forgot'">
        <div
          class="relative z-10 flex w-full justify-center p-6 md:h-full md:w-1/2 md:items-center"
        >
          <div class="mx-auto flex w-full flex-col space-y-4 md:max-w-[500px]">
            <h3 class="peer text-center text-lg text-neutral-900">忘記密碼</h3>
            <div class="space-y-6 peer-[&]:mt-6">
              <BaseInputField
                v-model="forgotPasswordForm"
                input-title="E-mail"
                placeholder="請輸入 E-mail"
                is-required
              />
            </div>
            <div class="flex items-center justify-between">
              <a
                class="cursor-pointer px-4 py-1 text-secondary-2 underline"
                @click="currentView = 'login'"
                >回登入頁</a
              >
            </div>
            <UButton size="lg" @click="forgotPassword"> 獲取新密碼 </UButton>
          </div>
        </div>
      </template>

      <!-- 註冊 -->
      <template v-if="currentView === 'register'">
        <div
          class="relative z-10 flex w-full justify-center p-6 md:h-full md:w-1/2 md:items-center"
        >
          <div class="mx-auto flex w-full flex-col space-y-4 md:max-w-[500px]">
            <h3 class="peer text-center text-lg text-neutral-900">註冊</h3>
            <div class="space-y-6 peer-[&]:mt-6">
              <BaseInputField
                v-model="registerForm.nickName"
                input-title="名稱"
                placeholder="請輸入 名稱"
                is-required
              />
              <BaseInputField
                v-model="registerForm.email"
                input-title="E-mail"
                placeholder="請輸入 E-mail"
                is-required
              />
              <BaseInputField
                v-model="registerForm.password"
                type="password"
                input-title="密碼"
                placeholder="請輸入密碼"
                is-required
              />
            </div>
            <div class="flex items-center justify-between">
              <p>
                已經有帳號？
                <a
                  class="cursor-pointer px-4 py-1 text-secondary-2 underline"
                  @click="currentView = 'login'"
                  >登入</a
                >
              </p>
            </div>
            <UButton size="lg" @click="submitSignUp"> 註冊 </UButton>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="scss" scoped>
button {
  @apply min-h-[40px] justify-center rounded-lg bg-secondary-2 px-5 py-2 text-neutral-50 transition-all hover:bg-primary-2;
}
</style>
