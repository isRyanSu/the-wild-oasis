import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import { NewCabinData } from '@/features/cabins/types/Cabin'

import editCabinApi from '@/features/cabins/api/editCabin'

function useEditCabin() {
  const queryClient = useQueryClient()

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({
      id,
      newCabinData,
      isImageChanged,
    }: {
      id: number
      newCabinData: NewCabinData
      isImageChanged: boolean
    }) => editCabinApi(id, newCabinData, isImageChanged),
    onSuccess: () => {
      // 弹出编辑成功信息
      toast.success('Cabin successfully edited!')

      // 重新验证 Cabins
      queryClient.invalidateQueries({ queryKey: ['Cabins'] })
    },
    onError: (err) => {
      // 弹出创建失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[EditCabinError]: ', err.message)
    },
  })

  return { editCabin, isEditing }
}

export default useEditCabin
