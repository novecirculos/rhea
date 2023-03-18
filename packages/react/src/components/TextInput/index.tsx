import { ComponentProps } from 'react'
import { Input, TextInputContainer } from './styles'

export interface TextInputProps extends ComponentProps<typeof Input> {}

export function TextInput({ children, ...props }: TextInputProps) {
  return (
    <TextInputContainer>
      {children}
      <Input {...props} />
    </TextInputContainer>
  )
}

TextInput.displayName = 'TextInput'
