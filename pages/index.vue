<script setup>
const isLogin = useIsLoginStore()
const loading = useLoadingStore()

const bannerNavigation = {
  nextEl: '.banner-swiper-button-next',
  prevEl: '.banner-swiper-button-prev'
}
const hotNavigation = {
  nextEl: '.hot-swiper-button-next',
  prevEl: '.hot-swiper-button-prev'
}

const homeData = ref({})

// 取得提案列表
const getHomeData = async () => {
  await getFetchData({
    url: '/home/info',
    method: 'GET'
  })
    .then((res) => {
      homeData.value = res
      loading.isGlobalLoading = false
    })
    .catch((err) => {
      console.log(err)
      loading.isGlobalLoading = false
    })
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
      getHomeData()
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  loading.isGlobalLoading = true

  nextTick(() => {
    getHomeData()
  })
})
</script>
<template>
  <div>
    <section class="relative">
      <Swiper
        id="banner-swiper"
        :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
        :loop="true"
        :autoplay="{
          delay: 3000,
          pauseOnMouseEnter: true
        }"
        :speed="1000"
        :centered-slides="true"
        :pagination="true"
        :navigation="bannerNavigation"
        :slides-per-view="1"
        :breakpoints="{
          '640': {
            slidesPerView: 1.2,
            spaceBetween: 24
          },
          '1024': {
            slidesPerView: 1.5,
            spaceBetween: 40
          }
        }"
        class="h-[500px]"
      >
        <SwiperSlide class="bg-[url('~/assets/images/index/banner/1.png')] bg-cover bg-center">
          <div class="h-full text-center font-bold">
            <img src="~/assets/icons/logo.svg" alt="" class="mx-auto mt-20 block" />
            <p class="my-12 text-7xl">群眾募資</p>
            <p class="text-3xl">共同實現夢想</p>
          </div>
        </SwiperSlide>
        <SwiperSlide class="bg-[url('~/assets/images/index/banner/2.png')] bg-cover bg-center">
          <div class="h-full text-center font-bold">
            <img src="~/assets/icons/logo.svg" alt="" class="mx-auto mt-20 block" />
            <p class="my-12 text-7xl">群眾募資</p>
            <p class="text-3xl">建立共同體和凝聚力</p>
          </div>
        </SwiperSlide>
        <SwiperSlide class="bg-[url('~/assets/images/index/banner/3.png')] bg-cover bg-center">
          <div class="h-full text-center font-bold">
            <img src="~/assets/icons/logo.svg" alt="" class="mx-auto mt-20 block" />
            <p class="my-12 text-7xl">群眾募資</p>
            <p class="text-3xl">民主參與影響</p>
          </div>
        </SwiperSlide>
        <SwiperSlide class="bg-[url('~/assets/images/index/banner/3.png')] bg-cover bg-center">
          <div class="h-full text-center font-bold">
            <img src="~/assets/icons/logo.svg" alt="" class="mx-auto mt-20 block" />
            <p class="my-12 text-7xl">群眾募資</p>
            <NuxtLink to="/create" class="rounded-lg bg-[#4767A2] px-5 py-2 text-white">
              發起提案
            </NuxtLink>
          </div>
        </SwiperSlide>
      </Swiper>
      <div
        class="container absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-primary-2"
      >
        <div class="relative flex justify-between bg-secondary-2">
          <button class="banner-swiper-button-prev">
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M22.0875 4.71253L19.875 2.50003L7.5 14.875L19.875 27.25L22.0875 25.0375L11.925 14.875L22.0875 4.71253Z"
                />
              </g>
            </svg>
          </button>
          <button class="banner-swiper-button-next">
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M7.5 25.2875L9.7125 27.5L22.2125 15L9.7125 2.5L7.5 4.7125L17.7875 15L7.5 25.2875Z"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </section>
    <!-- bg-group -->
    <div class="bg-group-1 bg-none bg-right-bottom bg-no-repeat lg:px-3">
      <section v-if="homeData.hotProjects?.length" class="container py-10 sm:pt-20">
        <div class="mb-6 flex h-[54px] items-center justify-between sm:mb-10">
          <h2 class="text-3xl sm:text-4xl">熱門提案</h2>
          <NuxtLink to="/projects" class="hover:text-primary-1 active:text-secondary-1"
            >查看更多</NuxtLink
          >
        </div>
        <div class="relative">
          <Swiper
            id="hot-swiper"
            :modules="[SwiperNavigation, SwiperPagination]"
            :loop="true"
            :slides-per-view="1.3"
            :space-between="24"
            :navigation="hotNavigation"
            :pagination="true"
            :breakpoints="{
              '640': {
                slidesPerView: 2.3
              },
              '1024': {
                slidesPerView: 3
              }
            }"
          >
            <SwiperSlide v-for="project in homeData.hotProjects" :key="project.id">
              <ProjectCard :project="project" @follow="toggleFollow" />
            </SwiperSlide>
          </Swiper>
          <button v-if="homeData.hotProjects.length > 3" class="hot-swiper-button-prev">
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M22.0875 4.71253L19.875 2.50003L7.5 14.875L19.875 27.25L22.0875 25.0375L11.925 14.875L22.0875 4.71253Z"
                />
              </g>
            </svg>
          </button>
          <button v-if="homeData.hotProjects.length > 3" class="hot-swiper-button-next">
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M7.5 25.2875L9.7125 27.5L22.2125 15L9.7125 2.5L7.5 4.7125L17.7875 15L7.5 25.2875Z"
                />
              </g>
            </svg>
          </button>
        </div>
      </section>
      <section
        class="bg-secondary-5 bg-[url('~/assets/images/index/bg/bg-sketch.png')] bg-no-repeat lg:bg-transparent lg:bg-none"
        style="background-size: 42%"
      >
        <div class="container grid grid-cols-1 gap-6 py-10 sm:py-40 lg:grid-cols-4">
          <h2 class="text-3xl sm:text-4xl">提案類別</h2>
          <div class="col-span-3">
            <ul class="grid grid-cols-2 gap-6 xl:grid-cols-3">
              <li v-for="(item, index) in categoryKeys" :key="index">
                <NuxtLink
                  :to="`/projects?category=${item.key}`"
                  class="flex h-full flex-col items-center gap-3 rounded-2xl border border-white bg-white px-4 py-3 font-bold leading-normal shadow-lg duration-300 hover:border-primary-1 sm:rounded-3xl sm:px-8 sm:text-2xl lg:flex-row"
                >
                  <img :src="`/images/category/mobile-${index + 1}.png`" alt="" class="sm:hidden" />
                  <img
                    :src="`/images/category/desktop-${index + 1}.png`"
                    alt=""
                    class="hidden sm:block"
                  />
                  <p class="">{{ item.name }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>

    <section class="py-10 sm:pb-40 lg:bg-secondary-5">
      <h2 class="container mb-6 text-3xl sm:text-4xl lg:mb-10">推薦提案</h2>
      <div class="container">
        <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <li v-for="project in homeData.recommendProjects" :key="project.id">
            <ProjectCard :project="project" @follow="toggleFollow" />
          </li>
        </ul>
      </div>
    </section>
    <section class="bg-results bg-cover bg-center">
      <div class="container py-10 text-center text-white sm:py-20">
        <ul class="mb-6 grid gap-6 sm:mb-20 sm:grid-cols-3">
          <li>
            <div
              class="text-4xl leading-[54px] lg:text-5xl lg:leading-[80px] xl:text-[64px] xl:leading-[144px]"
            >
              {{ homeData.achievements?.projectTotal.toLocaleString() }}
            </div>
            <p class="sm:text-2xl">累積專案</p>
          </li>
          <li>
            <div
              class="text-4xl leading-[54px] lg:text-5xl lg:leading-[80px] xl:text-[64px] xl:leading-[144px]"
            >
              {{ homeData.achievements?.amountTotal.toLocaleString() }}
            </div>
            <p class="sm:text-2xl">累積金額</p>
          </li>
          <li>
            <div
              class="text-4xl leading-[54px] lg:text-5xl lg:leading-[80px] xl:text-[64px] xl:leading-[144px]"
            >
              {{ homeData.achievements?.peopleTotal.toLocaleString() }}
            </div>
            <p class="sm:text-2xl">累積贊助人數</p>
          </li>
        </ul>
        <p class="col-span-4 col-start-2">
          已經成功支持了超過1000個具有社會影響力的項目，這些項目涵蓋了教育、長者、婦女、國際支援、弱勢救助、兒少福利等各個領域。透過我們平台的支持，這些項目不僅獲得了必要的資金支持，更取得了廣泛的社會關注和支持。
        </p>
      </div>
    </section>

    <div class="bg-group-2 bg-top bg-no-repeat">
      <section v-if="homeData.successProjects?.length" class="lg:bg-none">
        <div class="container pb-10 pt-20 sm:pb-20 sm:pt-40">
          <div class="mb-6 flex h-[54px] items-center justify-between lg:mb-10">
            <h2 class="text-3xl sm:text-4xl">成功案例</h2>
            <NuxtLink to="/projects" class="hover:text-primary-1 active:text-secondary-1"
              >查看更多</NuxtLink
            >
          </div>
          <ul class="grid gap-6 sm:gap-y-9 lg:grid-cols-2">
            <li v-for="item in homeData.successProjects" :key="item.id">
              <NuxtLink
                :to="`/projects/${item.id}`"
                class="group grid grid-cols-3 overflow-hidden rounded-2xl border border-primary-3 bg-white duration-300 hover:border-primary-1 hover:shadow-lg lg:grid-cols-2 lg:rounded-[32px]"
              >
                <div class="relative overflow-hidden">
                  <div
                    class="absolute inset-0 bg-cover bg-center duration-300 group-hover:scale-110"
                    :style="{ backgroundImage: `url('${item.coverUrl}')` }"
                  ></div>
                  <button
                    v-if="isLogin.isLogin"
                    class="group absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-600/50 fill-white duration-300 hover:bg-secondary-1 active:fill-primary-1 lg:right-4 lg:top-4"
                    :class="{
                      'fill-primary-1': item.trackingStatus,
                      'fill-white': !item.trackingStatus
                    }"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                          class=""
                        />
                      </g>
                    </svg>
                  </button>
                </div>
                <div class="col-span-2 space-y-2 p-3 lg:col-span-1 lg:space-y-4 lg:px-6 lg:py-10">
                  <h3 class="line-clamp-2 sm:text-[18px]">
                    <div>{{ item.title }}</div>
                    <div class="text-transparent">.</div>
                  </h3>
                  <span
                    class="inline-block rounded-full border border-primary-1 px-1 text-xs text-primary-1 sm:px-2 sm:py-1 sm:text-base"
                    >{{ categoryKeys[item.categoryKey].name }}</span
                  >
                  <p>{{ priceFormat(item.achievedMoney) }}</p>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </section>
      <section class="py-10 sm:pb-40 sm:pt-20">
        <h2 class="container text-center text-3xl sm:text-4xl">信任承諾</h2>
        <p class="container my-6 text-center sm:my-10">
          所有提案經過嚴格的審核流程，以確保提案的合法性和真實性。
        </p>
        <ul class="container grid grid-cols-2 gap-6 text-center sm:grid-cols-6">
          <li>
            <img class="mx-auto mb-6 block" src="~/assets/images/index/trust/1.png" alt="" />
            <p>個人資料保護</p>
          </li>
          <li>
            <img class="mx-auto mb-6 block" src="~/assets/images/index/trust/2.png" alt="" />
            <p>多元募資項目</p>
          </li>
          <li>
            <img class="mx-auto mb-6 block" src="~/assets/images/index/trust/3.png" alt="" />
            <p>即時專案追蹤</p>
          </li>
          <li>
            <img class="mx-auto mb-6 block" src="~/assets/images/index/trust/4.png" alt="" />
            <p>精準搜尋功能</p>
          </li>
          <li>
            <img class="mx-auto mb-6 block" src="~/assets/images/index/trust/5.png" alt="" />
            <p>安心支持流程</p>
          </li>
          <li>
            <img class="mx-auto mb-6 block" src="~/assets/images/index/trust/6.png" alt="" />
            <p>精準風險評估</p>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media (width >= 1024px) {
  .bg-group-1 {
    background-image: url('~/assets/images/index/bg/bg-sketch.png'),
      url('~/assets/images/index/bg/bg-category.png'), url('~/assets/images/index/bg/bg-circle.png');
    background-position:
      left 60px bottom 72px,
      right bottom,
      right top 80px;
    background-size: auto, contain, auto;
  }
}

