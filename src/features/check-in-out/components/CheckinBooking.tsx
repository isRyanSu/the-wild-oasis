import { useEffect, useState } from 'react'

import styled from 'styled-components'

import BookingDataBox from '@/features/bookings/components/BookingDataBox'

import useBooking from '@/features/bookings/hooks/useBooking'
import useSettings from '@/features/settings/hooks/useSettings'
import useCheckin from '@/features/check-in-out/hooks/useCheckin'
import useMoveBack from '@/hooks/useMoveBack'

import Spinner from '@/components/Spinner'
import Row from '@/components/Row'
import Heading from '@/components/Heading'
import ButtonText from '@/components/ButtonText'
import Checkbox from '@/components/Checkbox'
import ButtonGroup from '@/components/ButtonGroup'
import Button from '@/components/Button'

import { formatCurrency } from '@/utils/helpers'

const Box = styled.div`
  padding: 2.4rem 4rem;

  /* Box */
  background-color: white;
  border: 1px solid var(--color-accent-100);
  border-radius: var(--border-radius-md);
`

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false)
  const { isLoadingBooking, booking } = useBooking()
  const { isLoadingAllSettings, allSettings } = useSettings()
  const { checkin, isChecking } = useCheckin()
  const moveBack = useMoveBack()

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false)
  }, [booking?.isPaid])

  // 如果加载中
  if (isLoadingBooking || isLoadingAllSettings) return <Spinner />

  const {
    id: bookingId,
    numNights,
    numGuests,
    hasBreakfast,
    totalPrice,
    Guests: { fullName: guestName },
  } = booking

  const optionalBreakfastPrice: number =
    allSettings.breakfastPrice * numNights * numGuests

  function handleCheckin() {
    if (!confirmPaid) return

    // 如果含有早餐
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      })
    } else checkin({ bookingId }) // 如果不包含早餐
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {/* 只有未选择早餐的预订才需要显示*/}
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="addBreakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast)
              setConfirmPaid(false)
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="confirmedPaid"
          checked={confirmPaid}
          disabled={confirmPaid || isChecking}
          onChange={() => setConfirmPaid((confirmedPaid) => !confirmedPaid)}
        >
          I confirm that {guestName} has paid the total amount of{' '}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + optionalBreakfastPrice,
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`
            : formatCurrency(totalPrice)}
          .
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isChecking} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
