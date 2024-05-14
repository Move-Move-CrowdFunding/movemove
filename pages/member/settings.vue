<script setup>
const tab = ref(1)
const isLogin = useIsLoginStore()

const tempUser = ref({})

const checkPermission = async () => {
  await isLogin.getUserData()
  if (isLogin.userData.email) {
    getTempUser(isLogin.userData)
  } else {
    await navigateTo('/login')
  }
}
const getTempUser = (data) => {
  tempUser.value = JSON.parse(JSON.stringify(data))
}
const editUser = async () => {
  await getFetchData({
    url: '/user',
    method: 'PATCH',
    params: tempUser.value
  })
    .then((res) => {
      getTempUser(res.results)
      alert(res.message)
      isLogin.getUserData()
    })
    .catch((err) => {
      console.log(err)
    })
}

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
        <div class="mb-6 flex items-center px-3 lg:px-6">
          <div
            class="relative mr-4 block h-20 w-20 rounded-full bg-cover bg-center sm:mr-10"
            :style="{ 'background-image': `url('${isLogin.userData.avatar}')` }"
          >
            <!-- <button class="absolute bottom-0 right-0 block h-6 w-6 bg-secondary-1 text-white">
              0
            </button> -->
          </div>
          <div>
            <div class="mb-3 text-xl font-bold lg:text-3xl">{{ isLogin.userData.nickName }}</div>
            <div class="lg:text-xl">{{ isLogin.userData.email }}</div>
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
        <div class="bg-secondary-5 px-3 py-10 lg:px-6">
          <form v-if="tab === 1" class="space-y-4" @submit.prevent="editUser()">
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
                <select id="" v-model="tempUser.gender" name="gender" class="w-full px-3 py-2">
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
            <div class="flex items-center space-x-4">
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
            <div class="flex justify-end pt-6">
              <!-- <button class="inline-block rounded-lg bg-primary-1 px-4 py-2 text-white">
                取消
              </button> -->
              <button
                type="submit"
                class="inline-block rounded-lg bg-secondary-1 px-4 py-2 text-white"
              >
                更新
              </button>
            </div>
          </form>
          <form v-else action="" class="space-y-4">
            <div class="flex items-center space-x-4">
              <label for="oldPassword" class="w-1/4 font-bold sm:w-1/6">舊密碼</label>
              <div class="grow">
                <input
                  id="oldPassword"
                  type="password"
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
                  type="password"
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
                  type="password"
                  class="w-full px-3 py-2"
                  placeholder="再次輸入新密碼"
                />
              </div>
            </div>
            <div class="flex justify-between pt-6">
              <button class="inline-block rounded-lg bg-primary-1 px-4 py-2 text-white">
                取消
              </button>
              <button class="inline-block rounded-lg bg-secondary-1 px-4 py-2 text-white">
                更新
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* * {
  outline: 1px solid #a00;
} */
</style>
