<script setup>
const route = useRoute()
const id = computed(() => route.params.id) // project id
const userStore = useIsLoginStore() // 會員資料
const { userData } = storeToRefs(userStore)

// 支持專案資料
const tempData = ref({
  userName: '',
  email: '',
  phone: '',
  money: 1000,
  isNeedFeedback: false,
  receiver: '',
  receiverPhone: '',
  address: ''
})

watch(
  userData,
  (val) => {
    tempData.value.userName = val?.userName ?? ''
    tempData.value.email = val?.email ?? ''
    tempData.value.phone = val?.phone ?? ''
  },
  { immediate: true }
)

const results = ref({}) // 專案完整資料
const projectItem = computed(() => results.value.results || {}) // 專案資料
// 取得專案資料
const getProject = async () => {
  try {
    const res = await getFetchData({
      url: `/project/${id.value}`
    })

    results.value = JSON.parse(JSON.stringify(res))
  } catch (error) {
    console.log(error)
  }
}

const paymentForm = ref(null) // 金流表單element
const supportResults = ref({
  //  金流表單資料
  TradeSha: '',
  TradeInfo: '',
  MerchantID: 'MS152443410',
  Version: '2.0',
  TimeStamp: '',
  MerchantOrderNo: '',
  money: '',
  ItemDesc: '公益募捐'
})

// 支持專案
const supportProject = async () => {
  try {
    const res = await getFetchData({
      url: `/payment/support`,
      method: 'POST',
      params: { ...tempData.value, projectId: id.value }
    })

    if (res.status === 'success') {
      // 完成後將資料填入金流表單並送出
      const { results } = res
      supportResults.value = {
        ...supportResults.value,
        TradeSha: results.TradeSha,
        TradeInfo: results.TradeInfo,
        TimeStamp: results.data.TimeStamp,
        MerchantOrderNo: results.data.MerchantOrderNo,
        money: results.data.money
      }
      nextTick(() => paymentForm.value.submit())
    }
  } catch (error) {
    console.log(error)
  }
}

const isOverDonationTarget = computed(() => tempData.value.money >= projectItem.value.feedbackMoney)
watch(isOverDonationTarget, (val) => {
  if (!val) {
    tempData.value.isNeedFeedback = false
    tempData.value.receiver = ''
    tempData.value.receiverPhone = ''
    tempData.value.address = ''
  } else {
    tempData.value.isNeedFeedback = true
  }
})

onMounted(() => {
  nextTick(() => {
    getProject()
  })
})
</script>
<template>
  <!-- {{ userData }}
  <hr />
  {{ tempData }} -->
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
          v-if="projectItem.feedbackItem"
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
                <p>單筆滿 NTD$ {{ projectItem.feedbackMoney }} 立即享回饋:</p>
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
            v-if="isOverDonationTarget"
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
      <form ref="paymentForm" method="post" action="https://ccore.newebpay.com/MPG/mpg_gateway">
        <input :value="supportResults.TradeSha" type="hidden" name="TradeSha" />
        <input :value="supportResults.TradeInfo" type="hidden" name="TradeInfo" />
        <input :value="supportResults.MerchantID" type="hidden" name="MerchantID" />
        <input :value="supportResults.TimeStamp" type="hidden" name="TimeStamp" />
        <input :value="supportResults.Version" type="hidden" name="Version" />
        <input :value="supportResults.MerchantOrderNo" type="hidden" name="MerchantOrderNo" />
        <input :value="supportResults.money" type="hidden" name="Amt" />
        <input :value="supportResults.ItemDesc" type="hidden" name="ItemDesc" />
      </form>
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
