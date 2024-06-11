<script setup>
const route = useRoute()

const results = ref({})
const projectItem = computed(() => results.value.results || {})

const tempData = ref({
  userName: '',
  money: 100,
  email: 'user@gmail.com',
  phone: '',
  isNeedFeedback: true,
  receiver: '收件人名稱',
  receiverPhone: '收件人電話',
  address: '地址'
})

const id = computed(() => route.params.id)

const getProject = async () => {
  try {
    results.value = await getFetchData({
      url: `/project/${id.value}`
    })
  } catch (error) {
    console.log(error)
  }
}

const supportResults = ref({})

const payment = async () => {
  try {
    const formData = new FormData()

    if (supportResults.value?.results) {
      const { TradeSha, TradeInfo, data } = supportResults.value.results
      formData.append('TradeSha', TradeSha)
      formData.append('TradeInfo', TradeInfo)
      formData.append('MerchantID', 'MS152443410')
      formData.append('TimeStamp', data.TimeStamp)
      formData.append('Version', '2.0')
      formData.append('MerchantOrderNo', data.MerchantOrderNo)
      formData.append('Amt', data.money)
      formData.append('ItemDesc', '公益募捐')

      const response = await $fetch('https://ccore.newebpay.com/MPG/mpg_gateway', {
        method: 'POST',
        body: formData
      })

      console.log(response)
    }
  } catch (error) {
    console.log(error)
  }
}

const supportProject = async () => {
  try {
    supportResults.value = await getFetchData({
      url: `/payment/support`,
      method: 'POST',
      params: { ...tempData.value, projectId: id.value }
    })

    if (supportResults.value.status === 'success') {
      payment()
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  nextTick(() => {
    getProject()
  })
})
</script>
<template>
  {{ supportResults }}
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-center text-3xl font-bold lg:mb-10">支持提案內容</h1>
    <div class="grid gap-12 md:grid-cols-2">
      <div
        class="grid grid-flow-row auto-rows-max grid-cols-1 items-center gap-y-6 overflow-hidden"
      >
        <div class="relative h-[320px] w-full overflow-hidden rounded-3xl">
          <div
            class="block h-full w-full bg-cover bg-center duration-300 hover:scale-110 lg:h-full"
            :style="{ backgroundImage: `url(${projectItem.coverUrl})` }"
          ></div>
        </div>
        <h3 class="line-clamp-4 text-2xl text-neutral-900">
          {{ projectItem.title }}
        </h3>
        <div class="line-clamp-4 text-neutral-800">{{ projectItem.describe }}</div>
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
              :src="projectItem.feedbackUrl"
              alt=""
            />
            <div class="flex-1 space-y-1 text-base">
              <h4 class="flex flex-wrap">
                <p>單筆滿 NTD$ 100 立即享回饋:</p>
                <p>{{ projectItem.feedbackItem }} * 1</p>
              </h4>
              <p class="text-neutral-600">
                預計寄出日期: {{ $dateformat(projectItem.feedbackDate) }}
              </p>
              <div class="flex items-center space-x-2">
                <div
                  v-if="tempData.money >= projectItem.feedbackMoney"
                  class="h-5 w-5 flex-shrink-0 bg-warning-700 [mask-image:url('~/assets/icons/check.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
                <div
                  v-else
                  class="h-5 w-5 flex-shrink-0 bg-neutral-600 [mask-image:url('~/assets/icons/warning.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                ></div>
                <p
                  :class="
                    tempData.money >= projectItem.feedbackMoney
                      ? 'text-warning-700'
                      : 'text-neutral-600'
                  "
                >
                  <span v-if="tempData.money >= projectItem.feedbackMoney">已符合</span>
                  <span v-else
                    >未符合，差 {{ projectItem.feedbackMoney - tempData.money }} 元享回饋</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div
            v-if="tempData.money >= projectItem.feedbackMoney"
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
          <button
            type="button"
            class="w-full max-w-[260px] rounded bg-secondary-2 p-4 text-xl text-white"
            @click="supportProject"
          >
            確認支付
          </button>
        </div>
      </div>
      <!-- <form method="post" action="https://ccore.newebpay.com/MPG/mpg_gateway">
        <input type="text" name="TradeSha" :value="supportResults.TradeSha" />
        <input type="text" name="TradeInfo" :value="supportResults.TradeInfo" />
        <input type="text" name="MerchantID" value="MS152443410" />
        <input type="text" name="TimeStamp" :value="supportResults.sponsorData.TimeStamp" />
        <input type="text" name="Version" :value="2.0" />
        <input
          type="text"
          name="MerchantOrderNo"
          :value="supportResults.sponsorData.MerchantOrderNo"
        />
        <input type="text" name="Amt" :value="supportResults.sponsorData.money" />
        <input type="text" name="ItemDesc" value="公益募捐" />
        <button type="submit">送出</button>
      </form> -->
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
