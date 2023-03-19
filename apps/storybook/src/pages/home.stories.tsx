import { Meta } from '@storybook/react'
import { TestComponent } from '@novecirculos/react'

export default {
  title: 'Home',
} as Meta

export const Home = () => {
  return (
    <div>
      <h1 className="text-primary font-secondary text-2xl">
        Home <TestComponent />
      </h1>
    </div>
  )
}
