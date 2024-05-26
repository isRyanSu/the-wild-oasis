import styled from 'styled-components'

const ButtonText = styled.button`
  font-weight: 500;
  color: var(--color-primary-600);
  text-align: center;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  &:hover,
  &:active {
    color: var(--color-primary-700);
  }
`

export default ButtonText
