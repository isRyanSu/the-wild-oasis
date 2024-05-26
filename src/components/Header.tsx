import styled from 'styled-components'

import Logout from '@/features/authentication/components/Logout'

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: white;
  border-bottom: 1px solid var(--color-accent-100);
`

function Header() {
  return (
    <StyledHeader>
      <Logout />
    </StyledHeader>
  )
}

export default Header
