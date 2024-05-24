import { useState } from 'react'

import CabinTable from '@/features/cabins/components/CabinTable'
import CreateCabinForm from '@/features/cabins/components/CreateCabinForm'

import Heading from '@/components/Heading'
import Row from '@/components/Row'
import Button from '@/components/Button'

function Cabins() {
  const [showCreateCabinForm, setShowCreateCabinForm] = useState<boolean>(false)

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button
          onClick={() =>
            setShowCreateCabinForm(
              (showCreateCabinForm) => !showCreateCabinForm,
            )
          }
        >
          Create New Cabin
        </Button>
        {/* CreateCabinForm */}
        {showCreateCabinForm && <CreateCabinForm />}
      </Row>
    </>
  )
}

export default Cabins
