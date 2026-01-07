"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-indigo-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left side - Image */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 rounded-3xl h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-28 h-28 bg-white rounded-full shadow-xl flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-14 h-14 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Innovation</h3>
                    <p className="text-gray-600 text-sm">AI-powered creativity</p>
                  </div>
                </div>
              </div>

              {/* Right side - Content */}
              <div className="lg:col-span-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Empowering creators to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> build the future</span>
                </h1>

                <div className="space-y-4 text-base text-gray-700 leading-relaxed">
                  <p>
                    In a world where ideas move at the speed of light, we believe that creativity should never be limited by time or technical barriers. Our mission is to democratize digital creation.
                  </p>

                  <p>
                    Through the power of artificial intelligence, we're building the bridge between imagination and implementation. Every creator deserves the opportunity to share their unique perspective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                What drives us to build better tools for creators
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600 text-sm">Pushing the boundaries of what's possible with AI and creativity.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600 text-sm">Making professional tools available to creators of all backgrounds.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact</h3>
                <p className="text-gray-600 text-sm">Helping creators build businesses and share knowledge that matters.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
