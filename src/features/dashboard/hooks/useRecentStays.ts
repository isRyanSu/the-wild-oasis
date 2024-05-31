import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'

import getAllStaysAfterDate from '@/features/bookings/api/getAllStaysAfterDate'

function useRecentStays() {
  const [searchParams] = useSearchParams()

  const numDays = !searchParams.get('last')
    ? 7
    : Number(searchParams.get('last'))
  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isPending: isLoadingRecentStays, data: recentStays } = useQuery({
    queryFn: () => getAllStaysAfterDate(queryDate),
    queryKey: ['RecentStays', `last-${numDays}`],
  })

  const confirmedRecentStays = recentStays?.filter(
    (recentStay) =>
      recentStay.status === 'checked-in' || recentStay.status === 'checked-out',
  )

  return { numDays, isLoadingRecentStays, recentStays, confirmedRecentStays }
}

export default useRecentStays
