import styled from 'styled-components'

interface SelectProps {
  type?: 'white' | 'default'
  value: string
  options: { value: string; label: string }[]
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

interface StyledSelectProps {
  type?: 'default' | 'white'
}

const StyledSelect = styled.select<StyledSelectProps>`
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  background-color: var(--color-accent-0);
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-accent-100)'
        : 'var(--color-accent-300)'};
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`

function Select({ value, options, onChange, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
