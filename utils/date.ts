import { useDayjs } from '#dayjs'
const dayjs = useDayjs()
export const dateFormat = (date: number) => {
  dayjs(date * 1000).format('YYYY/MM/DD')
}
