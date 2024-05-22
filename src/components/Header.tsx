import styled from 'styled-components'

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: white;
  border-bottom: 1px solid var(--color-accent-100);
`

function Header() {
  return <StyledHeader>HEADER</StyledHeader>
}

export default Header
