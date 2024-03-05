import { AIMessage, HumanMessage } from 'langchain/schema'
import { BufferMemory, ChatMessageHistory } from 'langchain/memory'
import { Message as VercelChatMessage } from "ai";
import { Document } from "@langchain/core/documents";

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

export const combineDocumentsFn = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join("\n\n");
};

export const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    } else if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    } else {
      return `${message.role}: ${message.content}`;
    }
  });
  return formattedDialogueTurns.join("\n");
};

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


export const template = ({ 
  chat_history,
  system_prompt,
  context,
  input }: { system_prompt: string, chat_history: string, context: string, input: string }) => `${system_prompt} 

  <chat_history>
  ${chat_history}
  </chat_history>

<context>
  ${context}
</context>

User: ${input}
AI:`