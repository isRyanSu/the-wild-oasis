import UpdateSettingsForm from '@/features/settings/components/UpdateSettingsForm'

import Row from '@/components/Row'
import Heading from '@/components/Heading'

function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  )
}

export default Settings
