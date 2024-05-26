import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import logoutApi from '@/features/authentication/api/logout'

function useLogout() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: logout, isPending: isLogingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      // 移除所有缓存
      queryClient.removeQueries()

      // 重定向至登陆页
      navigate('/login', { replace: true })
    },
  })

  return { logout, isLogingOut }
}

export default useLogout
