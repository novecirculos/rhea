import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatAnthropic } from "@langchain/anthropic";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { createChat, getChat, getChats, updateChat } from "@/app/server/";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { getMemory } from "@/lib/langchain";
import { kv } from "@vercel/kv";
import { auth } from "@/auth";
import { TeobaldoTemplate } from "@/app/server/chains";

export const runtime = "edge";

/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id, messages = [], modelName = "claude-3-opus-20240229" } = body;

    const { memory, question } = getMemory(messages);

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: "documents",
      queryName: "match_documents",
    });

    const context = await vectorStore.similaritySearch(question);

    const chatHistory = await memory.chatHistory.getMessages();

    const prompt = PromptTemplate.fromTemplate(TeobaldoTemplate);

    const model = modelName.includes("claude")
      ? new ChatAnthropic({
          anthropicApiKey: process.env.ANTHROPIC_API_KEY,
          temperature: 0.2,
          modelName,
        })
      : new ChatOpenAI({
          openAIApiKey: process.env.OPENAI_API_KEY,
          temperature: 0.2,
          modelName,
        });
    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new HttpResponseOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
      chat_history: chatHistory.map((message) => message.content).join("\n"),
      input: question,
      context: context.map((doc) => doc.pageContent).join("\n"),
    });

    const contextData = JSON.stringify(
      context.map((doc) => ({
        id: doc.metadata.slug,
        content: doc.pageContent,
      })),
    );

    await kv.set(`context-${id}`, JSON.stringify(contextData));

    return new StreamingTextResponse(stream, {
      headers: {
        "X-Context-Id": `context-${body.id}`,
      },
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}

export async function GET(req: Request) {
  const userId = (await auth())?.user.id;

  if (!userId) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const chats = await getChats(userId);

  return NextResponse.json({
    chats,
  });
}