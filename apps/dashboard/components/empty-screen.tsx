"use client";
import { UseChatHelpers } from "ai/react";

import { Button } from "@novecirculos/design";
import { IconArrowRight } from "@/components/ui/icons";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/utils";
import Link from "next/link";
import { Chat } from "@/lib/types";

const exampleMessages = [
  {
    heading: "Jogar um jogo",
    message: `Vamos jogar um jogo! Você será o mestre da minha aventura`,
  },
  {
    heading: "Criar descrições para arte generativa",
    message:
      "Você deve criar um prompt para midjourney baseado em: a mage with a beautiful mustache, illusionist, magic\n",
  },
  {
    heading: "Produzir conteúdo",
    message: `Você será meu assistente para escrever a história de um personagem que nasceu no reino de Kiverlia \n`,
  },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const data = await fetcher("api/chat", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        } as Record<string, string>,
      });

      return data as { chats: Chat[] };
    },
  });

  console.log(data?.chats);

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
          Ultimos chats:
        </p>
        <section className="mt-4 flex flex-col items-start space-y-2">
          {data?.chats.map((chat, index) => (
            <Link
              href={`/chat/${chat.id}`}
              key={index}
              className="flex items-center text-primary dark:text-secondary h-auto p-0 text-base"
            >
              <IconArrowRight className="text-muted-foreground mr-2" />
              {chat.title}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
