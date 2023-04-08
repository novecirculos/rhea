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
  ...props
}: ButtonProps) => (
  <Component
    className={`flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium focus:outline-none ${
      variant === 'primary'
        ? 'bg-primary hover:bg-primary800 text-white'
        : 'bg-secondary hover:bg-secondary800 text-black'
    } ${size === 'sm' ? 'h-10' : 'h-12'}`}
    {...props}
  >
    {children}
  </Component>
)

Button.displayName = 'Button'
