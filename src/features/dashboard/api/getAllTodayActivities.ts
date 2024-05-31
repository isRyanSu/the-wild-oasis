import supabase from '@/lib/supabase'

import { getToday } from '@/utils/helpers'

import { type Booking } from '@/types/Booking'

/**
 * 获取今天所有活动，包括今天的入住和退房。
 *
 * @returns {Promise<(Booking & { Guests: { fullName: string; nationality: string; countryFlag: string } })[]>} - 今天的所有活动
 * @throws {Error} - 当获取数据失败时抛出错误
 */
async function getAllTodayActivities(): Promise<
  (Booking & {
    Guests: { fullName: string; nationality: string; countryFlag: string }
  })[]
> {
  const today = getToday()

  const { data: allTodayActivities, error: getAllTodayActivitiesError } =
    await supabase
      .from('Bookings')
      .select('*, Guests(fullName, nationality, countryFlag)')
      .or(
        `and(status.eq.unconfirmed, startDate.eq.${today}), and(status.eq.checked-in, endDate.eq.${today})`,
      )
      .order('createdAt')

  if (getAllTodayActivitiesError) {
    console.error('[GetAllTodayActivitiesError]:', getAllTodayActivitiesError)

    throw new Error(
      'Unable to load today activities. Please check your network connection or try again later.',
    )
  }

  return allTodayActivities as (Booking & {
    Guests: { fullName: string; nationality: string; countryFlag: string }
  })[]
}

export default getAllTodayActivities
