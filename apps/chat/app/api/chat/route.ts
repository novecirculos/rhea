import { kv } from '@vercel/kv'
import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'
import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const { stream, handlers } = LangChainStream({
    onCompletion: async (fullResponse) => {
      const title = messages[0].content.substring(0, 100)
      const id = messages.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: fullResponse,
            role: 'assistant',
          },
        ],
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`,
      })
    },
  })

  const llm = new ChatOpenAI({
    streaming: true,
  })

  llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error)

  return new StreamingTextResponse(stream)
}
