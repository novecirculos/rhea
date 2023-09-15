'use client'
import { Provider } from 'jotai'
import React, { ReactNode } from 'react'
import { Toaster } from './toast'
import { TooltipProvider } from '@novecirculos/design'

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </Provider>
  )
}
