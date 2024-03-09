import { Article } from "./articles-actions.types";
import { createClient } from "@supabase/supabase-js";

export async function getArticles(): Promise<Article[]> {
  try {
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    const { data, error } = await client
      .from("documents")
      .select("id, content, metadata");

    return data as Article[];
  } catch (error) {
    console.error("Error fetching all scenes:", error);
    return [];
  }
}

export async function getArticle(id: number) {
  try {
    //tbd
  } catch (error) {
    console.error("Error fetching the scene:", error);
    // tbd
  }
}
