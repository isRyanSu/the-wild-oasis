import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import createCabinApi from '@/features/cabins/api/createCabin'

function useCreateCabin() {
  const queryClient = useQueryClient()

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      // 弹出创建成功信息
      toast.success('Cabin successfully created!')

      // 重新验证 Cabins
      queryClient.invalidateQueries({ queryKey: ['Cabins'] })
    },
    onError: (err) => {
      // 弹出创建失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[CreateCabinError]: ', err.message)
    },
  })

  return { createCabin, isCreating }
}

export default useCreateCabin
