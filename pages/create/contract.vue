<script setup>
const loading = useLoadingStore()

const contractOneChecked = ref(false)
const contractTwoChecked = ref(false)
const isLogin = useIsLoginStore()
const checkPermission = async () => {
  if (!isLogin.isLogin) {
    await isLogin.checkLogin()
    if (!isLogin.isLogin) {
      await navigateTo('/login')
    }
  }
}

const platformUrl = ref('')

onMounted(() => {
  if (process.client) {
    platformUrl.value = location.origin
  }
  loading.isGlobalLoading = true
  nextTick(() => {
    checkPermission()
  })
  loading.isGlobalLoading = false
})
</script>
<template>
  <div>
    <CreateSteps :step="1" />
    <div class="bg-secondary-5 py-10">
      <h1 class="text-center text-2xl font-bold">提案者合約</h1>
      <p class="container">
        提案者為辦理群眾募資，向 本平台 租借 {{ platformUrl }}
        網域之群眾募資網頁空間，向第三人提出贊助要約，其雙方權利與義務等之相關事宜如下述，提案者完成提案、或勾選「同意提案契約書」時，即視為已閱讀、暸解、並同意以下所有約定條款的所有內容。
      </p>
    </div>
    <div class="container py-10">
      <h2 class="text-lg font-bold">群眾募資平台提案契約書</h2>
      <p>
        本平台所有者
        (以下簡稱甲方)為開發商及擁有者,而立合約書人(即提案者,以下簡稱乙方)擬利用此平台暨其相關服務(下稱本服務)辦理群眾募資,雙方同意由甲方以非專屬授權之方式授權予乙方使用,雙方特本於誠信及平等互惠原則訂定條款如后(下稱本合約),以資信守履行。
      </p>

      <ul class="space-y-4 py-6">
        <li>
          <h3>第一條：合作範圍</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>甲方同意以非專屬授權方式，授權予乙方使用本平台及相關服務，以辦理群眾募資活動。</li>
          </ol>
        </li>
        <li>
          <h3>第二條、提案人資格</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>
              乙方必須是具備完全行為能力之自然人、或合法登記之法人或團體。若乙方為未成年人,應由其法定代理人閱讀、暸解、並同意募資專案委託契約書(「本契約」)之所有約定內容及其修改後之內容,始得開始使用或繼續使用本服務。
            </li>
          </ol>
        </li>
        <li>
          <h3>第三條：提案者義務</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>乙方應詳實填寫提案資料，並保證所提供的資訊真實、準確。</li>
            <li>乙方應遵守本平台的相關規定，包括但不限於募資流程、風險提示等。</li>
            <li>乙方應配合本平台進行必要的宣傳推廣工作，以提高募資活動的曝光度和成功率。</li>
          </ol>
        </li>
        <li>
          <h3>第四條：甲方義務</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>甲方應提供必要的技術支援和服務，確保本平台的正常運作。</li>
            <li>甲方應按照合約條款，及時向乙方支付募資款項。</li>
            <li>甲方應保護乙方的個人資料及商業機密，並遵守相關的隱私政策。</li>
          </ol>
        </li>
        <li>
          <h3>第五條：費用</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>本合約下，乙方應支付相應的募資手續費用或服務費用。</li>
          </ol>
        </li>
        <li>
          <h3>第六條：風險提示</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>募資活動存在一定風險，乙方應自行承擔相應的投資風險。</li>
            <li>甲方不對募資活動的成功或失敗負責，亦不對乙方可能遭受的損失承擔責任。</li>
          </ol>
        </li>
        <li>
          <h3>第七條：保密條款</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>雙方同意在合作期間及終止後，對本合約中的商業機密及敏感資訊保密。</li>
          </ol>
        </li>
        <li>
          <h3>第八條：其他</h3>
          <ol class="list-inside list-decimal pl-4">
            <li>本合約一經簽署，即生效，雙方均應嚴格遵守合約條款。</li>
          </ol>
        </li>
      </ul>

      <div class="py-8">
        <div class="mb-3 flex gap-2">
          <input
            id="contract_1"
            v-model="contractOneChecked"
            type="checkbox"
            class="mr-2 h-5 w-5 shrink-0 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
          />
          <label for="contract_1" class="">同意提案契約書</label>
        </div>
        <div class="flex gap-2">
          <input
            id="contract_2"
            v-model="contractTwoChecked"
            type="checkbox"
            class="mr-2 h-5 w-5 shrink-0 appearance-none rounded-sm border-secondary-1 outline outline-2 outline-secondary-1 after:relative after:block after:h-5/6 after:w-6/12 after:translate-x-[5px] checked:bg-secondary-1 checked:after:relative checked:after:rotate-45 checked:after:border-b-4 checked:after:border-r-4 checked:after:border-white"
          />
          <label for="contract_2" class=""
            >提案人 (及法定代理人) 均已充分了解且同意合作條款之權利義務</label
          >
        </div>
      </div>
      <div class="text-center">
        <button
          class="rounded bg-secondary-1 px-3 py-2 text-white disabled:bg-neutral-300"
          :disabled="!contractOneChecked || !contractTwoChecked"
          @click="$router.push({ path: '/create/edit' })"
        >
          發起提案
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
h3 {
  @apply text-lg font-bold;
}
</style>
