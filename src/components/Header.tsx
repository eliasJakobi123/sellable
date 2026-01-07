'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isUseCasesOpen, setIsUseCasesOpen] = useState(false)
  const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      setCloseTimer(null)
    }
    setIsUseCasesOpen(true)
  }

  const handleMouseLeave = () => {
    // Kleine Verzögerung beim Schließen, um das Navigieren zum Dropdown zu ermöglichen
    const timer = setTimeout(() => {
      setIsUseCasesOpen(false)
    }, 150)
    setCloseTimer(timer)
  }
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img
                  src="/sellablelogo.png"
                  alt="Sellable"
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-900 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </Link>

                {/* Use Cases Dropdown */}
                <div className="relative">
                  <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors flex items-center"
                  >
                    Use Cases
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isUseCasesOpen && (
                    <div
                      className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link
                        href="/starting-business"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        Starting Business
                      </Link>
                      <Link
                        href="/creators"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        Creators
                      </Link>
                      <Link
                        href="/professionals"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        Professionals
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/pricing"
                  className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
                >
                  Pricing
                </Link>
              </div>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/auth"
              className="text-gray-700 hover:text-black px-4 py-2 text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-black p-2"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
