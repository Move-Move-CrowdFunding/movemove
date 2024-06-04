import dayjs from 'dayjs'
export const dateFormat = (date: number, format: string = 'YYYY-MM-DD') =>
  dayjs.unix(date).format(format)

export const timeFormat = (time: number, format: string = 'YYYY/MM/DD HH:mm:ss') =>
  dayjs.unix(time).format(format)
// 10 天後
export const tenDaysLater = dayjs(dayjs()).add(11, 'day').format('YYYY-MM-DD')

// 10 天 + 7 天
export const sevenDaysAfterTenDays = dayjs(tenDaysLater).add(7, 'day').format('YYYY-MM-DD')
