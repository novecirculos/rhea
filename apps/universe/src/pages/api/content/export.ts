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

    // Create a new archiver instance
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })

    // Set the headers for the download
    res.setHeader('Content-Disposition', 'attachment; filename=articles.zip')
    res.setHeader('Content-Type', 'application/zip')

    // Pipe archive data to the response
    archive.pipe(res)

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
          }, 200) // Adjusted delay for 5 requests per second
        }
      )

      if (data?.articles.length) {
        // Loop over the data and convert it to Markdown
        const markdownPromises = data.articles.map(async (item) => {
          let markdown = htmlToText(item.content?.html as string, {
            wordwrap: false,
          })
          // Replace escaped double square brackets
          markdown = markdown.replace(/\\\[\[(.*?)\\\]\]/g, '[[$1]]')

          // Append the markdown data to the archive
          archive.append(markdown, {
            name: `${item.title}.md`,
          })
        })

        await Promise.all(markdownPromises)

        skip += data.articles.length
      } else {
        hasMore = false
      }
    }

    // Finalize the archive (this will end the response)
    archive.finalize()
  }
}
