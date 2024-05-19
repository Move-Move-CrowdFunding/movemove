<script setup lang="ts">
import type { ResponseData } from '~/types/response'

definePageMeta({
  layout: 'admin-layout'
})

const projectItem = ref({})
const getProjectItem = async (id: string) => {
  await getFetchData({
    url: `/admin/projects/${id}`,
    method: 'GET'
  })
    .then((res) => {
      projectItem.value = (res as ResponseData).results
    })
    .catch((err) => console.log(err.msg))
}

const route = useRoute()
const { id } = route.params
onMounted(() => {
  nextTick(async () => {
    await getProjectItem(id as string)
  })
})
</script>
<template>
  <div>
    <h2>管理 - 提案內容</h2>
    返回上一頁
    <NuxtLink to="/admin">回到管理頁面</NuxtLink>
    <p>提案編號: {{ $route.params.id }}</p>
    <pre>{{ projectItem }}</pre>
  </div>
</template>
