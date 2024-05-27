import { Moon, Sun } from 'lucide-react'

import useDarkMode from '@/hooks/useDarkMode'

import ButtonIcon from '@/components/ButtonIcon'

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <Sun /> : <Moon />}
    </ButtonIcon>
  )
}

export default DarkModeToggle
