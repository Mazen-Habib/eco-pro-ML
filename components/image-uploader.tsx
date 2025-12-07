"use client"

import type React from "react"

import { useCallback, useState, useRef } from "react"
import { Upload, ImageIcon, Loader2, Camera, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  console.log("ImageUploader render - showCameraModal:", showCameraModal)

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
    console.log("Starting camera...")
    setShowCameraModal(true) // Show modal first
    
    try {
      // Try different constraint configurations for better compatibility
      let stream
      try {
        // First try with ideal constraints
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: { ideal: "environment" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        })
      } catch (e) {
        // Fallback to simpler constraints
        console.log("Trying fallback camera constraints...")
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        })
      }
      
      console.log("Camera stream obtained:", stream)
      streamRef.current = stream
      
      // Wait for video element to be ready
      setTimeout(() => {
        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current
          console.log("Video stream attached to element")
        }
      }, 100)
      
    } catch (error) {
      console.error("Error accessing camera:", error)
      setShowCameraModal(false) // Close modal on error
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      alert(`Unable to access camera: ${errorMessage}\n\nPlease ensure:\n1. You're using HTTPS\n2. Camera permissions are granted\n3. No other app is using the camera`)
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCameraModal(false)
  }, [])

  const capturePhoto = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageUrl = canvas.toDataURL("image/jpeg", 0.9)
        onUpload(imageUrl)
        stopCamera()
      }
    }
  }, [onUpload, stopCamera])

  return (
    <>
      {/* Debug info */}
      {showCameraModal && <div className="fixed top-0 left-0 bg-red-500 text-white p-2 z-[100]">Modal State: TRUE</div>}
      
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
          onClick={() => {
            console.log("Use Camera button clicked")
            startCamera()
          }}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary transition-colors text-sm font-medium"
        >
          <Camera className="w-4 h-4" />
          Use Camera
        </button>
      </div>

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-background rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Capture Photo
              </h3>
              <button
                onClick={stopCamera}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Preview */}
            <div className="relative bg-black aspect-video">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              
              {/* Camera overlay guide */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white/30 rounded-lg">
                  {/* Corner markers */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg" />
                </div>
                
                {/* Center guide */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-1 h-12 bg-white/50 absolute left-1/2 -translate-x-1/2 -translate-y-6" />
                  <div className="w-12 h-1 bg-white/50 absolute top-1/2 -translate-y-1/2 -translate-x-6" />
                </div>
              </div>
            </div>

            {/* Footer with Controls */}
            <div className="p-6 bg-card">
              <div className="flex justify-center gap-4">
                <button
                  onClick={stopCamera}
                  className="px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-muted transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={capturePhoto}
                  className="px-8 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm shadow-lg shadow-primary/25"
                >
                  <Camera className="w-4 h-4 inline mr-2" />
                  Capture
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Position the waste item within the frame guides
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
