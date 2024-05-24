import styled from 'styled-components'

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    font: inherit;
    font-weight: 500;
    color: var(--color-primary-50);
    cursor: pointer;
    background-color: var(--color-primary-600);
    border: none;
    border-radius: var(--border-radius-sm);
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: var(--color-primary-700);
    }
  }
`

export default FileInput
