import { usePublishArticleMutation, withApollo } from '@novecirculos/graphql'
import {
  PageGetArticleBySlugComp,
  ssrGetArticleBySlug,
  useEditContentMutation,
} from '@novecirculos/graphql'
import { Button } from '@novecirculos/react'
import { Editor } from '@tinymce/tinymce-react'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { useRequiredRoles } from '~/hooks/useRequiredRoles'
import { axiosApi } from '~/services/api'

const ArticleEdit: PageGetArticleBySlugComp = ({ data }) => {
  const [editorContent, setEditorContent] = useState('')
  const { allowed, loading, component } = useRequiredRoles(['Admin'])

  const [saveContent, { loading: editContentLoading }] =
    useEditContentMutation()

  const [publishContent, { loading: publishContentLoading }] =
    usePublishArticleMutation()

  if (loading || !allowed) {
    return component
  }

  const handleEditorChange = (content: string, editor: any) => {
    setEditorContent(content)
  }

  const handleSave = async () => {
    const { data: astContent } = await axiosApi.post('/content/normalizeAst', {
      html: editorContent,
    })

    await saveContent({
      variables: {
        content: {
          children: astContent,
        },
        id: data?.article?.id,
      },
    })

    await publishContent({
      variables: {
        id: data?.article?.id,
      },
    })
  }

  return (
    <div className="flex flex-col px-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data?.article?.title}</h1>
          <h2 className="font-secondary">{data?.article?.category}</h2>
          <strong>{data?.article?.universeDate}</strong>
        </div>
        <Button onClick={handleSave}>
          {editContentLoading || publishContentLoading ? (
            <FiLoader className="animate-spin" />
          ) : (
            'Salvar'
          )}
        </Button>
      </section>
      <div className="mt-4 h-[85vh]">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
          initialValue={data?.article?.content?.html || ''}
          init={{
            height: '100%',
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help',
            content_style:
              'body { font-family:Noto Serif, serif; font-size:14px }',
            skin: 'oxide-dark',
            content_css: 'dark',
          }}
          onEditorChange={handleEditorChange}
        />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  req,
  params,
}: GetServerSidePropsContext) => {
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
  }
}

export default withApollo(
  ssrGetArticleBySlug.withPage((arg) => ({
    variables: { slug: arg?.query?.slug?.toString() || '' },
  }))(ArticleEdit)
)
