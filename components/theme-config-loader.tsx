'use client'

import { useEffect } from 'react'

/**
 * Component that ensures the saved theme config is reloaded on every page
 * This handles client-side navigation in Next.js
 */
export function ThemeConfigLoader() {
    useEffect(() => {
        // Reload theme config from localStorage on every mount
        const reloadTheme = () => {
            try {
                const savedConfig = localStorage.getItem('theme-config')
                if (savedConfig) {
                    const config = JSON.parse(savedConfig)
                    const isDark = document.documentElement.classList.contains('dark')
                    const colors = isDark ? config.colors.dark : config.colors.light

                    // Apply color variables to root
                    Object.entries(colors).forEach(([key, value]) => {
                        if (value && typeof value === 'string') {
                            const cssVar = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase()
                            document.documentElement.style.setProperty(cssVar, value)
                        }
                    })

                    // Apply other properties
                    if (config.card) {
                        document.documentElement.style.setProperty('--radius', config.card.borderRadius + 'px')
                        document.documentElement.style.setProperty('--card-border-width', config.card.borderWidth + 'px')
                        document.documentElement.style.setProperty('--card-padding', config.card.padding + 'px')
                    }

                    if (config.typography) {
                        document.documentElement.style.setProperty('--font-size-base', config.typography.fontSize + 'px')
                        document.documentElement.style.setProperty('--font-weight-base', config.typography.fontWeight)
                        document.documentElement.style.setProperty('--line-height-base', config.typography.lineHeight.toString())
                    }

                    if (config.button) {
                        document.documentElement.style.setProperty('--button-radius', config.button.borderRadius + 'px')
                        document.documentElement.style.setProperty('--button-font-size', config.button.fontSize + 'px')
                        document.documentElement.style.setProperty('--button-padding', config.button.padding)
                    }

                    // Apply layout
                    if (config.layout) {
                        document.documentElement.dir = config.layout
                        document.body.dir = config.layout
                    }
                }
            } catch (error) {
                console.error('Failed to reload theme config:', error)
            }
        }

        // Reload on mount
        reloadTheme()

        // Also reload when dark mode is toggled
        const handleDarkModeChange = () => {
            reloadTheme()
        }

        // Watch for theme changes via mutation observer
        const observer = new MutationObserver(() => {
            reloadTheme()
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    return null
}
