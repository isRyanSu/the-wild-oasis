import { format, isToday } from 'date-fns'

import styled from 'styled-components'

import Table from '@/components/Table'
import Tag from '@/components/Tag'

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
  const {
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
    </Table.Row>
  )
}

export default BookingRow
