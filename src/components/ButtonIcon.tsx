import styled from 'styled-components'

const ButtonIcon = styled.button`
  padding: 0.6rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-accent-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-primary-600);
  }
`

export default ButtonIcon
