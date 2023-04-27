import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from '@auth0/nextjs-auth0'
import { getUserRoles } from '../../utils/auth0' // Update this path based on the location of your auth0.ts file

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res)

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const roles = await getUserRoles(req, session.user.sub)

  if (!roles) {
    return res.status(500).json({ message: 'Error fetching user roles' })
  }

  res.status(200).json({ roles })
}
