import styled from 'styled-components'

import Heading from '@/components/Heading'
import Button from '@/components/Button'

const StyledConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 40rem;

  & p {
    margin-bottom: 1.2rem;
    color: var(--color-accent-500);
  }

  & div {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
  }
`

interface ConfirmDeleteProps {
  resourceName: string
  disabled: boolean
  onConfirm: () => void
  onCloseModal?: () => void
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  )
}

export default ConfirmDelete
