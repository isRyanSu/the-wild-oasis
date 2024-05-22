import styled, { css } from 'styled-components'

type HeadingType = {
  as: 'h1' | 'h2' | 'h3'
}

const Heading = styled.h1<HeadingType>`
  line-height: 1.4;

  ${(props) => {
    return (
      props.as === 'h1' &&
      css`
        font-size: 3rem;
        font-weight: 600;
      `
    )
  }}

  ${(props) => {
    return (
      props.as === 'h2' &&
      css`
        font-size: 2rem;
        font-weight: 600;
      `
    )
  }}
    
  ${(props) => {
    return (
      props.as === 'h3' &&
      css`
        font-size: 2rem;
        font-weight: 500;
      `
    )
  }}
`

export default Heading
