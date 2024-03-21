import { clsx, type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import { Message as VercelChatMessage } from "ai";
import { HumanMessage, AIMessage, ChatMessage } from "@langchain/core/messages";
import { createClient } from "@supabase/supabase-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const api = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api`
  : `http://localhost:${process.env.PORT ?? 3000}/api`;

export const engineApi = process.env.ENGINE_URL
  ? `https://${process.env.ENGINE_URL}/api`
  : `http://localhost:8000`;

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("pt-BR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

export const roll1d6TwiceAndJoin = (): number[] => {
  const roll1 = generateRandomNumber(1, 6); // 1d6
  const roll2 = generateRandomNumber(1, 6); // 1d6
  return [Number(roll1), Number(roll2)];
};

export const generateUniqueRandomNumbers = (
  min: number,
  max: number,
  count: number,
) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return [...numbers];
};

export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const convertVercelMessageToLangChainMessage = (
  message: VercelChatMessage,
) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};
