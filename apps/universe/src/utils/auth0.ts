import axios from 'axios'
import { NextApiRequest } from 'next'

async function getManagementApiAccessToken(
  req: NextApiRequest
): Promise<string | null> {
  try {
    const { AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET } =
      process.env

    if (!AUTH0_ISSUER_BASE_URL || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET) {
      throw new Error('Auth0 environment variables not set')
    }

    const response = await axios.post(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: `${AUTH0_ISSUER_BASE_URL}/api/v2/`,
    })

    return response.data.access_token
  } catch (error) {
    console.error('Error getting Auth0 Management API access token:', error)
    return null
  }
}

export async function getUserRoles(
  req: NextApiRequest,
  userId: string
): Promise<string[] | null> {
  const accessToken = await getManagementApiAccessToken(req)

  if (!accessToken) {
    return null
  }

  try {
    const { AUTH0_ISSUER_BASE_URL } = process.env

    if (!AUTH0_ISSUER_BASE_URL) {
      throw new Error('Auth0 environment variables not set')
    }

    const response = await axios.get(
      `${AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    return response.data.map((role: { name: string }) => role.name)
  } catch (error) {
    return null
  }
}
