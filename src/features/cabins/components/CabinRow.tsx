import { SquarePen, Trash } from 'lucide-react'

import styled from 'styled-components'

import EditCabinForm from '@/features/cabins/components/EditCabinForm'

import useDeleteCabin from '@/features/cabins/hooks/useDeleteCabin'

import Modal from '@/components/Modal'
import ConfirmDelete from '@/components/ConfirmDelete'

import { formatCurrency } from '@/utils/helpers'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  text-align: center;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-accent-100);
  }
`

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: var(--border-radius-tiny);
  transform: scale(1.6);
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
    <TableRow role="row">
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
    </TableRow>
  )
}

export default CabinRow
