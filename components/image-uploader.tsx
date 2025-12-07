"use client"

import type React from "react"

import { useCallback, useState, useRef } from "react"
import { Upload, ImageIcon, Loader2, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

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

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setShowCamera(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Unable to access camera. Please check permissions.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }, [])

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageUrl = canvas.toDataURL("image/jpeg")
        onUpload(imageUrl)
        stopCamera()
      }
    }
  }, [onUpload, stopCamera])

  if (showCamera) {
    return (
      <div className="relative border-2 border-primary rounded-xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
          <button
            onClick={capturePhoto}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Capture
          </button>
          <button
            onClick={stopCamera}
            className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
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

      <button
        onClick={startCamera}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition-colors text-sm font-medium"
      >
        <Camera className="w-4 h-4" />
        Use Camera
      </button>
    </div>
  )
}
