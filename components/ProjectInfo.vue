<script setup>
import { useDayjs } from '#dayjs'
const dayjs = useDayjs()

const route = useRoute()
const inAdmin = route.fullPath.includes('admin')

const props = defineProps({
  tempData: {
    type: Object,
    required: true
  }
})

const { tempData } = toRefs(props)
const newTempData = ref(tempData.value)
// console.log(
//   '!inAdmin && Array.isArray(newTempData.value.state)',
//   !inAdmin && Array.isArray(newTempData.value.state)
// )
if (!inAdmin && Array.isArray(newTempData.value.state)) {
  const maxCreateTimeObject = newTempData.value?.state?.reduce((max, current) => {
    return current.createTime > max.createTime ? current : max
  }, newTempData.value.state[0])
  newTempData.value.status = maxCreateTimeObject?.status
}

// 10 天後
const tenDaysLater = ref(dayjs(dayjs()).add(11, 'day').format('YYYY-MM-DD'))

// 10 天 + 7 天
const sevenDaysAfterTenDays = ref(dayjs(tenDaysLater.value).add(7, 'day').format('YYYY-MM-DD'))

// 綁定日期
const dateInput = ref({
  startDate: tenDaysLater.value || newTempData.value.startDate,
  endDate: sevenDaysAfterTenDays.value || newTempData.value.endDate,
  feedbackDate: newTempData.value.feedbackDate || ''
})

newTempData.value.startDate = dayjs(dateInput.value.startDate).unix()
newTempData.value.endDate = dayjs(dateInput.value.endDate).unix()
newTempData.value.feedbackDate = dayjs(dateInput.value.feedbackDate).unix() || 0
const changeDate = (item) => {
  const date = new Date(dateInput.value[item])
  newTempData.value[item] = date.getTime() / 1000
}

const isDisable = inAdmin || newTempData.value?.status === 0 || newTempData.value?.status === 1

