<script setup>
const route = useRoute()
const router = useRouter()
const results = ref([])
const followingList = computed(() => results.value.results || [])

const getFollowing = async () => {
  try {
    results.value = await getFetchData({
      url: `/member/collection?pageNo=${pageNo.value}&pageSize=${pageSize.value}`
    })
  } catch (error) {
    console.log(error)
  }
}

const totalCount = computed(() => results.value?.pagination?.count || 0)
const pageNo = computed(() => route.query.pageNo * 1 || 1)
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

const updateUrl = () => {
  router.push({ query: { pageNo: pn.value } })
}

const toggleFollow = async (id) => {
  console.log(id)
  await getFetchData({
    url: `/member/collection`,
    method: 'POST',
    params: { projectId: id }
  })
    .then((res) => {
      console.log(res)
      getProjects()
    })
    .catch((err) => console.log(err))
}
</script>
<template>
  <div class="container py-10 lg:py-20">
    <h1 class="mb-6 text-3xl sm:text-4xl lg:mb-10">追蹤記錄</h1>
    <ul v-if="items?.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in followingList" :key="project.id">
        <ProjectCard :project="project" @follow="toggleFollow" />
      </li>
    </ul>
    <EmptyState v-else />
    <div v-if="items?.length" class="mt-5 flex items-center justify-center">
      <UPagination
        v-model="pn"
        :page-count="pageSize"
        :total="totalCount"
        :model-value="pn"
        @click="updateUrl"
      />
    </div>
  </div>
</template>
