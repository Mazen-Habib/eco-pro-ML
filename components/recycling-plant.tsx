"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ImageUploader } from "./image-uploader"
import { ConveyorBelt } from "./conveyor-belt"
import { RecyclingBins } from "./recycling-bins"
import { TrashItem } from "./trash-item"
import { classifyTrash, type TrashCategory } from "@/lib/classify"
import { Recycle, BarChart3 } from "lucide-react"

export interface ProcessingItem {
  id: string
  imageUrl: string
  category: TrashCategory | null
  status: "entering" | "traveling" | "classified" | "dropping" | "done"
  position: number // 0-100 representing position on conveyor
}

export function RecyclingPlant() {
  const [items, setItems] = useState<ProcessingItem[]>([])
  const [stats, setStats] = useState<Record<TrashCategory, number>>({
    cardboard: 0,
    plastic: 0,
    glass: 0,
  })
  const [activeBin, setActiveBin] = useState<TrashCategory | null>(null)

  const handleImageUpload = useCallback(async (imageUrl: string) => {
    const id = Math.random().toString(36).substring(7)

    const newItem: ProcessingItem = {
      id,
      imageUrl,
      category: null,
      status: "entering",
      position: 0,
    }

    setItems((prev) => [...prev, newItem])

    setTimeout(() => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "traveling", position: 50 } : item)))
    }, 300)

    setTimeout(async () => {
      const category = await classifyTrash(imageUrl)
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, category, status: "classified" } : item)))

      setTimeout(() => {
        setItems((prev) => prev.map((item) => (item.id === id ? { ...item, position: 95 } : item)))

        setTimeout(() => {
          setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "dropping" } : item)))

          setActiveBin(category)
          setTimeout(() => setActiveBin(null), 600)

          setTimeout(() => {
            setStats((prev) => ({
              ...prev,
              [category]: prev[category] + 1,
            }))
            setItems((prev) => prev.filter((item) => item.id !== id))
          }, 800)
        }, 1000)
      }, 800)
    }, 2300)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="py-4 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">EcoSort</h1>
              <p className="text-xs text-muted-foreground">AI-Powered Recycling</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/stats"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-accent hover:border-primary transition-colors text-sm font-medium"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Model Stats</span>
            </Link>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Items Sorted</p>
              <p className="text-xl font-bold text-primary">{Object.values(stats).reduce((a, b) => a + b, 0)}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-8">
          {/* Left: Upload Box */}
          <div className="w-full lg:w-48 shrink-0 flex flex-col items-center">
            <div className="text-center mb-3">
              <h2 className="text-lg font-semibold">Drop Trash</h2>
              <p className="text-xs text-muted-foreground">Upload an image</p>
            </div>
            <ImageUploader onUpload={handleImageUpload} />
          </div>

          {/* Center: Conveyor Belt - takes remaining space */}
          <div className="flex-1 w-full min-w-0 px-6">
            <ConveyorBelt>
              {items.map((item) => (
                <TrashItem key={item.id} item={item} />
              ))}
            </ConveyorBelt>
          </div>

          {/* Right: Recycling Bins */}
          <div className="w-full lg:w-auto shrink-0 flex justify-center">
            <RecyclingBins stats={stats} activeBin={activeBin} />
          </div>
        </div>
      </main>
    </div>
  )
}
