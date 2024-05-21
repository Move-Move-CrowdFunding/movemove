<script setup>
const projectItem = {
  status: 'success',
  message: '取得提案內容成功',
  results: {
    id: '663e3f9652027aeb86960016',
    userId: '663e3f3452027aeb8696000c',
    categoryKey: 2,
    coverUrl:
      'https://images.unsplash.com/photo-1715694290840-bd862815c8ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D',
    describe:
      '一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。',
    endDate: 1721577600,
    title:
      '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
    videoUrl: '',
    startDate: 1720713600,
    feedbackItem: '限量精美小熊維尼',
    feedbackUrl:
      'https://images.unsplash.com/photo-1715694290840-bd862815c8ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE3fHhIeFlUTUhMZ09jfHxlbnwwfHx8fHw%3D',
    feedbackMoney: 100,
    feedbackDate: 1721577600,
    targetMoney: 30000,
    teamName: '弱勢救星',
    phone: '0938938438',
    email: 'nomail@mail.com',
    relatedUrl: '',
    introduce: '專業金援團隊，弱勢族群救星，幫助許多需要協助的家庭。',
    content: '<p>test</p>',
    achievedMoney: 2200,
    supportCount: 2,
    trackingStatus: true,
    state: ['123']
  }
}

const tempData = ref({
  projectId: '',
  userName: '',
  money: 100,
  email: 'abc@gmail.com',
  phone: '',
  isNeedFeedback: true,
  receiver: '收件人名稱',
  receiverPhone: '收件人電話',
  address: '地址'
})
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-center text-3xl font-bold lg:mb-10">支持提案內容</h1>
    <div class="grid gap-12 md:grid-cols-2">
      <div
        class="grid grid-flow-row auto-rows-max grid-cols-1 items-center gap-y-6 overflow-hidden"
      >
        <div class="relative h-[320px] w-full overflow-hidden rounded-3xl">
          <div
            class="block h-full w-full bg-cover bg-center duration-300 hover:scale-110 lg:h-full"
            :style="{ backgroundImage: `url(${projectItem.results.coverUrl})` }"
          ></div>
        </div>
        <h3 class="line-clamp-4 text-2xl text-neutral-900">
          {{ projectItem.results.title }}
        </h3>
        <div class="line-clamp-4 text-neutral-800">{{ projectItem.results.describe }}</div>
      </div>
      <div class="space-y-6">
        <div
          class="space-y-6 overflow-hidden rounded-3xl p-6 shadow-[0_0_8px_0_theme(colors.neutral.900/16%)]"
        >
          <div class="space-y-1">
            <label class="text-neutral-800" for="email">E-mail </label>
            <input
              id="email"
              v-model="tempData.email"
              type="text"
              placeholder="請輸入E-mail"
              class="block w-full cursor-not-allowed rounded border p-3"
              readonly
              disabled
            />
          </div>
          <div class="space-y-1">
            <label class="text-neutral-800" for="userName"
              >名稱<span class="text-warning-500">*</span></label
            >
            <input
              id="userName"
              v-model="tempData.userName"
              type="text"
              placeholder="請填寫名稱"
              class="block w-full rounded border p-3"
            />
          </div>
          <div class="space-y-1">
            <label class="text-neutral-800" for="tel"
              >電話<span class="text-warning-500">*</span></label
            >
            <input
              id="tel"
              v-model="tempData.phone"
              type="tel"
              placeholder="請填寫電話"
              class="block w-full rounded border p-3"
            />
          </div>
          <div class="space-y-1">
            <label class="text-neutral-800" for="money"
              >贊助金額<span class="text-warning-500">*</span></label
            >
            <div class="flex items-center rounded border px-3">
              <span class="text-base font-bold text-secondary-2">NT$</span>
              <input
                id="money"
                v-model="tempData.money"
                placeholder="贊助金額"
                class="block w-full py-3 pl-3 outline-offset-0 focus:outline-0 focus:outline-offset-0"
              />
            </div>
          </div>
          <ul class="flex space-x-8">
            <li class="flex-shrink-0">
              <img class="w-10" src="~/assets/images/project/visa.svg" alt="visa" />
            </li>
            <li class="flex-shrink-0">
              <img class="w-10" src="~/assets/images/project/jcb.svg" alt="jcb" />
            </li>
            <li class="flex-shrink-0">
              <img class="w-10" src="~/assets/images/project/mastercard.svg" alt="mastercard" />
            </li>
          </ul>
        </div>
        <div
          class="space-y-4 overflow-hidden rounded-3xl p-6 shadow-[0_0_8px_0_theme(colors.neutral.900/16%)]"
        >
          <div class="peer flex items-start space-x-4">
            <img
              class="h-20 w-20 overflow-hidden rounded-2xl object-cover"
              :src="projectItem.results.feedbackUrl"
              alt=""
            />
            <div class="flex-1 space-y-1 text-base">
              <h4 class="flex flex-wrap">
                <p>單筆滿 NTD$ 100 立即享回饋:</p>
                <p>{{ projectItem.results.feedbackItem }} * 1</p>
              </h4>
              <p class="text-neutral-600">
                預計寄出日期: {{ $dateformat(projectItem.results.feedbackDate) }}
              </p>
              <div class="flex items-center space-x-2">
                <div
                  v-if="tempData.money >= projectItem.results.feedbackMoney"
                  class="h-5 w-5 flex-shrink-0 bg-warning-700 [mask-image:url('~/assets/icons/check.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
                <div
                  v-else
                  class="h-5 w-5 flex-shrink-0 bg-neutral-600 [mask-image:url('~/assets/icons/warning.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
                <p
                  :class="
                    tempData.money >= projectItem.results.feedbackMoney
                      ? 'text-warning-700'
                      : 'text-neutral-600'
                  "
                >
                  <span v-if="tempData.money >= projectItem.results.feedbackMoney">已符合</span>
                  <span v-else
                    >未符合，差
                    {{ projectItem.results.feedbackMoney - tempData.money }} 元享回饋</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="tempData.money >= projectItem.results.feedbackMoney"
            class="space-y-6 peer-[&]:before:mb-4 peer-[&]:before:block peer-[&]:before:h-px peer-[&]:before:w-full peer-[&]:before:bg-neutral-200 peer-[&]:before:content-['']"
          >
            <div class="flex items-center space-x-3">
              <input
                id="needFeedback"
                v-model="tempData.isNeedFeedback"
                type="checkbox"
                class="h-5 w-5 shrink-0 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
              />
              <label for="needFeedback" class="text-lg text-secondary-1">請寄送回饋品</label>
            </div>
            <div class="space-y-1">
              <label class="text-neutral-800" for="receiver"
                >收件人<span class="text-warning-500">*</span></label
              >
              <input
                id="receiver"
                v-model="tempData.receiver"
                type="text"
                placeholder="請填寫收件人"
                class="block w-full rounded border p-3"
              />
            </div>
            <div class="space-y-1">
              <label class="text-neutral-800" for="address"
                >收件地址<span class="text-warning-500">*</span></label
              >
              <input
                id="address"
                v-model="tempData.address"
                type="text"
                placeholder="請填寫收件地址"
                class="block w-full rounded border p-3"
              />
            </div>
            <div class="space-y-1">
              <label class="text-neutral-800" for="receiverPhone"
                >聯絡電話<span class="text-warning-500">*</span></label
              >
              <input
                id="receiverPhone"
                v-model="tempData.receiverPhone"
                type="tel"
                placeholder="請填寫聯絡電話"
                class="block w-full rounded border p-3"
              />
            </div>
          </div>
        </div>
        <div class="space-y-6 text-center">
          <p class="text-neutral-900">
            <span>當您確認支付時，即代表您已知悉並同意我們的</span
            ><NuxtLink class="inline-block underline" to="/" target="_blank">使用條款</NuxtLink>。
          </p>
          <button class="w-full max-w-[260px] rounded bg-secondary-2 p-4 text-xl text-white">
            確認支付
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h2 {
  @apply mb-3 mt-4 text-lg font-bold;
}
label {
  @apply inline-block text-base;
}
input,
textarea,
select {
  @apply text-neutral-900 caret-neutral-900;
}
</style>
