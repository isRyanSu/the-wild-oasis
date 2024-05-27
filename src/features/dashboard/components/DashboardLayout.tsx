import styled from 'styled-components'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-rows: auto 34rem auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`

function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout