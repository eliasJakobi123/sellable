"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Current available skins (all use same layout, different colors)
const CURRENT_EBOOK_SKINS = [
  { id: 'guide_skin', name: 'Friendly Guide', colors: { primary: '#4F46E5', secondary: '#818CF8', accent: '#F59E0B', bg: '#FFFBEB' } },
  { id: 'simple_skin', name: 'Clean Minimal', colors: { primary: '#10B981', secondary: '#34D399', accent: '#3B82F6', bg: '#FFFFFF' } },
  { id: 'fast_skin', name: 'Speed Results', colors: { primary: '#EF4444', secondary: '#FCA5A5', accent: '#FACC15', bg: '#FFFBEB' } },
  { id: 'win_skin', name: 'Victory Dark', colors: { primary: '#F59E0B', secondary: '#FCD34D', accent: '#10B981', bg: '#0F172A' } },
  { id: 'expert_skin', name: 'Expert Blue', colors: { primary: '#1E3A5F', secondary: '#3B82F6', accent: '#D4AF37', bg: '#FFFFFF' } },
  { id: 'authority_skin', name: 'Thought Leader', colors: { primary: '#0F172A', secondary: '#334155', accent: '#EAB308', bg: '#F8FAFC' } },
  { id: 'blueprint_skin', name: 'Blueprint', colors: { primary: '#1D4ED8', secondary: '#60A5FA', accent: '#F97316', bg: '#EFF6FF' } },
  { id: 'framework_skin', name: 'Framework Green', colors: { primary: '#059669', secondary: '#34D399', accent: '#8B5CF6', bg: '#ECFDF5' } },
  { id: 'journey_skin', name: 'Journey Purple', colors: { primary: '#7C3AED', secondary: '#A78BFA', accent: '#F59E0B', bg: '#FAF5FF' } },
  { id: 'breakthrough_skin', name: 'Breakthrough Dark', colors: { primary: '#DC2626', secondary: '#F87171', accent: '#FACC15', bg: '#0F0F0F' } },
  { id: 'inspire_skin', name: 'Inspiration Pink', colors: { primary: '#EC4899', secondary: '#F9A8D4', accent: '#FACC15', bg: '#FFFBEB' } },
  { id: 'innovate_skin', name: 'Innovation Dark', colors: { primary: '#6366F1', secondary: '#818CF8', accent: '#22D3EE', bg: '#0F0F23' } },
  { id: 'master_skin', name: 'Master Class', colors: { primary: '#7C2D12', secondary: '#B45309', accent: '#FDE047', bg: '#1C1917' } },
  { id: 'growth_skin', name: 'Growth Teal', colors: { primary: '#0D9488', secondary: '#2DD4BF', accent: '#F97316', bg: '#FFFFFF' } },
  { id: 'create_skin', name: 'Creator Blue', colors: { primary: '#0EA5E9', secondary: '#7DD3FC', accent: '#F472B6', bg: '#F0F9FF' } },
]

const CURRENT_TEMPLATE_SKINS = [
  { id: 'checklist_skin', name: 'Checklist Pro', colors: { primary: '#2563EB', secondary: '#60A5FA', accent: '#10B981', bg: '#FFFFFF' } },
  { id: 'planner_skin', name: 'Planner Warm', colors: { primary: '#F59E0B', secondary: '#FCD34D', accent: '#8B5CF6', bg: '#FFFBF0' } },
  { id: 'worksheet_skin', name: 'Worksheet Modern', colors: { primary: '#4F46E5', secondary: '#A5B4FC', accent: '#EC4899', bg: '#F8FAFC' } },
  { id: 'taskmanager_skin', name: 'Task Manager Dark', colors: { primary: '#22C55E', secondary: '#4ADE80', accent: '#FACC15', bg: '#0F172A' } },
  { id: 'goaltracker_skin', name: 'Goal Tracker Coral', colors: { primary: '#F43F5E', secondary: '#FB7185', accent: '#14B8A6', bg: '#FFF1F2' } },
  { id: 'projectplan_skin', name: 'Project Planner Blue', colors: { primary: '#0284C7', secondary: '#38BDF8', accent: '#F97316', bg: '#F0F9FF' } },
  { id: 'budget_skin', name: 'Budget Template Green', colors: { primary: '#059669', secondary: '#34D399', accent: '#F59E0B', bg: '#ECFDF5' } },
  { id: 'calendar_skin', name: 'Calendar Purple', colors: { primary: '#9333EA', secondary: '#C084FC', accent: '#22D3EE', bg: '#FAF5FF' } },
  { id: 'habittracker_skin', name: 'Habit Tracker Mint', colors: { primary: '#14B8A6', secondary: '#5EEAD4', accent: '#F472B6', bg: '#F0FDFA' } },
  { id: 'actionplan_skin', name: 'Action Plan Orange', colors: { primary: '#EA580C', secondary: '#FB923C', accent: '#6366F1', bg: '#FFF7ED' } },
]

