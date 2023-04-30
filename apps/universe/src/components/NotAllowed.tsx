import { Button } from '@novecirculos/react'
import { useRouter } from 'next/router'

export const NotAllowed = () => {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col items-center justify-center">
      You do not have the necessary access to view this page.
      <Button onClick={() => router.back()}>Go Back</Button>
    </div>
  )
}
