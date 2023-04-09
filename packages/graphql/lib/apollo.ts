import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { env } from '@novecirculos/env'

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: env.HYGRAPH_API_URL,
    headers: {
      Authorization: `Bearer ${env.HYGRAPH_ACCESS_TOKEN}`,
    },
    fetch,
  }),
  cache: new InMemoryCache(),
})
