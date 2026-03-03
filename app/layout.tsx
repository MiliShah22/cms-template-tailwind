import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeCustomizer } from "@/components/theme-customizer"
import { ThemeConfigLoader } from "@/components/theme-config-loader"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CMSFullForm Dashboard - OpenSource CMS",
  description: "CmsFullForm dashboard build with Next.js and Tailwind CSS",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Load saved theme config immediately to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedConfig = localStorage.getItem('theme-config');
                  if (savedConfig) {
                    const config = JSON.parse(savedConfig);
                    const isDark = document.documentElement.classList.contains('dark');
                    const colors = isDark ? config.colors.dark : config.colors.light;

                    // Apply color variables to root immediately
                    Object.entries(colors).forEach(([key, value]) => {
                      if (value && typeof value === 'string') {
                        const cssVar = '--' + key.replace(/([A-Z])/g, '-\\$1').toLowerCase();
                        document.documentElement.style.setProperty(cssVar, value);
                      }
                    });

                    // Apply other properties
                    document.documentElement.style.setProperty('--radius', config.card.borderRadius + 'px');
                    document.documentElement.style.setProperty('--card-border-width', config.card.borderWidth + 'px');
                    document.documentElement.style.setProperty('--card-padding', config.card.padding + 'px');
                    document.documentElement.style.setProperty('--font-size-base', config.typography.fontSize + 'px');
                    document.documentElement.style.setProperty('--font-weight-base', config.typography.fontWeight);
                    document.documentElement.style.setProperty('--line-height-base', config.typography.lineHeight.toString());
                    document.documentElement.style.setProperty('--button-radius', config.button.borderRadius + 'px');
                    document.documentElement.style.setProperty('--button-font-size', config.button.fontSize + 'px');
                    document.documentElement.style.setProperty('--button-padding', config.button.padding);

                    // Apply layout
                    document.documentElement.dir = config.layout;
                    document.body.dir = config.layout;
                  }
                } catch (error) {
                  console.error('Failed to load theme config:', error);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <ThemeConfigLoader />
            {children}
            <ThemeCustomizer />
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
