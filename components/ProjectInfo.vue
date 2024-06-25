<script setup>
// import dayjs from 'dayjs'
import { z } from 'zod'
import { dateFormat, timeFormat, tenDaysLater, sevenDaysAfterTenDays } from '@/utils/date'
import { regPhone } from '~/utils/regex'

const route = useRoute()
const inAdmin = route.fullPath.includes('admin')
const inCreate = route.fullPath.includes('create/edit')
const props = defineProps({
  tempData: {
    type: Object,
    required: true
  },
  requestLoading: {
    type: Boolean,
    required: false
  }
})
const errors = ref([])

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const schemaCreateProjectData = z.object({
  teamName: z.string().min(1, '請填寫姓名或團隊名稱'),
  email: z.string().email('請輸入有效的 email'),
  phone: z
    .string()
    .min(8, '電話需8碼以上')
    .refine((data) => regPhone(data), {
      message: '請輸入正確手機號碼'
    }),
  title: z.string().min(1, '請輸入提案標題'),
  categoryKey: z.number().refine(
    (value) => {
      // console.log('categoryKey', value)
      return value > 0
    },
    {
      message: '請選擇分類'
    }
  ),
  targetMoney: z.coerce.number().min(1, '請輸入提案目標'),
  // .refine((value) => value >= 100, {
  //   message: '金額至少100'
  // }),
  startDate: z.coerce.date().refine((value) => dateFormat(value) >= tenDaysLater, {
    message: '開始時間至少為10天後'
  }),
  endDate: z.coerce.date().refine((value) => dateFormat(value) >= sevenDaysAfterTenDays, {
    message: '募資天數最短為7天'
  }),
  describe: z.string().min(1, '請簡短敘述提案內容, 最長不超過 80 字'),

  coverUrl: z
    .any()
    .refine(
      (file) => {
        // console.log('coverUrl filefile', file)
        return ACCEPTED_IMAGE_TYPES.includes(file.type)
      },
      {
        message: '僅接受 .jpg, .jpeg, .png, gif 等圖片格式.'
      }
    )
    .refine((file) => file.size > MAX_FILE_SIZE, { message: '檔案大小不可大於1MB' }),
  content: z.string().min(350, '請輸入提案說明, 至少 350 字'),
  videoUrl: z.string().url('請輸入正確影片網址').optional().or(z.literal('')),
  relatedUrl: z.string().url('請輸入正確網址格式').optional().or(z.literal('')),
  feedbackUrl: z.string().url('請輸入正確網址格式').optional().or(z.literal('')),
  feedbackMoney: z.coerce
    .number()
    // .refine((value) => value >= 100, {
    //   message: '金額至少100'
    // })
    .or(z.literal(''))
})

const newTempData = computed(() => props.tempData)

const latestLog = computed(() => {
  return newTempData.value && newTempData.value?.reviewLog
    ? newTempData.value?.reviewLog[newTempData.value?.reviewLog.length - 1]
    : {}
})
const isDisable = computed(() => {
  return inAdmin || latestLog.value.status === 0 || latestLog.value.status === 1
})

// 綁定日期
const dateInput = computed(() => {
  return {
    startDate: inCreate ? tenDaysLater : dateFormat(newTempData.value.startDate),
    endDate: inCreate ? sevenDaysAfterTenDays : dateFormat(newTempData.value.endDate),
    feedbackDate: dateFormat(newTempData.value.feedbackDate)
  }
})

const result = computed(() => schemaCreateProjectData.safeParse(newTempData.value))

const validateField = (field, file) => {
  if (result.value.success) {
    errors.value[field] = ''
  } else {
    // console.dir(file)
    const fieldError = result.value.error.errors.find((error) => {
      // console.log('fieldError', error)
      return error.path[0] === field
    })
    if (file) {
      errors.value[field] = fieldError || { ...file }
    } else {
      errors.value[field] = fieldError ? fieldError.message : ''
    }
    // console.log('fieldError', errors.value[field])
    // result.value.error.errors.forEach((error) => {
    //   console.log('error', error)
    //   errors.value[error.path[0]] = error.message
    // })
  }
}

const changeDate = (item) => {
  const date = new Date(dateInput.value[item])
  newTempData.value[item] = date.getTime() / 1000
  validateField(item)
}
changeDate('startDate')
changeDate('endDate')

const coverUpload = ref(null)
const feedbackUpload = ref(null)

