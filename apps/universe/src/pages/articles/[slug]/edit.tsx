import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'

function ArticleEdit() {
  const { user, isLoading } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      ;(async () => {
        try {
          const response = await fetch('/api/roles')
          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || 'Error fetching user roles')
          }

          setIsAdmin(data.roles.includes('Admin'))
        } catch (error) {
          console.error('Error:', error)
        }
      })()
    }
  }, [user, router])

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (!user || !isAdmin) {
    return <span>You dont have permission to edit articles.</span>
  }

  return <span>edit article</span>
}

export default withPageAuthRequired(ArticleEdit)
