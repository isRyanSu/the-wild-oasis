import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
`

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  background-color: var(--color-accent-50);
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  max-width: 120rem;
  margin: 0 auto;
`

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
