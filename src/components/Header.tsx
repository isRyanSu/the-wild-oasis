import styled from 'styled-components'

import UserAvatar from '@/features/authentication/components/UserAvatar'
import HeaderMenu from '@/components/HeaderMenu'

const StyledHeader = styled.header`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  padding: 1.2rem 4.8rem;
  background-color: white;
  border-bottom: 1px solid var(--color-accent-100);
`

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  )
}

export default Header
