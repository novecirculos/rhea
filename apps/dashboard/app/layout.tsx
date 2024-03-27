import { Metadata } from "next";

import { Toaster } from "react-hot-toast";

import "@/app/globals.css";
import { fontMain, fontSecondary } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { RootProvider } from "@novecirculos/context";

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === "production"
      ? (`https://${process.env.VERCEL_URL}` as unknown as URL)
      : ("http://localhost:3000" as unknown as URL),
  title: {
    default: "Dashboard - Nove Círculos",
    template: `%s - Nove Círculos`,
  },
  twitter: {
    card: "summary_large_image",
    site: "@novecirculos",
    creator: "@novecirculos",
    images: "https://media.graphassets.com/W2LHS096TICNGU4Eys1V",
  },
  openGraph: {
    type: "website",
    url: "https://dashboard.novecirculos.com.br",
    title: "Dashboard - Nove Círculos.",
    description:
      "Bem-vindo ao Nove Círculos, um universo onde realidade e fantasia colidem. Embarque em jornadas épicas, enfrente desafios intrigantes e interaja com personagens únicos.",
    siteName: "Nove Círculos",
    images: [
      {
        url: "https://media.graphassets.com/W2LHS096TICNGU4Eys1V",
      },
    ],
  },
  description: "Dashboard - Nove Círculos.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alice&family=Noto+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <meta
          http-equiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self'"
        />
        <meta
          http-equiv="X-Content-Security-Policy"
          content="default-src 'self'; script-src 'self'"
        />
      </head>

      <body
        className={cn("font-primary dark antialiased", fontMain, fontSecondary)}
      >
        <RootProvider>
          <Toaster />
          <div className="flex min-h-screen flex-col bg-background dark:bg-foreground">
            {/* @ts-ignore */}
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
          </div>
          {/* <TailwindIndicator /> */}
        </RootProvider>
      </body>
    </html>
  );
}
