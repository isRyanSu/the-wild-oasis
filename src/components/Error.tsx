import styled from 'styled-components'

import GlobalStyles from '@/styles/GlobalStyles'

import Heading from '@/components/Heading'
import Button from '@/components/Button'

interface ErrorProps {
  error: Error
  resetErrorBoundary: (...args: unknown[]) => void
}

const StyledError = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 4.8rem;
  background-color: var(--color-grey-50);
`

const Box = styled.div`
  flex: 0 1 96rem;
  padding: 4.8rem;
  text-align: center;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    margin-bottom: 3.2rem;
    font-family: Sono, sans-serif;
    color: var(--color-grey-500);
  }
`

function Error({ error, resetErrorBoundary }: ErrorProps) {
  return (
    <>
      <GlobalStyles />
      <StyledError>
        <Box>
          <Heading as="h1">Something went wrong! 🧐</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledError>
    </>
  )
}

export default Error
