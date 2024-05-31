import styled from 'styled-components'

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'

import useDarkMode from '@/hooks/useDarkMode'

import Heading from '@/components/Heading'

import { type Booking } from '@/types/Booking'

interface StartData {
  duration: string
  value: number
  color: string
}

interface DurationChartProps {
  confirmedRecentStays?: (Booking & { Guest: { fullName: string } })[]
}

const ChartBox = styled.div`
  grid-column: 3 / span 2;
  padding: 2.4rem 3.2rem;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`

const startDataLight: StartData[] = [
  {
    duration: '1 night',
    value: 0,
    color: '#f87171',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#fb923c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#facc15',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#a3e635',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#4ade80',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#2dd4bf',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#60a5fa',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#a855f7',
  },
]

const startDataDark: StartData[] = [
  {
    duration: '1 night',
    value: 0,
    color: '#dc2626',
  },
  {
    duration: '2 nights',
    value: 0,
    color: '#ea580c',
  },
  {
    duration: '3 nights',
    value: 0,
    color: '#ca8a04',
  },
  {
    duration: '4-5 nights',
    value: 0,
    color: '#65a30d',
  },
  {
    duration: '6-7 nights',
    value: 0,
    color: '#16a34a',
  },
  {
    duration: '8-14 nights',
    value: 0,
    color: '#0d9488',
  },
  {
    duration: '15-21 nights',
    value: 0,
    color: '#2563eb',
  },
  {
    duration: '21+ nights',
    value: 0,
    color: '#9333ea',
  },
]

function prepareData(
  startData: StartData[],
  confirmedRecentStays: (Booking & { Guest: { fullName: string } })[],
) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅
  function incArrayValue(
    arr: StartData[],
    field:
      | '1 night'
      | '2 nights'
      | '3 nights'
      | '4-5 nights'
      | '6-7 nights'
      | '8-14 nights'
      | '15-21 nights'
      | '21+ nights',
  ) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj,
    )
  }

  const data = confirmedRecentStays
    .reduce((arr, cur) => {
      const num = cur.numNights

      if (num === 1) return incArrayValue(arr, '1 night')
      if (num === 2) return incArrayValue(arr, '2 nights')
      if (num === 3) return incArrayValue(arr, '3 nights')
      if ([4, 5].includes(num)) return incArrayValue(arr, '4-5 nights')
      if ([6, 7].includes(num)) return incArrayValue(arr, '6-7 nights')
      if (num >= 8 && num <= 14) return incArrayValue(arr, '8-14 nights')
      if (num >= 15 && num <= 21) return incArrayValue(arr, '15-21 nights')
      if (num >= 21) return incArrayValue(arr, '21+ nights')
      return arr
    }, startData)
    .filter((obj) => obj.value > 0)

  return data
}

function DurationChart({ confirmedRecentStays = [] }: DurationChartProps) {
  const { isDarkMode } = useDarkMode()

  const startData = isDarkMode ? startDataDark : startDataLight
  const data = prepareData(startData, confirmedRecentStays)

  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            dataKey="value"
            nameKey="duration"
            data={data}
            innerRadius={85}
            outerRadius={110}
            paddingAngle={3}
            cx="40%"
            cy="50%"
          >
            {data.map((entry: StartData) => (
              <Cell
                key={entry.duration}
                stroke={entry.color}
                fill={entry.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={10}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  )
}

export default DurationChart
