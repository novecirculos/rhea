import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { astToHtmlString } from '@graphcms/rich-text-html-renderer'
import { htmlToText } from 'html-to-text'

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
    }

    const { data } = req.body

    const html = astToHtmlString({
      content: data.content.json,
    })

    let markdown = htmlToText(html as string, {
      wordwrap: false,
    })

    const doc = {
      id: data.slug,
      text: markdown,
      metadata: {
        source: 'hygraph',
        created_at: data.createdAt,
      },
    }

    markdown = markdown.replace(/\\\[\[(.*?)\\\]\]/g, '[[$1]]')

    const documents = [doc]

    try {
      await axios.post(
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
      res.status(200).json({ message: 'Webhook processed successfully.' })
    } catch (error) {
      console.error(`Error in axios post: ${error}`)
      res
        .status(500)
        .json({ error: 'An error occurred while processing the webhook.' })
    }
  } else {
    res.status(405).json({ error: 'Invalid request method' })
  }
}