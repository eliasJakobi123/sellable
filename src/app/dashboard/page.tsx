"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types/database'

const exampleTexts = [
  "Create a template for fitness coaches for...",
  "Create a small PDF for...",
  "Write an ebook for business owners...",
  "Create AI voice content..."
]

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [inputValue, setInputValue] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (user) {
      loadProducts()
    }
  }, [user])

  const loadProducts = async () => {
    if (!user) return
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const handleOpenProduct = (productId: string) => {
    router.push(`/dashboard/productdetails?id=${productId}`)
  }

  useEffect(() => {
    // Autofokus auf die Textarea wenn die Seite geladen ist
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Typing Animation Effect
  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0

    const cycleExamples = () => {
      if (inputValue !== '') {
        setDisplayText('')
        setIsTyping(false)
        return
      }

      setIsTyping(true)
      const currentText = exampleTexts[currentIndex]

      // Type the current example
      const typeText = (index: number = 0) => {
        if (index <= currentText.length && inputValue === '') {
          setDisplayText(currentText.slice(0, index))
          timeout = setTimeout(() => typeText(index + 1), 80)
        } else if (inputValue === '') {
          // Pause, then delete
          timeout = setTimeout(() => deleteText(currentText.length), 2000)
        }
      }

      // Delete the current example
      const deleteText = (index: number) => {
        if (index >= 0 && inputValue === '') {
          setDisplayText(currentText.slice(0, index))
          timeout = setTimeout(() => deleteText(index - 1), 40)
        } else if (inputValue === '') {
          // Move to next example and start over
          currentIndex = (currentIndex + 1) % exampleTexts.length
          timeout = setTimeout(cycleExamples, 500)
        }
      }

      typeText()
    }

    // Start the animation immediately
    timeout = setTimeout(cycleExamples, 500)

    return () => {
      clearTimeout(timeout)
      setIsTyping(false)
    }
  }, [inputValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', inputValue)
    // Handle form submission
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInputValue(value)

    // Stop typing animation if user starts typing
    if (value !== '' && isTyping) {
      setIsTyping(false)
      setDisplayText('')
    } else if (value === '' && !isTyping) {
      // Restart typing animation if field becomes empty again
      setIsTyping(true)
    }

    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <div>
      <style dangerouslySetInnerHTML={{
        __html: `
          .chat-container {
            position: relative;
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
          }

          .chat-form {
            position: relative;
            width: 100%;
          }

          .chat-input-group {
            position: relative;
            width: 100%;
          }

          .chat-box {
            position: relative;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            overflow: hidden;
          }

          .chat-form:hover .chat-box,
          .chat-form:focus-within .chat-box {
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-1px);
          }

          .chat-box-inner {
            padding: 2px;
          }

          .chat-flex {
            display: flex;
            align-items: flex-end;
            gap: 16px;
            padding: 20px;
          }

          .textarea-container {
            flex: 1;
            position: relative;
          }

          .chat-input {
            width: 100%;
            min-height: 80px;
            padding: 16px 20px;
            border: none;
            outline: none;
            background: transparent;
            color: #1f2937;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.5;
            resize: none;
            border-radius: 12px;
            transition: all 0.3s ease;
          }

          .chat-input:focus {
            background: rgba(34, 180, 109, 0.02);
          }

          .chat-input::placeholder {
            color: #9ca3af;
            font-weight: 400;
          }

          .send-button-container {
            flex-shrink: 0;
          }

          .chat-send-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: #000000;
            border: none;
            border-radius: 50%;
            cursor: pointer;
          }

          .chat-send-btn:hover {
            background: #1a9b5c;
          }

          .send-icon {
            width: 20px;
            height: 20px;
            color: white;
          }


          @media (max-width: 640px) {
            .chat-flex {
              padding: 16px;
              gap: 12px;
            }

            .chat-input {
              font-size: 16px;
              padding: 12px 16px;
              min-height: 60px;
            }

            .chat-send-btn {
              width: 40px;
              height: 40px;
            }

            .send-icon {
              width: 18px;
              height: 18px;
            }
          }
        `
      }} />

      {/* Main content area */}
      <main className="min-h-[70vh] flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-4xl">
          {/* Headline */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight">
              What should be your next product?
            </h1>
          </div>

          {/* Chatbox - identical to home page */}
          <div className="max-w-2xl mx-auto">
            <div className="chat-container">
              <form onSubmit={handleSubmit} className="chat-form">
                <div className="chat-input-group">
                  <div className="chat-box">
                    <div className="chat-box-inner">
                      <div className="chat-flex">
                        <div className="textarea-container">
                          <textarea
                            ref={textareaRef}
                            className={`chat-input ${inputValue === '' && isTyping ? 'typing-animation' : ''}`}
                            value={inputValue}
                            onChange={handleTextareaChange}
                            placeholder=""
                            rows={3}
                          />
                          {inputValue === '' && displayText && (
                            <div className="absolute top-4 left-5 text-gray-400 pointer-events-none font-medium">
                              {displayText}
                            </div>
                          )}
                        </div>
                        <div className="send-button-container">
                          <button className="chat-send-btn" type="submit">
                            <svg className="send-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>

      {/* Recent Products Section */}
      <div className="flex justify-center mt-20 mb-16 px-4 sm:px-6">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200/60 p-8 pr-2 pb-12 max-w-3xl w-full">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">Recent Products</h3>

          {loadingProducts ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No products yet. Create your first product!</p>
              <button
                onClick={() => router.push('/dashboard/productbuilder')}
                className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Create Product
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{product.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {product.description || 'No description available'}
                  </p>
                  <button
                    onClick={() => handleOpenProduct(product.id)}
                    className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Open
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
