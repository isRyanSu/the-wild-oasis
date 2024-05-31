import {
  Briefcase,
  Banknote,
  CalendarDays,
  BarChartHorizontalBig,
} from 'lucide-react'

import Statistic from '@/features/dashboard/components/Statistic'

import { formatCurrency } from '@/utils/helpers'

import { type Booking } from '@/types/Booking'

interface StatisticsProps {
  numCabins?: number
  numDays?: number
  recentBookings?: {
    extrasPrice: number
    totalPrice: number
    createdAt: string
  }[]
  confirmedRecentStays?: (Booking & {
    Guest: {
      fullName: string
    }
  })[]
}

function Statistics({
  numCabins = 8,
  numDays = 7,
  recentBookings = [],
  confirmedRecentStays = [],
}: StatisticsProps) {
  const numBookings = recentBookings.length
  const sales = recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
  const checkins = confirmedRecentStays.length
  const occupation =
    confirmedRecentStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins) // num checked in nights / all available nights (num days * num cabins)

  return (
    <>
      <Statistic
        icon={<Briefcase />}
        title="Bookings"
        color="blue"
        value={numBookings}
      />
      <Statistic
        icon={<Banknote />}
        title="Sales"
        color="green"
        value={formatCurrency(sales)}
      />
      <Statistic
        icon={<CalendarDays />}
        title="Check ins"
        color="indigo"
        value={checkins}
      />
      <Statistic
        icon={<BarChartHorizontalBig />}
        title="Occupancy rate"
        color="yellow"
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  )
}

export default Statistics
