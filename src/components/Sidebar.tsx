import styled from 'styled-components'

import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar'
import Uploader from '@/components/Uploader'

const StyledSidebar = styled.aside`
  display: flex;
  flex-direction: column;
  grid-row: 1 / -1;
  gap: 3.2rem;
  padding: 3.2rem 2.4rem;
  background-color: white;
  border-right: 1px solid var(--color-accent-100);
`

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <Navbar />
      <Uploader />
    </StyledSidebar>
  )
}

export default Sidebar
