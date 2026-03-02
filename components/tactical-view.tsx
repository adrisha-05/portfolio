"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import Image from "next/image"
import {
  User,
  Crosshair,
  FileText,
  Users,
  Radio,
} from "lucide-react"
import { TacticalHudFrame } from "@/components/tactical-hud-frame"
import { useSound } from "@/hooks/use-sound"

// --------------- DATA ---------------

interface TacticalModule {
  id: string
  label: string
  icon: React.ElementType
  /** Angle in degrees around the avatar (0 = top) */
  angle: number
}

const MODULES: TacticalModule[] = [
  { id: "profile", label: "Agent Profile", icon: User, angle: -72 },
  { id: "abilities", label: "Core Abilities", icon: Crosshair, angle: -36 },
  { id: "missions", label: "Mission Log", icon: FileText, angle: 0 },
  { id: "squads", label: "Squads & Alliances", icon: Users, angle: 36 },
  { id: "contact", label: "Contact Channels", icon: Radio, angle: 72 },
]

// --------------- MODULE CONTENT ---------------

function ProfileContent() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-danger">
        Agent Profile
      </h3>
      <div className="h-px w-full bg-danger/15" />
      <div className="grid grid-cols-2 gap-3 font-mono text-[11px] uppercase tracking-wider">
        <div className="text-muted-foreground/40">Callsign</div>
        <div className="text-foreground/80">Adrisha</div>
        <div className="text-muted-foreground/40">Class</div>
        <div className="text-foreground/80">Interface Architect</div>
        <div className="text-muted-foreground/40">Status</div>
        <div className="text-danger/80">Active</div>
        <div className="text-muted-foreground/40">Clearance</div>
        <div className="text-foreground/80">Level 4</div>
        <div className="text-muted-foreground/40">Region</div>
        <div className="text-foreground/80">South-East Sector</div>
      </div>
    </div>
  )
}

