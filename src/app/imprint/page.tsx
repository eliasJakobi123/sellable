"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 text-center">
              Imprint
            </h1>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
