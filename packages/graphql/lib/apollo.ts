import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { env } from '@novecirculos/env'
import pThrottle from 'p-throttle'

const throttle = pThrottle({
  limit: 5,
  interval: 1000,
})

const throttledFetch = async (uri, config) => {
  const fetchCall = () => fetch(uri, config)
  const throttledCall = throttle(fetchCall)
  return throttledCall()
}

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: env.HYGRAPH_API_URL,
    headers: {
      Authorization: `Bearer ${env.HYGRAPH_ACCESS_TOKEN}`,
    },
    fetch: throttledFetch,
  }),
  cache: new InMemoryCache(),
})
