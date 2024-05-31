import styled from 'styled-components'

import { eachDayOfInterval, subDays, format, isSameDay } from 'date-fns'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from 'recharts'

import useDarkMode from '@/hooks/useDarkMode'

import DashboardBox from '@/features/dashboard/components/DashboardBox'

import Heading from '@/components/Heading'

interface SalesChartProps {
  numDays?: number
  recentBookings?: {
    extrasPrice: number
    totalPrice: number
    createdAt: string
  }[]
}

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`

function SalesChart({ numDays = 7, recentBookings = [] }: SalesChartProps) {
  const { isDarkMode } = useDarkMode()

  const allDates: Date[] = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  })

  const colors = isDarkMode
    ? {
        totalSales: { stroke: '#DCFCE7', fill: '#166434' },
        extrasSales: { stroke: '#E0F2FE', fill: '#065985' },
        text: '#D6D3D1',
        background: '#18212F',
      }
    : {
        totalSales: { stroke: '#17803D', fill: '#DCFCE7' },
        extrasSales: { stroke: '#0569A0', fill: '#E0F2FE' },
        text: '#44403C',
        background: '#FFFFFF',
      }

  const data = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: recentBookings
        .filter((booking) => isSameDay(date, new Date(booking.createdAt)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    }
  })

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0) as Date, 'MMM dd yyyy')} &mdash;{' '}
        {format(allDates.at(-1) as Date, 'MMM dd yyyy')}{' '}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            name="Total sales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            strokeWidth={1}
            fill={colors.totalSales.fill}
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            name="Extras sales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            strokeWidth={1}
            fill={colors.extrasSales.fill}
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  )
}

export default SalesChart
