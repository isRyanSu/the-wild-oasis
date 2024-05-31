import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'

import getAllBookingsAfterDate from '@/features/bookings/api/getAllBookingsAfterDate'

function useRecentBookings() {
  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isPending: isLoadingRecentBookings, data: recentBookings } = useQuery(
    {
      queryFn: () => getAllBookingsAfterDate(queryDate),
      queryKey: ['RecentBookings', `last-${numDays}`],
    },
  )

  return { isLoadingRecentBookings, recentBookings }
}

export default useRecentBookings
