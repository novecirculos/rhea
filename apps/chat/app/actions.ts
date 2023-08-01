'use server'

import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'
import { Message } from 'ai'

export async function createChat(id: string, messages: Message[]) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  const userId = session.user.id
  const title = messages[0].content.substring(0, 100)
  const createdAt = new Date().toISOString()
  const path = `/chat/${id}`

  const chat = {
    id,
    title,
    createdAt,
    userId,
    path,
    messages,
    sharePath: null,
  }

  await sql`
    INSERT INTO chats (id, chat, userId, createdAt) VALUES
    (${id}, ${chat as any}, ${session.user.id}, ${createdAt})
  `
}

export async function updateChat(id: string, messagesWithResponse: Message[]) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  const results = await sql` 
  SELECT * FROM chats 
    WHERE id = ${id} 
  AND userId = ${session.user.id}`

  const [chatRow] = results.rows

  if (chatRow.chat.userId !== session.user.id) {
    return {
      error: 'Unauthorized',
    }
  }

  const payload = {
    ...chatRow.chat,
    messages: messagesWithResponse,
  }

  await sql`
  UPDATE chats SET chat = ${payload as any} WHERE id = ${id}
  `

  return payload
}

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }

  try {
    const results = await sql`
      SELECT chat FROM chats WHERE userId = ${userId} ORDER BY createdAt DESC
    `

    const chats = results.rows.map((row) => row.chat)

    return chats as Chat[]
  } catch (error) {
    return []
  }
}

// Equivalent to the `getChat` function:
export async function getChat(id: string, userId: string) {
  const results = await sql`
  SELECT * FROM chats WHERE id = ${id} AND userId = ${userId}
`

  const [chatRow] = results.rows

  return chatRow ? chatRow.chat : null
}

// Equivalent to the `removeChat` function:
export async function removeChat({ id, path }: { id: string; path: string }) {
  const session = await auth()

  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }
  const results = await sql`
  SELECT * FROM chats WHERE id = ${id}
`

  const [chatRow] = results.rows

  if (chatRow.chat.userId !== session?.user?.id) {
    return {
      error: 'Unauthorized',
    }
  }

  await sql`
    DELETE FROM chats WHERE id = ${id}
  `

  revalidatePath('/')
  return revalidatePath(path)
}

// Equivalent to the `clearChats` function:
export async function clearChats() {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: 'Unauthorized',
    }
  }

  await sql`
    DELETE FROM chats WHERE userId = ${session.user.id}
  `

  revalidatePath('/')
  return redirect('/')
}

// Equivalent to the `getSharedChat` function:
export async function getSharedChat(id: string) {
  const results = await sql`
  SELECT * FROM chats WHERE id = ${id}
`
  const [chatRow] = results.rows

  return chatRow.chat.sharePath ? chatRow.chat : null
}

export async function shareChat(chat: Chat) {
  const session = await auth()

  if (!session?.user?.id || session.user.id !== chat.userId) {
    return {
      error: 'Unauthorized',
    }
  }

  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`,
  }

  await sql`
  UPDATE chats SET chat = ${payload as any} WHERE id = ${chat.id}
  `

  return payload
}
