<script setup lang="ts">
import { getAdminProjectItem } from '@/apis/admin'

// import type { ResponseData } from '~/types/response'

definePageMeta({
  layout: 'admin-layout'
})

// interface ProjectItem {
//   _id: string
//   introduce: string
//   teamName: string
//   email: string
//   phone: string
//   title: string
//   categoryKey: number
//   targetMoney: number
//   startDate: number
//   endDate: number
//   describe: string
//   coverUrl: string
//   content: string
//   videoUrl: string
//   relatedUrl: string
//   feedbackItem: string
//   feedbackUrl: string
//   feedbackMoney: number
//   feedbackDate: number
//   reviewLog: {
//     _id: string
//     content: string
//     status: number
//     timestamp: number
//   }[]
//   state: {
//     state: number
//     content: string
//   }
// }

// const projectItem = ref<ProjectItem[]>
const projectItem = ref({})
// const pageTitle = usePageTitleStore()

const getProjectItem = async (id: string) => {
  // console.log('id', id)
  const { data, error } = await getAdminProjectItem(id)
  if (error.value) return

  projectItem.value = data.value.results[0]
  // const { title } = projectItem.value
  // console.log('projectItem.value', projectItem.value)
  // console.log('pageTitle.currentTitle', pageTitle.currentTitle)
  // pageTitle.currentTitle = title

  // await getFetchData({
  //   url: `/admin/projects/${id}`,
  //   method: 'GET'
  // })
  //   .then((res) => {
  //     projectItem.value = (res as ResponseData).results[0]
  //     // const { title } = projectItem.value
  //     // console.log('projectItem', projectItem.value)
  //     // pageTitle.getCurrentTitle(projectItem.value[0].title)
  //     // pageTitle.currentTitle = '111111'
  //     // pageTitle.getCurrentTitle('eeee')
  //   })
  //   .catch((err) => console.log(err.msg))
}

// const tempData = ref({
//   _id: '66401d4618d9a03d58194704',
//   introduce:
//     '「就算復原之路緩慢且遙遠，只要不放棄，一定能夠讓『輪島塗工藝』重新照亮整座輪島市。」KK Select與Iku老師誠摯邀請您一起參與田谷漆器店災後重建計畫。',
//   teamName: 'Taiwan Stands With Ukraine',
//   email: 'elsa@gamil.com',
//   phone: '0955123123',
//   title: '令和6年能登半島地震｜日本200年輪島塗老鋪田谷漆器店災後重建計畫，邁向下一個百年',
//   categoryKey: 3,
//   targetMoney: 1000000,
//   startDate: 1715439897,
//   endDate: 1718118294,
//   describe:
//     '元月1日的石川大地震至今已經過快3個月。在櫻花開始綻放的季節，位於重災區的輪島市也持續動起來，只望能更早回到原本的日常生活。我們非常感謝在【田谷漆器店災後重建活動】開跑後得到超過 3,400名 朋友的支持！',
//   coverUrl: 'https://picsum.photos/id/61/200/300',
//   content:
//     '<p>台灣的朋友們，你們好。我是日本田谷漆器店第十代傳人-田谷昂大。有些人可能是第一次知道我們，請容許我稍微自我介紹。<br><br>我們是來自日本石川縣輪島市的「田谷漆器店」。創立於1818年，至今已有兩百年的歷史。肩負百年文化傳承的角色，我們一直遵循傳統的工法製作「輪島塗漆器」的同時，也不斷地探索開拓漆器的創新和可能性。</p>',
//   videoUrl: 'https://youtu.be/Iy69ifIf7jc?si=rX3_ZAdEhvgsUbu5',
//   relatedUrl: 'https://www.zeczec.com/projects/Taya-shikkiten',
//   feedbackItem: '田谷漆器店感謝信',
//   feedbackUrl: '',
//   feedbackMoney: 1000,
//   feedbackDate: 1718118294,
//   reviewLog: [
//     {
//       _id: '6649a6405806444f8584d11c',
//       content: '請管管審核',
//       status: 0,
//       timestamp: 1715874668
//     }
//   ],
//   state: {
//     state: 0,
//     content: ''
//   }
// })

const route = useRoute()
const { id } = route.params
onMounted(() => {
  nextTick(async () => {
    await getProjectItem(id as string)
  })
})
</script>
<template>
  <div class="rounded-xl bg-neutral-50">
    <ProjectInfo :temp-data="projectItem" />
  </div>
</template>
<style lang="scss" scoped>
:deep(.container) {
  @apply w-full max-w-[inherit] p-4;
}
</style>
