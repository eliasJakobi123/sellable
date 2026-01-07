// Template System - Main Export
// Exports all template-related functionality

export * from './design-skins';
export * from './template-html';
export * from './ai-prompts';

// Re-export commonly used functions
export { 
  SKIN_MAPPING, 
  TIER1_SKINS, 
  TIER2_SKINS, 
  SKIN_METADATA,
  getRandomSkin,
  getSkinMetadata,
  getPrimarySkin 
} from './design-skins';

export {
  generateTemplate,
  generateChapterHTML,
  generateTOCItemHTML,
  getAllTemplates
} from './template-html';

export {
  getPromptSet,
  getAllPromptConfigs,
  PSYCHOLOGICAL_PROMPTS,
  PSYCHOLOGICAL_TYPE_DETECTION_PROMPT
} from './ai-prompts';

// Template system constants
export const TEMPLATE_VERSION = '1.0.0';

export const PRODUCT_FORMATS = ['ebook', 'template', 'voice'] as const;

export const PSYCHOLOGICAL_TYPES = [
  'beginner',
  'quick_win', 
  'authority',
  'system',
  'transformation',
  'creative'
] as const;

// Template statistics
export function getTemplateStats() {
  return {
    totalPsychologicalTypes: 6,
    totalDesignSkins: 40,
    tier1Skins: 12,
    tier2Skins: 28,
    productFormats: 3,
    totalTemplates: 6 * 40 * 3 // 720 template combinations
  };
}




