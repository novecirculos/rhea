import { FiCheck } from 'react-icons/fi'
import { ComponentProps } from 'react'
import { CheckboxContainer, CheckboxIndicator } from './styles'

export interface CheckboxProps
  extends ComponentProps<typeof CheckboxContainer> {}

export function Checkbox(props: CheckboxProps) {
  return (
    <CheckboxContainer {...props}>
      <CheckboxIndicator asChild>
        <FiCheck />
      </CheckboxIndicator>
    </CheckboxContainer>
  )
}

Checkbox.displayName = 'Checkbox'
