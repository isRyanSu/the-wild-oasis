import supabase from '@/lib/supabase'

async function checkin(bookingId: number) {
  // 登记入住
  const { error: checkinError } = await supabase
    .from('Bookings')
    .update({ status: 'checked-in', isPaid: true })
    .eq('id', bookingId)
    .select()
    .single()

  // 如果登记入住时出现错误
  if (checkinError) {
    // 输出错误信息
    console.error('[CheckinError]: ', checkinError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to check in. Please check your network connection or try again later.',
    )
  }

  return bookingId
}

export default checkin
