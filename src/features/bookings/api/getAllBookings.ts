import supabase from '@/lib/supabase'

async function getAllBookings() {
  // 获取所有 Booking
  const { data: allBookings, error: getAllBookingsError } = await supabase
    .from('Bookings')
    .select('*, Cabins(name), Guests(fullName, email)')

  // 如果获取所有 Booking 时出现错误
  if (getAllBookingsError) {
    // 输出错误信息
    console.error('[GetAllBookingsError]: ', getAllBookingsError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to load bookings. Please check your network connection or try again later.',
    )
  }

  return allBookings
}

export default getAllBookings
