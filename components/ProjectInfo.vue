<script setup>
// const { $timeformat } = useNuxtApp()

// const tempData1 = ref({
//   introduce: '專業金援團隊，弱勢族群救星，幫助許多需要協助的家庭。',
//   teamName: '弱勢救星',
//   title: '愛心廚房｜溫飽無憂的一餐，舉辦食物援助計劃',
//   email: 'movemove@gmail.com',
//   categoryKey: 0,
//   phone: '0912345678',
//   targetMoney: 3000000,
//   content:
//     '<p>我們希望能幫助這些求助者，他們需要有個遮風避雨的住所，每月提供物資包與協助破損老舊的家，能得以維修,以減輕需要幫助的以及長輩們經濟開銷壓力。因此，發起修繕募資計畫，邀請社會大眾一同幫忙，協助清寒民眾與長輩房屋修繕，既使最初只能幫忙清理家園，讓長輩們有一個乾淨、舒適的生活環境，並定期提供長輩生活物資包，靠大家的力量，一同翻新清寒長輩與求助者們的生活。</p>',
//   coverUrl:
//     'https://images.unsplash.com/photo-1711722221946-e271830d5081?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   describe: '一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。',
//   videoUrl: 'https://www.youtube.com/',
//   startDate: 1712016024,
//   endDate: 1722016034,
//   relatedUrl: 'https://www.google.com.tw/',
//   feedbackItem: '限量精美小熊維尼 * 1',
//   feedbackUrl:
//     'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   feedbackMoney: 250,
//   feedbackDate: 1712016000
// })
const tempData = ref({
  introduce: '',
  teamName: '',
  title: '',
  email: '',
  categoryKey: 0,
  phone: '',
  targetMoney: 0,
  content: '',
  coverUrl: '',
  describe: '',
  videoUrl: '',
  startDate: 0,
  endDate: 0,
  relatedUrl: '',
  feedbackItem: '',
  feedbackUrl: '',
  feedbackMoney: 0,
  feedbackDate: 0,
  status: {
    status: 0,
    content: ''
  },
  reviewLog: [
    {
      timestamp: 1700000000,
      status: 0,
      content: '提案送審'
    },
    {
      timestamp: 1700000000,
      status: -1,
      content: '提案退回 - 請補上完整聯絡資訊'
    },
    {
      timestamp: 1700000000,
      status: 0,
      content: '提案送審'
    },
    {
      timestamp: 1700000000,
      status: 1,
      content: '提案通過'
    }
  ]
})
</script>
<template>
  <div>
    <div class="container py-10">
      <div class="border-2 border-secondary-2">
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
              v-model="tempData.teamName"
              type="text"
              placeholder="請輸入提案人姓名/團隊名稱"
              class="block w-full"
            />
            <p class="mt-2 text-xs">
              提案人必須要用真實姓名註冊會員，不接受匿名或使用他人名義的提案。
            </p>
          </div>
          <div class="mb-6">
            <label for="email">聯絡信箱</label>
            <input
              id="email"
              v-model="tempData.email"
              type="email"
              placeholder="請輸入聯絡信箱"
              class="block w-full"
            />
          </div>
          <div class="mb-6">
            <label for="">聯絡手機</label>
            <input
              id=""
              v-model="tempData.phone"
              type="tel"
              placeholder="請輸入聯絡手機"
              class="block w-full"
            />
          </div>
          <div class="mb-6">
            <label for="phone">團隊介紹</label>
            <textarea
              id="phone"
              v-model="tempData.introduce"
              placeholder="請輸入團隊介紹"
              class="block w-full"
            ></textarea>
          </div>
          <div>
            <h2>專案卡預覽</h2>
            <ProjectCard :project="tempData" />
          </div>
          <div v-if="tempData.reviewLog">
            <h2>檢核紀錄</h2>
            <ul>
              <li v-for="item in tempData.reviewLog" :key="item">
                {{ item.timestamp }}
              </li>
              <li>2023/02/01 11:25 ➖ 提案送審</li>
              <li>2023/02/01 14:30 ✖️ 否准提案 - 請補上完整聯絡資訊</li>
              <li>2023/02/01 15:45 ➖ 提案送審</li>
              <li>2023/02/02 20:10 ✔️ 核准提案</li>
            </ul>
          </div>
        </div>
        <div class="order-1 col-span-2 lg:order-2">
          <h2>提案詳情</h2>
          <div class="mb-6">
            <label for="title">提案標題</label>
            <input
              id="title"
              v-model="tempData.title"
              type="text"
              placeholder="請輸入提案標題"
              class="block w-full"
            />
            <p class="mt-2 text-xs">
              好的標題應該要好記、好搜尋、吸引人想點進去看，並讓瀏覽者能在最短的時間內瞭解專案的核心理念。
            </p>
          </div>
          <div class="mb-6 grid grid-cols-2 gap-3">
            <div>
              <label for="categoryKey">分類</label>
              <select id="categoryKey" v-model="tempData.categoryKey" name="" class="block w-full">
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
                  v-model="tempData.targetMoney"
                  type="text"
                  placeholder="請輸入提案目標"
                  class="block w-full"
                />
                <span>NTD</span>
              </div>
              <p class="mt-2 text-xs">請根據你計畫的需求，估算你所需要募集的金額</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="">預計時間</label>
            <div class="flex items-center">
              <input id="startDate" v-model="tempData.startDate" type="date" class="grow" />
              <span>→</span>
              <input id="endDate" v-model="tempData.endDate" type="date" class="grow" />
            </div>
            <p class="mt-2 text-xs">
              專案提交後需要7-10個工作天進行內容檢視，所以開始時間至少為10天後。募資天數最短為7天，最長為60天。
            </p>
          </div>
          <div class="mb-6">
            <label for="describe">提案簡介</label>
            <textarea
              id="describe"
              v-model="tempData.introduce"
              placeholder="請簡短敘述提案內容, 最長不超過 80 字"
              class="block w-full"
            ></textarea>
          </div>
          <div class="mb-6">
            <label for="">封面照片</label>
            <div class="flex items-center rounded border pl-1">
              <button class="rounded bg-secondary-2 px-3 py-2 text-white">請選擇檔案</button>
              <input
                id="feedbackUrl"
                v-model="tempData.coverUrl"
                type="text"
                class="grow border-white"
              />
            </div>
            <img :src="tempData.coverUrl" class="mt-1" />
          </div>
          <div class="mb-6">
            <label for="coverUrl">提案說明</label>
            <textarea
              id="coverUrl"
              v-model="tempData.content"
              placeholder="請輸入提案說明, 至少 350 字"
              class="block w-full"
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
              v-model="tempData.videoUrl"
              type="text"
              placeholder="請輸入影片網址"
              class="block w-full"
            />
          </div>
          <div class="mb-6">
            <label for="relatedUrl">相關網站</label>
            <input
              id="relatedUrl"
              v-model="tempData.relatedUrl"
              type="text"
              placeholder="請輸入相關網站"
              class="block w-full"
            />
          </div>

          <h2>回饋方案</h2>
          <div class="mb-6">
            <label for="feedbackItem">回饋項目</label>
            <input
              id="feedbackItem"
              v-model="tempData.feedbackItem"
              type="text"
              placeholder="請輸入回饋項目"
              class="block w-full"
            />
          </div>
          <div class="mb-6">
            <label for="feedbackUrl">回饋品圖片</label>
            <div class="flex items-center rounded border pl-1">
              <button class="rounded bg-secondary-2 px-3 py-2 text-white">請選擇檔案</button>
              <input
                id="feedbackUrl"
                v-model="tempData.feedbackUrl"
                type="text"
                class="grow border-white"
              />
            </div>
            <img :src="tempData.feedbackUrl" class="mt-1" />
          </div>
          <div class="mb-6">
            <label for="feedbackMoney">回饋門檻</label>
            <div class="flex items-center">
              <input
                id="feedbackMoney"
                v-model="tempData.feedbackMoney"
                type="text"
                placeholder="請輸入回饋門檻"
                class="block w-full"
              />
              <span>NTD</span>
            </div>
            <p class="mt-2 text-xs">單一募資滿門檻金額，將提供回饋</p>
          </div>
          <div class="">
            <label for="feedbackDate">預計寄出日期</label>
            <input
              id="feedbackDate"
              v-model="tempData.feedbackDate"
              type="date"
              placeholder="請輸入寄出日期"
              class="block w-full"
            />
          </div>
        </div>
      </div>

      <button
        class="mx-auto mt-10 block w-full rounded-lg bg-secondary-2 py-2 text-lg font-bold text-white hover:bg-primary-1 lg:w-96"
        @click="$router.push({ path: '/create/success' })"
      >
        發起提案
      </button>
    </div>
  </div>
</template>

<style scoped>
/* * {
  outline: 1px solid #090;
} */
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
