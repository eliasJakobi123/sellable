"use client"

import { useState, useEffect, Suspense, useRef, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { downloadPDFFromHTML } from '@/lib/api-client'

interface Product {
  id: string;
  title: string;
  description: string | null;
  product_type: string | null;
  psychological_type: string | null;
  design_skin: string | null;
  html_output: string | null;
  pdf_url: string | null;
  cover_image_url: string | null;
  audio_url: string | null;
  content: {
    title?: string;
    subtitle?: string;
    introduction?: string;
    chapters?: Array<{ number: number; title: string; content: string }>;
    courseModules?: Array<{
      number: number;
      title: string;
      videos: Array<{
        title: string;
        description: string;
        duration?: string;
      }>;
    }>;
    conclusion?: string;
    cta?: { title: string; description: string; buttonText: string };
    promotionTips?: Array<{ title: string; description: string }>;
    recommendedPrice?: string;
    targetAudience?: string;
    audioDuration?: number;
  } | null;
  tokens_used: number | null;
  cost_cents: number | null;
  generation_status: string | null;
  created_at: string;
}

interface EditorColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

const DEFAULT_COLORS: EditorColors = {
  primaryColor: '#4F46E5',
  secondaryColor: '#818CF8',
  accentColor: '#F59E0B',
  backgroundColor: '#FFFFFF',
  textColor: '#1F2937',
}

const FONT_OPTIONS = [
  { value: 'Inter, sans-serif', label: 'Inter' },
  { value: 'League Spartan, sans-serif', label: 'League Spartan' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Merriweather, serif', label: 'Merriweather' },
  { value: 'Playfair Display, serif', label: 'Playfair Display' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Raleway, sans-serif', label: 'Raleway' },
  { value: 'Nunito, sans-serif', label: 'Nunito' },
  { value: 'Crimson Text, serif', label: 'Crimson Text' },
  { value: 'Lora, serif', label: 'Lora' },
  { value: 'Source Sans Pro, sans-serif', label: 'Source Sans Pro' },
  { value: 'Oswald, sans-serif', label: 'Oswald' },
  { value: 'Bebas Neue, sans-serif', label: 'Bebas Neue' },
  { value: 'Dancing Script, cursive', label: 'Dancing Script' },
  { value: 'Pacifico, cursive', label: 'Pacifico' },
  { value: 'Caveat, cursive', label: 'Caveat' },
  { value: 'Comfortaa, sans-serif', label: 'Comfortaa' },
  { value: 'Quicksand, sans-serif', label: 'Quicksand' },
  { value: 'Rubik, sans-serif', label: 'Rubik' },
  { value: 'Work Sans, sans-serif', label: 'Work Sans' },
  { value: 'Space Grotesk, sans-serif', label: 'Space Grotesk' },
  { value: 'DM Sans, sans-serif', label: 'DM Sans' },
  { value: 'Manrope, sans-serif', label: 'Manrope' },
  { value: 'Sora, sans-serif', label: 'Sora' },
  { value: 'Outfit, sans-serif', label: 'Outfit' },
]

function ProductDetailsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const productId = searchParams.get('id')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialLoadRef = useRef(true)
  
  // Editor state
  const [colors, setColors] = useState<EditorColors>(DEFAULT_COLORS)
  const [headingFont, setHeadingFont] = useState('League Spartan, sans-serif')
  const [bodyFont, setBodyFont] = useState('Inter, sans-serif')
  const [editedTitle, setEditedTitle] = useState('')
  const [editedSubtitle, setEditedSubtitle] = useState('')
  const [editedHTML, setEditedHTML] = useState('')
  const [activeSection, setActiveSection] = useState<'colors' | 'fonts' | 'content'>('colors')
  const [activeMainTab, setActiveMainTab] = useState<'editor' | 'details'>('details')
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (productId && user) {
      loadProduct()
    }
  }, [productId, user])

  const loadProduct = async () => {
    if (!productId || !user) return

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .eq('user_id', user.id)
        .single()

      if (error) throw error
      setProduct(data)
      setEditedTitle(data.title || '')
      setEditedSubtitle(data.content?.subtitle || data.description || '')
      setEditedHTML(data.html_output || '')
      
      // Extract colors from design skin if available
      extractColorsFromHTML(data.html_output)
    } catch (error) {
      console.error('Error loading product:', error)
      router.push('/dashboard/products')
    } finally {
      setLoading(false)
    }
  }

  const extractColorsFromHTML = (html: string | null) => {
    if (!html) return
    
    // Extract from gradient or background
    const gradientMatch = html.match(/linear-gradient\([^,]+,\s*(#[a-fA-F0-9]{6})\s*\d*%?,\s*(#[a-fA-F0-9]{6})/i)
    
    if (gradientMatch) {
      setColors(prev => ({
        ...prev,
        primaryColor: gradientMatch[1],
        secondaryColor: gradientMatch[2],
      }))
    }
  }

  // Memoized HTML generation to prevent flickering
  const generatedHTML = useMemo(() => {
    if (!editedHTML) return ''
    
    let html = editedHTML
    
    // Update gradient colors (primary and secondary) - match various formats
    // Match: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%)
    // Also match with or without spaces, and in @media print blocks
    const coverPageRegex = /linear-gradient\s*\(\s*135deg\s*,\s*#[a-fA-F0-9]{3,6}\s*0%\s*,\s*#[a-fA-F0-9]{3,6}\s*100%\s*\)/gi
    html = html.replace(coverPageRegex, `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`)
    
    // Also update any background property that contains a gradient
    html = html.replace(
      /background:\s*linear-gradient\([^)]+\)/gi,
      `background: linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`
    )
    
    // Replace all background-color declarations with our background color
    // Using a more comprehensive regex that catches color values in various formats
    html = html.replace(
      /(body\s*\{[^}]*?)background-color:\s*[^;}\n]+/gi,
      `$1background-color: ${colors.backgroundColor}`
    )
    
    // Replace body text color
    html = html.replace(
      /(body\s*\{[^}]*?)color:\s*#[a-fA-F0-9]{3,6}(\s*;)?/gi,
      `$1color: ${colors.textColor}$2`
    )
    
    // Replace all heading colors with primary color
    html = html.replace(
      /(h[1-6]\s*,?\s*h[1-6]\s*,?\s*h[1-6]\s*,?\s*h[1-6]\s*,?\s*h[1-6]\s*,?\s*h[1-6]\s*\{[^}]*?)color:\s*#[a-fA-F0-9]{3,6}/gi,
      `$1color: ${colors.primaryColor}`
    )
    
    // Replace primary color in various CSS variables and direct color usages
    html = html.replace(
      /color:\s*#[a-fA-F0-9]{6}(\s*;[^}]*?\/\*\s*primary\s*\*\/)/gi,
      `color: ${colors.primaryColor}$1`
    )
    
    // Update fonts - comprehensive replacement for all heading elements
    // Replace fonts in all heading tags (h1, h2, h3, h4, h5, h6)
    html = html.replace(
      /(h[1-6][^>]*style="[^"]*font-family:\s*)[^;"]+([^"]*")/gi,
      `$1${headingFont}$2`
    )
    
    // Replace fonts in CSS rules for headings
    html = html.replace(
      /(h[1-6]\s*\{[^}]*font-family:\s*)[^;]+/gi,
      `$1${headingFont}`
    )
    
    // Replace fonts in body and paragraph elements - more comprehensive
    html = html.replace(
      /(body[^>]*style="[^"]*font-family:\s*)[^;"]+([^"]*")/gi,
      `$1${bodyFont}$2`
    )
    
    html = html.replace(
      /(p[^>]*style="[^"]*font-family:\s*)[^;"]+([^"]*")/gi,
      `$1${bodyFont}$2`
    )
    
    // Replace fonts in CSS rules for body and paragraphs
    html = html.replace(
      /(body\s*\{[^}]*font-family:\s*)[^;]+/gi,
      `$1${bodyFont}`
    )
    
    html = html.replace(
      /(p\s*\{[^}]*font-family:\s*)[^;]+/gi,
      `$1${bodyFont}`
    )
    
    // Replace any remaining font-family declarations that might be body fonts
    // Match common body font patterns (Inter, sans-serif, etc.)
    html = html.replace(
      /font-family:\s*['"]?Inter['"]?[^;]*/gi,
      `font-family: ${bodyFont}`
    )
    
    html = html.replace(
      /font-family:\s*['"]?sans-serif['"]?/gi,
      `font-family: ${bodyFont}`
    )
    
    // Replace fonts in class-based selectors that are likely body text
    html = html.replace(
      /(\.intro-content|\.conclusion-content|\.chapter-content|\.author-content|\.template-content|\.checklist-text|\.todo-title|\.todo-description|\.worksheet-label|\.form-label)\s*\{[^}]*font-family:\s*[^;]+/gi,
      `$1 { font-family: ${bodyFont}`
    )
    
    // Update title
    if (editedTitle) {
      html = html.replace(
        /<h1[^>]*class="title"[^>]*>[\s\S]*?<\/h1>/i,
        `<h1 class="title">${editedTitle}</h1>`
      )
    }
    
    // Update subtitle
    if (editedSubtitle) {
      html = html.replace(
        /<p[^>]*class="subtitle"[^>]*>[\s\S]*?<\/p>/i,
        `<p class="subtitle">${editedSubtitle}</p>`
      )
    }
    
    // Inject comprehensive color overrides with higher specificity
    // Remove existing editor-color-overrides if present
    html = html.replace(/<style id="editor-color-overrides">[\s\S]*?<\/style>/gi, '')
    
    // Comprehensive color overrides with maximum specificity using !important
    // This approach overrides all template styles reliably
    const colorOverrides = `
      <style id="editor-color-overrides">
        /* Base body styles */
        html body {
          background-color: ${colors.backgroundColor} !important;
          color: ${colors.textColor} !important;
        }
        
        /* All page sections - background */
        html body .intro-page,
        html body .conclusion-page,
        html body .chapter,
        html body .promote-page,
        html body .author-page,
        html body .toc-page,
        html body .template-content,
        html body .template-header,
        html body .template-footer,
        html body .checklist-container,
        html body .todo-container,
        html body .worksheet-container,
        html body .planner-container,
        html body .tracker-container,
        html body .form-container,
        html body .table-container,
        html body .calendar-container,
        html body .notes-container,
        html body .guide-container,
        html body .checklist-section,
        html body .checklist-item,
        html body .todo-item,
        html body .worksheet-section,
        html body .worksheet-field,
        html body .planner-section,
        html body .planner-day,
        html body .tracker-item,
        html body .form-section,
        html body .form-group,
        html body .table-section,
        html body .notes-section,
        html body .guide-section,
        html body .guide-step {
          background-color: ${colors.backgroundColor} !important;
        }
        
        /* All text content - color */
        html body .intro-content,
        html body .conclusion-content,
        html body .chapter-content,
        html body .promote-content,
        html body .author-content,
        html body .template-content,
        html body .intro-content *,
        html body .conclusion-content *,
        html body .chapter-content *,
        html body .author-content *,
        html body .template-content *,
        html body .checklist-text,
        html body .todo-title,
        html body .todo-description,
        html body .todo-content,
        html body .worksheet-label,
        html body .planner-day-header,
        html body .planner-day-number,
        html body .planner-task,
        html body .tracker-title,
        html body .tracker-value,
        html body .form-label,
        html body .table-wrapper td,
        html body .calendar-month,
        html body .calendar-day-number,
        html body .notes-content,
        html body .notes-bullet,
        html body .guide-step-title,
        html body .guide-step-content,
        html body .guide-section-title,
        html body .toc-item,
        html body .toc-item a {
          color: ${colors.textColor} !important;
        }
        
        /* Paragraphs, list items, and spans */
        html body p:not(.cover-page p):not(.cta-content p):not(.subtitle),
        html body li,
        html body span:not(.chapter-number):not(.promote-number):not(.toc-number):not(.guide-step-number) {
          color: ${colors.textColor} !important;
        }
        
        /* Headings (h2, h3, h4) should use primary color */
        html body h2:not(.cover-page h2):not(.title),
        html body h3,
        html body h4,
        html body .chapter-title,
        html body .checklist-section-title,
        html body .worksheet-section-title,
        html body .planner-section-title,
        html body .form-section-title,
        html body .table-section-title,
        html body .notes-section-title,
        html body .guide-section-title,
        html body .guide-step-title {
          color: ${colors.primaryColor} !important;
        }
        
        /* Accent elements - borders */
        html body .chapter-title {
          border-bottom-color: ${colors.accentColor} !important;
        }
        html body .checklist-section-title,
        html body .worksheet-section-title,
        html body .planner-section-title,
        html body .form-section-title,
        html body .table-section-title,
        html body .notes-section-title,
        html body .guide-section-title {
          border-bottom-color: ${colors.accentColor} !important;
        }
        
        /* Primary colored backgrounds */
        html body .chapter-number,
        html body .promote-number,
        html body .guide-step-number,
        html body .table-wrapper th {
          background: ${colors.primaryColor} !important;
          background-color: ${colors.primaryColor} !important;
          color: ${colors.backgroundColor} !important;
        }
        
        /* Input fields and textareas */
        html body .worksheet-input,
        html body .worksheet-textarea,
        html body .form-input,
        html body .form-select,
        html body .form-textarea,
        html body .workbook-field {
          background-color: ${colors.backgroundColor} !important;
          color: ${colors.textColor} !important;
          border-color: ${colors.secondaryColor} !important;
        }
        
        /* Checkboxes and interactive elements */
        html body .checkbox,
        html body .todo-checkbox {
          border-color: ${colors.primaryColor} !important;
          background-color: ${colors.backgroundColor} !important;
        }
        
        html body .checkbox.checked,
        html body .todo-checkbox.checked {
          background-color: ${colors.primaryColor} !important;
        }
        
        /* Progress bars and trackers */
        html body .tracker-progress {
          background-color: ${colors.secondaryColor}30 !important;
        }
        
        html body .tracker-progress-bar {
          background: linear-gradient(90deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%) !important;
        }
        
        html body .tracker-day.completed {
          background-color: ${colors.primaryColor} !important;
          color: ${colors.backgroundColor} !important;
        }
        
        /* Borders - left accent */
        html body .todo-item,
        html body .notes-section,
        html body .guide-step {
          border-left-color: ${colors.primaryColor} !important;
        }
        
        /* CTA button */
        html body .cta-button {
          background: ${colors.accentColor} !important;
          background-color: ${colors.accentColor} !important;
        }
        
        /* Links */
        html body a:not(.toc-item a):not(.cover-page a) {
          color: ${colors.accentColor} !important;
        }
        
        /* Blockquotes */
        html body blockquote {
          border-left-color: ${colors.accentColor} !important;
          background-color: ${colors.secondaryColor}10 !important;
        }
        
        /* Calendar days */
        html body .calendar-day {
          background-color: ${colors.backgroundColor} !important;
          border-color: ${colors.secondaryColor}40 !important;
        }
        
        html body .calendar-day-header {
          background-color: ${colors.primaryColor}10 !important;
          color: ${colors.primaryColor} !important;
        }
        
        html body .calendar-day-event {
          background-color: ${colors.primaryColor}15 !important;
          color: ${colors.primaryColor} !important;
        }
        
        /* Planner grid */
        html body .planner-day {
          background-color: ${colors.backgroundColor} !important;
          border-color: ${colors.secondaryColor}40 !important;
        }
        
        html body .planner-day-header {
          color: ${colors.primaryColor} !important;
        }
        
        /* Form and worksheet sections with subtle background */
        html body .worksheet-section,
        html body .form-section {
          background-color: ${colors.primaryColor}08 !important;
          border-color: ${colors.secondaryColor}30 !important;
        }
        
        /* Table styles */
        html body .table-wrapper {
          background-color: ${colors.backgroundColor} !important;
        }
        
        html body .table-wrapper tr:hover {
          background-color: ${colors.primaryColor}08 !important;
        }
        
        /* Checklist item hover and borders */
        html body .checklist-item {
          border-color: ${colors.secondaryColor}40 !important;
        }
        
        html body .checklist-item:hover {
          border-color: ${colors.primaryColor} !important;
          background-color: ${colors.primaryColor}08 !important;
        }
        
        /* Priority indicators */
        html body .todo-priority.high {
          background-color: #EF4444 !important;
        }
        html body .todo-priority.medium {
          background-color: ${colors.accentColor} !important;
        }
        html body .todo-priority.low {
          background-color: ${colors.secondaryColor} !important;
        }
        
        /* Tracker grid days */
        html body .tracker-day {
          background-color: ${colors.secondaryColor}20 !important;
          color: ${colors.textColor} !important;
        }
        
        /* Notes bullet color */
        html body .notes-bullet::before {
          color: ${colors.primaryColor} !important;
        }
        
        /* Guide step number positioning */
        html body .guide-step-number {
          background: ${colors.primaryColor} !important;
          color: ${colors.backgroundColor} !important;
        }
        
        /* Cover page background - CRITICAL: Override cover gradient */
        html body .cover-page {
          background: linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%) !important;
        }
        
        html body .cover-page::before {
          background: linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%) !important;
        }
        
        /* Font overrides - ensure fonts are applied everywhere */
        html body h1,
        html body h2,
        html body h3,
        html body h4,
        html body h5,
        html body h6,
        html body .title,
        html body .chapter-title,
        html body .checklist-section-title,
        html body .worksheet-section-title,
        html body .planner-section-title,
        html body .form-section-title,
        html body .table-section-title,
        html body .notes-section-title,
        html body .guide-section-title,
        html body .guide-step-title {
          font-family: ${headingFont} !important;
        }
        
        html body,
        html body *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(.title):not(.chapter-title):not(.checklist-section-title):not(.worksheet-section-title):not(.planner-section-title):not(.form-section-title):not(.table-section-title):not(.notes-section-title):not(.guide-section-title):not(.guide-step-title) {
          font-family: ${bodyFont} !important;
        }
        
        html body p,
        html body li,
        html body span:not(.chapter-number):not(.promote-number):not(.toc-number):not(.guide-step-number),
        html body .intro-content,
        html body .conclusion-content,
        html body .chapter-content,
        html body .author-content,
        html body .template-content,
        html body .checklist-text,
        html body .todo-title,
        html body .todo-description,
        html body .todo-content,
        html body .worksheet-label,
        html body .form-label,
        html body .planner-task,
        html body .tracker-title,
        html body .tracker-value,
        html body .table-wrapper td,
        html body .calendar-month,
        html body .calendar-day-number,
        html body .notes-content,
        html body .notes-bullet,
        html body .guide-step-content,
        html body .toc-item,
        html body .toc-item a,
        html body div:not(.cover-page):not(.chapter-number):not(.promote-number):not(.guide-step-number),
        html body section:not(.cover-page) {
          font-family: ${bodyFont} !important;
        }
      </style>
    `
    
    // Add contenteditable styles if editing is enabled
    let additionalStyles = colorOverrides
    if (isEditingContent) {
      additionalStyles += `
        <style id="editor-editing-styles">
          [contenteditable]:hover {
            outline: 2px dashed #3B82F6;
            outline-offset: 2px;
          }
          [contenteditable]:focus {
            outline: 2px solid #3B82F6;
            outline-offset: 2px;
          }
          body * {
            cursor: text;
          }
        </style>
      `
    }
    
    // Also remove any existing editing styles
    html = html.replace(/<style id="editor-editing-styles">[\s\S]*?<\/style>/gi, '')
    
    // Load Google Fonts dynamically for the selected fonts
    const fontNameToGoogleFont: { [key: string]: string } = {
      'Poppins': 'Poppins:wght@300;400;500;600;700;800',
      'Montserrat': 'Montserrat:wght@300;400;500;600;700;800',
      'Raleway': 'Raleway:wght@300;400;500;600;700;800',
      'Nunito': 'Nunito:wght@300;400;500;600;700;800',
      'Crimson Text': 'Crimson+Text:wght@400;600;700',
      'Lora': 'Lora:wght@400;500;600;700',
      'Source Sans Pro': 'Source+Sans+Pro:wght@300;400;600;700',
      'Oswald': 'Oswald:wght@300;400;500;600;700',
      'Bebas Neue': 'Bebas+Neue',
      'Dancing Script': 'Dancing+Script:wght@400;500;600;700',
      'Pacifico': 'Pacifico',
      'Caveat': 'Caveat:wght@400;500;600;700',
      'Comfortaa': 'Comfortaa:wght@300;400;500;600;700',
      'Quicksand': 'Quicksand:wght@300;400;500;600;700',
      'Rubik': 'Rubik:wght@300;400;500;600;700;800',
      'Work Sans': 'Work+Sans:wght@300;400;500;600;700;800',
      'Space Grotesk': 'Space+Grotesk:wght@300;400;500;600;700',
      'DM Sans': 'DM+Sans:wght@300;400;500;600;700',
      'Manrope': 'Manrope:wght@300;400;500;600;700;800',
      'Sora': 'Sora:wght@300;400;500;600;700;800',
      'Outfit': 'Outfit:wght@300;400;500;600;700;800',
    }
    
    // Extract font names from font-family strings
    const extractFontName = (fontFamily: string) => {
      return fontFamily.split(',')[0].trim()
    }
    
    const headingFontName = extractFontName(headingFont)
    const bodyFontName = extractFontName(bodyFont)
    
    // Build Google Fonts URL
    const fontsToLoad: string[] = []
    if (fontNameToGoogleFont[headingFontName]) {
      fontsToLoad.push(fontNameToGoogleFont[headingFontName])
    }
    if (fontNameToGoogleFont[bodyFontName] && bodyFontName !== headingFontName) {
      fontsToLoad.push(fontNameToGoogleFont[bodyFontName])
    }
    
    let googleFontsLink = ''
    if (fontsToLoad.length > 0) {
      googleFontsLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?${fontsToLoad.map(f => `family=${f}`).join('&')}&display=swap" rel="stylesheet">`
    }
    
    // Insert Google Fonts and styles at the end of head for higher specificity
    html = html.replace('</head>', `${googleFontsLink}${additionalStyles}</head>`)
    
    // Also add inline styles to body tag for maximum override power
    html = html.replace(
      /<body([^>]*)>/i, 
      `<body$1 style="background-color: ${colors.backgroundColor} !important; color: ${colors.textColor} !important;">`
    )
    
    return html
  }, [editedHTML, colors, headingFont, bodyFont, editedTitle, editedSubtitle, isEditingContent])

  // Direct real-time color updates - updates immediately when colors change
  // This runs independently of generatedHTML for instant feedback
  useEffect(() => {
    if (!iframeRef.current?.contentDocument || isInitialLoadRef.current) return
    
    const doc = iframeRef.current.contentDocument
    
    // Update body inline styles immediately for instant feedback
    if (doc.body) {
      doc.body.style.setProperty('background-color', colors.backgroundColor, 'important')
      doc.body.style.setProperty('color', colors.textColor, 'important')
    }
    
    // CRITICAL: Update cover page gradient immediately
    const coverPage = doc.querySelector('.cover-page') as HTMLElement
    if (coverPage) {
      coverPage.style.background = `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`
      coverPage.style.setProperty('background', `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`, 'important')
    }
    
    // Also update any ::before pseudo-elements on cover page
    const coverPageBefore = doc.querySelector('.cover-page::before')
    if (coverPageBefore) {
      const style = doc.createElement('style')
      style.textContent = `.cover-page::before { background: linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%) !important; }`
      doc.head.appendChild(style)
    }
    
    // Update or create the color override style with new colors
    let colorOverrideStyle = doc.getElementById('editor-color-overrides') as HTMLStyleElement
    
    if (!colorOverrideStyle) {
      colorOverrideStyle = doc.createElement('style')
      colorOverrideStyle.id = 'editor-color-overrides'
      doc.head.appendChild(colorOverrideStyle)
    }
    
    // Generate the complete color override CSS with current colors
    const colorOverrideCSS = `
      /* Base body styles */
      html body {
        background-color: ${colors.backgroundColor} !important;
        color: ${colors.textColor} !important;
      }
      
      /* Cover page background - CRITICAL */
      html body .cover-page {
        background: linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%) !important;
      }
      
      html body .cover-page::before {
        background: linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%) !important;
      }
      
      /* All page sections - background */
      html body .intro-page,
      html body .conclusion-page,
      html body .chapter,
      html body .promote-page,
      html body .author-page,
      html body .toc-page,
      html body .template-content,
      html body .template-header,
      html body .template-footer,
      html body .checklist-container,
      html body .todo-container,
      html body .worksheet-container,
      html body .planner-container,
      html body .tracker-container,
      html body .form-container,
      html body .table-container,
      html body .calendar-container,
      html body .notes-container,
      html body .guide-container,
      html body .checklist-section,
      html body .checklist-item,
      html body .todo-item,
      html body .worksheet-section,
      html body .worksheet-field,
      html body .planner-section,
      html body .planner-day,
      html body .tracker-item,
      html body .form-section,
      html body .form-group,
      html body .table-section,
      html body .notes-section,
      html body .guide-section,
      html body .guide-step {
        background-color: ${colors.backgroundColor} !important;
      }
      
      /* All text content - color */
      html body .intro-content,
      html body .conclusion-content,
      html body .chapter-content,
      html body .promote-content,
      html body .author-content,
      html body .template-content,
      html body .intro-content *,
      html body .conclusion-content *,
      html body .chapter-content *,
      html body .author-content *,
      html body .template-content *,
      html body .checklist-text,
      html body .todo-title,
      html body .todo-description,
      html body .todo-content,
      html body .worksheet-label,
      html body .planner-day-header,
      html body .planner-day-number,
      html body .planner-task,
      html body .tracker-title,
      html body .tracker-value,
      html body .form-label,
      html body .table-wrapper td,
      html body .calendar-month,
      html body .calendar-day-number,
      html body .notes-content,
      html body .notes-bullet,
      html body .guide-step-title,
      html body .guide-step-content,
      html body .guide-section-title,
      html body .toc-item,
      html body .toc-item a {
        color: ${colors.textColor} !important;
      }
      
      /* Paragraphs, list items, and spans */
      html body p:not(.cover-page p):not(.cta-content p):not(.subtitle),
      html body li,
      html body span:not(.chapter-number):not(.promote-number):not(.toc-number):not(.guide-step-number) {
        color: ${colors.textColor} !important;
      }
      
      /* Headings use primary color */
      html body h2:not(.cover-page h2):not(.title),
      html body h3,
      html body h4,
      html body .chapter-title {
        color: ${colors.primaryColor} !important;
      }
    `
    
    // Update the style content
    colorOverrideStyle.textContent = colorOverrideCSS
    
    // Force a reflow to ensure styles are applied immediately
    if (doc.body) {
      doc.body.offsetHeight
    }
  }, [colors.backgroundColor, colors.textColor, colors.primaryColor, colors.secondaryColor])
  
  // Direct real-time font updates
  useEffect(() => {
    if (!iframeRef.current?.contentDocument || isInitialLoadRef.current) return
    
    const doc = iframeRef.current.contentDocument
    
    // Update or create font override style
    let fontOverrideStyle = doc.getElementById('editor-font-overrides') as HTMLStyleElement
    
    if (!fontOverrideStyle) {
      fontOverrideStyle = doc.createElement('style')
      fontOverrideStyle.id = 'editor-font-overrides'
      doc.head.appendChild(fontOverrideStyle)
    }
    
    const fontOverrideCSS = `
      /* Font overrides - ensure fonts are applied everywhere */
      html body h1,
      html body h2,
      html body h3,
      html body h4,
      html body h5,
      html body h6,
      html body .title,
      html body .chapter-title,
      html body .checklist-section-title,
      html body .worksheet-section-title,
      html body .planner-section-title,
      html body .form-section-title,
      html body .table-section-title,
      html body .notes-section-title,
      html body .guide-section-title,
      html body .guide-step-title {
        font-family: ${headingFont} !important;
      }
      
      html body,
      html body *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not(.title):not(.chapter-title):not(.checklist-section-title):not(.worksheet-section-title):not(.planner-section-title):not(.form-section-title):not(.table-section-title):not(.notes-section-title):not(.guide-section-title):not(.guide-step-title) {
        font-family: ${bodyFont} !important;
      }
      
      html body p,
      html body li,
      html body span:not(.chapter-number):not(.promote-number):not(.toc-number):not(.guide-step-number),
      html body .intro-content,
      html body .conclusion-content,
      html body .chapter-content,
      html body .author-content,
      html body .template-content,
      html body .checklist-text,
      html body .todo-title,
      html body .todo-description,
      html body .todo-content,
      html body .worksheet-label,
      html body .form-label,
      html body .planner-task,
      html body .tracker-title,
      html body .tracker-value,
      html body .table-wrapper td,
      html body .calendar-month,
      html body .calendar-day-number,
      html body .notes-content,
      html body .notes-bullet,
      html body .guide-step-content,
      html body .toc-item,
      html body .toc-item a,
      html body div:not(.cover-page):not(.chapter-number):not(.promote-number):not(.guide-step-number),
      html body section:not(.cover-page) {
        font-family: ${bodyFont} !important;
      }
    `
    
    fontOverrideStyle.textContent = fontOverrideCSS
    
    // Also directly update body element font
    if (doc.body) {
      doc.body.style.setProperty('font-family', bodyFont, 'important')
    }
    
    // Update all paragraph elements directly
    const paragraphs = doc.querySelectorAll('p')
    paragraphs.forEach((p) => {
      if (!p.classList.contains('title') && !p.classList.contains('subtitle')) {
        (p as HTMLElement).style.setProperty('font-family', bodyFont, 'important')
      }
    })
    
    // Update all list items
    const listItems = doc.querySelectorAll('li')
    listItems.forEach((li) => {
      (li as HTMLElement).style.setProperty('font-family', bodyFont, 'important')
    })
    
    // Update all divs that contain text content
    const contentDivs = doc.querySelectorAll('.intro-content, .conclusion-content, .chapter-content, .author-content, .template-content')
    contentDivs.forEach((div) => {
      (div as HTMLElement).style.setProperty('font-family', bodyFont, 'important')
    })
    
    // Force a reflow
    if (doc.body) {
      doc.body.offsetHeight
    }
  }, [headingFont, bodyFont])
  
  // Update iframe content with optimized real-time updates
  useEffect(() => {
    if (!iframeRef.current || !generatedHTML) return
    
    const iframe = iframeRef.current
    
    // Clear any pending update
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }
    
    // For initial load, update immediately
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false
      iframe.srcdoc = generatedHTML
      iframe.onload = () => {
        const doc = iframe.contentDocument
        if (!doc) return
        
        // Update cover page gradient on initial load
        const coverPage = doc.querySelector('.cover-page') as HTMLElement
        if (coverPage) {
          coverPage.style.background = `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`
          coverPage.style.setProperty('background', `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`, 'important')
        }
        
        if (isEditingContent) {
          makeContentEditable(doc)
        }
      }
      return
    }
    
    // For subsequent updates, use minimal debounce
    const debounceTime = 50
    
    updateTimeoutRef.current = setTimeout(() => {
      if (!iframe.contentDocument) return
      
      const doc = iframe.contentDocument
      
      // Find and update the editor-color-overrides style
      let colorOverrideStyle = doc.getElementById('editor-color-overrides') as HTMLStyleElement
      
      if (!colorOverrideStyle) {
        // Create new style element if it doesn't exist
        colorOverrideStyle = doc.createElement('style')
        colorOverrideStyle.id = 'editor-color-overrides'
        doc.head.appendChild(colorOverrideStyle)
      }
      
      // Extract the color overrides from generatedHTML
      const colorOverridesMatch = generatedHTML.match(/<style id="editor-color-overrides">([\s\S]*?)<\/style>/i)
      if (colorOverridesMatch) {
        colorOverrideStyle.textContent = colorOverridesMatch[1]
      }
      
      // Update editing styles if needed
      let editingStyle = doc.getElementById('editor-editing-styles') as HTMLStyleElement
      if (isEditingContent) {
        if (!editingStyle) {
          editingStyle = doc.createElement('style')
          editingStyle.id = 'editor-editing-styles'
          doc.head.appendChild(editingStyle)
        }
        const editingMatch = generatedHTML.match(/<style id="editor-editing-styles">([\s\S]*?)<\/style>/i)
        if (editingMatch) {
          editingStyle.textContent = editingMatch[1]
        }
      } else if (editingStyle) {
        editingStyle.remove()
      }
      
      // Update body inline styles
      if (doc.body) {
        doc.body.style.setProperty('background-color', colors.backgroundColor, 'important')
        doc.body.style.setProperty('color', colors.textColor, 'important')
      }
      
      // CRITICAL: Update cover page gradient
      const coverPage = doc.querySelector('.cover-page') as HTMLElement
      if (coverPage) {
        coverPage.style.background = `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`
        coverPage.style.setProperty('background', `linear-gradient(135deg, ${colors.primaryColor} 0%, ${colors.secondaryColor} 100%)`, 'important')
      }
      
      // Force a reflow to ensure styles are applied
      doc.body.offsetHeight
      
      // Re-apply editing if enabled
      if (isEditingContent) {
        makeContentEditable(doc)
      }
    }, debounceTime)
    
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [generatedHTML, isEditingContent])

  const makeContentEditable = (doc: Document) => {
    // Make text elements editable
    const editableElements = doc.querySelectorAll('h1, h2, h3, h4, p, li, span, blockquote')
    editableElements.forEach((el) => {
      el.setAttribute('contenteditable', 'true')
      el.addEventListener('blur', handleContentChange)
    })
  }

  const handleContentChange = useCallback(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument
      if (doc) {
        // Get the updated HTML from the iframe
        const updatedHTML = doc.documentElement.outerHTML
        setEditedHTML(updatedHTML)
      }
    }
  }, [])

  const handleSave = async () => {
    if (!product || !user) return
    
    setSaving(true)
    try {
      const { error } = await supabase
        .from('products')
        .update({
          title: editedTitle,
          html_output: generatedHTML,
        })
        .eq('id', product.id)
        .eq('user_id', user.id)
      
      if (error) throw error
      
      setProduct(prev => prev ? {
        ...prev,
        title: editedTitle,
        html_output: generatedHTML,
      } : null)
      
    } catch (error) {
      console.error('Error saving product:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = () => {
    if (generatedHTML) {
      downloadPDFFromHTML(generatedHTML, editedTitle || 'product')
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDownloadAudio = () => {
    if (product?.audio_url) {
      const link = document.createElement('a')
      link.href = product.audio_url
      link.download = `${editedTitle || 'audio'}.mp3`
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => router.push('/dashboard/products')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
        {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
          <button
            onClick={() => router.push('/dashboard/products')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors flex-shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
                <span className="hidden sm:inline">Back</span>
          </button>
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-lg sm:text-xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-0 flex-1 min-w-0"
                style={{ fontFamily: 'League Spartan, sans-serif' }}
              />
        </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm sm:text-base"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                )}
                <span className="hidden sm:inline">Save Changes</span>
                <span className="sm:hidden">Save</span>
              </button>
              {/* Conditional buttons based on product type */}
              {product?.product_type === 'voice' ? (
                <>
                  {/* Audio Player */}
                  {product?.audio_url && (
                    <audio 
                      ref={audioRef} 
                      src={product.audio_url} 
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  )}
                  <button
                    onClick={handlePlayPause}
                    disabled={!product?.audio_url}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isPlaying ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                    <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
                    {product?.content?.audioDuration && (
                      <span className="text-gray-300 text-xs sm:text-sm hidden sm:inline">({formatDuration(product.content.audioDuration)})</span>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadAudio}
                    disabled={!product?.audio_url}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 text-sm sm:text-base"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="hidden sm:inline">Download Audio</span>
                    <span className="sm:hidden">Download</span>
                  </button>
                </>
              ) : (
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                title="Opens print dialog - select 'Save as PDF' to download"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Export PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>
              )}
            </div>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 min-h-[600px] lg:h-[calc(100vh-140px)]">
          
          {/* Preview - Left Side (3/4) */}
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col order-2 lg:order-1">
            <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Live Preview</h3>
              <div className="flex items-center gap-2 sm:gap-4">
                {isEditingContent && (
                  <span className="text-xs sm:text-sm text-blue-600 font-medium flex items-center gap-1 sm:gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <span className="hidden sm:inline">Click text to edit</span>
                    <span className="sm:hidden">Edit</span>
                  </span>
                )}
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="hidden sm:inline">Auto-updating</span>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-2 sm:p-4 bg-gray-100" ref={previewRef}>
              {product?.product_type === 'voice' ? (
                /* Audio Player Preview for Voice Content */
                <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto p-4 sm:p-8">
                  <div className="text-center">
                    {/* Audio Visualization */}
                    <div className="mb-8">
                      <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      {editedTitle || product?.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{editedSubtitle || product?.description}</p>
                    
                    {/* Audio Controls */}
                    {product?.audio_url ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
          <button
                            onClick={handlePlayPause}
                            className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                          >
                            {isPlaying ? (
                              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                              </svg>
                            ) : (
                              <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            )}
          </button>
        </div>

                        {product?.content?.audioDuration && (
                          <p className="text-sm text-gray-500">
                            Duration: {formatDuration(product.content.audioDuration)}
                          </p>
                        )}
                        
                      <button
                          onClick={handleDownloadAudio}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                          Download MP3
                      </button>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <p>Audio generation in progress...</p>
                        <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mt-4"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Script Preview */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Script Preview</h3>
                    <div className="prose prose-sm max-w-none text-gray-600">
                      <p><strong>Introduction:</strong> {product?.content?.introduction?.replace(/<[^>]*>/g, '').substring(0, 300)}...</p>
                      {product?.content?.chapters?.slice(0, 2).map((chapter, i) => (
                        <p key={i}><strong>Chapter {chapter.number}:</strong> {chapter.title}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : product?.product_type === 'course' ? (
                /* Course Structure Preview */
                <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto p-4 sm:p-8">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'League Spartan, sans-serif' }}>
                      {editedTitle || product?.title}
                    </h2>
                    <p className="text-lg text-gray-600">{editedSubtitle || product?.description}</p>
                  </div>

                  {/* Introduction */}
                  {product?.content?.introduction && (
                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Overview</h3>
                      <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: product.content.introduction }} />
                    </div>
                  )}

                  {/* Course Modules */}
                  {product?.content?.courseModules && product.content.courseModules.length > 0 ? (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Course Structure</h3>
                      {product.content.courseModules.map((module, moduleIndex) => (
                        <div key={moduleIndex} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                              {module.number}
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900 flex-1">{module.title}</h4>
                          </div>
                          
                          {module.videos && module.videos.length > 0 && (
                            <div className="ml-11 space-y-3">
                              {module.videos.map((video, videoIndex) => (
                                <div key={videoIndex} className="bg-white rounded-lg p-4 border border-gray-200">
                                  <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2 mb-1">
                                        <h5 className="font-medium text-gray-900">{video.title}</h5>
                                        {video.duration && (
                                          <span className="text-xs text-gray-500 whitespace-nowrap">{video.duration}</span>
                                        )}
                                      </div>
                                      <p className="text-sm text-gray-600">{video.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                        </div>
                      )}
                    </div>
                      ))}
                  </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p>Course structure will be generated...</p>
                    </div>
                  )}
                </div>
              ) : (
                /* Standard HTML Preview for Ebook/Template */
                <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
                  <iframe
                    ref={iframeRef}
                    className="w-full min-h-[400px] sm:min-h-[600px] lg:min-h-[800px] border-0"
                    title="Product Preview"
                    sandbox="allow-same-origin"
                  />
                  </div>
                )}
              </div>
            </div>

          {/* Editor Panel - Right Side (1/4) */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col order-1 lg:order-2">
            {/* Main Tabs: Details / Editor */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveMainTab('details')}
                className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors ${
                  activeMainTab === 'details' 
                    ? 'text-black bg-white border-b-2 border-black' 
                    : 'text-gray-500 bg-gray-50 hover:text-gray-700'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveMainTab('editor')}
                className={`flex-1 py-3 sm:py-4 text-xs sm:text-sm font-semibold transition-colors ${
                  activeMainTab === 'editor' 
                    ? 'text-black bg-white border-b-2 border-black' 
                    : 'text-gray-500 bg-gray-50 hover:text-gray-700'
                }`}
              >
                Editor
              </button>
                    </div>

            {/* Editor Sub-Tabs (only shown when Editor is active) */}
            {activeMainTab === 'editor' && (
              <div className="flex border-b border-gray-200 overflow-x-auto">
          <button
                  onClick={() => setActiveSection('colors')}
                  className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === 'colors' 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Colors
          </button>
          <button
                  onClick={() => setActiveSection('fonts')}
                  className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === 'fonts' 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Fonts
          </button>
          <button
                  onClick={() => setActiveSection('content')}
                  className={`flex-1 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeSection === 'content' 
                      ? 'text-black border-b-2 border-black' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Content
          </button>
                  </div>
                    )}
                    
            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              {activeMainTab === 'editor' && activeSection === 'colors' && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={colors.primaryColor}
                        onChange={(e) => setColors({ ...colors, primaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.primaryColor}
                        onChange={(e) => setColors({ ...colors, primaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                  </div>
            </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={colors.secondaryColor}
                        onChange={(e) => setColors({ ...colors, secondaryColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.secondaryColor}
                        onChange={(e) => setColors({ ...colors, secondaryColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={colors.accentColor}
                        onChange={(e) => setColors({ ...colors, accentColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.accentColor}
                        onChange={(e) => setColors({ ...colors, accentColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={colors.backgroundColor}
                        onChange={(e) => setColors({ ...colors, backgroundColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.backgroundColor}
                        onChange={(e) => setColors({ ...colors, backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                </div>
              </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={colors.textColor}
                        onChange={(e) => {
                          // Only update textColor, do NOT change primaryColor
                          setColors({ ...colors, textColor: e.target.value })
                        }}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={colors.textColor}
                        onChange={(e) => {
                          // Only update textColor, do NOT change primaryColor
                          setColors({ ...colors, textColor: e.target.value })
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      </div>
                  </div>

                  {/* Color Presets */}
                  <div className="pt-4 border-t border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          const newColors = {
                            primaryColor: '#4F46E5',
                            secondaryColor: '#818CF8',
                            accentColor: '#F59E0B',
                            backgroundColor: '#FFFFFF',
                            textColor: '#1F2937',
                          }
                          setColors(newColors)
                          // Force update by triggering a re-render
                          setTimeout(() => {
                            if (iframeRef.current?.contentDocument) {
                              const doc = iframeRef.current.contentDocument
                              // Update cover page gradient directly
                              const coverPage = doc.querySelector('.cover-page') as HTMLElement
                              if (coverPage) {
                                coverPage.style.background = `linear-gradient(135deg, ${newColors.primaryColor} 0%, ${newColors.secondaryColor} 100%)`
                              }
                            }
                          }, 100)
                        }}
                        className="h-10 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500 hover:opacity-90 transition-opacity"
                        title="Indigo"
                      />
                      <button
                        onClick={() => {
                          const newColors = {
                            primaryColor: '#059669',
                            secondaryColor: '#34D399',
                            accentColor: '#3B82F6',
                            backgroundColor: '#FFFFFF',
                            textColor: '#1F2937',
                          }
                          setColors(newColors)
                          setTimeout(() => {
                            if (iframeRef.current?.contentDocument) {
                              const doc = iframeRef.current.contentDocument
                              const coverPage = doc.querySelector('.cover-page') as HTMLElement
                              if (coverPage) {
                                coverPage.style.background = `linear-gradient(135deg, ${newColors.primaryColor} 0%, ${newColors.secondaryColor} 100%)`
                              }
                            }
                          }, 100)
                        }}
                        className="h-10 rounded-lg bg-gradient-to-r from-emerald-600 to-green-400 hover:opacity-90 transition-opacity"
                        title="Emerald"
                      />
                      <button
                        onClick={() => {
                          const newColors = {
                            primaryColor: '#DC2626',
                            secondaryColor: '#F87171',
                            accentColor: '#FACC15',
                            backgroundColor: '#0F0F0F',
                            textColor: '#FAFAFA',
                          }
                          setColors(newColors)
                          setTimeout(() => {
                            if (iframeRef.current?.contentDocument) {
                              const doc = iframeRef.current.contentDocument
                              const coverPage = doc.querySelector('.cover-page') as HTMLElement
                              if (coverPage) {
                                coverPage.style.background = `linear-gradient(135deg, ${newColors.primaryColor} 0%, ${newColors.secondaryColor} 100%)`
                              }
                            }
                          }, 100)
                        }}
                        className="h-10 rounded-lg bg-gradient-to-r from-red-600 to-red-400 hover:opacity-90 transition-opacity"
                        title="Bold Red"
                      />
                      <button
                        onClick={() => {
                          const newColors = {
                            primaryColor: '#0F172A',
                            secondaryColor: '#334155',
                            accentColor: '#EAB308',
                            backgroundColor: '#F8FAFC',
                            textColor: '#0F172A',
                          }
                          setColors(newColors)
                          setTimeout(() => {
                            if (iframeRef.current?.contentDocument) {
                              const doc = iframeRef.current.contentDocument
                              const coverPage = doc.querySelector('.cover-page') as HTMLElement
                              if (coverPage) {
                                coverPage.style.background = `linear-gradient(135deg, ${newColors.primaryColor} 0%, ${newColors.secondaryColor} 100%)`
                              }
                            }
                          }, 100)
                        }}
                        className="h-10 rounded-lg bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 transition-opacity"
                        title="Professional"
                      />
                      <button
                        onClick={() => {
                          const newColors = {
                            primaryColor: '#7C3AED',
                            secondaryColor: '#A78BFA',
                            accentColor: '#F59E0B',
                            backgroundColor: '#FAF5FF',
                            textColor: '#581C87',
                          }
                          setColors(newColors)
                          setTimeout(() => {
                            if (iframeRef.current?.contentDocument) {
                              const doc = iframeRef.current.contentDocument
                              const coverPage = doc.querySelector('.cover-page') as HTMLElement
                              if (coverPage) {
                                coverPage.style.background = `linear-gradient(135deg, ${newColors.primaryColor} 0%, ${newColors.secondaryColor} 100%)`
                              }
                            }
                          }, 100)
                        }}
                        className="h-10 rounded-lg bg-gradient-to-r from-violet-600 to-purple-400 hover:opacity-90 transition-opacity"
                        title="Purple"
                      />
                      <button
                        onClick={() => {
                          const newColors = {
                            primaryColor: '#0EA5E9',
                            secondaryColor: '#7DD3FC',
                            accentColor: '#F472B6',
                            backgroundColor: '#F0F9FF',
                            textColor: '#0C4A6E',
                          }
                          setColors(newColors)
                          setTimeout(() => {
                            if (iframeRef.current?.contentDocument) {
                              const doc = iframeRef.current.contentDocument
                              const coverPage = doc.querySelector('.cover-page') as HTMLElement
                              if (coverPage) {
                                coverPage.style.background = `linear-gradient(135deg, ${newColors.primaryColor} 0%, ${newColors.secondaryColor} 100%)`
                              }
                            }
                          }, 100)
                        }}
                        className="h-10 rounded-lg bg-gradient-to-r from-sky-500 to-blue-400 hover:opacity-90 transition-opacity"
                        title="Sky Blue"
                      />
                </div>
            </div>
          </div>
        )}

              {activeMainTab === 'editor' && activeSection === 'fonts' && (
                <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Heading Font</label>
                    <select
                      value={headingFont}
                      onChange={(e) => setHeadingFont(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {FONT_OPTIONS.map(font => (
                        <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: headingFont }}>
                      Preview: The quick brown fox
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Body Font</label>
                    <select
                      value={bodyFont}
                      onChange={(e) => setBodyFont(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      {FONT_OPTIONS.map(font => (
                        <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: bodyFont }}>
                      Preview: The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                </div>
              )}

              {activeMainTab === 'editor' && activeSection === 'content' && (
                  <div className="space-y-6">
                  {/* Edit Content Toggle */}
                  <div className="bg-gray-50 rounded-xl p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">Edit Content in Preview</h4>
                        <p className="text-xs text-gray-500">Click any text in the preview to edit it directly</p>
                        </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={isEditingContent}
                          onChange={() => setIsEditingContent(!isEditingContent)}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-black"></div>
                      </label>
                      </div>
                    
                    {isEditingContent && (
                      <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 rounded-lg p-3 mt-4">
                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Editing mode active. Click on any text in the preview to edit it.</span>
                </div>
              )}
                  </div>

                  {/* Quick Edit Fields */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Quick Edit</h4>
                    
                    <div className="space-y-4">
                <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={editedTitle}
                          onChange={(e) => setEditedTitle(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                        <textarea
                          value={editedSubtitle}
                          onChange={(e) => setEditedSubtitle(e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                        />
                </div>
                </div>
            </div>
          </div>
        )}

              {activeMainTab === 'details' && (
                <div className="space-y-6">
                  {/* Product Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      Product Information
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900 font-medium">{editedTitle || product?.title || 'Untitled Product'}</p>
                  </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Recommended Price</label>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-gray-900 font-medium">
                            {product?.content?.recommendedPrice || (() => {
                              const chapterCount = product?.content?.chapters?.length || 0;
                              if (chapterCount <= 4) return '$19 - $29';
                              if (chapterCount <= 6) return '$29 - $39';
                              return '$39 - $49';
                            })()}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">Based on content length and value</p>
                  </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience</label>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-gray-900 text-sm leading-relaxed">
                            {product?.content?.targetAudience || (() => {
                              const type = product?.psychological_type;
                              if (type === 'transformation') return 'People seeking personal growth and life transformation. Individuals ready to make significant changes in their personal or professional lives.';
                              if (type === 'beginner') return 'Complete newcomers looking to learn the fundamentals. People starting from scratch who need clear, step-by-step guidance.';
                              if (type === 'quick_win') return 'Action-oriented individuals seeking fast, immediate results. People who want practical solutions they can implement right away.';
                              if (type === 'authority') return 'Knowledge seekers looking to learn from experts. Professionals and enthusiasts who value deep insights and expertise.';
                              if (type === 'system') return 'Methodical learners who want a complete, repeatable framework. People who prefer structured approaches and step-by-step systems.';
                              if (type === 'creative') return 'Innovative thinkers and creative professionals. People looking to spark new ideas and explore creative expression.';
                              return 'General audience interested in self-improvement and achieving their goals.';
                            })()}
                          </p>
                  </div>
                  </div>
                    </div>
                  </div>

                  {/* Ways to Promote */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                      Ways to Promote
                    </h4>
                    
                    <div className="space-y-4">
                      {product?.content?.promotionTips && product.content.promotionTips.length > 0 ? (
                        product.content.promotionTips.map((tip, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                {index + 1}
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">{tip.title}</h5>
                                <p className="text-sm text-gray-600">{tip.description}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Social Media Launch</h5>
                                <p className="text-sm text-gray-600">Create a series of teaser posts leading up to your launch. Share snippets, behind-the-scenes content, and testimonials to build anticipation.</p>
                              </div>
              </div>
            </div>

                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Email Marketing Campaign</h5>
                                <p className="text-sm text-gray-600">Build an email list and send a launch sequence with valuable free content, followed by your product offer with a limited-time discount.</p>
                  </div>
                </div>
                  </div>
                          
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Influencer Partnerships</h5>
                                <p className="text-sm text-gray-600">Reach out to micro-influencers in your niche. Offer them a free copy in exchange for an honest review or shoutout to their audience.</p>
                </div>
                  </div>
                </div>
                          
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Content Marketing</h5>
                                <p className="text-sm text-gray-600">Write blog posts or create videos that address problems your product solves. Include your product as the recommended solution.</p>
                  </div>
                </div>
              </div>
                          
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">5</div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Community Engagement</h5>
                                <p className="text-sm text-gray-600">Join relevant Facebook groups, Reddit communities, and forums. Provide genuine value and mention your product when relevant to discussions.</p>
            </div>
          </div>
                          </div>
                        </>
                      )}
                </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ProductDetailsContent />
    </Suspense>
  )
}
