<script setup>
import { z } from 'zod'

const tab = ref(1)
const isLogin = useIsLoginStore()
const loading = useLoadingStore()

const tempUser = ref({})

const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
      return
    }
  }
  getTempUser(isLogin.userData)
  loading.isGlobalLoading = false
}
const getTempUser = (data) => {
  tempUser.value = JSON.parse(JSON.stringify(data))
}
const editUser = async () => {
  loading.isGlobalLoading = true

  console.log('editUser')
  await getFetchData({
    url: '/user',
    method: 'PATCH',
    params: tempUser.value
  })
    .then((res) => {
      getTempUser(res.results)
      alert(res.message)
      isLogin.getUserData()
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      loading.isGlobalLoading = false
    })
}

const tempPassword = ref({
  old: '',
  new: '',
  newCheck: ''
})
const changePassword = async () => {
  loading.isGlobalLoading = true

  await getFetchData({
    url: '/member/password',
    method: 'PATCH',
    params: {
      oldPassword: tempPassword.value.old,
      newPassword: tempPassword.value.new
    }
  })
    .then((res) => {
      console.log(res)
      alert(res.message)
      tempPassword.value = {
        old: '',
        new: '',
        newCheck: ''
      }
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      alert(err.message)
      loading.isGlobalLoading = false
    })
}
// const showPassword = ref(false)

const uploadedFile = ref(null)
const uploadFile = async () => {
  const formData = new FormData()
  formData.append('資料屬性(根據後端決定)', uploadedFile.value.files[0])

  await getFetchData({
    url: '/upload',
    method: 'POST',
    params: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      tempUser.value.avatar = res.results.imageUrl
      editUser()
    })
    .catch((err) => {
      console.log(err)
    })
}
const passwordSchema = z.object({
  old: z.string().refine((val) => val.length >= 1, {
    message: '請輸入舊密碼'
  }),
  new: z
    .string()
    .min(8, {
      message: '新密碼需大於8位'
    })
    .refine((val) => val !== tempPassword.value.old, {
      message: '新密碼不可與舊密碼相同'
    }),
  newCheck: z
    .string()
    .refine((val) => val.length >= 1, {
      message: '請確認新密碼'
    })
    .refine(() => tempPassword.value.new === tempPassword.value.newCheck, {
      message: '需與輸入新密碼相同'
    })
})
const infoSchema = z.object({
  phone: z
    .string()
    .refine((data) => /^\d+$/.test(data) || data.length === 0, {
      message: '僅能輸入數字'
    })
    .refine((data) => data.length >= 8 || data.length === 0, {
      message: '電話須至少8碼'
    }),
  nickName: z.string().refine((val) => val.length >= 1, {
    message: '請填寫顯示名稱'
  })
})

