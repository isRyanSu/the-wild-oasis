import { SquarePen, Trash } from 'lucide-react'

import styled from 'styled-components'

import EditCabinForm from '@/features/cabins/components/EditCabinForm'

import useDeleteCabin from '@/features/cabins/hooks/useDeleteCabin'

import Table from '@/components/Table'
import Modal from '@/components/Modal'
import Menus from '@/components/Menus'
import ConfirmDelete from '@/components/ConfirmDelete'

import { formatCurrency } from '@/utils/helpers'

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-tiny);
  transform: scale(1.3);
`

const Cabin = styled.div`
  font-family: Sono, sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`

const Price = styled.div`
  font-family: Sono, sans-serif;
  font-weight: 600;
`

const Discount = styled.div`
  font-family: Sono, sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`

interface CabinRowProps {
  cabin: {
    id: number
    name: string
    maxCapacity: number
    regularPrice: number
    discount: number
    image: string
    description: string
  }
}

function CabinRow({ cabin }: CabinRowProps) {
  const { deleteCabin, isDeleting } = useDeleteCabin()

  const { id, name, maxCapacity, regularPrice, discount, image } = cabin

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        {/* Modal */}
        <Modal>
          {/* Menus */}
          <Menus.Menu>
            <Menus.Toggle id={String(cabin.id)} />
            <Menus.List id={String(cabin.id)}>
              {/* Modal Open */}
              <Modal.Open openName="edit-cabin-form">
                <Menus.Button icon={<SquarePen />}>Edit</Menus.Button>
              </Modal.Open>
              {/* Modal Open */}
              <Modal.Open openName="delete-cabin-form">
                <Menus.Button icon={<Trash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            {/* Modal Window */}
            <Modal.Window windowName="edit-cabin-form">
              <EditCabinForm selecedCabin={cabin} />
            </Modal.Window>
            {/* Modal Window */}
            <Modal.Window windowName="delete-cabin-form">
              <ConfirmDelete
                resourceName="cabin"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
