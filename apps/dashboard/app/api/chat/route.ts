import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatAnthropic } from "@langchain/anthropic";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { getChats } from "@/app/server/chat-actions";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { template } from "@/lib/langchain";

export const runtime = "edge";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};


/**
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const messages = body.messages ?? [];
    const modelName = body.modelName ?? "claude-3-opus-20240229";
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const vectorStore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: "documents",
      queryName: "match_documents",
    });

    const baseContext = await vectorStore.similaritySearch('', 10, {
      category: "base-context",
    })

    const TEMPLATE = template({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
      context: baseContext.map(doc => doc.pageContent).join("\n"),
      system_prompt: body.systemPrompt,
    });
    
    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const model = modelName.includes('claude') ? new ChatAnthropic({
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      temperature: 0.4,
      modelName,
    }) : new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.4,
      modelName,
    });
    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */
    const outputParser = new HttpResponseOutputParser();
    const chain = prompt.pipe(model).pipe(outputParser)

    const stream = await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
      context: baseContext.map(doc => doc.pageContent).join("\n"),
    });

    return new StreamingTextResponse(stream);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}

export async function GET(req: Request) {
  const userId = req.headers.get('userId')

  if (!userId) {
    return NextResponse.json({
      chats: null,
    })
  }

  const chats = await getChats(userId)

  return NextResponse.json({
    chats,
  })
}