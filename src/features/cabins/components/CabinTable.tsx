import styled from 'styled-components'

import CabinRow from '@/features/cabins/components/CabinRow'

import useCabins from '@/features/cabins/hooks/useCabins'

import Spinner from '@/components/Spinner'

const Table = styled.div`
  overflow: hidden;
  font-size: 1.4rem;
  background-color: white;
  border: 1px solid var(--color-accent-200);
  border-radius: 7px;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.6rem 2.4rem;
  font-weight: 600;
  color: var(--color-accent-600);
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  background-color: var(--color-accent-50);
  border-bottom: 1px solid var(--color-accent-100);
`

function CabinTable() {
  const { isLoadingAllCabins, allCabins } = useCabins()

  if (isLoadingAllCabins) return <Spinner />

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {allCabins &&
        allCabins.map((cabin) => <CabinRow key={cabin.id} cabin={cabin} />)}
    </Table>
  )
}

export default CabinTable
