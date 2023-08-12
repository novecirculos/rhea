import { AIMessage, HumanMessage } from 'langchain/schema'
import { BufferMemory, ChatMessageHistory } from 'langchain/memory'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

export const getChatMessages = (history: ChatMessage[]) => {
  return history.map((message) =>
    message.role === 'user'
      ? new HumanMessage(message.content)
      : new AIMessage(message.content),
  )
}

export const extractLastQuestion = (messages: ChatMessage[]) => {
  const question =
    messages.length > 0 ? messages[messages.length - 1].content : ''
  const previousMessages = messages.slice(0, messages.length - 1)

  return { question, previousMessages }
}

export const getMemory = (messages: ChatMessage[]) => {
  const { question, previousMessages } = extractLastQuestion(messages)

  const messageHistory = getChatMessages(previousMessages)

  const memory = new BufferMemory({
    memoryKey: 'chat_history',
    inputKey: 'input',
    outputKey: 'output',
    chatHistory: new ChatMessageHistory(messageHistory),
  })

  return { memory, question }
}
