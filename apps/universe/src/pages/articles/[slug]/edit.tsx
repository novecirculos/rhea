import { usePublishArticleMutation, withApollo } from '@novecirculos/graphql'
import {
  PageGetArticleBySlugComp,
  ssrGetArticleBySlug,
  useEditContentMutation,
} from '@novecirculos/graphql'
import { Button } from '@novecirculos/ui'
import { Editor } from '@tinymce/tinymce-react'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { useRequiredRoles } from '~/hooks/useRequiredRoles'
import { axiosApi } from '~/services/api'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { DocumentToolbar } from '~/components/EditorToolbar'

const ArticleEdit: PageGetArticleBySlugComp = ({ data }) => {
  const [editorContent, setEditorContent] = useState('')
  const { allowed, loading, component } = useRequiredRoles(['Admin'])

  const [saveContent, { loading: editContentLoading }] =
    useEditContentMutation()

  const [publishContent, { loading: publishContentLoading }] =
    usePublishArticleMutation()

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ListItem,
      OrderedList,
      Link.configure({
        HTMLAttributes: {
          class: 'cursor-pointer text-blue-700',
        },
      }),
      Placeholder.configure({
        placeholder: 'Escreva algo aqui...',
      }),
    ],
    content: `<h1>Primeiro Teste</h1>`,
    editorProps: {
      attributes: {
        class: 'outline-none',
      },
    },
  })

  if (loading || !allowed) {
    return component
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
      {editor && (
        <div className="fixed right-0 left-0 top-0 z-10 mb-4 w-[98%] flex-1 overflow-hidden rounded-lg md:mx-auto">
          <DocumentToolbar editor={editor} />
        </div>
      )}

      <div className="mt-24 flex min-h-screen w-full">
        <EditorContent
          className="prose prose-invert min-h-screen max-w-6xl"
          editor={editor}
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
