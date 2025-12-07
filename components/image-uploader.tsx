"use client"

import type React from "react"

import { useCallback, useState } from "react"
import { Upload, ImageIcon, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return

      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        onUpload(result)
        setIsLoading(false)
      }
      reader.readAsDataURL(file)
    },
    [onUpload],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={cn(
        "relative border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer",
        "hover:border-primary hover:bg-primary/5",
        isDragging ? "border-primary bg-primary/10 scale-[1.02]" : "border-border bg-card",
      )}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div className="flex flex-col items-center gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
            isDragging ? "bg-primary text-primary-foreground" : "bg-muted",
          )}
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isDragging ? (
            <ImageIcon className="w-6 h-6" />
          ) : (
            <Upload className="w-6 h-6" />
          )}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium mb-0.5">{isDragging ? "Drop it!" : "Drag & drop"}</p>
          <p className="text-xs text-muted-foreground">or click to browse</p>
        </div>
      </div>
    </div>
  )
}
