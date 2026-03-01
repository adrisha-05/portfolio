export function Scanlines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)",
      }}
    />
  )
}
