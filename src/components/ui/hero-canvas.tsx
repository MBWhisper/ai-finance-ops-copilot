"use client"

import { useEffect, useRef, useState } from "react"

const TWO_PI = Math.PI * 2
const PHI = 1.6180339887
const PHI2 = PHI * PHI

function mulberry32(seed: number) {
  let s = seed | 0
  return function () {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), s | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function createPerm(seed: number): Uint8Array {
  const p = new Uint8Array(512)
  const rng = mulberry32(seed)
  const arr = new Array(256)
  for (let i = 0; i < 256; i++) arr[i] = Math.floor(rng() * 256)
  for (let i = 0; i < 512; i++) p[i] = arr[i & 255]
  return p
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10)
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a)
}

function valueNoise(x: number, y: number, perm: Uint8Array): number {
  const ix = Math.floor(x) & 255
  const iy = Math.floor(y) & 255
  const fx = x - Math.floor(x)
  const fy = y - Math.floor(y)
  const u = fade(fx)
  const v = fade(fy)
  const v00 = perm[perm[ix] + iy] / 255
  const v10 = perm[perm[ix + 1] + iy] / 255
  const v01 = perm[perm[ix] + iy + 1] / 255
  const v11 = perm[perm[ix + 1] + iy + 1] / 255
  return lerp(lerp(v00, v10, u), lerp(v01, v11, u), v)
}

function getFieldAngle(
  x: number,
  y: number,
  t: number,
  ns: number,
  perm: Uint8Array,
  coupling: number,
  seed: number,
): number {
  const nx = x * ns
  const ny = y * ns
  const a1 = valueNoise(nx + t, ny + t, perm) * TWO_PI * 4
  const a2 = valueNoise(nx * PHI + t * 1.3, ny * PHI + t * 1.3, perm) * TWO_PI * 2
  const a3 = valueNoise(nx * PHI2 + t * 0.7, ny * PHI2 + t * 0.7, perm) * Math.PI
  const fieldA = a1 + a2 + a3
  const offset = 31.41592 + seed * 0.00137
  const b1 = valueNoise(nx + t + offset, ny + t + offset, perm) * TWO_PI * 4
  const b2 = valueNoise((nx + offset) * PHI + t * 1.3, (ny + offset) * PHI + t * 1.3, perm) * TWO_PI * 2
  const b3 = valueNoise((nx + offset) * PHI2 + t * 0.7, (ny + offset) * PHI2 + t * 0.7, perm) * Math.PI
  const fieldB = b1 + b2 + b3
  return fieldA * (1 - coupling) + fieldB * coupling
}

interface Particle {
  x: number
  y: number
  life: number
  speed: number
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Defer canvas start until after LCP paint
  const [active, setActive] = useState(false)

  useEffect(() => {
    // Wait for browser to be idle so we don't compete with LCP
    const id = setTimeout(() => setActive(true), 300)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const perm = createPerm(42742)
    const bgRGB = hexToRgb("#080c0d")

    let animId = 0
    let particles: Particle[] = []
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.fillStyle = "#080c0d"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener("resize", resize)

    const w = canvas.width
    const h = canvas.height
    // Reduced particle count: mobile 200, tablet 500, desktop 700
    const count = w > 1400 ? 700 : w < 768 ? 200 : 500
    const trailAlpha = w < 768 ? 30 : 18

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        life: Math.random(),
        speed: 0.6 + Math.random() * 1.6,
      })
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) {
      window.removeEventListener("resize", resize)
      return
    }

    const cold: [number, number, number] = [15, 25, 80]
    const mid: [number, number, number] = [1, 105, 111]
    const warm: [number, number, number] = [245, 158, 11]

    function lerpColor(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
    }

    function getColor(v: number, life: number): string {
      const vel = Math.min(1, Math.max(0, v))
      let rgb: [number, number, number]
      if (vel < 0.5) {
        rgb = lerpColor(cold, mid, vel * 2)
      } else {
        rgb = lerpColor(mid, warm, (vel - 0.5) * 2)
      }
      const alpha = Math.round(12 + life * Math.sin(life * Math.PI) * 55)
      const clamped = Math.min(255, Math.max(0, alpha))
      return `rgba(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0},${clamped / 255})`
    }

    function draw() {
      ctx.fillStyle = `rgba(${bgRGB[0]},${bgRGB[1]},${bgRGB[2]},${trailAlpha / 255})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life += 0.003
        if (p.life > 1) {
          p.life = 0
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
          p.speed = 0.6 + Math.random() * 1.6
        }

        const angle = getFieldAngle(p.x, p.y, time, 0.0025, perm, 0.52, 42742)
        const vx = Math.cos(angle) * p.speed * 1.4
        const vy = Math.sin(angle) * p.speed * 1.4

        const vel = valueNoise(p.x * 0.003 + 42742, p.y * 0.003 + 42742, perm)

        ctx.fillStyle = getColor(vel, p.life)
        ctx.fillRect(p.x | 0, p.y | 0, 1.5, 1.5)

        p.x += vx
        p.y += vy

        if (p.x < 0) p.x += canvas.width
        if (p.x >= canvas.width) p.x -= canvas.width
        if (p.y < 0) p.y += canvas.height
        if (p.y >= canvas.height) p.y -= canvas.height
      }

      time += 0.00025
    }

    function frame() {
      draw()
      animId = requestAnimationFrame(frame)
    }

    animId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", resize)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