const handleSubmit = () => {
  if (result.value.success) {
    // 提交表單
    emit('createProject', newTempData.value)
  } else {
    // 顯示錯誤訊息
    // console.log('event.errors', result.value.error.errors)
    // const element = document.getElementById(event.errors[0].id)
    // //   // console.log('element', element, event)
    // //   element?.focus()
    // //   element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    // const findErrorElement = result.value.error.errors.find((item) => {
    //   console.log('findErrorElement', document.getElementById(item.path[0]))
    // })
    // console.log('errors', errors.value)

    result.value.error.errors.forEach((error) => {
      errors.value[error.path[0]] = error.message
    })
    if (result.value.error.errors.length > 0) {
      const element = document.getElementById(result.value.error.errors[0].path)
      element.focus()
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
}
// const handleFileChange = (event) => {
//   const file = event.target.files[0]
//   // console.log('handleFileChange file', file)
//   newTempData.value.coverUrl = file
//   validateField('coverUrl', file)
// }
const errorTextClass = 'mt-2 text-sm text-warning-500 peer-invalid:visible'

const uploadFile = async (item) => {
  const formData = new FormData()
  if (item === 'cover') {
    formData.append('coverUpload', coverUpload.value.files[0])
    validateField('coverUpload', coverUpload.value.files[0])
  } else {
    formData.append('feedbackUpload', feedbackUpload.value.files[0])
    // validateField('feedbackUrl')
  }
  await getFetchData({
    url: '/upload',
    method: 'POST',
    params: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      if (item === 'cover') {
        newTempData.value.coverUrl = res.results.imageUrl
      } else {
        newTempData.value.feedbackUrl = res.results.imageUrl
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const emit = defineEmits(['createProject'])

const reviewContent = ref('')
const reviewProjectId = (approve) => {
  getFetchData({
    url: `/admin/projects/${newTempData.value._id}`,
    method: 'POST',
    params: {
      approve,
      content: reviewContent.value
    }
  })
    .then((res) => {
      alert(res.message)
      reloadNuxtApp()
    })
    .catch((err) => {
      console.log('err', err)
    })
}
</script>
<template>
  <div>
    <div class="container py-10">
      <div v-if="latestLog?.status === -1" class="border-2 border-secondary-2">
        <div class="flex justify-between bg-secondary-2 p-3 font-bold text-white">
          <span>審核失敗</span>
          <span>{{ dateFormat(latestLog?.createTime || latestLog?.timestamp) }}</span>
        </div>
        <div class="bg-white p-3">
          <p class="">失敗原因：</p>
          <p class="">{{ latestLog.content }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
        <div class="order-2 lg:order-1">
          <h2 class="">提案人資料</h2>
          <div class="mb-6">
            <label for="teamName">
              提案人姓名/團隊名稱
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <input
              id="teamName"
              v-model="newTempData.teamName"
              type="text"
              placeholder="請輸入提案人姓名/團隊名稱"
              class="peer block w-full"
              :disabled="isDisable"
              :class="{ 'border-warning-500': errors.teamName }"
              @focus="validateField('teamName')"
              @input="validateField('teamName')"
            />
            <p v-if="errors.teamName" :class="errorTextClass">
              {{ errors.teamName }}
            </p>
            <p class="mt-2 text-xs">
              提案人必須要用真實姓名註冊會員，不接受匿名或使用他人名義的提案。
            </p>
          </div>
          <div class="mb-6">
            <label for="email">
              聯絡信箱
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <input
              id="email"
              v-model="newTempData.email"
              type="email"
              placeholder="請輸入聯絡信箱"
              class="peer block w-full"
              :disabled="isDisable"
              :class="{ 'border-warning-500': errors.email }"
              @focus="validateField('email')"
              @input="validateField('email')"
            />
            <p v-if="errors.email" :class="errorTextClass">
              {{ errors.email }}
            </p>
          </div>
          <div class="mb-6">
            <label for="phone">
              聯絡手機
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <input
              id="phone"
              v-model="newTempData.phone"
              type="tel"
              placeholder="請輸入聯絡手機"
              class="peer block w-full"
              :disabled="isDisable"
              :class="{ 'border-warning-500': errors.phone }"
              @focus="validateField('phone')"
              @input="validateField('phone')"
            />
            <p v-if="errors.phone" :class="errorTextClass">
              {{ errors.phone }}
            </p>
          </div>
          <div class="mb-6">
            <label for="phone">
              團隊介紹
              <!-- <span class="text-red-700" :class="{ hidden: isDisable }">*</span> -->
            </label>
            <textarea
              id="introduce"
              v-model="newTempData.introduce"
              placeholder="請輸入團隊介紹"
              class="block w-full"
              :disabled="isDisable"
            ></textarea>
          </div>
          <div v-if="!inAdmin">
            <h2>專案卡預覽</h2>
            <ProjectCard :project="tempData" class="pointer-events-none" />
          </div>
          <div v-if="inAdmin">
            <h2>檢核紀錄</h2>
            <ul class="space-y-2">
              <li
                v-for="item in newTempData.reviewLog"
                :key="item"
                class="flex items-start space-x-1"
              >
                <span class="min-w-[158px] flex-shrink-0">{{ timeFormat(item.timestamp) }}</span>
                <span class="w-6 flex-shrink-0 text-center">{{
                  item?.status === 0 ? '➖' : item?.status === -1 ? '✖️' : '✔️'
                }}</span>
                <div>{{ item.content }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="order-1 col-span-2 lg:order-2">
          <h2>提案詳情</h2>
          <div class="mb-6">
            <label for="title">
              提案標題
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <input
              id="title"
              v-model="newTempData.title"
              type="text"
              placeholder="請輸入提案標題"
              class="peer block w-full"
              :class="{ 'border-warning-500': errors.title }"
              :disabled="isDisable"
              @focus="validateField('title')"
              @input="validateField('title')"
            />
            <p v-if="errors.title" :class="errorTextClass">
              {{ errors.title }}
            </p>
            <p class="mt-2 text-xs">
              好的標題應該要好記、好搜尋、吸引人想點進去看，並讓瀏覽者能在最短的時間內瞭解專案的核心理念。
            </p>
          </div>
          <div class="mb-6 grid grid-cols-2 gap-3">
            <div>
              <label for="categoryKey">
                分類
                <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
              </label>
              <select
                id="categoryKey"
                v-model="newTempData.categoryKey"
                name=""
                class="peer block min-h-[50px] w-full disabled:bg-neutral-100/60"
                :disabled="isDisable"
                :class="{ 'border-warning-500': errors.categoryKey }"
                @blur="validateField('categoryKey')"
                @change="validateField('categoryKey')"
              >
                <option value="0" disabled>請選擇分類</option>
                <option v-for="category in categoryKeys" :key="category.key" :value="category.key">
                  {{ category.name }}
                </option>
              </select>
              <p v-if="errors.categoryKey" :class="errorTextClass">
                {{ errors.categoryKey }}
              </p>
            </div>
            <div>
              <label for="targetMoney">
                提案目標
                <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
              </label>
              <div class="flex items-center space-x-2">
                <input
                  id="targetMoney"
                  v-model.number="newTempData.targetMoney"
                  type="number"
                  placeholder="請輸入提案目標"
                  class="peer block w-full"
                  :disabled="isDisable"
                  :class="{ 'border-warning-500': errors.targetMoney }"
                  @focus="validateField('targetMoney')"
                  @input="validateField('targetMoney')"
                />
                <span>NTD</span>
              </div>
              <p v-if="errors.targetMoney" :class="errorTextClass">
                {{ errors.targetMoney }}
              </p>
              <p class="mt-2 text-xs">請根據你計畫的需求，估算你所需要募集的金額</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="">
              預計時間
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <div class="flex w-full items-start space-x-2">
              <div class="flex w-full flex-col justify-start">
                <input
                  id="startDate"
                  v-model="dateInput.startDate"
                  type="date"
                  class="grow"
                  :disabled="isDisable"
                  :class="{ 'border-warning-500': errors.startDate }"
                  @change="changeDate('startDate')"
                />
                <p v-if="errors.startDate" :class="errorTextClass">
                  {{ errors.startDate }}
                </p>
              </div>
              <span class="flex h-[52px] items-center">→</span>
              <div class="flex w-full flex-col justify-start">
                <input
                  id="endDate"
                  v-model="dateInput.endDate"
                  type="date"
                  class="grow"
                  :class="{ 'border-warning-500': errors.endDate }"
                  :disabled="isDisable"
                  @change="changeDate('endDate')"
                />
                <p v-if="errors.endDate" :class="errorTextClass">
                  {{ errors.endDate }}
                </p>
              </div>
            </div>

            <p class="mt-2 text-xs">
              專案提交後需要7-10個工作天進行內容檢視，所以開始時間至少為10天後。募資天數最短為7天，最長為60天。
            </p>
          </div>
          <div class="mb-6">
            <label for="describe">
              提案簡介
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <div class="relative">
              <textarea
                id="describe"
                v-model="newTempData.describe"
                placeholder="請簡短敘述提案內容, 最長不超過 80 字"
                class="peer block w-full"
                :class="{ 'border-warning-500': errors.describe }"
                :disabled="isDisable"
                maxlength="80"
                @focus="validateField('describe')"
                @input="validateField('describe')"
              ></textarea>
              <TextCounter v-if="!inAdmin" :count="newTempData.describe.length" />
            </div>

            <p v-if="errors.describe" :class="errorTextClass">
              {{ errors.describe }}
            </p>
          </div>
          <div class="mb-6">
            <label for="">
              封面照片
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <div
              class="flex items-stretch rounded border"
              :class="{ 'border-warning-500': errors.coverUrl }"
            >
              <label for="coverUpload" :disabled="isDisable" class="m-1">
                <div
                  class="flex h-full cursor-pointer items-center rounded bg-secondary-2 px-3 py-2 text-white hover:bg-secondary-1 disabled:bg-neutral-300"
                >
                  選擇檔案
                </div>
              </label>
              <input
                id="coverUpload"
                ref="coverUpload"
                type="file"
                class="hidden"
                :disabled="isDisable"
                @change="uploadFile('cover')"
                @focus="validateField('coverUrl', coverUpload)"
                @input="validateField('coverUrl', coverUpload)"
              />
              <input
                v-model="newTempData.coverUrl"
                type="text"
                placeholder="或輸入圖片網址"
                class="grow border-white focus-visible:outline-none"
                :disabled="isDisable"
              />
            </div>
            <p v-if="errors.coverUrl" :class="errorTextClass">
              {{ errors.coverUrl }}
            </p>
            <img v-if="!errors.coverUrl" :src="newTempData.coverUrl" class="mt-1" />
          </div>
          <div class="mb-6">
            <label for="coverUrl">
              提案說明
              <span class="text-red-700" :class="{ hidden: isDisable }">*</span>
            </label>
            <div class="relative">
              <textarea
                id="coverUrl"
                v-model="newTempData.content"
                placeholder="請輸入提案說明, 至少 350 字"
                class="peer block w-full"
                :class="{ 'border-warning-500': errors.content }"
                :disabled="isDisable"
                @focus="validateField('content')"
                @input="validateField('content')"
              ></textarea>
              <TextCounter v-if="!inAdmin" :count="newTempData.content.length" />
            </div>
            <p v-if="errors.content" :class="errorTextClass">
              {{ errors.content }}
            </p>
            <p class="mt-2 text-xs">
              請告訴我們關於你計畫的故事、為什麼大家應該支持你的計畫。（最少 350 字）
              請注意：必須要有足夠的訊息才有辦法審核計畫，如果您所提供的資訊過少，或無法評估計畫的真實性、可行性，計畫就會無法上架。
            </p>
          </div>
          <div class="mb-6">
            <label for="videoUrl">影片網址</label>
            <input
              id="videoUrl"
              v-model="newTempData.videoUrl"
              type="text"
              placeholder="請輸入影片網址"
              class="peer block w-full"
              :class="{ 'border-warning-500': errors.videoUrl }"
              :disabled="isDisable"
              @focus="validateField('videoUrl')"
              @input="validateField('videoUrl')"
            />
            <p v-if="errors.videoUrl" :class="errorTextClass">
              {{ errors.videoUrl }}
            </p>
            <iframe
              v-if="newTempData.videoUrl"
              class="mt-2 aspect-video w-full"
              :src="`https://www.youtube.com/embed/${newTempData.videoUrl.split('&')[0].split('v=')[1]}`"
            ></iframe>
          </div>
          <div class="mb-6">
            <label for="relatedUrl">相關網站</label>
            <input
              id="relatedUrl"
              v-model="newTempData.relatedUrl"
              type="text"
              placeholder="請輸入相關網站"
              class="peer block w-full"
              :class="{ 'border-warning-500': errors.relatedUrl }"
              :disabled="isDisable"
              @focus="validateField('relatedUrl')"
              @input="validateField('relatedUrl')"
            />
            <p v-if="errors.relatedUrl" :class="errorTextClass">
              {{ errors.relatedUrl }}
            </p>
          </div>

          <h2>回饋方案</h2>
          <div class="mb-6">
            <label for="feedbackItem">回饋項目</label>
            <input
              id="feedbackItem"
              v-model="newTempData.feedbackItem"
              type="text"
              placeholder="請輸入回饋項目"
              class="block w-full"
              :disabled="isDisable"
            />
          </div>
          <div class="mb-6">
            <label for="feedbackUrl">回饋品圖片</label>
            <div class="flex items-center rounded border pl-1">
              <label for="feedbackUpload" :disabled="isDisable" class="m-1">
                <div
                  class="flex h-full cursor-pointer items-center rounded bg-secondary-2 px-3 py-2 text-white hover:bg-secondary-1 disabled:bg-neutral-300"
                >
                  選擇檔案
                </div>
              </label>
              <input
                id="feedbackUpload"
                ref="feedbackUpload"
                type="file"
                class="hidden"
                :disabled="isDisable"
                @change="uploadFile('feedback')"
              />
              <input
                v-model="newTempData.feedbackUrl"
                type="text"
                placeholder="或輸入圖片網址"
                class="peer grow border-white"
                :class="{ 'border-warning-500': errors.feedbackUrl }"
                :disabled="isDisable"
                @focus="validateField('feedbackUrl')"
                @input="validateField('feedbackUrl')"
              />
            </div>
            <p v-if="errors.feedbackUrl" :class="errorTextClass">
              {{ errors.feedbackUrl }}
            </p>
            <img v-if="!errors.feedbackUrl" :src="newTempData.feedbackUrl" class="mt-1" />
          </div>
          <div class="mb-6">
            <label for="feedbackMoney">回饋門檻</label>
            <div class="flex items-center space-x-2">
              <input
                id="feedbackMoney"
                v-model.number="newTempData.feedbackMoney"
                type="number"
                placeholder="請輸入回饋門檻"
                class="peer block w-full"
                :class="{ 'border-warning-500': errors.feedbackMoney }"
                :disabled="isDisable"
                @focus="validateField('feedbackMoney')"
                @input="validateField('feedbackMoney')"
              />
              <span>NTD</span>
            </div>
            <p v-if="errors.feedbackMoney" :class="errorTextClass">
              {{ errors.feedbackMoney }}
            </p>
            <p class="mt-2 text-xs">單一募資滿門檻金額，將提供回饋</p>
          </div>
          <div class="">
            <label for="feedbackDate">預計寄出日期</label>
            <input
              id="feedbackDate"
              v-model="dateInput.feedbackDate"
              type="date"
              placeholder="請輸入寄出日期"
              class="block w-full"
              :disabled="isDisable"
              @change="changeDate('feedbackDate')"
            />
          </div>
        </div>
      </div>
      <div
        v-if="inAdmin && latestLog?.status === 0"
        class="mt-10 flex flex-col gap-4 bg-secondary-5 px-3 py-10 sm:flex-row"
      >
        <input v-model="reviewContent" type="text" class="w-full" />
        <div class="flex shrink-0 gap-4 text-white">
          <button class="ml-auto rounded-lg bg-warning-500 px-3 py-2" @click="reviewProjectId(-1)">
            否準提案
          </button>
          <button class="rounded-lg bg-warning-700 px-3 py-2" @click="reviewProjectId(1)">
            核准提案
          </button>
        </div>
      </div>
      <button
        v-if="!latestLog?.status && !inAdmin"
        class="mx-auto mt-10 flex w-full items-center space-x-2.5 rounded-lg bg-secondary-2 py-2 text-lg font-bold text-white hover:bg-primary-1 lg:w-96"
        :disabled="!result.success"
        @click="handleSubmit"
      >
        <span
          v-show="requestLoading"
          class="i-heroicons-arrow-path-20-solid h-5 w-5 flex-shrink-0 animate-spin"
        ></span>
        <span>發起提案</span>
      </button>
      <button
        v-if="latestLog?.status === 1 && !inAdmin"
        class="mx-auto mt-10 block w-full rounded-lg bg-warning-500 py-2 text-lg font-bold text-white hover:bg-warning-300 lg:w-96"
      >
        結束提案
      </button>
      <button
        v-if="latestLog?.status === -1 && !inAdmin"
        class="mx-auto mt-10 block w-full rounded-lg bg-secondary-2 py-2 text-lg font-bold text-white hover:bg-primary-1 lg:w-96"
      >
        送出
      </button>
    </div>
  </div>
</template>

<style scoped>
h2 {
  @apply mb-3 mt-4 text-lg font-bold;
}
label {
  @apply mb-1 inline-block;
}
input,
textarea,
select {
  @apply rounded border p-3;
}
input[type='number'] {
  @apply [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none;
}
button {
  @apply min-h-[40px] justify-center rounded-lg bg-secondary-2 px-5 py-2 text-neutral-50 shadow-none 
  
   hover:bg-primary-2 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-50 disabled:opacity-100;
}
</style>
