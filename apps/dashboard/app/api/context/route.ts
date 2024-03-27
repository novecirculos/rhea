import { getContext } from "@/app/server/actions/context-actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const chatId = new URL(req.url as string).searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json({
      context: null,
    });
  }

  const context = await getContext(chatId);

  return NextResponse.json({
    context: JSON.parse(context as string),
  });
}
