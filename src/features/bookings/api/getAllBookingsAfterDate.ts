import supabase from '@/lib/supabase'

import { getToday } from '@/utils/helpers'

/**
 * 获取在指定日期之后创建的所有预约记录。
 *
 * @param {string} date - 指定的日期字符串，格式为 ISO 日期字符串
 * @returns {Promise<Array<{ extrasPrice: number; totalPrice: number; createdAt: string }>>} - 在指定日期之后创建的所有预约记录
 * @throws {Error} - 当获取数据失败时抛出错误
 */
async function getAllBookingsAfterDate(
  date: string,
): Promise<{ extrasPrice: number; totalPrice: number; createdAt: string }[]> {
  const { data: allBookingsAfterDate, error: getAllBookingsAfterDateError } =
    await supabase
      .from('Bookings')
      .select('extrasPrice, totalPrice, createdAt')
      .gte('createdAt', date)
      .lte('createdAt', getToday({ end: true }))

  if (getAllBookingsAfterDateError) {
    console.error(
      '[GetAllBookingsAfterDateError]:',
      getAllBookingsAfterDateError,
    )

    throw new Error(
      'Unable to load bookings after date. Please check your network connection or try again later.',
    )
  }

  return allBookingsAfterDate
}

export default getAllBookingsAfterDate
