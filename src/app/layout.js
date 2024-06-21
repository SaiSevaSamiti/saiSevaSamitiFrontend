'use client'

import { ParallaxProvider } from 'react-scroll-parallax'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-base dark:bg-secondary-dark scroll-smooth">
        <ParallaxProvider>{children}</ParallaxProvider>
        <Toaster className="dark:bg-primary-dark" />
      </body>
    </html>
  )
}
