"use server";

import { kv } from "@vercel/kv";

export const getContext = async (chatId: string) => {
  const context = await kv.get(`context-${chatId}`);

  return context;
};
