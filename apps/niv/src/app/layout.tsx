import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "./_components/sidebar";
import { ThemeProvider } from "./_components/theme-provider";
import AiDrawer from "./_components/ai-drawer";

export const metadata: Metadata = {
  title: "Niv",
  description: "Niv, a powerful note taking app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <div className="flex">
              <Sidebar />
              {children}
            </div>
          </TRPCReactProvider>
          <AiDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
