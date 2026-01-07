// AI Prompts for Content Generation
// Organized by psychological type and product format

export type PsychologicalType = 'beginner' | 'quick_win' | 'authority' | 'system' | 'transformation' | 'creative';
export type ProductFormat = 'ebook' | 'template' | 'voice';

export interface AIPromptSet {
  titlePrompt: string;
  subtitlePrompt: string;
  introductionPrompt: string;
  chapterPrompt: string;
  conclusionPrompt: string;
  ctaPrompt: string;
  imagePrompt: string;
}

// Base prompts that get customized per psychological type
const BASE_PROMPTS = {
  ebook: {
    title: `Generate a compelling, professional title for an ebook about: {{USER_INPUT}}. 
The title should be {{STYLE_MODIFIER}} and appeal to {{TARGET_AUDIENCE}}.
Return ONLY the title, no quotes or additional text.`,
    
    subtitle: `Generate a subtitle for an ebook titled "{{TITLE}}" about: {{USER_INPUT}}.
The subtitle should {{SUBTITLE_GOAL}}.
Return ONLY the subtitle, no quotes or additional text.`,
    
    introduction: `Write an exceptional introduction (500-650 words) for an ebook titled "{{TITLE}}" about: {{USER_INPUT}}.
{{INTRO_INSTRUCTIONS}}
Use a {{TONE}} tone. Write premium, long-form content with extraordinary depth:
- A compelling, sophisticated hook that immediately establishes authority
- Deep, comprehensive exploration of the problem with multiple angles
- Detailed overview of advanced concepts and proprietary frameworks they will learn
- Why this matters now with specific data and market analysis
- Build credibility with expert insights and establish premium value proposition
- Include specific outcomes, success metrics, and transformation promises`,
    
    chapters: `Generate a structured chapter outline for an ebook titled "{{TITLE}}" about: {{USER_INPUT}}.
{{CHAPTER_INSTRUCTIONS}}
Return as JSON array with format:
[{"number": 1, "title": "Chapter Title", "summary": "Brief chapter summary"}]
Include {{CHAPTER_COUNT}} chapters.`,
    
    chapterContent: `Write Chapter {{CHAPTER_NUMBER}}: "{{CHAPTER_TITLE}}" for an ebook about: {{USER_INPUT}}.
{{CONTENT_INSTRUCTIONS}}
Write 700-850 words (aim for more rather than less - exceed minimum requirements) with exceptionally high-quality, premium content:
- Deep, comprehensive explanations with multiple examples and case studies
- Advanced insights that go beyond basic knowledge - share proprietary frameworks
- Practical, implementable strategies with step-by-step implementation guides
- Multiple actionable takeaways and advanced techniques per chapter
- Engaging, long-form writing style with detailed analysis - avoid any generic or 08/15 content
- Comprehensive coverage with insider knowledge and expert-level depth
- Include specific metrics, timeframes, and measurable outcomes throughout
Use HTML formatting (h3, p, ul, li, blockquote) for professional presentation.`,
    
    conclusion: `Write an exceptional conclusion (450-600 words) for an ebook titled "{{TITLE}}" about: {{USER_INPUT}}.
{{CONCLUSION_INSTRUCTIONS}}
Write premium, long-form content that includes extraordinary depth:
- Comprehensive key takeaways with advanced insights and proprietary frameworks
- Strong, sophisticated encouragement to take immediate action with specific timelines
- Final motivating thought with deep emotional resonance and transformation promises
- Detailed next steps, implementation roadmaps, and advanced strategies
- Include success metrics, follow-up resources, and premium support options`,
    
    cta: `Generate a compelling call-to-action for the end of an ebook titled "{{TITLE}}".
The CTA should {{CTA_GOAL}}.
IMPORTANT PRICING GUIDELINES: The product must be priced realistically and affordably to ensure it's marketable and sellable. Do not suggest premium pricing that would make the product inaccessible. Keep prices reasonable and competitive for the target market.
Return as JSON: {"title": "CTA Headline", "description": "CTA description", "buttonText": "Button text", "pricing": "Suggested realistic price range"}`
  },
  
  template: {
    title: `Generate a clear, practical title for a template/worksheet about: {{USER_INPUT}}.
The title should be {{STYLE_MODIFIER}} and clearly indicate what the user will get.
Return ONLY the title.`,
    
    sections: `Create section headings and content for a template about: {{USER_INPUT}}.
{{SECTION_INSTRUCTIONS}}
Return as JSON array:
[{"title": "Section Title", "type": "checklist|input|textarea|numbered", "items": ["item1", "item2"]}]
Include 4-6 practical sections.`,
    
    instructions: `Write brief, clear instructions for using a template about: {{USER_INPUT}}.
Keep it to 2-3 sentences. Be encouraging and practical.`
  },
  
  voice: {
    title: `Generate an engaging title for audio content about: {{USER_INPUT}}.
The title should be {{STYLE_MODIFIER}} and work well as podcast/audio title.
Return ONLY the title.`,
    
    description: `Write a compelling episode description (100-150 words) for audio content titled "{{TITLE}}" about: {{USER_INPUT}}.
{{DESCRIPTION_INSTRUCTIONS}}
Make it enticing and clear about what listeners will learn.`,
    
    takeaways: `Generate 5-7 key takeaways for audio content about: {{USER_INPUT}}.
Return as JSON array of strings. Each should be actionable and memorable.`,
    
    outline: `Create a detailed outline for audio content about: {{USER_INPUT}}.
Return as JSON:
[{"timestamp": "00:00", "topic": "Introduction"}, ...]
Include 8-12 timestamps covering the full content.`,
    
    script: `Write an exceptional conversational script (2200-2800 words) for audio content titled "{{TITLE}}" about: {{USER_INPUT}}.
{{SCRIPT_INSTRUCTIONS}}
Write as if speaking directly to the listener with premium, long-form content of extraordinary depth. Include:
- Warm, sophisticated introduction with expert insights and credibility-building
- Clear, thoughtful transitions with deep connections between topics
- Multiple detailed examples, case studies, and advanced strategies
- Strong conclusion with specific, actionable implementation steps and premium motivation
- Comprehensive coverage of all key points with insider knowledge and proprietary frameworks
- Include specific metrics, timeframes, and measurable outcomes throughout
Use natural, conversational language but ensure exceptional depth and no generic content.`
  }
};

