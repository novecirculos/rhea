import 'raf/polyfill'
import 'setimmediate'

import Head from 'next/head'
import React from 'react'

import '../styles/global.css'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { client } from '@novecirculos/graphql'

function MyApp({ Component, pageProps }: AppProps) {
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
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
