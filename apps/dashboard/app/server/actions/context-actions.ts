"use server";

import { kv } from "@vercel/kv";

export interface CachedArticle {
  id: string;
  content: string;
}

export const getContext = async (chatId: string) => {
  const context = await kv.get(`context-${chatId}`);

  if (!context) {
    return [];
  }

  if (typeof context === "string") {
    return JSON.parse(context);
  }

  return context as CachedArticle[];
};