const coverUpload = ref(null)
const feedbackUpload = ref(null)
const uploadFile = async (item) => {
  const formData = new FormData()
  if (item === 'cover') {
    formData.append('coverUpload', coverUpload.value.files[0])
  } else {
    formData.append('feedbackUpload', feedbackUpload.value.files[0])
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
    url: `/admin/projects/${tempData.value._id}`,
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
      <div v-if="newTempData?.status === -1" class="border-2 border-secondary-2">
        <div class="flex justify-between bg-secondary-2 p-3 font-bold text-white">
          <span>審核失敗</span>
          <span>2024/1/23</span>
        </div>
        <div class="bg-white p-3">
          <p class="">失敗原因：</p>
          <p class="">失敗</p>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
        <div class="order-2 lg:order-1">
          <h2 class="">提案人資料</h2>
          <div class="mb-6">
            <label for="teamName">提案人姓名/團隊名稱</label>
            <input
              id="teamName"
              v-model="newTempData.teamName"
              type="text"
              placeholder="請輸入提案人姓名/團隊名稱"
              class="block w-full"
              :disabled="isDisable"
            />
            <p class="mt-2 text-xs">
              提案人必須要用真實姓名註冊會員，不接受匿名或使用他人名義的提案。
            </p>
          </div>
          <div class="mb-6">
            <label for="email">聯絡信箱</label>
            <input
              id="email"
              v-model="newTempData.email"
              type="email"
              placeholder="請輸入聯絡信箱"
              class="block w-full"
              :disabled="isDisable"
            />
          </div>
          <div class="mb-6">
            <label for="phone">聯絡手機</label>
            <input
              id="phone"
              v-model="newTempData.phone"
              type="tel"
              placeholder="請輸入聯絡手機"
              class="block w-full"
              :disabled="isDisable"
            />
          </div>
          <div class="mb-6">
            <label for="phone">團隊介紹</label>
            <textarea
              id="phone"
              v-model="newTempData.introduce"
              placeholder="請輸入團隊介紹"
              class="block w-full"
              :disabled="isDisable"
            ></textarea>
          </div>
          <div v-if="!inAdmin">
            <h2>專案卡預覽</h2>
            <ProjectCard :project="newTempData" />
          </div>
          <div v-if="inAdmin">
            <h2>檢核紀錄</h2>
            <ul>
              <li v-for="item in newTempData.reviewLog" :key="item">
                {{ $timeformat(item.timestamp) }}
                {{ item.state?.state === 0 ? '➖' : item.state?.state === -1 ? '✖️' : '✔️' }}
                {{ item.content }}
              </li>
            </ul>
          </div>
        </div>
        <div class="order-1 col-span-2 lg:order-2">
          <h2>提案詳情</h2>
          <div class="mb-6">
            <label for="title">提案標題</label>
            <input
              id="title"
              v-model="newTempData.title"
              type="text"
              placeholder="請輸入提案標題"
              class="block w-full"
              :disabled="isDisable"
            />
            <p class="mt-2 text-xs">
              好的標題應該要好記、好搜尋、吸引人想點進去看，並讓瀏覽者能在最短的時間內瞭解專案的核心理念。
            </p>
          </div>
          <div class="mb-6 grid grid-cols-2 gap-3">
            <div>
              <label for="categoryKey">分類</label>
              <select
                id="categoryKey"
                v-model="newTempData.categoryKey"
                name=""
                class="block w-full"
                :disabled="isDisable"
              >
                <option value="0" disabled>請選擇分類</option>
                <option v-for="category in categoryKeys" :key="category.key" :value="category.key">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label for="targetMoney">提案目標</label>
              <div class="flex items-center">
                <input
                  id="targetMoney"
                  v-model="newTempData.targetMoney"
                  type="text"
                  placeholder="請輸入提案目標"
                  class="block w-full"
                  :disabled="isDisable"
                />
                <span>NTD</span>
              </div>
              <p class="mt-2 text-xs">請根據你計畫的需求，估算你所需要募集的金額</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="">預計時間</label>
            <div class="flex items-center">
              <input
                id="startDate"
                v-model="dateInput.startDate"
                type="date"
                class="grow"
                :disabled="isDisable"
                @change="changeDate('startDate')"
              />
              <span>→</span>
              <input
                id="endDate"
                v-model="dateInput.endDate"
                type="date"
                class="grow"
                :disabled="isDisable"
                @change="changeDate('endDate')"
              />
            </div>
            <p class="mt-2 text-xs">
              專案提交後需要7-10個工作天進行內容檢視，所以開始時間至少為10天後。募資天數最短為7天，最長為60天。
            </p>
          </div>
          <div class="mb-6">
            <label for="describe">提案簡介</label>
            <textarea
              id="describe"
              v-model="newTempData.describe"
              placeholder="請簡短敘述提案內容, 最長不超過 80 字"
              class="block w-full"
              :disabled="isDisable"
            ></textarea>
          </div>
          <div class="mb-6">
            <label for="">封面照片</label>
            <div class="flex items-stretch rounded border">
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
              />
              <input
                v-model="newTempData.coverUrl"
                type="text"
                placeholder="或輸入圖片網址"
                class="grow border-white"
                :disabled="isDisable"
              />
            </div>
            <img :src="newTempData.coverUrl" class="mt-1" />
          </div>
          <div class="mb-6">
            <label for="coverUrl">提案說明</label>
            <textarea
              id="coverUrl"
              v-model="newTempData.content"
              placeholder="請輸入提案說明, 至少 350 字"
              class="block w-full"
              :disabled="isDisable"
            ></textarea>
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
              class="block w-full"
              :disabled="isDisable"
            />
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
              class="block w-full"
              :disabled="isDisable"
            />
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
                class="grow border-white"
                :disabled="isDisable"
              />
            </div>
            <img :src="newTempData.feedbackUrl" class="mt-1" />
          </div>
          <div class="mb-6">
            <label for="feedbackMoney">回饋門檻</label>
            <div class="flex items-center">
              <input
                id="feedbackMoney"
                v-model="newTempData.feedbackMoney"
                type="text"
                placeholder="請輸入回饋門檻"
                class="block w-full"
                :disabled="isDisable"
              />
              <span>NTD</span>
            </div>
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
        v-if="inAdmin && newTempData?.state?.state === 0"
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
        v-if="newTempData?.state === 0 && !inAdmin"
        class="mx-auto mt-10 block w-full rounded-lg bg-secondary-2 py-2 text-lg font-bold text-white hover:bg-primary-1 lg:w-96"
        @click="emit('createProject', newTempData)"
      >
        發起提案
      </button>
      <button
        v-if="newTempData?.status === 1 && !inAdmin"
        class="mx-auto mt-10 block w-full rounded-lg bg-warning-500 py-2 text-lg font-bold text-white hover:bg-warning-300 lg:w-96"
      >
        結束提案
      </button>
      <button
        v-if="newTempData?.status === -1 && !inAdmin"
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
</style>
