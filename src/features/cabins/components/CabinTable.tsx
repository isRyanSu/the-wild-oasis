import CabinRow from '@/features/cabins/components/CabinRow'

import useCabins from '@/features/cabins/hooks/useCabins'

import Spinner from '@/components/Spinner'
import Table from '@/components/Table'

function CabinTable() {
  const { isLoadingAllCabins, allCabins } = useCabins()

  if (isLoadingAllCabins) return <Spinner />

  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div>Image</div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Option</div>
      </Table.Header>
      <Table.Body
        data={allCabins ?? []}
        render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  )
}

export default CabinTable
