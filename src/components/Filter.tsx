import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface FilterProps {
  filterField: string
  options: { value: string; label: string }[]
}

interface FilterButtonProps {
  active: boolean
}

const StyledFilter = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  background-color: white;
  border: 1px solid var(--color-accent-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.44rem 0.8rem; /* To give the same height as select */
  font-size: 1.4rem;
  font-weight: 500;
  background-color: white;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  ${(props) =>
    props.active &&
    css`
      color: var(--color-primary-50);
      background-color: var(--color-primary-600);
    `}

  &:hover:not(:disabled) {
    color: var(--color-primary-50);
    background-color: var(--color-primary-600);
  }
`

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentFilter = searchParams.get(filterField) || options[0].value // 记录当前的 filter

  // 处理点击 filter
  function handleClick(value: string): void {
    searchParams.set(filterField, value)

    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  )
}

export default Filter
