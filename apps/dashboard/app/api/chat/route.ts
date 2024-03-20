import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { getChats } from "@/app/server";

export const runtime = "edge";

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
