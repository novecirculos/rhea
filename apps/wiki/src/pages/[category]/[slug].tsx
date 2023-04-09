import {
  ssrGetArticleBySlug,
  PageGetArticleBySlugComp,
  ssrGetArticles,
  withApollo,
} from '@novecirculos/graphql'

const ArticlePage: PageGetArticleBySlugComp = () => {
  const { data } = ssrGetArticleBySlug.usePage()

  return (
    <div>
      <h1>{data?.article?.title}</h1>
    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  console.log(ctx.query.slug)

  return await ssrGetArticleBySlug.getServerPage(
    {
      variables: {
        slug: ctx?.query?.slug,
      },
    },
    ctx
  )
}

export default withApollo(
  ssrGetArticleBySlug.withPage((arg) => ({
    variables: { slug: arg?.query?.slug?.toString() || '' },
  }))(ArticlePage)
)
