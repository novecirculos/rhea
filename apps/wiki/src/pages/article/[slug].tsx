import {
  ssrGetArticleBySlug,
  PageGetArticleBySlugComp,
  ssrGetArticles,
  withApollo,
} from '@novecirculos/graphql'
import { GetServerSideProps, GetStaticPaths } from 'next'
import HTMLReactParser, { DOMNode } from 'html-react-parser'
import { replace } from '../../utils/replaceBrackets'
import Image from 'next/image'
import { FiChevronDown } from 'react-icons/fi'
import { SectionTitle } from '../../components/SectionTitle'

const ArticlePage: PageGetArticleBySlugComp = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative min-h-screen w-full ">
        <Image
          src={
            data?.article?.image?.url ||
            'https://media.graphassets.com/28RChkjeT1OHgOH4u5T8'
          }
          alt={data?.article?.title as string}
          fill
          className="absolute top-0 left-0 h-full w-full object-cover"
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
        <div className="bg-blackAlpha-100 absolute top-0 left-0 h-full w-full"></div>
      </div>

      <div className="prose prose-headings:font-medium prose-headings:color-gray-300 prose-ul:color-gray-300 prose-a:color-secondary-700 prose-a:no-underline dark:prose-invert prose-p:color-gray-300 prose-blockquote:color-gray-300 z-10 mt-auto h-full w-full overflow-auto">
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

  return {
    props: res.props,
    // revalidate: 60 * 60 * 24, // 24 hours
  }
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
