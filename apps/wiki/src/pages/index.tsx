import { ssrGetArticles, withApollo } from '@novecirculos/graphql'
import Link from 'next/link'

const Home = () => {
  const { data } = ssrGetArticles.usePage()

  return (
    <ul>
      {data?.articles.map((article) => (
        <Link href={`${article.slug}`} key={article.id}>
          <li>{article.title}</li>
        </Link>
      ))}
    </ul>
  )
}

export async function getServerSideProps(ctx: any) {
  return await ssrGetArticles.getServerPage({}, ctx)
}

export default withApollo(Home)
