<script setup>
const results = {
  state: 'ongoing',
  eachStateCount: {
    ongoing: 52,
    pending: 1,
    rejected: 0,
    ended: 30
  },
  list: [
    {
      id: '',
      title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
      categoryId: 1,
      targetMoney: 100000,
      currentMoney: 80000,
      startDate: 1700000000,
      endDate: 1710000000,
      coverUrl:
        'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      supportCount: 70
    },
    {
      id: '',
      title: '送非洲的孩子一雙鞋',
      categoryId: 2,
      targetMoney: 60000,
      currentMoney: 0,
      startDate: 1800000000,
      endDate: 1810000000,
      coverUrl:
        'https://images.unsplash.com/photo-1477349027984-910fe8ca2836?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      supportCount: 70
    }
  ],
  pagination: {}
}
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-center text-3xl font-bold lg:mb-10">提案紀錄{{ results.state }}</h1>
    <ul class="mb-6 flex justify-center lg:mb-10 lg:gap-10">
      <li class="w-1/4 max-w-40">
        <button class="stateTab" :class="{ active: results.state == 'ongoing' }">
          募資中
          <span v-if="results.eachStateCount.ongoing">
            ({{ results.eachStateCount.ongoing }})
          </span>
        </button>
      </li>
      <li class="w-1/4 max-w-40">
        <button class="stateTab" :class="{ active: results.state == 'pending' }">
          審核中
          <span v-if="results.eachStateCount.pending">
            ({{ results.eachStateCount.pending }})
          </span>
        </button>
      </li>
      <li class="w-1/4 max-w-40">
        <button class="stateTab" :class="{ active: results.state == 'rejected' }">
          已退回
          <span v-if="results.eachStateCount.rejected">
            ({{ results.eachStateCount.rejected }})
          </span>
        </button>
      </li>
      <li class="w-1/4 max-w-40">
        <button class="stateTab" :class="{ active: results.state == 'ended' }">
          已結束
          <span v-if="results.eachStateCount.ended"> ({{ results.eachStateCount.ended }}) </span>
        </button>
      </li>
    </ul>
    <ul class="flex flex-col gap-6 lg:gap-10">
      <li v-for="item in results.list" :key="item.id">
        <MyProjectCard :state="results.state" :data="item" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.stateTab {
  @apply h-full w-full border-b-2 border-white py-2 hover:border-primary-3;
}
.stateTab.active {
  @apply border-primary-1;
}
</style>
