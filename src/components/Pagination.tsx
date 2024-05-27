import { useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import styled from 'styled-components'

import { PAGE_SIZE } from '@/utils/constants'

interface PaginationProps {
  count: number
}

interface PaginationButtonProps {
  active?: boolean
}

const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const P = styled.p`
  margin-left: 0.8rem;
  font-size: 1.4rem;

  & span {
    font-weight: 600;
  }
`

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`

const PaginationButton = styled.button<PaginationButtonProps>`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => (props.active ? 'var(--color-brand-50)' : 'inherit')};
  background-color: ${(props) =>
    props.active ? 'var(--color-brand-600)' : 'var(--color-grey-50)'};
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  &:hover:not(:disabled) {
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
  }
`

function Pagination({ count }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage: number = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page')) // 记录当前页数

  const pageCount: number = Math.ceil(count / PAGE_SIZE) // 记录总页数

  // 上一页
  function previousPage() {
    const previous: string = String(
      currentPage === 1 ? currentPage : currentPage - 1,
    ) // 计算上一页的页数

    searchParams.set('page', previous)

    setSearchParams(searchParams)
  }

  // 下一页
  function nextPage() {
    const next: string = String(
      currentPage === pageCount ? currentPage : currentPage + 1,
    ) // 计算下一页的页数

    searchParams.set('page', next)

    setSearchParams(searchParams)
  }

  // 如果待显示的数据量小于或等于每页显示的数据量，则不需要进行分页，也就不需要展示分页栏
  if (count <= PAGE_SIZE) {
    return null
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{' '}
        of <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton disabled={currentPage === 1} onClick={previousPage}>
          <ArrowLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={nextPage}
        >
          <span>Next</span> <ArrowRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  )
}

export default Pagination
