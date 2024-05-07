<template>
  <div
    class="fixed bottom-0 left-0 right-0 top-[72px] flex w-full flex-1 translate-y-[calc(-72px_+_-100%)] flex-col overflow-y-auto overflow-x-hidden bg-neutral-100 transition-all duration-300 ease-in-out lg:hidden"
    :class="{ '!-translate-y-0': modelValue }"
  >
    <div class="flex flex-1 flex-col overflow-hidden">
      <div
        v-if="isLogin"
        class="peer flex items-center space-x-6 border-b border-neutral-100 bg-neutral-50 px-3 py-4"
      >
        <Avatar
          :src="userInfo.avatar"
          class="h-[60px] w-[60px] flex-shrink-0 overflow-hidden rounded-full object-cover"
        />
        <div class="space-y-2 overflow-hidden text-neutral-900">
          <h5 class="overflow-hidden text-ellipsis whitespace-nowrap">{{ userInfo.name }}</h5>
          <p class="overflow-hidden text-ellipsis whitespace-nowrap">{{ userInfo.email }}</p>
        </div>
      </div>
      <div class="flex flex-1 flex-col overflow-y-auto">
        <div v-if="isLogin" class="peer bg-neutral-50 py-4 peer-[&]:mt-2">
          <ul>
            <li v-for="item in menuMapList" :key="item.name">
              <NuxtLink
                class="relative block overflow-hidden text-ellipsis whitespace-nowrap py-2 pl-3 pr-10 text-neutral-600 after:absolute after:inset-y-0 after:right-3 after:my-auto after:block after:h-5 after:w-5 after:bg-neutral-600 after:content-[''] after:[mask-image:url('~/assets/icons/arrow_forward.svg')] after:[mask-position:center] after:[mask-repeat:no-repeat] after:[mask-size:contain]"
                :to="item.url"
                >{{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="peer bg-neutral-50 py-4 peer-[&]:mt-2">
          <h3 class="px-3 pb-4 text-neutral-900">提案類別</h3>
          <ul>
            <li v-for="item in categoryMenuList" :key="item.name">
              <NuxtLink
                class="relative block overflow-hidden text-ellipsis whitespace-nowrap py-2 pl-3 pr-10 text-neutral-600 after:absolute after:inset-y-0 after:right-3 after:my-auto after:block after:h-5 after:w-5 after:bg-neutral-600 after:content-[''] after:[mask-image:url('~/assets/icons/arrow_forward.svg')] after:[mask-position:center] after:[mask-repeat:no-repeat] after:[mask-size:contain]"
                :to="item.url"
                >{{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="bg-neutral-50 peer-[&]:mt-2">
          <BaseButton
            v-if="!isLogin"
            class="flex flex-shrink-0 items-center space-x-2 px-3 py-6 text-neutral-600"
            tag="nuxtLink"
            to="/login"
          >
            <span>登入/註冊</span>
          </BaseButton>
          <BaseButton
            v-else
            class="flex flex-shrink-0 items-center space-x-2 px-3 py-6 text-neutral-600"
            tag="nuxtLink"
            to="/"
          >
            <template #prepend>
              <div
                class="h-6 w-6 flex-shrink-0 bg-neutral-600 [mask-image:url('~/assets/icons/logout.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
              ></div>
            </template>
            <span>登出</span>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { CategoryKeys } from '~/types/categoryKeys'
import { menuMapList } from '@/utils/menuMaps'

defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
})

const categoryMenuList = ref(
  categoryKeys.map((item: CategoryKeys) => {
    return {
      name: item.name,
      url: `/projects?categoryKey=${item.key}`
    }
  })
)

const modelValue = defineModel()

const userInfo = ref({
  name: 'Claire',
  email: 'Claire09983@gmail.com.tw',
  avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
})
</script>
