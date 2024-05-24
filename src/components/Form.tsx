import styled, { css } from 'styled-components'

type FormType = {
  type: 'normal' | 'modal'
}

const Form = styled.form<FormType>`
  overflow: hidden;
  font-size: 1.4rem;

  ${(props) =>
    props.type === 'normal' &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: white;
      border: 1px solid var(--color-accent-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === 'modal' &&
    css`
      width: 80rem;
    `}
`

export default Form
