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
  twitter: {
    card: 'summary_large_image',
    site: '@novecirculos',
    creator: '@novecirculos',
    images: 'https://media.graphassets.com/W2LHS096TICNGU4Eys1V',
  },
  openGraph: {
    type: 'website',
    url: 'https://chat.novecirculos.com.br',
    title: 'Chat - Nove Círculos',
    description:
      'Bem-vindo ao Nove Círculos, um universo onde realidade e fantasia colidem. Embarque em jornadas épicas, enfrente desafios intrigantes e interaja com personagens únicos.',
    siteName: 'Nove Círculos',
    images: [
      {
        url: 'https://media.graphassets.com/W2LHS096TICNGU4Eys1V',
      },
    ],
  },
  description:
    'Bem-vindo ao Nove Círculos, um universo onde realidade e fantasia colidem. Embarque em jornadas épicas, enfrente desafios intrigantes e interaja com personagens únicos.',
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
      <body
        className={cn('font-primary dark antialiased', fontMain, fontSecondary)}
      >
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
