import { NextRequest, NextResponse } from "next/server";
import { StreamingTextResponse } from "ai";

import { ChatAnthropic } from "@langchain/anthropic";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  HttpResponseOutputParser,
  JsonOutputFunctionsParser,
} from "langchain/output_parsers";
import { createChat, getChat, getChats, updateChat } from "@/app/server/";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { getMemory } from "@/lib/langchain";
import { kv } from "@vercel/kv";
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
  generateRandomNumber,
  generateUniqueRandomNumbers,
  roll1d6TwiceAndJoin,
} from "@/lib/utils";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

    const { id, messages = [], modelName = "claude-3-opus-20240229" } = body;

    const { memory, question } = getMemory(messages);

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

    const streamingModelPrompt = PromptTemplate.fromTemplate(
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
    /**
     * Chat models stream message chunks rather than bytes, so this
     * output parser handles serialization and byte-encoding.
     */

    const functionCallingModel = builderModel.bind({
      functions: [
        {
          name: "get_npc_basic_info",
          description:
            "It must identify the gender and name on the input, will receive four numbers that must be matched inside the table.",
          parameters: zodToJsonSchema(namesTableSchema),
        },
      ],
      function_call: { name: "get_npc_basic_info" },
    });

    const outputParser = new HttpResponseOutputParser();

    const chain = streamingModelPrompt.pipe(streamingModel).pipe(outputParser);

    const personalityColumns = generateUniqueRandomNumbers(1, 4, 3) as string[];
    const physicalColumns = generateUniqueRandomNumbers(1, 4, 3) as string[];

    const personalityAndPhysicalProperties = Array.from({ length: 4 }).map(
      (_, i) => {
        const [traitRoll, physicalRoll] = generateUniqueRandomNumbers(
          1,
          20,
          2,
        ) as number[];
        const [personalityColumnRoll, physicalColumnRoll] =
          generateUniqueRandomNumbers(1, 2, 3) as number[];

        return {
          column: personalityColumnRoll,
          personalityTrait:
            personalityTraitsTable[traitRoll - 1][personalityColumnRoll],
          traitRoll: traitRoll,
          physicalTrait:
            physicalTraitsTable[physicalColumnRoll - 1][physicalRoll],
          physicalColumnRoll,
        };
      },
    );

    console.log(personalityAndPhysicalProperties);

    const rolls = {
      personalityColumn1: personalityColumns[0], // 1d4, unique
      personalityRoll1: String(generateRandomNumber(1, 20)), // 1d20
      personalityColumn2: personalityColumns[1], // 1d4, unique
      personalityRoll2: String(generateRandomNumber(1, 20)), // 1d20
      personalityColumn3: personalityColumns[2], // 1d4, unique
      personalityRoll3: String(generateRandomNumber(1, 20)), // 1d20
      physicalColumn1: physicalColumns[0], // 1d4, unique
      physicalRoll1: String(generateRandomNumber(1, 20)), // 1d20
      physicalColumn2: physicalColumns[1], // 1d4, unique
      physicalRoll2: String(generateRandomNumber(1, 20)), // 1d20
      physicalColumn3: physicalColumns[2], // 1d4, unique
      physicalRoll3: String(generateRandomNumber(1, 20)),
    };

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

    const stream = await chain.stream({
      ...rolls,
      npc_name: `${name} ${surName}`,
      input: question,
      context: context.map((doc) => doc.pageContent).join("\n"),
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

    await kv.set(`context-${id}`, JSON.stringify(contextData));

    const messagesWithResponse = [
      ...messages,
      {
        content: question, // Assuming this should be the response or handled accordingly
        role: "assistant",
      },
    ];

    const existingChat = await getChat(id, userId);

    if (existingChat) {
      await updateChat(id, messagesWithResponse);
    } else {
      await createChat(id, messagesWithResponse);
    }

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
