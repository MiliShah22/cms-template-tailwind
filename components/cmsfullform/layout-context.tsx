"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'

type MenuState = 'full' | 'collapsed' | 'hidden'

interface LayoutContextType {
  menuState: MenuState
  isHovered: boolean
  isMobileMenuOpen: boolean
  isMobile: boolean
  toggleMenuState: () => void
  setIsMobileMenuOpen: (open: boolean) => void
  setIsHovered: (hovered: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [menuState, setMenuState] = useState<MenuState>('full')
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleMenuState = useCallback(() => {
    setMenuState((prev) => {
      switch (prev) {
        case 'full': return 'collapsed'
        case 'collapsed': return 'hidden'
        case 'hidden': return 'full'
        default: return 'full'
      }
    })
  }, [])

  // Responsive detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsMobileMenuOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const value = {
    menuState,
    isHovered,
    isMobileMenuOpen,
    isMobile,
    toggleMenuState,
    setIsMobileMenuOpen,
    setIsHovered,
  }

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider')
  }
  return context
}

