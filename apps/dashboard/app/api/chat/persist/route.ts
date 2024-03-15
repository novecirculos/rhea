import { createChat, updateChat } from "@/app/server";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages, id } = await req.json();
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

  const chat = await createChat(id, messages);

  return NextResponse.json({
    chat,
  });
}

export async function PATCH(req: Request) {
  const { messages, id } = await req.json();
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

  const chat = await updateChat(id, messages);

  return NextResponse.json({
    chat,
  });
}
