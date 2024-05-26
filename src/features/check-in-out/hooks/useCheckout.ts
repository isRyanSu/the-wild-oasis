import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import checkoutApi from '@/features/check-in-out/api/checkout'

function useCheckout() {
  const queryClient = useQueryClient()

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId: number) => checkoutApi(bookingId),
    onSuccess: (bookingId: number) => {
      // 弹出登记退房成功信息
      toast.success(`Booking #${bookingId} successfully checked out!`)

      // 重新验证所有数据
      queryClient.invalidateQueries({ refetchType: 'all' })
    },
    onError: (err) => {
      // 弹出登记退房失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[CheckoutError]: ', err.message)
    },
  })

  return { checkout, isCheckingOut }
}

export default useCheckout
