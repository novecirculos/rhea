/* eslint-disable no-undef */
import { ElementType, ReactNode } from 'react'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: string
}

export const Button = ({
  children,
  as: Component = 'button',
  variant = 'primary',
  size = 'sm',
  className,
  ...props
}: ButtonProps<keyof JSX.IntrinsicElements>) => {
  return (
    <Component
      className={`${
        className || ''
      } flex items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium hover:cursor-pointer hover:border-gray-200 focus:outline-none ${
        variant === 'primary'
          ? 'bg-primary-900 border-primary-900 text-white'
          : 'bg-secondary-900 border-secondary-900 text-black '
      } ${size === 'sm' ? 'h-10' : 'h-12'}`}
      {...props}
    >
      {children}
    </Component>
  )
}

Button.displayName = 'Button'
