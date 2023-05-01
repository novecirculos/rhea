// pages/api/content/normalizeAst.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { html } = req.body
      const astContent = await htmlToSlateAST(html)
      res.status(200).json(astContent)
    } catch (error) {
      res
        .status(500)
        .json({ error: 'An error occurred while converting HTML to AST' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
