import Link from 'next/link'
import React from 'react'

interface SectionTitleProps {
  title: string
  category: string
  universeDate?: string
}

interface VariationFunctions {
  [key: string]: () => JSX.Element
}

export const SectionTitle = ({
  title,
  category,
  universeDate,
}: SectionTitleProps) => {
  const variations: VariationFunctions = {
    default: () => {
      return (
        <Link
          className="color-secondary-700 font-secondary text-xl font-semibold hover:underline"
          href={`/categories/${category.toLowerCase()}`}
        >
          {category}
        </Link>
      )
    },
    Evento: () => {
      return (
        <Link
          className="color-secondary-700 font-secondary text-xl font-semibold hover:underline"
          href={`/categories/${category.toLowerCase()}`}
        >
          {category} - {universeDate}
        </Link>
      )
    },
    Divindade: () => {
      return (
        <Link
          className="color-secondary-700 font-secondary text-xl font-semibold hover:underline"
          href={`/categories/${category.toLowerCase()}`}
        >
          {category} - {universeDate}
        </Link>
      )
    },
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex">
        <h1 className="text-3xl font-bold leading-tight">{title}</h1>
      </div>
      <div className="flex">
        {variations[category]
          ? variations[category]()
          : variations['default']()}
      </div>
    </div>
  )
}
