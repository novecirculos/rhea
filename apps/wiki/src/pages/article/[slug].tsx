import {
  ssrGetArticleBySlug,
  PageGetArticleBySlugComp,
  ssrGetArticles,
  withApollo,
} from '@novecirculos/graphql'
import { GetServerSideProps, GetStaticPaths } from 'next'
import HTMLReactParser, { DOMNode } from 'html-react-parser'
import { replace } from '../../utils/replaceBrackets'

const ArticlePage: PageGetArticleBySlugComp = ({ data }) => {
  return (
    <div>
      <h1>{data?.article?.title}</h1>
      <p>{data?.article?.category}</p>
      <div>
        {HTMLReactParser(data?.article?.content?.html as string, { replace })}
      </div>
    </div>
  )
}
export const getStaticProps: GetServerSideProps = async ({ params, req }) => {
  const res = await ssrGetArticleBySlug.getServerPage(
    {
      variables: { slug: params?.slug?.toString() || '' },
    },
    { req }
  )

  if (res.props.error || !res.props.data?.article) {
    return {
      notFound: true,
    }
  }

  return res
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { props } = await ssrGetArticles.getServerPage({}, { req: undefined })

  const paths =
    props.data.articles.map((article) => ({
      params: { slug: article.slug },
    })) || []

  return {
    paths,
    fallback: false,
  }
}

export default withApollo(
  ssrGetArticleBySlug.withPage((arg) => ({
    variables: { slug: arg?.query?.slug?.toString() || '' },
  }))(ArticlePage)
)
