import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate, PromptTemplate } from "@langchain/core/prompts";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  namesTable,
  namesTableSchema,
  personalityTraitsTable,
  physicalTraitsTable,
} from "@/app/server/chains/npc_generator/data";
import {
  NamesTable,
  RaceGenderNames,
} from "@/app/server/chains/npc_generator/types";
import { roll1d6TwiceAndJoin, supabaseClient } from "@/lib/utils";
import { ChatAnthropic } from "@langchain/anthropic";
import { BuilderModelTemplate, StreamingModelTemplate } from "./prompts";
import MersenneTwister from "mersenne-twister";

export class NpcGeneratorChainRepository {
  private modelName: string;
  private generator: MersenneTwister;

  constructor(modelName: string) {
    this.modelName = modelName;
    this.generator = new MersenneTwister();
  }

  public async getStreamingModel() {
    const streamingModelPrompt = ChatPromptTemplate.fromTemplate(
      StreamingModelTemplate,
    );
    const streamingModel = this.modelName.includes("claude")
      ? new ChatAnthropic({
          anthropicApiKey: process.env.ANTHROPIC_API_KEY,
          temperature: 0.2,
          modelName: this.modelName,
        })
      : new ChatOpenAI({
          openAIApiKey: process.env.OPENAI_API_KEY,
          temperature: 0.2,
          modelName: this.modelName,
        });

    return { streamingModel, streamingModelPrompt };
  }

  public async getBuilderModel() {
    const builderModelPrompt =
      PromptTemplate.fromTemplate(BuilderModelTemplate);
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

    return { builderModel: functionCallingModel, builderModelPrompt };
  }

  public async getVectorStore() {
    return new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    });
  }

  public generatePersonalityAndPhysicalProperties() {
    const combinations = new Set<string>();
    while (combinations.size < 4) {
      const traitRoll = Math.floor(this.generator.random() * 20) + 1;
      const physicalRoll = Math.floor(this.generator.random() * 20) + 1;
      const personalityColumnRoll = Math.floor(this.generator.random() * 4) + 1;
      const physicalColumnRoll = Math.floor(this.generator.random() * 4) + 1;
      const key = `${traitRoll}-${physicalRoll}-${personalityColumnRoll}-${physicalColumnRoll}`;
      combinations.add(key);
    }

    return Array.from(combinations)
      .map((comb) => comb.split("-").map(Number))
      .map(
        ([
          traitRoll,
          physicalRoll,
          personalityColumnRoll,
          physicalColumnRoll,
        ]) => ({
          traitRoll,
          physicalRoll,
          personalityColumnRoll,
          physicalColumnRoll,
          personalityTrait:
            personalityTraitsTable[traitRoll][personalityColumnRoll],
          physicalTrait: physicalTraitsTable[physicalRoll][physicalColumnRoll],
        }),
      );
  }

  public getNameByRaceAndGender(
    race: keyof NamesTable,
    gender: keyof RaceGenderNames,
    rollPrefix: number,
    rollSuffix: number,
  ): { name: string; prefix: string; suffix: string } {
    const { prefix } = namesTable[race][gender][rollPrefix];
    const { suffix } = namesTable[race][gender][rollSuffix];

    if (!prefix || !suffix) {
      throw new Error("Name entry not found");
    }
    return {
      name: `${prefix}${suffix}`,
      prefix,
      suffix,
    };
  }

  public async generateName(
    race: keyof NamesTable,
    gender: keyof RaceGenderNames,
  ): Promise<{
    name: string;
    rolls: {
      preffix: string;
      suffix: string;
      value: number;
    }[];
  }> {
    const [firstNameRoll, secondNameRoll] = roll1d6TwiceAndJoin().map(Number);
    const [firstSurNameRoll, secondSurNameRoll] =
      roll1d6TwiceAndJoin().map(Number);

    const { name, prefix, suffix } = this.getNameByRaceAndGender(
      race,
      gender,
      firstNameRoll,
      secondNameRoll,
    );
    const {
      name: surName,
      prefix: surNamePreffix,
      suffix: surnameSuffix,
    } = this.getNameByRaceAndGender(
      race,
      gender,
      firstSurNameRoll,
      secondSurNameRoll,
    );

    return {
      name: `${name} ${surName}`,
      rolls: [
        {
          preffix: prefix,
          suffix,
          value: firstNameRoll,
        },
        {
          preffix: surNamePreffix,
          suffix: surnameSuffix,
          value: firstSurNameRoll,
        },
      ],
    };
  }
}
