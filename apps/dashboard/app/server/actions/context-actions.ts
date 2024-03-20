"use server";

import { kv } from "@vercel/kv";

export interface CachedArticle {
  id: string;
  content: string;
}

export interface CachedContext {
  context: CachedArticle[];
  name_rolls: number[];
  personality_and_physical_properties: {
    personalityTrait: string;
    physicalTrait: string;
    traitRoll: number;
    physicalRoll: number;
    personalityColumnRoll: number;
    physicalColumnRoll: number;
  }[];
}

export const getContext = async (chatId: string) => {
  const context = await kv.get(`context-${chatId}`);

  if (!context) {
    return [];
  }

  if (typeof context === "string") {
    return JSON.parse(context);
  }

  return context as CachedContext[];
};
