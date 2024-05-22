import styled from 'styled-components'

import GlobalStyles from '@/styles/GlobalStyles'

const H1 = styled.h1`
  font-size: '30px';
  font-weight: 600;
`

const StyledApp = styled.main`
  padding: 20px;
`

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
      </StyledApp>
    </>
  )
}