function AbilitiesContent() {
  const skills = [
    { name: "UI / UX Design", level: 85 },
    { name: "Frontend Dev", level: 78 },
    { name: "Community Ops", level: 90 },
    { name: "Strategic Planning", level: 72 },
    { name: "Rapid Prototyping", level: 80 },
  ]
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-danger">
        Core Abilities
      </h3>
      <div className="h-px w-full bg-danger/15" />
      <div className="flex flex-col gap-3">
        {skills.map((s) => (
          <div key={s.name} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
              <span className="text-foreground/70">{s.name}</span>
              <span className="text-danger/60">{s.level}%</span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-danger/[0.08]">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${s.level}%`,
                  background:
                    "linear-gradient(90deg, var(--danger) 60%, rgba(255,255,255,0.2) 100%)",
                  boxShadow: "0 0 8px rgba(180,50,50,0.4)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MissionsContent() {
  const missions = [
    { code: "MSN-001", name: "Portfolio Genesis", status: "Complete" },
    { code: "MSN-002", name: "Community Hub Build", status: "Active" },
    { code: "MSN-003", name: "Design System V2", status: "Active" },
    { code: "MSN-004", name: "Open Source Recon", status: "Pending" },
  ]
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-danger">
        Mission Log
      </h3>
      <div className="h-px w-full bg-danger/15" />
      <div className="flex flex-col gap-2.5">
        {missions.map((m) => (
          <div
            key={m.code}
            className="flex items-center justify-between border border-danger/[0.06] bg-danger/[0.02] px-3 py-2"
            style={{
              clipPath:
                "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}
          >
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
              <span className="text-danger/50">{m.code}</span>
              <span className="text-foreground/70">{m.name}</span>
            </div>
            <span
              className={`font-mono text-[9px] uppercase tracking-widest ${
                m.status === "Complete"
                  ? "text-emerald-500/70"
                  : m.status === "Active"
                    ? "text-danger/70"
                    : "text-muted-foreground/40"
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SquadsContent() {
  const squads = [
    { name: "Design Corps", members: 12, role: "Lead" },
    { name: "Dev Recon", members: 8, role: "Member" },
    { name: "Community Vanguard", members: 24, role: "Founder" },
  ]
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-danger">
        {"Squads & Alliances"}
      </h3>
      <div className="h-px w-full bg-danger/15" />
      <div className="flex flex-col gap-2.5">
        {squads.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between border border-danger/[0.06] bg-danger/[0.02] px-3 py-2.5"
            style={{
              clipPath:
                "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-foreground/70">
                {s.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/40">
                {s.members} operatives
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-danger/60">
              {s.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  const channels = [
    { name: "GitHub", handle: "@adrisha-biswas", status: "Open" },
    { name: "Discord", handle: "adrisha#0001", status: "Open" },
    { name: "Email", handle: "encrypted-channel", status: "Secure" },
    { name: "Twitter / X", handle: "@adrisha_dev", status: "Open" },
  ]
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-danger">
        Contact Channels
      </h3>
      <div className="h-px w-full bg-danger/15" />
      <div className="flex flex-col gap-2.5">
        {channels.map((c) => (
          <div
            key={c.name}
            className="flex items-center justify-between border border-danger/[0.06] bg-danger/[0.02] px-3 py-2"
            style={{
              clipPath:
                "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)",
            }}
          >
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
              <span className="text-danger/50">{c.name}</span>
              <span className="text-foreground/60">{c.handle}</span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500/60">
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MODULE_CONTENT: Record<string, React.ReactNode> = {
  profile: <ProfileContent />,
  abilities: <AbilitiesContent />,
  missions: <MissionsContent />,
  squads: <SquadsContent />,
  contact: <ContactContent />,
}

// --------------- MAIN COMPONENT ---------------

interface TacticalViewProps {
  selectedRole: string
  onBack?: () => void
}

export function TacticalView({ selectedRole, onBack }: TacticalViewProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const { playClick } = useSound()

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(timer)
  }, [])

  const handleIconClick = useCallback(
    (moduleId: string) => {
      playClick()
      setActiveModule((prev) => (prev === moduleId ? null : moduleId))
    },
    [playClick]
  )

  const handleBack = useCallback(() => {
    playClick()
    onBack?.()
  }, [playClick, onBack])

  // Particles for aura drift
  const auraParticles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        angle: (360 / 14) * i + Math.random() * 20,
        distance: 80 + Math.random() * 100,
        size: Math.random() * 2.5 + 0.8,
        duration: `${Math.random() * 5 + 4}s`,
        delay: `${Math.random() * 3}s`,
        opacity: Math.random() * 0.5 + 0.15,
      })),
    []
  )

  // Background floating particles
  const bgParticles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 0.5,
        duration: `${Math.random() * 8 + 6}s`,
        delay: `${Math.random() * 4}s`,
        opacity: Math.random() * 0.35 + 0.08,
      })),
    []
  )

  // Orbit radius for radial icons (responsive)
  const ORBIT_RADIUS_SM = 130
  const ORBIT_RADIUS_LG = 185

  return (
    <div
      className="fixed inset-0 z-[90] flex overflow-hidden"
      style={{ backgroundColor: "#0b0b0f" }}
    >
      {/* ============ BACKGROUND LAYERS ============ */}

      {/* Red nebula clouds */}
      <div
        aria-hidden="true"
        className="animate-cinematic-drift pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 25% 35%, rgba(140,20,20,0.12) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 75% 65%, rgba(110,15,15,0.08) 0%, transparent 55%)",
          backgroundSize: "300% 300%",
          filter: "blur(90px)",
        }}
      />
      <div
        aria-hidden="true"
        className="animate-cinematic-drift-alt pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 60% 30%, rgba(120,10,10,0.06) 0%, transparent 55%)",
          backgroundSize: "300% 300%",
          filter: "blur(110px)",
        }}
      />

      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(180,50,50,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(180,50,50,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Scanning line */}
      <div
        aria-hidden="true"
        className="animate-scan-line pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(180,50,50,0.12) 20%, rgba(180,50,50,0.25) 50%, rgba(180,50,50,0.12) 80%, transparent 100%)",
          boxShadow: "0 0 16px 2px rgba(180,50,50,0.06)",
        }}
      />

      {/* Digital noise */}
      <div
        aria-hidden="true"
        className="animate-noise pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Background floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {bgParticles.map((p) => (
          <div
            key={p.id}
            className="animate-float-particle absolute rounded-full"
            style={{
              left: p.left,
              bottom: "-10px",
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `rgba(180,50,50,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 4}px rgba(180,50,50,${p.opacity * 0.5})`,
              ["--duration" as string]: p.duration,
              ["--delay" as string]: p.delay,
            }}
          />
        ))}
      </div>

      {/* ============ BACK BUTTON ============ */}
      {onBack && (
        <button
          onClick={handleBack}
          className={`group absolute left-6 top-6 z-50 flex cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 transition-all duration-500 hover:text-danger sm:left-10 sm:top-10 ${
            mounted ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
          }`}
          aria-label="Go back"
        >
          <svg
            viewBox="0 0 16 16"
            fill="none"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            aria-hidden="true"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back</span>
        </button>
      )}

      {/* ============ MAIN LAYOUT ============ */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center lg:flex-row lg:items-center lg:justify-center lg:gap-12 xl:gap-16">

        {/* ---------- LEFT: DEFAULT INFO PANEL ---------- */}
        <div
          className={`order-2 mt-6 flex w-full max-w-[280px] flex-col gap-4 px-4 transition-all duration-700 delay-300 sm:max-w-[300px] lg:order-1 lg:mt-0 lg:px-0 ${
            mounted
              ? "translate-x-0 opacity-100"
              : "-translate-x-8 opacity-0"
          }`}
        >
          <TacticalHudFrame glowIntensity={0.35}>
            <div className="flex flex-col gap-4 p-5">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-danger/50">
                  Operator ID
                </p>
                <h2 className="font-mono text-lg font-bold uppercase tracking-[0.15em] text-foreground/90">
                  Adrisha Biswas
                </h2>
              </div>

              {/* Tagline */}
              <p className="font-mono text-[10px] leading-relaxed tracking-wider text-muted-foreground/50">
                Building interfaces. Leading communities. Learning fast.
              </p>

              <div className="h-px w-full bg-danger/10" />

              {/* Role */}
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
                <span className="text-muted-foreground/40">Active Role</span>
                <span className="text-danger/70">{selectedRole || "Operator"}</span>
              </div>

              {/* Growth bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider">
                  <span className="text-muted-foreground/40">{"Growth / Health"}</span>
                  <span className="text-danger/60">70%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden bg-danger/[0.06]"
                  style={{
                    clipPath:
                      "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)",
                  }}
                >
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{
                      width: "70%",
                      background:
                        "linear-gradient(90deg, var(--danger) 60%, rgba(255,255,255,0.18) 100%)",
                      boxShadow: "0 0 10px rgba(180,50,50,0.4)",
                    }}
                  />
                </div>
              </div>

              {/* Status readout */}
              <div className="flex items-center gap-2">
                <div className="animate-loader-pulse h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-500/50">
                  Systems Nominal
                </span>
              </div>
            </div>
          </TacticalHudFrame>
        </div>

        {/* ---------- CENTER: AVATAR + RADIAL ICONS ---------- */}
        <div
          className={`relative order-1 flex items-center justify-center lg:order-2 ${
            mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
          } transition-all duration-700 delay-100`}
        >
          {/* Outer HUD ring (decorative) */}
          <div
            aria-hidden="true"
            className="animate-loader-spin-slow pointer-events-none absolute rounded-full"
            style={{
              width: `${ORBIT_RADIUS_LG * 2 + 70}px`,
              height: `${ORBIT_RADIUS_LG * 2 + 70}px`,
              border: "1px solid rgba(180,50,50,0.05)",
              borderTopColor: "rgba(180,50,50,0.12)",
            }}
          />
          <div
            aria-hidden="true"
            className="animate-loader-spin-reverse-slow pointer-events-none absolute rounded-full"
            style={{
              width: `${ORBIT_RADIUS_LG * 2 + 40}px`,
              height: `${ORBIT_RADIUS_LG * 2 + 40}px`,
              border: "1px dashed rgba(180,50,50,0.03)",
              borderBottomColor: "rgba(180,50,50,0.08)",
            }}
          />

          {/* Avatar aura layers */}
          <div
            aria-hidden="true"
            className="animate-aura-pulse pointer-events-none absolute rounded-full"
            style={{
              width: "260px",
              height: "340px",
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(180,40,40,0.18) 0%, rgba(140,20,20,0.06) 45%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            aria-hidden="true"
            className="animate-aura-pulse-delayed pointer-events-none absolute rounded-full"
            style={{
              width: "200px",
              height: "280px",
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(200,50,50,0.12) 0%, transparent 60%)",
              filter: "blur(30px)",
            }}
          />

          {/* Aura drift particles */}
          <div aria-hidden="true" className="pointer-events-none absolute">
            {auraParticles.map((p) => {
              const rad = (p.angle * Math.PI) / 180
              const x = Math.cos(rad) * p.distance
              const y = Math.sin(rad) * p.distance
              return (
                <div
                  key={p.id}
                  className="animate-aura-particle absolute rounded-full"
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    left: `${x}px`,
                    top: `${y}px`,
                    backgroundColor: `rgba(180,50,50,${p.opacity})`,
                    boxShadow: `0 0 ${p.size * 3}px rgba(180,50,50,${p.opacity * 0.6})`,
                    animationDuration: p.duration,
                    animationDelay: p.delay,
                  }}
                />
              )
            })}
          </div>

          {/* Operator avatar image */}
          <div className="relative h-[260px] w-[170px] sm:h-[320px] sm:w-[210px]">
            <Image
              src="/images/operator-avatar.png"
              alt="Operator avatar"
              fill
              className="object-contain drop-shadow-[0_0_30px_rgba(180,40,40,0.25)]"
              style={{ objectPosition: "center bottom" }}
              priority
            />
            {/* Floor reflection glow */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 h-8 w-32 -translate-x-1/2"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(180,40,40,0.2) 0%, transparent 70%)",
                filter: "blur(8px)",
              }}
            />
          </div>

          {/* Radial tactical icons */}
          {MODULES.map((mod) => {
            const Icon = mod.icon
            const isActive = activeModule === mod.id
            const isHovered = hoveredIcon === mod.id

            // Position along a vertical arc (angles measured from horizontal right)
            // We map the angles to place icons to the left (-) and right (+) of the avatar
            const rad = ((mod.angle - 90) * Math.PI) / 180

            return (
              <div
                key={mod.id}
                className="absolute"
                style={{
                  transform: `translate(calc(${Math.cos(rad) * ORBIT_RADIUS_LG}px - 50%), calc(${Math.sin(rad) * ORBIT_RADIUS_LG}px - 50%))`,
                }}
              >
                <button
                  onClick={() => handleIconClick(mod.id)}
                  onMouseEnter={() => setHoveredIcon(mod.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className={`group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger/50 sm:h-12 sm:w-12 ${
                    isActive
                      ? "border-danger/60 bg-danger/[0.12] shadow-[0_0_20px_-3px] shadow-danger/30"
                      : "border-danger/20 bg-[#0b0b0f]/80 hover:border-danger/50 hover:bg-danger/[0.06] hover:shadow-[0_0_16px_-4px] hover:shadow-danger/20"
                  }`}
                  aria-label={mod.label}
                  aria-pressed={isActive}
                >
                  <Icon
                    className={`h-4 w-4 transition-colors duration-300 sm:h-5 sm:w-5 ${
                      isActive
                        ? "text-danger"
                        : "text-danger/50 group-hover:text-danger/80"
                    }`}
                  />
                  {/* Glow ring */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 animate-pulse rounded-full"
                      style={{
                        boxShadow: "0 0 12px rgba(180,50,50,0.25)",
                      }}
                    />
                  )}
                </button>

                {/* Hover label */}
                <div
                  className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                    isHovered || isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
                  }`}
                >
                  <span className="rounded border border-danger/15 bg-[#0b0b0f]/90 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-danger/70 shadow-lg">
                    {mod.label}
                  </span>
                </div>
              </div>
            )
          })}

          {/* Small mobile orbit (hidden on lg+, used for sm) */}
          <style>{`
            @media (max-width: 1023px) {
              .tactical-icon-orbit {
                --orbit-r: ${ORBIT_RADIUS_SM}px;
              }
            }
          `}</style>
        </div>

        {/* ---------- RIGHT: DYNAMIC CONTENT PANEL ---------- */}
        <div
          className={`order-3 mt-6 flex w-full max-w-[280px] flex-col gap-4 px-4 transition-all duration-700 delay-500 sm:max-w-[320px] lg:mt-0 lg:px-0 ${
            mounted
              ? "translate-x-0 opacity-100"
              : "translate-x-8 opacity-0"
          }`}
        >
          <TacticalHudFrame glowIntensity={activeModule ? 0.45 : 0.2}>
            <div className="min-h-[220px] p-5">
              {activeModule ? (
                <div
                  key={activeModule}
                  className="animate-loader-text"
                >
                  {MODULE_CONTENT[activeModule]}
                </div>
              ) : (
                <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 text-center">
                  <Crosshair className="h-6 w-6 text-danger/20" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/30">
                    Select a module to view intel
                  </p>
                  <div className="h-px w-12 bg-danger/10" />
                  <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/20">
                    5 modules available
                  </p>
                </div>
              )}
            </div>
          </TacticalHudFrame>
        </div>
      </div>

      {/* ============ BOTTOM STATUS ============ */}
      <div
        className={`absolute bottom-6 left-0 right-0 z-20 flex justify-center transition-all duration-700 delay-700 sm:bottom-10 ${
          mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-danger/15" />
          <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground/25 sm:text-[9px]">
            Tactical Command Interface v1.0
          </p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-danger/15" />
        </div>
      </div>
    </div>
  )
}