// Planned new layouts (to be implemented)
const PLANNED_EBOOK_LAYOUTS = [
  { id: 'classic', name: 'Classic', description: 'Traditional book layout with chapters', status: 'planned' },
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary design', status: 'planned' },
  { id: 'magazine', name: 'Magazine', description: 'Magazine-style with columns', status: 'planned' },
  { id: 'minimal', name: 'Minimal', description: 'Ultra-clean, minimal design', status: 'planned' },
  { id: 'academic', name: 'Academic', description: 'Scholarly format with citations', status: 'planned' },
  { id: 'workbook', name: 'Workbook', description: 'Interactive with exercises', status: 'planned' },
  { id: 'story', name: 'Story', description: 'Narrative-focused layout', status: 'planned' },
]

const PLANNED_TEMPLATE_LAYOUTS = [
  { id: 'checklist', name: 'Checklist', description: 'Simple checklist format', status: 'planned' },
  { id: 'todo', name: 'To-Do List', description: 'Task management layout', status: 'planned' },
  { id: 'worksheet', name: 'Worksheet', description: 'Fillable form layout', status: 'planned' },
  { id: 'planner', name: 'Planner', description: 'Daily/weekly planner', status: 'planned' },
  { id: 'tracker', name: 'Tracker', description: 'Progress tracking layout', status: 'planned' },
  { id: 'form', name: 'Form', description: 'Multi-field form layout', status: 'planned' },
  { id: 'table', name: 'Table', description: 'Data table format', status: 'planned' },
  { id: 'calendar', name: 'Calendar', description: 'Calendar grid layout', status: 'planned' },
  { id: 'notes', name: 'Notes', description: 'Note-taking format', status: 'planned' },
  { id: 'guide', name: 'Guide', description: 'Step-by-step guide layout', status: 'planned' },
]

// Color palettes (10 per layout)
const COLOR_PALETTES = [
  { name: 'Ocean Blue', primary: '#0EA5E9', secondary: '#7DD3FC', accent: '#F472B6', bg: '#F0F9FF', text: '#0C4A6E' },
  { name: 'Forest Green', primary: '#10B981', secondary: '#34D399', accent: '#F59E0B', bg: '#ECFDF5', text: '#064E3B' },
  { name: 'Sunset Orange', primary: '#F97316', secondary: '#FB923C', accent: '#6366F1', bg: '#FFF7ED', text: '#7C2D12' },
  { name: 'Royal Purple', primary: '#9333EA', secondary: '#C084FC', accent: '#22D3EE', bg: '#FAF5FF', text: '#581C87' },
  { name: 'Crimson Red', primary: '#DC2626', secondary: '#F87171', accent: '#FACC15', bg: '#FEF2F2', text: '#991B1B' },
  { name: 'Midnight Dark', primary: '#0F172A', secondary: '#334155', accent: '#EAB308', bg: '#1E293B', text: '#F1F5F9' },
  { name: 'Rose Pink', primary: '#EC4899', secondary: '#F9A8D4', accent: '#FACC15', bg: '#FDF2F8', text: '#831843' },
  { name: 'Teal Ocean', primary: '#14B8A6', secondary: '#5EEAD4', accent: '#F472B6', bg: '#F0FDFA', text: '#134E4A' },
  { name: 'Amber Gold', primary: '#D97706', secondary: '#FCD34D', accent: '#8B5CF6', bg: '#FFFBEB', text: '#78350F' },
  { name: 'Slate Gray', primary: '#475569', secondary: '#94A3B8', accent: '#F59E0B', bg: '#F8FAFC', text: '#1E293B' },
]

