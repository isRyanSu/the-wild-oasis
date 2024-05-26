import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

import checkinApi from '@/features/check-in-out/api/checkin'

function useCheckin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate: checkin, isPending: isChecking } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number
      breakfast?: {
        hasBreakfast: boolean
        extrasPrice: number
        totalPrice: number
      }
    }) => checkinApi(bookingId, breakfast),
    onSuccess: (bookingId: number) => {
      // 弹出登记入住成功信息
      toast.success(`Booking #${bookingId} successfully checked!`)

      // 重新验证所以数据
      queryClient.invalidateQueries({ refetchType: 'all' })

      // 重定向至首页
      navigate('/')
    },
    onError: (err) => {
      // 弹出登记入住失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[CheckinError]: ', err.message)
    },
  })

  return { checkin, isChecking }
}

export default useCheckin
