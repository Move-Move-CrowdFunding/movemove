<script setup>
import whyIcon from '~/assets/images/projects/whyIcon.vue'
import whyImage1 from '~/assets/images/projects/why1.png'
import whyImage2 from '~/assets/images/projects/why2.png'
import whyImage3 from '~/assets/images/projects/why3.png'
import whyImage4 from '~/assets/images/projects/why4.png'
import whyImage5 from '~/assets/images/projects/why5.png'
import whyImage6 from '~/assets/images/projects/why6.png'

const loading = useLoadingStore()

onMounted(() => {
  setTimeout(() => {
    loading.isGlobalLoading = false
  }, 300)
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-[url('~/assets/images/projects/banner.png')] bg-cover bg-no-repeat py-20"
  >
    <h2 class="mb-2 text-center text-3xl leading-normal text-white lg:text-7xl">
      群眾的力量， 讓世界更美好
    </h2>
    <NuxtLink to="/create/contract" class="rounded-lg bg-[#4767A2] px-5 py-2 text-white"
      >發起提案</NuxtLink
    >
  </div>
  <section class="bg-top-center bg-no-repeat lg:bg-[url('~/assets/images/projects/whyBG.png')]">
    <div class="container flex flex-col items-center justify-center pt-20">
      <h3 class="mb-10 text-4xl">為什麼需要群眾集資？</h3>
      <div class="flex flex-col items-center justify-center gap-6 lg:w-8/12">
        <div class="flex flex-col items-center justify-center gap-6 lg:flex-row">
          <div class="lg:w-1/2">
            <img class="h-full w-full" :src="whyImage1" />
          </div>
          <div class="flex flex-col items-center lg:w-1/2 lg:items-start">
            <div class="flex justify-center lg:justify-start">
              <whyIcon />
            </div>
            <h4 class="my-4 text-2xl">共同實現夢想</h4>
            <p>
              通過群眾集資,我們可以讓更多人參與到實現公益目標的過程中，每個人的小額捐款都能夠匯聚成一股強大的力量,共同實現我們的夢想。
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center gap-6 lg:flex-row-reverse">
          <div class="lg:w-1/2">
            <img class="h-full w-full" :src="whyImage2" />
          </div>
          <div class="flex flex-col items-center lg:w-1/2 lg:items-start">
            <div class="flex justify-center lg:justify-start">
              <whyIcon />
            </div>
            <h4 class="my-4 text-2xl">建立共同體和凝聚力</h4>
            <p>
              通過群眾集資,我們不僅建立了一個支持公益事業的平台,更建立了一個共同體,彼此之間凝聚力強大，通過共同努力和凝聚力,我們才能實現更加偉大的目標和夢想。
            </p>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center gap-6 lg:flex-row">
          <div class="lg:w-1/2">
            <img class="h-full w-full" :src="whyImage3" />
          </div>
          <div class="flex flex-col items-center lg:w-1/2 lg:items-start">
            <div class="flex justify-center lg:justify-start">
              <whyIcon />
            </div>
            <h4 class="my-4 text-2xl">民主參與影響</h4>
            <p>
              群眾集資讓每個人都有機會參與到公益事業中,無論是捐款還是宣傳,每個人的參與都能夠產生實質的影響。
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="bg-cover bg-center pt-40 lg:bg-[url('~/assets/images/projects/whyBG2.png')]">
    <div class="container">
      <h3 class="mb-10 text-center text-4xl">為什麼選擇我們提案上架？</h3>
      <div class="flex flex-col gap-6 pb-28 lg:flex-row">
        <div class="flex h-full items-center justify-center lg:w-4/12">
          <div class="flex flex-col items-center justify-center">
            <div class="flex h-[200px] items-center justify-center">
              <img :src="whyImage4" />
            </div>
            <div class="flex flex-col items-center">
              <h4 class="my-4 text-2xl">使命與價值觀</h4>
              <p>
                有清晰的使命和價值觀，並且這些價值觀與潛在捐助者和項目發起者的價值觀相符，這種共鳴能夠吸引更多人加入你的社區，支持你的項目。
              </p>
            </div>
          </div>
        </div>
        <div class="flex h-full items-center justify-center lg:w-4/12">
          <div class="flex flex-col items-center justify-center">
            <div class="flex h-[200px] flex-shrink-0 items-center justify-center">
              <img :src="whyImage5" />
            </div>

            <div class="flex flex-col items-center">
              <h4 class="my-4 text-2xl">低成本</h4>
              <p>
                較低的手續費或是無手續費，這意味著更多的捐款能夠直接用於支持項目，而不是支付手續費。
              </p>
            </div>
          </div>
        </div>
        <div class="flex h-full items-center justify-center lg:w-4/12">
          <div class="flex flex-col items-center justify-center">
            <div class="flex h-[200px] items-center justify-center">
              <img :src="whyImage6" />
            </div>
            <div class="flex flex-col items-center">
              <h4 class="my-4 text-2xl">專業支持</h4>
              <p>
                提供專業的支持和指導，幫助項目發起者更好地籌款和管理他們的項目。這種支持能夠提高項目的成功率，增加捐款額。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section
    class="bg-[position:left_bottom,_right_15px_top_40px] bg-no-repeat py-20 lg:bg-[url('~/assets/images/projects/whyBG3.png'),_url('~/assets/images/projects/whyBG4.png')]"
  >
    <div class="container relative">
      <div
        class="relative mb-4 flex flex-col justify-between rounded-[32px] border-2 border-[#D9D9D9] bg-[#ffffff] lg:flex-row"
      >
        <div
          class="rounded-[32px] border-b-2 border-b-[#D9D9D9] bg-[#E4F6FF] p-8 lg:w-7/12 lg:border-r-2 lg:border-r-[#D9D9D9]"
        >
          <p class="mb-4 text-2xl">請確認以下事項，確保您符合提案人的身份</p>
          <ul class="list-decimal">
            <li class="mb-4">
              您已滿 18
              歲是具備完全行為能力的自然人，或是合法登記的法人或團體。若提案者為未成年人，應由其法定代理人閱讀、暸解，才可進行提案流程。
            </li>
            <li>
              您是具有台灣居住地址、銀行帳戶及國籍的自然人或法人。目前本平台只限定台灣用戶，國外單位提案必須有台灣分公司或代理人，並且由台灣代理人提交專案。
            </li>
          </ul>
        </div>
        <div class="rounded-[32px] p-8 lg:w-5/12">
          <p class="mb-4 text-2xl">平台收費方式</p>
          <p>
            當提案團隊的專案時間結束或募資金額到達目標時，本平台將收取專案總金額的 5%
            作為平台服務費。
          </p>
        </div>
        <!-- <img
          class="absolute end-0 top-0 -z-10 hidden -translate-y-1/2 translate-x-1/2 lg:inline"
          :src="whyBG4"
          alt="heart"
        /> -->
      </div>
      <div class="flex items-center justify-center">
        <NuxtLink to="/create/contract" class="rounded-lg bg-[#4767A2] px-10 py-4 text-white"
          >發起提案</NuxtLink
        >
      </div>
    </div>
  </section>
</template>
