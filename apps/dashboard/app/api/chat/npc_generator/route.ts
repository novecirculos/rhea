import { NextRequest, NextResponse } from "next/server";
import { RunnableSequence } from "@langchain/core/runnables";
import {
  HttpResponseOutputParser,
  JsonOutputFunctionsParser,
} from "langchain/output_parsers";
import { auth } from "@/auth";
import { NpcGeneratorChainRepository } from "@/app/server/chains/npc_generator";
import { getChats } from "@/app/server";
import { kv } from "@vercel/kv";
import { extractLastQuestion } from "@/lib/langchain";
import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = (await auth())?.user.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, modelName } = body;
    const { question } = extractLastQuestion(body.messages);

    const npcGeneratorChainRepo = new NpcGeneratorChainRepository(modelName);

    const vectorStore = await npcGeneratorChainRepo.getVectorStore();
    const context = await vectorStore.similaritySearch(question);

    const { streamingModel, streamingModelPrompt } =
      await npcGeneratorChainRepo.getStreamingModel();
    const { builderModel, builderModelPrompt } =
      await npcGeneratorChainRepo.getBuilderModel();

    const streamingChain = RunnableSequence.from([
      streamingModelPrompt,
      streamingModel,
      new HttpResponseOutputParser(),
    ]);

    const formatNameChain = builderModelPrompt
      .pipe(builderModel)
      .pipe(new JsonOutputFunctionsParser());

    const { race, gender } = await formatNameChain.invoke({ input: question });

    const { name, rolls: name_rolls } =
      await npcGeneratorChainRepo.generateName(race, gender);

    const personalityAndPhysicalProperties =
      npcGeneratorChainRepo.generatePersonalityAndPhysicalProperties();

    const stream = await streamingChain.stream({
      npc_name: name,
      input: question,
      context: context.map((doc) => doc.pageContent).join("\n"),
      personality_and_physical_properties: JSON.stringify(
        personalityAndPhysicalProperties,
      ),
      name_rolls: JSON.stringify(name_rolls),
    });

    const contextData = JSON.stringify(
      context.map((doc) => ({
        id: doc.metadata.slug,
        content: doc.pageContent,
      })),
    );

    await kv.set(`context-${id}`, contextData);

    return new StreamingTextResponse(stream, {
      headers: { "X-Context-Id": `context-${id}` },
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}

export async function GET(req: NextRequest) {
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
