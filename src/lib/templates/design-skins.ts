// Design Skins Configuration
// Maps psychological types to available design skins

export type PsychologicalType = 
  | 'beginner' 
  | 'quick_win' 
  | 'authority' 
  | 'system' 
  | 'transformation' 
  | 'creative';

export type ProductFormat = 'ebook' | 'template' | 'voice';

export type DesignSkin = 
  // Beginner Skins
  | 'guide_skin'
  | 'simple_skin'
  | 'start_skin'
  | 'intro_skin'
  | 'basics_skin'
  | 'newbie_skin'
  // Quick Win Skins
  | 'fast_skin'
  | 'win_skin'
  | 'hack_skin'
  | 'boost_skin'
  | 'sprint_skin'
  | 'results_skin'
  // Authority Skins
  | 'expert_skin'
  | 'authority_skin'
  | 'master_skin'
  | 'trust_skin'
  | 'professional_skin'
  | 'executive_skin'
  | 'consultant_skin'
  // System Skins
  | 'blueprint_skin'
  | 'framework_skin'
  | 'method_skin'
  | 'protocol_skin'
  | 'playbook_skin'
  | 'roadmap_skin'
  | 'system_skin'
  // Transformation Skins
  | 'journey_skin'
  | 'breakthrough_skin'
  | 'evolution_skin'
  | 'rebirth_skin'
  | 'growth_skin'
  | 'change_skin'
  | 'progress_skin'
  // Creative Skins
  | 'inspire_skin'
  | 'innovate_skin'
  | 'express_skin'
  | 'dream_skin'
  | 'create_skin'
  | 'vision_skin'
  | 'art_skin';

// Mapping of psychological types to available design skins
export const SKIN_MAPPING: Record<PsychologicalType, DesignSkin[]> = {
  beginner: ['guide_skin', 'simple_skin', 'start_skin', 'intro_skin', 'basics_skin', 'newbie_skin'],
  quick_win: ['fast_skin', 'win_skin', 'hack_skin', 'boost_skin', 'sprint_skin', 'results_skin'],
  authority: ['expert_skin', 'authority_skin', 'master_skin', 'trust_skin', 'professional_skin', 'executive_skin', 'consultant_skin'],
  system: ['blueprint_skin', 'framework_skin', 'method_skin', 'protocol_skin', 'playbook_skin', 'roadmap_skin', 'system_skin'],
  transformation: ['journey_skin', 'breakthrough_skin', 'evolution_skin', 'rebirth_skin', 'growth_skin', 'change_skin', 'progress_skin'],
  creative: ['inspire_skin', 'innovate_skin', 'express_skin', 'dream_skin', 'create_skin', 'vision_skin', 'art_skin']
};

// Tier 1 Skins - Available to all users (12 skins, 2 per psychological type)
export const TIER1_SKINS: DesignSkin[] = [
  'guide_skin',      // beginner
  'simple_skin',     // beginner
  'fast_skin',       // quick_win
  'win_skin',        // quick_win
  'expert_skin',     // authority
  'authority_skin',  // authority
  'blueprint_skin',  // system
  'framework_skin',  // system
  'journey_skin',    // transformation
  'breakthrough_skin', // transformation
  'inspire_skin',    // creative
  'innovate_skin'    // creative
];

// Tier 2 Skins - Available to Pro users (remaining skins)
export const TIER2_SKINS: DesignSkin[] = [
  // Beginner
  'start_skin', 'intro_skin', 'basics_skin', 'newbie_skin',
  // Quick Win
  'hack_skin', 'boost_skin', 'sprint_skin', 'results_skin',
  // Authority
  'master_skin', 'trust_skin', 'professional_skin', 'executive_skin', 'consultant_skin',
  // System
  'method_skin', 'protocol_skin', 'playbook_skin', 'roadmap_skin', 'system_skin',
  // Transformation
  'evolution_skin', 'rebirth_skin', 'growth_skin', 'change_skin', 'progress_skin',
  // Creative
  'express_skin', 'dream_skin', 'create_skin', 'vision_skin', 'art_skin'
];

