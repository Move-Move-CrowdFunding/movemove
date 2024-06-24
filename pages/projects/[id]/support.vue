<script setup>
import { z } from 'zod'

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
    console.log(res)

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
  money: null,
  ItemDesc: '公益募捐'
})

const schema = z.object({
  email: z.string().email('Invalid email'),
  userName: z.string().min(1, '請填寫名稱'),
  phone: z
    .string()
    .min(8, '電話需8碼以上')
    .refine((data) => /^\d+$/.test(data), {
      message: '僅能輸入數字'
    }),
  // money: z.number().min(1, '請填寫金額'),。
  money: z.union([z.string().min(1, '請填寫金額'), z.number().min(1, '請填寫金額')]),
  isNeedFeedback: z.boolean().optional(),
  receiver: z
    .string()
    .refine(
      (val) => !projectItem.feedbackItem || !tempData.value.isNeedFeedback || val.length >= 1,
      {
        message: '請填寫收件人'
      }
    ),
  receiverPhone: z
    .string()
    .refine(
      (val) => !projectItem.feedbackItem || !tempData.value.isNeedFeedback || val.length >= 8,
      {
        message: '聯絡電話需8碼以上'
      }
    )
    .refine(
      (data) => !projectItem.feedbackItem || !tempData.value.isNeedFeedback || /^\d+$/.test(data),
      {
        message: '僅能輸入數字'
      }
    ),
  address: z
    .string()
    .refine(
      (val) => !projectItem.feedbackItem || !tempData.value.isNeedFeedback || val.length >= 1,
      {
        message: '請填寫收件地址'
      }
    )
})

// 支持專案
const loading = useLoadingStore()

const supportProject = async () => {
  try {
    // console.log(event.data)
    console.log('loading:', loading)
    loading.isGlobalLoading = true
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

function onError() {
  // console.log('form error:',event)
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
  <div class="container py-10 lg:py-20">
    <LoadingOverlay />
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
        <UForm
          :schema="schema"
          :state="tempData"
          class="space-y-4"
          @submit="supportProject"
          @error="onError"
        >
          <div
            class="space-y-6 overflow-hidden rounded-3xl p-6 shadow-[0_0_8px_0_theme(colors.neutral.900/16%)]"
          >
            <UFormGroup label="E-mail" required name="email">
              <UInput
                v-model="tempData.email"
                placeholder="請輸入E-mail"
                input-class="disabled:bg-gray-100 !p-3"
                disabled
              />
            </UFormGroup>

            <UFormGroup label="名稱" required name="userName">
              <UInput v-model="tempData.userName" input-class="!p-3" placeholder="請填寫名稱" />
            </UFormGroup>

            <UFormGroup label="電話" required name="phone">
              <UInput
                v-model="tempData.phone"
                input-class="!p-3"
                placeholder="請填寫電話"
                type="tel"
              />
            </UFormGroup>

            <UFormGroup label="贊助金額" required name="money">
              <div class="flex items-center rounded border pl-3">
                <span class="text-base font-bold text-secondary-2">NT$</span>
                <UInput
                  v-model="tempData.money"
                  class="flex-grow pl-3 pr-0"
                  input-class="!p-3 border-0 ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="贊助金額"
                  type="number"
                />
              </div>
            </UFormGroup>

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
            <!-- <UButton type="submit"> Submit </UButton> -->
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
              <UCheckbox
                v-model="tempData.isNeedFeedback"
                name="needFeedback"
                label="請寄送回饋品"
                input-class="h-5 w-5 shrink-0 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
              />

              <template v-if="tempData.isNeedFeedback">
                <UFormGroup label="收件人" required name="receiver">
                  <UInput
                    v-model="tempData.receiver"
                    input-class="!p-3"
                    placeholder="請填寫收件人"
                  />
                </UFormGroup>
                <UFormGroup label="收件地址" required name="address">
                  <UInput
                    v-model="tempData.address"
                    input-class="!p-3"
                    placeholder="請填寫收件地址"
                  />
                </UFormGroup>
                <UFormGroup label="聯絡電話" required name="receiverPhone">
                  <UInput
                    v-model="tempData.receiverPhone"
                    input-class="!p-3"
                    placeholder="請填寫聯絡電話"
                    type="tel"
                  />
                </UFormGroup>
              </template>
            </div>
          </div>
          <div class="space-y-6 text-center">
            <p class="text-neutral-900">
              <span>當您確認支付時，即代表您已知悉並同意我們的</span
              ><NuxtLink class="inline-block underline" to="/" target="_blank">使用條款</NuxtLink>。
            </p>
            <button
              v-if="
                projectItem.startDate < new Date() / 1000 && projectItem.endDate > new Date() / 1000
              "
              type="submit"
              class="w-full max-w-[260px] rounded bg-secondary-2 p-4 text-xl text-white"
            >
              確認支付
            </button>
            <button
              v-else
              class="w-full max-w-[260px] rounded bg-neutral-300 p-4 text-xl text-white"
              disabled
            >
              目前無法贊助
            </button>
          </div>
        </UForm>
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
