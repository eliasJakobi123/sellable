import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Get authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      )
    }

    // Verify user with Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    })

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      )
    }

    // Get current month usage
    const currentMonthStart = new Date()
    currentMonthStart.setDate(1)
    currentMonthStart.setHours(0, 0, 0, 0)

    const { data: usage, error: usageError } = await supabase
      .from('usage_tracking')
      .select('*')
      .eq('user_id', user.id)
      .gte('period_start', currentMonthStart.toISOString().split('T')[0])
      .single()

    // Get profile for monthly limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('monthly_limit, plan_name')
      .eq('id', user.id)
      .single()

    const monthlyLimit = profile?.monthly_limit || 2
    const productsCreated = usage?.products_created || 0
    const remaining = Math.max(0, monthlyLimit - productsCreated)

    return NextResponse.json({
      productsCreated,
      monthlyLimit,
      remaining,
      periodStart: usage?.period_start || currentMonthStart.toISOString().split('T')[0],
      periodEnd: usage?.period_end || new Date(currentMonthStart.getFullYear(), currentMonthStart.getMonth() + 1, 0).toISOString().split('T')[0],
      planName: profile?.plan_name || 'free',
    })
  } catch (error: any) {
    console.error('Get usage error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get usage' },
      { status: 500 }
    )
  }
}

