import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse } from "ai";
import { getMemory } from "@/lib/langchain";
import { kv } from "@vercel/kv";
import { auth } from "@/auth";
import { TheobaldChainRepository } from "@/app/server/chains/";

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = (await auth())?.user.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, messages = [], modelName = "claude-3-opus-20240229" } = body;
    const { memory, question } = getMemory(messages);

    const theobaldChainRepo = new TheobaldChainRepository(modelName);
    const vectorStore = await theobaldChainRepo.getVectorStore();
    const context = await vectorStore.similaritySearch(question);
    const chatHistory = await memory.chatHistory.getMessages();
    const chain = theobaldChainRepo.getRunnableSequence();

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
        "X-Context-Id": `context-${id}`,
      },
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
