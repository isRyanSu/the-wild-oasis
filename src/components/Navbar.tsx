import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Home, Calendar, Tent, User, Settings } from 'lucide-react'

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    padding: 1.2rem 2.4rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--color-accent-600);
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-accent-800);
    background-color: var(--color-accent-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-accent-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-primary-600);
  }
`

function Navbar() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <Home />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings">
            <Calendar />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins">
            <Tent />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <User />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings">
            <Settings />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  )
}

export default Navbar
