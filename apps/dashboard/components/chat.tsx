"use client";

import { useChat, type Message } from "ai/react";

import { cn } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { EmptyScreen } from "@/components/empty-screen";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const [modelName, setModelName] = useLocalStorage<string>(
    "@novecirculos/model-name",
    "claude-3-opus-20240229",
  );
  const [toggledCategories, setToggledCategories] = useLocalStorage<string[]>(
    "@novecirculos/context-categories",
    [],
  );
  const [systemPrompt, setSystemPrompt] = useLocalStorage<string>(
    "@novecirculos/system-prompt",
    "Você é Teobaldo, um ajudante de escrita. Sua principal tarefa é expandir e criar conteúdo sobre um universo de fantasia chamado Nove Círculos. Você deve ser prestativo e colaborativo, sempre sugerindo 3 novas ideias de prompt no fim de cada resposta, para que o usuário possa prosseguir no assunto. Antes de responder ao prompt, respire fundo e defina um foco preciso para a resposta. Se você não sabe sobre uma informação, não invente, apenas diga que não sabe.Utilize sintaxe markdown em suas respostas",
  );

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      api: "/api/chat/npc_generator",
      body: {
        id,
        modelName,
        systemPrompt,
      },
      onResponse(response) {
        if (response.status === 401 || response.status === 500) {
          toast.error(response.statusText);
        }
      },
    });
  return (
    <>
      <div className={cn("pb-[200px] pt-4 md:pt-10", className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        modelName={modelName}
        setModelName={setModelName}
        toggledCategories={toggledCategories}
        setToggledCategories={setToggledCategories}
        systemPrompt={systemPrompt}
        setSystemPrompt={setSystemPrompt}
      />
    </>
  );
}
