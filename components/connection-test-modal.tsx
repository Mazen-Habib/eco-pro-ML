"use client"

import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Wifi, WifiOff, Loader2, X } from "lucide-react"

interface ConnectionStatus {
  isConnected: boolean
  endpoint: string
  message: string
  responseTime?: number
}

export function ConnectionTestModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<ConnectionStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    setIsLoading(true)
    setIsOpen(true)
    
    const startTime = Date.now()
    const endpoint = `${window.location.origin}/api/classify`
    
    try {
      // Fetch the test image
      const imageResponse = await fetch('/test_image.jpg')
      const imageBlob = await imageResponse.blob()
      const imageFile = new File([imageBlob], 'test_image.jpg', { type: 'image/jpeg' })
      
      // Create FormData
      const formData = new FormData()
      formData.append('image', imageFile)
      
      // Test the API
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })
      
      const responseTime = Date.now() - startTime
      
      if (response.ok) {
        const data = await response.json()
        setStatus({
          isConnected: true,
          endpoint,
          message: `Backend connected successfully! Detected: ${data.predictions?.[0]?.class_name || 'objects'}`,
          responseTime,
        })
      } else {
        setStatus({
          isConnected: false,
          endpoint,
          message: `Backend responded with error: ${response.status}`,
          responseTime,
        })
      }
    } catch (error) {
      setStatus({
        isConnected: false,
        endpoint,
        message: error instanceof Error ? error.message : 'Failed to connect to backend',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status?.isConnected ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            Backend Connection Test
          </h3>
          <button
            onClick={closeModal}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Testing connection...</p>
            </div>
          ) : status ? (
            <div className="space-y-4">
              {/* Status */}
              <div className={`flex items-start gap-3 p-4 rounded-lg ${
                status.isConnected 
                  ? 'bg-green-500/10 border border-green-500/20' 
                  : 'bg-red-500/10 border border-red-500/20'
              }`}>
                {status.isConnected ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${
                    status.isConnected ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                  }`}>
                    {status.isConnected ? 'Connected' : 'Disconnected'}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 break-words">
                    {status.message}
                  </p>
                </div>
              </div>

              {/* Endpoint Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Endpoint:</span>
                  <span className="font-mono text-xs bg-muted px-2 py-1 rounded break-all max-w-[200px]">
                    {status.endpoint}
                  </span>
                </div>
                
                {status.responseTime && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium">
                      {status.responseTime}ms
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={testConnection}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Test Again
                </button>
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
                >
                  Close
                </button>
              </div>

              {!status.isConnected && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Troubleshooting:</strong><br/>
                    • Ensure backend server is running<br/>
                    • Check if running on http://127.0.0.1:8000<br/>
                    • Verify CORS settings are configured
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
