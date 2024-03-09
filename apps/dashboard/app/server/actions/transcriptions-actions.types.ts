import { FaunaRef } from '@/lib/types'

export interface FaunaTranscription {
  ref: FaunaRef
  data: Transcription
}

export interface Transcription {
  id: number
  filename: string
  text: string
}
