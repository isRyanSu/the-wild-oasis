import { createContext, useContext, useState, cloneElement } from 'react'
import { createPortal } from 'react-dom'

import styled from 'styled-components'

import useOutsideClick from '@/hooks/useOutsideClick'

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 3.2rem 4rem;
  background-color: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
  transform: translate(-50%, -50%);
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  transition: all 0.5s;
`

type ModalContextType = {
  openName: string
  windowName: string
  openModal: (name: string) => void
  closeModal: () => void
}

const defaultModalContextState: ModalContextType = {
  openName: '',
  windowName: '',
  openModal: () => {},
  closeModal: () => {},
}

const ModalContext = createContext<ModalContextType>(defaultModalContextState)

function Modal({ children }: { children: React.ReactNode }): JSX.Element {
  const [openName, setOpenName] = useState<string>('')

  const windowName = ''

  const openModal = (name: string) => setOpenName(name)
  const closeModal = () => setOpenName('')

  return (
    <ModalContext.Provider
      value={{ openName, windowName, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

function Open({
  openName,
  children,
}: {
  openName: string
  children: React.ReactElement
}): React.ReactElement {
  const { openModal } = useContext(ModalContext)

  return cloneElement(children, { onClick: () => openModal(openName) })
}

function Window({
  windowName,
  children,
}: {
  windowName: string
  children: React.ReactElement
}): React.ReactPortal | null {
  const { openName, closeModal } = useContext(ModalContext)

  const ref = useOutsideClick(closeModal)

  if (windowName !== openName) return null

  return createPortal(
    <Overlay>
      <StyledModal ref={ref as React.RefObject<HTMLDivElement>}>
        {cloneElement(children, { onCloseModal: closeModal })}
      </StyledModal>
    </Overlay>,
    document.body,
  )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
