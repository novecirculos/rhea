'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { type Chat } from '@/lib/types'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@novecirculos/design'
import { IconMessage, IconUsers } from '@/components/ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '@novecirculos/design'

interface SidebarItemProps {
  path: string
  title: string
}

export function SidebarItem({ path, title }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <div className="group relative">
      <Link
        href={path}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          ' w-full pl-8 pr-16',
          isActive && 'bg-accent dark:hover:text-background dark:bg-gray-800',
        )}
      >
        <div
          className="relative max-h-5 flex-1 select-none overflow-hidden text-ellipsis break-all"
          title={title}
        >
          <span className="whitespace-nowrap">{title}</span>
        </div>
      </Link>
    </div>
  )
}
