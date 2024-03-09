import { getContext } from "@/app/server/actions/context-actions";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
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
