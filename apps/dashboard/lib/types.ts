import { type Message } from 'ai'

export interface FaunaRef {
  '@ref': {
    id: number
    collection: {
      '@ref': {
        id: string
        collection: { '@ref': { id: string } }
      }
    }
  }
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>
