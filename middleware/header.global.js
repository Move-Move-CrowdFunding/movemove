export default defineNuxtRouteMiddleware((to) => {
  // 切換頁面時關閉選單
  const menuState = useHeaderStore()
  menuState.mobileMenuShow = false

  const searchKeyword = useHeaderStore()

  // 頁面時清空搜尋關鍵字
  if (to.path !== '/projects') {
    searchKeyword.searchKeyword = ''
  }
})