// Psychological type modifiers
export const PSYCHOLOGICAL_PROMPTS: Record<PsychologicalType, {
  styleModifier: string;
  targetAudience: string;
  tone: string;
  subtitleGoal: string;
  introInstructions: string;
  chapterInstructions: string;
  chapterCount: number;
  contentInstructions: string;
  conclusionInstructions: string;
  ctaGoal: string;
  sectionInstructions: string;
  descriptionInstructions: string;
  scriptInstructions: string;
  imageStyle: string;
}> = {
  beginner: {
    styleModifier: 'welcoming, clear, and non-intimidating',
    targetAudience: 'complete beginners who are just starting out',
    tone: 'friendly, encouraging, and supportive',
    subtitleGoal: 'reassure beginners that this is the perfect starting point',
    introInstructions: 'Start by acknowledging that being a beginner is okay. Address common fears and doubts.',
    chapterInstructions: 'Start with the absolute basics. Each chapter should build on the previous one gradually.',
    chapterCount: 6,
    contentInstructions: 'Explain everything clearly and comprehensively as if to someone with zero prior knowledge. Avoid jargon. Use simple analogies. Write premium long-form content with extraordinary depth, multiple detailed examples, and proprietary frameworks. Ensure each chapter significantly exceeds the 700 word requirement with truly exceptional, high-value content - no generic material.',
    conclusionInstructions: 'Celebrate how far the reader has come. Encourage them to continue learning.',
    ctaGoal: 'encourage them to take their first small step and offer continued support',
    sectionInstructions: 'Keep sections simple with one concept each. Include encouragement.',
    descriptionInstructions: 'Emphasize that no prior experience is needed. Be encouraging.',
    scriptInstructions: 'Speak slowly and clearly. Repeat key concepts. Be very encouraging.',
    imageStyle: 'friendly, bright, welcoming colors, simple illustrations'
  },
  
  quick_win: {
    styleModifier: 'action-oriented, urgent, and results-focused',
    targetAudience: 'busy people who want fast, practical results',
    tone: 'energetic, direct, and motivating',
    subtitleGoal: 'promise specific, fast results they can achieve quickly',
    introInstructions: 'Get straight to the point. Promise quick wins they can implement today.',
    chapterInstructions: 'Each chapter should deliver one actionable win. Focus on speed and simplicity.',
    chapterCount: 5,
    contentInstructions: 'Be extraordinarily detailed and actionable while maintaining comprehensive coverage. Every paragraph should include something they can do immediately, but expand on concepts with multiple examples, case studies, and advanced strategies. Ensure each chapter significantly exceeds the 700 word requirement with premium, practical content of exceptional quality - avoid any generic advice.',
    conclusionInstructions: 'Summarize the quick wins. Challenge them to implement at least one today.',
    ctaGoal: 'push them to take immediate action with a time-sensitive offer',
    sectionInstructions: 'Make each section a quick actionable item. Use checkboxes for completion.',
    descriptionInstructions: 'Emphasize speed and immediate results. Use power words.',
    scriptInstructions: 'Be energetic and fast-paced. Focus on "do this now" actions.',
    imageStyle: 'dynamic, bold colors, lightning/speed elements, achievement symbols'
  },
  
  authority: {
    styleModifier: 'professional, authoritative, and credible',
    targetAudience: 'professionals seeking expert-level knowledge',
    tone: 'confident, knowledgeable, and trustworthy',
    subtitleGoal: 'establish credibility and promise deep expertise',
    introInstructions: 'Establish authority immediately. Reference research, experience, and proven results.',
    chapterInstructions: 'Go deep on each topic. Include data, case studies, and expert insights.',
    chapterCount: 8,
    contentInstructions: 'Write with exceptional authority and extraordinary depth. Include advanced statistics, proprietary research references, and insider professional insights. Provide comprehensive analysis and sophisticated explanations. Ensure each chapter significantly exceeds the 700 word requirement with truly premium expert-level content and avoid any generic industry knowledge.',
    conclusionInstructions: 'Reinforce the expertise shared. Position the reader as now more knowledgeable.',
    ctaGoal: 'offer exclusive access to more advanced content or direct consultation',
    sectionInstructions: 'Include space for professional analysis and strategic planning.',
    descriptionInstructions: 'Emphasize expertise and comprehensive coverage.',
    scriptInstructions: 'Speak with authority and confidence. Reference data and experience.',
    imageStyle: 'professional, dark/navy colors, clean lines, prestigious feel'
  },
  
  system: {
    styleModifier: 'systematic, structured, and comprehensive',
    targetAudience: 'people who want a complete, repeatable framework',
    tone: 'clear, organized, and methodical',
    subtitleGoal: 'promise a complete system they can follow step-by-step',
    introInstructions: 'Explain why having a system matters. Overview the complete framework.',
    chapterInstructions: 'Each chapter is a component of the overall system. Show how they connect.',
    chapterCount: 7,
    contentInstructions: 'Be extremely structured and extraordinarily comprehensive. Use advanced numbered steps, detailed diagrams, and sophisticated checklists. Provide exceptional explanations for each component of proprietary systems. Ensure each chapter significantly exceeds the 700 word requirement with premium framework documentation and avoid generic methodologies.',
    conclusionInstructions: 'Show how all pieces fit together. Provide an implementation timeline.',
    ctaGoal: 'offer additional tools, templates, or the next level of the system',
    sectionInstructions: 'Create interconnected sections that form a complete system.',
    descriptionInstructions: 'Emphasize the complete, proven system and framework.',
    scriptInstructions: 'Present information in a logical, step-by-step manner.',
    imageStyle: 'blueprint style, diagrams, flowcharts, organized layouts'
  },
  
  transformation: {
    styleModifier: 'inspiring, emotional, and transformative',
    targetAudience: 'people ready for significant personal or professional change',
    tone: 'empathetic, inspiring, and deeply motivating',
    subtitleGoal: 'paint a picture of the transformation they will experience',
    introInstructions: 'Connect emotionally. Acknowledge their desire for change. Paint the vision.',
    chapterInstructions: 'Structure as a journey. Each chapter is a stage of transformation.',
    chapterCount: 8,
    contentInstructions: 'Include exceptional, detailed stories of transformation with specific metrics and timeframes. Address mindset shifts comprehensively with proprietary frameworks. Be deeply motivating with extraordinary emotional depth. Ensure each chapter significantly exceeds the 700 word requirement with premium exploration of advanced change processes.',
    conclusionInstructions: 'Celebrate the journey. Acknowledge their courage. Inspire continued growth.',
    ctaGoal: 'invite them to join a community or program for ongoing transformation',
    sectionInstructions: 'Include reflection exercises and vision-setting activities.',
    descriptionInstructions: 'Focus on the before/after transformation. Be inspiring.',
    scriptInstructions: 'Be emotionally engaging. Share stories. Speak to the heart.',
    imageStyle: 'sunrise/phoenix imagery, warm colors, journey metaphors'
  },
  
  creative: {
    styleModifier: 'innovative, inspiring, and imaginative',
    targetAudience: 'creative minds looking to express themselves or innovate',
    tone: 'playful, inspiring, and thought-provoking',
    subtitleGoal: 'spark curiosity and promise creative breakthrough',
    introInstructions: 'Ignite imagination. Challenge conventional thinking. Celebrate creativity.',
    chapterInstructions: 'Each chapter should unlock new creative perspectives. Include exercises.',
    chapterCount: 7,
    contentInstructions: 'Be extraordinarily unconventional and expansive. Include detailed creative exercises, advanced prompts, and sophisticated thought experiments. Provide comprehensive guidance for proprietary creative processes. Ensure each chapter significantly exceeds the 700 word requirement with premium creative exploration and avoid generic creative advice.',
    conclusionInstructions: 'Inspire continued creative exploration. Celebrate their unique voice.',
    ctaGoal: 'invite them to share their creative work or join a creative community',
    sectionInstructions: 'Include open-ended prompts and creative exercises.',
    descriptionInstructions: 'Be inspiring and unconventional. Spark curiosity.',
    scriptInstructions: 'Be creative and playful. Include imaginative exercises.',
    imageStyle: 'abstract art, vibrant colors, unique compositions, artistic elements'
  }
};

