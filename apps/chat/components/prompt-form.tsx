import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import { Button, buttonVariants } from '@novecirculos/design'
import { IconArrowElbow, IconPlus, IconSpinner } from '@/components/ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@novecirculos/design'
import { useRouter } from 'next/navigation'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { cn } from '@/lib/utils'
import { Extension } from '@tiptap/core'
import { NodeHtmlMarkdown } from 'node-html-markdown'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
}: PromptProps) {
  const router = useRouter()

  const CustomEnter = Extension.create({
    addKeyboardShortcuts() {
      return {
        'Shift-Enter': ({ editor }) => {
          editor.commands.enter()
          return true
        },
      }
    },
  })

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ListItem,
      OrderedList,
      Link.configure({
        HTMLAttributes: {
          class: 'cursor-pointer text-secondary',
        },
      }),
      Placeholder.configure({
        placeholder: 'Escreva algo aqui...',
      }),
      CustomEnter,
    ],
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
    content: input,
    onUpdate: ({ editor }) => {
      const markdown = NodeHtmlMarkdown.translate(editor.getHTML())
      setInput(markdown)
    },
  })

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSubmit(input)
      editor?.commands.clearContent()
      setInput('')
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className="flex max-h-60 w-full grow flex-row overflow-hidden overflow-y-auto bg-white sm:rounded-md sm:border sm:px-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={(e) => {
                e.preventDefault()
                router.refresh()
                router.push('/')
              }}
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'sticky top-4 h-8 w-8 min-w-[2rem] rounded-full bg-white p-0',
              )}
            >
              <IconPlus />
              <span className="sr-only">Nova conversa</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>Nova conversa</TooltipContent>
        </Tooltip>
        <EditorContent
          onKeyDown={handleKeyDown}
          className="prose prose-h1:mt-2 dark:prose-invert min-h-[60px] w-full resize-none border-none bg-transparent px-4 outline-none focus-within:outline-none focus:ring-0 sm:py-1 sm:text-sm"
          editor={editor}
        />
        <div className="sticky top-3 h-min">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input}
                onClick={() => {
                  if (input?.trim()) {
                    onSubmit(input).then(() => {
                      editor?.commands.clearContent()
                      setInput('')
                    })
                  }
                }}
              >
                {isLoading ? <IconSpinner /> : <IconArrowElbow />}
                <span className="sr-only">Enviar mensagem</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Enviar mensagem</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
