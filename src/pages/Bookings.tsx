import BookingTableOperations from '@/features/bookings/components/BookingTableOperations'
import BookingTable from '@/features/bookings/components/BookingTable'

import Row from '@/components/Row'
import Heading from '@/components/Heading'

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  )
}

export default Bookings
