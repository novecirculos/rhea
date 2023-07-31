import { useState } from 'react'
import { BubbleButton } from '@novecirculos/design'
import * as Toolbar from '@radix-ui/react-toolbar'

import {
  StrikethroughIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  FontBoldIcon,
  FontItalicIcon,
  Link1Icon,
  LinkBreak1Icon,
  ImageIcon,
} from '@radix-ui/react-icons'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
} from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { Button, Input, Modal, ModalWrapper } from '@novecirculos/design'
import { FiLoader } from 'react-icons/fi'

interface setLinkForm {
  link: string
}

export const DocumentToolbar = ({ editor, handleSave, loading }: any) => {
  const addImage = (InputEvent: React.ChangeEvent<HTMLInputElement>) => {
    if (!InputEvent.target.files || !InputEvent.target.files[0]) return

    const FileReaderInstance = new FileReader()

    FileReaderInstance.addEventListener(
      'load',
      function (fileRenderEvent: ProgressEvent<FileReader>) {
        editor
          .chain()
          .focus()
          .setImage({ src: fileRenderEvent.target?.result })
          .run()
      }
    )

    FileReaderInstance.readAsDataURL(InputEvent.target.files[0])
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<setLinkForm>()

  const [modalLink, setModalLink] = useState(false)

  const setNewLink = (data: setLinkForm) => {
    console.log(data.link)
    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: data.link })
      .run()
    setModalLink(false)
  }

  return (
    <Toolbar.Root
      className="flex w-full min-w-max items-center justify-between rounded-md bg-gray-700 p-4"
      aria-label="Formatting options"
    >
      <div className="flex items-center gap-4">
        <section className="relative">
          <h1 className="text-4xl font-bold text-white">Charles II</h1>
          <small className="absolute -bottom-3 rounded-xl p-1">
            Personagem
          </small>
        </section>
        <Toolbar.ToggleGroup
          className="flex items-center gap-2"
          type="multiple"
          aria-label="Text formatting"
        >
          <Toolbar.ToggleItem asChild value="heading1" aria-label="Título 1">
            <BubbleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              data-active={editor.isActive('heading', { level: 1 })}
            >
              <Heading1 className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem asChild value="heading2" aria-label="Título 2">
            <BubbleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              data-active={editor.isActive('heading', { level: 2 })}
            >
              <Heading2 className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem asChild value="heading3" aria-label="Título 3">
            <BubbleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              data-active={editor.isActive('heading', { level: 3 })}
            >
              <Heading3 className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem asChild value="heading4" aria-label="Título 4">
            <BubbleButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              data-active={editor.isActive('heading', { level: 4 })}
            >
              <Heading4 className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.Separator className="mx-2 h-5 w-[1px] bg-slate-200" />

          <Toolbar.ToggleItem asChild value="bold" aria-label="Bold">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <FontBoldIcon className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem asChild value="italic" aria-label="Italic">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <FontItalicIcon />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem
            asChild
            value="strikethrough"
            aria-label="Tracejada"
          >
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <StrikethroughIcon />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.Separator className="mx-2 h-5 w-[1px] bg-slate-200" />

          <Toolbar.ToggleItem
            value="left"
            aria-label="Alinhar a esquerda"
            asChild
          >
            <BubbleButton
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              data-active={editor.isActive({ textAlign: 'left' })}
            >
              <TextAlignLeftIcon />
            </BubbleButton>
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            value="center"
            aria-label="Alinha ao centro"
            asChild
          >
            <BubbleButton
              onClick={() =>
                editor.chain().focus().setTextAlign('center').run()
              }
              data-active={editor.isActive({ textAlign: 'center' })}
            >
              <TextAlignCenterIcon />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem
            value="right"
            aria-label="Alinha ao direita"
            asChild
          >
            <BubbleButton
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              data-active={editor.isActive({ textAlign: 'right' })}
            >
              <TextAlignRightIcon />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.Separator className="mx-2 h-5 w-[1px] bg-slate-200" />

          <Toolbar.ToggleItem
            value="list"
            aria-label="Tranformar em lista"
            asChild
          >
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              data-active={editor.isActive('bulletList')}
            >
              <List className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem
            value="list"
            aria-label="Tranformar em lista"
            asChild
          >
            <BubbleButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              data-active={editor.isActive('orderedList')}
            >
              <ListOrdered className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.Separator className="mx-2 h-5 w-[1px] bg-slate-200" />

          <ModalWrapper open={modalLink} onOpenChange={setModalLink}>
            <Dialog.Trigger asChild>
              <Toolbar.ToggleItem
                value="list"
                aria-label="Tranformar em link"
                asChild
              >
                <BubbleButton data-active={editor.isActive('link')}>
                  <Link1Icon className="w-4" />
                </BubbleButton>
              </Toolbar.ToggleItem>
            </Dialog.Trigger>
            <Modal title="Link">
              <form onSubmit={handleSubmit(setNewLink)}>
                <div className="p-6">
                  <Input
                    label="Link"
                    placeholder="Inserir link"
                    type="url"
                    required
                    register={register}
                    registerName="link"
                    error={errors.link && 'É necessário informar a url do link'}
                  />
                </div>
                <div className="mobile:flex-col-reverse flex w-full items-center justify-end gap-2 border-t-2 border-slate-100 px-6 py-4">
                  <Dialog.Close asChild>
                    <Button className="mobile:w-[100%]">Cancelar</Button>
                  </Dialog.Close>
                  <Button
                    variant="primary"
                    className="mobile:w-[100%]"
                    type="submit"
                  >
                    Inserir link
                  </Button>
                </div>
              </form>
            </Modal>
          </ModalWrapper>

          <Toolbar.ToggleItem
            value="removeLink"
            aria-label="Remover link"
            asChild
          >
            <BubbleButton
              onClick={() => editor.chain().focus().unsetLink().run()}
              data-withlink={!editor.isActive('link')}
            >
              <LinkBreak1Icon className="w-4" />
            </BubbleButton>
          </Toolbar.ToggleItem>

          <Toolbar.Separator className="mx-2 h-5 w-[1px] bg-slate-200" />

          <Toolbar.ToggleItem value="AddImage" aria-label="Adicionar Imagem">
            <BubbleButton type="button">
              <label
                htmlFor="AddImage"
                className="flex h-full w-full cursor-pointer items-center justify-center"
              >
                <ImageIcon className="w-4" />
              </label>
              <input
                type="file"
                className="hidden"
                id="AddImage"
                accept="image/*"
                onChange={addImage}
              />
            </BubbleButton>
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </div>
      <Button onClick={handleSave}>
        {loading ? <FiLoader className="animate-spin" /> : 'Salvar'}
      </Button>
    </Toolbar.Root>
  )
}
