import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { formatDate } from '@/lib/utils'
import { getSharedChat } from '@/app/server/chat-actions'
import { ChatList } from '@/components/chat-list'

export const runtime = 'edge'

export const preferredRegion = 'home'

interface SharePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: SharePageProps): Promise<Metadata> {
  const chat = await getSharedChat(params.id)

  return {
    title: chat?.title.slice(0, 50) ?? 'Chat',
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id)

  if (!chat || !chat?.sharePath) {
    notFound()
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="bg-background dark:bg-foreground border-b px-4 py-6 dark:border-gray-800 md:px-6 md:py-8">
        <div className="mx-auto max-w-2xl md:px-6">
          <div className="space-y-1 md:-mx-8">
            <h1 className="text-2xl font-bold dark:text-gray-50">
              {chat.title}
            </h1>
            <div className="text-muted-foreground text-sm">
              {formatDate(chat.createdAt)} · {chat.messages.length} mensagens
            </div>
          </div>
        </div>
      </div>
      <ChatList messages={chat.messages} />
    </div>
  )
}