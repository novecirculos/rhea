import { NextApiRequest, NextPage, NextPageContext } from 'next'
import { getUserRoles } from '~/services/auth0'
import nookies from 'nookies'
import { NotAllowed } from '~/components/NotAllowed'

interface WithRequiredRolesProps {
  allowed: boolean
}

export const withRequiredRoles = (
  WrappedComponent: NextPage<any, any>,
  requiredRoles: string[]
) => {
  const WithRequiredRoles = ({ allowed, ...props }: WithRequiredRolesProps) => {
    if (!allowed) {
      return <NotAllowed />
    }

    return <WrappedComponent {...props} />
  }

  WithRequiredRoles.getInitialProps = async (context: NextPageContext) => {
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

  return WithRequiredRoles
}
