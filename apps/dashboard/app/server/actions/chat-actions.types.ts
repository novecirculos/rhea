import { Chat, FaunaRef } from '@/lib/types'

export interface FaunaChat {
  ref: FaunaRef
  ts: number
  data: Chat
}
