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

export async function classifyTrash(imageUrl: string): Promise<TrashCategory> {
  try {
    // Convert base64 data URL to File object
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], "image.jpg", { type: blob.type })

    // Create FormData and append the image
    const formData = new FormData()
    formData.append("image", file)

    // Call Python backend API
    const apiResponse = await fetch("http://127.0.0.1:8000/api/classify/", {
      method: "POST",
      body: formData,
    })

    if (!apiResponse.ok) {
      throw new Error(`API error: ${apiResponse.status}`)
    }

    const data = await apiResponse.json()
    
    // Get the first prediction's class_name
    if (data.predictions && data.predictions.length > 0) {
      const className = data.predictions[0].class_name?.toLowerCase()
      
      // Map class name to our category
      if (categories.includes(className as TrashCategory)) {
        return className as TrashCategory
      }
    }
    
    // Fallback to random if invalid category
    console.warn("Invalid or no category received:", data)
    const randomIndex = Math.floor(Math.random() * categories.length)
    return categories[randomIndex]
  } catch (error) {
    console.error("Classification error:", error)
    // Fallback to random category on error
    const randomIndex = Math.floor(Math.random() * categories.length)
    return categories[randomIndex]
  }
}
