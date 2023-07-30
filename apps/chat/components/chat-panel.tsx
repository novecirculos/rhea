import { type UseChatHelpers } from 'ai/react'

import { Button } from '@novecirculos/design'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from './footer'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  return (
    <div className="from-muted/10 to-muted/30 fixed inset-x-0 bottom-0 bg-gradient-to-b from-10% to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              className="hover:border-primary mb-2 bg-white hover:bg-white/50"
              onClick={() => stop()}
            >
              <IconStop className="mr-2" />
              Parar
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                className="hover:border-primary mb-2 bg-white hover:bg-white/50"
                onClick={() => reload()}
              >
                <IconRefresh className="mr-2" />
                Refazer resposta
              </Button>
            )
          )}
        </div>
        <div className="space-y-4 border-t bg-white px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: 'user',
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}
