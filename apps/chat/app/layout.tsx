import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMain, fontSecondary } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { RootProvider } from '@novecirculos/root-context'

export const metadata: Metadata = {
  title: {
    default: 'Chat - Nove Círculos',
    template: `%s - Nove Círculos`
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={cn('font-sans antialiased', fontMain, fontSecondary)}>
        <Toaster />
        <RootProvider>
          <UserProvider>
            <div className="flex min-h-screen flex-col">
              {/* @ts-ignore */}
              <Header />
              <main className="flex flex-1 flex-col bg-background">
                {children}
              </main>
            </div>
            {/* <TailwindIndicator /> */}
          </UserProvider>
        </RootProvider>
      </body>
    </html>
  )
}
