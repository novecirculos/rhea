import { withNecessaryAccesses } from '~/utils/withNecessaryAccesses'

function ArticleEdit() {
  return <span>edit article</span>
}

export default withNecessaryAccesses(ArticleEdit, ['Admin'])
