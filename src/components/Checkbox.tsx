import { ChangeEventHandler } from 'react'

import styled from 'styled-components'

interface CheckboxProps {
  id: string
  checked: boolean
  disabled?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  children: React.ReactNode
}

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;

  & input[type='checkbox'] {
    width: 2.4rem;
    height: 2.4rem;
    accent-color: var(--color-primary-600);
    outline-offset: 2px;
    transform-origin: 0;
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-primary-600);
  }

  & label {
    display: flex;
    flex: 1;
    gap: 0.8rem;
    align-items: center;
  }
`

function Checkbox({
  id,
  checked,
  disabled = false,
  onChange,
  children,
}: CheckboxProps) {
  return (
    <StyledCheckbox>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  )
}

export default Checkbox
