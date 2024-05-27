import styled from 'styled-components'

import Heading from '@/components/Heading'
import Button from '@/components/Button'

import useMoveBack from '@/hooks/useMoveBack'

const StyledNotFound = styled.main`
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

  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & h1 {
    margin-bottom: 3.2rem;
  }
`

function NotFound() {
  const moveBack = useMoveBack()

  return (
    <StyledNotFound>
      <Box>
        <Heading as="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <Button $variation="primary" size="large" onClick={moveBack}>
          &larr; Go back
        </Button>
      </Box>
    </StyledNotFound>
  )
}

export default NotFound
