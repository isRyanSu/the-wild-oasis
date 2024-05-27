import { useContext } from 'react'

import { DarkModeContext } from '@/context/DarkModeContext'

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

function useDarkMode() {
  const context = useContext<DarkModeContextType>(DarkModeContext)

  if (context === undefined) {
    throw new Error(
      'Error: DarkModeContext was used outside of DarkModeProvider!',
    )
  }

  return context
}

export default useDarkMode
