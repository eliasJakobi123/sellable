"use client"

import Sidebar from '@/components/Sidebar'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, useState, useRef } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [bgKey, setBgKey] = useState<string | number>('static')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Animation nur beim ersten Laden/Öffnen des Dashboards (nicht bei Navigation)
    if (pathname === '/dashboard') {
      const hasAnimated = sessionStorage.getItem('dashboard-bg-animated')
      if (!hasAnimated) {
        sessionStorage.setItem('dashboard-bg-animated', 'true')
        setBgKey(Date.now()) // Trigger animation by changing key
      }
    }
  }, [pathname])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen items-start relative">
      {/* Background - must be first for proper layering */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .playground-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(
                to bottom,
                #ffffff 0%,    /* Weiß */
                #fefefe 10%,   /* Fast weiß */
                #f1f5f9 25%,   /* Sehr hell blau */
                #e2e8f0 45%,   /* Hell blau */
                #cbd5e1 65%,   /* Mittel blau */
                #94a3b8 80%,   /* Blau */
                #fdba74 90%,   /* Hell orange */
                #fb923c 100%   /* Orange */
            );
            z-index: -1;
            pointer-events: none;
            animation: backgroundFadeIn 1.5s ease-out;
            opacity: 1;
          }

          @keyframes backgroundFadeIn {
            0% {
              opacity: 0;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `
      }} />

      <div className="playground-background" key={bgKey}></div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content - transparent to show background */}
      <div className="flex-1 flex flex-col relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  )
}
