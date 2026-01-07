'use client'

import { useState, useEffect, useRef } from 'react'

const exampleTexts = [
  "Create a sales funnel template for fitness coaches",
  "Design a PDF guide for people with back pain",
  "Build a social media posting plan"
]

const chatStyles = `
  .typing-animation {
    border-right: 2px solid #6b7280;
    animation: blink 1s infinite;
  }

  @keyframes blink {
    0%, 50% { border-color: #6b7280; }
    51%, 100% { border-color: transparent; }
  }
  /* Background Animation */
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

  .hero-background-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg,
      rgba(255, 137, 0, 0.25) 40%,
      rgba(34, 180, 109, 0.6) 100%);
    animation: backgroundFadeIn 1.5s ease-out forwards;
    z-index: -1;
    pointer-events: none;
  }

  .chat-container {
    position: relative;
    width: 100%;
    max-width: 700px;
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
    overflow: visible;
  }

  .chat-form:hover .chat-box,
  .chat-form:focus-within .chat-box {
    border-color: rgba(255, 255, 255, 0.3);
  }

  .chat-box-inner {
    padding: 2px;
  }

  .chat-flex {
    position: relative;
    width: 650px;
    height: 137px;
    margin: 0 auto;
  }

  .textarea-container {
    flex: 1;
    position: relative;
  }

          .chat-input {
            width: 100%;
            min-height: 80px;
            max-height: 80px;
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
            overflow-y: auto;
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
    background: #333333;
  }

  .send-icon {
    width: 20px;
    height: 20px;
    color: white;
  }

  @media (max-width: 640px) {
    .chat-flex {
      padding: 24px;
      gap: 12px;
      width: 100%;
      max-width: 650px;
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

  /* Modal styles */
  .modal-overlay {
    backdrop-filter: blur(4px);
  }

  .modal-content {
    animation: modalSlideIn 0.3s ease-out;
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`

export default function HeroSection() {
  const [inputValue, setInputValue] = useState('')
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showLoginPopup, setShowLoginPopup] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
  }, [])

  const examplePrompts = [
    "Create a comprehensive 30-day meal plan template for busy professionals who want to eat healthy without spending hours cooking each day",
    "Design a step-by-step guide for beginners learning to invest in stocks, including risk management strategies and portfolio diversification",
    "Build a complete social media content calendar for a small business owner selling handmade jewelry, with post ideas for Instagram, Facebook, and Pinterest",
    "Create an email marketing sequence for a fitness coach to convert free trial members into paying clients over 6 weeks",
    "Design a productivity system template for remote workers that includes time blocking, task prioritization, and digital tool recommendations",
    "Build a customer onboarding checklist for a SaaS company that ensures new users are set up for success within their first 30 days",
    "Create a financial planning workbook for young professionals starting their first job, covering budgeting, saving, and debt management",
    "Design a content marketing strategy template for bloggers who want to monetize their writing through affiliate marketing and digital products",
    "Build a project management template for freelance designers that includes client communication, milestone tracking, and payment collection",
    "Create a habit formation guide for people trying to establish a consistent exercise routine, with motivation techniques and progress tracking"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Show login popup instead of submitting
    setShowLoginPopup(true)
  }

  const generateRandomExample = () => {
    const randomIndex = Math.floor(Math.random() * examplePrompts.length)
    setInputValue(examplePrompts[randomIndex])
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

    // Keep textarea at fixed height (scrollable after 2 lines)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: chatStyles }} />

      <section className="relative py-56 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Headline */}
        <div className="text-center mb-8 -mt-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3">
            Turn your idea into a{' '}
            <span className="text-black italic">sellable</span>{' '}
            product<br />
            in under 2 minutes
          </h1>
        </div>

        {/* Ultra Modern Chat Container */}
        <div className="max-w-4xl mx-auto mb-8 mt-16">
          <div className="chat-container">
            <form onSubmit={handleSubmit} className="chat-form">
                <div className="chat-input-group">
                    <div className="chat-box">
                  <div className="chat-box-inner">
                    {/* Textarea Section - Oben */}
                    <div className="p-4 pb-2">
                      <div className="relative">
                        <textarea
                          ref={textareaRef}
                          className={`w-full h-20 resize-none border-none outline-none bg-transparent text-gray-900 font-medium text-base leading-relaxed ${inputValue === '' ? 'placeholder-transparent' : ''}`}
                          value={inputValue}
                          onChange={handleTextareaChange}
                          placeholder=""
                          style={{ maxHeight: '80px', overflowY: 'auto' }}
                        />

                        {/* Typing Animation - Genau über dem Textarea */}
                        {inputValue === '' && displayText && (
                          <div className="absolute inset-0 flex items-start pt-1 pl-1 text-gray-400 pointer-events-none font-medium text-base leading-relaxed">
                            {displayText}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Button Section - Unten */}
                    <div className="flex justify-between items-center p-4 pt-2">
                      <button
                        onClick={generateRandomExample}
                        className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-lg border border-gray-300 transition-all duration-200 font-medium text-sm"
                        type="button"
                      >
                        Generate example
                      </button>

                      <button className="chat-send-btn" type="submit">
                        <svg className="send-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>

      {/* Login Required Popup */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 modal-overlay">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center modal-content relative">
            {/* Close Button */}
            <button
              onClick={() => setShowLoginPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <img
                  src="/sellablelogo.png"
                  alt="Sellable"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-600 text-center">To use Sellable you need to login or signup</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  window.location.href = '/auth';
                }}
                className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Sign Up
              </button>

              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  window.location.href = '/auth';
                }}
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
    </>
  )
}
