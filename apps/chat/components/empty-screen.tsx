import { UseChatHelpers } from 'ai/react'

import { Button } from '@novecirculos/design'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Jogar um jogo',
    message: `Vamos jogar um jogo! Você será o mestre da minha aventura`,
  },
  {
    heading: 'Criar descrições para arte generativa',
    message:
      'Você deve criar um prompt para midjourney baseado em: a mage with a beautiful mustache, illusionist, magic\n',
  },
  {
    heading: 'Produzir conteúdo',
    message: `Você será meu assistente para escrever a história de um personagem que nasceu no reino de Kiverlia \n`,
  },
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-white p-8 shadow dark:border-gray-950 dark:bg-gray-800">
        <h1 className="mb-2 text-lg font-semibold dark:text-gray-50">
          Seja bem vindo(a) aos Nove Círculos
        </h1>
        <p className="text-muted-foreground mb-2 leading-normal dark:text-gray-400">
          Esse é um espaço para criar e se imergir nesse universo de fantasia.
        </p>
        <p className="text-muted-foreground leading-normal  dark:text-gray-400">
          Você pode começar uma conversa com os seguintes tópicos:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="text-primary dark:text-secondary h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="text-muted-foreground mr-2" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
