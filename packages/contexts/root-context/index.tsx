'use client'
import { Provider } from 'jotai'
import React from 'react'
import { Toaster } from '@novecirculos/toast-context'
import { TooltipProvider } from '@novecirculos/design'

export const RootProvider = ({ children }: { children: any }) => {
  return (
    <Provider>
      <Toaster />
      <TooltipProvider>{children}</TooltipProvider>
    </Provider>
  )
}
