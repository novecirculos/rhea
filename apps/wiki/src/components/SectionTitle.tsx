import { useTrail, animated } from '@react-spring/web'
import Link from 'next/link'
import React from 'react'

interface SectionTitleProps {
  title: string
  category: string
  universeDate?: string
}

export const SectionTitle = ({
  title,
  category,
  universeDate,
}: SectionTitleProps) => {
  const titleWords = title.split(' ')
  const categoryWords = category.split(' ')
  const universeDateWords = universeDate?.split(' ') || []
  const words = [...titleWords, ...categoryWords, ...universeDateWords]

  const trail = useTrail(words.length, {
    from: { opacity: 0, transform: 'translateX(0, 30px, 0)' },
    to: { opacity: 1, transform: 'translateX(0, 0, 0)' },
    delay: 300,
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      </div>
      <div className="flex">
        {universeDate ? (
          <h2 className="color-secondary-700 font-secondary text-xl font-semibold">
            <Link
              className="hover:underline"
              href={`/category/${category.toLowerCase()}`}
            >
              {category}
            </Link>{' '}
            - {universeDate}
          </h2>
        ) : (
          <Link href={`/category/${category.toLowerCase()}`}>
            <h2 className="color-secondary-700 font-secondary text-xl font-semibold">
              {category}
            </h2>
          </Link>
        )}
      </div>
    </div>
  )
}
