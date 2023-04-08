import { ApolloProvider as ApolloClientProvider } from '@apollo/client'
import { client } from '@novecirculos/graphql'

export const ApolloProvider = ({ children }) => (
  <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
)