@media (width >= 640px) {
  .bg-group-2 {
    background-image: url('~/assets/images/index/bg/bg-success.png'),
      url('~/assets/images/index/bg/bg-arc.png'), url('~/assets/images/index/bg/bg-heart.png');
    background-position:
      center top,
      left bottom,
      right 140px bottom 384px;
    background-size: contain, auto, auto;
  }
}
.bg-results {
  background-image: linear-gradient(#4d3b2fcc, #4d3b2fcc),
    url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}
.banner-swiper-button-prev {
  @apply absolute right-full top-1/2 hidden h-[54px] w-[54px] items-center justify-center rounded-full bg-secondary-5 fill-primary-1 hover:fill-secondary-1 lg:flex;
}
.banner-swiper-button-next {
  @apply absolute left-full top-1/2 hidden h-[54px] w-[54px] items-center justify-center rounded-full bg-secondary-5 fill-primary-1 hover:fill-secondary-1 lg:flex;
}
.hot-swiper-button-prev {
  @apply absolute right-full top-1/2 hidden h-[54px] w-[54px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary-5 fill-primary-1 hover:fill-secondary-1 lg:flex;
}
.hot-swiper-button-next {
  @apply absolute left-full top-1/2 hidden h-[54px] w-[54px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-secondary-5 fill-primary-1 hover:fill-secondary-1 lg:flex;
}
#hot-swiper {
  padding-bottom: 48px !important;
  :deep(.swiper-pagination-bullet-active) {
    @apply bg-primary-1;
  }
}
#banner-swiper {
  :deep(.swiper-pagination-bullet-active) {
    @apply bg-primary-1;
  }
}
</style>
