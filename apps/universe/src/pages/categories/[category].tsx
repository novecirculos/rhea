import { useRouter } from 'next/router'

const Category = () => {
  const { query } = useRouter()

  return <div>{query.category}</div>
}

export default Category
