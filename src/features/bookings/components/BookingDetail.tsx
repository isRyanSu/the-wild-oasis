import { useNavigate } from 'react-router-dom'

import styled from 'styled-components'

import BookingDataBox from '@/features/bookings/components/BookingDataBox'

import useBooking from '@/features/bookings/hooks/useBooking'
import useCheckout from '@/features/check-in-out/hooks/useCheckout'
import useDeleteBooking from '@/features/bookings/hooks/useDeleteBooking'

import useMoveBack from '@/hooks/useMoveBack'

import Spinner from '@/components/Spinner'
import Row from '@/components/Row'
import Heading from '@/components/Heading'
import Tag from '@/components/Tag'
import ButtonText from '@/components/ButtonText'
import ButtonGroup from '@/components/ButtonGroup'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import ConfirmDelete from '@/components/ConfirmDelete'

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { isLoadingBooking, booking } = useBooking()
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const navigate = useNavigate()
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
        {/* 只有未确认的预订才需要显示 Check in 按钮 */}
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {/* 只有已经登记入住的预订才需要显示 Check out 按钮 */}
        {status === 'checked-in' && (
          <Button
            disabled={isCheckingOut}
            onClick={() => checkout(Number(bookingId))}
          >
            Check out
          </Button>
        )}

        {/* Modal */}
        <Modal>
          {/* Modal Open */}
          <Modal.Open openName="delete-booking-form">
            <Button $variation="danger">Delete</Button>
          </Modal.Open>
          {/* Modal Window */}
          <Modal.Window windowName="delete-booking-form">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(Number(bookingId), {
                  onSettled: () => navigate(-1), // 重定向至上一页
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
