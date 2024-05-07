<template>
  <header
    class="sticky left-0 right-0 top-0 z-50 flex items-center justify-between bg-neutral-50 shadow-md md:shadow-none"
  >
    <div class="container mx-auto py-4">
      <div class="flex items-center justify-between space-x-4">
        <BaseLogo
          class="h-[40px] w-[227px] overflow-hidden whitespace-nowrap bg-secondary-1 indent-[100%] [mask-image:url('~/assets/icons/logo.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
        />
        <div class="hidden flex-1 items-center justify-end space-x-6 lg:flex">
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
            <BaseButton class="flex h-full flex-shrink-0 items-center justify-center p-2">
              <div
                class="h-6 w-6 flex-shrink-0 bg-neutral-900 [mask-image:url('~/assets/icons/close-line.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              ></div>
            </BaseButton>
            <BaseButton
              class="flex h-full flex-shrink-0 items-center justify-center border-l border-neutral-400 p-2"
            >
              <div
                class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/search.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              ></div>
            </BaseButton>
          </div>
          <div class="flex space-x-4">
            <div class="flex space-x-4">
              <NuxtLink to="/projects" class="block p-2">探索</NuxtLink>
              <NuxtLink to="/create" class="block p-2">提案</NuxtLink>
            </div>
            <BaseButton
              tag="nuxtLink"
              to="/member/notifications"
              class="relative flex h-full flex-shrink-0 items-center justify-center p-2"
            >
              <div
                class="bg-neutral-2 h-6 w-6 flex-shrink-0 overflow-hidden bg-secondary-2 [mask-image:url('~/assets/icons/notifications.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              ></div>
              <div
                class="absolute bottom-[7px] right-[7px] flex h-3 w-3 items-center justify-center overflow-hidden rounded-full bg-[#FF0000] text-sm text-neutral-50"
              >
                <p class="scale-[0.5]">99</p>
              </div>
            </BaseButton>
          </div>
          <BaseButton
            class="rounded-lg bg-secondary-2 px-5 py-2 text-neutral-50"
            to="/login"
            tag="nuxtLink"
          >
            登入/註冊
          </BaseButton>
          <div class="relative cursor-pointer" @click="toggleMenu">
            <Avatar
              ref="dropdown"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              class="h-10 w-10 overflow-hidden rounded-full object-cover"
            />
            <ListMenu
              ref="dropdownMenu"
              :class="menuIsShow ? 'block' : 'hidden'"
              class="absolute right-[50%] top-10 w-[112px] translate-x-1/2 shadow-xl"
              :menu-list="menuList"
            />
          </div>
        </div>
        <div class="block p-2 lg:hidden">
          <div
            class="bg-neutral-2 h-6 w-6 flex-shrink-0 bg-secondary-2 [mask-image:url('~/assets/icons/menu.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const dropdown = ref(null)
const dropdownMenu = ref(null)
const menuIsShow = ref(false)
const menuList = ref(menuMapList)

const toggleMenu = () => {
  if (dropdownMenu.value) {
    menuIsShow.value = !menuIsShow.value
  }
}
onClickOutside(dropdown, () => {
  menuIsShow.value = false
})
</script>
