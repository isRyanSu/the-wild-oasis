import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import updateSettingApi from '@/features/settings/api/updateSettings'

function useUpdateSetting() {
  const queryClient = useQueryClient()

  const { mutate: updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      // 弹出更新成功信息
      toast.success('Setting successfully updated!')

      // 重新验证 Settings
      queryClient.invalidateQueries({ queryKey: ['Settings'] })
    },
    onError: (err) => {
      // 弹出更新失败信息
      toast.error('Oops! Something went wrong!')

      // 输出错误信息
      console.log('[UpdateSettingError]: ', err.message)
    },
  })

  return { updateSetting, isUpdating }
}

export default useUpdateSetting
