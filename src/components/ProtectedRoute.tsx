import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import useUser from '@/features/authentication/hooks/useUser'

import Spinner from '@/components/Spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--color-accent-50);
`

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()

  // 1. Load the authenticated user
  const { isLoadingUser, isAuthenticated } = useUser()

  // 2. If there is NO authenticated user, redirect to the login page
  useEffect(() => {
    if (!isLoadingUser && !isAuthenticated) navigate('/login')
  }, [isLoadingUser, isAuthenticated, navigate])

  // 3. While loading, show a spinner
  if (isLoadingUser) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )
  }

  // 4. If there is a user, render the app
  if (isAuthenticated) return children
}

export default ProtectedRoute
