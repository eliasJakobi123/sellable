"use client"

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types/database'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
      title="Copy description"
    >
      {copied ? (
        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  )
}

export default function ProductDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const productId = searchParams.get('id')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [openStrategies, setOpenStrategies] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    if (productId && user) {
      loadProduct()
    }
  }, [productId, user])

  const loadProduct = async () => {
    if (!productId || !user) return

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error loading product:', error)
      router.push('/dashboard/products')
    } finally {
      setLoading(false)
    }
  }

  const toggleStrategy = (key: string) => {
    setOpenStrategies(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">{product.title}</h1>
              <button
                onClick={() => router.push('/dashboard/products')}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Products
              </button>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-all duration-200 text-sm font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Product
            </button>
          </div>
        </div>

        {/* Preview Section - Takes full mobile viewport height */}
        <div className="md:hidden w-full bg-white rounded-3xl shadow-xl border border-gray-200 flex items-center justify-center" style={{height: '90vh', marginBottom: '2rem'}}>
          <div className="text-center text-gray-400">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg font-medium">Product Preview</p>
            <p className="text-sm">Coming Soon</p>
          </div>
        </div>

        {/* Layout - Mobile: stacked, Desktop: grid */}
        <div className="flex-1 md:grid md:grid-cols-3 md:gap-8 min-h-0">
          {/* Desktop Preview - 2/3 width */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-200 h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-medium">Product Preview</p>
              <p className="text-sm">Coming Soon</p>
            </div>
          </div>

          {/* Desktop Product Details - 1/3 width */}
          <div className="md:col-span-1 h-full overflow-y-auto space-y-6 p-4">
            {/* Product Description */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">Product Description</h3>
                <CopyButton text={product.description || ''} />
              </div>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>{product.description || 'No description available'}</p>
              </div>
            </div>

            {/* Pricing Strategy */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Pricing Strategy</h3>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                <div>
                  <div className="font-semibold text-gray-900 text-sm">Premium Plan</div>
                  <div className="text-xs text-gray-600">All features included</div>
                </div>
                <div className="text-xl font-bold text-blue-600">$9.99/month</div>
              </div>
            </div>

            {/* Marketing Strategies */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Marketing Strategies</h3>
              <div className="space-y-2">
                {/* Social Media */}
                <div className="border border-blue-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleStrategy('social')}
                    className="w-full p-3 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-between hover:bg-blue-100 transition-colors"
                  >
                    <h4 className="font-semibold text-blue-900 text-sm">Social Media</h4>
                    <svg
                      className={`w-4 h-4 text-blue-600 transform transition-transform ${openStrategies.social ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openStrategies.social && (
                    <div className="p-3 bg-white border-t border-blue-200">
                      <p className="text-blue-800 text-xs">
                        Leverage Instagram and TikTok for fitness challenges, transformation stories, and user-generated content to build community and drive app downloads.
                      </p>
                    </div>
                  )}
                </div>

                {/* Influencers */}
                <div className="border border-green-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleStrategy('influencers')}
                    className="w-full p-3 bg-gradient-to-r from-green-50 to-emerald-50 flex items-center justify-between hover:bg-green-100 transition-colors"
                  >
                    <h4 className="font-semibold text-green-900 text-sm">Influencer Partnerships</h4>
                    <svg
                      className={`w-4 h-4 text-green-600 transform transition-transform ${openStrategies.influencers ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openStrategies.influencers && (
                    <div className="p-3 bg-white border-t border-green-200">
                      <p className="text-green-800 text-xs">
                        Collaborate with fitness influencers for authentic product reviews and workout demonstrations to reach their engaged audiences.
                      </p>
                    </div>
                  )}
                </div>

                {/* Content Marketing */}
                <div className="border border-purple-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleStrategy('content')}
                    className="w-full p-3 bg-gradient-to-r from-purple-50 to-violet-50 flex items-center justify-between hover:bg-purple-100 transition-colors"
                  >
                    <h4 className="font-semibold text-purple-900 text-sm">Content Marketing</h4>
                    <svg
                      className={`w-4 h-4 text-purple-600 transform transition-transform ${openStrategies.content ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openStrategies.content && (
                    <div className="p-3 bg-white border-t border-purple-200">
                      <p className="text-purple-800 text-xs">
                        Create blog posts, videos, and infographics about fitness tips, nutrition advice, and success stories to establish authority and attract organic traffic.
                      </p>
                    </div>
                  )}
                </div>

                {/* Email Marketing */}
                <div className="border border-orange-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleStrategy('email')}
                    className="w-full p-3 bg-gradient-to-r from-orange-50 to-red-50 flex items-center justify-between hover:bg-orange-100 transition-colors"
                  >
                    <h4 className="font-semibold text-orange-900 text-sm">Email Marketing</h4>
                    <svg
                      className={`w-4 h-4 text-orange-600 transform transition-transform ${openStrategies.email ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openStrategies.email && (
                    <div className="p-3 bg-white border-t border-orange-200">
                      <p className="text-orange-800 text-xs">
                        Build an email list with lead magnets and send weekly fitness tips, progress updates, and special offers to nurture customer relationships.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}




