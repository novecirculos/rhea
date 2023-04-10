import 'raf/polyfill'
import 'setimmediate'

import Head from 'next/head'
import React, { useEffect, useState } from 'react'

import '../styles/global.css'
import { AppProps } from 'next/app'
import Loader from '../components/Loader'
import { useRouter } from 'next/router'

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
        <title>Nove Círculos - Wiki</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>{isLoading ? <Loader /> : <Component {...pageProps} />}</>
    </>
  )
}

export default MyApp
