import supabase from '@/lib/supabase'

async function getBooking(bookingId: string) {
  // 获取 Booking
  const { data: booking, error: getBookingError } = await supabase
    .from('Bookings')
    .select('*, Cabins(*), Guests(*)')
    .eq('id', bookingId)
    .single()

  // 如果获取 Booking 时出现错误
  if (getBookingError) {
    // 输出错误信息
    console.error('[GetBookingError]: ', getBookingError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to load the booking. Please check your network connection or try again later.',
    )
  }

  return booking
}

export default getBooking
