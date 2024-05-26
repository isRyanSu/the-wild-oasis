import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import getAllBookings from '@/features/bookings/api/getAllBookings'

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

  // PAGINATION
  const page: number = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'))

  const {
    isPending: isLoadingAllBookings,
    data: { allBookings, numBookings } = { allBookings: [], numBookings: 0 },
    error: getAllBookingsError,
  } = useQuery({
    queryKey: ['Bookings', filter, sorter, page], // 以非常优雅的方式来触发重新验证（如果 filter 或 sorter 发生变化）
    queryFn: () => getAllBookings({ filter, sorter, page }),
  })

  return { isLoadingAllBookings, allBookings, numBookings, getAllBookingsError }
}

export default useBookings
