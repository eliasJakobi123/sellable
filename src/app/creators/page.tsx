"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'

export default function CreatorsPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section - Clean and focused */}
        <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white from-[66%] via-pink-300 to-purple-400">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-16 leading-tight">
              <span className="text-gray-900">Monetize </span>
              <span className="text-[#000000]">your content.</span>
            </h1>
            <button className="bg-[#000000] text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-gray-900 transition-colors duration-300">
              Start Creating Now
            </button>
          </div>
        </section>

        {/* What creators are building Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What creators are building with Sellable
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Transform your expertise into profitable content across multiple formats
              </p>
            </div>

            {/* Slideshow Container */}
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="slideshow-container relative h-80">
                {/* Dynamic Slide Content */}
                <div className="absolute inset-0 transition-opacity duration-500">
                  <div className="grid lg:grid-cols-2 h-full">
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {currentSlide === 0 && 'Plans'}
                        {currentSlide === 1 && 'Courses'}
                        {currentSlide === 2 && 'Templates'}
                        {currentSlide === 3 && 'Ebooks'}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {currentSlide === 0 && 'Create detailed business plans and monetization strategies. Turn your ideas into sustainable income streams.'}
                        {currentSlide === 1 && 'Build comprehensive online courses with structured content, modules, and learning materials.'}
                        {currentSlide === 2 && 'Design professional templates and frameworks that save time and ensure quality.'}
                        {currentSlide === 3 && 'Write bestselling ebooks with AI-generated content. Establish authority through digital publishing.'}
                      </p>
                    </div>
                    <div className={`flex items-center justify-center p-12 transition-colors duration-500 ${
                      currentSlide === 0 ? 'bg-gradient-to-br from-gray-50 to-gray-100' :
                      currentSlide === 1 ? 'bg-gradient-to-br from-gray-50 to-gray-100' :
                      currentSlide === 2 ? 'bg-gradient-to-br from-gray-50 to-gray-100' :
                      'bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}>
                      <div className="w-full h-full max-w-md">
                        {currentSlide === 0 && (
                          <svg className="w-full h-full" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Plan document - similar to templates */}
                            <rect x="120" y="80" width="160" height="180" rx="6" fill="white" stroke="#000000" strokeWidth="2.5"/>
                            {/* Grid pattern */}
                            <line x1="140" y1="110" x2="260" y2="110" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="140" x2="260" y2="140" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="170" x2="260" y2="170" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="200" x2="260" y2="200" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="230" x2="260" y2="230" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            {/* Checkmarks */}
                            <circle cx="145" cy="110" r="6" fill="#000000"/>
                            <path d="M142 110 L144 112 L148 108" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            <circle cx="145" cy="140" r="6" fill="#000000"/>
                            <path d="M142 140 L144 142 L148 138" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            <circle cx="145" cy="170" r="6" fill="#6B7280"/>
                            <path d="M142 170 L144 172 L148 168" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        )}
                        {currentSlide === 1 && (
                          <svg className="w-full h-full" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Course modules */}
                            <rect x="120" y="80" width="160" height="40" rx="6" fill="white" stroke="#000000" strokeWidth="2"/>
                            <rect x="120" y="140" width="160" height="40" rx="6" fill="white" stroke="#000000" strokeWidth="2"/>
                            <rect x="120" y="200" width="160" height="40" rx="6" fill="white" stroke="#000000" strokeWidth="2"/>
                            {/* Play icons */}
                            <circle cx="150" cy="100" r="12" fill="#000000"/>
                            <path d="M145 95 L145 105 L152 100 Z" fill="white"/>
                            <circle cx="150" cy="160" r="12" fill="#000000"/>
                            <path d="M145 155 L145 165 L152 160 Z" fill="white"/>
                            <circle cx="150" cy="220" r="12" fill="#000000"/>
                            <path d="M145 215 L145 225 L152 220 Z" fill="white"/>
                          </svg>
                        )}
                        {currentSlide === 2 && (
                          <svg className="w-full h-full" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Template document */}
                            <rect x="120" y="80" width="160" height="180" rx="6" fill="white" stroke="#000000" strokeWidth="2.5"/>
                            {/* Grid pattern */}
                            <line x1="140" y1="110" x2="260" y2="110" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="140" x2="260" y2="140" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="170" x2="260" y2="170" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="200" x2="260" y2="200" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            <line x1="140" y1="230" x2="260" y2="230" stroke="#000000" strokeWidth="1.5" opacity="0.2"/>
                            {/* Checkmarks */}
                            <circle cx="145" cy="110" r="6" fill="#000000"/>
                            <path d="M142 110 L144 112 L148 108" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                            <circle cx="145" cy="140" r="6" fill="#000000"/>
                            <path d="M142 140 L144 142 L148 138" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                        )}
                        {currentSlide === 3 && (
                          <svg className="w-full h-full" viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Elegant book */}
                            <rect x="120" y="90" width="160" height="140" rx="4" fill="#000000" stroke="#000000" strokeWidth="2"/>
                            <rect x="130" y="110" width="140" height="110" rx="2" fill="white"/>
                            {/* Book lines */}
                            <line x1="150" y1="130" x2="250" y2="130" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="150" y1="150" x2="240" y2="150" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="150" y1="170" x2="230" y2="170" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            <line x1="150" y1="190" x2="250" y2="190" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                            {/* Bookmark */}
                            <path d="M260 90 L260 160 L250 150 L260 140 Z" fill="#6B7280"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
                <button
                  onClick={prevSlide}
                  className="slide-prev w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex space-x-3">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`slide-indicator w-3 h-3 rounded-full transition-colors ${
                        currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="slide-next w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Design it. Build it. Ship it. Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Design it. Build it. Ship it.
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to create viral content and build your audience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate high-quality content in minutes, not hours. Focus on creating, not writing.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  AI-Powered
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced AI understands your niche and creates content that resonates with your audience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Smart Pricing
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive smart pricing suggestions based on your content type, audience, and market analysis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA & FAQ Combined Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* CTA Section - Smaller */}
              <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-purple-500 text-white rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                    Ready to see what's possible?
                  </h2>
                  <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  </p>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 transition-colors duration-300">
                    Start Creating Now
                  </button>
                </div>
              </div>

              {/* FAQ Section - Accordion Style */}
              <div>
                <div className="text-center mb-16">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-gray-600">
                    Common questions about starting your business
                  </p>
                </div>

                <div className="space-y-4" id="faq-accordion">
                  {/* FAQ Item 1 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[72px]">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-1"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Do I need business experience to use Sellable?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-1">
                      Absolutely not! Sellable is built for beginners. Our AI handles all the complex parts while you focus on what you know best - your expertise and passion.
                    </div>
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[80px]">
                    <button
                      className="w-full px-8 py-6 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-2"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        How long does it take to create a product?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-2">
                      Most users create their first complete product in under 2 minutes. The AI handles the complex work while you focus on your ideas and goals.
                    </div>
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[80px]">
                    <button
                      className="w-full px-8 py-6 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-3"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Can I really make money with digital products?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-3">
                      Absolutely! Thousands of creators earn passive income through digital products. With proper pricing and marketing strategies (which Sellable provides), you can build a sustainable business.
                    </div>
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[80px]">
                    <button
                      className="w-full px-8 py-6 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        What types of products can I create?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-4">
                      Everything! Blog posts, social media content, email newsletters, podcast scripts, video scripts, business plans, and much more. Sellable adapts to any content format.
                    </div>
                  </div>

                  {/* FAQ Item 5 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[80px]">
                    <button
                      className="w-full px-8 py-6 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-5"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Is there any setup required?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-5">
                      None! Sellable works directly in your browser. Just describe your idea, and our AI creates everything you need - from content to design to marketing materials.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* FAQ Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .rotate-45 {
            transform: rotate(45deg);
          }
        `
      }} />

      {/* FAQ JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const toggles = document.querySelectorAll('.faq-toggle');

            toggles.forEach(toggle => {
              toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const icon = this.querySelector('.faq-icon');

                // Close all other FAQ items
                document.querySelectorAll('.faq-content').forEach(item => {
                  if (item.id !== targetId) {
                    item.classList.add('hidden');
                    const otherIcon = item.parentElement.querySelector('.faq-icon');
                    if (otherIcon) {
                      otherIcon.classList.remove('rotate-45');
                    }
                  }
                });

                // Toggle current item
                content.classList.toggle('hidden');
                icon.classList.toggle('rotate-45');
              });
            });
          });
        `
      }} />
    </div>
  )
}