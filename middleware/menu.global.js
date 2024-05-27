export default defineNuxtRouteMiddleware(() => {
  // 切換頁面時關閉選單
  const menuState = useMenuStore()
  menuState.mobileMenuShow = false
})
