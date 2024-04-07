import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { THEOBALD_ASSISTANT_TEMPLATE } from "./TheobaldPrompts";
import { ChatAnthropic } from "@langchain/anthropic";
import { supabaseClient } from "@/lib/utils";

export class TheobaldChainRepository {
  private modelName: string;

  constructor(modelName: string) {
    this.modelName = modelName;
  }

  public async getVectorStore() {
    return new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client: supabaseClient,
      tableName: "documents",
      queryName: "match_documents",
    });
  }

  public getChatModel() {
    const model = this.modelName.includes("claude")
      ? new ChatAnthropic({
          anthropicApiKey: process.env.ANTHROPIC_API_KEY!,
          temperature: 0.2,
          modelName: this.modelName,
        })
      : new ChatOpenAI({
          openAIApiKey: process.env.OPENAI_API_KEY!,
          temperature: 0.2,
          modelName: this.modelName,
        });

    return model;
  }

  public getPromptTemplate() {
    return PromptTemplate.fromTemplate(THEOBALD_ASSISTANT_TEMPLATE);
  }

  public getRunnableSequence() {
    const prompt = this.getPromptTemplate();
    const model = this.getChatModel();
    const outputParser = new HttpResponseOutputParser();

    return RunnableSequence.from([prompt, model, outputParser]);
  }
}
