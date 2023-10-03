import HTMLReactParser from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { extractFirstThreeLines, replace } from '../utils/replaceBrackets'

export const Card = ({ article }: any) => (
  <Link href={`/articles/${article.slug}`} key={article.id}>
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
        <div className="truncate-3-lines prose prose-headings:font-medium prose-headings:color-gray-300 prose-ul:color-gray-300 prose-a:color-secondary-700 prose-a:no-underline dark:prose-invert prose-p:color-gray-300 prose-blockquote:color-gray-300 prose-strong:text-gray-300 z-10 mt-auto h-full w-full overflow-hidden text-gray-300">
          {article?.content?.html &&
            HTMLReactParser(
              extractFirstThreeLines(article?.content?.html as string),
              {
                replace: (domNode) =>
                  replace({
                    domNode,
                    noLinking: true,
                  }),
              }
            )}
        </div>
      </div>
    </div>
  </Link>
)
