import { useQuery } from '@tanstack/react-query'

import getUser from '@/features/authentication/api/getUser'

function useUser() {
  const { isPending: isLoadingUser, data: user } = useQuery({
    queryKey: ['User'],
    queryFn: getUser,
    staleTime: 5 * 1000, // 5 seconds
  })

  return {
    isLoadingUser,
    user,
    isAuthenticated: user?.role === 'authenticated',
  }
}

export default useUser
