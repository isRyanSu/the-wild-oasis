import { SquarePen, Trash } from 'lucide-react'

import styled from 'styled-components'

import EditCabinForm from '@/features/cabins/components/EditCabinForm'

import useDeleteCabin from '@/features/cabins/hooks/useDeleteCabin'

import Table from '@/components/Table'
import Modal from '@/components/Modal'
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
  color: var(--color-accent-600);
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
        <Modal>
          <Modal.Open openName="edit-cabin-form">
            <button>
              <SquarePen />
            </button>
          </Modal.Open>
          <Modal.Window windowName="edit-cabin-form">
            <EditCabinForm selecedCabin={cabin} />
          </Modal.Window>

          <Modal.Open openName="delete-cabin-form">
            <button>
              <Trash />
            </button>
          </Modal.Open>
          <Modal.Window windowName="delete-cabin-form">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabin(id)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  )
}

export default CabinRow
