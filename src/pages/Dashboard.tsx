import DashboardFilter from '@/features/dashboard/components/DashboardFilter'
import DashboardLayout from '@/features/dashboard/components/DashboardLayout'

import Heading from '@/components/Heading'
import Row from '@/components/Row'

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  )
}

export default Dashboard
