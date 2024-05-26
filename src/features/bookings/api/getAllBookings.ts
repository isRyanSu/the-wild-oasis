import supabase from '@/lib/supabase'

import { PAGE_SIZE } from '@/utils/constants'

async function getAllBookings({
  filter,
  sorter,
  page,
}: {
  filter: { field: string; value: string } | null
  sorter: { field: string; direction: string } | null
  page: number
}) {
  // 初始化为获取所有 Booking
  let query = supabase
    .from('Bookings')
    .select('*, Cabins(name), Guests(fullName, email)', { count: 'exact' })

  // FILTER
  if (filter) {
    query = query.eq(filter.field, filter.value)
  }

  // SORTER
  if (sorter) {
    query = query.order(sorter.field, { ascending: sorter.direction === 'asc' })
  }

  // PAGINATION
  if (page) {
    const from: number = (page - 1) * PAGE_SIZE
    const to: number = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  // 开始获取
  const {
    data: allBookings,
    count: numBookings,
    error: getAllBookingsError,
  } = await query

  // 如果获取所有 Booking 时出现错误
  if (getAllBookingsError) {
    // 输出错误信息
    console.error('[GetAllBookingsError]: ', getAllBookingsError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to load bookings. Please check your network connection or try again later.',
    )
  }

  return { allBookings, numBookings }
}

export default getAllBookings