onMounted(() => {
  nextTick(() => {
    checkPermission()
  })
})
</script>
<template>
  <div class="py-10 lg:py-20">
    <div class="sm:px-auto container">
      <h1 class="mb-6 text-3xl sm:text-4xl lg:mb-10">帳戶設定</h1>
      <div class="mx-auto lg:w-[800px]">
        <div class="mb-6 flex items-start space-x-4 px-3 lg:px-6">
          <Avatar :src="isLogin.userData.avatar" size="lg" class="group">
            <template #upload>
              <div
                class="invisible absolute bottom-0 right-0 opacity-0 transition-all group-hover:visible group-hover:opacity-100"
              >
                <label
                  for="uploadImage"
                  class="flex cursor-pointer items-center justify-center rounded bg-secondary-1 p-0.5 text-white hover:bg-primary-1"
                >
                  <Icon name="material-symbols:upload" width="20" height="20" color="white" />
                </label>
                <input
                  id="uploadImage"
                  ref="uploadedFile"
                  type="file"
                  class="hidden"
                  @change="uploadFile"
                />
              </div>
            </template>
          </Avatar>

          <div class="overflow-hidden">
            <div class="mb-3 break-words text-xl font-bold lg:text-3xl">
              {{ isLogin.userData.nickName }}
            </div>
            <div class="break-words lg:text-xl">{{ isLogin.userData.email }}</div>
          </div>
        </div>
        <div class="mb-4 flex gap-4 font-bold">
          <button
            class="border-b-2 py-1"
            :class="{ 'border-primary-1': tab === 1, 'border-transparent': tab === 2 }"
            @click="tab = 1"
          >
            會員資料
          </button>
          <button
            class="border-b-2 py-1"
            :class="{ 'border-primary-1': tab === 2, 'border-transparent': tab === 1 }"
            @click="tab = 2"
          >
            修改密碼
          </button>
        </div>
        <div class="bg-secondary-5 px-8 py-10">
          <!-- <form v-if="tab === 1" class="hidden space-y-4" @submit.prevent="editUser()">
            <div class="flex items-center space-x-4">
              <label for="username" class="w-1/4 font-bold sm:w-1/6">真實姓名</label>
              <div class="grow">
                <input
                  id="username"
                  v-model="tempUser.userName"
                  type="text"
                  class="w-full px-3 py-2"
                  placeholder="請輸入真實姓名"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="nickName" class="w-1/4 font-bold sm:w-1/6">顯示名稱</label>
              <div class="grow">
                <input
                  id="nickName"
                  v-model="tempUser.nickName"
                  type="text"
                  class="w-full px-3 py-2"
                  placeholder="請輸入顯示名稱"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="gender" class="w-1/4 font-bold sm:w-1/6">性別</label>
              <div class="grow">
                <select
                  id=""
                  v-model="tempUser.gender"
                  name="gender"
                  class="min-h-10 w-full px-3 py-2"
                >
                  <option value="0" selected disabled>請選擇性別</option>
                  <option value="1">男</option>
                  <option value="2">女</option>
                </select>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="phone" class="w-1/4 font-bold sm:w-1/6">連絡電話</label>
              <div class="grow">
                <input
                  id="phone"
                  v-model="tempUser.phone"
                  type="text"
                  class="w-full px-3 py-2"
                  placeholder="請輸入連絡電話"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="address" class="w-1/4 font-bold sm:w-1/6">收件地址</label>
              <div class="grow">
                <input
                  id="address"
                  v-model="tempUser.address"
                  type="text"
                  class="w-full px-3 py-2"
                  placeholder="請輸入收件地址"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="teamName" class="w-1/4 font-bold sm:w-1/6">所屬團隊</label>
              <div class="grow">
                <input
                  id="teamName"
                  v-model="tempUser.teamName"
                  type="text"
                  class="w-full px-3 py-2"
                  placeholder="請輸入所屬團隊"
                />
              </div>
            </div>
            <div class="flex items-start space-x-4">
              <label for="aboutMe" class="w-1/4 font-bold sm:w-1/6">關於我</label>
              <div class="grow">
                <textarea
                  id="aboutMe"
                  v-model="tempUser.aboutMe"
                  name=""
                  rows="4"
                  class="w-full resize-none px-3 py-2"
                  placeholder="請輸入簡介"
                ></textarea>
              </div>
            </div>
            <div class="flex justify-between pt-6">
              <button
                class="inline-block rounded-lg bg-primary-1 px-4 py-2 text-white"
                @click.prevent="getTempUser(isLogin.userData)"
              >
                重置
              </button>
              <button
                type="submit"
                class="inline-block rounded-lg bg-secondary-1 px-4 py-2 text-white"
              >
                更新
              </button>
            </div>
          </form> -->
          <!-- <form v-else action="" class="space-y-4">
            <div class="flex items-center space-x-4">
              <label for="oldPassword" class="w-1/4 font-bold sm:w-1/6">舊密碼</label>
              <div class="relative grow">
                <input
                  id="oldPassword"
                  v-model="tempPassword.old"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-3 py-2"
                  placeholder="請輸入舊密碼"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="newPassword" class="w-1/4 font-bold sm:w-1/6">新密碼</label>
              <div class="grow">
                <input
                  id="newPassword"
                  v-model="tempPassword.new"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-3 py-2"
                  placeholder="請輸入新密碼"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <label for="checkPassword" class="w-1/4 font-bold sm:w-1/6">密碼確認</label>
              <div class="grow">
                <input
                  id="checkPassword"
                  v-model="tempPassword.newCheck"
                  :type="showPassword ? 'text' : 'password'"
                  class="w-full px-3 py-2"
                  placeholder="再次輸入新密碼"
                />
              </div>
            </div>
            <div class="flex items-center">
              <input
                id="showAll"
                v-model="showPassword"
                type="checkbox"
                class="mr-2 h-5 w-5 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
              />
              <label for="showAll" class="flex items-center gap-2">顯示密碼</label>
            </div>
            <div class="flex justify-between pt-6">
              <button
                class="inline-block rounded-lg bg-primary-1 px-4 py-2 text-white"
                @click.prevent="tempPassword = { old: '', new: '', newCheck: '' }"
              >
                重置
              </button>
              <button
                class="inline-block rounded-lg bg-secondary-1 px-4 py-2 text-white disabled:bg-neutral-400"
                :disabled="
                  tempPassword.new !== tempPassword.newCheck ||
                  !tempPassword.new ||
                  !tempPassword.newCheck ||
                  !tempPassword.old ||
                  tempPassword.new == tempPassword.old
                "
                @click.prevent="changePassword"
              >
                更新
              </button>
            </div>
          </form> -->
          <div v-if="tab === 1" id="userInfoForm">
            <UForm :schema="infoSchema" :state="tempUser" @submit="editUser">
              <div class="space-y-6">
                <UFormGroup label="真實姓名" name="username">
                  <UInput
                    v-model="tempUser.userName"
                    size="xl"
                    placeholder="請輸入真實姓名"
                    input-class="bg-white"
                  />
                </UFormGroup>
                <UFormGroup label="顯示名稱" required name="nickName">
                  <UInput
                    v-model="tempUser.nickName"
                    size="xl"
                    placeholder="請輸入顯示名稱"
                    input-class="bg-white"
                  />
                </UFormGroup>
                <UFormGroup label="性別" name="gender">
                  <USelect
                    variant="outline"
                    :options="[
                      { id: 0, name: '不顯示' },
                      { id: 1, name: '男' },
                      { id: 2, name: '女' }
                    ]"
                    value-attribute="id"
                    option-attribute="name"
                    placeholder="請選擇性別"
                    size="xl"
                  />
                </UFormGroup>
                <UFormGroup label="連絡電話" name="phone">
                  <UInput
                    v-model="tempUser.phone"
                    size="xl"
                    placeholder="請填寫電話"
                    type="tel"
                    input-class="bg-white"
                  />
                </UFormGroup>
                <UFormGroup label="收件地址" name="address">
                  <UInput
                    v-model="tempUser.address"
                    size="xl"
                    placeholder="請輸入收件地址"
                    input-class="bg-white"
                  />
                </UFormGroup>
              </div>
              <div class="flex justify-between pt-6">
                <button
                  class="inline-block rounded-lg bg-primary-1 px-4 py-2 text-white"
                  @click.prevent="getTempUser(isLogin.userData)"
                >
                  重置
                </button>
                <button
                  type="submit"
                  class="inline-block rounded-lg bg-secondary-1 px-4 py-2 text-white"
                >
                  更新
                </button>
              </div>
            </UForm>
          </div>
          <div v-else>
            <UForm :schema="passwordSchema" :state="tempPassword" @submit.prevent="changePassword">
              <div class="space-y-6">
                <UFormGroup name="old" label="舊密碼" required>
                  <UInput
                    v-model="tempPassword.old"
                    size="xl"
                    placeholder="請輸入舊密碼"
                    input-class="bg-white"
                    type="password"
                  />
                </UFormGroup>
                <UFormGroup name="new" label="新密碼" required>
                  <UInput
                    v-model="tempPassword.new"
                    size="xl"
                    placeholder="請輸入新密碼"
                    input-class="bg-white"
                    type="password"
                  />
                </UFormGroup>
                <UFormGroup name="newCheck" label="密碼確認" required>
                  <UInput
                    v-model="tempPassword.newCheck"
                    size="xl"
                    placeholder="再次輸入新密碼"
                    input-class="bg-white"
                    type="password"
                  />
                </UFormGroup>
              </div>
              <div class="flex justify-between pt-6">
                <button
                  class="inline-block rounded-lg bg-primary-1 px-4 py-2 text-white"
                  @click.prevent="tempPassword = { old: '', new: '', newCheck: '' }"
                >
                  重置
                </button>
                <button
                  class="inline-block rounded-lg bg-secondary-1 px-4 py-2 text-white disabled:bg-neutral-400"
                  :disabled="
                    tempPassword.new !== tempPassword.newCheck ||
                    !tempPassword.new ||
                    !tempPassword.newCheck ||
                    !tempPassword.old ||
                    tempPassword.new == tempPassword.old
                  "
                  @click.prevent="changePassword"
                >
                  更新
                </button>
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  outline: 1px solid #a000;
}
#userInfoForm label {
  @apply !text-lg !font-bold;
}
</style>