// Generate complete prompt set for a specific type and format
export function getPromptSet(
  psychologicalType: PsychologicalType,
  format: ProductFormat
): Record<string, string> {
  const typeConfig = PSYCHOLOGICAL_PROMPTS[psychologicalType];
  const basePrompts = BASE_PROMPTS[format];
  
  const prompts: Record<string, string> = {};
  
  // Replace placeholders in prompts
  for (const [key, prompt] of Object.entries(basePrompts)) {
    let modifiedPrompt = prompt;
    modifiedPrompt = modifiedPrompt.replace(/\{\{STYLE_MODIFIER\}\}/g, typeConfig.styleModifier);
    modifiedPrompt = modifiedPrompt.replace(/\{\{TARGET_AUDIENCE\}\}/g, typeConfig.targetAudience);
    modifiedPrompt = modifiedPrompt.replace(/\{\{TONE\}\}/g, typeConfig.tone);
    modifiedPrompt = modifiedPrompt.replace(/\{\{SUBTITLE_GOAL\}\}/g, typeConfig.subtitleGoal);
    modifiedPrompt = modifiedPrompt.replace(/\{\{INTRO_INSTRUCTIONS\}\}/g, typeConfig.introInstructions);
    modifiedPrompt = modifiedPrompt.replace(/\{\{CHAPTER_INSTRUCTIONS\}\}/g, typeConfig.chapterInstructions);
    modifiedPrompt = modifiedPrompt.replace(/\{\{CHAPTER_COUNT\}\}/g, typeConfig.chapterCount.toString());
    modifiedPrompt = modifiedPrompt.replace(/\{\{CONTENT_INSTRUCTIONS\}\}/g, typeConfig.contentInstructions);
    modifiedPrompt = modifiedPrompt.replace(/\{\{CONCLUSION_INSTRUCTIONS\}\}/g, typeConfig.conclusionInstructions);
    modifiedPrompt = modifiedPrompt.replace(/\{\{CTA_GOAL\}\}/g, typeConfig.ctaGoal);
    modifiedPrompt = modifiedPrompt.replace(/\{\{SECTION_INSTRUCTIONS\}\}/g, typeConfig.sectionInstructions);
    modifiedPrompt = modifiedPrompt.replace(/\{\{DESCRIPTION_INSTRUCTIONS\}\}/g, typeConfig.descriptionInstructions);
    modifiedPrompt = modifiedPrompt.replace(/\{\{SCRIPT_INSTRUCTIONS\}\}/g, typeConfig.scriptInstructions);
    
    prompts[key] = modifiedPrompt;
  }
  
  // Add image prompt
  prompts.image = `Create a professional cover image for a ${format} about: {{USER_INPUT}}.
Style: ${typeConfig.imageStyle}
The image should feel ${typeConfig.styleModifier}.
Do not include any text in the image.`;
  
  return prompts;
}

