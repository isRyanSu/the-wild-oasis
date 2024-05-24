import React, { ReactElement } from 'react'
import styled from 'styled-components'

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  align-items: center;
  padding: 1.2rem 0;

  &:has(button) {
    display: flex;
    gap: 1.2rem;
    justify-content: flex-end;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-accent-100);
  }
`

const Label = styled.label`
  font-family: CustomFont, sans-serif;
  font-weight: 500;
`

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`

interface FormRowProps {
  label?: string
  error?: string
  children?: React.ReactNode
}

function FormRow({ label, error, children }: FormRowProps) {
  return (
    <StyledFormRow>
      {label && (
        <Label
          htmlFor={(React.Children.only(children) as ReactElement).props.id}
        >
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRow
