<template>
  <div>
    <div>管理 - 提案列表</div>
    <UTable :rows="rows" :columns="columns">
      <template #name-data="{ row }">
        <span
          :class="[
            selected.find((item) => item.projectId === row.projectId) &&
              'text-primary-500 dark:text-primary-400'
          ]"
          >{{ row.name }}</span
        >
      </template>
    </UTable>
    <div class="flex justify-end border-t border-gray-200 px-3 py-3.5 dark:border-gray-700">
      <UPagination v-model="page" :page-count="pageCount" :total="projectList.length" />
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout'
})
const columns = [
  {
    key: 'projectId',
    label: '提案編號'
  },
  {
    key: 'cover',
    label: '封面照片'
  },
  {
    key: 'title',
    label: '案名'
  },
  {
    key: 'dateRange',
    label: '起迄日期'
  },
  {
    key: 'goal',
    label: '金額/目標'
  },
  {
    key: 'people',
    label: '提案人'
  },
  {
    key: 'status',
    label: '狀態'
  }
]
const projectList = [
  {
    projectId: 1,
    cover: 'image',
    title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
    dateRange: '2024/03/01 2025/03/01',
    goal: '500/100000',
    people: '弱勢救星',
    status: '募資中'
  },
  {
    projectId: 2,
    cover: 'image',
    title: '樂知修繕隊緊急求援|弱勢助弱勢,修家修心不能停',
    dateRange: '2024/03/01 2025/03/01',
    goal: '500/100000',
    people: '弱勢救星',
    status: '募資中'
  }
]
const selected = ref([projectList[1]])

const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  return projectList.slice((page.value - 1) * pageCount, page.value * pageCount)
})
</script>
