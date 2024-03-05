import type { NextApiRequest, NextApiResponse } from 'next'
import archiver from 'archiver'
import { htmlToText } from 'html-to-text'
import { getUserRoles } from '~/services/auth0'
import nookies from 'nookies'
import {
  ExportArticlesDocument,
  client,
  ExportArticlesQuery,
} from '@novecirculos/graphql'
import { extractLinks } from '~/utils/extractLinks'
import { Client, query as q } from 'faunadb'

const faunaClient = new Client({ secret: process.env.FAUNADB_SECRET as string })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { '@auth0/user-sub': sub } = nookies.get({ req }, '@auth0/user-sub')

    const roles = await getUserRoles(req, sub)

    const requiredRoles = ['Admin']

    const allowed = requiredRoles.some((role) => roles?.includes(role))

    if (!allowed) {
      res.status(403).json({ error: 'Not authorized' })
      return
    }

    let skip = 0
    let hasMore = true

    const archive = archiver('zip', {
      zlib: { level: 9 },
    })

    res.setHeader('Content-Disposition', 'attachment; filename=articles.zip')
    res.setHeader('Content-Type', 'application/zip')

    archive.pipe(res)

    const idMapping: Record<string, string> = {}

    // First pass: Build the ID mapping
    while (hasMore) {
      const { data }: { data: ExportArticlesQuery } = await new Promise(
        (resolve, reject) => {
          setTimeout(async () => {
            try {
              const response = await client.query({
                query: ExportArticlesDocument,
                variables: {
                  skip: skip,
                },
              })
              resolve(response)
            } catch (error) {
              reject(error)
            }
          }, 200)
        }
      )

      if (data?.articles.length) {
        data.articles.forEach((item) => {
          const docId = item.slug
          idMapping[docId] = docId

          const aliases = [item.title, ...item.alias]
          aliases.forEach((alias) => {
            idMapping[alias] = docId
          })
        })

        skip += data.articles.length
      } else {
        hasMore = false
      }
    }

    // Reset variables for second pass
    skip = 0
    hasMore = true
    let documents: any = []

    // Second pass: Process the documents
    while (hasMore) {
      const { data }: { data: ExportArticlesQuery } = await new Promise(
        (resolve, reject) => {
          setTimeout(async () => {
            try {
              const response = await client.query({
                query: ExportArticlesDocument,
                variables: {
                  skip: skip,
                },
              })
              resolve(response)
            } catch (error) {
              reject(error)
            }
          }, 200)
        }
      )

      if (data?.articles.length) {
        data.articles.forEach(async (item) => {
          let markdown = htmlToText(item.content?.html as string, {
            wordwrap: false,
          })

          markdown = markdown.replace(/\\\[\[(.*?)\\\]\]/g, '[[$1]]')

          archive.append(markdown, {
            name: `${item.title}.md`,
          })

          const doc = {
            id: item.slug,
            text: markdown,
            metadata: {
              slug: item.slug,
              aliases: item.alias,
              category: item.category,
              links: extractLinks(markdown, idMapping),
            },
          }

          // uncomment this to send all data to Fauna
          // await faunaClient.query(
          //   q.Create(q.Collection('articles'), { data: doc })
          // )

          await fetch('http://localhost:3001/api/retrieval/ingest', { method: 'POST', body: JSON.stringify(doc) })

          documents.push(doc)
        })

        skip += data.articles.length
      } else {
        hasMore = false
      }
    }

    archive.finalize()
  }
}