// Psychological type detection prompt
export const PSYCHOLOGICAL_TYPE_DETECTION_PROMPT = `Analyze the following product idea and determine which psychological product type it best fits.

Product idea: {{USER_INPUT}}

The psychological types are:
1. BEGINNER - For content that teaches fundamentals to complete newcomers
2. QUICK_WIN - For content that delivers fast, actionable results
3. AUTHORITY - For content that establishes expertise and deep knowledge
4. SYSTEM - For content that provides a complete, repeatable framework
5. TRANSFORMATION - For content focused on significant personal/professional change
6. CREATIVE - For content that sparks innovation and creative expression

Consider:
- Who is the target audience?
- What outcome do they want?
- What stage are they at in their journey?
- What type of value does this provide?

Respond with ONLY ONE of these exact words: beginner, quick_win, authority, system, transformation, creative

No explanation, just the type.`;

// Export all prompt configurations
export function getAllPromptConfigs(): Record<string, Record<string, string>> {
  const configs: Record<string, Record<string, string>> = {};
  
  const types: PsychologicalType[] = ['beginner', 'quick_win', 'authority', 'system', 'transformation', 'creative'];
  const formats: ProductFormat[] = ['ebook', 'template', 'voice'];
  
  for (const type of types) {
    for (const format of formats) {
      const key = `${type}_${format}`;
      configs[key] = getPromptSet(type, format);
    }
  }
  
  return configs;
}




