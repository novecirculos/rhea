import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Call transcript
    // Generate scripts
    // Generate image prompts
    // Generate Images
    // Persist the scene name and all the images using @vercel/postgres
    // Create a video with the audio and the images and send an email
  }
}
