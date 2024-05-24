import CreateCabinForm from '@/features/cabins/components/CreateCabinForm'

import Modal from '@/components/Modal'
import Button from '@/components/Button'

function CabinModal() {
  return (
    <div>
      <Modal>
        <Modal.Open openName="create-cabin-form">
          <Button>Create New Cabin</Button>
        </Modal.Open>
        <Modal.Window windowName="create-cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

export default CabinModal
