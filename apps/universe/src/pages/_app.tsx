import 'raf/polyfill'
import 'setimmediate'

import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import '../styles/global.css'
import { AppProps } from 'next/app'
import Loader from '../components/Loader'
import { useRouter } from 'next/router'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { Analytics } from '@vercel/analytics/react'
import { api } from '~/services/api'
import { ApolloProvider } from '@apollo/client'
import { client } from '@novecirculos/graphql'

function MyApp({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true)
    }

    const handleComplete = () => {
      setIsLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Universo - Nove Círculos</title>
        <meta
          name="description"
          content="Nove Círculos é um universo de fantasia"
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <ApolloProvider client={client}>
        <UserProvider>
          {isLoading ? <Loader /> : <Component {...pageProps} />}
          <Analytics />
        </UserProvider>
      </ApolloProvider>
    </>
  )
}

export default api.withTRPC(MyApp)
