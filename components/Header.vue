<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { getMemberNotificationUnread } from '@/apis/member'

const notificationsCount = ref(0)

const dropdown = ref(null)
const dropdownMenu = ref(null)
const menuIsShow = ref(false)
const menuList = ref(menuMapList)

const isLogin = useIsLoginStore()
const searchIsShow = ref(false)

const toggleMenu = () => {
  if (dropdownMenu.value) {
    menuIsShow.value = !menuIsShow.value
  }
}
const mobileMenuIsShow = ref(false)
onClickOutside(dropdown, () => {
  menuIsShow.value = false
})

onMounted(() => {
  nextTick(async () => {
    if (isLogin.isLogin) {
      const { data } = await getMemberNotificationUnread()
      const { count } = data.value?.results
      notificationsCount.value = count
    }
  })
})
</script>
<template>
  <header class="sticky left-0 right-0 top-0 z-10 flex items-center justify-between md:shadow-none">
    <div class="relative z-50 w-full bg-neutral-50 shadow-md">
      <div class="relative z-10 mx-auto px-3 py-4 lg:container">
        <div class="relative flex items-center justify-between space-x-4">
          <BaseLogo
            class="h-[24px] w-[135px] flex-shrink-0 overflow-hidden whitespace-nowrap bg-secondary-1 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] md:h-[40px] md:w-[227px]"
          />
          <div class="hidden flex-1 items-center justify-end space-x-6 md:flex">
            <div
              class="flex max-w-[608px] flex-1 items-center overflow-hidden rounded-lg border border-neutral-400"
            >
              <input
                id=""
                class="text-netural-600 placeholder:text-netural-50 w-full py-2 pl-2 pr-4 outline-none transition-all"
                type="text"
                placeholder="搜尋 提案關鍵字"
                name=""
              />
              <UButton
                v-show="false"
                class="flex h-full flex-shrink-0 items-center justify-center p-2"
              >
                <div
                  class="h-6 w-6 flex-shrink-0 bg-neutral-900 [mask-image:url('~/assets/icons/close-line.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
              </UButton>
              <UButton
                class="flex h-full flex-shrink-0 items-center justify-center rounded-none border-l border-neutral-400 bg-neutral-50 p-2 transition-all hover:bg-secondary-3/20"
              >
                <div
                  class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/search.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
              </UButton>
            </div>
            <div class="flex space-x-4">
              <div class="flex space-x-4">
                <NuxtLink to="/projects" class="block p-2 hover:text-secondary-2">探索</NuxtLink>
                <NuxtLink to="/create" class="block p-2 hover:text-secondary-2">提案</NuxtLink>
              </div>
              <NotificationsIcon
                v-if="isLogin.isLogin"
                :count="notificationsCount"
                class="hidden md:flex"
              />
            </div>
            <UButton
              v-if="!isLogin.isLogin"
              class="rounded-lg bg-secondary-2 px-5 py-2 text-neutral-50 transition-all hover:bg-primary-1"
              to="/login"
              tag="nuxtLink"
            >
              登入/註冊
            </UButton>
            <div class="relative cursor-pointer" @click="toggleMenu">
              <Avatar
                v-if="isLogin.isLogin"
                ref="dropdown"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                class="h-[40px] w-[40px]"
              />
              <ListMenu
                ref="dropdownMenu"
                :class="menuIsShow ? 'block' : 'hidden'"
                class="absolute right-0 top-[56px] w-[112px] translate-x-6 shadow-xl"
                :menu-list="menuList"
              />
            </div>
          </div>
          <div class="flex flex-row">
            <div class="flex flex-row bg-neutral-50">
              <div v-if="searchIsShow" class="absolute inset-0 z-10 flex flex-row">
                <div
                  class="flex flex-1 items-center overflow-hidden rounded-lg border border-neutral-400 bg-neutral-50 pl-2"
                >
                  <div
                    class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-neutral-600 [mask-image:url('~/assets/icons/search.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:w-4]"
                  ></div>
                  <input
                    id=""
                    class="text-netural-600 placeholder:text-netural-50 peer w-full py-2 pl-1 pr-2 outline-none transition-all"
                    type="text"
                    placeholder="搜尋 提案關鍵字"
                    name=""
                  />
                  <UButton
                    class="flex h-full flex-shrink-0 items-center justify-center bg-neutral-50 p-2 shadow-none"
                  >
                    <div
                      class="h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/close-line.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                    ></div>
                  </UButton>
                </div>
                <UButton
                  class="-mr-1 ml-2 flex h-full flex-shrink-0 items-center justify-center bg-neutral-50 p-2 shadow-none"
                  @click="searchIsShow = false"
                >
                  <div
                    class="h-6 w-6 flex-shrink-0 bg-neutral-600 [mask-image:url('~/assets/icons/close-line.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:_36px]"
                  ></div>
                </UButton>
              </div>
              <div class="ml-auto block p-2 md:hidden" @click="searchIsShow = true">
                <div
                  class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/search.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
              </div>
            </div>
            <NotificationsIcon
              v-if="isLogin.isLogin"
              :count="notificationsCount"
              class="flex md:hidden"
            />
            <div class="block p-2 md:hidden" @click="mobileMenuIsShow = !mobileMenuIsShow">
              <div
                class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/menu.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileMenu v-model="mobileMenuIsShow" />
  </header>
</template>
