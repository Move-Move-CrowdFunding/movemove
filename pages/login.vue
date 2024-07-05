<script setup lang="ts">
import { z } from 'zod'
import { toastStatus, errorStatus, successStatus } from '@/utils/modalSetting'
import { formGroupConfig, inputConfig } from '~/nuxtui/props'
import type { ResponseData } from '~/types/response'
definePageMeta({
  layout: 'custom-layout'
})

const navigate = ref('')
const toastStyle = ref({})
const toggleToast = ref(false)
const confirm = async () => {
  toggleToast.value = false
  if (navigate.value) {
    await navigateTo(navigate.value)
  }
}

const isLogin = useIsLoginStore()
const loading = useLoadingStore()
const WS = useWSStore()

const currentView = ref('login')
const requestLoading = ref(false)
const registerForm = ref({
  nickName: '',
  email: '',
  password: ''
})
const schemaRegister = z.object({
  nickName: z.string().min(1, '請填寫名稱'),
  email: z.string().email('請輸入有效的 email'),
  password: z.string().min(8, '至少 8 碼')
})
const registerResult = computed(() => schemaRegister.safeParse(registerForm.value))

// 註冊
const submitSignUp = async () => {
  requestLoading.value = true
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
      // alert((res as ResponseData).message)
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
      currentView.value = 'login'
      registerForm.value = {
        nickName: '',
        email: '',
        password: ''
      }
    })
    .catch((err) => {
      // alert((err as ResponseData).message)
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || err.message
      )
    })
    .finally(() => {
      requestLoading.value = false
    })
}

// 登入
const loginForm = ref({
  email: '',
  password: ''
})
const schemaLogin = z.object({
  email: z.string().email('請輸入有效的 email'),
  password: z.string().min(8, '至少 8 碼')
})
const loginResult = computed(() => schemaLogin.safeParse(loginForm.value))

const submitLogin = async () => {
  requestLoading.value = true
  await getFetchData({
    url: '/user/login',
    method: 'POST',
    params: {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
  })
    .then(async (res) => {
      const { token, auth } = (res as ResponseData).results
      useCookie('userToken').value = token
      isLogin.getUserData()
      await WS.connection()
      WS.socket.emit('getUnRead')

      navigate.value = auth ? '/admin' : '/'
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
    })
    .catch((err) => {
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || err.message
      )
    })
    .finally(() => {
      requestLoading.value = false
    })
}

// 忘記密碼
const forgotPasswordForm = ref({
  email: ''
})
const schemaForgotPassword = z.object({
  email: z.string().email('請輸入有效的 email')
})
const forgotResult = computed(() => schemaForgotPassword.safeParse(forgotPasswordForm.value))

const forgotPassword = () => {
  requestLoading.value = true
  getFetchData({
    url: '/user/forget-password',
    method: 'POST',
    params: {
      email: forgotPasswordForm.value.email
    }
  })
    .then((res) => {
      // alert((res as ResponseData).message)
      toggleToast.value = true
      toastStyle.value = toastStatus(successStatus.icon, successStatus.iconClass, res.message)
      forgotPasswordForm.value.email = ''
    })
    .catch((err) => {
      // alert((err as ResponseData).message)
      toggleToast.value = true
      toastStyle.value = toastStatus(
        errorStatus.icon,
        errorStatus.iconClass,
        err.msg || err.message
      )
    })
    .finally(() => {
      requestLoading.value = false
    })
}
onMounted(() => {
  loading.isGlobalLoading = false
})
</script>
<template>
  <div
    class="flex min-h-dvh w-full flex-col overflow-y-auto overflow-x-hidden bg-[url('~/assets/images/login.jpeg')] bg-cover bg-center before:absolute before:inset-0 before:backdrop-blur-sm before:content-[''] md:flex-row md:items-start md:justify-start"
  >
    <div
      class="flex min-h-dvh w-full flex-1 flex-col items-center justify-center overflow-auto py-8 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:block before:bg-neutral-50/90 before:content-[''] md:flex-row md:py-4 md:before:left-[inherit] md:before:w-1/2"
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
            <h3 class="text-center text-lg text-neutral-900">登入</h3>
            <UForm
              :schema="schemaLogin"
              :state="loginForm"
              class="relative z-10 space-y-4"
              @submit="submitLogin"
            >
              <UFormGroup :ui="formGroupConfig" required label="Email" name="email">
                <UInput v-model="loginForm.email" placeholder="Email" :ui="inputConfig" size="xl" />
              </UFormGroup>

              <UFormGroup :ui="formGroupConfig" required label="Password" name="password">
                <UInput
                  v-model="loginForm.password"
                  :ui="inputConfig"
                  size="xl"
                  type="password"
                  placeholder="Password"
                />
              </UFormGroup>
              <UButton
                type="submit"
                size="lg"
                block
                :disabled="!loginResult.success"
                :loading="requestLoading"
              >
                登入
              </UButton>
            </UForm>
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
            <UForm
              :schema="schemaForgotPassword"
              :state="forgotPasswordForm"
              class="relative z-10 space-y-4"
              @submit="forgotPassword"
            >
              <UFormGroup :ui="formGroupConfig" required label="Email" name="email">
                <UInput
                  v-model="forgotPasswordForm.email"
                  placeholder="Email"
                  :ui="inputConfig"
                  size="xl"
                />
              </UFormGroup>
              <UButton
                type="submit"
                size="lg"
                block
                :disabled="!forgotResult.success"
                :loading="requestLoading"
              >
                獲取新密碼
              </UButton>
              <div class="flex items-center justify-between">
                <a
                  class="cursor-pointer px-4 py-1 text-secondary-2 underline"
                  @click="currentView = 'login'"
                  >回登入頁</a
                >
              </div>
            </UForm>
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
            <UForm
              :schema="schemaRegister"
              :state="registerForm"
              class="relative z-10 space-y-4"
              @submit="submitSignUp"
            >
              <UFormGroup :ui="formGroupConfig" required label="名稱" name="nickName">
                <UInput
                  v-model="registerForm.nickName"
                  placeholder="請輸入 名稱"
                  size="xl"
                  :ui="inputConfig"
                />
              </UFormGroup>
              <UFormGroup :ui="formGroupConfig" required label="Email" name="email">
                <UInput
                  v-model="registerForm.email"
                  placeholder="請輸入 E-mail"
                  :ui="inputConfig"
                  size="xl"
                />
              </UFormGroup>
              <UFormGroup :ui="formGroupConfig" required label="密碼" name="password">
                <UInput
                  v-model="registerForm.password"
                  placeholder="請輸入密碼"
                  size="xl"
                  :ui="inputConfig"
                  type="password"
                />
              </UFormGroup>
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
              <UButton
                type="submit"
                size="lg"
                block
                :disabled="!registerResult.success"
                :loading="requestLoading"
              >
                註冊
              </UButton>
            </UForm>
          </div>
        </div>
      </template>
    </div>
    <BaseToast
      v-model="toggleToast"
      :msg="toastStyle.msg"
      :icon-class="toastStyle.iconClass"
      :icon="toastStyle.icon"
      @confirm="confirm"
    ></BaseToast>
  </div>
</template>
<style lang="scss" scoped>
button {
  @apply min-h-[40px] justify-center rounded-lg bg-secondary-2 px-5 py-2 text-neutral-50 shadow-none transition hover:bg-primary-2 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-50 disabled:opacity-100;
}
</style>
