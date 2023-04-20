import { Button } from '@novecirculos/react'
import { Text } from '@novecirculos/react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Home() {
  const { user } = useUser()

  console.log(user)

  return (
    <div className="mx-auto my-auto flex max-w-xl flex-col items-center justify-center gap-2">
      <Text as="h1" size="4xl">
        Bem vindo!
      </Text>
      <Link className="w-full" href="/articles">
        <Button className="w-full flex-1">Ler artigos</Button>
      </Link>
      <hr />
      <span>Ou</span>
      <Link className="w-full" href="/api/auth/login">
        <Button className="w-full flex-1" variant="secondary">
          Login
        </Button>
      </Link>
    </div>
  )
}
