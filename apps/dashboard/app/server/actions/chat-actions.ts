"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { type Chat } from "@/lib/types";
import { Message } from "ai";
import { Client, query as q } from "faunadb";
import { FaunaChat } from "./chat-actions.types";

const faunaClient = new Client({
  secret: process.env.FAUNADB_SECRET as string,
});

export async function createChat(id: string, messages: Message[]) {
  const session = await auth();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const userId = session.user.id;
  const title = messages[0].content.substring(0, 100);
  const createdAt = new Date().toISOString();
  const path = `/chat/${id}`;

  const chat = {
    id,
    title,
    createdAt,
    userId,
    path,
    messages,
    sharePath: null,
  };

  revalidatePath("/chat");

  await faunaClient.query(q.Create(q.Collection("chats"), { data: chat }));
}

export async function updateChat(id: string, messagesWithResponse: Message[]) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const chat = await faunaClient.query<FaunaChat>(
    q.Get(q.Match(q.Index("chat_by_data_id"), id)),
  );

  if (!chat || chat.data.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }
  // Construct the payload using chat.data
  const payload = {
    ...chat.data,
    messages: messagesWithResponse,
  };

  await faunaClient.query(q.Update(chat.ref, { data: payload }));
  revalidatePath("/chat");
  return payload;
}

export async function getChats(userId?: string | null) {
  if (!userId) return [];

  const chats = await faunaClient.query<FaunaChat>(
    q.Map(
      q.Paginate(q.Match(q.Index("chats_by_user"), userId)),
      q.Lambda("X", q.Get(q.Var("X"))),
    ),
  );

  const formattedChats = chats.data.map((chat: FaunaChat) => ({
    ...chat.data,
  }));

  revalidatePath("/chat");
  return formattedChats;
}

export async function getChat(id: string, userId: string) {
  try {
    const chatRow = await faunaClient.query<FaunaChat>(
      q.Get(q.Match(q.Index("chat_by_id_and_user"), id, userId)),
    );

    return chatRow.data;
  } catch (e) {
    return null;
  }
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const chat = await faunaClient.query<FaunaChat>(
    q.Get(q.Match(q.Index("chat_by_data_id"), id)),
  );

  if (!chat || chat.data.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  await faunaClient.query(q.Delete(chat.ref));

  revalidatePath("/");
  return revalidatePath(path);
}

export async function clearChats() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  await faunaClient.query<FaunaChat>(
    q.Map(
      q.Paginate(q.Match(q.Index("chats_by_user"), session.user.id)),
      q.Lambda("chatRef", q.Delete(q.Var("chatRef"))),
    ),
  );

  revalidatePath("/");
  return redirect("/");
}

export async function getSharedChat(id: string) {
  const result = await faunaClient.query<FaunaChat>(
    q.Get(q.Match(q.Index("chat_by_data_id"), id)),
  );

  return result.data.sharePath ? result.data : null;
}

export async function shareChat(chat: Chat) {
  const session = await auth();

  if (!session?.user?.id || session.user.id !== chat.userId) {
    return {
      error: "Unauthorized",
    };
  }

  const chatDoc = await faunaClient.query<FaunaChat>(
    q.Get(q.Match(q.Index("chat_by_data_id"), chat.id)),
  );

  if (!chatDoc || chatDoc.data.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  const payload = {
    ...chatDoc.data,
    sharePath: `/share/${chat.id}`,
  };

  const updatedChat = await faunaClient.query<FaunaChat>(
    q.Update(chatDoc.ref, {
      data: payload,
    }),
  );

  return updatedChat.data;
}
