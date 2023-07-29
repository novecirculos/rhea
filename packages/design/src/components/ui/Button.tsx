import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90 hover:bg-destructive-foreground/90 bg-destructive-foreground text-destructive',
        matching:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:hover:bg-destructive-foreground/90 dark:bg-destructive-foreground dark:text-destructive',
        gradient: 'border border-input bg-accent hover:text-accent ',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground dark:text-gray-50 dark:hover:text-gray-950',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent dark:text-gray-50 dark:hover:text-gray-950 hover:text-accent-foreground',
        link: 'text-secondary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    if (variant === 'gradient') {
      return (
        <div className="from-primary to-secondary relative overflow-hidden rounded-md bg-gradient-to-r p-[1px]">
          <Comp
            className={cn(
              'relative z-10 w-full transition-all hover:bg-transparent',
              buttonVariants({ variant, size, className })
            )}
            ref={ref}
            {...props}
          />
        </div>
      )
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
