import { useNavigate } from 'react-router-dom'
import { SquareCheck, TicketX, Eye, Trash } from 'lucide-react'
import { format, isToday } from 'date-fns'

import styled from 'styled-components'

import useCheckout from '@/features/check-in-out/hooks/useCheckout'
import useDeleteBooking from '@/features/bookings/hooks/useDeleteBooking'

import Table from '@/components/Table'
import Tag from '@/components/Tag'
import Modal from '@/components/Modal'
import Menus from '@/components/Menus'
import ConfirmDelete from '@/components/ConfirmDelete'

import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers'

interface BookingRowProps {
  booking: {
    id: string
    createdAt: string
    startDate: string
    endDate: string
    numNights: number
    numGuests: number
    totalPrice: number
    status: 'unconfirmed' | 'checked-in' | 'checked-out'
    Guests: {
      fullName: string
      email: string
    }
    Cabins: {
      name: string
    }
  }
}

const Cabin = styled.div`
  font-family: Sono, sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-accent-600);
`

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    font-size: 1.2rem;
    color: var(--color-accent-500);
  }
`

const Status = styled.div`
  display: flex;
  justify-content: center;
`

const Amount = styled.div`
  font-family: Sono, sans-serif;
  font-weight: 500;
`

function BookingRow({ booking }: BookingRowProps) {
  const navigate = useNavigate()
  const { checkout } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()

  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    Guests: { fullName: guestName, email: guestEmail },
    Cabins: { name: cabinName },
  } = booking

  const statusToTagName: Record<string, 'blue' | 'green' | 'silver'> = {
    'unconfirmed': 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} {numNights === 1 ? 'night' : 'nights'} stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Status>
        <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
      </Status>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            {/* 只有未确认的预订才需要显示 Check in 按钮 */}
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<SquareCheck />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {/* 只有已经登记入住的预订才需要显示 Check out 按钮 */}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<TicketX />}
                onClick={() => checkout(Number(bookingId))}
              >
                Check out
              </Menus.Button>
            )}
            <Menus.Button
              icon={<Eye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {/* Modal Open */}
            <Modal.Open openName="delete-booking-form">
              <Menus.Button icon={<Trash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          {/* Modal Window */}
          <Modal.Window windowName="delete-booking-form">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => deleteBooking(Number(bookingId))}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  )
}

export default BookingRow
