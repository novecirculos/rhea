import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMain, fontSecondary } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Header } from '@/components/header'
import { RootProvider } from '@novecirculos/root-context'

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? (`https://${process.env.VERCEL_URL}` as unknown as URL)
      : ('http://localhost:3000' as unknown as URL),
  title: {
    default: 'Chat - Nove Círculos',
    template: `%s - Nove Círculos`,
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={cn('font-primary antialiased', fontMain, fontSecondary)}>
        <Toaster />
        <RootProvider>
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}
            <Header />
            <main className="bg-background dark:bg-foreground flex flex-1 flex-col">
              {children}
            </main>
          </div>
          {/* <TailwindIndicator /> */}
        </RootProvider>
      </body>
    </html>
  )
}