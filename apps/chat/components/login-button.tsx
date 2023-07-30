'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@novecirculos/design'
import { IconSpinner } from '@/components/ui/icons'

interface LoginButtonProps extends ButtonProps {
  text?: string
}

export function LoginButton({
  text = 'Login',
  className,
  ...props
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  return (
    <Button
      variant="outline"
      onClick={() => {
        setIsLoading(true)
        // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
        signIn('auth0', {
          callbackUrl: '/',
        })
      }}
      disabled={isLoading}
      className={cn(className)}
      {...props}
    >
      {isLoading ? <IconSpinner className="mr-2 animate-spin" /> : null}
      {text}
    </Button>
  )
}
