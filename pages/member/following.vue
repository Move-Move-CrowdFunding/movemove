<script setup>
const loading = useLoadingStore()
const route = useRoute()
const results = ref([])
const followingList = computed(() => results.value.results || [])

const pageNo = ref(1)
const pageSize = computed(() => route.query.pageSize * 1 || 6)

const pn = ref(1)
watch(
  pageNo,
  (val) => {
    pn.value = val
    nextTick(() => getFollowing())
  },
  { immediate: true }
)
const pagination = ref({
  count: 0,
  pageNo: 1,
  pageSize: 0
})
const getFollowing = async () => {
  try {
    results.value = await getFetchData({
      url: `/member/collection?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    })
    pagination.value = results.value.pagination
    loading.isGlobalLoading = false
  } catch (error) {
    console.log(error)
  }
}

const toggleFollow = async (id) => {
  loading.isGlobalLoading = true

  console.log(id)
  await getFetchData({
    url: `/member/collection`,
    method: 'POST',
    params: { projectId: id }
  })
    .then((res) => {
      console.log(res)
      getFollowing()
    })
    .catch((err) => console.log(err))
}

const changePage = (page) => {
  pageNo.value = page
  getFollowing()
}
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-3xl sm:text-4xl lg:mb-10">追蹤記錄</h1>
    <ul v-if="followingList?.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in followingList" :key="project.id">
        <ProjectCard :project="project" @follow="toggleFollow" />
      </li>
    </ul>
    <EmptyState v-else />
    <!-- <div v-if="followingList?.length" class="mt-5 flex items-center justify-center">
      <UPagination
        v-model="pn"
        :page-count="pageSize"
        :total="totalCount"
        :model-value="pn"
        @click="updateUrl"
      />
    </div> -->
    <Pagination
      v-if="followingList?.length"
      container-class="container flex items-center justify-center py-10 lg:py-20"
      size="xl"
      :pagination="pagination"
      @page="changePage"
    />
  </div>
</template>
