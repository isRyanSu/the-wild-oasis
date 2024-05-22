import styled from 'styled-components'

const LoginLayout = styled.main`
  display: grid;
  grid-template-columns: 48rem;
  gap: 3.2rem;
  place-content: center center;
  min-height: 100vh;
  background-color: var(--color-accent-50);
`

function Login() {
  return <LoginLayout>Login</LoginLayout>
}

export default Login
