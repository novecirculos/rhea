"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { type Chat } from "@/lib/types";
import { Message } from "ai";
import { Client, query as q } from "faunadb";
import { FaunaChat } from "./chat-actions.types";
import { supabaseClient as supabase } from "@/lib/utils";

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
    title,
    createdAt,
    userId, // Note: Ensure your Supabase table uses "user_id" or adjust accordingly
    path,
    messages: JSON.stringify(messages), // Storing messages as JSON string
    sharePath: null, // Note: Ensure your Supabase table uses "share_path" or adjust accordingly
  };

  revalidatePath("/");

  const { data, error } = await supabase
    .from("chats") // Ensure your table name is 'chats' or adjust accordingly
    .insert([chat]);

  if (error) {
    return { error: error.message };
  }

  return data;
}
export async function updateChat(id: string, messagesWithResponse: Message[]) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const { data: chat, error: chatError } = await supabase
    .from("chats") // Ensure your table name is 'chats' or adjust accordingly
    .select("*") // Adjust according to the fields you need
    .eq("id", id) // Ensure your column name is 'id' or adjust accordingly
    .single();

  if (chatError || !chat) {
    return { error: chatError ? chatError.message : "Chat not found" };
  }

  if (chat.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  const { error: updateError } = await supabase
    .from("chats")
    .update({ messages: messagesWithResponse }) // Ensure your column name is 'messages' or adjust accordingly
    .match({ id: id });

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/");
  return { ...chat, messages: messagesWithResponse };
}

export async function getChats(userId?: string | null) {
  if (!userId) return [];

  const { data: chats, error } = await supabase
    .from("chats")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return chats;
}

export async function getChat(id: string, userId: string) {
  try {
    const { data: chat, error } = await supabase
      .from("chats") // Ensure your table name is 'chats' or adjust accordingly
      .select("*") // Adjust according to the fields you need
      .eq("id", id) // Ensure your column name is 'id' or adjust accordingly
      .eq("userId", userId) // Ensure your column name is 'userId' or adjust accordingly
      .single();

    if (error) throw new Error(error.message);

    return { ...chat, messages: JSON.parse(chat.messages) };
  } catch (e) {
    return null;
  }
}
export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  const { data: chat, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !chat) {
    return { error: error ? error.message : "Chat not found" };
  }

  if (chat.userId !== session.user.id) {
    return { error: "Unauthorized" };
  }

  const { error: deleteError } = await supabase
    .from("chats")
    .delete()
    .match({ id: id });

  if (deleteError) {
    return { error: deleteError.message };
  }

  revalidatePath("/");
  return redirect("/");
}

export async function clearChats() {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    };
  }

  const { error } = await supabase
    .from("chats")
    .delete()
    .eq("userId", session.user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return redirect("/");
}

export async function getSharedChat(id: string) {
  const { data: chat, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !chat) {
    return null;
  }

  return chat.sharePath
    ? { ...chat, messages: JSON.parse(chat.messages) }
    : null;
}

export async function shareChat(chat: Chat) {
  const session = await auth();

  if (!session?.user?.id || session.user.id !== chat.userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { error, data: updatedChat } = await supabase
    .from("chats")
    .update({ sharePath: `/share/${chat.id}` })
    .match({ id: chat.id })
    .select("*");

  if (error) {
    return { error: error.message };
  }

  return updatedChat[0];
}
