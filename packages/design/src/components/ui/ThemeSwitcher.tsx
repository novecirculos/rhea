'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@novecirculos/context'

import { Button } from './Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu'

export const ThemeSwitcher = () => {
  const [, setTheme] = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="group" variant="ghost" size="icon">
          <Sun className="dark:text-accent h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-gray-950 transition-all group-hover:text-gray-950 dark:-rotate-90 dark:scale-0" />
          <Moon className="dark:text-accent absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-gray-950 transition-all  group-hover:text-gray-950 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('light')}
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => setTheme('dark')}
        >
          Escuro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
