<script setup>
const project = ref({
  teamName: '弱勢救星',
  email: 'movemove@gmail.com',
  phone: '0912345678',
  introduce: '專業金援團隊，弱勢族群救星，幫助許多需要協助的家庭。',
  title: '愛心廚房｜溫飽無憂的一餐，舉辦食物援助計劃',
  categoryKey: 2,
  targetMoney: 300000,
  startDate: 1700000000,
  endDate: 1710000000,
  describe: '一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。',
  coverUrl:
    'https://images.unsplash.com/photo-1711722221946-e271830d5081?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  content:
    '我們希望能幫助這些求助者，他們需要有個遮風避雨的住所，每月提供物資包與協助破損老舊的家，能得以維修,以減輕需要幫助的以及長輩們經濟開銷壓力。因此，發起修繕募資計畫，邀請社會大眾一同幫忙，協助清寒民眾與長輩房屋修繕，既使最初只能幫忙清理家園，讓長輩們有一個乾淨、舒適的生活環境，並定期提供長輩生活物資包，靠大家的力量，一同翻新清寒長輩與求助者們的生活。',
  videoUrl: 'https://www.youtube.com/',
  relateUrl: 'https://www.google.com.tw/',
  feedbackItem: '限量精美小熊維尼 * 1',
  feedbackUrl:
    'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  feedbackMoney: '250',
  feedbackDate: 1710000000,
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
    <CreateSteps :step="3" />
    <div class="container py-10">
      <h1 class="mb-8 text-3xl font-bold">提案發起成功</h1>
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
        <div class="xl:col-span-2">
          <ul>
            <li class="mb-6">
              <div class="font-bold">提案標題：</div>
              <p>{{ project.title }}</p>
            </li>
            <li class="mb-6">
              <div class="font-bold">提案人名稱：</div>
              <p>{{ project.teamName }}</p>
            </li>
            <li class="mb-6">
              <div class="font-bold">提案發起日期：</div>
              <p>
                <span v-dateformat="project.startDate * 1000"></span>
                至
                <span v-dateformat="project.endDate * 1000"></span>
              </p>
            </li>
            <li>
              <div class="font-bold">目標金額：</div>
              <p>{{ priceFormat(project.targetMoney) }}</p>
            </li>
          </ul>
          <div class="mt-10 bg-secondary-2 p-6 text-white">
            已將您的提案申請送出，我們將在 7 - 10
            個工作天內完成提案審核，並將審核結果已通知的形式告知。
          </div>
        </div>
        <div>
          <ProjectCard :project="project" />
        </div>
      </div>
    </div>
  </div>
</template>
