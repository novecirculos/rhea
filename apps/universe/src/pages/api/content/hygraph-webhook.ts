import type { NextApiRequest, NextApiResponse } from 'next'
import { astToHtmlString } from '@graphcms/rich-text-html-renderer'
import { htmlToText } from 'html-to-text'
import { extractLinks } from '~/utils/extractLinks'
import { Client, query as q } from 'faunadb'

interface FaunaArticle {
  ref: {}
  id: string
  text: string
  metadata: {
    aliases: string[]
    category: string
    created_at: string
    links: { name: string; id: string }[]
    universeDate: string
  }
}

const faunaClient = new Client({ secret: process.env.FAUNADB_SECRET as string })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let token

    if (req.headers.authorization) {
      ;[, token] = req.headers.authorization.split('Bearer ')
    }

    if (!token || token !== process.env.PLUGIN_BEARER_TOKEN) {
      res.status(401).json({ error: 'Token not provided, or invalid' })
      return
    }

    const { data } = req.body

    const html = astToHtmlString({
      content: data.content.json,
    })

    let markdown = htmlToText(html as string, {
      wordwrap: false,
    })

    markdown = markdown.replace(/\\\[\[(.*?)\\\]\]/g, '[[$1]]')

    const docId = data.slug
    const idMapping: Record<string, string> = { [docId]: docId }

    const aliases = [data.title, ...data.alias]
    aliases.forEach((alias) => {
      idMapping[alias] = docId
    })

    const doc = {
      id: data.slug,
      text: markdown,
      metadata: {
        aliases: data.alias,
        category: data.category,
        created_at: data.createdAt,
        links: extractLinks(markdown, idMapping),
        universeDate: data.universeDate,
      },
    }

    try {
      const document = await faunaClient.query<FaunaArticle>(
        q.Match(q.Index('get_article_by_id'), data.slug)
      )

      if (document) {
        await faunaClient.query(
          q.Update(document.ref, {
            data: doc,
          })
        )
      } else {
        await faunaClient.query(
          q.Create(q.Collection('articles'), {
            data: doc,
          })
        )
      }

      res.status(200).json({ message: 'Webhook processed successfully.' })
    } catch (error) {
      console.error(`Error in FaunaDB query: ${error}`)
      res
        .status(500)
        .json({ error: 'An error occurred while processing the webhook.' })
    }
  } else {
    res.status(405).json({ error: 'Invalid request method' })
  }
}
