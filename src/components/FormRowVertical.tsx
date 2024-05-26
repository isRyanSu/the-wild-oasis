import { ReactNode, isValidElement } from 'react'

import styled from 'styled-components'

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`

const Label = styled.label`
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

interface FormRowVerticalProps {
  label?: string
  error?: string
  children: ReactNode
}

const FormRowVertical: React.FC<FormRowVerticalProps> = ({
  label,
  error,
  children,
}) => {
  const childId = isValidElement(children) ? children.props.id : null // 尝试获取子元素的 id 属性

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRowVertical
