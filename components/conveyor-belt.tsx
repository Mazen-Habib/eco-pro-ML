"use client"

import type { ReactNode } from "react"

interface ConveyorBeltProps {
  children: ReactNode
}

export function ConveyorBelt({ children }: ConveyorBeltProps) {
  return (
    <div className="relative w-full h-32">
      {/* Conveyor structure */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        {/* Side rails */}
        <div className="absolute -top-3 left-0 right-0 h-2 bg-secondary rounded-full shadow-inner" />
        <div className="absolute -bottom-3 left-0 right-0 h-2 bg-secondary rounded-full shadow-inner" />

        {/* Belt surface */}
        <div
          className="h-14 bg-muted rounded-lg animate-conveyor overflow-hidden shadow-inner"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 18px,
              rgba(0,0,0,0.08) 18px,
              rgba(0,0,0,0.08) 20px
            ), repeating-linear-gradient(
              90deg,
              transparent,
              transparent 38px,
              rgba(0,0,0,0.15) 38px,
              rgba(0,0,0,0.15) 40px
            )`,
            backgroundSize: "40px 100%, 40px 100%",
          }}
        />

        {/* Belt wheels */}
        <div className="absolute -left-5 top-1/2 -translate-y-1/2">
          <div
            className="w-12 h-12 rounded-full bg-secondary border-4 border-muted-foreground/30 animate-spin shadow-md"
            style={{ animationDuration: "1s" }}
          >
            <div className="absolute inset-2 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
        <div className="absolute -right-5 top-1/2 -translate-y-1/2">
          <div
            className="w-12 h-12 rounded-full bg-secondary border-4 border-muted-foreground/30 animate-spin shadow-md"
            style={{ animationDuration: "1s" }}
          >
            <div className="absolute inset-2 rounded-full bg-muted-foreground/20" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-visible">{children}</div>

      {/* Scanner beam effect - positioned at center */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 pointer-events-none">
        <div className="w-full h-full bg-primary/30 blur-sm" />
        <div className="absolute inset-0 bg-primary/60 animate-pulse" />
        <div className="absolute -left-4 -right-4 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute -left-4 -right-4 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  )
}
