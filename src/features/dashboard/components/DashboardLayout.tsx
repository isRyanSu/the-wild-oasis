import styled from 'styled-components'

import useCabins from '@/features/cabins/hooks/useCabins'
import useRecentBookings from '@/features/dashboard/hooks/useRecentBookings'
import useRecentStays from '@/features/dashboard/hooks/useRecentStays'

import Statistics from '@/features/dashboard/components/Statistics'

import Spinner from '@/components/Spinner'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-rows: auto 34rem auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`

function DashboardLayout() {
  const { isLoadingAllCabins, allCabins } = useCabins()
  const { isLoadingRecentBookings, recentBookings } = useRecentBookings()
  const { numDays, isLoadingRecentStays, confirmedRecentStays } =
    useRecentStays()

  if (isLoadingAllCabins || isLoadingRecentBookings || isLoadingRecentStays)
    return <Spinner />

  return (
    <StyledDashboardLayout>
      <Statistics
        numCabins={allCabins?.length}
        numDays={numDays}
        recentBookings={recentBookings}
        confirmedRecentStays={confirmedRecentStays}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
