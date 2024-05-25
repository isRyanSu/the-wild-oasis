import { useSearchParams } from 'react-router-dom'

import CabinRow from '@/features/cabins/components/CabinRow'

import useCabins from '@/features/cabins/hooks/useCabins'

import Spinner from '@/components/Spinner'
import Menus from '@/components/Menus'
import Table from '@/components/Table'
import Empty from '@/components/Empty'

function CabinTable() {
  const [searchParams] = useSearchParams()
  const { isLoadingAllCabins, allCabins } = useCabins()

  // 如果加载中
  if (isLoadingAllCabins) return <Spinner />

  // 如果没有 Cabin
  if (!allCabins?.length) return <Empty resourceName="cabins" />

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all' // 获取 discount 值，默认值为 all

  let filteredCabins // 过滤后的 Cabin

  // 所有 Cabin
  if (filterValue === 'all') {
    filteredCabins = allCabins
  }

  // 没有折扣的 Cabin
  if (filterValue === 'no-discount') {
    filteredCabins = allCabins.filter((cabin) => cabin.discount === 0)
  }

  // 有折扣的 Cabin
  if (filterValue === 'with-discount') {
    filteredCabins = allCabins.filter((cabin) => cabin.discount > 0)
  }

  // 2) SORTER
  const sort = searchParams.get('sort') || 'startDate-asc' // 获取 sort 值，默认值为 startDate-asc
  const [field, direction] = sort.split('-') // 将 sort 值切分为 field 和 direction
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * (direction === 'asc' ? 1 : -1),
  ) // 排序后的 Cabin

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Image</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins ?? []}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  )
}

export default CabinTable