// Skin metadata with colors and styles
export interface SkinMetadata {
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  headingFont: string;
  style: 'modern' | 'classic' | 'bold' | 'minimal' | 'elegant' | 'playful' | 'professional';
}

export const SKIN_METADATA: Record<DesignSkin, SkinMetadata> = {
  // Beginner Skins
  guide_skin: {
    name: 'Friendly Guide',
    description: 'Warm and welcoming design for beginners',
    primaryColor: '#4F46E5',
    secondaryColor: '#818CF8',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
    textColor: '#1F2937',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  simple_skin: {
    name: 'Clean Start',
    description: 'Minimalist and easy to follow',
    primaryColor: '#059669',
    secondaryColor: '#10B981',
    accentColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'minimal'
  },
  start_skin: {
    name: 'Fresh Beginning',
    description: 'Bright and encouraging for first steps',
    primaryColor: '#0891B2',
    secondaryColor: '#06B6D4',
    accentColor: '#F472B6',
    backgroundColor: '#ECFEFF',
    textColor: '#0F172A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'playful'
  },
  intro_skin: {
    name: 'Introduction',
    description: 'Clear and structured introduction style',
    primaryColor: '#6366F1',
    secondaryColor: '#A5B4FC',
    accentColor: '#FBBF24',
    backgroundColor: '#F8FAFC',
    textColor: '#1E293B',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'classic'
  },
  basics_skin: {
    name: 'Fundamentals',
    description: 'Solid foundation design',
    primaryColor: '#8B5CF6',
    secondaryColor: '#C4B5FD',
    accentColor: '#22C55E',
    backgroundColor: '#FAFAFA',
    textColor: '#171717',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  newbie_skin: {
    name: 'First Timer',
    description: 'Friendly and non-intimidating',
    primaryColor: '#EC4899',
    secondaryColor: '#F9A8D4',
    accentColor: '#14B8A6',
    backgroundColor: '#FFF1F2',
    textColor: '#0F172A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'playful'
  },

  // Quick Win Skins
  fast_skin: {
    name: 'Speed Results',
    description: 'Dynamic and action-oriented',
    primaryColor: '#EF4444',
    secondaryColor: '#FCA5A5',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFBEB',
    textColor: '#0F172A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },
  win_skin: {
    name: 'Victory',
    description: 'Triumphant and motivating',
    primaryColor: '#F59E0B',
    secondaryColor: '#FCD34D',
    accentColor: '#10B981',
    backgroundColor: '#0F172A',
    textColor: '#F8FAFC',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },
  hack_skin: {
    name: 'Life Hacks',
    description: 'Tech-inspired efficiency',
    primaryColor: '#22C55E',
    secondaryColor: '#86EFAC',
    accentColor: '#8B5CF6',
    backgroundColor: '#0A0A0A',
    textColor: '#E5E5E5',
    fontFamily: 'JetBrains Mono, monospace',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  boost_skin: {
    name: 'Power Boost',
    description: 'Energetic and powerful',
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    accentColor: '#F97316',
    backgroundColor: '#1E1B4B',
    textColor: '#F1F5F9',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },
  sprint_skin: {
    name: 'Quick Sprint',
    description: 'Fast-paced and efficient',
    primaryColor: '#0891B2',
    secondaryColor: '#06B6D4',
    accentColor: '#FB923C',
    backgroundColor: '#FFFFFF',
    textColor: '#0F172A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  results_skin: {
    name: 'Instant Results',
    description: 'Results-focused design',
    primaryColor: '#DC2626',
    secondaryColor: '#F87171',
    accentColor: '#0891B2',
    backgroundColor: '#FEF2F2',
    textColor: '#1F2937',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },

  // Authority Skins
  expert_skin: {
    name: 'Expert Authority',
    description: 'Professional and credible',
    primaryColor: '#1E3A5F',
    secondaryColor: '#3B82F6',
    accentColor: '#D4AF37',
    backgroundColor: '#FFFFFF',
    textColor: '#1E293B',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'professional'
  },
  authority_skin: {
    name: 'Thought Leader',
    description: 'Commanding and trustworthy',
    primaryColor: '#0F172A',
    secondaryColor: '#334155',
    accentColor: '#EAB308',
    backgroundColor: '#F8FAFC',
    textColor: '#0F172A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  },
  master_skin: {
    name: 'Master Class',
    description: 'Premium and exclusive',
    primaryColor: '#9A3412',
    secondaryColor: '#7C2D12',
    accentColor: '#FDE047',
    backgroundColor: '#1C1917',
    textColor: '#FAFAF9',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  },
  trust_skin: {
    name: 'Trusted Advisor',
    description: 'Reliable and confident',
    primaryColor: '#065F46',
    secondaryColor: '#059669',
    accentColor: '#0EA5E9',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'professional'
  },
  professional_skin: {
    name: 'Corporate Pro',
    description: 'Business-grade professional',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6',
    accentColor: '#F59E0B',
    backgroundColor: '#EFF6FF',
    textColor: '#1E3A8A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'professional'
  },
  executive_skin: {
    name: 'Executive Suite',
    description: 'High-end executive style',
    primaryColor: '#18181B',
    secondaryColor: '#3F3F46',
    accentColor: '#A16207',
    backgroundColor: '#FAFAFA',
    textColor: '#18181B',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  },
  consultant_skin: {
    name: 'Strategic Consultant',
    description: 'Strategic and analytical',
    primaryColor: '#4338CA',
    secondaryColor: '#6366F1',
    accentColor: '#10B981',
    backgroundColor: '#F5F3FF',
    textColor: '#312E81',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'professional'
  },

  // System Skins
  blueprint_skin: {
    name: 'The Blueprint',
    description: 'Technical and systematic',
    primaryColor: '#1D4ED8',
    secondaryColor: '#60A5FA',
    accentColor: '#F97316',
    backgroundColor: '#EFF6FF',
    textColor: '#1E3A8A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  framework_skin: {
    name: 'Framework',
    description: 'Structured and organized',
    primaryColor: '#059669',
    secondaryColor: '#34D399',
    accentColor: '#8B5CF6',
    backgroundColor: '#ECFDF5',
    textColor: '#064E3B',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  method_skin: {
    name: 'The Method',
    description: 'Step-by-step methodology',
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    accentColor: '#14B8A6',
    backgroundColor: '#F5F3FF',
    textColor: '#4C1D95',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'classic'
  },
  protocol_skin: {
    name: 'Protocol',
    description: 'Clinical and precise',
    primaryColor: '#0891B2',
    secondaryColor: '#22D3EE',
    accentColor: '#EF4444',
    backgroundColor: '#FFFFFF',
    textColor: '#164E63',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'minimal'
  },
  playbook_skin: {
    name: 'Playbook',
    description: 'Strategic game plan',
    primaryColor: '#B91C1C',
    secondaryColor: '#EF4444',
    accentColor: '#22C55E',
    backgroundColor: '#FEF2F2',
    textColor: '#7F1D1D',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },
  roadmap_skin: {
    name: 'Roadmap',
    description: 'Journey-oriented planning',
    primaryColor: '#0D9488',
    secondaryColor: '#2DD4BF',
    accentColor: '#F59E0B',
    backgroundColor: '#F0FDFA',
    textColor: '#134E4A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  system_skin: {
    name: 'The System',
    description: 'Complete systematic approach',
    primaryColor: '#1F2937',
    secondaryColor: '#4B5563',
    accentColor: '#3B82F6',
    backgroundColor: '#F9FAFB',
    textColor: '#111827',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'professional'
  },

  // Transformation Skins
  journey_skin: {
    name: 'The Journey',
    description: 'Personal transformation story',
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    accentColor: '#F59E0B',
    backgroundColor: '#FAF5FF',
    textColor: '#581C87',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  },
  breakthrough_skin: {
    name: 'Breakthrough',
    description: 'Powerful change catalyst',
    primaryColor: '#DC2626',
    secondaryColor: '#F87171',
    accentColor: '#FACC15',
    backgroundColor: '#0F0F0F',
    textColor: '#FAFAFA',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },
  evolution_skin: {
    name: 'Evolution',
    description: 'Gradual growth and change',
    primaryColor: '#16A34A',
    secondaryColor: '#4ADE80',
    accentColor: '#06B6D4',
    backgroundColor: '#F0FDF4',
    textColor: '#14532D',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  rebirth_skin: {
    name: 'Rebirth',
    description: 'Complete renewal',
    primaryColor: '#DB2777',
    secondaryColor: '#F472B6',
    accentColor: '#8B5CF6',
    backgroundColor: '#FDF2F8',
    textColor: '#831843',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  },
  growth_skin: {
    name: 'Growth Mindset',
    description: 'Continuous improvement',
    primaryColor: '#0D9488',
    secondaryColor: '#2DD4BF',
    accentColor: '#F97316',
    backgroundColor: '#FFFFFF',
    textColor: '#134E4A',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  change_skin: {
    name: 'Change Catalyst',
    description: 'Dynamic transformation',
    primaryColor: '#EA580C',
    secondaryColor: '#FB923C',
    accentColor: '#6366F1',
    backgroundColor: '#FFF7ED',
    textColor: '#7C2D12',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'bold'
  },
  progress_skin: {
    name: 'Progress Path',
    description: 'Step-by-step advancement',
    primaryColor: '#2563EB',
    secondaryColor: '#60A5FA',
    accentColor: '#22C55E',
    backgroundColor: '#EFF6FF',
    textColor: '#1E40AF',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },

  // Creative Skins
  inspire_skin: {
    name: 'Inspiration',
    description: 'Creative and uplifting',
    primaryColor: '#EC4899',
    secondaryColor: '#F9A8D4',
    accentColor: '#FACC15',
    backgroundColor: '#FFFBEB',
    textColor: '#831843',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'playful'
  },
  innovate_skin: {
    name: 'Innovation',
    description: 'Cutting-edge creativity',
    primaryColor: '#6366F1',
    secondaryColor: '#818CF8',
    accentColor: '#22D3EE',
    backgroundColor: '#0F0F23',
    textColor: '#E0E7FF',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  express_skin: {
    name: 'Self Expression',
    description: 'Bold and artistic',
    primaryColor: '#F43F5E',
    secondaryColor: '#FB7185',
    accentColor: '#14B8A6',
    backgroundColor: '#FFF1F2',
    textColor: '#881337',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'playful'
  },
  dream_skin: {
    name: 'Dream Builder',
    description: 'Aspirational and visionary',
    primaryColor: '#8B5CF6',
    secondaryColor: '#C4B5FD',
    accentColor: '#F59E0B',
    backgroundColor: '#1E1B4B',
    textColor: '#E0E7FF',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  },
  create_skin: {
    name: 'Creator',
    description: 'For makers and builders',
    primaryColor: '#0284C7',
    secondaryColor: '#0EA5E9',
    accentColor: '#F472B6',
    backgroundColor: '#F0F9FF',
    textColor: '#0C4A6E',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  vision_skin: {
    name: 'Visionary',
    description: 'Forward-thinking design',
    primaryColor: '#7C3AED',
    secondaryColor: '#A78BFA',
    accentColor: '#10B981',
    backgroundColor: '#0D0D0D',
    textColor: '#F5F5F5',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'modern'
  },
  art_skin: {
    name: 'Artistic',
    description: 'Gallery-inspired creativity',
    primaryColor: '#BE185D',
    secondaryColor: '#EC4899',
    accentColor: '#F59E0B',
    backgroundColor: '#FAFAFA',
    textColor: '#1F1F1F',
    fontFamily: 'Inter, sans-serif',
    headingFont: 'League Spartan, sans-serif',
    style: 'elegant'
  }
};

// Helper function to get a random skin for a psychological type
export function getRandomSkin(
  psychologicalType: PsychologicalType, 
  tier: 'tier1' | 'tier2' | 'all' = 'tier1'
): DesignSkin {
  const availableSkins = SKIN_MAPPING[psychologicalType];
  
  let validSkins: DesignSkin[];
  if (tier === 'tier1') {
    validSkins = availableSkins.filter(skin => TIER1_SKINS.includes(skin));
  } else if (tier === 'tier2') {
    validSkins = availableSkins.filter(skin => TIER2_SKINS.includes(skin));
  } else {
    validSkins = availableSkins;
  }
  
  if (validSkins.length === 0) {
    validSkins = availableSkins;
  }
  
  return validSkins[Math.floor(Math.random() * validSkins.length)];
}

// Helper function to get skin metadata
export function getSkinMetadata(skin: DesignSkin): SkinMetadata {
  return SKIN_METADATA[skin];
}

// Get primary skin for a psychological type (first in the list)
export function getPrimarySkin(psychologicalType: PsychologicalType): DesignSkin {
  return SKIN_MAPPING[psychologicalType][0];
}

// Color analysis utilities
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function calculateLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function calculateContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 1;

  const lum1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastRating(ratio: number): 'Fail' | 'AA Large' | 'AA' | 'AAA' {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

// Analyze color accessibility for a skin
export function analyzeSkinColors(skin: DesignSkin): {
  skin: DesignSkin;
  textOnBackground: { ratio: number; rating: string };
  primaryOnBackground: { ratio: number; rating: string };
  secondaryOnBackground: { ratio: number; rating: string };
  accentOnBackground: { ratio: number; rating: string };
  textOnPrimary: { ratio: number; rating: string };
  issues: string[];
} {
  const metadata = SKIN_METADATA[skin];
  const issues: string[] = [];

  const textOnBackground = calculateContrastRatio(metadata.textColor, metadata.backgroundColor);
  const primaryOnBackground = calculateContrastRatio(metadata.primaryColor, metadata.backgroundColor);
  const secondaryOnBackground = calculateContrastRatio(metadata.secondaryColor, metadata.backgroundColor);
  const accentOnBackground = calculateContrastRatio(metadata.accentColor, metadata.backgroundColor);
  const textOnPrimary = calculateContrastRatio(metadata.textColor, metadata.primaryColor);

  // Check for accessibility issues
  if (getContrastRating(textOnBackground) === 'Fail') {
    issues.push('Text on background fails contrast requirements');
  }
  // Primary colors should have reasonable contrast for UI elements (minimum 2.3:1 for readability)
  if (primaryOnBackground < 2.3) {
    issues.push(`Primary color contrast too low (${primaryOnBackground.toFixed(2)}:1, needs 2.3:1)`);
  }

  return {
    skin,
    textOnBackground: { ratio: textOnBackground, rating: getContrastRating(textOnBackground) },
    primaryOnBackground: { ratio: primaryOnBackground, rating: getContrastRating(primaryOnBackground) },
    secondaryOnBackground: { ratio: secondaryOnBackground, rating: getContrastRating(secondaryOnBackground) },
    accentOnBackground: { ratio: accentOnBackground, rating: getContrastRating(accentOnBackground) },
    textOnPrimary: { ratio: textOnPrimary, rating: getContrastRating(textOnPrimary) },
    issues
  };
}

// Analyze all skins and return issues
export function analyzeAllSkins(): Array<{
  skin: DesignSkin;
  category: string;
  analysis: ReturnType<typeof analyzeSkinColors>;
}> {
  const results: Array<{
    skin: DesignSkin;
    category: string;
    analysis: ReturnType<typeof analyzeSkinColors>;
  }> = [];

  const categories = [
    { name: 'Beginner', skins: SKIN_MAPPING.beginner },
    { name: 'Quick Win', skins: SKIN_MAPPING.quick_win },
    { name: 'Authority', skins: SKIN_MAPPING.authority },
    { name: 'System', skins: SKIN_MAPPING.system },
    { name: 'Transformation', skins: SKIN_MAPPING.transformation },
    { name: 'Creative', skins: SKIN_MAPPING.creative }
  ];

  for (const category of categories) {
    for (const skin of category.skins) {
      results.push({
        skin: skin as DesignSkin,
        category: category.name,
        analysis: analyzeSkinColors(skin as DesignSkin)
      });
    }
  }

  return results;
}

