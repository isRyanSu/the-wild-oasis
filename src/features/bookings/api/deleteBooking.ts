import supabase from '@/lib/supabase'

async function deleteBooking(bookingId: number) {
  // 删除 Booking
  const { error: deleteBookingError } = await supabase
    .from('Bookings')
    .delete()
    .eq('id', bookingId)

  // 如果删除 Booking 时出现错误
  if (deleteBookingError) {
    // 输出错误信息
    console.error('[DeleteBookingError]: ', deleteBookingError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to delete booking. Please check your network connection or try again later.',
    )
  }

  return null
}

export default deleteBooking
