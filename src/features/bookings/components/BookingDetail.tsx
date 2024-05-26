import styled from 'styled-components'

import BookingDataBox from '@/features/bookings/components/BookingDataBox'

import useBooking from '@/features/bookings/hooks/useBooking'

import useMoveBack from '@/hooks/useMoveBack'

import Spinner from '@/components/Spinner'
import Row from '@/components/Row'
import Heading from '@/components/Heading'
import Tag from '@/components/Tag'
import ButtonText from '@/components/ButtonText'
import ButtonGroup from '@/components/ButtonGroup'
import Button from '@/components/Button'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { isLoadingBooking, booking } = useBooking()
  const moveBack = useMoveBack()

  // 如果加载中
  if (isLoadingBooking) return <Spinner />

  const { id: bookingId, status } = booking

  const statusToTagName: Record<string, 'blue' | 'green' | 'silver'> = {
    'unconfirmed': 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
