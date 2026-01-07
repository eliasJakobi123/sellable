'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqs = [
    {
      question: "Do I need any prior knowledge or skills?",
      answer: "No prior knowledge required. Sellable handles everything from content creation to formatting. Just enter your idea and get a professional product."
    },
    {
      question: "Is it really free to try?",
      answer: "Yes, you can create your first product completely free. Test all features and see the quality before deciding to upgrade."
    },
    {
      question: "Is this legal?",
      answer: "Absolutely. You own full rights to your created content. Sellable generates original content based on your input - no copyright issues."
    },
    {
      question: "Does this guarantee sales or revenue?",
      answer: "No. We provide professional-quality products, but sales depend on your marketing, pricing, and market conditions. We give you the tools to succeed."
    },
    {
      question: "How long does it take to create a product?",
      answer: "Typically 1-2 minutes after you enter your idea. The AI processes everything instantly."
    },
    {
      question: "Can I customize the output?",
      answer: "Yes, all plans include customization options. Premium plans offer advanced editing and branding features."
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                {openItems.includes(index) ? (
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>

              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
