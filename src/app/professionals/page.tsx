"use client"

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ProfessionalsPage() {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section - Clean and focused */}
        <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-400/60 to-blue-600/80">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-16 leading-tight">
              <span className="text-gray-900">Scale your</span>
              <span className="text-[#000000]"> expertise.</span>
            </h1>
            <button className="bg-[#000000] text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-gray-900 transition-colors duration-300">
              Start Creating Now
            </button>
          </div>
        </section>

        {/* What professionals are building Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Build products faster than ever with your knowledge
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Create professional digital products with our AI-powered tools
              </p>
            </div>

            {/* Products Showcase */}
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Lead Magnet */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Lead Magnet</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Create compelling lead magnets that attract and convert your ideal audience. Perfect for building email lists and establishing credibility.</p>
                </div>

                {/* Ebooks */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ebooks</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Write bestselling ebooks with AI-generated outlines, chapters, and professional formatting. Establish authority and generate passive income.</p>
                </div>

                {/* Templates */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Templates</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">Design professional templates and frameworks that save time and ensure quality. Create reusable assets for your consulting business.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ship Faster Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                It's time to ship faster
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Stop waiting weeks for your digital products. Create professional content in minutes with AI-powered tools designed for busy professionals.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start space-x-5 bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Share Your Expertise
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Input your professional knowledge, target market, and key challenges. Our AI analyzes your input and creates tailored content strategies.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-5 bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      AI Generates Instantly
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Watch as our advanced AI creates professional digital products, marketing materials, and sales copy in real-time.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-5 bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-300">
                  <div className="flex-shrink-0 w-14 h-14 bg-black rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Launch & Scale
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      Export your complete product package and start monetizing immediately. Scale your professional services with passive income streams.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA & FAQ Combined Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* CTA Section */}
              <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                    Ready to monetize your expertise?
                  </h2>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 transition-colors duration-300">
                    Start Creating Now
                  </button>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-gray-600">
                    Common questions about creating professional digital products
                  </p>
                </div>

                <div className="space-y-4" id="faq-accordion">
                  {/* FAQ Items */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[72px]">
                    <button className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle" data-target="faq-1">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        How do I price my professional digital products?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-1">
                      Sellable helps you determine optimal pricing based on your expertise, market demand, and value provided. Our AI analyzes similar services and suggests competitive pricing strategies.
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[72px]">
                    <button className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle" data-target="faq-2">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Can I create premium digital products?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-2">
                      Absolutely! Create premium digital products that showcase your expertise and generate additional revenue streams beyond your core services.
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[72px]">
                    <button className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle" data-target="faq-3">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        How long does it take to create professional digital products?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-3">
                      Most professional content can be created in under 2 minutes once you provide your expertise. The AI handles formatting, design, and optimization while you focus on your knowledge.
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
