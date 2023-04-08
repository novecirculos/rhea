import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

console.log(process.env.HYGRAPH_API_URL)

export const client = new ApolloClient({
  ssrMode: true,
  uri: process.env.HYGRAPH_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_ACCESS_TOKEN}`,
  },
  cache: new InMemoryCache(),
})
