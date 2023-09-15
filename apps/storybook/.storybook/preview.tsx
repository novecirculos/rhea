import 'tailwindcss/tailwind.css'
import React from 'react'
import type { Preview } from '@storybook/react'
import { ThemeSwitcher } from '@novecirculos/design'
import { RootProvider } from '@novecirculos/context'

const ThemeBlock = ({ children }) => {
  return (
    <div
      className={`bg-background dark:bg-foreground mt-2 h-full min-h-screen w-full rounded-sm p-2 `}
    >
      {children}
    </div>
  )
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'primary',
      values: [
        {
          name: 'primary',
          value: 'hsl(0, 65%, 64%)',
        },
        {
          name: 'secondary',
          value: 'hsl(30, 68%, 74%)',
        },
      ],
    },
  },

  decorators: [
    (Story) => (
      <RootProvider>
        <div className="flex w-full justify-end">
          <ThemeSwitcher />
        </div>
        <ThemeBlock>
          <Story />
        </ThemeBlock>
      </RootProvider>
    ),
  ],
}

export default preview
