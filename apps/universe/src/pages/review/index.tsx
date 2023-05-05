import { useGetArticlesInReviewQuery } from '@novecirculos/graphql'
import { Card } from '~/components/Card'
import ShimmerLoading from '~/components/ShimmerLoading'
import { withRequiredRoles } from '~/hooks/withRequiredRoles'

function Review() {
  const { data, loading } = useGetArticlesInReviewQuery()

  return (
    <div>
      <h1>Artigos em revisão:</h1>
      {loading ? (
        <ShimmerLoading count={3} />
      ) : (
        data?.articles.map((article) => {
          if (article) return <Card key={article.id} article={article} />
        })
      )}
    </div>
  )
}

export default withRequiredRoles(Review, ['Admin', 'Player'])
