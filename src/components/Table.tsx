import { createContext, useContext } from 'react'

import styled from 'styled-components'

interface TableContextType {
  columns: string
}

const TableContext = createContext<TableContextType | undefined>(undefined)

const StyledTable = styled.div`
  overflow: hidden;
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: 7px;
`

interface CommonRowProps {
  $columns: string
}

const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
  text-align: center;
  transition: none;
`

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
`

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const StyledBody = styled.section`
  margin: 0.4rem 0;
`

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  background-color: var(--color-grey-50);

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`

const Empty = styled.p`
  margin: 2.4rem;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
`

interface TableProps {
  columns: string
  children: React.ReactNode
}

function Table({ columns, children }: TableProps): JSX.Element {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  )
}

interface HeaderProps {
  children: React.ReactNode
}

function Header({ children }: HeaderProps): JSX.Element {
  const context = useContext(TableContext)
  if (!context) {
    throw new Error('Error: Header must be used within a Table.')
  }

  const { columns } = context

  return (
    <StyledHeader as="header" role="row" $columns={columns}>
      {children}
    </StyledHeader>
  )
}

interface RowProps {
  children: React.ReactNode
}

function Row({ children }: RowProps): JSX.Element {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error('Error: Row must be used within a Table.')
  }

  const { columns } = context

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  )
}

interface BodyProps<T> {
  data: T[]
  render: (item: T, index: number) => React.ReactNode
}

function Body<T>({ data, render }: BodyProps<T>): JSX.Element {
  if (!data.length) return <Empty>No data to show at the moment.</Empty>

  return <StyledBody>{data.map(render)}</StyledBody>
}

Table.Header = Header
Table.Body = Body
Table.Row = Row
Table.Footer = Footer

export default Table
