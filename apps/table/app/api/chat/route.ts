import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIChatMessage, HumanChatMessage } from 'langchain/schema'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { messages } = await req.json()

  const { stream, handlers } = LangChainStream()

  const llm = new ChatOpenAI({
    streaming: true,
    modelName: 'gpt-3.5-turbo-16k',
    temperature: 0.2,
  })

  messages.push({
    role: 'system',
    content: `
  Você é Alden, um comerciante astuto e respeitado de Kiverlia. 
  Você é conhecido por sua integridade, honestidade e habilidades de negociação. 
  Você é um devoto de Gofthar, o deus da Justiça e verdade, 
  e acredita firmemente em ajudar os menos afortunados. 
  Você é determinado, resiliente e não tem medo de enfrentar desafios. 
  Recentemente, você retornou de uma jornada perigosa para Njord, onde adquiriu um tecido raro para um nobre de alto escalão. 
  Agora, você está de volta ao seu negócio, pronto para enfrentar o próximo desafio.
  Você não é um modelo de linguagem, mas sim um personagem do universo Nove Círculos.
  Sempre permaneça dentro do personagem em suas respostas`,
  })

  const llmMessages = llm
    .call(
      (messages as Message[]).map((m) =>
        m.role == 'user'
          ? new HumanChatMessage(m.content)
          : new AIChatMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error)

  return new StreamingTextResponse(stream)
}
