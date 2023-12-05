import React, { useRef, useState } from 'react'
import { Card, CardContent, Button } from '@novecirculos/design'
import { Import } from 'lucide-react'

interface DropzoneProps {
  onChange: React.Dispatch<React.SetStateAction<string[]>>
  className?: string
  fileExtension?: string
}

export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileInfo, setFileInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const { files } = e.dataTransfer
    handleFiles(files)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      handleFiles(files)
    }
  }

  const handleFiles = (files: FileList) => {
    const uploadedFile = files[0]

    // Check file extension
    if (fileExtension && !uploadedFile.name.endsWith(`.${fileExtension}`)) {
      setError(`Invalid file type. Expected: .${fileExtension}`)
      return
    }

    const fileSizeInKB = Math.round(uploadedFile.size / 1024) // Convert to KB

    const fileList = Array.from(files).map((file) => URL.createObjectURL(file))
    onChange((prevFiles) => [...prevFiles, ...fileList])

    // Display file information
    setFileInfo(`Uploaded file: ${uploadedFile.name} (${fileSizeInKB} KB)`)
    setError(null) // Reset error state
  }

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <Card
      className={`bg-muted hover:border-muted-foreground/50 border-2 border-dashed hover:cursor-pointer ${className}`}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Import className="text-muted-foreground h-8 w-8" />
        <button
          onClick={handleButtonClick}
          className="flex flex-col items-center justify-center text-gray-300"
        >
          <span className="font-primary text-md font-medium">
            Drag Files to Upload or
          </span>
          <Button className="mt-2" variant="outline">
            Click here
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept={`.${fileExtension}`} // Set accepted file type
            onChange={handleFileInputChange}
            className="hidden"
            multiple
          />
        </button>
        {fileInfo && <p className="text-muted-foreground">{fileInfo}</p>}
        {error && <span className="text-red-500">{error}</span>}
      </CardContent>
    </Card>
  )
}
