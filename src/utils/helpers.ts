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

/**
 * 获取今天的日期字符串，格式化为 ISO 日期字符串。
 * 可选参数 `end` 用于指定是否获取当天的结束时间。
 *
 * @param {Object} options - 配置项
 * @param {boolean} options.end - 是否获取当天的结束时间，默认为开始时间
 * @returns {string} - 格式化的 ISO 日期字符串
 */
export function getToday(options: { end?: boolean } = {}): string {
  const today = new Date()

  // 设置为一天的开始或结束时间
  if (options.end) {
    today.setUTCHours(23, 59, 59, 999) // 当天的最后一秒
  } else {
    today.setUTCHours(0, 0, 0, 0) // 当天的开始时间
  }

  return today.toISOString()
}
