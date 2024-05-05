<template>
  <div>
    <section>
      <!-- <Swiper>
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
      </Swiper> -->
    </section>
    <!-- bg-group -->
    <div class="bg-group-1 bg-right-bottom bg-no-repeat px-3">
      <section class="py-10 sm:pt-20">
        <div class="mb-6 flex h-[54px] items-center justify-between sm:mb-10">
          <h2 class="text-3xl sm:text-4xl">熱門提案</h2>
          <NuxtLink>查看更多</NuxtLink>
        </div>
        <div class="h-[490px]"></div>
        <div class="mt-6 h-2"></div>
      </section>
      <section class="container grid gap-6 py-40 sm:grid-cols-4">
        <h2 class="text-3xl sm:text-4xl">提案類別</h2>
        <div class="col-span-3">
          <ul class="grid grid-cols-2 gap-6 sm:grid-cols-3">
            <li
              class="flex items-center gap-3 rounded-2xl bg-white px-4 font-bold leading-normal sm:rounded-3xl sm:px-8 sm:text-2xl"
            >
              <img src="~/assets/images/index/category/mobile-1.png" alt="" class="sm:hidden" />
              <img
                src="~/assets/images/index/category/desktop-1.png"
                alt=""
                class="hidden sm:block"
              />
              <p>教育</p>
            </li>
            <li
              class="flex items-center gap-3 rounded-2xl bg-white px-4 font-bold leading-normal sm:rounded-3xl sm:px-8 sm:text-2xl"
            >
              <img src="~/assets/images/index/category/mobile-2.png" alt="" class="sm:hidden" />
              <img
                src="~/assets/images/index/category/desktop-2.png"
                alt=""
                class="hidden sm:block"
              />
              <p>弱勢救助</p>
            </li>
            <li
              class="flex items-center gap-3 rounded-2xl bg-white px-4 font-bold leading-normal sm:rounded-3xl sm:px-8 sm:text-2xl"
            >
              <img src="~/assets/images/index/category/mobile-3.png" alt="" class="sm:hidden" />
              <img
                src="~/assets/images/index/category/desktop-3.png"
                alt=""
                class="hidden sm:block"
              />
              <p>國際支援</p>
            </li>
            <li
              class="flex items-center gap-3 rounded-2xl bg-white px-4 font-bold leading-normal sm:rounded-3xl sm:px-8 sm:text-2xl"
            >
              <img src="~/assets/images/index/category/mobile-4.png" alt="" class="sm:hidden" />
              <img
                src="~/assets/images/index/category/desktop-4.png"
                alt=""
                class="hidden sm:block"
              />
              <p>兒少福利</p>
            </li>
            <li
              class="flex items-center gap-3 rounded-2xl bg-white px-4 font-bold leading-normal sm:rounded-3xl sm:px-8 sm:text-2xl"
            >
              <img src="~/assets/images/index/category/mobile-5.png" alt="" class="sm:hidden" />
              <img
                src="~/assets/images/index/category/desktop-5.png"
                alt=""
                class="hidden sm:block"
              />
              <p>長者</p>
            </li>
            <li
              class="flex items-center gap-3 rounded-2xl bg-white px-4 font-bold leading-normal sm:rounded-3xl sm:px-8 sm:text-2xl"
            >
              <img src="~/assets/images/index/category/mobile-6.png" alt="" class="sm:hidden" />
              <img
                src="~/assets/images/index/category/desktop-6.png"
                alt=""
                class="hidden sm:block"
              />
              <p>婦女</p>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <section class="bg-secondary-5">
      <h2>推薦提案</h2>
    </section>
    <section
      class="bg-[url('https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"
    >
      <!-- <h2>累積成果</h2> -->
      <div class="container text-center text-white">
        <ul class="grid sm:grid-cols-3">
          <li>
            <div>1,260</div>
            <p>累積專案</p>
          </li>
          <li>
            <div>257,245,082</div>
            <p>累積金額</p>
          </li>
          <li>
            <div>97,945,982</div>
            <p>累積贊助人數</p>
          </li>
        </ul>
        <p class="col-span-4 col-start-2">
          已經成功支持了超過1000個具有社會影響力的項目，這些項目涵蓋了教育、長者、婦女、國際支援、弱勢救助、兒少福利等各個領域。透過我們平台的支持，這些項目不僅獲得了必要的資金支持，更取得了廣泛的社會關注和支持。
        </p>
      </div>
    </section>

    <div class="bg-group-2 bg-top bg-no-repeat">
      <section class="container pb-10 pt-20 sm:pb-20 sm:pt-40">
        <div class="mb-6 flex h-[54px] items-center justify-between sm:mb-10">
          <h2 class="text-3xl sm:text-4xl">成功案例</h2>
          <NuxtLink>查看更多</NuxtLink>
        </div>
        <ul class="grid gap-6 sm:grid-cols-2 sm:gap-y-9">
          <li>
            <NuxtLink class="block h-[222px]"></NuxtLink>
          </li>
          <li>
            <NuxtLink class="block h-[222px]"></NuxtLink>
          </li>
          <li>
            <NuxtLink class="block h-[222px]"></NuxtLink>
          </li>
          <li>
            <NuxtLink class="block h-[222px]"></NuxtLink>
          </li>
        </ul>
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

<style scoped>
/* * {
  outline: 1px solid #0a0;
} */
.bg-group-1 {
  background-image: url('~/assets/images/index/bg/bg-category.png'),
    url('~/assets/images/index/bg/bg-circle.png');
  background-position:
    right bottom,
    right top 80px;
  background-size: contain, auto;
}
.bg-group-2 {
  background-image: url('~/assets/images/index/bg/bg-success.png'),
    url('~/assets/images/index/bg/bg-arc.png'), url('~/assets/images/index/bg/bg-heart.png');
  background-position:
    center top,
    left bottom,
    right 140px bottom 384px;
  background-size: contain, auto, auto;
}
</style>
