"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [announcementDismissed, setAnnouncementDismissed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href.startsWith("/#")) return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Announcement Bar */}
      {!announcementDismissed && (
        <div className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center text-xs sm:text-sm py-2.5 px-4">
          <span className="inline-flex items-center gap-1">
            🚀 AI Finance Ops is live! Get 50% off your first month →{" "}
            <Link href="/pricing" className="font-bold underline underline-offset-2 hover:no-underline">
              Use code LAUNCH50
            </Link>
          </span>
          <button
            onClick={() => setAnnouncementDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss announcement"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-800/80 bg-gray-950/95 backdrop-blur-2xl"
            : "bg-gray-950/80 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Left — Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Logo size={28} />
            <span className="text-sm font-semibold text-white">AI Finance Ops</span>
          </Link>

          {/* Center — Nav Links (desktop) */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    active ? "text-emerald-400" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-4 rounded-full bg-emerald-500" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right — Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Sign In (desktop) */}
            <Link
              href="/login"
              className="hidden sm:inline-flex text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign in
            </Link>

            {/* CTA Button */}
            <Link
              href="/register"
              className="group inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 sm:px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
            >
              Start free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 z-[110] h-full w-full max-w-sm bg-gray-950 border-l border-gray-800 md:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <Logo size={24} />
                  <span className="text-sm font-semibold text-white">AI Finance Ops</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-1">
                {navLinks.map((link) => {
                  const active = isActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 text-lg font-medium rounded-xl transition-colors ${
                        active
                          ? "text-emerald-400 bg-emerald-500/5"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <div className="p-6 border-t border-gray-800 space-y-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 text-sm font-medium text-gray-400 hover:text-white rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
                >
                  Start free trial →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
