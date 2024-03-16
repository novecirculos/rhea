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
import init, {
  roll_dice,
  roll_multiple_dices,
} from "@packages/dice_roller/pkg/";

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

  public async generatePersonalityAndPhysicalProperties() {
    await init();

    const diceConfigurations = [
      { sides: 20, times: 4, identifier: "trait_rolls", uniqueness: true },
      { sides: 20, times: 4, identifier: "physical_rolls", uniqueness: true },
      {
        sides: 4,
        times: 4,
        identifier: "personality_column_rolls",
        uniqueness: true,
      },
      {
        sides: 4,
        times: 4,
        identifier: "physical_column_rolls",
        uniqueness: true,
      },
    ];
    const rollResultsMap = roll_multiple_dices(diceConfigurations);

    const traitRolls = rollResultsMap.get("trait_rolls") as number[];
    const physicalRolls = rollResultsMap.get("physical_rolls") as number[];
    const personalityColumnRolls = rollResultsMap.get(
      "personality_column_rolls",
    ) as number[];
    const physicalColumnRolls = rollResultsMap.get(
      "physical_column_rolls",
    ) as number[];

    const properties = traitRolls.map((traitRoll, i) => ({
      traitRoll,
      physicalRoll: physicalRolls[i],
      personalityColumnRoll: personalityColumnRolls[i],
      physicalColumnRoll: physicalColumnRolls[i],
      personalityTrait:
        personalityTraitsTable[traitRoll][personalityColumnRolls[i]],
      physicalTrait:
        physicalTraitsTable[physicalRolls[i]][physicalColumnRolls[i]],
    }));

    return properties;
  }

  public getNameByRaceAndGender(
    race: keyof NamesTable,
    gender: keyof RaceGenderNames,
    rollPrefix: number,
    rollSuffix: number,
  ): string {
    const { prefix } = namesTable[race][gender][rollPrefix];
    const { suffix } = namesTable[race][gender][rollSuffix];

    if (!prefix || !suffix) {
      throw new Error("Name entry not found");
    }
    return `${prefix}${suffix}`;
  }

  public async generateName(
    race: keyof NamesTable,
    gender: keyof RaceGenderNames,
  ): Promise<{
    name: string;
    rolls: number[];
  }> {
    const [firstNameRoll, secondNameRoll] = roll1d6TwiceAndJoin().map(Number);
    const [firstSurNameRoll, secondSurNameRoll] =
      roll1d6TwiceAndJoin().map(Number);

    const name = this.getNameByRaceAndGender(
      race,
      gender,
      firstNameRoll,
      secondNameRoll,
    );
    const surName = this.getNameByRaceAndGender(
      race,
      gender,
      firstSurNameRoll,
      secondSurNameRoll,
    );

    return {
      name: `${name} ${surName}`,
      rolls: [
        firstNameRoll,
        secondNameRoll,
        firstSurNameRoll,
        secondSurNameRoll,
      ],
    };
  }
}
