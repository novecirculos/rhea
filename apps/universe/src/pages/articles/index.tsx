import {
  withApollo,
  ssrGetArticles,
  ArticleCategory,
  GetArticlesQuery,
  ssrGetArticlesByCategory,
  ssrGetArticlesByTitle,
} from '@novecirculos/graphql'
import { Button, Input } from '@novecirculos/design'
import { FormEvent, useCallback, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import ShimmerLoading from '../../components/ShimmerLoading'
import { Card } from '../../components/Card'

const Home = () => {
  const [articles, setArticles] = useState<GetArticlesQuery['articles']>([])
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>()
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)

  const { fetchMore: filteredArticlesFetchMore } =
    ssrGetArticlesByCategory.usePage(() => ({
      variables: {
        category: selectedCategory,
      },
    }))

  const { fetchMore: fetchByTitle } = ssrGetArticlesByTitle.usePage()

  const { fetchMore } = ssrGetArticles.usePage(() => ({
    variables: {
      skip,
    },
    onCompleted: (data) => {
      setHasMore(data.articles.length >= 10)
      setArticles(data.articles)
      setLoading(false)
    },
  }))

  const categories = ['Todos', ...Object.keys(ArticleCategory)]

  const handleFetch = useCallback(
    async ({ pageUp = true }: { pageUp?: boolean }) => {
      setLoading(true)
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
    setLoading(true)
    if (category === 'Todos') {
      const { data } = await fetchMore({
        variables: {
          skip: 0,
        },
      })

      setSkip(0)
      setSelectedCategory(undefined)
      setArticles(data.articles)
      return setLoading(false)
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
    setLoading(false)
  }

  const getArticlesByTitle = async (e: FormEvent) => {
    e.preventDefault()
    const { data } = await fetchByTitle({
      variables: {
        title,
      },
    })

    setArticles(data.articles)
  }

  return (
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 p-6">
      <form
        onSubmit={getArticlesByTitle}
        className="flex items-center justify-between"
      >
        <Input
          onChange={(e) => setTitle(e.target.value)}
          className="pr-4"
          placeholder="Exemplo: Kiverlia"
        />
        <Button type="submit" className="mt-7" size="sm">
          <FiSearch /> Pesquisar
        </Button>
      </form>
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
      {loading ? (
        <ShimmerLoading count={3} />
      ) : (
        articles.map((article) => {
          if (article) return <Card key={article.id} article={article} />
        })
      )}
      <section className="flex flex-row justify-between">
        <Button
          disabled={skip === 0}
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
          disabled={!hasMore}
          variant="secondary"
          onClick={
            hasMore
              ? () =>
                  handleFetch({
                    pageUp: true,
                  })
              : undefined
          }
        >
          Próxima página
        </Button>
      </section>
    </div>
  )
}

export default withApollo(Home)
