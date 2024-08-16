import React, { useRef, useState } from "react";
import { Card, CardContent, Button } from "@novecirculos/design";
import { Import } from "lucide-react";

interface DropzoneProps {
  onChange: (files: File[]) => void; // Change to accept a function that handles File[]
  className?: string;
  fileExtension?: string;
}

export function Dropzone({
  onChange,
  className,
  fileExtension,
  ...props
}: DropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      handleFiles(files);
    }
  };

  const handleFiles = (files: FileList) => {
    const uploadedFiles = Array.from(files);

    // Optionally, check file extension for each file
    if (fileExtension) {
      const invalidFile = uploadedFiles.find(
        (file) => !file.name.endsWith(`.${fileExtension}`),
      );
      if (invalidFile) {
        setError(
          `Invalid file type for ${invalidFile.name}. Expected: .${fileExtension}`,
        );
        return;
      }
    }

    // Optionally, display information about the first file
    if (uploadedFiles.length > 0) {
      const fileSizeInKB = Math.round(uploadedFiles[0].size / 1024); // Convert to KB
      setFileInfo(
        `Uploaded file: ${uploadedFiles[0].name} (${fileSizeInKB} KB)`,
      );
    }

    setError(null); // Reset error state
    onChange(uploadedFiles); // Pass the File objects to the parent component
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
  );
}
