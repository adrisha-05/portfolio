"use client"

import { useEffect, useState } from "react"

export function HeroContent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      {/* Classification tag */}
      <div
        className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground transition-all duration-1000 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <span className="h-px w-8 bg-border" />
        <span>Top Secret</span>
        <span className="h-px w-8 bg-border" />
      </div>

      {/* Main heading */}
      <h1
        className={`font-mono text-4xl font-bold uppercase tracking-[0.15em] text-foreground transition-all duration-1000 delay-200 sm:text-5xl md:text-7xl lg:text-8xl ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <span className="text-primary">{"Agent:"}</span>{" "}
        <span className="text-balance">Adrisha Biswas</span>
      </h1>

      {/* Subtitle */}
      <p
        className={`max-w-md font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground transition-all duration-1000 delay-500 sm:text-base ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        Tactical Portfolio Interface
      </p>

      {/* Decorative line */}
      <div
        className={`h-px w-24 bg-border transition-all duration-1000 delay-700 ${
          mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      />

      {/* Glowing button */}
      <div
        className={`transition-all duration-1000 delay-1000 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <button
          className="group relative cursor-pointer border border-primary/50 bg-primary/10 px-10 py-4 font-mono text-sm uppercase tracking-[0.3em] text-primary transition-all duration-500 hover:border-primary hover:bg-primary/20 hover:shadow-[0_0_30px_rgba(56,189,156,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Enter the portfolio dossier"
        >
          {/* Glow pulse behind */}
          <span className="absolute inset-0 -z-10 animate-pulse bg-primary/5 blur-xl transition-all duration-500 group-hover:bg-primary/10 group-hover:blur-2xl" />
          Enter Dossier
          {/* Corner accents */}
          <span className="absolute -left-px -top-px h-3 w-3 border-l border-t border-primary" />
          <span className="absolute -right-px -top-px h-3 w-3 border-r border-t border-primary" />
          <span className="absolute -bottom-px -left-px h-3 w-3 border-b border-l border-primary" />
          <span className="absolute -bottom-px -right-px h-3 w-3 border-b border-r border-primary" />
        </button>
      </div>
    </div>
  )
}
