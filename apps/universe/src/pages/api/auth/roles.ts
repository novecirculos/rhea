import { NextApiRequest, NextApiResponse } from 'next'
import { getUserRoles } from '../../../services/auth0'
import nookies from 'nookies'

const rolesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { '@auth0/user-sub': userId } = nookies.get({ req })

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' })
    }

    const roles = await getUserRoles(req, userId)

    if (!roles) {
      return res.status(500).json({ message: 'Error fetching user roles.' })
    }

    res.status(200).json({ roles })
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'An error occurred while fetching user roles.', error })
  }
}

export default rolesHandler
