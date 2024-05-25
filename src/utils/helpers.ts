import { formatDistance, parseISO, differenceInDays } from 'date-fns'

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

// 格式化时间距离函数，接受一个日期字符串并返回一个格式化的时间差距字符串
export function formatDistanceFromNow(dateStr: string): string {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In')
}

// 计算两个日期之间的天数差，接受两个日期参数，并返回它们之间的天数差
export function subtractDates(
  date1: Date | string,
  date2: Date | string,
): number {
  return differenceInDays(parseISO(String(date1)), parseISO(String(date2)))
}
