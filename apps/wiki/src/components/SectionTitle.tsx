import { useTrail, animated } from '@react-spring/web'
import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle: string
}

export const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  const titleWords = title.split(' ')
  const subtitleWords = subtitle.split(' ')
  const words = [...titleWords, ...subtitleWords]

  const trail = useTrail(words.length, {
    from: { opacity: 0, transform: 'translate3d(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    delay: 300,
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        {trail.slice(0, titleWords.length).map((props, index) => (
          <animated.h1
            key={titleWords[index]}
            style={props}
            className={`text-3xl font-bold leading-none ${
              index < titleWords.length - 1 ? 'mr-1' : ''
            }`}
          >
            {titleWords[index]}
          </animated.h1>
        ))}
      </div>
      <div className="flex">
        {trail.slice(titleWords.length).map((props, index) => (
          <animated.h2
            key={subtitleWords[index]}
            style={props}
            className={`text-secondary-600 text-lg font-medium ${
              index < titleWords.length - 1 ? 'mr-2' : ''
            }`}
          >
            {subtitleWords[index]}
          </animated.h2>
        ))}
      </div>
    </div>
  )
}
