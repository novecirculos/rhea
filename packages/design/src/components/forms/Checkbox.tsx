'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '../../lib/utils'
import { VariantProps, cva } from 'class-variance-authority'

const checkboxVariants = cva(
  'animate-duration-[250ms] peer h-4 w-4 shrink-0 rounded-sm border border-gray-200 bg-gray-300 ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-800 ',
  {
    variants: {
      variant: {
        primary: 'data-[state=checked]:bg-primary dark:border-gray-800',
        secondary: 'data-[state=checked]:bg-secondary dark:border-gray-800',
        outline:
          'data-[state=checked]:bg-gray-50 text-gray-900 bg-transparent border border-gray-400',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxVariants>
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      checkboxVariants({
        className,
        variant,
      })
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
