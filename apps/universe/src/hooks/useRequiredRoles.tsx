import { useEffect, useState } from 'react'
import Loader from '~/components/Loader'
import { NotAllowed } from '~/components/NotAllowed'

export const useRequiredRoles = (requiredRoles: string[]) => {
  const [allowed, setAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  let component = null

  useEffect(() => {
    const checkRoles = async () => {
      try {
        const response = await fetch(`/api/auth/roles`)
        const data = await response.json()

        if (response.ok) {
          const userRoles = data.roles

          if (requiredRoles.some((role) => userRoles.includes(role))) {
            setAllowed(true)
          } else {
            setAllowed(false)
          }
        } else {
          console.error('Error fetching user roles:', data.message)
        }
      } catch (error) {
        console.error('Error fetching user roles:', error)
      } finally {
        setLoading(false)
      }
    }

    checkRoles()
  }, [requiredRoles])

  if (loading) {
    component = <Loader />
  } else if (!allowed) {
    component = <NotAllowed />
  }

  return { allowed, loading, component }
}
