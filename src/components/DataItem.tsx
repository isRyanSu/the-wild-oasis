import styled from 'styled-components'

interface DataItemProps {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

const StyledDataItem = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  padding: 0.8rem 0;
`

const Label = styled.span`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-primary-600);
  }
`

function DataItem({ icon, label, children }: DataItemProps) {
  return (
    <StyledDataItem>
      <Label>
        {icon}
        <span>{label}</span>
      </Label>
      {children}
    </StyledDataItem>
  )
}

export default DataItem
