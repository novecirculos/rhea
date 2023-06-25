import { NextApiResponse } from 'next'
import { withFileUpload } from 'next-multiparty'
import { promises as fsPromises } from 'fs'

import { Readable } from 'stream'
import { openai } from '~/services/openai'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default withFileUpload(async (req: any, res: NextApiResponse) => {
  const file = req.file

  if (!file) {
    res.status(400).send('No file uploaded')
    return
  }

  const audioBuffer = await fsPromises.readFile(file.filepath)
  const audioReadStream = Readable.from(audioBuffer) as any

  audioReadStream.path = file.originalFilename

  try {
    const transcription = await openai.createTranscription(
      audioReadStream as any,
      'whisper-1',
      undefined,
      'verbose_json',
      undefined,
      undefined,
      {
        maxBodyLength: Infinity,
      }
    )

    res.status(200).json({ text: transcription.data.text })
  } catch (error: any) {
    console.log(error.response)
    res.status(500).json({
      error: 'OpenAI error',
    })
  }
})
