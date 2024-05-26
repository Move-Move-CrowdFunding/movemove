<script setup lang="ts">
import { menuMapList } from '@/utils/menuMaps'
import { getMemberNotificationUnread } from '@/apis/member'

interface DropdownMenu {
  label: string
  to?: string
  click?: () => void
}

const notificationsCount = ref(0)

const isLogin = useIsLoginStore()
const searchIsShow = ref(false)

const mobileState = useMenuStore()
const mobileMenuToggle = () => {
  mobileState.mobileMenuShow = !mobileState.mobileMenuShow
}

const dropdownMenuList = computed<DropdownMenu[][]>(() => {
  const mapMenuList: DropdownMenu[] = menuMapList.map((item) => {
    return {
      label: item.name,
      to: item.url
    }
  })
  if (isLogin.userData.auth) {
    mapMenuList.push({
      label: '後台',
      to: '/admin'
    })
  }
  mapMenuList.push({
    label: '登出',
    click: logout
  })
  return [mapMenuList]
})

const searchKeyword = ref('')

// 是否顯示 input 清除按鈕
const isSearchDeleteBtnShow = computed(() => {
  return searchKeyword.value.length > 0
})
const clearSearchKeyword = () => {
  searchKeyword.value = ''
}
const searchJumpTo = () => {
  if (searchKeyword.value.trim()) {
    navigateTo({
      path: `/projects`,
      query: {
        pageNo: 1,
        pageSize: 10,
        categoryKey: 0,
        isExpired: 'false',
        sort: 1,
        keyword: searchKeyword.value
      }
    })
  }
}

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
  <header
    class="sticky left-0 right-0 top-0 z-[60] flex items-center justify-between md:shadow-none"
  >
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
                v-model="searchKeyword"
                class="text-netural-600 placeholder:text-netural-50 w-full px-2 pl-2 pr-0 outline-none transition-all"
                type="text"
                placeholder="搜尋 提案關鍵字"
                name=""
              />
              <UButton
                :class="isSearchDeleteBtnShow ? 'flex' : 'hidden'"
                class="h-full flex-shrink-0 items-center justify-center bg-inherit p-2 shadow-none hover:bg-inherit"
                title="清除搜尋內容"
                @click="clearSearchKeyword"
              >
                <div
                  class="h-6 w-6 flex-shrink-0 bg-neutral-900 [mask-image:url('~/assets/icons/close-line.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
              </UButton>
              <UButton
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-none border-l border-neutral-400 bg-neutral-50 p-2 transition-all hover:bg-secondary-3/20"
                @click="searchJumpTo"
              >
                <div
                  class="bg-neutral-2 h-[18px] w-[18px] flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/search.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
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
            <UDropdown
              v-if="isLogin.isLogin"
              :ui="{
                container: 'w-[112px]',
                base: 'flex flex-col bg-neutral-50 text-center !ring-0',
                rounded: 'rounded-none',
                padding: 'p-0',
                item: {
                  base: 'block !px-6 !py-2 hover:text-secondary-2',
                  size: 'text-base',
                  active: 'hover:rounded-none bg-neutral-50'
                },
                shadow: 'shadow-xl'
              }"
              :items="dropdownMenuList"
              :popper="{ offsetDistance: 17, placement: 'top' }"
            >
              <Avatar default-image-size="sm" :src="isLogin.userData.avatar" />
            </UDropdown>
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
                    v-model="searchKeyword"
                    class="text-netural-600 placeholder:text-netural-50 peer w-full py-2 pl-1 pr-2 outline-none transition-all"
                    type="text"
                    placeholder="搜尋 提案關鍵字"
                    name=""
                    @keyup.enter="searchJumpTo"
                  />
                  <UButton
                    :class="isSearchDeleteBtnShow ? 'flex' : 'hidden'"
                    class="h-full flex-shrink-0 items-center justify-center bg-neutral-50 p-2 shadow-none hover:bg-inherit"
                    @click="clearSearchKeyword"
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
            <div class="block p-2 md:hidden" @click="mobileMenuToggle">
              <div
                class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/menu.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MobileMenu v-model="mobileState.mobileMenuShow" />
  </header>
</template>
