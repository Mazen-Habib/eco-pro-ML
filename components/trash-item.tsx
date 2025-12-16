"use client"

import type { ProcessingItem } from "./recycling-plant"
import { cn } from "@/lib/utils"
import { categoryConfig } from "@/lib/classify"

interface TrashItemProps {
  item: ProcessingItem
}

export function TrashItem({ item }: TrashItemProps) {
  const config = item.category ? categoryConfig[item.category] : null

  return (
    <div
      className={cn(
        "absolute top-1/2 z-10",
        "transition-all ease-linear",
        item.status === "entering" && "duration-300",
        item.status === "traveling" && "duration-[2000ms]",
        item.status === "classified" && "duration-[1000ms]",
        item.status === "dropping" && "duration-[800ms] ease-[cubic-bezier(0.55,0.055,0.675,0.19)]",
      )}
      style={{
        left: `${item.position}%`,
        transform:
          item.status === "dropping" ? "translate(-50%, 120px) rotate(20deg) scale(0.4)" : "translate(-50%, -50%)",
        opacity: item.status === "dropping" ? 0 : 1,
        zIndex: item.status === "dropping" ? 30 : 10,
      }}
    >
      <div
        className={cn(
          "relative",
          item.status === "entering" && "animate-bounce-in",
          (item.status === "traveling" || item.status === "classified") && "animate-float",
        )}
      >
        {/* Item image */}
        <div
          className={cn(
            "w-14 h-14 rounded-xl overflow-hidden bg-card border-2 shadow-lg transition-all duration-300",
            item.status === "classified" && "border-primary ring-4 ring-primary/30",
          )}
          style={{
            borderColor: item.category && item.status === "classified" ? config?.color : undefined,
            boxShadow: item.category && item.status === "classified" ? `0 0 20px ${config?.color}60` : undefined,
          }}
        >
          <img src={item.imageUrl || "/placeholder.svg"} alt="Trash item" className="w-full h-full object-cover" />
        </div>

        {/* Category label - show when classified */}
        {item.category && (item.status === "classified" || item.status === "dropping") && (
          <div
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap shadow-lg animate-bounce-in"
            style={{
              backgroundColor: config?.color,
              color: "#fff",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {config?.label}
          </div>
        )}
      </div>
    </div>
  )
}