export default function LayoutPreviewPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<'ebook' | 'template'>('ebook')
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null)
  const [showCurrent, setShowCurrent] = useState(true)

  const currentSkins = selectedCategory === 'ebook' ? CURRENT_EBOOK_SKINS : CURRENT_TEMPLATE_SKINS
  const plannedLayouts = selectedCategory === 'ebook' ? PLANNED_EBOOK_LAYOUTS : PLANNED_TEMPLATE_LAYOUTS

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard/productbuilder')}
            className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Product Builder
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Layout Preview</h1>
          <p className="text-gray-600">Preview all available layouts and color schemes</p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setSelectedCategory('ebook')
              setSelectedLayout(null)
            }}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              selectedCategory === 'ebook'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Ebooks
          </button>
          <button
            onClick={() => {
              setSelectedCategory('template')
              setSelectedLayout(null)
            }}
            className={`px-6 py-3 rounded-xl font-medium transition-colors ${
              selectedCategory === 'template'
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Templates
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowCurrent(true)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              showCurrent
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Current Layouts ({currentSkins.length} color variants)
          </button>
          <button
            onClick={() => setShowCurrent(false)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
              !showCurrent
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Planned New Layouts ({plannedLayouts.length})
          </button>
        </div>

        {/* Current Layouts View */}
        {showCurrent ? (
          <div>
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Currently all layouts use the same structure - only colors differ. 
                We have {currentSkins.length} color variants. New layout structures are planned below.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentSkins.map((skin) => (
                <div
                  key={skin.id}
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-black hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{skin.name}</h3>
                  <div className="flex gap-2 mb-4">
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ backgroundColor: skin.colors.primary }}
                      title="Primary"
                    />
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ backgroundColor: skin.colors.secondary }}
                      title="Secondary"
                    />
                    <div
                      className="w-12 h-12 rounded-lg"
                      style={{ backgroundColor: skin.colors.accent }}
                      title="Accent"
                    />
                  </div>
                  <div
                    className="rounded-lg p-4 text-sm"
                    style={{
                      backgroundColor: skin.colors.bg,
                      border: `2px solid ${skin.colors.primary}`,
                    }}
                  >
                    <div
                      className="font-bold mb-2"
                      style={{ color: skin.colors.primary }}
                    >
                      Sample Title
                    </div>
                    <div style={{ color: '#374151' }}>
                      This is how content looks with this color scheme
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    Layout: Standard (same for all)
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Planned Layouts View */
          <div>
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>Planned:</strong> These are the new layout structures we will implement. 
                Each will have at least 10 color variants.
              </p>
            </div>
            {!selectedLayout ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {plannedLayouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-black hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{layout.name}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Planned</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{layout.description}</p>
                    <div className="text-sm text-gray-500">
                      10+ color variants planned
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div>
                {/* Back to layouts */}
                <button
                  onClick={() => setSelectedLayout(null)}
                  className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Layouts
                </button>

                {/* Color Variants */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {plannedLayouts.find(l => l.id === selectedLayout)?.name} - Color Variants
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {COLOR_PALETTES.map((palette, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 border border-gray-200 hover:border-black transition-all"
                      >
                        <div className="mb-3">
                          <h4 className="font-semibold text-gray-900 mb-2">{palette.name}</h4>
                          <div className="flex gap-2">
                            <div
                              className="w-8 h-8 rounded"
                              style={{ backgroundColor: palette.primary }}
                              title="Primary"
                            />
                            <div
                              className="w-8 h-8 rounded"
                              style={{ backgroundColor: palette.secondary }}
                              title="Secondary"
                            />
                            <div
                              className="w-8 h-8 rounded"
                              style={{ backgroundColor: palette.accent }}
                              title="Accent"
                            />
                          </div>
                        </div>
                        {/* Preview Box */}
                        <div
                          className="rounded-lg p-3 text-xs"
                          style={{
                            backgroundColor: palette.bg,
                            color: palette.text,
                            border: `2px solid ${palette.primary}`,
                          }}
                        >
                          <div
                            className="font-bold mb-1"
                            style={{ color: palette.primary }}
                          >
                            Sample Title
                          </div>
                          <div style={{ color: palette.text, opacity: 0.8 }}>
                            Preview text
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Layout Preview */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    {plannedLayouts.find(l => l.id === selectedLayout)?.name} - Layout Structure Preview
                  </h3>
                  <div className="space-y-4">
                    {selectedCategory === 'ebook' ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Cover Page</div>
                          <div className="text-sm text-gray-600">Title, Subtitle, Author, Cover Image</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Table of Contents</div>
                          <div className="text-sm text-gray-600">Chapter listing with page numbers</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Introduction</div>
                          <div className="text-sm text-gray-600">Opening content</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Chapters</div>
                          <div className="text-sm text-gray-600">
                            {selectedLayout === 'magazine' && 'Column-based layout with images and sidebars'}
                            {selectedLayout === 'academic' && 'Formal structure with citations, references, and footnotes'}
                            {selectedLayout === 'workbook' && 'Interactive sections with exercises and fillable areas'}
                            {selectedLayout === 'story' && 'Narrative flow with storytelling elements and quotes'}
                            {selectedLayout === 'minimal' && 'Ultra-clean, spacious design with lots of whitespace'}
                            {selectedLayout === 'modern' && 'Contemporary styling with modern typography and grids'}
                            {selectedLayout === 'classic' && 'Traditional book format with classic typography'}
                          </div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Conclusion</div>
                          <div className="text-sm text-gray-600">Closing content</div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Header</div>
                          <div className="text-sm text-gray-600">Title and description</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                          <div className="font-semibold mb-2">Content Area</div>
                          <div className="text-sm text-gray-600">
                            {selectedLayout === 'checklist' && 'Checkbox list format with items and checkboxes'}
                            {selectedLayout === 'todo' && 'Task items with priorities, due dates, and status'}
                            {selectedLayout === 'worksheet' && 'Fillable fields, inputs, and form elements'}
                            {selectedLayout === 'planner' && 'Date-based planning sections with time slots'}
                            {selectedLayout === 'tracker' && 'Progress bars, metrics, and tracking elements'}
                            {selectedLayout === 'form' && 'Multiple input fields, dropdowns, and text areas'}
                            {selectedLayout === 'table' && 'Data table with rows, columns, and sorting'}
                            {selectedLayout === 'calendar' && 'Calendar grid layout with dates and events'}
                            {selectedLayout === 'notes' && 'Note-taking sections with bullet points and formatting'}
                            {selectedLayout === 'guide' && 'Step-by-step instructions with numbered steps'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Implementation Status:</strong> This layout will be implemented with at least 10 color variants.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

