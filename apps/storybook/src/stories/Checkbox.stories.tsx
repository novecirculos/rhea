import type { Meta, StoryObj } from '@storybook/react'
import { Text, Checkbox, CheckboxProps, Box } from '@yhva/react'

export default {
  title: 'Form/Checkbox',
  component: Checkbox,
  args: {
    variant: 'primary',
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: {
        type: 'inline-radio',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <Box css={{ display: 'flex', flexDirection: 'row', gap: '$2' }}>
          {Story()}
          <Text size="sm">Accept terms of use</Text>
        </Box>
      )
    },
  ],
} as Meta<CheckboxProps>

export const Primary: StoryObj<CheckboxProps> = {}
