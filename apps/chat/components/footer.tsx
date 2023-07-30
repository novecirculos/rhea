import React from 'react'

import { cn } from '@/lib/utils'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-muted-foreground px-2 text-center text-xs leading-normal',
        className,
      )}
      {...props}
    >
      <span className="hidden text-xs text-gray-400 transition-opacity delay-100 duration-500 md:block">
        <strong>⏎</strong> para enviar, <strong>shift + ⏎</strong> para
        adicionar nova linha
      </span>
    </p>
  )
}
