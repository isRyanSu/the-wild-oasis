import BookingRow from '@/features/bookings/components/BookingRow'

import useBookings from '@/features/bookings/hooks/useBookings'

import Spinner from '@/components/Spinner'
import Empty from '@/components/Empty'
import Menus from '@/components/Menus'
import Table from '@/components/Table'
import Pagination from '@/components/Pagination'

function BookingTable() {
  const { isLoadingAllBookings, allBookings, numBookings } = useBookings()

  // 如果加载中
  if (isLoadingAllBookings) return <Spinner />

  // 如果没有 Booking
  if (allBookings?.length === 0) return <Empty resourceName="bookings" />

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={allBookings ?? []}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={numBookings || 0} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

export default BookingTable
