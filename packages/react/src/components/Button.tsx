import { ComponentProps, ElementType } from 'react'

export interface ButtonProps extends ComponentProps<'button'> {
  as?: ElementType
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
}

export const Button = ({
  children,
  as: Component = 'button',
  variant = 'primary',
  size = 'sm',
  className,
  disabled,
  ...props
}: ButtonProps) => (
  <Component
    className={`${className} flex items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium hover:border-gray-200 focus:outline-none ${
      variant === 'primary'
        ? 'bg-primary-900 border-primary-900 text-white'
        : 'bg-secondary-900 border-secondary-900 text-black '
    } ${size === 'sm' ? 'h-10' : 'h-12'} ${
      disabled && 'cursor-not-allowed bg-gray-400 text-black'
    }`}
    {...props}
  >
    {children}
  </Component>
)

Button.displayName = 'Button'
