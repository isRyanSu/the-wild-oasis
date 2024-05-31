import supabase from '@/lib/supabase'

import { getToday } from '@/utils/helpers'

import { type Booking } from '@/types/Booking'

/**
 * 获取指定日期后创建的所有住宿记录。
 *
 * @param {string} date - 指定的起始日期（ISO 日期字符串）
 * @returns {Promise<Array<Booking & { Guest: { fullName: string } }>>} - 在指定日期后创建的所有住宿记录
 * @throws {Error} - 当获取数据失败时抛出错误
 */
async function getAllStaysAfterDate(
  date: string,
): Promise<(Booking & { Guest: { fullName: string } })[]> {
  const { data: allStaysAfterDate, error: getAllStaysAfterDateError } =
    await supabase
      .from('Bookings')
      .select('*, Guests(fullName)')
      .gte('startDate', date)
      .lte('startDate', getToday())

  if (getAllStaysAfterDateError) {
    console.error('[GetAllStaysAfterDateError]:', getAllStaysAfterDateError)

    throw new Error(
      'Unable to load stays after date. Please check your network connection or try again later.',
    )
  }

  return allStaysAfterDate as (Booking & { Guest: { fullName: string } })[]
}

export default getAllStaysAfterDate
