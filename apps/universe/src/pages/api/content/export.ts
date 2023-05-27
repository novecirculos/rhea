import type { NextApiRequest, NextApiResponse } from 'next'
import archiver from 'archiver'
import { htmlToText } from 'html-to-text'
import { getUserRoles } from '~/utils/auth0'
import nookies from 'nookies'
import {
  ExportArticlesDocument,
  client,
  ExportArticlesQuery,
} from '@novecirculos/graphql'
import axios from 'axios'

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

    const documents: any = []

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
              created_at: item.createdAt,
            },
          }

          documents.push(doc)
        })

        skip += data.articles.length
      } else {
        hasMore = false
      }
    }

    await axios
      .post(
        'https://biblioteca-espiral.fly.dev/upsert',
        {
          documents,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.PLUGIN_BEARER_TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.error(`Error in axios post: ${error}`)
      })

    archive.finalize()
  }
}
