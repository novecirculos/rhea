import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const metadata = formData.get("metadata");

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "File is required and must be a file type." },
      { status: 400 },
    );
  }

  try {
    // Use the Blob.text() method to read the file content as text
    const text = await file.text();

    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    await SupabaseVectorStore.fromTexts(
      [text],
      [metadata ? JSON.parse(metadata as string) : {}],
      new OpenAIEmbeddings(),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      },
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
