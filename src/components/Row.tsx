import styled, { css } from 'styled-components'

type RowType = {
  type?: 'vertical' | 'horizontal'
}

const Row = styled.div<RowType>`
  display: flex;

  ${(props) => {
    return (
      props.type === 'vertical' &&
      css`
        flex-direction: column;
        gap: 1.6rem;
      `
    )
  }}

  ${(props) => {
    return (
      props.type === 'horizontal' &&
      css`
        align-items: center;
        justify-content: space-between;
      `
    )
  }}
`

Row.defaultProps = {
  type: 'vertical',
}

export default Row
