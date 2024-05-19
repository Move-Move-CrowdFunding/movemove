import dayjs from 'dayjs'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .directive('dateformat', {
      mounted(el, binding) {
        const time = dayjs(binding.value).format('YYYY/MM/DD')
        el.innerText = time
      }
    })
    .directive('timeformat', {
      mounted(el, binding) {
        const time = dayjs(binding.value).format('YYYY/MM/DD HH:mm:ss')
        el.innerText = time
      }
    })
})
