import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Types
interface GeneratePDFRequest {
  productId: string;
  htmlContent?: string;
}

interface PDFResult {
  success: boolean;
  pdfUrl?: string;
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body: GeneratePDFRequest = await req.json();
    const { productId, htmlContent } = body;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Get authorization header
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

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    // Get product to verify ownership
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('user_id', user.id)
      .single();

    if (productError || !product) {
      return NextResponse.json(
        { success: false, error: 'Product not found or access denied' },
        { status: 404 }
      );
    }

    // Get HTML content from product or request
    const html = htmlContent || product.html_output;

    if (!html) {
      return NextResponse.json(
        { success: false, error: 'No HTML content available for PDF generation' },
        { status: 400 }
      );
    }

    // For now, return the HTML content as a data URL
    // In production, you would use a PDF generation service like:
    // - Puppeteer (requires a separate serverless function or service)
    // - PDF.co API
    // - html-pdf-node
    // - Prince XML
    
    // Create a simple HTML-based PDF download
    // The client will handle the actual PDF generation using browser APIs
    const pdfResult: PDFResult = {
      success: true,
      pdfUrl: `data:text/html;base64,${Buffer.from(html).toString('base64')}`,
    };

    return NextResponse.json(pdfResult, { status: 200 });

  } catch (error) {
    console.error('Generate PDF error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to generate PDF' 
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




