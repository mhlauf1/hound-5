'use client'
import {createContext, useContext, useState, type ReactNode} from 'react'

type NavbarTheme = 'default' | 'transparent'

const NavbarThemeContext = createContext<{
  theme: NavbarTheme
  setTheme: (theme: NavbarTheme) => void
} | null>(null)

export function NavbarThemeProvider({children}: {children: ReactNode}) {
  const [theme, setTheme] = useState<NavbarTheme>('default')
  return (
    <NavbarThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </NavbarThemeContext.Provider>
  )
}

export function useNavbarTheme() {
  const ctx = useContext(NavbarThemeContext)
  if (!ctx) return {theme: 'default' as NavbarTheme, setTheme: () => {}}
  return ctx
}
