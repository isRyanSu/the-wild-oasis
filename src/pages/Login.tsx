import styled from 'styled-components'

import Logo from '@/components/Logo'
import Heading from '@/components/Heading'
import LoginForm from '@/features/authentication/components/LoginForm'

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 48rem;
  gap: 3.2rem;
  place-content: center center;
  min-height: 100vh;
  background-color: var(--color-accent-50);
`

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h3">Log in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  )
}

export default Login
