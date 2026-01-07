"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { generateProduct } from '@/lib/api-client'

const loadingSteps = [
  { id: 'analyze', label: "Analyzing your idea...", icon: "brain" },
  { id: 'type', label: "Detecting product type...", icon: "search" },
  { id: 'design', label: "Selecting design skin...", icon: "palette" },
  { id: 'content', label: "Generating content with AI...", icon: "sparkles" },
  { id: 'image', label: "Creating cover image...", icon: "image" },
  { id: 'finalize', label: "Finalizing your product...", icon: "check" }
]

export default function ProductBuilderPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedType, setSelectedType] = useState<'ebook' | 'template' | 'voice'>('ebook')
  const [productDescription, setProductDescription] = useState('')
  const [ebookLength, setEbookLength] = useState<'short' | 'medium' | 'long'>('medium')
  const [authorName, setAuthorName] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Auto-fill author name from user
  useEffect(() => {
    if (user && !authorName) {
      // Use email username or full name if available
      const displayName = user.user_metadata?.full_name || 
                          user.user_metadata?.name ||
                          user.email?.split('@')[0] || 
                          'Author'
      setAuthorName(displayName)
    }
  }, [user, authorName])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCancel = () => {
    router.push('/dashboard/products')
  }

  const isFormValid = () => {
    return (
      productDescription.trim().length >= 20 &&
      authorName.trim().length > 0 &&
      !isLoading
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!productDescription.trim()) {
      setError('Please enter a product description')
      return
    }

    if (productDescription.trim().length < 20) {
      setError('Please provide a more detailed description (at least 20 characters)')
      return
    }

    if (!user) {
      router.push('/auth')
      return
    }

    setIsLoading(true)
    setCurrentStep(0)

    try {
      // Animate through loading steps
      const stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < loadingSteps.length - 1) {
            return prev + 1
          }
          return prev
        })
      }, 9000)

      // Call the AI generation API
      const result = await generateProduct({
        userInput: productDescription,
        productType: selectedType,
        includeDistribution: false,
        ebookLength: selectedType === 'ebook' ? ebookLength : undefined,
        authorName: authorName || 'Author',
      })

      clearInterval(stepInterval)

      if (!result.success || !result.product) {
        throw new Error(result.error || 'Failed to generate product')
      }

      // Set final step
      setCurrentStep(loadingSteps.length - 1)
      
      // Small delay to show completion
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect to product details
      router.push(`/dashboard/productdetails?id=${result.product.id}`)
    } catch (error) {
      console.error('Error creating product:', error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to create product. Please try again.'
      setError(errorMessage)
      setIsLoading(false)
      
      // Log full error for debugging
      if (error instanceof Error) {
        console.error('Full error:', error)
      }
    }
  }

  const productTypes = [
    { value: 'ebook' as const, label: 'Ebook', description: 'Full digital book with chapters' },
    { value: 'template' as const, label: 'Template', description: 'Worksheets, checklists, planners' },
    { value: 'course' as const, label: 'Course Structure', description: 'Video course with structured modules' },
    // Temporarily disabled: { value: 'voice' as const, label: 'Voice Content', description: 'Podcast scripts, audio guides' },
  ]

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'brain':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        )
      case 'search':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      case 'palette':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        )
      case 'sparkles':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        )
      case 'image':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'check':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'League Spartan, sans-serif' }}>
            AI Product Builder
          </h1>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 overflow-hidden relative">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-black/5 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-black/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="text-center relative z-10">
              <div className="mb-8">
                {/* AI Loading Animation */}
                <div className="relative mx-auto mb-6 w-20 h-20">
                  <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-4 border-transparent border-t-black/50 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                  Creating Your Product
                </h2>
                <p className="text-gray-600">Our AI is generating your professional digital product...</p>
              </div>

              <div className="max-w-md mx-auto">
                <div className="space-y-3">
                  {loadingSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={`flex items-center space-x-4 py-3 px-4 rounded-xl transition-all duration-500 ${
                        index < currentStep
                          ? 'bg-green-50 border border-green-200'
                          : index === currentStep
                          ? 'bg-gray-100 border border-black shadow-md'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                        index < currentStep
                          ? 'bg-green-500 text-white'
                          : index === currentStep
                          ? 'bg-black text-white animate-pulse'
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {index < currentStep ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          getStepIcon(step.icon)
                        )}
                      </div>
                      <span className={`text-sm font-medium flex-1 text-left ${
                        index < currentStep
                          ? 'text-green-700'
                          : index === currentStep
                          ? 'text-black'
                          : 'text-gray-500'
                      }`}>
                        {step.label}
                      </span>
                      {index === currentStep && (
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                This usually takes 30-60 seconds. Please don&apos;t close this page.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {/* Product Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Product Idea
                </label>
                <textarea
                  rows={4}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                  placeholder="Example: A complete guide for beginners who want to start investing in stocks. Cover basic concepts, risk management, and step-by-step strategies to build a portfolio..."
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Be specific! The more details you provide, the better your product will be.
                </p>
              </div>

              {/* Product Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type
                </label>
                <div className="flex gap-2">
                  {productTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedType(type.value)}
                      className={`flex-1 flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                        selectedType === type.value
                          ? 'border-black bg-gray-100 ring-1 ring-black/20'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`text-sm font-medium flex-1 text-left ${
                        selectedType === type.value ? 'text-black' : 'text-gray-900'
                      }`}>
                        {type.label}
                      </div>
                      <svg className={`w-4 h-4 flex-shrink-0 ${
                        selectedType === type.value ? 'text-black' : 'text-gray-400'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {selectedType === type.value ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* Length - Show for ebook and course types */}
              {(selectedType === 'ebook' || selectedType === 'course') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: 'short', label: 'Short', desc: selectedType === 'course' ? '3-4 mod' : '3-4 ch', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                      { value: 'medium', label: 'Medium', desc: selectedType === 'course' ? '5-6 mod' : '5-6 ch', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
                      { value: 'long', label: 'Long', desc: selectedType === 'course' ? '7-8 mod' : '7-8 ch', icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' }
                    ].map(({ value, label, desc, icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setEbookLength(value as 'short' | 'medium' | 'long')}
                        className={`flex-1 flex items-center gap-2 p-2 rounded-lg border-2 transition-all ${
                          ebookLength === value
                            ? 'border-black bg-gray-100 ring-1 ring-black/20'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                        </svg>
                        <div className="text-left flex-1 min-w-0">
                          <div className={`text-xs font-medium ${ebookLength === value ? 'text-black' : 'text-gray-900'}`}>
                            {label}
                          </div>
                          <div className="text-xs text-gray-500 truncate">{desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Your name as it will appear on the product"
                />
                <p className="mt-2 text-sm text-gray-500">
                  This name will appear as the author on your product.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all shadow-lg ${
                    isFormValid()
                      ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Generate with AI
                  </div>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}
