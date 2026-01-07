"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface AnalyticsData {
  totalProducts: number;
  totalTokens: number;
  totalCost: number;
  successRate: number;
  avgDuration: number;
  productsByType: Record<string, number>;
  productsBySkin: Record<string, number>;
  recentMetrics: Array<{
    id: string;
    psychological_type: string;
    tokens_used: number;
    cost_cents: number;
    duration_ms: number;
    success: boolean;
    created_at: string;
  }>;
}

export default function AnalyticsDashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d')

  useEffect(() => {
    if (user) {
      loadAnalytics()
    }
  }, [user, timeRange])

  const loadAnalytics = async () => {
    if (!user) return

    try {
      setLoading(true)

      // Calculate date range
      let fromDate: string | null = null
      if (timeRange === '7d') {
        fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      } else if (timeRange === '30d') {
        fromDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }

      // Fetch products
      let productsQuery = supabase
        .from('products')
        .select('*')
        .eq('user_id', user.id)

      if (fromDate) {
        productsQuery = productsQuery.gte('created_at', fromDate)
      }

      const { data: products, error: productsError } = await productsQuery

      if (productsError) throw productsError

      // Fetch metrics
      let metricsQuery = supabase
        .from('generation_metrics')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (fromDate) {
        metricsQuery = metricsQuery.gte('created_at', fromDate)
      }

      const { data: metrics } = await metricsQuery

      // Calculate analytics
      const totalProducts = products?.length || 0
      const totalTokens = products?.reduce((sum, p) => sum + (p.tokens_used || 0), 0) || 0
      const totalCost = products?.reduce((sum, p) => sum + (p.cost_cents || 0), 0) || 0
      
      const successfulProducts = products?.filter(p => p.generation_status === 'completed').length || 0
      const successRate = totalProducts > 0 ? (successfulProducts / totalProducts) * 100 : 0

      const avgDuration = metrics && metrics.length > 0
        ? metrics.reduce((sum, m) => sum + (m.duration_ms || 0), 0) / metrics.length
        : 0

      // Group by type
      const productsByType: Record<string, number> = {}
      products?.forEach(p => {
        const type = p.psychological_type || 'unknown'
        productsByType[type] = (productsByType[type] || 0) + 1
      })

      // Group by skin
      const productsBySkin: Record<string, number> = {}
      products?.forEach(p => {
        const skin = p.design_skin || 'unknown'
        productsBySkin[skin] = (productsBySkin[skin] || 0) + 1
      })

      setAnalytics({
        totalProducts,
        totalTokens,
        totalCost,
        successRate,
        avgDuration,
        productsByType,
        productsBySkin,
        recentMetrics: metrics || [],
      })
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  const getPsychologicalTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-500',
      quick_win: 'bg-red-500',
      authority: 'bg-blue-500',
      system: 'bg-purple-500',
      transformation: 'bg-orange-500',
      creative: 'bg-pink-500',
    }
    return colors[type] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'League Spartan, sans-serif' }}>
          Analytics Dashboard
        </h2>
        <div className="flex gap-2">
          {(['7d', '30d', 'all'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'All Time'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">Total Products</div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalProducts}</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{analytics.successRate.toFixed(1)}%</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">Total Tokens</div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{analytics.totalTokens.toLocaleString()}</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm text-gray-500">Total Cost</div>
          </div>
          <div className="text-3xl font-bold text-gray-900">${(analytics.totalCost / 100).toFixed(2)}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products by Type */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Products by Type</h3>
          <div className="space-y-3">
            {Object.entries(analytics.productsByType).map(([type, count]) => (
              <div key={type} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getPsychologicalTypeColor(type)}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {type.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500">{count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getPsychologicalTypeColor(type)} rounded-full`}
                      style={{ width: `${(count / analytics.totalProducts) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Generations</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {analytics.recentMetrics.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No recent activity</p>
            ) : (
              analytics.recentMetrics.slice(0, 8).map((metric) => (
                <div key={metric.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${metric.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {metric.psychological_type.replace('_', ' ')}
                      </span>
                      <p className="text-xs text-gray-500">
                        {new Date(metric.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatDuration(metric.duration_ms)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {metric.tokens_used.toLocaleString()} tokens
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Average Generation Time */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-md p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-1">Average Generation Time</h3>
            <p className="text-white/80 text-sm">Based on your recent generations</p>
          </div>
          <div className="text-4xl font-bold">
            {formatDuration(analytics.avgDuration)}
          </div>
        </div>
      </div>
    </div>
  )
}




