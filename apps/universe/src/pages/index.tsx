import { getSession } from '@auth0/nextjs-auth0'
import { Button } from '@novecirculos/design'

import { GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import nookies from 'nookies'

export default function Home({ user }: any) {
  return (
    <div className="mx-auto my-auto flex max-w-xl flex-col items-center justify-center gap-2">
      <Link className="w-full" href="/articles">
        <Button className="w-full flex-1">Ler artigos</Button>
      </Link>
      <hr />
      <span>Ou</span>
      {user ? (
        <Link className="w-full" href="/api/auth/logout">
          <Button className="w-full flex-1" variant="secondary">
            Logout
          </Button>
        </Link>
      ) : (
        <Link className="w-full" href="/api/auth/login">
          <Button className="w-full flex-1" variant="secondary">
            Login
          </Button>
        </Link>
      )}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context.req, context.res)

  nookies.set(context, '@auth0/user-sub', session?.user.sub)

  return {
    props: {
      user: session?.user || null,
    },
  }
}
