import CabinTableOperations from '@/features/cabins/components/CabinTableOperations'
import CabinTable from '@/features/cabins/components/CabinTable'
import CabinModal from '@/features/cabins/components/CabinModal'

import Heading from '@/components/Heading'
import Row from '@/components/Row'

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <CabinModal />
      </Row>
    </>
  )
}

export default Cabins
