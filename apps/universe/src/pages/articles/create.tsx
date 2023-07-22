import { withRequiredRoles } from '~/hooks/withRequiredRoles'
import {
  ArticleCategory,
  usePublishArticleMutation,
} from '@novecirculos/graphql'
import { useCreateArticleMutation } from '@novecirculos/graphql'
import { Button, Select, SelectOption, TextInput } from '@novecirculos/design'
import { Editor } from '@tinymce/tinymce-react'
import { useState } from 'react'
import { FiLoader } from 'react-icons/fi'
import { axiosApi } from '~/services/api'
import { slugify } from '~/utils/slugify'

const CreateArticle = () => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [editorContent, setEditorContent] = useState('')

  const [saveContent, { loading: editContentLoading }] =
    useCreateArticleMutation()

  const handleEditorChange = (content: string, editor: any) => {
    setEditorContent(content)
  }

  const handleSave = async () => {
    const { data: astContent } = await axiosApi.post('/content/normalizeAst', {
      html: editorContent,
    })

    await saveContent({
      variables: {
        title,
        category: category as ArticleCategory,
        content: {
          children: astContent,
        },
        slug: slugify(title),
      },
    })
  }

  function getArticleCategoryOptions() {
    const options: SelectOption[] = Object.entries(ArticleCategory).map(
      ([key, value]) => {
        const label = translateLabel(value)
        return {
          value: key,
          label,
        }
      }
    )

    return options
  }

  function translateLabel(value: string): string {
    const translations: { [key: string]: string } = {
      Cidade: 'Cidade',
      Conhecimento: 'Conhecimento',
      Divindade: 'Divindade',
      Evento: 'Evento',
      Organizacao: 'Organização',
      Personagem: 'Personagem',
      Raca: 'Raça',
      Regiao: 'Região',
      Reino: 'Reino',
    }

    return translations[value] || value
  }

  return (
    <div className="flex flex-col px-6">
      <section className="flex items-center justify-between gap-4">
        <TextInput
          onChange={(e) => setTitle(e.target.value)}
          label="Título"
          placeholder="Titúlo do seu artigo"
        />
        <Select
          onChangeCapture={(e) => setCategory(e.currentTarget.value)}
          label="Categoria"
          options={getArticleCategoryOptions()}
        />
        <Button className="mt-6" onClick={handleSave}>
          {editContentLoading ? (
            <FiLoader className="animate-spin" />
          ) : (
            'Salvar'
          )}
        </Button>
      </section>
      <div className="mt-4 h-[85vh]">
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
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

export default withRequiredRoles(CreateArticle, ['Admin', 'Player'])
