import { getSession } from '@auth0/nextjs-auth0'
import { GetServerSidePropsContext } from 'next'
import { getUserRoles } from './auth0'

export const withNecessaryAccess = (
  WrappedComponent: any,
  requiredRole: string
) => {
  const WithNecessaryAccess = ({ allowed, ...props }: any) => {
    if (!allowed) {
      return <div>You do not have the necessary access to view this page.</div>
    }

    return <WrappedComponent {...props} />
  }

  WithNecessaryAccess.getInitialProps = async (context: any) => {
    const roles = await getUserRoles(context.req, context.req.user.sub)
    const allowed = roles?.includes(requiredRole)

    return {
      allowed,
      ...(WrappedComponent.getInitialProps
        ? await WrappedComponent.getInitialProps(context)
        : {}),
    }
  }

  return WithNecessaryAccess
}
