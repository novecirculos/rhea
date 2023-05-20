import { NextApiRequest, NextApiResponse } from 'next'
import { Midjourney } from 'midjourney'

const midjourney = new Midjourney({
  ServerId: <string>process.env.DISCORD_SERVER_ID,
  ChannelId: <string>process.env.DISCORD_CHANNEL_ID,
  SalaiToken: <string>process.env.DISCORD_SALAI_TOKEN,
  Debug: process.env.NODE_ENV === 'development' ? true : false,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { prompt } = req.body

    try {
      const message = await midjourney.Imagine(prompt)

      if (message) {
        const upscaledImage = await midjourney.Upscale(
          message?.content,
          2,
          message?.id,
          message?.hash
        )

        return res.status(200).json({
          image: upscaledImage?.uri,
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        error: 'Error during image generation',
      })
    }
  }
}
