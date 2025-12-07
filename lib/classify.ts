export type TrashCategory = "cardboard" | "plastic" | "glass"

export const categoryConfig: Record<
  TrashCategory,
  {
    label: string
    color: string
    icon: string
    position: number
  }
> = {
  cardboard: {
    label: "Cardboard",
    color: "#c9b458",
    icon: "📦",
    position: 25,
  },
  plastic: {
    label: "Plastic",
    color: "#5b9bd5",
    icon: "🥤",
    position: 50,
  },
  glass: {
    label: "Glass",
    color: "#45b7d1",
    icon: "🍾",
    position: 75,
  },
}

const categories: TrashCategory[] = ["cardboard", "plastic", "glass"]

export async function classifyTrash(imageUrl: string): Promise<{ category: TrashCategory; foregroundImage?: string }> {
  try {
    // Convert base64 data URL to File object
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], "image.jpg", { type: blob.type })

    // Create FormData and append the image
    const formData = new FormData()
    formData.append("image", file)

    // Call Next.js API route (which proxies to Python backend)
    const apiResponse = await fetch("/api/classify", {
      method: "POST",
      body: formData,
    })

    if (!apiResponse.ok) {
      throw new Error(`API error: ${apiResponse.status}`)
    }

    const data = await apiResponse.json()
    
    // Get the first prediction's class_name
    let category: TrashCategory
    if (data.predictions && data.predictions.length > 0) {
      const className = data.predictions[0].class_name?.toLowerCase()
      
      // Map class name to our category
      if (categories.includes(className as TrashCategory)) {
        category = className as TrashCategory
      } else {
        // Fallback to random if invalid category
        console.warn("Invalid category received:", className)
        const randomIndex = Math.floor(Math.random() * categories.length)
        category = categories[randomIndex]
      }
    } else {
      // Fallback to random if no predictions
      console.warn("No predictions received:", data)
      const randomIndex = Math.floor(Math.random() * categories.length)
      category = categories[randomIndex]
    }
    
    // Return category and foreground image (if available)
    const foregroundImage = data.foreground_image 
      ? `data:image/png;base64,${data.foreground_image}` 
      : undefined
    
    return { category, foregroundImage }
  } catch (error) {
    console.error("Classification error:", error)
    // Fallback to random category on error
    const randomIndex = Math.floor(Math.random() * categories.length)
    return { category: categories[randomIndex] }
  }
}
