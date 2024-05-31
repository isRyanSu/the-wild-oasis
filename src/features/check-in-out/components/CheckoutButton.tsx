import Button from '@/components/Button'

import useCheckout from '@/features/check-in-out/hooks/useCheckout'

interface CheckoutButtonProps {
  bookingId: number
}

function CheckoutButton({ bookingId }: CheckoutButtonProps) {
  const { checkout, isCheckingOut } = useCheckout()

  return (
    <Button
      $variation="primary"
      size="small"
      disabled={isCheckingOut}
      onClick={() => checkout(bookingId)}
    >
      Check out
    </Button>
  )
}

export default CheckoutButton
