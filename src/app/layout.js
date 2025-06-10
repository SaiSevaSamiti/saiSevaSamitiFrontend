import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import ParallaxLayout from '@/components/ParallaxLayout'

export const metadata = {
  title: 'Sai Seva Samiti',
  description: 'A non-profit organization serving the community.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-primary-base dark:bg-secondary-dark scroll-smooth">
        <ParallaxLayout>{children}</ParallaxLayout>
        <Toaster className="dark:bg-primary-dark" />
      </body>
    </html>
  )
}
