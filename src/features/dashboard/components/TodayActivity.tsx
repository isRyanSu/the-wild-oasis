import { Link } from 'react-router-dom'

import styled from 'styled-components'

import CheckoutButton from '@/features/check-in-out/components/CheckoutButton'

import Tag from '@/components/Tag'
import Flag from '@/components/Flag'
import Button from '@/components/Button'

import { type Booking } from '@/types/Booking'

const StyledTodayActivity = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;
  padding: 0.8rem 0;
  font-size: 1.4rem;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`

const Guest = styled.div`
  font-weight: 500;
`

interface TodayActivityProps {
  todayActivity: Booking & {
    Guests: { fullName: string; nationality: string; countryFlag: string }
  }
}

function TodayActivity({ todayActivity }: TodayActivityProps) {
  const {
    id,
    numNights,
    status,
    Guests: { fullName, countryFlag },
  } = todayActivity

  return (
    <StyledTodayActivity>
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Flag src={countryFlag} alt={`Flag of ${countryFlag}`} />
      <Guest>{fullName}</Guest>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          $variation="primary"
          size="small"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && <CheckoutButton bookingId={id} />}
    </StyledTodayActivity>
  )
}

export default TodayActivity
