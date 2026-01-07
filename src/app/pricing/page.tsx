"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export default function PricingPage() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handlePlanClick = () => {
    if (isLoggedIn) {
      router.push('/dashboard/settings')
    } else {
      router.push('/auth')
    }
  }

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include access to our AI-powered creation tools.
            </p>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">$0</div>
                  <p className="text-gray-600 mb-6">Perfect for trying out our tools</p>

                  <div className="space-y-4 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                      <div className="text-sm text-gray-600">Credits per month</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">All features included</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlanClick}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                  >
                    {isLoggedIn ? 'Manage Plan' : 'Get Started'}
                  </button>
                </div>
              </div>

              {/* Starter Plan */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">$9</div>
                  <p className="text-gray-600 mb-6">Great for individual creators</p>

                  <div className="space-y-4 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">10</div>
                      <div className="text-sm text-gray-600">Credits per month</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">All features included</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlanClick}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                  >
                    {isLoggedIn ? 'Upgrade to Starter' : 'Start Free Trial'}
                  </button>
                </div>
              </div>

              {/* Professional Plan */}
              <div className="bg-white rounded-2xl border-2 border-blue-500 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">Most Popular</span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">$19</div>
                  <p className="text-gray-600 mb-6">For serious creators</p>

                  <div className="space-y-4 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">25</div>
                      <div className="text-sm text-gray-600">Credits per month</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">All features included</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlanClick}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
                  >
                    {isLoggedIn ? 'Upgrade to Professional' : 'Choose Professional'}
                  </button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">$49</div>
                  <p className="text-gray-600 mb-6">For teams and agencies</p>

                  <div className="space-y-4 mb-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">100</div>
                      <div className="text-sm text-gray-600">Credits per month</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">All features included</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlanClick}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm"
                  >
                    {isLoggedIn ? 'Upgrade to Enterprise' : 'Get Enterprise'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-gray-600">
                Everything you need to know about credits and pricing
              </p>
            </div>

            <div className="space-y-4" id="pricing-faq-accordion">
              {/* FAQ 1 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => toggleFaq('faq-1')}>
                  <h3 className="text-base font-semibold text-gray-900 pr-4">
                    How do credits work?
                  </h3>
                  <svg className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 flex-shrink-0 ${openFaq === 'faq-1' ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                    <div className={`px-6 pb-4 text-gray-600 leading-relaxed transition-all duration-300 ${openFaq === 'faq-1' ? 'block' : 'hidden'}`} style={{transition: 'all 0.3s ease'}}>
                  Each product you create counts as one product toward your monthly limit. Free users get 2 products per month, Starter gets 10, Professional gets 25, and Enterprise gets 100. Your monthly limit resets on the 1st of every month.
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => toggleFaq('faq-2')}>
                  <h3 className="text-base font-semibold text-gray-900 pr-4">
                    What happens if I run out of credits?
                  </h3>
                  <svg className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 flex-shrink-0 ${openFaq === 'faq-2' ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`px-6 pb-4 text-gray-600 leading-relaxed transition-all duration-300 ${openFaq === 'faq-2' ? 'block' : 'hidden'}`} style={{transition: 'all 0.3s ease'}}>
                  Once you reach your monthly limit, you'll need to wait until the 1st of next month for your limit to reset, or upgrade to a higher plan for more products. Limits reset automatically on the 1st of every month.
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => toggleFaq('faq-3')}>
                  <h3 className="text-base font-semibold text-gray-900 pr-4">
                    Can I change plans anytime?
                  </h3>
                  <svg className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 flex-shrink-0 ${openFaq === 'faq-3' ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`px-6 pb-4 text-gray-600 leading-relaxed transition-all duration-300 ${openFaq === 'faq-3' ? 'block' : 'hidden'}`} style={{transition: 'all 0.3s ease'}}>
                  Yes, you can upgrade, downgrade, or cancel your plan at any time. Plan changes take effect immediately. Credits reset monthly based on your current plan, so plan changes won't affect your current month's usage.
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => toggleFaq('faq-4')}>
                  <h3 className="text-base font-semibold text-gray-900 pr-4">
                    Why do ebooks cost more credits?
                  </h3>
                  <svg className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 flex-shrink-0 ${openFaq === 'faq-4' ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`px-6 pb-4 text-gray-600 leading-relaxed transition-all duration-300 ${openFaq === 'faq-4' ? 'block' : 'hidden'}`} style={{transition: 'all 0.3s ease'}}>
                  All products count equally toward your monthly limit - whether it's an ebook, template, voice content, or course. Each product creation uses one product from your monthly allowance.
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => toggleFaq('faq-5')}>
                  <h3 className="text-base font-semibold text-gray-900 pr-4">
                    When do credits reset?
                  </h3>
                  <svg className={`w-4 h-4 text-gray-600 transform transition-transform duration-300 flex-shrink-0 ${openFaq === 'faq-5' ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className={`px-6 pb-4 text-gray-600 leading-relaxed transition-all duration-300 ${openFaq === 'faq-5' ? 'block' : 'hidden'}`} style={{transition: 'all 0.3s ease'}}>
                  Your monthly product limit resets on the 1st of every month. Unused products from the previous month do not carry over. Your limit resets to your plan's monthly amount (2 for Free, 10 for Starter, 25 for Professional, 100 for Enterprise).
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>


      <Footer />
    </div>
  )
}
