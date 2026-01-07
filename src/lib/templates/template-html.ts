// HTML Template Generator
// Generates HTML templates for each design skin

import { DesignSkin, SKIN_METADATA, SkinMetadata } from './design-skins';

export interface TemplateConfig {
  skin: DesignSkin;
  format: 'ebook' | 'template' | 'voice';
}

// Base HTML structure for ebooks
function generateEbookHTML(metadata: SkinMetadata): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=League+Spartan:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    {{CSS_STYLES}}
  </style>
</head>
<body>
  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-content">
      {{COVER_IMAGE}}
      <h1 class="title">{{TITLE}}</h1>
      <p class="subtitle">{{SUBTITLE}}</p>
      <p class="author">by {{AUTHOR}}</p>
    </div>
  </div>

  <!-- Table of Contents -->
  <div class="toc-page page-break">
    <h2>Table of Contents</h2>
    <nav class="toc">
      {{TABLE_OF_CONTENTS}}
    </nav>
  </div>

  <!-- Introduction -->
  <div class="intro-page page-break">
    <h2>Introduction</h2>
    <div class="intro-content">
      {{INTRODUCTION}}
    </div>
  </div>

  <!-- Chapters -->
  {{CHAPTERS}}

  <!-- Conclusion -->
  <div class="conclusion-page page-break">
    <h2>Conclusion</h2>
    <div class="conclusion-content">
      {{CONCLUSION}}
    </div>
  </div>

  <!-- About Author -->
  <div class="author-page page-break">
    <h2>About the Author</h2>
    <div class="author-content">
      {{ABOUT_AUTHOR}}
    </div>
  </div>
</body>
</html>`;
}

// Generate CSS based on skin metadata
function generateEbookCSS(metadata: SkinMetadata): string {
  return `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${metadata.fontFamily};
  color: ${metadata.textColor};
  background-color: ${metadata.backgroundColor};
  line-height: 1.7;
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${metadata.headingFont};
  color: ${metadata.primaryColor};
  margin-bottom: 1rem;
  line-height: 1.3;
}

h1 { font-size: 2.5rem; font-weight: 800; }
h2 { font-size: 2rem; font-weight: 700; }
h3 { font-size: 1.5rem; font-weight: 600; }
h4 { font-size: 1.25rem; font-weight: 600; }

p {
  margin-bottom: 1rem;
}

a {
  color: ${metadata.accentColor};
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.page-break {
  page-break-before: always;
}

/* Cover Page */
.cover-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${metadata.primaryColor} 0%, ${metadata.secondaryColor} 100%);
  color: #ffffff;
  text-align: center;
  padding: 2rem;
}

.cover-content {
  max-width: 600px;
}

