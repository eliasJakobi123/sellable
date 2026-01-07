"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

interface SubscriptionData {
  planName: string
  monthlyLimit: number
  subscription: any
}

interface UsageData {
  productsCreated: number
  monthlyLimit: number
  remaining: number
  periodStart: string
  periodEnd: string
  planName: string
}

const PLANS = [
  {
    name: 'starter',
    displayName: 'Starter',
    price: '$9',
    monthlyLimit: 10,
    features: ['10 products per month'],
  },
  {
    name: 'professional',
    displayName: 'Professional',
    price: '$19',
    monthlyLimit: 25,
    features: ['25 products per month'],
  },
  {
    name: 'enterprise',
    displayName: 'Enterprise',
    price: '$49',
    monthlyLimit: 100,
    features: ['100 products per month'],
  },
]

export default function SubscriptionSettings() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null)
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSubscriptionData()
  }, [])

  const loadSubscriptionData = async () => {
    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) return

      // Get subscription
      const subResponse = await fetch('/api/user/subscription', {
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      })
      const subData = await subResponse.json()
      setSubscription(subData)

      // Get usage
      const usageResponse = await fetch('/api/user/usage', {
        headers: {
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      })
      const usageData = await usageResponse.json()
      setUsage(usageData)
    } catch (err: any) {
      console.error('Error loading subscription:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleUpgrade = async (planName: string) => {
    setProcessing(true)
    setError(null)

    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) {
        setError('Not authenticated')
        return
      }

      // Get price ID from environment (user needs to set these)
      const priceIdMap: Record<string, string> = {
        starter: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || '',
        professional: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || '',
        enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || '',
      }

      const priceId = priceIdMap[planName]
      if (!priceId) {
        setError(`Price ID not configured for ${planName}. Please set STRIPE_PRICE_${planName.toUpperCase()} in environment variables.`)
        return
      }

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
        body: JSON.stringify({ priceId, planName }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId })
      }
    } catch (err: any) {
      console.error('Error creating checkout:', err)
      setError(err.message || 'Failed to start checkout')
    } finally {
      setProcessing(false)
    }
  }

  const handleManageSubscription = async () => {
    setProcessing(true)
    setError(null)

    try {
      const session = await supabase.auth.getSession()
      if (!session.data.session) {
        setError('Not authenticated')
        return
      }

      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.data.session.access_token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create portal session')
      }

      // Redirect to Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err: any) {
      console.error('Error opening portal:', err)
      setError(err.message || 'Failed to open subscription management')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Subscription</h2>
          <p className="text-sm text-gray-600">Manage your subscription plan</p>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading subscription...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentPlan = subscription?.planName || 'free'
  const currentLimit = subscription?.monthlyLimit || 2
  const productsCreated = usage?.productsCreated || 0
  const remaining = usage?.remaining || 0
  const usagePercent = currentLimit > 0 ? (productsCreated / currentLimit) * 100 : 0

  return (
    <>
      <div className="bg-white rounded-2xl shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Subscription</h2>
          <p className="text-sm text-gray-600">Manage your subscription plan</p>
        </div>
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Current Plan */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Plan</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-lg font-semibold text-gray-900 capitalize">{currentPlan}</p>
                <p className="text-sm text-gray-600">{currentLimit} products per month</p>
              </div>
              {currentPlan !== 'free' && (
                <button
                  onClick={handleManageSubscription}
                  disabled={processing}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  {processing ? 'Loading...' : 'Manage Subscription'}
                </button>
              )}
            </div>
          </div>

          {/* Usage Stats */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Monthly Usage</h3>
              <span className="text-sm text-gray-600">
                {productsCreated} / {currentLimit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${
                  usagePercent >= 100
                    ? 'bg-red-500'
                    : usagePercent >= 80
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {remaining > 0
                ? `${remaining} products remaining this month`
                : 'Monthly limit reached. Upgrade for more products.'}
            </p>
            {usage?.periodEnd && (
              <p className="text-xs text-gray-500 mt-1">
                Resets on {new Date(usage.periodEnd).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Upgrade Button */}
          {currentPlan === 'free' && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-black text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Upgrade Plan
            </button>
          )}

          {currentPlan !== 'free' && (
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Change Plan
            </button>
          )}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {PLANS.map((plan) => {
                  const isCurrentPlan = plan.name === currentPlan
                  return (
                    <div
                      key={plan.name}
                      className={`border-2 rounded-xl p-6 ${
                        isCurrentPlan ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{plan.displayName}</h3>
                        <div className="mt-2">
                          <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-gray-600">/month</span>
                        </div>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        onClick={() => {
                          setShowUpgradeModal(false)
                          handleUpgrade(plan.name)
                        }}
                        disabled={isCurrentPlan || processing}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          isCurrentPlan
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        {isCurrentPlan
                          ? 'Current Plan'
                          : processing
                          ? 'Processing...'
                          : currentPlan === 'free'
                          ? 'Upgrade'
                          : 'Switch Plan'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

