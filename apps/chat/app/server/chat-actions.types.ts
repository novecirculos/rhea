import { Chat } from '@/lib/types'

interface Ref {
  '@ref': {
    collection: {
      '@ref': {
        id: string
      }
    }
    id: string
  }
}

export interface FaunaChat {
  ref: Ref
  ts: number
  data: Chat
}
