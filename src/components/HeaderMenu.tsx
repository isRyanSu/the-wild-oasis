import { useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'

import styled from 'styled-components'

import Logout from '@/features/authentication/components/Logout'

import ButtonIcon from '@/components/ButtonIcon'
import DarkModeToggle from '@/components/DarkModeToggle'

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`

function HeaderMenu() {
  const navigate = useNavigate()

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate('/account')}>
          <User />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
