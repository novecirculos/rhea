'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'
import Link from 'next/link'

interface LoginButtonProps extends ButtonProps {
  showGithubIcon?: boolean
  text?: string
}

export function LoginButton({
  text = 'Faça login',
  showGithubIcon = true,
  className,
  ...props
}: LoginButtonProps) {
  return (
    <Link href="/api/auth/login">
      <Button variant="outline" className={cn(className)} {...props}>
        {text}
      </Button>
    </Link>
  )
}
