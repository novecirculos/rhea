import { StreamingTextResponse, LangChainStream } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { auth } from '@/auth'
import { ChatGPTPluginRetriever } from 'langchain/retrievers/remote'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'
import { getMemory } from '@/lib/langchain'
import { createChat, getChats, updateChat } from '@/app/server/actions'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages, id } = await req.json()
  const { memory, question } = getMemory(messages) // TODO: handle memory through a database like redis

  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  const { stream, handlers } = LangChainStream({
    onCompletion: async (fullResponse) => {
      const messagesWithResponse = [
        ...messages,
        {
          content: fullResponse,
          role: 'assistant',
        },
      ]

      const existingChat = messages.length > 1

      if (existingChat) {
        await updateChat(id, messagesWithResponse)
        return
      }

      await createChat(id, messagesWithResponse)
    },
  })

  // Customize the prompt to your needs
  const template = `
  You are a chatbot helping humans with their questions. Related to a fantasy universe called "Nove Círculos".
  You should always answers using the language: pt-BR
  
  {context}
  
  Human: {question}
  Assistant:
  `

  const prompt = new PromptTemplate({
    template,
    inputVariables: ['question', 'context'],
  })

  const streamingModel = new ChatOpenAI({
    streaming: true,
    modelName: 'gpt-3.5-turbo-16k',
    callbacks: [handlers],
  })

  const nonStreamingModel = new ChatOpenAI({
    modelName: 'gpt-4',
  })

  const retriever = new ChatGPTPluginRetriever({
    url: 'https://biblioteca-espiral.fly.dev/query',
    auth: {
      bearer: process.env.PLUGIN_BEARER_TOKEN as string,
    },
    topK: 10,
  })

  const CONDENSE_QUESTION_TEMPLATE = `
  Given the following conversation and a follow up input, if it is a question rephrase it to be a standalone question.
  If it is not a question, just summarize the message.
  
  Chat history:
  {chat_history}
  Follow up input: {question}
  Standalone input:
  `

  const chain = ConversationalRetrievalQAChain.fromLLM(
    streamingModel,
    retriever,
    {
      memory,
      returnSourceDocuments: true,
      qaChainOptions: {
        type: 'stuff',
        prompt: prompt,
      },
      questionGeneratorChainOptions: {
        llm: nonStreamingModel,
        template: CONDENSE_QUESTION_TEMPLATE,
      },
    },
  )

  chain.call({ question })

  return new StreamingTextResponse(stream)
}

export async function GET(req: Request) {
  const userId = req.headers.get('userId')

  if (!userId) {
    return NextResponse.json({
      chats: null,
    })
  }

  const chats = await getChats(userId)

  return NextResponse.json({
    chats,
  })
}
