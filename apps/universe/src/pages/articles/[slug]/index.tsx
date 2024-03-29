import {
  ssrGetArticleBySlug,
  PageGetArticleBySlugComp,
  ssrGetArticles,
  withApollo,
} from '@novecirculos/graphql'
import { GetServerSideProps, GetStaticPaths } from 'next'
import HTMLReactParser from 'html-react-parser'
import { replace } from '../../../utils/replaceBrackets'
import Image from 'next/image'
import { FiChevronDown } from 'react-icons/fi'
import { SectionTitle } from '../../../components/SectionTitle'
import { ParsedUrlQuery } from 'querystring'
import Head from 'next/head'

const ArticlePage: PageGetArticleBySlugComp = ({ data }) => {
  return (
    <>
      <Head>
        {data?.article?.title ? (
          <title>{`Nove Círculos - ${data.article.title}`}</title>
        ) : (
          <title>Universo - Nove Círculos</title>
        )}
      </Head>
      <div className="flex flex-col items-center justify-center">
        <div className="relative min-h-screen w-full ">
          <Image
            src={
              data?.article?.image?.url ||
              'https://media.graphassets.com/02xw7YgXRtKImvZ5Xlo4'
            }
            alt={data?.article?.title as string}
            fill
            className="absolute left-0 top-0 h-full w-full object-cover"
          />

          <div className="absolute bottom-4 left-0 right-0 z-50 text-center">
            <SectionTitle
              title={data?.article?.title as string}
              category={data?.article?.category as string}
              universeDate={data?.article?.universeDate as string}
            />
            <span className="flex flex-col items-center justify-center">
              Role para continuar{' '}
              <FiChevronDown className="text-secondary-900 animate-bounce" />
            </span>
          </div>
          <div className="bg-blackAlpha-100 absolute left-0 top-0 h-full w-full"></div>
        </div>

        <div className="prose prose-headings:font-medium prose-headings:color-gray-300 prose-ul:color-gray-300 prose-a:color-secondary-700 prose-a:no-underline prose-invert prose-p:color-gray-300 prose-blockquote:color-gray-300 prose-strong:text-gray-300 z-10 mt-4 h-full w-full overflow-auto px-6">
          {data?.article?.content &&
            HTMLReactParser(
              `<h1>${data.article.title}</h1>${data.article.content.html}`,
              {
                replace: (domNode) =>
                  replace({
                    domNode,
                  }),
              }
            )}
        </div>
      </div>
    </>
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

  return {
    props: res.props,
    revalidate: 60 * 5,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { props } = await ssrGetArticles.getServerPage({}, { req: undefined })

  const paths =
    props.data.articles
      .filter((article) => typeof article.slug === 'string')
      .map((article) => ({
        params: { slug: article.slug } as ParsedUrlQuery,
      })) || []

  return {
    paths,
    fallback: 'blocking',
  }
}

export default withApollo(
  ssrGetArticleBySlug.withPage((arg) => ({
    variables: { slug: arg?.query?.slug?.toString() || '' },
  }))(ArticlePage)
)
