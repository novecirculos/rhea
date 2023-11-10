import { Editor } from '@novecirculos/editor'

export default async function EditorPage() {
  return (
    <div className="flex flex-col text-left h-full min-h-screen max-h-screen items-center justify-center overflow-hidden">
      <Editor />
    </div>
  )
}
