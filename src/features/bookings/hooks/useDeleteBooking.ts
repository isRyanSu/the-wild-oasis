import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import deleteBookingApi from '@/features/bookings/api/deleteBooking'

function useDeleteBooking() {
  const queryClient = useQueryClient()

  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      // 弹出删除成功信息
      toast.success('Booking successfully deleted!')

      // 重新验证 Bookings
      queryClient.invalidateQueries({
        queryKey: ['Bookings'],
      })
    },
    onError: (err) => {
      // 弹出删除失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[DeleteBookingError]: ', err.message)
    },
  })

  return { deleteBooking, isDeleting }
}

export default useDeleteBooking
