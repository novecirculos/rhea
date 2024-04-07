"use client";

import { useChat, type Message } from "ai/react";

import { cn, fetcher } from "@/lib/utils";
import { ChatList } from "@/components/chat-list";
import { ChatPanel } from "@/components/chat-panel";
import { EmptyScreen } from "@/components/empty-screen";
import { ChatScrollAnchor } from "@/components/chat-scroll-anchor";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { THEOBALD_ASSISTANT_TEMPLATE } from "@/app/server/chains";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
  rolls: any;
}

export function Chat({ id, initialMessages, className, rolls }: ChatProps) {
  const [modelName, setModelName] = useLocalStorage<string>(
    "@novecirculos/model-name",
    "claude-3-opus-20240229",
  );
  const [toggledCategories, setToggledCategories] = useLocalStorage<string[]>(
    "@novecirculos/context-categories",
    [],
  );
  const [systemPrompt, setSystemPrompt] = useLocalStorage<{
    content: string;
    endpoint: string;
  }>("@novecirculos/system-prompt", {
    content: THEOBALD_ASSISTANT_TEMPLATE,
    endpoint: "chat/assistants/theobald",
  });

  const [streamingFinished, setStreamingFinished] = useState(false);

  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages,
      id,
      api: `/api/${systemPrompt.endpoint}`,
      body: {
        id,
        modelName,
        rolls,
      },
      async onResponse(response) {
        setStreamingFinished(false);
        if (response.status === 401 || response.status === 500) {
          toast.error(response.statusText);
        }
      },
      async onFinish(message) {
        setStreamingFinished(true);
      },
    });

  const { data, isLoading: persistanceLoading } = useQuery({
    queryKey: ["persist", id],
    enabled: messages.length >= 2 && streamingFinished,
    queryFn: async () => {
      await fetcher("/api/chat/persist", {
        method: messages.length === 2 ? "POST" : "PATCH",
        body: JSON.stringify({
          id,
          messages: [...messages],
        }),
      });
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
        rolls={rolls}
      />
    </>
  );
}
