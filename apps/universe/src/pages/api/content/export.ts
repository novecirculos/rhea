import type { NextApiRequest, NextApiResponse } from 'next'
import { promisify } from 'util'
import fs from 'fs'
import archiver from 'archiver'
import path from 'path'
import { htmlToText } from 'html-to-text'
import { getUserRoles } from '~/utils/auth0'
import nookies from 'nookies'
import {
  ExportArticlesDocument,
  client,
  ExportArticlesQuery,
} from '@novecirculos/graphql'

const writeFile = promisify(fs.writeFile)
const __dirname = path.resolve('src', 'pages', 'api', 'content', 'data')

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

    // Ensure the directory exists
    fs.mkdirSync(`${__dirname}`, { recursive: true })

    let skip = 0
    let hasMore = true

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
          await writeFile(`${__dirname}/${item.title}.md`, markdown)
        })

        await Promise.all(markdownPromises)

        skip += data.articles.length
      } else {
        hasMore = false
      }
    }

    // Create a file to stream archive data to.
    const zipPath = `${__dirname}/articles-${new Date().toISOString()}.zip`
    const output = fs.createWriteStream(zipPath)
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Sets the compression level.
    })

    // Pipe archive data to the file
    archive.pipe(output)

    // Append all the .md files to the archive
    fs.readdirSync(`${__dirname}`).forEach((file) => {
      archive.append(fs.createReadStream(`${__dirname}/${file}`), {
        name: file,
      })
    })

    archive.on('error', function (err) {
      res.status(500).send({ error: err.message })
    })

    // On finish of zip file, send success response
    output.on('close', function () {
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + path.basename(zipPath)
      )
      res.setHeader('Content-Transfer-Encoding', 'binary')
      res.setHeader('Content-Type', 'application/octet-stream')

      const readStream = fs.createReadStream(zipPath)

      readStream.pipe(res)

      readStream.on('end', function () {
        // Delete all files and subdirectories in the data directory
        return fs.rmSync(`${__dirname}`, { recursive: true, force: true })
      })
    })

    await archive.finalize()
  }
}
