import { DOMNode } from 'html-react-parser'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { slugify } from './slugify'

export const extractFirstThreeLines = (htmlString: string) => {
  const regex = /(<([^>]+)>)/gi
  const strippedContent = htmlString.replace(regex, '')
  const lines = strippedContent
    .split('\n')
    .filter((line) => line.trim() !== '')
    .slice(0, 3)
  return lines.join(' ')
}

interface ReplaceParams {
  domNode: any
  noLinking?: boolean
}

export function replace({ domNode, noLinking = false }: ReplaceParams) {
  if (domNode.type === 'text' && /\[\[.*?\]\]/.test(domNode.data)) {
    const parts = domNode.data
      .split(/\[\[(.*?)\]\]/)
      .map((part: string, i: number) => {
        if (i % 2 === 0) {
          return part
        }

        const slug = slugify(part)

        return (
          <Fragment key={i}>
            {noLinking ? (
              part
            ) : (
              <Link
                className="hover:color-secondary-800 hover:underline"
                href={`/articles/${slug}`}
              >
                {part}
              </Link>
            )}
          </Fragment>
        )
      })

    return <Fragment>{parts}</Fragment>
  }
}
