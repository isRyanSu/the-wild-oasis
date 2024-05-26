import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import loginApi from '@/features/authentication/api/login'

function useLogin() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { mutate: login, isPending: isLogining } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (loginData) => {
      // 登录成功后，直接更新缓存中 'User' querykey 对应的用户数据
      queryClient.setQueryData(['User'], loginData.user)

      // 跳转至首页
      navigate('/')
    },
    onError: (err) => {
      // 弹出登陆失败信息
      toast.error(err.message)
    },
  })

  return { login, isLogining }
}

export default useLogin
