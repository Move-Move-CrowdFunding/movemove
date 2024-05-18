import { defineStore } from 'pinia'

export const useCreateSuccess = defineStore('createSuccess', () => {
  const project = ref({
    introduce: '專業金援團隊，弱勢族群救星，幫助許多需要協助的家庭。',
    teamName: '弱勢救星',
    title: '愛心廚房｜溫飽無憂的一餐，舉辦食物援助計劃',
    email: 'movemove@gmail.com',
    categoryKey: 0,
    phone: '0912345678',
    targetMoney: 3000000,
    content:
      '<p>我們希望能幫助這些求助者，他們需要有個遮風避雨的住所，每月提供物資包與協助破損老舊的家，能得以維修,以減輕需要幫助的以及長輩們經濟開銷壓力。因此，發起修繕募資計畫，邀請社會大眾一同幫忙，協助清寒民眾與長輩房屋修繕，既使最初只能幫忙清理家園，讓長輩們有一個乾淨、舒適的生活環境，並定期提供長輩生活物資包，靠大家的力量，一同翻新清寒長輩與求助者們的生活。</p>',
    coverUrl:
      'https://images.unsplash.com/photo-1711722221946-e271830d5081?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    describe: '一場無情的大火吞噬了整個社區，請幫助無家可歸的民眾。',
    videoUrl: 'https://www.youtube.com/',
    startDate: 1712016024,
    endDate: 1722016034,
    relatedUrl: 'https://www.google.com.tw/',
    feedbackItem: '限量精美小熊維尼 * 1',
    feedbackUrl:
      'https://plus.unsplash.com/premium_photo-1669632824466-09b2c595aa4c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    feedbackMoney: 250,
    feedbackDate: 1712016000
  })

  return { project }
})
