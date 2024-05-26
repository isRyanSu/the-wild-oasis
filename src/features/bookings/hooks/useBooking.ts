import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import getBooking from '@/features/bookings/api/getBooking'

function useBooking() {
  const { bookingId } = useParams()

  const {
    isPending: isLoadingBooking,
    data: booking,
    error: getBookingError,
  } = useQuery({
    queryKey: ['Booking', bookingId],
    queryFn: () => getBooking(bookingId!),
    retry: false, // 默认会尝试获取 3 次，以防止获取失败，在这里我们并不需要尝试获取多次
  })

  return { isLoadingBooking, booking, getBookingError }
}

export default useBooking
