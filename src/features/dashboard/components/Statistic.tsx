import styled from 'styled-components'

interface StatisticProps {
  icon: React.ReactNode
  title: string
  color: string
  value: string | number
}

const StyledStatistic = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 6.4rem 1fr;
  gap: 0.4rem 1.6rem;
  padding: 1.6rem;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`

const Icon = styled.div`
  display: flex;
  grid-row: 1 / -1;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;

  /* Box */
  background-color: ${(props) => `var(--color-${props.color}-100)`};
  border-radius: 50%;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: ${(props) => `var(--color-${props.color}-700)`};
  }
`

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
  text-transform: uppercase;
  letter-spacing: 0.4px;
`

const Value = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1;
`

function Statistic({ icon, title, color, value }: StatisticProps) {
  return (
    <StyledStatistic>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStatistic>
  )
}

export default Statistic
