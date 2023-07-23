import { Button } from '@novecirculos/design'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiArrowLeft, FiLogIn, FiUser } from 'react-icons/fi'

export const NotAllowed = () => {
  const router = useRouter()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      Você não tem o nível de acesso necessário para ver essa página.
      <Button variant="secondary" onClick={() => router.back()}>
        <FiArrowLeft /> Voltar
      </Button>
      <span>Ou</span>
      <Link href="/api/auth/login">
        <Button>
          <FiLogIn /> Login
        </Button>
      </Link>
    </div>
  )
}
