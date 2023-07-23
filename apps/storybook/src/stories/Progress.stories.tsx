import { Progress } from '@novecirculos/design'
import React from 'react'

export default {
  title: 'Components/UI/Progress',
  component: Progress,
}

export const Default = () => {
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(98), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <Progress value={progress} />
    </div>
  )
}
