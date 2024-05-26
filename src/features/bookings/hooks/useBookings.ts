import { useQuery } from '@tanstack/react-query'

import getAllBookings from '@/features/bookings/api/getAllBookings'
import { useSearchParams } from 'react-router-dom'

function useBookings() {
  const [searchParams] = useSearchParams()

  // FILTER
  const filterValue = searchParams.get('status')
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue }

  // SORTER
  const sorterValue = searchParams.get('sort') || 'startDate-desc'
  const [field, direction] = sorterValue.split('-')
  const sorter = { field, direction }

  const {
    isPending: isLoadingAllBookings,
    data: allBookings,
    error: getAllBookingsError,
  } = useQuery({
    queryKey: ['Bookings', filter, sorter], // 以非常优雅的方式来触发重新验证（如果 filter 或 sorter 发生变化）
    queryFn: () => getAllBookings({ filter, sorter }),
  })

  return { isLoadingAllBookings, allBookings, getAllBookingsError }
}

export default useBookings
