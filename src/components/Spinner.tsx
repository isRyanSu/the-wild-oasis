import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`

const Spinner = styled.div`
  width: 6.4rem;
  aspect-ratio: 1;
  margin: 4.8rem auto;
  background:
    radial-gradient(farthest-side, var(--color-primary-600) 94%, #0000) top/10px
      10px no-repeat,
    conic-gradient(#0000 30%, var(--color-primary-600));
  border-radius: 50%;
  mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`

export default Spinner
