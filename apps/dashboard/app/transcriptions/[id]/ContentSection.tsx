'use client'
import React, { useState, useRef } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  ToastAction,
  Skeleton,
  Progress,
} from '@novecirculos/design'
import { useToast } from '@novecirculos/context'
import { useRouter } from 'next/navigation'

export const ContentSection = ({ text }: { text: string }) => {
  const [selectedText, setSelectedText] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const selectionRef = useRef<Selection | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim())
      selectionRef.current = selection
      setIsPopoverOpen(true)
    } else {
      setIsPopoverOpen(false)
    }
  }

  const handleCreateNewScene = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/scenes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: selectedText }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setLoading(false)
      toast({
        title: 'Cena criada com sucesso!',
        action: (
          <ToastAction
            onClick={() => router.push(`/scenes/${data.id}`)}
            altText="Visualizar"
          >
            Visualizar
          </ToastAction>
        ),
      })
    } catch (error) {
      setLoading(false)
      toast({
        title: 'Ocorreu um erro tentando criar a cena.',
        variant: 'destructive',
      })
      console.error('Failed to create scene:', error)
    }

    setIsPopoverOpen(false) // Close the popover after the action
  }

  return (
    <div onMouseUp={handleMouseUp}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="prose dark:prose-invert" aria-describedby="popover">
            {text}
          </div>
        </PopoverTrigger>
        {isPopoverOpen && selectionRef.current && (
          <PopoverContent
            side="top"
            align="start"
            sideOffset={5}
            style={{
              // Position the popover near the selected text
              position: 'absolute',
              top: `${
                selectionRef.current.getRangeAt(0).getBoundingClientRect().top +
                window.scrollY
              }px`,
              left: `${
                selectionRef.current.getRangeAt(0).getBoundingClientRect()
                  .left + window.scrollX
              }px`,
            }}
          >
            {loading ? (
              <Progress />
            ) : (
              <div className="flex flex-col">
                <button onClick={handleCreateNewScene}>Criar nova cena</button>

                <button onClick={handleCreateNewScene}>
                  Criar prompt (Midjourney){' '}
                </button>
              </div>
            )}
          </PopoverContent>
        )}
      </Popover>
      <h2 className="text-xl font-bold dark:text-gray-50">
        Conteúdo da Transcrição
      </h2>
      <div className="prose dark:prose-invert">{text}</div>
    </div>
  )
}
