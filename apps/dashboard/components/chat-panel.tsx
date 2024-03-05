import { type UseChatHelpers } from 'ai/react'

import { Button, Checkbox, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Label, PopoverContent, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Textarea } from '@novecirculos/design'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconEdit, IconRefresh, IconStop, IconUser } from '@/components/ui/icons'
import { FooterText } from './footer'
import { Popover, PopoverTrigger } from '@novecirculos/design'
import { useState } from 'react'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'

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
  modelName: string
  setModelName: (modelName: string) => void
  toggledCategories: string[]
  setToggledCategories: (categories: string[]) => void
  systemPrompt: string
  setSystemPrompt: (prompt: string) => void
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
  modelName,
  setModelName,
  setToggledCategories,
  toggledCategories,
  setSystemPrompt,
  systemPrompt,
}: ChatPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [newSystemPrompt, setNewSystemPrompt] = useState(systemPrompt)
  const modelOptions = [
    { modelName: "claude-3-opus-20240229", label: "Claude 3 Opus" },
    { modelName: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
    { modelName: "gpt-4", label: "GPT4" },
    { modelName: "gpt-4-turbo-preview", label: "GPT4-Turbo" },
    { modelName: "gpt-3.5-turbo-16k", label: "GPT3.5-Turbo" },
  ];

  const categories: Record<string, string> = {
    'Contexto Base': 'base-context',
    'Divindades': 'divindades',
    'Personagens': 'personagens',
    'Lugares': 'lugares',
    'Eventos': 'eventos',
    'Objetos': 'objetos',
    'Relações': 'relações',
    'Transcrições': 'transcrições',
  }

  const toggleCategory = (category: string) => {
    if (toggledCategories.includes(category)) {
      setToggledCategories(toggledCategories.filter((c) => c !== category))
    } else {
      setToggledCategories([...toggledCategories, category])
    }
  }

  return (
    <div className="from-muted/10 to-muted/30 dark:from-foreground/10 dark:to-foreground/30 fixed inset-x-0 bottom-0 bg-gradient-to-b from-10% to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
              >
                <IconEdit className="mr-2" />
                Editar contexto
              </Button>
            </PopoverTrigger>
            <PopoverContent side='left'>
              <Select defaultValue={modelName} onValueChange={setModelName}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="Selecione um modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modelos</SelectLabel>
                    {modelOptions.map(model => (
                      <SelectItem
                        onClick={() => setModelName(model.modelName)}
                        key={model.modelName}
                        value={model.modelName}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <ul className="p-1 space-y-2 mt-2">
                {Object.keys(categories).map((category) =>
                  <li onClick={() => toggleCategory(categories[category])} key={category}
                    className="inline-flex hover:cursor-pointer flex-1 w-full text-md items-center gap-1">
                    <Checkbox checked={toggledCategories.includes(categories[category])} /> <span>{category}</span>
                  </li>
                )}
              </ul>
            </PopoverContent>
          </Popover>
          {isLoading ? (
            <Button
              variant="outline"
              className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg  dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
              onClick={() => stop()}
            >
              <IconStop className="mr-2" />
              Parar
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                onClick={() => reload()}
              >
                <IconRefresh className="mr-2" />
                Refazer resposta
              </Button>
            )
          )}
          <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                onClick={() => setDialogOpen(true)}
              >
                <IconUser className="mr-2" />
                Editar system prompt
              </Button>
            </DialogTrigger>
            <DialogContent className="md:max-w-[800px] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Editar system prompt</DialogTitle>
                <DialogDescription>
                  Faça as mudanças no prompt do sistema aqui.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 items-center gap-4">
                  <Label htmlFor="name" className="text-left">
                    Prompt
                  </Label>
                  <Textarea
                    value={newSystemPrompt}
                    onChange={e => setNewSystemPrompt(e.target.value)}
                    defaultValue={systemPrompt}
                    id="system_prompt"
                    className="col-span-1 text-left h-96" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  setSystemPrompt(newSystemPrompt)
                  setDialogOpen(false)
                }} type="submit">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="space-y-4 border-t bg-white px-4 py-2 shadow-lg dark:border-gray-950 dark:bg-gray-800 sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: 'user',
                data: {
                  modelName,
                  systemPrompt
                }
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
