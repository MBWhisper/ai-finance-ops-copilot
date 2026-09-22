"use client"
import { useEffect, useRef } from "react"

export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const parent = el.parentElement
    if (!parent) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    let raf = 0
    let mx = -1000
    let my = -1000
    let curMx = -1000
    let curMy = -1000

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      // smooth lerp
      curMx += (mx - curMx) * 0.08
      curMy += (my - curMy) * 0.08
      el.style.setProperty("--mx", `${curMx}px`)
      el.style.setProperty("--my", `${curMy}px`)
      el.style.opacity = mx < -200 ? "0" : "1"
      if (Math.abs(mx - curMx) > 0.5 || Math.abs(my - curMy) > 0.5) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    const onLeave = () => {
      el.style.opacity = "0"
    }

    parent.addEventListener("mousemove", onMove, { passive: true })
    parent.addEventListener("mouseleave", onLeave)

    // touch fallback: hide
    return () => {
      parent.removeEventListener("mousemove", onMove)
      parent.removeEventListener("mouseleave", onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--mx, -1000px) var(--my, -1000px), rgba(16,185,129,0.12), transparent 40%), radial-gradient(900px circle at var(--mx, -1000px) var(--my, -1000px), rgba(16,185,129,0.06), transparent 55%)`,
      }}
    />
  )
}

export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-soft-light"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
      }}
    />
  )
}
