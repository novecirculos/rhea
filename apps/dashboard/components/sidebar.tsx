'use client'

import * as React from 'react'

import { Button } from '@novecirculos/design'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@novecirculos/design'
import { IconSidebar } from '@/components/ui/icons'

export interface SidebarProps {
  children?: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="-ml-2 h-9 w-9 p-0">
          <IconSidebar className="h-6 w-6" />
          <span className="sr-only">Habilitar barra lateral</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={'left'}
        className="inset-y-0 flex h-auto w-[300px] flex-col p-0"
      >
        <SheetHeader className="p-4">
          <SheetTitle className="text-sm">Páginas</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}
