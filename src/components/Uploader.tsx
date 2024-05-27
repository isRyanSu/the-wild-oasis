import { useState } from 'react'
import { isFuture, isPast, isToday } from 'date-fns'

import Button from '@/components/Button'

import supabase from '@/lib/supabase'

import { cabins } from '@/data/cabins'
import { bookings } from '@/data/bookings'
import { guests } from '@/data/guests'

import { subtractDates } from '@/utils/helpers'

type Booking = {
  id: number
  startDate: string
  endDate: string
  numNights: number
  numGuests: number
  totalPrice: number
  status: 'unconfirmed' | 'checked-in' | 'checked-out'
  guestId: number
  cabinId: number
  hasBreakfast: boolean
}

type Cabin = {
  regularPrice: number
  discount: number
}

async function deleteGuests() {
  const { error } = await supabase.from('Guests').delete().gt('id', 0)

  if (error) console.error(error.message)
}

async function deleteCabins() {
  const { error } = await supabase.from('Cabins').delete().gt('id', 0)

  if (error) console.error(error.message)
}

async function deleteBookings() {
  const { error } = await supabase.from('Bookings').delete().gt('id', 0)

  if (error) console.error(error.message)
}

async function createGuests() {
  const { error } = await supabase.from('Guests').insert(guests)

  if (error) console.error(error.message)
}

async function createCabins() {
  const { error } = await supabase.from('Cabins').insert(cabins)

  if (error) console.error(error.message)
}

async function createBookings() {
  const { data: guestIds } = await supabase
    .from('Guests')
    .select('id')
    .order('id')

  const allGuestIds = guestIds?.map((guest) => guest.id) || []

  const { data: cabinIds } = await supabase
    .from('Cabins')
    .select('id')
    .order('id')

  const allCabinIds = cabinIds?.map((cabin) => cabin.id) || []

  const finalBookings = bookings.map((booking) => {
    const cabin = cabins.at(booking.cabinId - 1) as Cabin
    const numNights = subtractDates(booking.endDate, booking.startDate)
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount)
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0
    const totalPrice = cabinPrice + extrasPrice

    let status: Booking['status'] = 'unconfirmed'

    const startDate = new Date(booking.startDate)
    const endDate = new Date(booking.endDate)

    if (isPast(endDate) && !isToday(endDate)) {
      status = 'checked-out'
    } else if (isFuture(startDate) || isToday(startDate)) {
      status = 'unconfirmed'
    } else if (
      (isFuture(endDate) || isToday(endDate)) &&
      isPast(startDate) &&
      !isToday(startDate)
    ) {
      status = 'checked-in'
    }

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1) || booking.guestId,
      cabinId: allCabinIds.at(booking.cabinId - 1) || booking.cabinId,
      status,
    }
  })

  const { error } = await supabase.from('Bookings').insert(finalBookings)

  if (error) console.error(error.message)

  console.log('--- Finish ---')
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false)

  async function uploadAll() {
    setIsLoading(true)

    await deleteBookings()
    await deleteGuests()
    await deleteCabins()
    await createGuests()
    await createCabins()
    await createBookings()

    setIsLoading(false)
  }

  async function uploadBookings() {
    setIsLoading(true)

    await deleteBookings()
    await createBookings()

    setIsLoading(false)
  }

  return (
    <div
      style={{
        marginTop: 'auto',
        backgroundColor: `var(--color-grey-100)`,
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  )
}

export default Uploader
