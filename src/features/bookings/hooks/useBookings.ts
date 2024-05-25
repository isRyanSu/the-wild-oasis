import { useQuery } from '@tanstack/react-query'

import getAllBookings from '@/features/bookings/api/getAllBookings'

function useBookings() {
  const {
    isPending: isLoadingAllBookings,
    data: allBookings,
    error: getAllBookingsError,
  } = useQuery({
    queryKey: ['Bookings'],
    queryFn: getAllBookings,
  })

  return { isLoadingAllBookings, allBookings, getAllBookingsError }
}

export default useBookings
