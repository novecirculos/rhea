import { useRequiredRoles } from '~/hooks/useRequiredRoles'

function ArticleEdit() {
  const { allowed, loading, content } = useRequiredRoles(['Admin'])

  if (loading || !allowed) {
    return content
  }

  return <span>edit article</span>
}

export default ArticleEdit
