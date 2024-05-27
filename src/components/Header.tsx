import styled from 'styled-components'

import UserAvatar from '@/features/authentication/components/UserAvatar'
import HeaderMenu from '@/components/HeaderMenu'

const StyledHeader = styled.header`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
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
