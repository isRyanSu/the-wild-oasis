import { useSearchParams } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface FilterProps {
  filterField: string
  options: { value: string; label: string }[]
}

interface FilterButtonProps {
  $active: boolean
}

const StyledFilter = styled.div`
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`

const FilterButton = styled.button<FilterButtonProps>`
  padding: 0.44rem 0.8rem; /* To give the same height as select */
  font-size: 1.4rem;
  font-weight: 500;
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  ${(props) =>
    props.$active &&
    css`
      color: var(--color-brand-50);
      background-color: var(--color-brand-600);
    `}

  &:hover:not(:disabled) {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  }
`

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentFilter = searchParams.get(filterField) || options[0].value // 记录当前的 filter

  // 处理点击 filter
  function handleClick(value: string): void {
    searchParams.set(filterField, value)

    // 如果搜索参数中存在 "page" 参数，则将其重置为1，防止分页混乱
    if (searchParams.get('page')) {
      searchParams.set('page', '1')
    }

    setSearchParams(searchParams)
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          $active={option.value === currentFilter}
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
