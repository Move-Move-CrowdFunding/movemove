import dayjs from 'dayjs'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp
    .directive('dateformat', {
      mounted(el, binding) {
        const time = dayjs(binding.value * 1000).format('YYYY/MM/DD')
        el.innerText = time
      }
    })
    .directive('timeformat', {
      mounted(el, binding) {
        const time = dayjs(binding.value * 1000).format('YYYY/MM/DD HH:mm:ss')
        el.innerText = time
      }
    })
    .use(useDayjs)
  return {
    provide: {
      dateformat: (date: number) => dayjs(date * 1000).format('YYYY/MM/DD'),
      timeformat: (time: number) => dayjs(time * 1000).format('YYYY/MM/DD HH:mm:ss')
    }
  }
})
