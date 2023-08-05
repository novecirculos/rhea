import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { clearChats, getChats } from '@/app/server/chat-actions'
import { Button, ThemeSwitcher, buttonVariants } from '@novecirculos/design'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import { IconBrandRed, IconSeparator } from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'

export async function Header() {
  const session = await auth()
  const chats = await getChats(session?.user?.id)

  return (
    <header className="from-background/10 via-background/50 dark:from-foreground sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b bg-gradient-to-b to-white/80 px-4 backdrop-blur-xl dark:border-gray-800 dark:to-gray-950">
      <div className="flex items-center">
        {session?.user ? (
          <Sidebar>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
              {/* @ts-ignore */}
              <SidebarList chats={chats} />
            </React.Suspense>
            <SidebarFooter>
              {chats.length ? <ClearHistory clearChats={clearChats} /> : null}
            </SidebarFooter>
          </Sidebar>
        ) : (
          <Link href="/" target="_blank" rel="nofollow">
            <IconBrandRed className="mr-2 h-6 w-6" />
          </Link>
        )}
        <div className="flex items-center">
          <IconSeparator className="text-muted-foreground/50 h-6 w-6 dark:text-gray-200" />
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button
              variant="link-primary"
              asChild
              className="text-primary-foreground -ml-2"
            >
              <Link href="/sign-in?callbackUrl=/">Login</Link>
            </Button>
          )}
        </div>
      </div>
      <ThemeSwitcher />
    </header>
  )
}
