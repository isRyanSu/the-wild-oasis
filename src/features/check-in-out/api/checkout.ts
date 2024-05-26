import supabase from '@/lib/supabase'

async function checkout(bookingId: number) {
  // 登记退房
  const { error: checkoutError } = await supabase
    .from('Bookings')
    .update({ status: 'checked-out' })
    .eq('id', bookingId)
    .select()
    .single()

  // 如果登记退房时出现错误
  if (checkoutError) {
    // 输出错误信息
    console.error('[CheckoutError]: ', checkoutError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to check out. Please check your network connection or try again later.',
    )
  }

  return bookingId
}

export default checkout
