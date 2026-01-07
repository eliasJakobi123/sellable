import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Product } from '@/types/database'

export async function GET(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url)
  const downloadParam = url.searchParams.get('download')

  // Handle download requests
  if (downloadParam) {
    try {
      // Determine category based on product ID
      let category = 'fitness'
      if (downloadParam.includes('business')) category = 'business'
      else if (downloadParam.includes('mindfulness')) category = 'mindfulness'
      else if (downloadParam.includes('entrepreneur')) category = 'entrepreneurship'
      else if (downloadParam.includes('creativity')) category = 'creativity'

      // Generate PDF-ready HTML content
      const htmlContent = generateEbookHTML(category)

      // Create a proper PDF document structure
      const pdfContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ebook Download</title>
    <style>
        @page {
            size: A4;
            margin: 2cm;
        }
        @media print {
            body {
                font-size: 12pt;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            .page-break {
                page-break-before: always;
            }
            .no-print {
                display: none;
            }
        }
        body {
            font-family: 'Times New Roman', serif;
            max-width: 210mm;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
    </style>
</head>
<body>

    ${htmlContent.replace('<html', '<div').replace('</html>', '</div>').replace('<head>', '').replace('</head>', '').replace('<body>', '').replace('</body>', '')}
</body>
</html>`

      return new NextResponse(pdfContent, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': `attachment; filename="${downloadParam}-ebook.html"`,
          'Cache-Control': 'no-cache',
        },
      })

    } catch (error) {
      console.error('Download error:', error)
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head><title>Download Error</title></head>
        <body>
            <h1>Download Error</h1>
            <p>Sorry, there was an error generating your ebook. Please try again later.</p>
        </body>
        </html>
      `, {
        headers: {
          'Content-Type': 'text/html',
          'Content-Disposition': 'attachment; filename="error.html"',
        },
      })
    }
  }

  // Handle regular product listing
  try {
    console.log('API /products called with URL:', req.url)

    // Get query parameters
    const { searchParams } = new URL(req.url)
    const ids = searchParams.get('ids')?.split(',') || []
    const limit = parseInt(searchParams.get('limit') || '10')
    const featured = searchParams.get('featured') === 'true'
    const all = searchParams.get('all') === 'true'

    console.log('Query parameters:', { ids, limit, featured, all })

    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test database connection
    console.log('Testing database connection...')
    const { data: testData, error: testError } = await supabase
      .from('products')
      .select('count')
      .limit(1)

    if (testError) {
      console.error('Database connection test failed:', testError)
      return NextResponse.json(
        { success: false, error: `Database connection failed: ${testError.message}` },
        { status: 500 }
      )
    }

    console.log('Database connection successful')

    let query = supabase
      .from('products')
      .select(`
        id,
        title,
        description,
        product_type,
        psychological_type,
        design_skin,
        cover_image_url,
        created_at,
        updated_at,
        generation_status
      `)

    // If 'all' parameter is set, show all products without filters
    if (!all) {
      query = query.not('title', 'is', null)
    }

    // Filter by specific IDs if provided
    if (ids.length > 0) {
      query = query.in('id', ids)
      // Don't filter by generation_status or user_id when fetching specific products
      // This allows public access to featured products
    } else if (!all) {
      // Only filter by generation_status if we're not looking for specific IDs and not showing all
      query = query.eq('generation_status', 'completed')
      query = query.order('created_at', { ascending: false })
    } else {
      // When showing all products, order by creation date
      query = query.order('created_at', { ascending: false })
    }

    // Limit results
    if (limit > 0) {
      query = query.limit(limit)
    }

    const { data: products, error } = await query

    if (error) {
      console.error('Database error:', error)
      console.error('Query details:', { ids, limit, query: query.toString() })
      return NextResponse.json(
        { success: false, error: `Failed to fetch products: ${error.message}`, details: error },
        { status: 500 }
      )
    }

    console.log(`Found ${products?.length || 0} products`)
    if (ids.length > 0) {
      console.log(`Looking for IDs: ${ids.join(', ')}`)
      console.log(`Found products:`, products?.map(p => ({ id: p.id, title: p.title })))
    }

    // Log all products if we're looking for a specific ID but none found
    if (ids.length > 0 && (!products || products.length === 0)) {
      console.log('No products found with specified IDs. Checking all products in database...')
      const { data: allProducts, error: allError } = await supabase
        .from('products')
        .select('id, title, created_at')
        .limit(10)

      if (allError) {
        console.error('Error fetching all products:', allError)
      } else {
        console.log(`Total products in database: ${allProducts?.length || 0}`)
        console.log('Sample products:', allProducts?.slice(0, 5).map(p => ({ id: p.id, title: p.title })))
      }
    }

    // Transform the data to match our interface
    const transformedProducts: Product[] = (products || []).map(product => ({
      ...product,
      description: product.description || null,
      product_type: product.product_type || null,
      psychological_type: product.psychological_type || null,
      design_skin: product.design_skin || null,
      template_id: product.template_id || null,
      content: null,
      html_output: null,
      pdf_url: null,
      distribution_assets: null,
      pricing_strategy: null,
      marketing_strategies: null,
      tokens_used: null,
      cost_cents: null,
      generation_status: 'completed',
      generation_error: null,
      generation_metadata: null,
      user_id: '', // Not exposed for public API
    }))

    return NextResponse.json({
      success: true,
      products: transformedProducts
    })

  } catch (error) {
    console.error('Products API error:', error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}


// Handle POST for creating test products (temporary)
export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    console.log('POST Environment check:')
    console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'NOT SET')
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'NOT SET')

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error - missing environment variables' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Check if this is a request to create sample products
    let body
    try {
      body = await req.json()
    } catch (e) {
      console.log('No body or invalid JSON')
      body = {}
    }

    console.log('POST request body:', body)

    if (body.createSampleProducts) {
      console.log('Creating sample products...')
      return await createSampleProducts(supabase)
    }

    if (body.createSimpleTest) {
      console.log('Creating simple test product...')
      try {
        const { data, error } = await supabase
          .from('products')
          .insert({
            id: 'test-123',
            user_id: '00000000-0000-0000-0000-000000000000',
            title: 'Simple Test Product',
            description: 'This is a simple test product',
            product_type: 'ebook',
            psychological_type: 'transformation',
            generation_status: 'completed',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()

        if (error) {
          console.error('Error creating simple test product:', error)
          return NextResponse.json(
            { success: false, error: `Failed to create simple test: ${error.message}`, details: error },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Simple test product created',
          product: data[0]
        })
      } catch (e) {
        console.error('Unexpected error creating simple test:', e)
        return NextResponse.json(
          { success: false, error: `Unexpected error: ${e.message}` },
          { status: 500 }
        )
      }
    }

    // Check if product already exists
    const { data: existingProduct } = await supabase
      .from('products')
      .select('*')
      .eq('id', '6b28e7f2-16b9-491f-b54c-34ddedecb7c8')
      .single()

    if (existingProduct) {
      return NextResponse.json({
        success: true,
        message: 'Product already exists',
        product: existingProduct
      })
    }

    // Create test product
    const testProduct = {
      id: '6b28e7f2-16b9-491f-b54c-34ddedecb7c8',
      user_id: '00000000-0000-0000-0000-000000000000',
      title: 'Complete Fitness Transformation Guide',
      description: 'A comprehensive 30-day fitness program designed to help beginners achieve their fitness goals through structured workouts, nutrition guidance, and mindset coaching. Includes workout plans, meal prep guides, and progress tracking tools.',
      product_type: 'ebook',
      psychological_type: 'transformation',
      design_skin: 'professional',
      template_id: 'transformation-template-1',
      content: {
        title: 'Complete Fitness Transformation Guide',
        subtitle: '30 Days to Your Best Self',
        introduction: 'Transform your body and mind with this comprehensive fitness program...',
        chapters: [
          {
            number: 1,
            title: 'Getting Started: Mindset & Assessment',
            content: 'Before we begin, let\'s assess where you are and set your goals...'
          },
          {
            number: 2,
            title: 'Nutrition Fundamentals',
            content: 'Learn the basics of nutrition and how to fuel your body...'
          }
        ],
        conclusion: 'Congratulations on completing your fitness transformation journey...',
        cta: {
          title: 'Ready to Start Your Transformation?',
          description: 'Download your personalized workout plan and start today.',
          buttonText: 'Get Started Now'
        }
      },
      html_output: '<html><head><style>body{font-family:Arial,sans-serif;margin:40px}h1{color:#333}h2{color:#666}p{line-height:1.6}</style></head><body><h1>Complete Fitness Transformation Guide</h1><h2>30 Days to Your Best Self</h2><p>Transform your body and mind with this comprehensive fitness program...</p><h2>Getting Started: Mindset & Assessment</h2><p>Before we begin, let\'s assess where you are and set your goals...</p></body></html>',
      pdf_url: null,
      cover_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      distribution_assets: null,
      pricing_strategy: null,
      marketing_strategies: null,
      tokens_used: 1500,
      cost_cents: 50,
      generation_status: 'completed',
      generation_error: null,
      generation_metadata: {
        template_used: 'transformation-template-1',
        ai_model: 'gpt-4',
        processing_time: 2500
      }
    }

    const { data, error } = await supabase
      .from('products')
      .insert(testProduct)
      .select()

    if (error) {
      console.error('Error creating test product:', error)
      return NextResponse.json(
        { success: false, error: `Failed to create product: ${error.message}` },
        { status: 500 }
      )
    }

    console.log('Test product created:', data[0])

    return NextResponse.json({
      success: true,
      message: 'Test product created successfully',
      product: data[0]
    })

  } catch (error) {
    console.error('Unexpected error creating test product:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
}

// Generate ebook HTML based on category
function generateEbookHTML(category: string = 'fitness'): string {
  if (category === 'business') return generateBusinessEbookHTML()
  if (category === 'mindfulness') return generateMindfulnessEbookHTML()
  if (category === 'entrepreneurship') return generateEntrepreneurshipEbookHTML()
  if (category === 'creativity') return generateCreativityEbookHTML()
  return generateFitnessEbookHTML()
}

// Generate fitness ebook HTML - Using real AI template (fast_skin) - Much better colors!
function generateFitnessEbookHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Ultimate Body Transformation Blueprint</title>
  <style>
    body{font-family:Inter,sans-serif;color:#0F172A;background:linear-gradient(135deg,#1a1a1a,#2d2d2d);line-height:1.8;font-size:16px;max-width:800px;margin:0 auto;padding:40px;min-height:100vh;}
    h1,h2,h3{font-family:'League Spartan',sans-serif;color:#ff4757;margin:1rem 0 0.5rem 0;font-weight:700;text-shadow:0 2px 4px rgba(0,0,0,0.3);}
    h1{font-size:3rem;text-align:center;background:linear-gradient(45deg,#ff4757,#ff6b6b);background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:2rem 0;}
    h2{font-size:2.2rem;color:#ff6b6b;}
    h3{font-size:1.8rem;color:#ff9f43;}
    p{margin-bottom:1.2rem;color:#e8e8e8;font-size:1.1rem;}
    .chapter{background:linear-gradient(135deg,rgba(255,71,87,0.1),rgba(255,107,107,0.1));border:2px solid #ff4757;border-left:6px solid #ff4757;padding:25px;margin:25px 0;border-radius:15px;box-shadow:0 8px 32px rgba(255,71,87,0.2);backdrop-filter:blur(10px);}
    .highlight{background:linear-gradient(135deg,#ffeaa7,#fab1a0);border:2px solid #fdcb6e;padding:20px;border-radius:12px;margin:20px 0;color:#2d3436;font-weight:500;box-shadow:0 4px 15px rgba(253,203,110,0.3);}
    ul,ol{margin:18px 0;padding-left:25px;}
    li{margin-bottom:10px;color:#e8e8e8;font-size:1.1rem;}
    .cover{text-align:center;background:linear-gradient(135deg,#ff4757,#ff3838,#ff6b6b);color:#fff;padding:60px;border-radius:20px;margin-bottom:40px;box-shadow:0 15px 35px rgba(255,71,87,0.4);position:relative;overflow:hidden;}
    .cover::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%);animation:shine 3s ease-in-out;}
    @keyframes shine{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
    .toc{background:linear-gradient(135deg,rgba(255,107,107,0.15),rgba(255,161,67,0.15));padding:25px;border-radius:15px;margin:25px 0;border:2px solid #ff6b6b;color:#e8e8e8;}
    @media print{.page-break{page-break-before:always;}body{font-size:12pt;background:white!important;color:black!important;}.cover{height:100vh;background:linear-gradient(135deg,#ff4757,#ff6b6b)!important;}}
    @page{size:A4;margin:2cm;}
  </style>
</head>
<body>
  <div class="cover">
    <h1>The Ultimate Body Transformation Blueprint</h1>
    <p style="font-size:1.4rem;margin:1rem 0;color:#ff6b6b;">Your 90-Day Journey to Peak Physical Condition</p>
    <small style="font-size:1.1rem;color:#ff9f43;">by Fitness Transformation Expert</small>
  </div>

  <div class="toc">
    <h2>Table of Contents</h2>
    <p>1. The Transformation Mindset</p>
    <p>2. Nutrition Mastery</p>
    <p>3. Training Systems</p>
    <p>4. Recovery & Regeneration</p>
    <p>5. Advanced Techniques</p>
    <p>6. Measuring Progress</p>
    <p>7. Sustaining Results</p>
  </div>

  <div class="chapter">
    <h2>Chapter 1: The Transformation Mindset</h2>
    <p>Before you change your body, you must change your mind. The most successful transformations begin with a fundamental shift in how you think about food, exercise, and your relationship with your body.</p>

    <h3>The Identity Shift</h3>
    <p>Your current results are a reflection of your current identity. If you want different results, you need to become a different person. This chapter explores the mental frameworks that separate successful transformers from those who quit.</p>

    <div class="highlight">
      <strong>"The body achieves what the mind believes." - Arnold Schwarzenegger</strong>
    </div>

    <h3>Goal Setting That Works</h3>
    <p>Most people set goals that are too vague or unrealistic. Learn how to set SMART goals that motivate and guide your transformation journey.</p>

    <ul>
      <li><strong>Specific:</strong> Clearly define what you want to achieve</li>
      <li><strong>Measurable:</strong> Quantify your progress</li>
      <li><strong>Achievable:</strong> Set realistic targets</li>
      <li><strong>Relevant:</strong> Align with your values</li>
      <li><strong>Time-bound:</strong> Set deadlines for accountability</li>
    </ul>
  </div>

  <div class="chapter">
    <h2>Chapter 2: Nutrition Mastery</h2>
    <p>Nutrition is the foundation of any successful transformation. Without the right fuel, even the best workout program will fail. This chapter reveals the science-backed nutrition protocols that optimize fat loss and muscle growth simultaneously.</p>

    <h3>Calorie Fundamentals</h3>
    <p>Calories are king when it comes to body composition. Learn how to calculate your maintenance calories and create the perfect deficit or surplus for your goals.</p>

    <div class="highlight">
      <h4>Daily Calorie Formula:</h4>
      <p><strong>For Fat Loss:</strong> Maintenance calories - 500 = 1 lb/week loss</p>
      <p><strong>For Muscle Gain:</strong> Maintenance calories + 250-500 = 0.5-1 lb/week gain</p>
    </div>

    <h3>Macronutrient Ratios</h3>
    <p>Protein, carbohydrates, and fats each play crucial roles in your transformation. Learn the optimal ratios for your specific goals.</p>

    <h3>Meal Timing & Frequency</h3>
    <p>Discover how meal timing can enhance fat loss, muscle preservation, and overall energy levels throughout your transformation journey.</p>
  </div>

  <div class="chapter">
    <h2>Chapter 3: Training Systems</h2>
    <p>Training is where the magic happens. This chapter provides workout protocols that maximize muscle growth, fat loss, and functional strength with efficient, time-effective programs.</p>

    <h3>Progressive Overload Principles</h3>
    <p>The key to continuous progress is progressive overload. Learn how to systematically increase training stress for optimal adaptation.</p>

    <h3>Training Split Options</h3>
    <p>Choose from multiple training splits based on your schedule, experience level, and goals:</p>
    <ul>
      <li><strong>Full Body (3x/week):</strong> Perfect for beginners</li>
      <li><strong>Upper/Lower (4x/week):</strong> Balanced development</li>
      <li><strong>Push/Pull/Legs (6x/week):</strong> Maximum muscle growth</li>
      <li><strong>Body Part Split (4-6x/week):</strong> Advanced specialization</li>
    </ul>

    <h3>Exercise Selection</h3>
    <p>Master the compound movements that deliver the most bang for your buck, plus accessory exercises that address weak points and imbalances.</p>
  </div>

  <div class="chapter">
    <h2>Chapter 4: Recovery & Regeneration</h2>
    <p>Recovery is where your body actually changes. Most people focus on training hard but neglect the crucial recovery processes that drive adaptation and growth.</p>

    <h3>Sleep Optimization</h3>
    <p>Learn how to optimize your sleep environment and habits for maximum recovery and hormone optimization.</p>

    <h3>Stress Management</h3>
    <p>Chronic stress sabotages fat loss and muscle growth. Discover evidence-based strategies for managing stress in our fast-paced world.</p>

    <h3>Active Recovery Techniques</h3>
    <p>Incorporate mobility work, foam rolling, and light activity to enhance recovery and prevent injury.</p>

    <div class="highlight">
      <h4>Recovery Checklist:</h4>
      <ul>
        <li>7-9 hours of quality sleep per night</li>
        <li>Stress management practices daily</li>
        <li>Mobility work 3x per week</li>
        <li>Deload weeks every 4-6 weeks</li>
        <li>Proper nutrition for recovery</li>
      </ul>
    </div>
  </div>

  <div class="chapter">
    <h2>Chapter 5: Advanced Techniques</h2>
    <p>Once you've mastered the basics, these advanced techniques will help you break through plateaus and achieve extraordinary results.</p>

    <h3>Periodization</h3>
    <p>Strategic variation in training intensity and volume to prevent burnout and maximize long-term progress.</p>

    <h3>Periodization Models</h3>
    <ul>
      <li><strong>Linear Periodization:</strong> Gradually increasing intensity over time</li>
      <li><strong>Undulating Periodization:</strong> Frequent changes in training variables</li>
      <li><strong>Block Periodization:</strong> Focused training blocks for specific adaptations</li>
    </ul>

    <h3>Advanced Nutrition Strategies</h3>
    <p>Learn about nutrient timing, supplementation, and body recomposition techniques that take your results to the next level.</p>
  </div>

  <div class="chapter">
    <h2>Chapter 6: Measuring Progress</h2>
    <p>Tracking your transformation is crucial for staying motivated and making data-driven adjustments. This chapter covers all the metrics that matter.</p>

    <h3>Key Performance Indicators</h3>
    <ul>
      <li><strong>Body Measurements:</strong> Waist, hips, chest, arms, etc.</li>
      <li><strong>Body Weight:</strong> Weekly weigh-ins</li>
      <li><strong>Body Fat Percentage:</strong> Monthly assessments</li>
      <li><strong>Strength Metrics:</strong> Track your lifts</li>
      <li><strong>Progress Photos:</strong> Monthly comparisons</li>
    </ul>

    <h3>Tools & Apps</h3>
    <p>Discover the best apps and tools for tracking your transformation journey effectively.</p>
  </div>

  <div class="chapter">
    <h2>Chapter 7: Sustaining Results</h2>
    <p>The ultimate goal isn't just to transform your body—it's to maintain those results for life. This chapter focuses on long-term sustainability.</p>

    <h3>Lifestyle Integration</h3>
    <p>Learn how to integrate your new habits into your lifestyle so they become automatic and sustainable.</p>

    <h3>Mindset Maintenance</h3>
    <p>Develop the mental resilience to maintain your results even when life gets challenging.</p>

    <h3>Plateau Prevention</h3>
    <p>Strategies for avoiding and breaking through long-term plateaus that can derail your progress.</p>

    <div class="highlight">
      <h4>Remember:</h4>
      <p>Transformation is a journey, not a destination. The habits you build during your 90-day program will serve you for the rest of your life.</p>
    </div>
  </div>
</body>
</html>`
}

// Function to create sample products
async function createSampleProducts(supabase: any) {
  const sampleProducts = [
    {
      id: 'prod-fitness-001',
      title: 'The Ultimate Body Transformation Blueprint',
      description: 'Transform your physique in 90 days with this comprehensive guide that combines cutting-edge science with practical strategies.',
      product_type: 'ebook',
      psychological_type: 'transformation',
      design_skin: 'vibrant',
      content: {
        title: 'The Ultimate Body Transformation Blueprint',
        subtitle: 'Your 90-Day Journey to Peak Physical Condition',
        introduction: 'In this comprehensive blueprint, you\'ll discover the exact systems...',
        chapters: [
          { number: 1, title: 'The Transformation Mindset', content: 'Before you change your body...' },
          { number: 2, title: 'Nutrition Mastery', content: 'Discover the science-backed...' },
          { number: 3, title: 'Training Systems', content: 'Master the workout protocols...' },
          { number: 4, title: 'Recovery & Regeneration', content: 'Learn the art of recovery...' }
        ],
        conclusion: 'You now have everything you need...',
        cta: { title: 'Ready to Transform?', description: 'Start your 90-day transformation', buttonText: 'Begin My Transformation' }
      },
      html_output: '<html><head><style>body{font-family:Inter,sans-serif;background:linear-gradient(135deg,#FF6B35 0%,#F7931E 100%);color:#333;margin:0;padding:40px}h1{color:#fff;text-align:center;font-size:3em;margin-bottom:20px}h2{color:#fff;text-align:center;margin-bottom:40px}.chapter{background:#fff;margin:20px 0;padding:30px;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.1)}.chapter h3{color:#FF6B35;font-size:1.5em}.chapter p{line-height:1.6}</style></head><body><h1>The Ultimate Body Transformation Blueprint</h1><div class="chapter"><h3>Chapter 1: The Transformation Mindset</h3><p>Before you change your body...</p></div></body></html>',
      cover_image_url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      tokens_used: 1200,
      cost_cents: 45,
      generation_status: 'completed'
    },
    {
      id: 'prod-business-002',
      title: 'Passive Income Empire: Build Wealth While You Sleep',
      description: 'Master the art of creating multiple streams of passive income through digital products and investments.',
      product_type: 'ebook',
      psychological_type: 'system',
      design_skin: 'professional',
      content: {
        title: 'Passive Income Empire',
        subtitle: 'Build Wealth While You Sleep',
        introduction: 'Financial freedom isn\'t a dream - it\'s a system...',
        chapters: [
          { number: 1, title: 'The Passive Income Mindset', content: 'Develop the millionaire mindset...' },
          { number: 2, title: 'Digital Product Empire', content: 'Learn how to create and sell...' },
          { number: 3, title: 'Investment Strategies', content: 'Master the art of investing...' },
          { number: 4, title: 'Automation & Scaling', content: 'Build systems that run without you...' }
        ],
        conclusion: 'You now have the complete blueprint...',
        cta: { title: 'Ready to Build Your Empire?', description: 'Start creating passive income', buttonText: 'Build My Empire' }
      },
      html_output: '<html><head><style>body{font-family:Inter,sans-serif;background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%);color:#333;margin:0;padding:40px}h1{color:#fff;text-align:center;font-size:3em;margin-bottom:20px}.chapter{background:#fff;margin:20px 0;padding:30px;border-radius:15px}.chapter h3{color:#1e3a8a;font-size:1.5em}</style></head><body><h1>Passive Income Empire</h1><div class="chapter"><h3>Chapter 1: The Passive Income Mindset</h3><p>Develop the millionaire mindset...</p></div></body></html>',
      cover_image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
      tokens_used: 1100,
      cost_cents: 42,
      generation_status: 'completed'
    },
    {
      id: 'prod-mindfulness-003',
      title: 'The Art of Mindful Living: Ancient Wisdom for Modern Life',
      description: 'Discover the transformative power of mindfulness with ancient meditation techniques and modern stress management.',
      product_type: 'ebook',
      psychological_type: 'authority',
      design_skin: 'serene',
      content: {
        title: 'The Art of Mindful Living',
        subtitle: 'Ancient Wisdom for Modern Life',
        introduction: 'In our fast-paced world, mindfulness isn\'t just a trend...',
        chapters: [
          { number: 1, title: 'The Foundations of Mindfulness', content: 'Understand what mindfulness truly is...' },
          { number: 2, title: 'Breathing Techniques', content: 'Master the art of conscious breathing...' },
          { number: 3, title: 'Meditation Practices', content: 'Learn step-by-step meditation...' },
          { number: 4, title: 'Mindful Daily Life', content: 'Integrate mindfulness into eating...' }
        ],
        conclusion: 'Mindfulness is not about becoming someone else...',
        cta: { title: 'Ready for Inner Peace?', description: 'Start your mindfulness journey', buttonText: 'Begin Mindful Living' }
      },
      html_output: '<html><head><style>body{font-family:Inter,sans-serif;background:linear-gradient(135deg,#059669 0%,#10b981 100%);color:#333;margin:0;padding:40px}h1{color:#fff;text-align:center;font-size:3em;margin-bottom:20px}.chapter{background:#fff;margin:20px 0;padding:30px;border-radius:15px}.chapter h3{color:#059669;font-size:1.5em}</style></head><body><h1>The Art of Mindful Living</h1><div class="chapter"><h3>Chapter 1: The Foundations of Mindfulness</h3><p>Understand what mindfulness truly is...</p></div></body></html>',
      cover_image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      tokens_used: 1050,
      cost_cents: 38,
      generation_status: 'completed'
    },
    {
      id: 'prod-entrepreneur-004',
      title: 'The Lean Startup Revolution: Build Fast, Fail Fast, Succeed Big',
      description: 'Master lean entrepreneurship principles with validated learning and rapid experimentation techniques.',
      product_type: 'ebook',
      psychological_type: 'quick_win',
      design_skin: 'innovative',
      content: {
        title: 'The Lean Startup Revolution',
        subtitle: 'Build Fast, Fail Fast, Succeed Big',
        introduction: 'The traditional approach to entrepreneurship is dead...',
        chapters: [
          { number: 1, title: 'Lean Thinking Fundamentals', content: 'Understand the core principles...' },
          { number: 2, title: 'Customer Development', content: 'Master the art of finding customers...' },
          { number: 3, title: 'Minimum Viable Products', content: 'Learn how to build, test...' },
          { number: 4, title: 'Growth Hacking', content: 'Discover scalable growth strategies...' }
        ],
        conclusion: 'The lean revolution has just begun...',
        cta: { title: 'Ready to Build Lean?', description: 'Start your entrepreneurial revolution', buttonText: 'Launch My Startup' }
      },
      html_output: '<html><head><style>body{font-family:Inter,sans-serif;background:linear-gradient(135deg,#7c3aed 0%,#a855f7 100%);color:#333;margin:0;padding:40px}h1{color:#fff;text-align:center;font-size:3em;margin-bottom:20px}.chapter{background:#fff;margin:20px 0;padding:30px;border-radius:15px}.chapter h3{color:#7c3aed;font-size:1.5em}</style></head><body><h1>The Lean Startup Revolution</h1><div class="chapter"><h3>Chapter 1: Lean Thinking Fundamentals</h3><p>Understand the core principles...</p></div></body></html>',
      cover_image_url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop',
      tokens_used: 1150,
      cost_cents: 44,
      generation_status: 'completed'
    },
    {
      id: 'prod-creativity-005',
      title: 'Unlock Your Creative Genius: The Artist\'s Guide to Innovation',
      description: 'Tap into your innate creativity with techniques from history\'s greatest innovators and creative problem-solving.',
      product_type: 'ebook',
      psychological_type: 'creative',
      design_skin: 'artistic',
      content: {
        title: 'Unlock Your Creative Genius',
        subtitle: 'The Artist\'s Guide to Innovation',
        introduction: 'Every person is born creative...',
        chapters: [
          { number: 1, title: 'The Creative Mindset', content: 'Cultivate the mental frameworks...' },
          { number: 2, title: 'Idea Generation Techniques', content: 'Master proven methods...' },
          { number: 3, title: 'Overcoming Creative Blocks', content: 'Learn strategies to break through...' },
          { number: 4, title: 'Creative Execution', content: 'Turn ideas into reality...' }
        ],
        conclusion: 'Creativity is your birthright...',
        cta: { title: 'Ready to Create?', description: 'Unlock your creative potential', buttonText: 'Start Creating' }
      },
      html_output: '<html><head><style>body{font-family:Inter,sans-serif;background:linear-gradient(135deg,#dc2626 0%,#ef4444 100%);color:#333;margin:0;padding:40px}h1{color:#fff;text-align:center;font-size:3em;margin-bottom:20px}.chapter{background:#fff;margin:20px 0;padding:30px;border-radius:15px}.chapter h3{color:#dc2626;font-size:1.5em}</style></head><body><h1>Unlock Your Creative Genius</h1><div class="chapter"><h3>Chapter 1: The Creative Mindset</h3><p>Cultivate the mental frameworks...</p></div></body></html>',
      cover_image_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
      tokens_used: 1080,
      cost_cents: 41,
      generation_status: 'completed'
    }
  ]

  console.log('Creating 5 sample products...')

  for (const product of sampleProducts) {
    console.log(`Creating product: ${product.title}`)

    try {
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...product,
          user_id: '00000000-0000-0000-0000-000000000000',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) {
        console.error(`Error creating product "${product.title}":`, error)
        console.error('Full error details:', JSON.stringify(error, null, 2))
        return NextResponse.json(
          { success: false, error: `Failed to create product "${product.title}": ${error.message}`, details: error },
          { status: 500 }
        )
      } else {
        console.log(`✅ Created product: ${data[0].title} (ID: ${data[0].id})`)
      }
    } catch (insertError) {
      console.error(`Unexpected error creating product "${product.title}":`, insertError)
      return NextResponse.json(
        { success: false, error: `Unexpected error creating product "${product.title}": ${insertError.message}` },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({
    success: true,
    message: 'All 5 sample products created successfully',
    count: sampleProducts.length
  })
}


// Generate business ebook HTML - Using real AI template (professional_skin)
function generateBusinessEbookHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Passive Income Empire: Build Wealth While You Sleep</title>
  <style>
    body{font-family:Inter,sans-serif;color:#1E3A8A;background:#EFF6FF;line-height:1.7;font-size:16px;max-width:800px;margin:0 auto;padding:40px;}
    h1,h2,h3{font-family:'League Spartan',sans-serif;color:#1E40AF;margin:1rem 0 0.5rem 0;}
    h1{font-size:2.5rem;}h2{font-size:2rem;}h3{font-size:1.5rem;}
    p{margin-bottom:1rem;}
    .chapter{background:#DBEAFE;border-left:4px solid #1E40AF;padding:20px;margin:20px 0;border-radius:8px;}
    .highlight{background:#FEF3C7;border:1px solid #F59E0B;padding:15px;border-radius:8px;margin:15px 0;}
    ul,ol{margin:15px 0;padding-left:20px;}
    li{margin-bottom:8px;}
    .cover{text-align:center;background:linear-gradient(135deg,#1E40AF,#3B82F6);color:#fff;padding:40px;border-radius:12px;margin-bottom:30px;}
    .toc{background:#BFDBFE;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #93C5FD;}
    @media print{.page-break{page-break-before:always;}body{font-size:12pt;}.cover{height:100vh;}}
    @page{size:A4;margin:2cm;}
  </style>
</head>
<body>
  <div class="cover">
    <h1>Passive Income Empire</h1>
    <p>Build Wealth While You Sleep</p>
    <small>by Business Strategist</small>
  </div>

  <div class="toc">
    <h2>Table of Contents</h2>
    <p>1. The Passive Income Mindset</p>
    <p>2. Digital Product Empire</p>
    <p>3. Investment Strategies</p>
    <p>4. Automation & Scaling</p>
  </div>

  <div class="chapter">
    <h2>Chapter 1: The Passive Income Mindset</h2>
    <p>Develop the millionaire mindset that separates successful entrepreneurs from those who remain stuck in the rat race.</p>
  </div>
</body>
</html>`
}

// Generate mindfulness ebook HTML - Using real AI template (modern_emerald)
function generateMindfulnessEbookHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Art of Mindful Living: Ancient Wisdom for Modern Life</title>
  <style>
    body{font-family:Inter,sans-serif;color:#064E3B;background:#ECFDF5;line-height:1.7;font-size:16px;max-width:800px;margin:0 auto;padding:40px;}
    h1,h2,h3{font-family:'League Spartan',sans-serif;color:#059669;margin:1rem 0 0.5rem 0;}
    h1{font-size:2.5rem;}h2{font-size:2rem;}h3{font-size:1.5rem;}
    p{margin-bottom:1rem;}
    .chapter{background:#A7F3D0;border-left:4px solid #059669;padding:20px;margin:20px 0;border-radius:8px;}
    .highlight{background:#FEF3C7;border:1px solid #F59E0B;padding:15px;border-radius:8px;margin:15px 0;}
    ul,ol{margin:15px 0;padding-left:20px;}
    li{margin-bottom:8px;}
    .cover{text-align:center;background:linear-gradient(135deg,#059669,#34D399);color:#fff;padding:40px;border-radius:12px;margin-bottom:30px;}
    .toc{background:#6EE7B7;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #34D399;}
    @media print{.page-break{page-break-before:always;}body{font-size:12pt;}.cover{height:100vh;}}
    @page{size:A4;margin:2cm;}
  </style>
</head>
<body>
  <div class="cover">
    <h1>The Art of Mindful Living</h1>
    <p>Ancient Wisdom for Modern Life</p>
    <small>by Mindfulness Master</small>
  </div>

  <div class="toc">
    <h2>Table of Contents</h2>
    <p>1. The Foundations of Mindfulness</p>
    <p>2. Breathing Techniques</p>
    <p>3. Meditation Practices</p>
    <p>4. Mindful Daily Life</p>
  </div>

  <div class="chapter">
    <h2>Chapter 1: The Foundations of Mindfulness</h2>
    <p>Understand what mindfulness truly is and how it can transform your relationship with yourself and the world around you.</p>
  </div>
</body>
</html>`
}

// Generate entrepreneurship ebook HTML - Using real AI template (modern_indigo)
function generateEntrepreneurshipEbookHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Lean Startup Revolution: Build Fast, Fail Fast, Succeed Big</title>
  <style>
    body{font-family:Inter,sans-serif;color:#312E81;background:#EEF2FF;line-height:1.7;font-size:16px;max-width:800px;margin:0 auto;padding:40px;}
    h1,h2,h3{font-family:'League Spartan',sans-serif;color:#4F46E5;margin:1rem 0 0.5rem 0;}
    h1{font-size:2.5rem;}h2{font-size:2rem;}h3{font-size:1.5rem;}
    p{margin-bottom:1rem;}
    .chapter{background:#C7D2FE;border-left:4px solid #4F46E5;padding:20px;margin:20px 0;border-radius:8px;}
    .highlight{background:#FEF3C7;border:1px solid #F59E0B;padding:15px;border-radius:8px;margin:15px 0;}
    ul,ol{margin:15px 0;padding-left:20px;}
    li{margin-bottom:8px;}
    .cover{text-align:center;background:linear-gradient(135deg,#4F46E5,#818CF8);color:#fff;padding:40px;border-radius:12px;margin-bottom:30px;}
    .toc{background:#A5B4FC;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #6366F1;}
    @media print{.page-break{page-break-before:always;}body{font-size:12pt;}.cover{height:100vh;}}
    @page{size:A4;margin:2cm;}
  </style>
</head>
<body>
  <div class="cover">
    <h1>The Lean Startup Revolution</h1>
    <p>Build Fast, Fail Fast, Succeed Big</p>
    <small>by Startup Guru</small>
  </div>

  <div class="toc">
    <h2>Table of Contents</h2>
    <p>1. Lean Thinking Fundamentals</p>
    <p>2. Customer Development</p>
    <p>3. Minimum Viable Products</p>
    <p>4. Growth Hacking</p>
  </div>

  <div class="chapter">
    <h2>Chapter 1: Lean Thinking Fundamentals</h2>
    <p>Understand the core principles of lean methodology that have revolutionized how successful companies are built.</p>
  </div>
</body>
</html>`
}

// Generate creativity ebook HTML - Using real AI template (modern_rose)
function generateCreativityEbookHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unlock Your Creative Genius: The Artist's Guide to Innovation</title>
  <style>
    body{font-family:Inter,sans-serif;color:#881337;background:#FFF1F2;line-height:1.7;font-size:16px;max-width:800px;margin:0 auto;padding:40px;}
    h1,h2,h3{font-family:'League Spartan',sans-serif;color:#E11D48;margin:1rem 0 0.5rem 0;}
    h1{font-size:2.5rem;}h2{font-size:2rem;}h3{font-size:1.5rem;}
    p{margin-bottom:1rem;}
    .chapter{background:#FBCFE7;border-left:4px solid #E11D48;padding:20px;margin:20px 0;border-radius:8px;}
    .highlight{background:#99F6E4;border:1px solid #14B8A6;padding:15px;border-radius:8px;margin:15px 0;}
    ul,ol{margin:15px 0;padding-left:20px;}
    li{margin-bottom:8px;}
    .cover{text-align:center;background:linear-gradient(135deg,#E11D48,#FB7185);color:#fff;padding:40px;border-radius:12px;margin-bottom:30px;}
    .toc{background:#FDA4AF;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #FB7185;}
    @media print{.page-break{page-break-before:always;}body{font-size:12pt;}.cover{height:100vh;}}
    @page{size:A4;margin:2cm;}
  </style>
</head>
<body>
  <div class="cover">
    <h1>Unlock Your Creative Genius</h1>
    <p>The Artist's Guide to Innovation</p>
    <small>by Creative Genius</small>
  </div>

  <div class="toc">
    <h2>Table of Contents</h2>
    <p>1. The Creative Mindset</p>
    <p>2. Idea Generation Techniques</p>
    <p>3. Overcoming Creative Blocks</p>
    <p>4. Creative Execution</p>
  </div>

  <div class="chapter">
    <h2>Chapter 1: The Creative Mindset</h2>
    <p>Cultivate the mental frameworks that unlock your innate creative potential and turn you into an innovation powerhouse.</p>
  </div>
</body>
</html>`
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
