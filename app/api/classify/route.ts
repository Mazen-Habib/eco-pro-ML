import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Get the FormData from the request
    const formData = await request.formData()
    
    // Forward the request to the Python backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000"
    const response = await fetch(`${backendUrl}/api/classify/`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      { error: "Failed to classify image" }, 
      { status: 500 }
    )
  }
}
