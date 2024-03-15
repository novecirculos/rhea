import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse, Message as VercelChatMessage } from "ai";

import { ChatAnthropic } from "@langchain/anthropic";
import {
  ChatPromptTemplate,
  PromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import {
  HttpResponseOutputParser,
  JsonOutputFunctionsParser,
} from "langchain/output_parsers";

import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { extractLastQuestion } from "@/lib/langchain";
import { RunnableSequence } from "@langchain/core/runnables";

import { auth } from "@/auth";
import {
  BuilderModelTemplate,
  StreamingModelTemplate,
  namesTable,
  getNameByRaceAndGender,
  personalityTraitsTable,
  physicalTraitsTable,
} from "@/app/server/chains/npc_generator";
import {
  convertVercelMessageToLangChainMessage,
  roll1d6TwiceAndJoin,
} from "@/lib/utils";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import MersenneTwister from "mersenne-twister";
import { createChat, getChat, getChats, updateChat } from "@/app/server";
import { kv } from "@vercel/kv";
import { BufferMemory } from "langchain/memory";

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
    const userId = (await auth())?.user.id;
    const generator = new MersenneTwister();

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

    const { id, modelName = "gpt-4-turbo-preview" } = body;

    const { question } = extractLastQuestion(body.messages);

    const namesTableSchema = z.object({
      gender: z.enum(["Male", "Female"]),
      race: z.enum(["Human", "Elf", "Dwarf", "Halfling", "HalfElf", "Gnome"]),
    });

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

    const streamingModelPrompt = ChatPromptTemplate.fromTemplate(
      StreamingModelTemplate,
    );

    const builderModelPrompt =
      PromptTemplate.fromTemplate(BuilderModelTemplate);

    const streamingModel = modelName.includes("claude")
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

    const builderModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.2,
      modelName: "gpt-3.5-turbo-1106",
    });

    const functionCallingModel = builderModel.bind({
      functions: [
        {
          name: "get_npc_basic_info",
          description: "It must identify the gender and name on the input",
          parameters: zodToJsonSchema(namesTableSchema),
        },
      ],
      function_call: { name: "get_npc_basic_info" },
    });

    const streamingChain = RunnableSequence.from([
      streamingModelPrompt,
      streamingModel,
      new HttpResponseOutputParser(),
    ]);

    const formatNameChain = builderModelPrompt
      .pipe(functionCallingModel)
      .pipe(new JsonOutputFunctionsParser());

    const [firstNameRoll, secondNameRoll] = roll1d6TwiceAndJoin();
    const [firstSurNameRoll, secondSurNameRoll] = roll1d6TwiceAndJoin();

    const {
      race,
      gender,
    }: {
      race: keyof typeof namesTable;
      gender: keyof (typeof namesTable)[typeof race];
    } = await formatNameChain.invoke({
      input: question,
    });

    const name = `${getNameByRaceAndGender(race, gender, firstNameRoll, secondNameRoll)} `;
    const surName = `${getNameByRaceAndGender(race, gender, firstSurNameRoll, secondSurNameRoll)}`;

    const personalityAndPhysicalProperties = (() => {
      const combinations = new Set<string>();
      while (combinations.size < 4) {
        const traitRoll = Math.floor(generator.random() * 20) + 1;
        const physicalRoll = Math.floor(generator.random() * 20) + 1;
        const personalityColumnRoll = Math.floor(generator.random() * 4) + 1;
        const physicalColumnRoll = Math.floor(generator.random() * 4) + 1;
        const key = `${traitRoll}-${physicalRoll}-${personalityColumnRoll}-${physicalColumnRoll}`;
        combinations.add(key);
      }

      const uniqueCombinations = Array.from(combinations).map((comb) =>
        comb.split("-").map(Number),
      );

      return uniqueCombinations.map(
        ([
          traitRoll,
          physicalRoll,
          personalityColumnRoll,
          physicalColumnRoll,
        ]) => ({
          personalityColumnRoll,
          personalityTrait:
            personalityTraitsTable[traitRoll][personalityColumnRoll],
          traitRoll,
          physicalTrait: physicalTraitsTable[physicalRoll][physicalColumnRoll],
          physicalColumnRoll,
        }),
      );
    })();

    const stream = await streamingChain.stream({
      npc_name: `${name} ${surName}`,
      input: question,
      context: context.map((doc) => doc.pageContent).join("\n"),
      personality_and_physical_properties: JSON.stringify(
        personalityAndPhysicalProperties,
      ),
      name_rolls: JSON.stringify([
        firstNameRoll,
        secondNameRoll,
        firstSurNameRoll,
        secondSurNameRoll,
      ]),
    });

    const contextData = JSON.stringify(
      context.map((doc) => ({
        id: doc.metadata.slug,
        content: doc.pageContent,
      })),
    );

    await kv.set(`context-${id}`, contextData);
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
