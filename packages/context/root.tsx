'use client'
import { Provider } from 'jotai'
import React, { ReactNode } from 'react'
import { Toaster } from './toast'
import { TooltipProvider } from '@novecirculos/design'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        <TooltipProvider>{children}</TooltipProvider>
      </QueryClientProvider>
    </Provider>
  )
}
