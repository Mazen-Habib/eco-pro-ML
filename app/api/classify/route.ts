import { type NextRequest, NextResponse } from "next/server"

type TrashCategory = "plastic" | "paper" | "bio" | "glass" | "metal" | "ewaste"

const categories: TrashCategory[] = ["plastic", "paper", "bio", "glass", "metal", "ewaste"]

export async function POST(request: NextRequest) {
  try {
    // Get the image from request (we don't actually process it in this demo)
    const body = await request.json()

    if (!body.image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Return random category (demo purposes)
    const randomIndex = Math.floor(Math.random() * categories.length)
    const category = categories[randomIndex]

    // Add some fake confidence scores
    const confidence = 0.7 + Math.random() * 0.25

    return NextResponse.json({
      category,
      confidence: Math.round(confidence * 100) / 100,
      message: `Classified as ${category} with ${Math.round(confidence * 100)}% confidence`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to classify image" }, { status: 500 })
  }
}
