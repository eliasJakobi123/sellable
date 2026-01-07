import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Types
interface GenerateProductRequest {
  userInput: string;
  productType: 'ebook' | 'template' | 'voice' | 'course';
  includeDistribution?: boolean;
  ebookLength?: 'short' | 'medium' | 'long';
  authorName?: string;
}

interface GenerationResult {
  success: boolean;
  product?: {
    id: string;
    title: string;
    psychologicalType: string;
    designSkin: string;
    htmlOutput: string;
    pdfUrl?: string;
    coverImageUrl?: string;
    distributionAssets?: Record<string, string>;
  };
  error?: string;
  metrics?: {
    tokensUsed: number;
    costCents: number;
    durationMs: number;
  };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: GenerateProductRequest = await req.json();
    const { userInput, productType, includeDistribution, ebookLength, authorName } = body;

    // Validate input
    if (!userInput || userInput.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Please provide a detailed product description (at least 10 characters)' },
        { status: 400 }
      );
    }

    if (!productType || !['ebook', 'template', 'voice', 'course'].includes(productType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product type. Must be ebook, template, voice, or course' },
        { status: 400 }
      );
    }

    // Get authorization header from request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Authorization required' },
        { status: 401 }
      );
    }

    // Verify user with Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Create Supabase client with Authorization header
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });
    
    // Get user - Supabase will use the Authorization header automatically
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('API Route Auth Error:', authError);
      console.error('Auth Header received:', authHeader ? 'Yes' : 'No');
      return NextResponse.json(
        { success: false, error: `Authentication failed: ${authError?.message || 'Invalid token'}` },
        { status: 401 }
      );
    }

    console.log('API Route: User authenticated:', user.id);

    // Call Supabase Edge Function
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/generate-product`;

    try {
      // Use anon key for Edge Function auth since we've already validated the user
      // and pass the userId in the request body
      const response = await fetch(edgeFunctionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({
          userId: user.id,
          userInput,
          productType,
          includeDistribution: includeDistribution || false,
          distributionOutputs: includeDistribution ? ['instagram', 'linkedin'] : [],
          ebookLength: ebookLength || 'medium',
          authorName: authorName || 'Author',
        }),
      });

      const responseText = await response.text();
      let errorData: any = {};
      
      try {
        errorData = JSON.parse(responseText);
      } catch {
        errorData = { error: responseText || 'Unknown error' };
      }

      if (!response.ok) {
        console.error('Edge Function Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData,
        });
        

        // Handle 404 (function not found / not deployed)
        if (response.status === 404) {
          return NextResponse.json(
            { success: false, error: 'Generation service is not available. Please contact support or try again later.' },
            { status: 503 }
          );
        }

        return NextResponse.json(
          { success: false, error: errorData.error || `Failed to generate product (${response.status})` },
          { status: response.status }
        );
      }

      let result: GenerationResult;
      try {
        result = JSON.parse(responseText);
      } catch {
        return NextResponse.json(
          { success: false, error: 'Invalid response from generation service' },
          { status: 500 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } catch (fetchError) {
      console.error('Fetch Error:', fetchError);
      return NextResponse.json(
        { 
          success: false, 
          error: fetchError instanceof Error 
            ? `Network error: ${fetchError.message}` 
            : 'Failed to connect to generation service'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Generate product error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

