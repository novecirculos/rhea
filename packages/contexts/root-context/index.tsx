import { Provider } from 'jotai'
import { ReactNode } from 'react'
import { Toaster } from '@novecirculos/toast-context'

export const RootProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <Toaster />
      {children}
    </Provider>
  )
}
