import '../styles/globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { ProviderQueryClient } from '@/utils/react-query'

import { cn } from '../lib/utils'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          roboto.className,
        )}
      >
        <ProviderQueryClient>{children}</ProviderQueryClient>
      </body>
    </html>
  )
}
