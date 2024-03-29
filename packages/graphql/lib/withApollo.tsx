import { NextPage } from 'next'

import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import {
  NextApiRequestCookies,
  // @ts-ignore This path is generated at build time and conflicts otherwise
} from 'next-server/server/api-utils'
import { IncomingMessage } from 'http'
import { client } from './apollo'
import { merge } from 'lodash'
import React from 'react'


export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
}

// eslint-disable-next-line react/display-name
export const withApollo = (Comp: NextPage) => (props: any) => {
  return (
    <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
      <Comp />
    </ApolloProvider>
  )
}

export const getApolloClient = (
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  if (ctx && ctx.req) {
    let { req } = ctx
    // Do something with the cookies here, maybe add a header for authentication
    req.cookies
  }

  const cache = new InMemoryCache().restore(initialState || {})

  return new ApolloClient({ ...client, cache })
}
