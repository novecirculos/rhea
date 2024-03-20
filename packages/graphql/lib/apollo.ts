import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

import pThrottle from 'p-throttle'

const throttle = pThrottle({
  limit: 5,
  interval: 1000,
})

const throttledFetch = async (uri: any, config: any) => {
  const fetchCall = () => fetch(uri, config)
  const throttledCall = throttle(fetchCall)
  return throttledCall()
}

export const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: process.env.HYGRAPH_API_URL,
    headers: {
      Authorization: `Bearer ${process.env.HYGRAPH_ACCESS_TOKEN}`,
    },
    fetch: throttledFetch,
  }),
  cache: new InMemoryCache(),
})
