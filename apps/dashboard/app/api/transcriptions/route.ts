import { getTranscriptions } from "@/app/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const transcriptions = await getTranscriptions();

  return NextResponse.json({
    transcriptions,
  });
}
