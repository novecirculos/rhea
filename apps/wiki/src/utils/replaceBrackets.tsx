import Link from 'next/link'
import React, { Fragment } from 'react'

function slugify(text: string) {
  // replace accents from Brazilian Portuguese with English letters
  text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // replace non-English letters with spaces
  text = text.replace(/[^a-zA-Z]/g, ' ')

  // replace multiple spaces with a single hyphen
  text = text.trim().replace(/\s+/g, '-')

  // convert to lowercase
  text = text.toLowerCase()

  return text
}

export function replace(domNode: any) {
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
            <Link href={`/article/${slug}`}>{part}</Link>
          </Fragment>
        )
      })

    return <Fragment>{parts}</Fragment>
  }
}
