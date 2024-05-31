import { createContext, useEffect } from 'react'

import useLocalStorageState from '@/hooks/useLocalStorageState'

interface DarkModeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

interface DarkModeProviderProps {
  children: React.ReactNode
}

export const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
})

function DarkModeProvider({ children }: DarkModeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    'isDarkMode',
    window.matchMedia('(prefers-color-scheme: dark)').matches,
  )

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode')
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.documentElement.classList.add('light-mode')
    }
  }, [isDarkMode])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider
