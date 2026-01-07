// Database Types for Sellable

// Psychological Product Types
export type PsychologicalType = 
  | 'beginner' 
  | 'quick_win' 
  | 'authority' 
  | 'system' 
  | 'transformation' 
  | 'creative';

// Product Formats
export type ProductFormat = 'ebook' | 'template' | 'voice';

// Generation Status
export type GenerationStatus = 'pending' | 'processing' | 'completed' | 'failed';

// Subscription Tiers
export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'enterprise';

// Product Content Structure
export interface ProductContent {
  title?: string;
  subtitle?: string;
  introduction?: string;
  chapters?: Array<{
    number: number;
    title: string;
    content: string;
  }>;
  conclusion?: string;
  cta?: {
    title: string;
    description: string;
    buttonText: string;
  };
  tokensUsed?: number;
}

// Distribution Asset
export interface DistributionAsset {
  platform: string;
  type: string;
  content: string;
  metadata?: Record<string, unknown>;
}

// Distribution Assets Container
export interface DistributionAssets {
  generated_at?: string;
  assets?: DistributionAsset[];
}

// Main Product Interface
export interface Product {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  product_type: ProductFormat | string | null;
  psychological_type: PsychologicalType | string | null;
  design_skin: string | null;
  template_id: string | null;
  content: ProductContent | null;
  html_output: string | null;
  pdf_url: string | null;
  cover_image_url: string | null;
  distribution_assets: DistributionAssets | null;
  pricing_strategy: Record<string, unknown> | null;
  marketing_strategies: Record<string, unknown> | null;
  tokens_used: number | null;
  cost_cents: number | null;
  generation_status: GenerationStatus | null;
  generation_error: string | null;
  generation_metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// User Profile
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  updated_at: string;
}

// Rate Limit Status
export interface RateLimit {
  user_id: string;
  request_count: number;
  window_start: string;
  subscription_tier: SubscriptionTier;
  daily_limit: number;
  monthly_limit: number;
  monthly_count: number;
  month_start: string;
  updated_at: string;
}

// Generation Metrics
export interface GenerationMetric {
  id: string;
  user_id: string;
  product_id: string | null;
  psychological_type: string;
  design_skin: string;
  product_format: string;
  tokens_used: number;
  cost_cents: number;
  duration_ms: number;
  success: boolean;
  error_message: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// Template
export interface Template {
  id: string;
  psychological_type: PsychologicalType;
  design_skin: string;
  product_format: ProductFormat;
  name: string;
  description: string | null;
  html_template: string;
  css_template: string;
  placeholders: string[];
  ai_prompts: Record<string, string>;
  tier: 'tier1' | 'tier2';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Distribution Output Template
export interface DistributionOutput {
  id: string;
  name: string;
  type: 'social_media' | 'marketing' | 'content';
  platform: 'instagram' | 'linkedin' | 'tiktok' | 'facebook' | 'email' | 'blog' | null;
  html_template: string;
  css_template: string;
  ai_prompts: Record<string, string>;
  dimensions: { width: number; height: number } | null;
  is_active: boolean;
  created_at: string;
}

// API Response Types
export interface GenerateProductResponse {
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

export interface RateLimitStatus {
  allowed: boolean;
  remainingDaily: number;
  remainingMonthly: number;
  resetTime: string;
}
