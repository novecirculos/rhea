'use client'

import Image from 'next/image'
import { type Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Button } from '@novecirculos/design'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@novecirculos/design'
import { IconExternalLink } from '@/components/ui/icons'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            {user?.image ? (
              <Image
                className="h-6 w-6 select-none rounded-full ring-1 ring-zinc-100/10 transition-opacity duration-300 hover:opacity-80"
                src={user?.image ? `${user.image}` : ''}
                alt={user.name ?? 'Avatar'}
                width={24}
                height={24}
              />
            ) : (
              <div className="bg-muted/50 text-muted-foreground flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full text-xs font-medium uppercase">
                {user?.name ? getUserInitials(user?.name) : null}
              </div>
            )}
            <span className="ml-2">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">{user?.name}</div>
            <div className="text-xs text-zinc-500">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="https://universo.novecirculos.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-between text-xs hover:cursor-pointer"
            >
              Informações do universo
              <IconExternalLink className="ml-auto h-3 w-3" />
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
            className="text-xs hover:cursor-pointer"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}