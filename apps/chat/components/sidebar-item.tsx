'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@novecirculos/design'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@novecirculos/design'

interface SidebarItemProps {
  chat: Chat
  children: React.ReactNode
}

export function SidebarItem({ chat, children }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === chat.path

  if (!chat?.id) return null

  return (
    <div className="group relative">
      <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center">
        {chat.sharePath ? (
          <Tooltip delayDuration={1000}>
            <TooltipTrigger
              tabIndex={-1}
              className="focus:bg-muted dark:focus:bg-foreground focus:ring-ring focus:ring-1"
            >
              <IconUsers
                className={`dark:text-background mr-2 transition-all ${
                  !isActive ? 'dark:group-hover:text-gray-950' : null
                } `}
              />
            </TooltipTrigger>
            <TooltipContent>Essa é uma conversa compartilhada</TooltipContent>
          </Tooltip>
        ) : (
          <IconMessage
            className={`dark:text-background mr-2 transition-all ${
              !isActive ? 'dark:group-hover:text-gray-950' : null
            }`}
          />
        )}
      </div>
      <Link
        href={chat.path}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          ' w-full pl-8 pr-16',
          isActive && 'bg-accent dark:hover:text-background dark:bg-gray-800',
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={chat.title}
        >
          <span className="whitespace-nowrap">{chat.title}</span>
        </div>
      </Link>
      {isActive && <div className="absolute right-2 top-2">{children}</div>}
    </div>
  )
}
