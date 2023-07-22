import { ComponentProps, ElementType } from 'react'

export interface TextProps extends ComponentProps<'button'> {
  as?: ElementType
  size?: string
}

export const Text = ({
  children,
  as: Component = 'p',
  size = 'base',
  className,
  disabled,

  ...props
}: TextProps) => (
  <Component className={`text-${size} text-gray-300" `} {...props}>
    {children}
  </Component>
)

Text.displayName = 'Text'
