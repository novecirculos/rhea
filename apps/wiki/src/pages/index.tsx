import { gql } from '@apollo/client'
import { GetArticleByTitleDocument, client } from '@novecirculos/graphql'
import { TestComponent } from '@novecirculos/react'

const Home = ({ data }: any) => {
  return (
    <div>
      Web
      <TestComponent />
    </div>
  )
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query GetArticleByTitle {
        articleModel(where: { title: "Kiverlia" }) {
          id
          articleSlug
          articleType
          title
          content {
            raw
            markdown
            html
          }
        }
      }
    `,
  })

  console.log(data)

  return {
    props: {
      data: {},
    },
  }
}

export default Home
