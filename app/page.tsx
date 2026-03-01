import { HeroContent } from "@/components/hero-content"
import { StatusBar } from "@/components/status-bar"
import { Scanlines } from "@/components/scanlines"
import { GridBackground } from "@/components/grid-background"

export default function Home() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Background layers */}
      <GridBackground />
      <Scanlines />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Hero */}
      <div className="relative z-20">
        <HeroContent />
      </div>

      {/* Status bar */}
      <StatusBar />
    </main>
  )
}
