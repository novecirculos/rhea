import { type UseChatHelpers } from "ai/react";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Label,
  PopoverContent,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
  Toggle,
} from "@novecirculos/design";
import { PromptForm } from "@/components/prompt-form";
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
import {
  IconEdit,
  IconRefresh,
  IconStop,
  IconUser,
} from "@/components/ui/icons";
import { FooterText } from "./footer";
import { Popover, PopoverTrigger } from "@novecirculos/design";
import { useCallback, useEffect, useState } from "react";
import { List } from "lucide-react";
import { ContextDialog } from "./context-dialog";
import {
  NPC_GENERATOR_TEMPLATE,
  THEOBALD_ASSISTANT_TEMPLATE,
  TABLE_GENERATOR_TEMPLATE,
} from "@/app/server/chains";
import init, { roll_multiple_dices } from "@novecirculos/dice_roller";
import { useQuery } from "@tanstack/react-query";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  modelName: string;
  setModelName: (modelName: string) => void;
  toggledCategories: string[];
  setToggledCategories: (categories: string[]) => void;
  systemPrompt: {
    content: string;
    endpoint: string;
  };
  setSystemPrompt: (prompt: { content: string; endpoint: string }) => void;
  rolls: string;
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
  rolls,
}: ChatPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contextDialogOpen, setContextDialogOpen] = useState(false);

  const [newSystemPrompt, setNewSystemPrompt] = useState(systemPrompt.content);
  const modelOptions = [
    { modelName: "claude-3-opus-20240229", label: "Claude 3 Opus" },
    { modelName: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
    { modelName: "gpt-4", label: "GPT4" },
    { modelName: "gpt-4-turbo-preview", label: "GPT4-Turbo" },
    { modelName: "gpt-3.5-turbo-16k", label: "GPT3.5-Turbo" },
  ];

  const categories: Record<string, string> = {
    "Contexto Base": "base-context",
    Divindades: "divindades",
    Personagens: "personagens",
    Lugares: "lugares",
    Eventos: "eventos",
    Objetos: "objetos",
    Relações: "relações",
    Transcrições: "transcrições",
  };

  const presetOptions = [
    {
      label: "Assistente de escrita",
      content: THEOBALD_ASSISTANT_TEMPLATE,
      endpoint: "chat/assistants/theobald",
    },
    {
      label: "Gerador de NPCS",
      content: NPC_GENERATOR_TEMPLATE,
      endpoint: "chat/generators/npc",
    },
    {
      label: "Gerador de Código",
      content: TABLE_GENERATOR_TEMPLATE,
      endpoint: "chat/generators/table",
    },
  ];

  const toggleCategory = (category: string) => {
    if (toggledCategories.includes(category)) {
      setToggledCategories(toggledCategories.filter((c) => c !== category));
    } else {
      setToggledCategories([...toggledCategories, category]);
    }
  };

  console.log(rolls);

  return (
    <div className="from-muted/10 to-muted/30 dark:from-foreground/10 dark:to-foreground/30 fixed inset-x-0 bottom-0 bg-gradient-to-b from-10% to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-between">
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
              <div className="flex gap-1">
                <ContextDialog
                  chatId={id}
                  onOpenChange={setContextDialogOpen}
                  open={contextDialogOpen}
                />
                <Button
                  variant="outline"
                  className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                  onClick={() => reload()}
                >
                  <IconRefresh className="mr-2" />
                  Refazer resposta
                </Button>
              </div>
            )
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
              >
                <List className="mr-1" /> Opções
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-48 flex flex-col p-4"
              align="start"
            >
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
                      Faça as mudanças no prompt do sistema aqui. Presets:
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-hidden after:mr-4 after:absolute relative after:top-0 after:right-0 after:bg-gradient-to-l after:from-gray-950 after:to-transparent after:h-full after:w-6 after:mt-1 px-4 -mx-4">
                    <div className="flex flex-row  no-scrollbar flex-nowrap overflow-x-auto gap-4 mt-2 pr-6 ">
                      {presetOptions.map((item) => (
                        <Button
                          className="min-w-max flex-none"
                          key={item.label}
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setSystemPrompt({
                              content: item.content,
                              endpoint: item.endpoint,
                            })
                          }
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                      <Label htmlFor="name" className="text-left">
                        Prompt
                      </Label>
                      <Textarea
                        readOnly
                        value={systemPrompt.content}
                        id="system_prompt"
                        className="col-span-1 text-left h-96 no-scrollbar"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setDialogOpen(false);
                      }}
                      type="submit"
                    >
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                <PopoverContent side="left">
                  <Select defaultValue={modelName} onValueChange={setModelName}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Modelos</SelectLabel>
                        {modelOptions.map((model) => (
                          <SelectItem
                            onClick={() => setModelName(model.modelName)}
                            key={model.modelName}
                            value={model.modelName}
                          >
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ul className="p-1 space-y-2 mt-2">
                    {Object.keys(categories).map((category) => (
                      <li
                        onClick={() => toggleCategory(categories[category])}
                        key={category}
                        className="inline-flex hover:cursor-pointer flex-1 w-full text-md items-center gap-1"
                      >
                        <Checkbox
                          checked={toggledCategories.includes(
                            categories[category],
                          )}
                        />{" "}
                        <span>{category}</span>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4 border-t bg-white px-4 py-2 shadow-lg dark:border-gray-950 dark:bg-gray-800 sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
                data: {
                  modelName,
                  systemPrompt,
                  rolls,
                },
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
