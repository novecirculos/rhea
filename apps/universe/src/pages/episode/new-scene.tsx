import { Button, TextInput } from '@novecirculos/ui'
import { withRequiredRoles } from '~/hooks/withRequiredRoles'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

function NewScene() {
  const [transcription, setTranscription] = useState('')
  const [transcriptionPrompt, setTranscriptionPrompt] = useState('')
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'audio/*': ['m4a', 'mp3', 'webm', 'mp4', 'mpga', 'wav', 'mpeg'],
    },
  })

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData()

    formData.append('file', acceptedFiles[0])
    formData.append('name', event.target.elements.name.value)

    const response = await fetch('/api/episode/transcript', {
      method: 'POST',
      body: formData,
    })

    const { text } = await response.json()

    setTranscription(text)

    const promptResponse = await fetch('/api/episode/generateImagePrompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
      }),
    })

    const { prompt } = await promptResponse.json()

    setTranscriptionPrompt(prompt)

    const midjourneyResponse = await fetch('/api/episode/generateImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    })

    const image = await midjourneyResponse.json()

    console.log(image)
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1>Criar nova cena</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Título da cena" />

        <div
          {...getRootProps({
            className:
              'dropzone border-2 border-dashed p-4 rounded cursor-pointer',
          })}
        >
          <input name="scene" {...getInputProps()} />
          <p className="text-center">
            Drag and drop some files here, or click to select files
          </p>
        </div>
        <ul>{files}</ul>

        <Button type="submit">Enviar</Button>
      </form>
      <span>{transcription}</span>
      <strong>{transcriptionPrompt}</strong>
    </div>
  )
}

export default withRequiredRoles(NewScene, ['Admin'])
