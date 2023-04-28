import { NextApiRequest, NextPage, NextPageContext } from 'next'
import { getUserRoles } from './auth0'
import nookies from 'nookies'

interface WithNecessaryAccessProps {
  allowed: boolean
}

export const withNecessaryAccesses = (
  WrappedComponent: NextPage<any, any>,
  requiredRoles: string[]
) => {
  const WithNecessaryAccess = ({
    allowed,
    ...props
  }: WithNecessaryAccessProps) => {
    if (!allowed) {
      return <div>You do not have the necessary access to view this page.</div>
    }

    return <WrappedComponent {...props} />
  }

  WithNecessaryAccess.getInitialProps = async (context: NextPageContext) => {
    const { '@auth0/user-sub': sub } = nookies.get(context, '@auth0/user-sub')

    const roles = await getUserRoles(context.req as NextApiRequest, sub)

    const allowed = requiredRoles.some((role) => roles?.includes(role))

    return {
      allowed,
      ...(WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(context)
        : {}),
    }
  }

  return WithNecessaryAccess
}
