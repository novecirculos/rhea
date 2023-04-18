import Image from 'next/image'
import Link from 'next/link'
import {
  withApollo,
  ssrGetArticles,
  ArticleCategory,
  GetArticlesQuery,
  ssrGetArticlesByCategory,
  ssrGetArticleByTitle,
} from '@novecirculos/graphql'
import { Button, TextInput } from '@novecirculos/react'
import { useCallback, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import HTMLReactParser from 'html-react-parser'
import { replace, extractFirstThreeLines } from '../utils/replaceBrackets'

const Home = () => {
  const [articles, setArticles] = useState<GetArticlesQuery['articles']>([])
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>()
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [title, setTitle] = useState('')

  const { fetchMore: filteredArticlesFetchMore } =
    ssrGetArticlesByCategory.usePage(() => ({
      variables: {
        category: selectedCategory,
      },
    }))

  const { fetchMore: fetchByTitle } = ssrGetArticleByTitle.usePage()

  const { data, fetchMore } = ssrGetArticles.usePage(() => ({
    variables: {
      skip,
    },
    onCompleted: (data) => {
      setHasMore(data.articles.length >= 10)
      setArticles(data.articles)
    },
  }))

  const categories = ['Todos', ...Object.keys(ArticleCategory)]

  const handleFetch = useCallback(
    async ({ pageUp = true }: { pageUp?: boolean }) => {
      if (pageUp === false && skip === 0) return

      const newSkip =
        pageUp && hasMore ? skip + articles.length : skip - articles.length
      if (newSkip < 0) return

      setSkip(newSkip)
      await fetchMore({
        variables: {
          skip: newSkip,
        },
      })
    },
    [fetchMore, skip, articles, hasMore]
  )

  const handleCategoryFilter = async (category: ArticleCategory | 'Todos') => {
    if (category === 'Todos') {
      setSkip(0)
      setSelectedCategory(undefined)
      const { data } = await fetchMore({
        variables: {
          skip: 0,
        },
      })
      return setArticles(data.articles)
    }

    setArticles([])
    setSelectedCategory(category as ArticleCategory)
    setSkip(0)

    const { data } = await filteredArticlesFetchMore({
      variables: {
        skip: 0,
        category,
      },
    })

    setArticles(data.articles)
  }

  const getArticleByTitle = async () => {
    const { data } = await fetchByTitle({
      variables: {
        title,
      },
    })

    setArticles([data.article as any])
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 p-6">
      <section className="flex items-center justify-between">
        <TextInput
          onChange={(e) => setTitle(e.target.value)}
          className="pr-4"
          label="Pesquise por um artigo"
          placeholder="Exemplo: Kiverlia"
        />
        <Button
          onClick={getArticleByTitle}
          className="mt-7"
          size="sm"
          variant="primary"
        >
          <FiSearch /> Pesquisar
        </Button>
      </section>
      <h1 className="text-3xl font-medium text-white">Artigos</h1>
      <div className="no-scrollbar flex flex-row gap-4 overflow-hidden overflow-x-auto whitespace-nowrap">
        {categories.map((category) => (
          <Button
            variant="secondary"
            onClick={() => handleCategoryFilter(category as ArticleCategory)}
            key={category}
          >
            {category}
          </Button>
        ))}
      </div>
      {articles.map((article) => {
        return (
          <Link href={`/article/${article.slug}`} key={article.id}>
            <div className="flex cursor-pointer items-center rounded-lg bg-gray-700 shadow-lg">
              <div className="relative h-48 w-1/3 rounded-l-lg">
                <Image
                  className="rounded-l-lg object-cover object-left-top"
                  src={
                    article.image?.url ||
                    'https://media.graphassets.com/02xw7YgXRtKImvZ5Xlo4'
                  }
                  alt={article.title}
                  fill
                />
              </div>
              <div className="w-2/3 p-4">
                <h4 className="mb-2 text-lg font-medium">{article.title}</h4>
                <p className="text-base text-gray-400">{article.category}</p>
                <div className="truncate-3-lines prose prose-headings:font-medium prose-headings:color-gray-300 prose-ul:color-gray-300 prose-a:color-secondary-700 prose-a:no-underline dark:prose-invert prose-p:color-gray-300 prose-blockquote:color-gray-300 prose-strong:text-gray-300 z-10 mt-auto h-full w-full overflow-auto overflow-hidden text-gray-300">
                  {article?.content?.html &&
                    HTMLReactParser(
                      extractFirstThreeLines(article?.content?.html as string),
                      {
                        replace: (html) =>
                          replace({
                            domNode: html,
                            noLinking: true,
                          }),
                      }
                    )}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
      <section className="flex flex-row justify-between">
        <Button
          variant="secondary"
          onClick={() =>
            handleFetch({
              pageUp: false,
            })
          }
        >
          Página anterior
        </Button>{' '}
        <Button
          variant="secondary"
          onClick={() =>
            handleFetch({
              pageUp: true,
            })
          }
        >
          Próxima página
        </Button>
      </section>
    </div>
  )
}

export default withApollo(Home)
