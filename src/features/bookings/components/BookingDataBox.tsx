import { format, isToday } from 'date-fns'
import { DollarSign, PencilLine, Tent, Utensils } from 'lucide-react'

import styled from 'styled-components'

import Flag from '@/components/Flag'
import DataItem from '@/components/DataItem'

import { formatDistanceFromNow, formatCurrency } from '@/utils/helpers'

interface Guest {
  fullName: string
  email: string
  country: string
  countryFlag: string
  nationalId: string
}

interface Cabin {
  name: string
}

interface Booking {
  createdAt: string
  startDate: string
  endDate: string
  numNights: number
  numGuests: number
  cabinPrice: number
  extrasPrice: number
  totalPrice: number
  hasBreakfast: boolean
  observations?: string
  isPaid: boolean
  Guests: Guest
  Cabins: Cabin
}

interface BookingDataBoxProps {
  booking: Booking
}

const StyledBookingDataBox = styled.section`
  overflow: hidden;

  /* Box */
  background-color: white;
  border: 1px solid var(--color-accent-100);
  border-radius: var(--border-radius-md);
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 4rem;
  font-size: 1.8rem;
  font-weight: 500;
  color: #e0e7ff;
  background-color: var(--color-primary-500);

  svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  & div:first-child {
    display: flex;
    gap: 1.6rem;
    align-items: center;
    font-size: 1.8rem;
    font-weight: 600;
  }

  & span {
    margin-left: 4px;
    font-family: Sono, sans-serif;
    font-size: 2rem;
  }
`

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`

const Guest = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  margin-bottom: 1.6rem;
  color: var(--color-accent-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-accent-700);
  }
`

const Price = styled.div<{ $isPaid: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  margin-top: 2.4rem;
  color: ${(props) =>
    props.$isPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};
  background-color: ${(props) =>
    props.$isPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
  border-radius: var(--border-radius-sm);

  & p:last-child {
    font-size: 1.4rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;
    color: currentcolor !important;
  }
`

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-accent-500);
  text-align: right;
`

function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    Guests: { fullName: guestName, email, country, countryFlag, nationalId },
    Cabins: { name: cabinName },
  } = booking

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <Tent />
          <p>
            {numNights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </Header>
      <Section>
        <Guest>
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalId}</p>
        </Guest>

        {observations && (
          <DataItem icon={<PencilLine />} label="Observations">
            {observations}
          </DataItem>
        )}

        <DataItem icon={<Utensils />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <Price $isPaid={isPaid}>
          <DataItem icon={<DollarSign />} label={`Total price`}>
            {formatCurrency(totalPrice)}

            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice,
              )} breakfast)`}
          </DataItem>

          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(createdAt), 'EEE, MMM dd yyyy, p')}</p>
      </Footer>
    </StyledBookingDataBox>
  )
}

export default BookingDataBox