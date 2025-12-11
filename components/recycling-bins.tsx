"use client"

import { categoryConfig, type TrashCategory } from "@/lib/classify"
import { cn } from "@/lib/utils"

interface RecyclingBinsProps {
  stats: Record<TrashCategory, number>
  activeBin?: TrashCategory | null
  modelClasses?: number
}

// Different bin configurations based on model
const bin3Classes: TrashCategory[] = ["cardboard", "plastic", "glass"]
const bin12Classes: TrashCategory[] = ["paper", "cardboard", "plastic", "vegetation", "biological", "metal", "clothes", "glass", "trash", "shoes", "battery"]

export function RecyclingBins({ stats, activeBin, modelClasses = 12 }: RecyclingBinsProps) {
  // Select bins based on number of classes
  const binOrder = modelClasses === 3 ? bin3Classes : bin12Classes
  
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 max-w-full">
      {binOrder.map((category) => {
        const config = categoryConfig[category]
        const count = stats[category]
        const isActive = activeBin === category
        const fillPercent = Math.min(count * 15, 85)

        return (
          <div key={category} className="flex flex-col items-center gap-1">
            <div
              className={cn("relative transition-all duration-300", isActive && "animate-bin-receive")}
              style={{
                filter: isActive
                  ? `drop-shadow(0 0 20px ${config.color})`
                  : count > 0
                    ? `drop-shadow(0 4px 8px rgba(0,0,0,0.2))`
                    : `drop-shadow(0 2px 4px rgba(0,0,0,0.1))`,
              }}
            >
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 z-20 pointer-events-none"
                style={{
                  display: isActive ? "block" : "none",
                }}
              />

              {/* Lid */}
              <div
                className={cn(
                  "relative z-10 transition-all duration-300 origin-left",
                  isActive && "-rotate-45 -translate-y-3",
                )}
                style={{
                  width: "56px",
                  height: "10px",
                  backgroundColor: config.color,
                  borderRadius: "5px 5px 0 0",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {/* Lid handle */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-8 h-2.5 rounded-t-full"
                  style={{
                    backgroundColor: config.color,
                    filter: "brightness(0.85)",
                  }}
                />
                {/* Lid shine */}
                <div className="absolute top-0.5 left-2 w-6 h-1 rounded-full bg-white/30" />
              </div>

              {/* Bin opening (dark hole visible when lid is open) */}
              <div
                className="relative mx-auto overflow-hidden"
                style={{
                  width: "52px",
                  height: "8px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: "2px 2px 0 0",
                }}
              />

              {/* Main bin body */}
              <div
                className="relative mx-auto overflow-hidden"
                style={{
                  width: "52px",
                  height: "60px",
                  background: `linear-gradient(135deg, ${config.color} 0%, ${config.color} 100%)`,
                  borderRadius: "0 0 6px 6px",
                  clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)",
                }}
              >
                {/* Bin ridges for texture */}
                <div className="absolute inset-0 flex flex-col justify-evenly py-2 px-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-1 rounded-full" style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
                  ))}
                </div>

                {/* Icon on bin */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-2xl drop-shadow-md" role="img" aria-label={config.label}>
                    {config.icon}
                  </span>
                </div>

                {/* Fill level - trash inside */}
                <div
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                  style={{
                    height: `${fillPercent}%`,
                    background: `linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0.15))`,
                    borderRadius: "0 0 4px 4px",
                  }}
                >
                  {/* Trash pile texture */}
                  {count > 0 && (
                    <div
                      className="absolute top-0 left-0 right-0 h-3"
                      style={{
                        background: `radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.25) 0%, transparent 50%),
                                     radial-gradient(ellipse at 70% 0%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
                      }}
                    />
                  )}
                </div>

                {/* Side shine */}
                <div
                  className="absolute top-0 left-0 bottom-0 w-3"
                  style={{
                    background: "linear-gradient(to right, rgba(255,255,255,0.3), transparent)",
                  }}
                />

                {/* Right shadow */}
                <div
                  className="absolute top-0 right-0 bottom-0 w-4"
                  style={{
                    background: "linear-gradient(to left, rgba(0,0,0,0.2), transparent)",
                  }}
                />
              </div>

              <div
                className="mx-auto"
                style={{
                  width: "46px",
                  height: "5px",
                  backgroundColor: config.color,
                  filter: "brightness(0.7)",
                  borderRadius: "0 0 3px 3px",
                }}
              />

              {/* Count badge */}
              {count > 0 && (
                <div
                  className={cn(
                    "absolute -top-3 -right-1.5 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center shadow-lg border-2 border-background z-20",
                    isActive && "animate-bounce",
                  )}
                >
                  {count}
                </div>
              )}

              {/* Active splash ring */}
              {isActive && (
                <div
                  className="absolute -inset-2 rounded-xl animate-splash-ring pointer-events-none"
                  style={{ borderColor: config.color }}
                />
              )}
            </div>

            <span className="text-[10px] font-semibold text-center mt-1 max-w-[60px] break-words leading-tight" style={{ color: config.color }}>
              {config.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
