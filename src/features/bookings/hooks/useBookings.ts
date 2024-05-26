import { useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import getAllBookings from '@/features/bookings/api/getAllBookings'

import { PAGE_SIZE } from '@/utils/constants'

function useBookings() {
  const [searchParams] = useSearchParams()
  const queryClient = useQueryClient()

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
    : Number(searchParams.get('page')) //记录当前页数

  const {
    isPending: isLoadingAllBookings,
    data: { allBookings, numBookings } = { allBookings: [], numBookings: 0 },
    error: getAllBookingsError,
  } = useQuery({
    queryKey: ['Bookings', filter, sorter, page], // 以非常优雅的方式来触发重新验证（如果 filter 或 sorter 发生变化）
    queryFn: () => getAllBookings({ filter, sorter, page }),
  })

  // PRE-FETCHING
  const pageCount: number = Math.ceil((numBookings || 0) / PAGE_SIZE) // 记录总页数

  // 如果当前页不是最后一页，则预加载下一页
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['Bookings', filter, sorter, page + 1],
      queryFn: () => getAllBookings({ filter, sorter, page: page + 1 }),
    })
  }

  // 如果当前页不是第一页，则预加载上一页
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['Bookings', filter, sorter, page - 1],
      queryFn: () => getAllBookings({ filter, sorter, page: page - 1 }),
    })

  return { isLoadingAllBookings, allBookings, numBookings, getAllBookingsError }
}

export default useBookings
