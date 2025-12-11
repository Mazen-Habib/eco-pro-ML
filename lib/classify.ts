export type TrashCategory = "paper" | "cardboard" | "plastic" | "vegetation" | "biological" | "metal" | "clothes" | "glass" | "trash" | "shoes" | "battery"

export const categoryConfig: Record<
  TrashCategory,
  {
    label: string
    color: string
    icon: string
    position: number
  }
> = {
  paper: {
    label: "paper",
    color: "#e8e8e8",
    icon: "📄",
    position: 9,
  },
  cardboard: {
    label: "cardboard",
    color: "#c9b458",
    icon: "📦",
    position: 18,
  },
  plastic: {
    label: "plastic",
    color: "#5b9bd5",
    icon: "🥤",
    position: 27,
  },
  vegetation: {
    label: "vegetation",
    color: "#7cb342",
    icon: "🌿",
    position: 36,
  },
  biological: {
    label: "biological",
    color: "#8d6e63",
    icon: "🍂",
    position: 45,
  },
  metal: {
    label: "metal",
    color: "#9e9e9e",
    icon: "🔩",
    position: 54,
  },
  clothes: {
    label: "clothes",
    color: "#ab47bc",
    icon: "👕",
    position: 63,
  },
  glass: {
    label: "glass",
    color: "#45b7d1",
    icon: "🍾",
    position: 72,
  },
  trash: {
    label: "trash",
    color: "#424242",
    icon: "🗑️",
    position: 81,
  },
  shoes: {
    label: "shoes",
    color: "#6d4c41",
    icon: "👟",
    position: 90,
  },
  battery: {
    label: "battery",
    color: "#ffd54f",
    icon: "🔋",
    position: 100,
  },
}

const categories: TrashCategory[] = ["paper", "cardboard", "plastic", "vegetation", "biological", "metal", "clothes", "glass", "trash", "shoes", "battery"]

export async function classifyTrash(imageUrl: string, modelKey?: string): Promise<{ category: TrashCategory }> {
  try {
    // Convert base64 data URL to File object
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], "image.jpg", { type: blob.type })

    // Create FormData and append the image
    const formData = new FormData()
    formData.append("image", file)
    if (modelKey) {
      formData.append("model", modelKey)
    }

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
      const className = data.predictions[0].class_name?.toLowerCase().trim()
      
      // Create mapping for variations
      const classNameMap: Record<string, TrashCategory> = {
        'paper': 'paper',
        'cardboard': 'cardboard',
        'plastic': 'plastic',
        'vegetation': 'vegetation',
        'biological': 'biological',
        'metal': 'metal',
        'clothes': 'clothes',
        'glass': 'glass',
        'miscellaneous trash': 'trash',
        'miscellaneous': 'trash',
        'trash': 'trash',
        'shoes': 'shoes',
        'battery': 'battery',
      }
      
      // Map class name to our category
      if (classNameMap[className]) {
        category = classNameMap[className]
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
    
    return { category }
  } catch (error) {
    console.error("Classification error:", error)
    // Fallback to random category on error
    const randomIndex = Math.floor(Math.random() * categories.length)
    return { category: categories[randomIndex] }
  }
}
