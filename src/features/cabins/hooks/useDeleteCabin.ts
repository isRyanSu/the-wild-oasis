import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import deleteCabinApi from '@/features/cabins/api/deleteCabin'

function useDeleteCabin() {
  const queryClient = useQueryClient()

  const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      // 弹出删除成功信息
      toast.success('Cabin successfully deleted!')

      // 重新验证 Cabins
      queryClient.invalidateQueries({
        queryKey: ['Cabins'],
      })
    },
    onError: (err) => {
      // 弹出删除失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[DeleteCabinError]: ', err.message)
    },
  })

  return { deleteCabin, isDeleting }
}

export default useDeleteCabin
