import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import toast from 'react-hot-toast'

import loginApi from '@/features/authentication/api/login'

function useLogin() {
  const navigate = useNavigate()
  const { mutate: login, isPending: isLogining } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: () => navigate('/dashboard'), // 跳转至首页
    onError: (err) => {
      // 弹出登陆失败信息
      toast.error(err.message)
    },
  })

  return { login, isLogining }
}

export default useLogin
