// API Client for Product Generation
// Client-side utilities for calling the product generation API

import { supabase } from './supabase';

// Types
export interface GenerateProductParams {
  userInput: string;
  productType: 'ebook' | 'template' | 'voice' | 'course';
  includeDistribution?: boolean;
  ebookLength?: 'short' | 'medium' | 'long';
  authorName?: string;
}

export interface GeneratedProduct {
  id: string;
  title: string;
  psychologicalType: string;
  designSkin: string;
  htmlOutput: string;
  pdfUrl?: string;
  coverImageUrl?: string;
  distributionAssets?: Record<string, string>;
}

export interface GenerationResult {
  success: boolean;
  product?: GeneratedProduct;
  error?: string;
  metrics?: {
    tokensUsed: number;
    costCents: number;
    durationMs: number;
  };
}

export interface PDFResult {
  success: boolean;
  pdfUrl?: string;
  error?: string;
}

// Generate product using AI
export async function generateProduct(params: GenerateProductParams): Promise<GenerationResult> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return { success: false, error: 'Please sign in to generate products' };
  }

  try {
    const response = await fetch('/api/generate-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(params),
    });

    const responseText = await response.text();
    let result: GenerationResult;
    
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error('Invalid JSON response:', responseText);
      return {
        success: false,
        error: 'Invalid response from server',
      };
    }

    if (!response.ok) {
      console.error('API Error:', {
        status: response.status,
        error: result.error,
      });
      return {
        success: false,
        error: result.error || `Generation failed with status ${response.status}`,
      };
    }

    return result;
  } catch (error) {
    console.error('Generate product error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Generate PDF from product
export async function generatePDF(productId: string): Promise<PDFResult> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return { success: false, error: 'Please sign in to generate PDFs' };
  }

  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ productId }),
    });

    const result: PDFResult = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to generate PDF',
      };
    }

    return result;
  } catch (error) {
    console.error('Generate PDF error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// Download PDF from HTML content using browser APIs
export function downloadPDFFromHTML(htmlContent: string, filename: string): void {
  // Option 1: Try modern print-to-PDF with better UX
  if ('showSaveFilePicker' in window) {
    // Modern browsers: Try direct PDF save
    createPrintOptimizedWindow(htmlContent, filename, true);
  } else {
    // Fallback: Optimized print window
    createPrintOptimizedWindow(htmlContent, filename, false);
  }
}

// Create an optimized print window for PDF generation
function createPrintOptimizedWindow(htmlContent: string, filename: string, isModern: boolean): void {
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  if (!printWindow) {
    alert('Please allow popups for PDF export');
    return;
  }

  // Enhanced print styles for better PDF output
  const printStyles = `
    <style id="pdf-print-optimization">
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        html, body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .cover-page, .intro-page, .chapter, .conclusion-page {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        .page-break {
          page-break-before: always !important;
          break-before: page !important;
        }

        .cover-page {
          min-height: 100vh !important;
          height: 100vh !important;
          /* CRITICAL: Preserve gradient background - do NOT override with inherit */
          /* The gradient is already set in the HTML, we just need to ensure it prints */
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
          /* Do NOT set background: inherit as it will remove the gradient */
        }
        
        /* Force color preservation for all cover page elements */
        .cover-page,
        .cover-page *,
        .cover-content,
        .cover-content * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        /* Ensure white text on cover is visible */
        .cover-page .title,
        .cover-page .subtitle,
        .cover-page .author {
          color: #ffffff !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Hide UI elements during print */
        .no-print {
          display: none !important;
        }

        /* Ensure text is readable */
        body {
          font-size: 12pt !important;
          line-height: 1.5 !important;
          color: inherit !important;
        }

        h1, h2, h3, h4 {
          page-break-after: avoid !important;
          break-after: avoid !important;
        }

        /* Fix for better PDF rendering */
        img {
          max-width: 100% !important;
          height: auto !important;
        }
        
        /* Ensure first page (cover) has no margins */
        @page :first {
          margin: 0 !important;
        }
        
        /* Ensure cover page fills entire first page */
        .cover-page {
          margin: 0 !important;
          padding: 2rem !important;
        }
      }
      
      /* Additional styles outside @media print to ensure colors are set */
      .cover-page {
        position: relative;
        z-index: 1;
      }

      /* Loading indicator */
      .print-loading {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-family: Arial, sans-serif;
        z-index: 9999;
      }

      /* Hide loading after content loads */
      .print-loading.loaded {
        display: none;
      }
    </style>

    <div class="print-loading" id="printLoading">
      <div style="text-align: center;">
        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; width: 40px; height: 40px; animation: spin 2s linear infinite; margin: 0 auto 10px;"></div>
        Preparing PDF...
      </div>
    </div>

    <script>
      // Animation for loading spinner
      const style = document.createElement('style');
      style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
      document.head.appendChild(style);

      // Auto-trigger print when content is ready
      let contentReady = false;
      let imagesLoaded = 0;
      let totalImages = 0;

      function checkImagesLoaded() {
        const images = document.querySelectorAll('img');
        totalImages = images.length;

        if (totalImages === 0) {
          triggerPrint();
          return;
        }

        images.forEach(img => {
          if (img.complete) {
            imagesLoaded++;
          } else {
            img.onload = () => {
              imagesLoaded++;
              if (imagesLoaded >= totalImages) {
                triggerPrint();
              }
            };
            img.onerror = () => {
              imagesLoaded++;
              if (imagesLoaded >= totalImages) {
                triggerPrint();
              }
            };
          }
        });

        // If all images were already loaded
        if (imagesLoaded >= totalImages) {
          triggerPrint();
        }
      }

      function triggerPrint() {
        if (contentReady) return;
        contentReady = true;

        // Hide loading indicator
        const loading = document.getElementById('printLoading');
        if (loading) {
          loading.classList.add('loaded');
        }

        // Small delay to ensure rendering is complete
        setTimeout(() => {
          ${isModern ? `
            // Try to use modern print API if available
            if (navigator.userAgent.includes('Chrome') || navigator.userAgent.includes('Edge')) {
              // Chrome/Edge have better PDF printing
              window.print();
            } else {
              window.print();
            }
          ` : `
            window.print();
          `}
        }, 1000);
      }

      // Check when DOM and images are loaded
      window.addEventListener('load', () => {
        checkImagesLoaded();
      });

      // Fallback timeout
      setTimeout(() => {
        if (!contentReady) {
          console.log('Print fallback triggered');
          triggerPrint();
        }
      }, 5000);

      // Close window after print
      window.addEventListener('afterprint', () => {
        setTimeout(() => {
          window.close();
        }, 1000);
      });
    </script>
  `;

  // Set document title
  const titleTag = `<title>${filename}</title>`;
  let modifiedContent = htmlContent;

  // Replace or add title
  if (modifiedContent.includes('<title>')) {
    modifiedContent = modifiedContent.replace(/<title>.*?<\/title>/i, titleTag);
  } else {
    modifiedContent = modifiedContent.replace('<head>', `<head>${titleTag}`);
  }

  // Insert enhanced print styles
  modifiedContent = modifiedContent.replace('</head>', `${printStyles}</head>`);

  // Write content to print window
  printWindow.document.write(modifiedContent);
  printWindow.document.close();

  // Fallback: If print window doesn't trigger automatically, show instructions
  setTimeout(() => {
    if (printWindow && !printWindow.closed) {
      // Add instructions for manual PDF saving
      const instructions = printWindow.document.createElement('div');
      instructions.innerHTML = `
        <div style="position: fixed; top: 10px; right: 10px; background: #f0f0f0; padding: 10px; border-radius: 5px; font-family: Arial; font-size: 12px; z-index: 10000; border: 1px solid #ccc;">
          💡 <strong>PDF Export:</strong><br>
          1. Press <kbd>Ctrl+P</kbd> (or <kbd>Cmd+P</kbd> on Mac)<br>
          2. Select "Save as PDF" as destination<br>
          3. Click "Save"
        </div>
      `;
      printWindow.document.body.appendChild(instructions);
    }
  }, 3000);
}

// Save HTML content as a file
export function downloadHTML(htmlContent: string, filename: string): void {
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Get user's generated products
export async function getUserProducts(): Promise<GeneratedProduct[]> {
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return [];
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(product => ({
    id: product.id,
    title: product.title,
    psychologicalType: product.psychological_type,
    designSkin: product.design_skin,
    htmlOutput: product.html_output,
    pdfUrl: product.pdf_url,
    coverImageUrl: product.cover_image_url,
    distributionAssets: product.distribution_assets,
  }));
}

