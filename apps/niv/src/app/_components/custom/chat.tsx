"use client";

import { Attachment, Message as MessageType } from "ai";
import { useChat } from "ai/react";
import { useState } from "react";

import { Message } from "~/app/_components/custom/message";
import { useScrollToBottom } from "~/app/_components/custom/use-scroll-to-bottom";

import { MultimodalInput } from "./multimodal-input";

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: Array<MessageType>;
}) {
  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      body: { id },
      initialMessages,
    });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  return (
    <div className="flex h-full w-full flex-row justify-center bg-background pb-4 md:pb-8">
      <div className="flex flex-grow flex-col justify-between gap-4">
        <div
          ref={messagesContainerRef}
          className="no-scrollbar flex flex-col gap-4 overflow-y-auto"
        >
          {messages.map((message) => (
            <Message
              key={message.id}
              role={message.role}
              content={message.content}
              attachments={message.experimental_attachments}
              toolInvocations={message.toolInvocations}
            />
          ))}

          <div
            ref={messagesEndRef}
            className="min-h-[24px] min-w-[24px] shrink-0"
          />
        </div>

        <form className="relative flex w-full flex-row items-end gap-2 px-4 md:px-0">
          <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            append={append}
          />
        </form>
      </div>
    </div>
  );
}
