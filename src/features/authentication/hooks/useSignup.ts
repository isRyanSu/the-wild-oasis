import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import signupApi from '@/features/authentication/api/signup'

function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('User successfully created!')
    },
  })

  return { signup, isSigningUp }
}

export default useSignup
