import React, {
  createContext,
  useContext,
  useState,
  MouseEvent,
  ForwardedRef,
} from 'react'
import { createPortal } from 'react-dom'
import { Ellipsis } from 'lucide-react'

import styled from 'styled-components'

import useOutsideClick from '@/hooks/useOutsideClick'

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const StyledToggle = styled.button`
  padding: 0.4rem;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-accent-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-accent-700);
  }
`

interface Position {
  x: number
  y: number
}

interface StyledListProps {
  position: Position
  children: React.ReactNode
}

const StyledListBase = (
  props: StyledListProps,
  ref: ForwardedRef<HTMLUListElement>,
) => {
  const { position, children } = props

  return (
    <ul
      ref={ref}
      style={{
        position: 'fixed',
        backgroundColor: 'white',
        boxShadow: 'var(--shadow-md)',
        borderRadius: 'var(--border-radius-md)',
        right: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {children}
    </ul>
  )
}

const StyledList = React.forwardRef<HTMLUListElement, StyledListProps>(
  StyledListBase,
)

const StyledButton = styled.button`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  text-align: left;
  background: none;
  border: none;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-accent-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-accent-400);
    transition: all 0.3s;
  }
`

interface MenusContextType {
  openId: string
  close: () => void
  open: (id: string) => void
  position: Position | null
  setPosition: (position: Position) => void
}

const MenusContext = createContext<MenusContextType | undefined>(undefined)

interface TableRowMenuProps {
  children: React.ReactNode
}

function Menus({ children }: TableRowMenuProps): JSX.Element {
  const [openId, setOpenId] = useState<string>('')
  const [position, setPosition] = useState<Position | null>(null)

  const close = () => setOpenId('')
  const open = (id: string) => setOpenId(id)

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  )
}

interface ToggleProps {
  id: string
}

function Toggle({ id }: ToggleProps): JSX.Element {
  const context = useContext(MenusContext)

  if (!context) {
    throw new Error('Error: Toggle must be used within a Menus')
  }

  const { openId, close, open, setPosition } = context

  function handleClick(e: MouseEvent<HTMLButtonElement>): void {
    const rect = (e.target as HTMLElement)
      .closest('button')!
      .getBoundingClientRect()

    setPosition({
      x: window.innerWidth - rect.width * 2.5 - rect.x,
      y: rect.y + rect.height + 8,
    })

    openId === '' || openId !== id ? open(id) : close()
  }

  return (
    <StyledToggle onClick={handleClick}>
      <Ellipsis />
    </StyledToggle>
  )
}

interface ListProps {
  id: string
  children: React.ReactNode
}

function List({ id, children }: ListProps): React.ReactPortal | null {
  const context = useContext(MenusContext)

  if (!context) {
    throw new Error('Error: List must be used within a Menus')
  }

  const { openId, position, close } = context

  const ref = useOutsideClick(close) as React.Ref<HTMLUListElement>

  if (openId !== id || !position) return null

  return createPortal(
    <StyledList ref={ref} position={position!}>
      {children}
    </StyledList>,
    document.body,
  )
}

interface ButtonProps {
  children: React.ReactNode
  icon?: React.ReactNode
  onClick?: () => void
}

function Button({ children, icon, onClick }: ButtonProps): JSX.Element {
  const context = useContext(MenusContext)

  if (!context) {
    throw new Error('Error: Button must be used within a Menus.')
  }

  const { close } = context

  function handleClick() {
    if (onClick) {
      onClick()
    }

    close()
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )
}

Menus.Menu = Menu
Menus.Toggle = Toggle
Menus.List = List
Menus.Button = Button

export default Menus
