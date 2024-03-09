'use client'
import { Provider } from 'jotai'
import React, { ReactNode } from 'react'
import { Toaster } from './toast'
import { TooltipProvider } from '@novecirculos/design'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </Provider>
  )
}
