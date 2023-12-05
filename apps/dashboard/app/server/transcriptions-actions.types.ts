import { FaunaRef } from '@/lib/types'

export interface FaunaTranscription {
  ref: FaunaRef
  data: Transcription
}

export interface Transcription {
  id: number
  title: string
  content: string
}
