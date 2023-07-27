'use client'
import { Provider } from 'jotai'
import { ReactNode } from 'react'
import { Toaster } from '@novecirculos/toast-context'
import { TooltipProvider } from '@novecirculos/design'

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </Provider>
  )
}
