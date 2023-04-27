import { UserProfile as Auth0User } from '@auth0/nextjs-auth0/client'

export interface User extends Auth0User {
  'https://novecirculos.com.br/roles': string[]
}
