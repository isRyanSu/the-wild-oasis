import styled from 'styled-components'

import GlobalStyles from '@/styles/GlobalStyles'
import Row from '@/components/Row'
import Heading from '@/components/Heading'
import Button from '@/components/Button'
import Input from '@/components/Input'

const StyledApp = styled.main`
  padding: 20px;
`

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">The Wild Oasis</Heading>
          <div>
            <Heading as="h2">Check in and out</Heading>
            <Button
              $variation="primary"
              size="small"
              onClick={() => alert('Check in')}
            >
              Check in
            </Button>
            <Button
              $variation="primary"
              size="small"
              onClick={() => alert('Check out')}
            >
              Check out
            </Button>
          </div>
        </Row>
        <Row type="vertical">
          <Heading as="h3">Form</Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="Number of guests" />
          </form>
        </Row>
      </StyledApp>
    </>
  )
}