.cover-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 2rem;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.cover-page .title {
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.cover-page .subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cover-page .author {
  font-size: 1.1rem;
  opacity: 0.8;
  font-style: italic;
}

/* Table of Contents */
.toc-page {
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.toc {
  margin-top: 2rem;
}

.toc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${metadata.secondaryColor}40;
}

.toc-item a {
  color: ${metadata.textColor};
  font-weight: 500;
}

.toc-item a:hover {
  color: ${metadata.primaryColor};
}

.toc-number {
  color: ${metadata.secondaryColor};
  font-weight: 600;
}

/* Content Pages */
.intro-page,
.conclusion-page,
.author-page,
.chapter {
  padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.intro-content,
.conclusion-content,
.chapter-content,
.author-content {
  font-size: 1.1rem;
}

/* Chapter Styling */
.chapter {
  min-height: 100vh;
}

.chapter-number {
  display: inline-block;
  background: ${metadata.primaryColor};
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.chapter-title {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid ${metadata.accentColor};
}

.chapter-content ul,
.chapter-content ol {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.chapter-content li {
  margin-bottom: 0.75rem;
}

.chapter-content blockquote {
  border-left: 4px solid ${metadata.accentColor};
  padding: 1rem 1.5rem;
  margin: 1.5rem 0;
  background: ${metadata.secondaryColor}10;
  font-style: italic;
}

.chapter-content .highlight-box {
  background: ${metadata.primaryColor}10;
  border: 1px solid ${metadata.primaryColor}30;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.chapter-content .highlight-box h4 {
  color: ${metadata.primaryColor};
  margin-bottom: 0.75rem;
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.mt-1 { margin-top: 0.5rem; }
.mt-2 { margin-top: 1rem; }
.mt-3 { margin-top: 1.5rem; }
.mt-4 { margin-top: 2rem; }
.mb-1 { margin-bottom: 0.5rem; }
.mb-2 { margin-bottom: 1rem; }
.mb-3 { margin-bottom: 1.5rem; }
.mb-4 { margin-bottom: 2rem; }

/* Print Styles */
@media print {
  .page-break {
    page-break-before: always;
  }
  
  body {
    font-size: 12pt;
  }
  
  .cover-page {
    height: 100vh;
  }
}

@page {
  size: A4;
  margin: 2cm;
}
`;
}

// Generate chapter HTML template
export function generateChapterHTML(): string {
  return `
<div class="chapter page-break" id="chapter-{{CHAPTER_NUMBER}}">
  <span class="chapter-number">Chapter {{CHAPTER_NUMBER}}</span>
  <h2 class="chapter-title">{{CHAPTER_TITLE}}</h2>
  <div class="chapter-content">
    {{CHAPTER_CONTENT}}
  </div>
</div>`;
}

// Generate TOC item HTML
export function generateTOCItemHTML(): string {
  return `
<div class="toc-item">
  <a href="#chapter-{{CHAPTER_NUMBER}}">{{CHAPTER_TITLE}}</a>
  <span class="toc-number">{{CHAPTER_NUMBER}}</span>
</div>`;
}

// Template templates for different formats
export function generateTemplate(skin: DesignSkin, format: 'ebook' | 'template' | 'voice'): { html: string; css: string } {
  const metadata = SKIN_METADATA[skin];
  
  switch (format) {
    case 'ebook':
      return {
        html: generateEbookHTML(metadata),
        css: generateEbookCSS(metadata)
      };
    case 'template':
      return generateTemplateHTML(metadata);
    case 'voice':
      return generateVoiceHTML(metadata);
    default:
      return {
        html: generateEbookHTML(metadata),
        css: generateEbookCSS(metadata)
      };
  }
}

// Template format HTML (worksheets, checklists, etc.)
function generateTemplateHTML(metadata: SkinMetadata): { html: string; css: string } {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=League+Spartan:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    {{CSS_STYLES}}
  </style>
</head>
<body>
  <!-- Header -->
  <header class="template-header">
    <h1>{{TITLE}}</h1>
    <p class="subtitle">{{SUBTITLE}}</p>
  </header>

  <!-- Main Content -->
  <main class="template-content">
    {{TEMPLATE_SECTIONS}}
  </main>

  <!-- Footer -->
  <footer class="template-footer">
    <p>Created with Sellable | {{AUTHOR}}</p>
  </footer>
</body>
</html>`;

  const css = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${metadata.fontFamily};
  color: ${metadata.textColor};
  background-color: ${metadata.backgroundColor};
  line-height: 1.6;
  padding: 2rem;
}

h1, h2, h3 {
  font-family: ${metadata.headingFont};
  color: ${metadata.primaryColor};
}

.template-header {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 2px solid ${metadata.primaryColor};
  margin-bottom: 2rem;
}

.template-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.template-header .subtitle {
  color: ${metadata.secondaryColor};
}

.template-content {
  max-width: 800px;
  margin: 0 auto;
}

.template-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid ${metadata.secondaryColor}40;
  border-radius: 8px;
}

.template-section h2 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${metadata.accentColor};
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px dashed ${metadata.secondaryColor}30;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid ${metadata.primaryColor};
  border-radius: 4px;
  flex-shrink: 0;
}

.input-line {
  width: 100%;
  border: none;
  border-bottom: 1px solid ${metadata.secondaryColor};
  padding: 0.5rem 0;
  font-size: 1rem;
  background: transparent;
}

.textarea-box {
  width: 100%;
  min-height: 100px;
  border: 1px solid ${metadata.secondaryColor}40;
  border-radius: 4px;
  padding: 1rem;
  background: ${metadata.backgroundColor};
}

.template-footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 2rem;
  border-top: 1px solid ${metadata.secondaryColor}30;
  color: ${metadata.secondaryColor};
}

@media print {
  body {
    padding: 1cm;
  }
}
`;

  return { html, css };
}

// Voice content HTML (for transcripts, show notes)
function generateVoiceHTML(metadata: SkinMetadata): { html: string; css: string } {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{TITLE}}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=League+Spartan:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    {{CSS_STYLES}}
  </style>
</head>
<body>
  <!-- Episode Header -->
  <header class="episode-header">
    <div class="episode-badge">{{EPISODE_TYPE}}</div>
    <h1>{{TITLE}}</h1>
    <p class="episode-meta">
      <span class="duration">{{DURATION}}</span>
      <span class="divider">•</span>
      <span class="date">{{DATE}}</span>
    </p>
  </header>

  <!-- Episode Description -->
  <section class="episode-description">
    <h2>About This Episode</h2>
    <p>{{DESCRIPTION}}</p>
  </section>

  <!-- Key Takeaways -->
  <section class="key-takeaways">
    <h2>Key Takeaways</h2>
    <ul>
      {{TAKEAWAYS}}
    </ul>
  </section>

  <!-- Timestamps -->
  <section class="timestamps">
    <h2>Timestamps</h2>
    <div class="timestamp-list">
      {{TIMESTAMPS}}
    </div>
  </section>

  <!-- Transcript -->
  <section class="transcript">
    <h2>Full Transcript</h2>
    <div class="transcript-content">
      {{TRANSCRIPT}}
    </div>
  </section>

  <!-- Resources -->
  <section class="resources">
    <h2>Resources Mentioned</h2>
    <ul>
      {{RESOURCES}}
    </ul>
  </section>
</body>
</html>`;

  const css = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${metadata.fontFamily};
  color: ${metadata.textColor};
  background-color: ${metadata.backgroundColor};
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1, h2, h3 {
  font-family: ${metadata.headingFont};
  color: ${metadata.primaryColor};
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.episode-header {
  text-align: center;
  padding: 3rem 0;
  border-bottom: 2px solid ${metadata.primaryColor};
}

.episode-badge {
  display: inline-block;
  background: ${metadata.primaryColor};
  color: #fff;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.episode-header h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.episode-meta {
  color: ${metadata.secondaryColor};
}

.episode-meta .divider {
  margin: 0 0.5rem;
}

section {
  padding: 2rem 0;
  border-bottom: 1px solid ${metadata.secondaryColor}20;
}

.key-takeaways ul,
.resources ul {
  list-style: none;
  padding: 0;
}

.key-takeaways li,
.resources li {
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.key-takeaways li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: ${metadata.accentColor};
  font-weight: 600;
}

.timestamp-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timestamp-item {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
}

.timestamp-time {
  color: ${metadata.primaryColor};
  font-weight: 600;
  min-width: 60px;
}

.transcript-content {
  background: ${metadata.secondaryColor}10;
  padding: 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
}

.transcript-content p {
  margin-bottom: 1rem;
}
`;

  return { html, css };
}

// Export all templates for seeding
export function getAllTemplates(): Array<{
  psychological_type: string;
  design_skin: string;
  product_format: string;
  name: string;
  description: string;
  html_template: string;
  css_template: string;
  placeholders: string[];
  tier: string;
}> {
  const templates: Array<{
    psychological_type: string;
    design_skin: string;
    product_format: string;
    name: string;
    description: string;
    html_template: string;
    css_template: string;
    placeholders: string[];
    tier: string;
  }> = [];

  const psychologicalTypes = ['beginner', 'quick_win', 'authority', 'system', 'transformation', 'creative'] as const;
  const formats = ['ebook', 'template', 'voice'] as const;

  const SKIN_MAPPING_LOCAL: Record<string, string[]> = {
    beginner: ['guide_skin', 'simple_skin', 'start_skin', 'intro_skin', 'basics_skin', 'newbie_skin'],
    quick_win: ['fast_skin', 'win_skin', 'hack_skin', 'boost_skin', 'sprint_skin', 'results_skin'],
    authority: ['expert_skin', 'authority_skin', 'master_skin', 'trust_skin', 'professional_skin', 'executive_skin', 'consultant_skin'],
    system: ['blueprint_skin', 'framework_skin', 'method_skin', 'protocol_skin', 'playbook_skin', 'roadmap_skin', 'system_skin'],
    transformation: ['journey_skin', 'breakthrough_skin', 'evolution_skin', 'rebirth_skin', 'growth_skin', 'change_skin', 'progress_skin'],
    creative: ['inspire_skin', 'innovate_skin', 'express_skin', 'dream_skin', 'create_skin', 'vision_skin', 'art_skin']
  };

  const TIER1_SKINS_LOCAL = [
    'guide_skin', 'simple_skin', 'fast_skin', 'win_skin',
    'expert_skin', 'authority_skin', 'blueprint_skin', 'framework_skin',
    'journey_skin', 'breakthrough_skin', 'inspire_skin', 'innovate_skin'
  ];

  for (const psychType of psychologicalTypes) {
    const skins = SKIN_MAPPING_LOCAL[psychType];
    
    for (const skin of skins) {
      for (const format of formats) {
        const { html, css } = generateTemplate(skin as DesignSkin, format);
        const metadata = SKIN_METADATA[skin as DesignSkin];
        const tier = TIER1_SKINS_LOCAL.includes(skin) ? 'tier1' : 'tier2';

        templates.push({
          psychological_type: psychType,
          design_skin: skin,
          product_format: format,
          name: `${metadata.name} - ${format.charAt(0).toUpperCase() + format.slice(1)}`,
          description: metadata.description,
          html_template: html,
          css_template: css,
          placeholders: getPlaceholders(format),
          tier
        });
      }
    }
  }

  return templates;
}

function getPlaceholders(format: 'ebook' | 'template' | 'voice'): string[] {
  switch (format) {
    case 'ebook':
      return [
        '{{TITLE}}', '{{SUBTITLE}}', '{{AUTHOR}}', '{{COVER_IMAGE}}',
        '{{TABLE_OF_CONTENTS}}', '{{INTRODUCTION}}', '{{CHAPTERS}}',
        '{{CONCLUSION}}', '{{ABOUT_AUTHOR}}', '{{CSS_STYLES}}'
      ];
    case 'template':
      return [
        '{{TITLE}}', '{{SUBTITLE}}', '{{AUTHOR}}', '{{TEMPLATE_SECTIONS}}',
        '{{CSS_STYLES}}'
      ];
    case 'voice':
      return [
        '{{TITLE}}', '{{EPISODE_TYPE}}', '{{DURATION}}', '{{DATE}}',
        '{{DESCRIPTION}}', '{{TAKEAWAYS}}', '{{TIMESTAMPS}}',
        '{{TRANSCRIPT}}', '{{RESOURCES}}', '{{CSS_STYLES}}'
      ];
    default:
      return [];
  }
}

