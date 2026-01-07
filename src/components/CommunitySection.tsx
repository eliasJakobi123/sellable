'use client'

import { useState } from 'react'

interface ProductItem {
  id: string
  title: string
  type: 'ebook' | 'checklist' | 'worksheet' | 'course-blueprint'
  category: string
  description: string
  author: string
  skinName: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
}

// Generate preview HTML using AI - no templates, AI creates everything
const generateProductPreview = (product: ProductItem): string => {
  // Special handling for SMART Goal Setting Worksheet
  if (product.id === 'worksheet-goal-setting-003') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1e3a8a;
            background: #ffffff;
          }

          .worksheet-header {
            background: #ffffff;
            border-bottom: 3px solid #3b82f6;
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }

          .worksheet-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
            opacity: 0.3;
            z-index: 1;
          }

          .worksheet-header > * {
            position: relative;
            z-index: 2;
          }

          .worksheet-header h1 {
            font-size: 2.4rem;
            font-weight: 700;
            margin-bottom: 10px;
            color: #1e3a8a;
            letter-spacing: -0.02em;
          }

          .worksheet-header .subtitle {
            font-size: 1.2rem;
            font-weight: 500;
            color: #3b82f6;
            margin-bottom: 15px;
          }

          .worksheet-header .author {
            font-size: 0.95rem;
            color: #6b7280;
            font-weight: 500;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
          }

          .smart-overview {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 30px;
            text-align: center;
          }

          .smart-overview h2 {
            color: #1e3a8a;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .smart-overview p {
            color: #374151;
            font-size: 1rem;
            margin-bottom: 20px;
          }

          .smart-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
          }

          .smart-item {
            background: #3b82f6;
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            font-size: 0.9rem;
          }

          .worksheet-section {
            background: #ffffff;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            margin-bottom: 25px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }

          .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #3b82f6;
          }

          .section-icon {
            width: 40px;
            height: 40px;
            background: #3b82f6;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: bold;
            margin-right: 15px;
          }

          .section-title {
            color: #1e3a8a;
            font-size: 1.4rem;
            font-weight: 700;
            margin: 0;
          }

          .section-description {
            color: #6b7280;
            font-size: 0.95rem;
            margin-top: 5px;
            font-weight: 400;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .input-label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1rem;
          }

          .input-field {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'League Spartan', sans-serif;
            transition: border-color 0.2s ease;
            background: #ffffff;
            text-align: center;
            font-weight: 500;
          }

          .input-field:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .input-field::placeholder {
            color: #9ca3af;
            text-align: center;
          }

          .textarea-field {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'League Spartan', sans-serif;
            min-height: 80px;
            resize: vertical;
            transition: border-color 0.2s ease;
            background: #ffffff;
            text-align: center;
            font-weight: 500;
          }

          .textarea-field:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .textarea-field::placeholder {
            color: #9ca3af;
            text-align: center;
          }

          .goal-summary {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #0ea5e9;
            border-radius: 12px;
            padding: 25px;
            margin-top: 30px;
          }

          .goal-summary h3 {
            color: #0c4a6e;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
          }

          .goal-summary .final-goal {
            background: #ffffff;
            border: 2px solid #0ea5e9;
            border-radius: 8px;
            padding: 20px;
            margin-top: 15px;
            text-align: center;
          }

          .goal-summary .final-goal strong {
            color: #0c4a6e;
            font-size: 1.1rem;
          }

          .progress-section {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 20px;
            margin-top: 25px;
            text-align: center;
          }

          .progress-section h4 {
            color: #374151;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .progress-bar {
            background: #e5e7eb;
            border-radius: 20px;
            height: 10px;
            margin: 15px 0;
            overflow: hidden;
          }

          .progress-fill {
            background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%);
            height: 100%;
            width: 0%;
            border-radius: 20px;
            transition: width 0.3s ease;
          }

          .action-buttons {
            display: flex;
            gap: 15px;
            margin-top: 20px;
            justify-content: center;
          }

          .action-btn {
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .action-btn.primary {
            background: #3b82f6;
            color: white;
          }

          .action-btn.primary:hover {
            background: #2563eb;
          }

          .action-btn.secondary {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
          }

          .action-btn.secondary:hover {
            background: #e5e7eb;
          }

          @media (max-width: 768px) {
            .container {
              padding: 20px;
            }
            .worksheet-header {
              padding: 30px 20px;
            }
            .worksheet-header h1 {
              font-size: 2rem;
            }
            .smart-grid {
              grid-template-columns: 1fr;
            }
            .action-buttons {
              flex-direction: column;
            }
          }
        </style>
      </head>
      <body>
        <!-- Worksheet Header -->
        <div class="worksheet-header">
          <h1>SMART Goal Setting Worksheet</h1>
          <p class="subtitle">Transform Your Dreams Into Achievable Goals</p>
          <p class="author">By Life Coach</p>
        </div>

        <div class="container">
          <!-- SMART Overview -->
          <div class="smart-overview">
            <h2>What Makes a Goal SMART?</h2>
            <p>SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. Fill out each section below to create your perfect goal.</p>
            <div class="smart-grid">
              <div class="smart-item">S<br><small>Specific</small></div>
              <div class="smart-item">M<br><small>Measurable</small></div>
              <div class="smart-item">A<br><small>Achievable</small></div>
              <div class="smart-item">R<br><small>Relevant</small></div>
              <div class="smart-item">T<br><small>Time-bound</small></div>
            </div>
          </div>

          <!-- Specific -->
          <div class="worksheet-section">
            <div class="section-header">
              <div class="section-icon">🎯</div>
              <div>
                <h2 class="section-title">Specific</h2>
                <p class="section-description">What exactly do you want to achieve? Who is involved? Where will it take place?</p>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">What is your goal?</label>
              <input type="text" class="input-field" placeholder="Be specific about what you want to achieve">
            </div>

            <div class="input-group">
              <label class="input-label">Who is involved?</label>
              <input type="text" class="input-field" placeholder="Who needs to be part of this goal?">
            </div>

            <div class="input-group">
              <label class="input-label">Where will this take place?</label>
              <input type="text" class="input-field" placeholder="Location or context of your goal">
            </div>
          </div>

          <!-- Measurable -->
          <div class="worksheet-section">
            <div class="section-header">
              <div class="section-icon">📊</div>
              <div>
                <h2 class="section-title">Measurable</h2>
                <p class="section-description">How will you know when you've achieved your goal? What metrics will you use?</p>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">How will you measure success?</label>
              <input type="text" class="input-field" placeholder="What evidence will show you've succeeded?">
            </div>

            <div class="input-group">
              <label class="input-label">What metrics will you track?</label>
              <textarea class="textarea-field" placeholder="List specific numbers, percentages, or indicators you'll monitor"></textarea>
            </div>
          </div>

          <!-- Achievable -->
          <div class="worksheet-section">
            <div class="section-header">
              <div class="section-icon">🚀</div>
              <div>
                <h2 class="section-title">Achievable</h2>
                <p class="section-description">Is this goal realistic? What skills, resources, or support do you need?</p>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">What skills do you need?</label>
              <input type="text" class="input-field" placeholder="What abilities or knowledge are required?">
            </div>

            <div class="input-group">
              <label class="input-label">What resources do you need?</label>
              <textarea class="textarea-field" placeholder="Tools, money, people, or other resources required"></textarea>
            </div>

            <div class="input-group">
              <label class="input-label">Is this goal realistic for you?</label>
              <input type="text" class="input-field" placeholder="Why is this achievable? What makes it realistic?">
            </div>
          </div>

          <!-- Relevant -->
          <div class="worksheet-section">
            <div class="section-header">
              <div class="section-icon">⭐</div>
              <div>
                <h2 class="section-title">Relevant</h2>
                <p class="section-description">Why is this goal important to you? How does it align with your bigger picture?</p>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">Why is this goal important?</label>
              <textarea class="textarea-field" placeholder="What will achieving this goal give you? How will your life improve?"></textarea>
            </div>

            <div class="input-group">
              <label class="input-label">How does this align with your values?</label>
              <input type="text" class="input-field" placeholder="Which of your core values does this support?">
            </div>
          </div>

          <!-- Time-bound -->
          <div class="worksheet-section">
            <div class="section-header">
              <div class="section-icon">⏰</div>
              <div>
                <h2 class="section-title">Time-bound</h2>
                <p class="section-description">When do you want to achieve this goal? What are your deadlines and milestones?</p>
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">When do you want to complete this goal?</label>
              <input type="text" class="input-field" placeholder="Target completion date or timeframe">
            </div>

            <div class="input-group">
              <label class="input-label">What are your milestones?</label>
              <textarea class="textarea-field" placeholder="Break down the goal into smaller deadlines and checkpoints"></textarea>
            </div>
          </div>

          <!-- Goal Summary -->
          <div class="goal-summary">
            <h3>Your SMART Goal Summary</h3>
            <div class="final-goal">
              <strong id="goalSummary">Complete the sections above to see your final SMART goal here...</strong>
            </div>
          </div>

          <!-- Progress & Actions -->
          <div class="progress-section">
            <h4>Worksheet Completion Progress</h4>
            <div class="progress-bar">
              <div class="progress-fill" id="progressFill"></div>
            </div>
            <p style="font-size: 0.9rem; color: #6b7280; margin-bottom: 20px;">Fill out the fields above to track your progress</p>

            <div class="action-buttons">
              <button class="action-btn primary" onclick="generateSummary()">Generate SMART Goal</button>
              <button class="action-btn secondary" onclick="clearAll()">Clear All</button>
            </div>
          </div>
        </div>

        <script>
          function updateProgress() {
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== '');
            const progress = (filledInputs.length / inputs.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
          }

          function generateSummary() {
            const goal = document.querySelector('input[placeholder*="What is your goal?"]').value;
            const deadline = document.querySelector('input[placeholder*="Target completion date"]').value;

            if (goal && deadline) {
              const summary = \`I will \${goal} by \${deadline}.\`;
              document.getElementById('goalSummary').textContent = summary;
              document.getElementById('goalSummary').style.color = '#0c4a6e';
            } else {
              alert('Please fill in at least your main goal and target deadline to generate a summary.');
            }
          }

          function clearAll() {
            if (confirm('Are you sure you want to clear all fields?')) {
              const inputs = document.querySelectorAll('input[type="text"], textarea');
              inputs.forEach(input => input.value = '');
              document.getElementById('goalSummary').textContent = 'Complete the sections above to see your final SMART goal here...';
              document.getElementById('goalSummary').style.color = '#0c4a6e';
              updateProgress();
            }
          }

          // Add event listeners for progress tracking
          document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('input[type="text"], textarea');
            inputs.forEach(input => {
              input.addEventListener('input', updateProgress);
            });
            updateProgress();
          });
        </script>
      </body>
      </html>
    `;
  }

  if (product.id === 'checklist-productivity-002') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&family=Fredoka:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #ffffff;
          }

          .header {
            background: linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%);
            padding: 60px 40px;
            text-align: center;
            color: white;
          }

          .header h1 {
            font-size: 2.6rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            letter-spacing: -0.02em;
            font-family: 'Fredoka', cursive;
          }

          .header .subtitle {
            font-size: 1.3rem;
            font-weight: 400;
            margin-bottom: 20px;
            opacity: 0.95;
            font-family: 'Nunito', sans-serif;
          }

          .header .author {
            font-size: 1rem;
            font-weight: 500;
            opacity: 0.9;
            font-family: 'Playfair Display', serif;
          }

          .container {
            max-width: 700px;
            margin: 0 auto;
            padding: 40px 30px;
          }

          .intro {
            background: #f0fdf4;
            border: 1px solid #10b981;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 40px;
            text-align: center;
          }

          .intro p {
            color: #065f46;
            font-size: 1.1rem;
            margin-bottom: 15px;
            font-weight: 500;
          }

          .intro .highlight {
            color: #047857;
            font-weight: 700;
            font-size: 1.2rem;
          }

          .checklist-section {
            background: #ffffff;
            border: 2px solid #f3f4f6;
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }

          .section-title {
            color: #065f46;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 25px;
            padding-bottom: 10px;
            border-bottom: 3px solid #10b981;
            display: flex;
            align-items: center;
            font-family: 'Fredoka', cursive;
          }

          .section-title:before {
            content: "☀️";
            margin-right: 12px;
            font-size: 1.4rem;
          }

          .checklist-item {
            display: flex;
            align-items: flex-start;
            margin-bottom: 20px;
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #10b981;
          }

          .checklist-item.completed {
            background: #ecfdf5;
            border-left-color: #059669;
          }

          .checkbox {
            width: 24px;
            height: 24px;
            margin-right: 15px;
            margin-top: 2px;
            border: 2px solid #10b981;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s ease;
          }

          .checkbox.checked {
            background: #10b981;
            color: white;
          }

          .checkbox:hover {
            border-color: #059669;
          }

          .item-content h3 {
            color: #065f46;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .item-content p {
            color: #374151;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .input-field {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'League Spartan', sans-serif;
            margin-top: 8px;
            transition: border-color 0.2s ease;
            text-align: center;
            font-weight: 500;
          }

          .input-field:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          }

          .input-field::placeholder {
            color: #9ca3af;
            text-align: center;
          }

          .quote {
            background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
            border-left: 4px solid #10b981;
            padding: 25px;
            margin: 30px 0;
            border-radius: 0 12px 12px 0;
            font-style: italic;
            color: #065f46;
            font-weight: 500;
            text-align: center;
          }

          .progress-bar {
            background: #e5e7eb;
            border-radius: 20px;
            height: 8px;
            margin: 20px 0;
            overflow: hidden;
          }

          .progress-fill {
            background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
            height: 100%;
            width: 0%;
            border-radius: 20px;
            transition: width 0.3s ease;
          }

          .footer {
            background: #f8fafc;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
            margin-top: 40px;
            border: 1px solid #e5e7eb;
          }

          .footer h3 {
            color: #065f46;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .footer p {
            color: #374151;
            font-size: 1rem;
          }

          @media (max-width: 768px) {
            .header {
              padding: 50px 30px;
            }
            .header h1 {
              font-size: 2.2rem;
            }
            .container {
              padding: 30px 20px;
            }
            .checklist-section {
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="header">
          <h1>Morning Success Ritual Checklist</h1>
          <p class="subtitle">Start Your Day with Intention and Purpose</p>
          <p class="author">By Productivity Coach</p>
        </div>

        <div class="container">
          <!-- Introduction -->
          <div class="intro">
            <p>Transform your mornings from chaotic starts to powerful launches that set you up for success.</p>
            <p class="highlight">Your morning routine shapes your entire day. Make it intentional.</p>
          </div>

          <!-- Wake & Hydrate -->
          <div class="checklist-section">
            <h2 class="section-title">🌅 Wake & Hydrate</h2>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Wake up at your ideal time</h3>
                <p>Start your day when you're naturally energized, not when you're forced to.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Drink 16oz of water immediately</h3>
                <p>Rehydrate after sleep and kickstart your metabolism.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Take 5 deep breaths</h3>
                <p>Center yourself and set a calm, intentional tone for the day.</p>
              </div>
            </div>
          </div>

          <!-- Mindset & Gratitude -->
          <div class="checklist-section">
            <h2 class="section-title">🧠 Mindset & Gratitude</h2>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Write 3 things you're grateful for</h3>
                <p>Start with abundance mindset - focus on what you have, not what you lack.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Set your intention for today</h3>
                <p>Decide how you want to show up and what energy you want to bring.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Visualize success</h3>
                <p>Spend 2 minutes imagining your day going perfectly.</p>
                <input type="text" class="input-field" placeholder="What was your biggest win today?" style="margin-top: 10px;">
              </div>
            </div>
          </div>

          <!-- Physical Energy -->
          <div class="checklist-section">
            <h2 class="section-title">💪 Physical Energy</h2>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>10-minute movement</h3>
                <p>Walk, stretch, or do light exercise to get your blood flowing.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Healthy breakfast</h3>
                <p>Fuel your body with nourishing food that sustains energy throughout the morning.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Make your bed</h3>
                <p>Complete your first task of the day and create a sense of accomplishment.</p>
              </div>
            </div>
          </div>

          <!-- Focus & Planning -->
          <div class="checklist-section">
            <h2 class="section-title">🎯 Focus & Planning</h2>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Review your top 3 priorities</h3>
                <p>Know what matters most before the day pulls you in different directions.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Plan your first 3 hours</h3>
                <p>Block time for your most important work when your energy is highest.</p>
              </div>
            </div>

            <div class="checklist-item">
              <div class="checkbox" onclick="toggleCheck(this)">✓</div>
              <div class="item-content">
                <h3>Eliminate distractions</h3>
                <p>Put phone on airplane mode, close unnecessary tabs, create focus environment.</p>
              </div>
            </div>
          </div>

          <!-- Quote -->
          <div class="quote">
            "The way you start your day determines the way you live your life."
            <br><strong>— Your Future Self</strong>
          </div>

          <!-- Progress Tracking -->
          <div class="checklist-section">
            <h2 class="section-title">📊 Track Your Progress</h2>
            <p style="text-align: center; margin-bottom: 20px; color: #374151;">Morning Ritual Completion</p>
            <div class="progress-bar">
              <div class="progress-fill" id="progressFill"></div>
            </div>
            <p style="text-align: center; font-size: 0.9rem; color: #6b7280;">Complete items above to see your progress</p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <h3>Consistency Creates Results</h3>
            <p>Complete this ritual daily for 30 days and watch how your life transforms. Small, intentional actions compound into remarkable results.</p>
          </div>
        </div>

        <script>
          function toggleCheck(checkbox) {
            checkbox.classList.toggle('checked');
            checkbox.parentElement.classList.toggle('completed');

            // Update progress
            const totalItems = document.querySelectorAll('.checkbox').length;
            const checkedItems = document.querySelectorAll('.checkbox.checked').length;
            const progress = (checkedItems / totalItems) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
          }

          // Initialize progress on load
          document.addEventListener('DOMContentLoaded', function() {
            const totalItems = document.querySelectorAll('.checkbox').length;
            const checkedItems = document.querySelectorAll('.checkbox.checked').length;
            const progress = (checkedItems / totalItems) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
          });
        </script>
      </body>
      </html>
    `;
  }

  if (product.id === 'ebook-fitness-001') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #1a1a1a;
            background: #ffffff;
          }

          .cover-page {
            background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
            padding: 80px 40px;
            text-align: center;
            color: white;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .cover-page h1 {
            font-size: 2.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            letter-spacing: -0.02em;
          }

          .cover-page .subtitle {
            font-size: 1.4rem;
            font-weight: 400;
            margin-bottom: 30px;
            opacity: 0.95;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .cover-page .author {
            font-size: 1.1rem;
            font-weight: 500;
            opacity: 0.9;
          }

          .container {
            max-width: 750px;
            margin: 0 auto;
            padding: 40px;
          }

          .toc {
            background: #f8fafc;
            padding: 40px;
            border-radius: 12px;
            margin: 40px 0;
            border-left: 4px solid #3b82f6;
          }

          .toc h2 {
            color: #1e40af;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 25px;
          }

          .toc p {
            margin-bottom: 8px;
            color: #374151;
            font-weight: 500;
          }

          .chapter {
            margin-bottom: 50px;
          }

          .chapter h2 {
            color: #1e40af;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
          }

          .chapter p {
            margin-bottom: 18px;
            color: #374151;
            font-size: 1rem;
          }

          .highlight {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            border: 1px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            font-weight: 600;
            color: #1e3a8a;
            text-align: center;
          }

          .key-points {
            background: #f0f9ff;
            border-left: 4px solid #0ea5e9;
            padding: 25px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
          }

          .key-points h3 {
            color: #0c4a6e;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .key-points ul {
            list-style: none;
            padding: 0;
          }

          .key-points li {
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;
            color: #374151;
          }

          .key-points li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #0ea5e9;
            font-weight: bold;
          }

          .action-step {
            background: #ecfdf5;
            border: 1px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
            font-weight: 600;
            color: #064e3b;
          }

          .action-step strong {
            color: #047857;
          }

          @media (max-width: 768px) {
            .cover-page {
              padding: 60px 30px;
            }
            .cover-page h1 {
              font-size: 2.2rem;
            }
            .container {
              padding: 30px 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>The Ultimate Body Transformation Blueprint</h1>
          <p class="subtitle">A Practical Guide to Building Strength, Confidence, and a Sustainable Body</p>
          <p class="author">Author: Daniel R. Whitmore</p>
        </div>

        <div class="container">
          <!-- Table of Contents -->
          <div class="toc">
            <h2>Table of Contents</h2>
            <p><strong>Introduction: This Is Not a Quick Fix</strong></p>
            <p><strong>Chapter 1: Understanding How the Body Really Changes</strong></p>
            <p><strong>Chapter 2: Building a Strong Training Foundation</strong></p>
            <p><strong>Chapter 3: Nutrition Without Obsession or Extremes</strong></p>
            <p><strong>Chapter 4: The Psychology of Lasting Change</strong></p>
            <p><strong>Chapter 5: Lifestyle, Recovery, and Long-Term Health</strong></p>
            <p><strong>Chapter 6: Turning the Blueprint Into a Lifestyle</strong></p>
          </div>

          <!-- Introduction -->
          <div class="chapter">
            <h2>Introduction: This Is Not a Quick Fix</h2>
            <p>Body transformation has become a buzzword. Everywhere you look, there are promises of rapid fat loss, six-pack abs in 30 days, or radical physical changes with minimal effort. Most of these promises fail because they are built on unrealistic expectations and short-term thinking.</p>

            <p>This book was written to offer something different: a realistic, human, and sustainable approach to transforming your body and your life. The goal is not perfection—it is progress.</p>

            <div class="highlight">
              <strong>True transformation happens when physical change aligns with mental clarity, healthy habits, and patience.</strong>
            </div>

            <p>Your body is not a machine that can be hacked overnight; it is a living system that adapts slowly and intelligently when treated with consistency and respect.</p>

            <div class="key-points">
              <h3>This Blueprint Assumes:</h3>
              <ul>
                <li>No special genetics required</li>
                <li>No elite background needed</li>
                <li>No extreme measures necessary</li>
              </ul>
            </div>

            <p>All it asks is honesty, effort, and commitment to the process. If you apply what you learn here patiently, your transformation will not only last—it will redefine how you see yourself.</p>
          </div>

          <!-- Chapter 1 Preview -->
          <div class="chapter">
            <h2>Chapter 1: Understanding How the Body Really Changes</h2>
            <p>Before any real transformation can begin, you must understand how your body actually changes. Many people fail not because they lack discipline, but because they follow strategies that contradict basic physiology.</p>

            <div class="action-step">
              <strong>Remember:</strong> The human body operates according to biological laws, not motivation or wishful thinking.
            </div>

            <p>At the core of physical change lies energy balance. Fat loss occurs when your body consistently uses more energy than it receives. Muscle growth occurs when training stimulus, recovery, and nutrition align.</p>

            <p>These processes happen slowly, often invisibly at first, and they demand patience. There is no shortcut that overrides this reality.</p>
          </div>

          <!-- Chapter 2 Preview -->
          <div class="chapter">
            <h2>Chapter 2: Building a Strong Training Foundation</h2>
            <p>Training is the most visible part of any transformation, but it is also the most misunderstood. More is not always better. Smarter is better.</p>

            <p>Effective training focuses on progressive overload, proper technique, and recovery. Strength training should form the backbone of your program.</p>

            <div class="key-points">
              <h3>Key Training Principles:</h3>
              <ul>
                <li>Compound movements recruit multiple muscle groups</li>
                <li>Progressive overload means doing slightly more over time</li>
                <li>Mastery of fundamentals beats endless variation</li>
                <li>Recovery is when muscles grow and adapt</li>
              </ul>
            </div>
          </div>

          <!-- Chapter 3 Preview -->
          <div class="chapter">
            <h2>Chapter 3: Nutrition Without Obsession or Extremes</h2>
            <p>Nutrition is often where transformation becomes unnecessarily complicated. In reality, successful nutrition is built on simplicity, awareness, and consistency—not restriction or fear.</p>

            <div class="action-step">
              <strong>Focus first on total intake and food quality. Refinement comes later.</strong>
            </div>

            <p>Whole foods such as lean proteins, fruits, vegetables, whole grains, and healthy fats support energy, recovery, and satiety. Flexible approaches work better than rigid diets.</p>
          </div>

          <!-- Chapter 4 Preview -->
          <div class="chapter">
            <h2>Chapter 4: The Psychology of Lasting Change</h2>
            <p>Physical transformation is impossible without psychological transformation. Motivation is unreliable. Discipline built through habits is reliable.</p>

            <p>Your identity shapes your actions. When you begin to see yourself as someone who trains, eats well, and respects their body, decisions become easier.</p>

            <div class="key-points">
              <h3>Process-Focused Goals:</h3>
              <ul>
                <li>Workouts completed</li>
                <li>Meals prepared</li>
                <li>Sleep hours achieved</li>
              </ul>
            </div>
          </div>

          <!-- Chapter 5 Preview -->
          <div class="chapter">
            <h2>Chapter 5: Lifestyle, Recovery, and Long-Term Health</h2>
            <p>Your body does not exist only in the gym or the kitchen. Sleep, stress, movement, and environment shape your results.</p>

            <p>Sleep is the most powerful recovery tool available. Daily movement improves recovery and metabolic health. Stress management is not optional.</p>

            <div class="highlight">
              <strong>Health is the foundation upon which aesthetics are built. A strong body is valuable only if it supports a full life.</strong>
            </div>
          </div>

          <!-- Chapter 6 Preview -->
          <div class="chapter">
            <h2>Chapter 6: Turning the Blueprint Into a Lifestyle</h2>
            <p>The final goal of transformation is autonomy. You should not need a coach, app, or program forever.</p>

            <p>Review progress regularly. Adjust intake, training, and recovery based on real feedback. Small corrections prevent major setbacks.</p>

            <div class="action-step">
              <strong>When your habits align with your values, your body becomes a reflection of your lifestyle—not a project to fix.</strong>
            </div>

            <p>This is the ultimate blueprint: not just for changing your body, but for building a life of strength, discipline, and confidence.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'course-blueprint-business-004') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=League+Spartan:wght@400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Inter', sans-serif;
            color: #111827;
            background: linear-gradient(135deg, #F9FAFB 0%, #ffffff 100%);
            line-height: 1.7;
            font-size: 16px;
            margin: 0;
            padding: 40px;
          }
          .cover-page {
            text-align: center;
            background: linear-gradient(135deg, #000000 0%, #374151 50%, #111827 100%);
            color: white;
            padding: 60px 40px;
            border-radius: 20px;
            margin-bottom: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            position: relative;
            overflow: hidden;
          }
          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="elegant" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="gold" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="gold" opacity="0.1"/><rect x="45" y="45" width="10" height="10" fill="none" stroke="gold" stroke-width="0.5" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23elegant)"/></svg>');
            opacity: 0.3;
          }
          .cover-page h1 {
            font-family: 'League Spartan', sans-serif;
            font-size: 3rem;
            font-weight: 800;
            margin: 0 0 20px 0;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            position: relative;
            z-index: 1;
            color: #D4AF37;
          }
          .cover-page .subtitle {
            font-size: 1.4rem;
            margin: 15px 0;
            opacity: 0.95;
            position: relative;
            z-index: 1;
            font-family: 'Inter', sans-serif;
          }
          .cover-page .author {
            font-size: 1.1rem;
            opacity: 0.9;
            position: relative;
            z-index: 1;
            font-family: 'Poppins', sans-serif;
          }
          .toc {
            background: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            border: 2px solid rgba(0, 0, 0, 0.1);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }
          .toc h2 {
            font-family: 'League Spartan', sans-serif;
            color: #000000;
            font-size: 2rem;
            margin: 0 0 20px 0;
            text-align: center;
          }
          .toc p {
            color: #111827;
            margin: 8px 0;
            font-size: 1.1rem;
            padding: 5px 0;
          }
          .chapter {
            background: #ffffff;
            border-left: 4px solid #000000;
            padding: 30px;
            margin: 30px 0;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.1);
          }
          .chapter h3 {
            font-family: 'League Spartan', sans-serif;
            color: #000000;
            font-size: 1.8rem;
            margin: 0 0 20px 0;
          }
          .chapter p {
            color: #111827;
            margin-bottom: 18px;
            line-height: 1.8;
          }
          .highlight {
            background: rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 12px;
            margin: 20px 0;
            border-left: 4px solid #D4AF37;
          }
          .highlight strong {
            color: #000000;
            font-weight: 600;
          }
          .module-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 25px 0;
          }
          .module-card {
            background: #f8fafc;
            padding: 20px;
            border-radius: 10px;
            border-left: 3px solid #D4AF37;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }
          .module-card h4 {
            font-family: 'League Spartan', sans-serif;
            color: #000000;
            margin: 0 0 10px 0;
            font-size: 1.2rem;
          }
          .module-card p {
            color: #374151;
            margin: 0;
            font-size: 0.95rem;
          }
          @media (max-width: 768px) {
            body {
              padding: 20px;
              font-size: 14px;
            }
            .cover-page {
              padding: 40px 20px;
            }
            .cover-page h1 {
              font-size: 2.2rem;
            }
            .module-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Online Business Launch Blueprint</h1>
          <p class="subtitle">Launch Your Profitable Online Business in 30 Days</p>
          <p class="author">by Business Strategist</p>
        </div>

        <!-- Table of Contents -->
        <div class="toc">
          <h2>Complete Course Structure</h2>
          <p><strong>Module 1: Business Foundation & Mindset</strong></p>
          <p><strong>Module 2: Market Research & Niche Selection</strong></p>
          <p><strong>Module 3: Product Creation & Validation</strong></p>
          <p><strong>Module 4: Marketing & Sales Funnels</strong></p>
          <p><strong>Module 5: Launch Strategy & Execution</strong></p>
          <p><strong>Module 6: Scaling & Optimization</strong></p>
        </div>

        <!-- Module Overview -->
        <div class="chapter">
          <h3>📚 Module 1: Business Foundation & Mindset</h3>
          <p>Build the mental foundation for entrepreneurial success. Learn how to think like a successful business owner and develop the mindset needed to overcome challenges and persist through setbacks.</p>

          <div class="highlight">
            <strong>Key Topics: Entrepreneurial psychology, goal setting, overcoming limiting beliefs, building business confidence.</strong>
          </div>

          <h3>🎯 Module 2: Market Research & Niche Selection</h3>
          <p>Discover profitable markets and identify underserved niches. Learn advanced research techniques to validate business ideas before investing time and money.</p>

          <h3>💡 Module 3: Product Creation & Validation</h3>
          <p>Develop products that customers actually want to buy. Master the art of creating digital products, services, and offers that solve real problems.</p>
        </div>

        <div class="chapter">
          <h3>📢 Module 4: Marketing & Sales Funnels</h3>
          <p>Build automated marketing systems that attract, nurture, and convert prospects into paying customers. Learn the psychology of persuasion and copywriting.</p>

          <div class="highlight">
            <strong>Key Topics: Email marketing, social media advertising, sales page creation, conversion optimization.</strong>
          </div>

          <h3>🚀 Module 5: Launch Strategy & Execution</h3>
          <p>Execute a profitable product launch that generates immediate revenue and builds momentum. Learn pre-launch, launch, and post-launch strategies.</p>

          <h3>📈 Module 6: Scaling & Optimization</h3>
          <p>Take your business from $0 to $10K/month and beyond. Master systems for sustainable growth, outsourcing, and business automation.</p>
        </div>

        <!-- Course Features -->
        <div class="chapter">
          <h3>🎓 Course Features & Bonuses</h3>
          <div class="module-grid">
            <div class="module-card">
              <h4>📹 Video Lessons</h4>
              <p>120+ HD video lessons with step-by-step instructions</p>
            </div>
            <div class="module-card">
              <h4>📋 Worksheets</h4>
              <p>Actionable templates and checklists for each module</p>
            </div>
            <div class="module-card">
              <h4>💬 Private Community</h4>
              <p>Access to exclusive Facebook group for support</p>
            </div>
            <div class="module-card">
              <h4>🔄 Lifetime Updates</h4>
              <p>Free updates as strategies evolve</p>
            </div>
          </div>

          <div class="highlight">
            <strong>Plus: 30-Day Money-Back Guarantee • Mobile Access • Certificate of Completion</strong>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'ebook-fitness-clients-007') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #7f1d1d;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 50%, #fecaca 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
            padding: 80px 40px;
            text-align: center;
            color: white;
            min-height: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            letter-spacing: -0.02em;
            color: #fef2f2;
            line-height: 1.2;
          }

          .cover-page .subtitle {
            font-size: 1.4rem;
            font-weight: 500;
            margin-bottom: 30px;
            opacity: 0.95;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            color: #fecaca;
          }

          .cover-page .author {
            font-size: 1.2rem;
            font-weight: 600;
            opacity: 0.9;
            color: #fca5a5;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }

          .coach-intro {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(220, 38, 38, 0.3);
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 40px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.1);
          }

          .coach-intro .coach-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            display: block;
          }

          .coach-intro h2 {
            color: #991b1b;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .coach-intro p {
            color: #374151;
            font-size: 1.1rem;
            max-width: 650px;
            margin: 0 auto;
            line-height: 1.6;
          }

          .strategy-section {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 35px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.2);
          }

          .strategy-section h2 {
            color: #991b1b;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #dc2626;
            display: flex;
            align-items: center;
          }

          .strategy-section h2::before {
            content: "🎯";
            margin-right: 12px;
            font-size: 1.5rem;
          }

          .strategy-section p {
            color: #374151;
            font-size: 1rem;
            margin-bottom: 18px;
            line-height: 1.7;
          }

          .action-highlight {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-left: 4px solid #dc2626;
            padding: 25px;
            margin: 25px 0;
            border-radius: 0 12px 12px 0;
            font-weight: 600;
            text-align: center;
          }

          .action-highlight p {
            color: #7f1d1d;
            margin: 0;
            font-size: 1.1rem;
          }

          .strategy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .strategy-card {
            background: #ffffff;
            border: 2px solid #fecaca;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
          }

          .strategy-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.2);
            border-color: #dc2626;
          }

          .strategy-card .strategy-number {
            background: #dc2626;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 700;
            margin: 0 auto 15px;
          }

          .strategy-card .strategy-title {
            color: #991b1b;
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .strategy-card .strategy-desc {
            color: #374151;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .implementation-section {
            background: rgba(255, 255, 255, 0.95);
            border: 2px solid rgba(220, 38, 38, 0.3);
            border-radius: 16px;
            padding: 35px;
            margin: 30px 0;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.1);
          }

          .implementation-section h3 {
            color: #991b1b;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 20px;
            text-align: center;
          }

          .implementation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }

          .implementation-item {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            transition: transform 0.2s ease;
          }

          .implementation-item:hover {
            transform: scale(1.02);
          }

          .implementation-item .impl-icon {
            font-size: 2rem;
            margin-bottom: 15px;
            display: block;
          }

          .implementation-item .impl-title {
            color: #991b1b;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .implementation-item .impl-desc {
            color: #374151;
            font-size: 0.9rem;
            line-height: 1.4;
          }

          .success-stories {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            border-radius: 16px;
            padding: 35px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.2);
          }

          .success-stories h3 {
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .success-stories p {
            font-size: 1.1rem;
            margin-bottom: 20px;
            opacity: 0.95;
          }

          .success-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 25px;
          }

          .stat-item {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 20px;
          }

          .stat-item .stat-number {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 5px;
          }

          .stat-item .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
          }

          .client-formula {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 35px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.1);
          }

          .client-formula h3 {
            color: #991b1b;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .formula-steps {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 25px 0;
          }

          .formula-step {
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            position: relative;
          }

          .formula-step::before {
            content: "→";
            position: absolute;
            right: -15px;
            top: 50%;
            transform: translateY(-50%);
            color: #dc2626;
            font-size: 1.5rem;
            font-weight: bold;
          }

          .formula-step:last-child::before {
            display: none;
          }

          .formula-step .step-number {
            color: #dc2626;
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 10px;
          }

          .formula-step .step-title {
            color: #991b1b;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .formula-step .step-desc {
            color: #374151;
            font-size: 0.9rem;
          }

          .conclusion {
            background: linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%);
            color: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            margin-top: 40px;
            box-shadow: 0 8px 32px rgba(127, 29, 29, 0.3);
          }

          .conclusion h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .conclusion p {
            font-size: 1.1rem;
            margin-bottom: 20px;
            opacity: 0.95;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .conclusion .final-message {
            font-size: 1.3rem;
            font-weight: 600;
            color: #fca5a5;
          }

          @media (max-width: 768px) {
            .cover-page {
              padding: 60px 30px;
            }
            .cover-page h1 {
              font-size: 2.2rem;
            }
            .container {
              padding: 30px 20px;
            }
            .strategy-grid {
          }
        </style>
      </head>
      <body>
        <!-- How to Attract More Fitness Clients -->
        <div class="cover-page">
          <h1>How to Attract More Fitness Clients</h1>
          <p class="subtitle">A Mini Guide for Coaches</p>
          <p class="author">By Fitness Coach Expert</p>
        </div>

        <div class="container">
          <!-- Coach Introduction -->
          <div class="coach-intro">
            <span class="coach-icon">💪</span>
            <h2>Stop Struggling to Find Clients</h2>
            <p>Attracting fitness clients isn't about having the flashiest Instagram or the most expensive equipment—it's about connecting with people in a meaningful way, building trust, and showing real value.</p>
          </div>

          <p>Complete guide with 7 proven strategies coming soon...</p>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'ebook-mindful-living-006') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'League Spartan', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.7;
            color: #2d5a27;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #166534 0%, #14532d 50%, #1a2e05 100%);
            padding: 80px 40px;
            text-align: center;
            color: white;
            min-height: 450px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0%, transparent 50%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-size: 3.2rem;
            font-weight: 800;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            letter-spacing: -0.02em;
            color: #ecfdf5;
          }

          .cover-page .subtitle {
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 30px;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            color: #d1fae5;
          }

          .cover-page .author {
            font-size: 1.2rem;
            font-weight: 600;
            opacity: 0.9;
            color: #a7f3d0;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .container {
            max-width: 750px;
            margin: 0 auto;
            padding: 40px;
          }

          .chapter {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 35px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.2);
          }

          .chapter h2 {
            color: #166534;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #22c55e;
            display: flex;
            align-items: center;
          }

          .chapter h2::before {
            content: "🧘";
            margin-right: 12px;
            font-size: 1.5rem;
          }

          .chapter p {
            color: #374151;
            font-size: 1rem;
            margin-bottom: 18px;
            line-height: 1.7;
          }

          .mindfulness-quote {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-left: 4px solid #22c55e;
            padding: 30px;
            margin: 30px 0;
            border-radius: 0 16px 16px 0;
            font-style: italic;
            text-align: center;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.1);
          }

          .mindfulness-quote p {
            color: #065f46;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 10px;
          }

          @media (max-width: 768px) {
            .cover-page {
              padding: 60px 30px;
            }
            .cover-page h1 {
              font-size: 2.4rem;
            }
            .container {
              padding: 30px 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>The Art of Mindful Living</h1>
          <p class="subtitle">A Practical Guide to Presence, Compassion, and Inner Peace</p>
          <p class="author">By Daniel Rowan Hartley</p>
        </div>

        <div class="container">
          <!-- Chapter 1 -->
          <div class="chapter">
            <h2>Chapter 1: Awakening to the Present Moment</h2>
            <p>Modern life moves quickly. We wake to alarms, scroll through news, rush through meals, and fall asleep exhausted, often with the feeling that the day has somehow passed without us fully being there. Mindful living begins with a simple yet radical shift: awakening to the present moment. This chapter explores what it truly means to be present and why this awareness forms the foundation of a meaningful, balanced life.</p>

            <p>Mindfulness is not about escaping reality or achieving a permanent state of calm. Instead, it is the practice of noticing what is already happening—within us and around us—without judgment. The present moment is the only place where life actually unfolds. The past exists as memory, the future as imagination, but the present is where breath is felt, where decisions are made, and where connection is possible.</p>

            <p>Many people believe they are present simply because they are physically somewhere. Yet presence is not physical proximity; it is mental and emotional engagement. You may be sitting with a loved one while your mind rehearses tomorrow's tasks. In such moments, the body is present, but awareness is not. Mindfulness gently brings awareness back, again and again, to what is real right now.</p>

            <p>Developing this awareness begins with noticing the breath. The breath is always available and always happening in the present moment. You do not need to change it, control it, or perfect it. Simply feeling the air enter and leave the body creates a natural anchor for attention. When the mind wanders—as it inevitably will—the practice is not to criticize yourself, but to notice the wandering and return to the breath with kindness.</p>

            <p>Being present also means allowing experiences to be as they are. This can feel uncomfortable at first. We are accustomed to resisting unpleasant sensations and clinging to pleasant ones. Mindfulness invites a different approach: curiosity. When stress arises, can you notice where it appears in the body? When joy appears, can you fully inhabit it without fear of losing it? Presence does not eliminate discomfort, but it changes our relationship with it.</p>

            <p>Another key aspect of awakening to the present moment is slowing down. Slowness is not laziness; it is intentionality. When we slow our movements, our speech, and our consumption of information, we create space to notice. Even small pauses—taking a breath before responding, feeling your feet touch the ground as you walk—can transform ordinary moments into opportunities for awareness.</p>

            <div class="mindfulness-quote">
              <p>Mindfulness is not something to achieve once and for all. It is a lifelong practice, unfolding moment by moment.</p>
            </div>

            <p>As you move through the rest of this book, remember that mindful living is not about becoming someone else. It is about becoming more fully yourself by meeting each moment with openness. Awakening to the present moment is the first step on this path—a step that is always available, no matter where you are or what is happening.</p>
          </div>

          <!-- Chapter 2 -->
          <div class="chapter">
            <h2>Chapter 2: Understanding the Mind and Its Habits</h2>
            <p>To live mindfully, we must begin to understand the nature of the mind itself. The mind is a powerful tool, capable of creativity, problem-solving, and deep insight. Yet it also has habits that can pull us away from presence and into patterns of stress, fear, and dissatisfaction. This chapter explores how the mind works and how mindfulness helps us relate to it more wisely.</p>

            <p>The human mind is constantly generating thoughts. This is not a flaw; it is simply what minds do. Thoughts arise about the past, the future, ourselves, and others—often without invitation. Problems occur not because thoughts exist, but because we tend to believe them unquestioningly. We assume that every thought reflects truth, even when it is shaped by fear, conditioning, or incomplete information.</p>

            <p>Mindfulness introduces an important shift: instead of being inside our thoughts, we begin to observe them. When we notice a thought such as "I am not good enough," we can recognize it as a mental event rather than an absolute fact. This distance creates freedom. We can choose how to respond instead of reacting automatically.</p>

            <p>One of the most common habits of the mind is rumination—replaying past events and imagining alternative outcomes. While reflection can be useful, rumination often leads to regret and self-criticism. Another habit is worry, in which the mind projects into the future, imagining potential threats. Both patterns pull us away from the present moment and activate stress responses in the body.</p>

            <p>Through mindfulness, we learn to gently interrupt these cycles. When you notice the mind replaying a conversation from yesterday, you can acknowledge it without judgment and return attention to what is happening now. This does not mean suppressing thoughts; it means allowing them to arise and pass without feeding them excessive energy.</p>

            <p>The mind also forms stories about who we are. These stories may include labels, identities, and roles we have adopted over time. While these narratives help us navigate society, they can become limiting when we mistake them for our true nature. Mindfulness helps us see that we are not confined to any single story. We are dynamic, changing, and far more complex than any label.</p>

            <p>Another important aspect of understanding the mind is recognizing emotional patterns. Emotions often arrive alongside thoughts and bodily sensations. Instead of pushing emotions away or being overwhelmed by them, mindfulness encourages us to feel them directly. By noticing where an emotion lives in the body—tightness, warmth, movement—we can relate to it with compassion rather than resistance.</p>

            <p>Over time, this awareness builds emotional resilience. We may still experience sadness, anger, or fear, but we are less likely to be controlled by them. We learn that emotions are temporary visitors, not permanent states. This understanding creates space for wiser choices and kinder self-talk.</p>

            <p>Ultimately, understanding the mind is not about controlling it, but about befriending it. When we approach our inner world with patience and curiosity, we transform the mind from a source of suffering into a source of insight. This relationship forms a crucial pillar of mindful living and prepares us for deeper practices in the chapters ahead.</p>
          </div>

          <!-- Chapter 3 -->
          <div class="chapter">
            <h2>Chapter 3: Cultivating Awareness Through Daily Practices</h2>
            <p>Mindfulness becomes tangible when integrated into daily life. It is not reserved for formal meditation sessions; rather, it is most powerful when woven into everyday routines. From brushing your teeth to preparing meals, walking to work, or engaging in conversations, each activity offers an opportunity to cultivate awareness. In this chapter, we explore practical ways to bring mindfulness into the fabric of daily existence.</p>

            <p>One foundational practice is mindful observation. This involves directing attention fully to a single object or experience. For example, while drinking tea, notice the warmth of the cup, the aroma, the subtle taste, and the sensations as the liquid moves through the body. By immersing yourself in these small details, the mind learns to focus on what is happening right now, rather than drifting into past regrets or future anxieties.</p>

            <p>Mindful movement is another powerful tool. Activities such as walking, stretching, or gentle yoga can serve as anchors for attention. Focus on the rhythm of the steps, the pressure of your feet against the ground, or the movement of muscles and joints. By engaging the body fully, the mind becomes steadier and calmer.</p>

            <p>Listening attentively in conversations is an often-overlooked form of mindfulness. Instead of planning your response while someone is speaking, strive to hear words fully and feel the nuances of tone, emotion, and intention. This practice not only deepens personal relationships but also fosters empathy and patience.</p>

            <p>Journaling can also enhance mindful awareness. Writing without judgment or editing allows thoughts and feelings to surface naturally. By observing patterns in your writing, you gain insight into recurring emotions, triggers, and mental habits, fostering self-understanding and self-compassion.</p>

            <p>Incorporating pauses throughout the day is another simple but effective strategy. Before transitioning from one task to another, take a deep breath, notice how you feel, and set an intention for the next moment. These micro-pauses create continuity between awareness and action, reminding the mind that presence is always available.</p>

            <p>Digital mindfulness is increasingly relevant in our hyperconnected world. Social media, notifications, and multitasking often fragment attention. Designate specific periods for focused work or reflection and limit distractions. Mindful use of technology encourages clarity, intentionality, and reduces mental clutter.</p>

            <p>Ultimately, daily practices are about consistency rather than intensity. Even brief moments of attention, repeated over time, cultivate a more present and balanced life. The aim is not to perfect every moment, but to create a life rhythm in which awareness naturally flourishes.</p>

            <p>In embracing these practices, you gradually shift from living on autopilot to inhabiting each day with intention. The smallest acts—drinking water, walking, listening—become gateways to mindfulness. As these habits deepen, they form a foundation upon which more advanced practices, such as conscious compassion and ethical living, can flourish.</p>
          </div>

          <!-- Chapter 4 -->
          <div class="chapter">
            <h2>Chapter 4: The Power of Compassion and Self-Kindness</h2>
            <p>Mindfulness is deeply intertwined with compassion. Awareness alone is powerful, but when paired with kindness toward ourselves and others, it becomes transformative. Compassion allows us to move beyond self-judgment, cultivate empathy, and nurture more meaningful connections. In this chapter, we explore how mindful awareness naturally leads to compassionate living and practical strategies for developing self-kindness.</p>

            <p>Self-compassion begins with acknowledging our humanity. Life is imperfect, and all individuals experience suffering, disappointment, and failure. By recognizing that we are not alone in our struggles, we reduce the tendency to criticize ourselves harshly. Instead of thinking, "I shouldn't feel this way," we can say, "It's natural to feel this, and I can be gentle with myself." This simple shift creates emotional space and resilience.</p>

            <p>Practices such as loving-kindness meditation can strengthen compassion. By silently repeating phrases like, "May I be safe, may I be happy, may I be at peace," we train the mind to direct kindness inward. Gradually, this practice can extend to others, from loved ones to acquaintances, and eventually even toward those we find challenging. Compassion becomes a habit, not a fleeting emotion.</p>

            <p>Compassion is also expressed through action. Mindful living encourages small gestures of care—helping someone without expectation, listening without interrupting, or offering words of encouragement. These actions, however modest, reinforce the neural pathways of empathy and increase our sense of connectedness.</p>

            <p>Self-kindness includes noticing when we are overly critical and deliberately countering it. For instance, if you catch yourself ruminating on a mistake, pause and ask, "Would I speak this way to a friend?" Often, the answer is no. By responding with the same kindness we would show another, we build a sustainable inner dialogue that supports growth rather than self-doubt.</p>

            <p>Another vital aspect is compassion for our emotions. Instead of suppressing anger, sadness, or fear, mindfulness invites us to observe them without judgment. Feeling these emotions with curiosity and care helps them move through us more smoothly. This does not mean condoning harmful behavior but recognizing the emotion as part of the human experience.</p>

            <p>Finally, cultivating compassion can shift our broader perspective. We begin to see that everyone struggles, everyone has fears and insecurities. This awareness softens rigid judgments, reduces conflict, and fosters a more harmonious environment. Mindfulness and compassion together create a foundation for both personal peace and meaningful relationships.</p>
          </div>

          <!-- Chapter 5 -->
          <div class="chapter">
            <h2>Chapter 5: Emotional Resilience and Balance</h2>
            <p>Mindful living equips us with tools to face life's inevitable challenges with clarity and calm. Emotional resilience is not about avoiding pain or suppressing feelings; it is about responding to them wisely. This chapter delves into how mindfulness strengthens our capacity to navigate stress, maintain balance, and cultivate inner stability.</p>

            <p>One key aspect of emotional resilience is awareness of triggers. Mindfulness allows us to notice which situations, thoughts, or interactions provoke strong emotional reactions. By observing these triggers without immediately reacting, we create a moment of choice—a pause where we can respond with intention rather than impulse.</p>

            <p>Breathwork and body awareness are vital in managing intense emotions. When anxiety or anger arises, focusing on slow, deliberate breathing helps regulate the nervous system. Paying attention to bodily sensations—tightness in the chest, tension in the shoulders, or a knot in the stomach—helps ground the mind and prevent emotional escalation.</p>

            <p>Another practice is reframing. Mindfulness encourages us to view challenges from a wider perspective. Instead of labeling a setback as catastrophic, we can see it as a temporary event and an opportunity for learning. This shift does not negate the difficulty of the moment but empowers us to act with clarity and composure.</p>

            <p>Cultivating gratitude also supports emotional balance. Regularly acknowledging positive aspects of life—however small—shifts focus away from what is lacking or distressing. Gratitude exercises, such as journaling or mindful reflection, strengthen positive neural pathways, increasing overall emotional well-being.</p>

            <p>Resilience also grows through self-compassion. When we fail or experience disappointment, treating ourselves with the same kindness we would offer a friend buffers the impact of negative emotions. This self-care prevents spiraling into self-criticism and supports recovery from challenging experiences.</p>

            <p>Finally, social connection plays a critical role in emotional balance. Mindful listening, empathy, and authentic engagement with others foster a support network that provides perspective, comfort, and shared understanding. By combining mindfulness with compassion, we strengthen both internal and external resources for navigating life's ups and downs.</p>

            <div class="mindfulness-quote">
              <p>Emotional resilience is a skill developed over time, with patience and persistence. Mindfulness provides the structure and awareness necessary to recognize emotional patterns, intervene skillfully, and respond with both strength and gentleness.</p>
            </div>

            <p>As we cultivate this resilience, we create a stable foundation for a more peaceful, adaptive, and fulfilling life.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'worksheet-belly-fat-007') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #065f46 0%, #047857 50%, #064e3b 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Roboto', sans-serif;
            font-size: 3.3rem;
            font-weight: 700;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.03em;
            color: #ecfdf5;
            line-height: 1.1;
          }

          .cover-page .subtitle {
            font-size: 1.6rem;
            font-weight: 500;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            color: #d1fae5;
            font-family: 'Inter', sans-serif;
          }

          .cover-page .author {
            font-size: 1.2rem;
            font-weight: 600;
            opacity: 0.9;
            color: #a7f3d0;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Roboto', sans-serif;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }

          .section {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(234, 88, 12, 0.1);
            border: 1px solid rgba(234, 88, 12, 0.2);
          }

          .section h2 {
            color: #9a3412;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #ea580c;
            display: flex;
            align-items: center;
          }

          .section h2::before {
            content: "🎯";
            margin-right: 12px;
            font-size: 1.5rem;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .input-label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1rem;
          }

          .input-field, .textarea-field {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #d97706;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'League Spartan', sans-serif;
            transition: border-color 0.2s ease;
            background: #ffffff;
          }

          .input-field:focus, .textarea-field:focus {
            outline: none;
            border-color: #ea580c;
            box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
          }

          .textarea-field {
            min-height: 80px;
            resize: vertical;
          }

          .checkbox-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
          }

          .checkbox-item {
            display: flex;
            align-items: center;
            padding: 12px;
            background: #fef3c7;
            border-radius: 8px;
            border: 1px solid #f59e0b;
          }

          .checkbox-item input[type="checkbox"] {
            margin-right: 10px;
            width: 18px;
            height: 18px;
          }

          .checkbox-item label {
            color: #92400e;
            font-weight: 500;
            cursor: pointer;
          }

          .progress-tracker {
            background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
          }

          .progress-tracker h3 {
            color: #9a3412;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .progress-bar {
            background: #e5e7eb;
            border-radius: 20px;
            height: 12px;
            margin: 15px 0;
            overflow: hidden;
          }

          .progress-fill {
            background: linear-gradient(90deg, #ea580c 0%, #dc2626 100%);
            height: 100%;
            width: 0%;
            border-radius: 20px;
            transition: width 0.3s ease;
          }

          .meal-tracker {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 25px 0;
          }

          .meal-card {
            background: #ffffff;
            border: 2px solid #fed7aa;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
          }

          .meal-card h4 {
            color: #9a3412;
            font-size: 1.1rem;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .meal-input {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #d97706;
            border-radius: 6px;
            font-size: 0.9rem;
            margin-bottom: 8px;
          }

          @media (max-width: 768px) {
            .cover-page {
              padding: 60px 30px;
            }
            .cover-page h1 {
              font-size: 2.2rem;
            }
            .container {
              padding: 30px 20px;
            }
            .checkbox-grid {
              grid-template-columns: 1fr;
            }
            .meal-tracker {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Lose Belly Fat Worksheet</h1>
          <p class="subtitle">30-Day Targeted Fat Loss Program with Exercise & Nutrition Tracking</p>
          <p class="author">By Fitness Nutrition Expert</p>
        </div>

        <div class="container">
          <!-- Personal Assessment -->
          <div class="section">
            <h2>Step 1: Your Starting Point</h2>
            <div class="input-group">
              <label class="input-label">Current Weight (lbs/kg)</label>
              <input type="text" class="input-field" placeholder="Enter your current weight">
            </div>

            <div class="input-group">
              <label class="input-label">Waist Measurement (inches/cm)</label>
              <input type="text" class="input-field" placeholder="Measure around your belly button">
            </div>

            <div class="input-group">
              <label class="input-label">Body Fat Percentage (if known)</label>
              <input type="text" class="input-field" placeholder="Optional: from calipers, DEXA, etc.">
            </div>

            <div class="input-group">
              <label class="input-label">Your Belly Fat Loss Goal</label>
              <textarea class="textarea-field" placeholder="Be specific: Lose 2 inches in 30 days, reduce to 32-inch waist, etc."></textarea>
            </div>

            <div class="input-group">
              <label class="input-label">Timeline</label>
              <input type="text" class="input-field" placeholder="30 days, 60 days, etc.">
            </div>
          </div>

          <!-- Daily Exercise Checklist -->
          <div class="section">
            <h2>Step 2: Daily Exercise Routine</h2>
            <p style="color: #374151; margin-bottom: 20px;">Complete these exercises daily for maximum belly fat reduction. Focus on compound movements and core work.</p>

            <div class="checkbox-grid">
              <div class="checkbox-item">
                <input type="checkbox" id="plank">
                <label for="plank">Plank (30-60 seconds)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="crunches">
                <label for="crunches">Bicycle Crunches (3x15)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="mountain">
                <label for="mountain">Mountain Climbers (3x20)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="russian">
                <label for="russian">Russian Twists (3x20)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="burpees">
                <label for="burpees">Burpees (3x10)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="squats">
                <label for="squats">Squats (3x15)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="lunges">
                <label for="lunges">Walking Lunges (3x10 per leg)</label>
              </div>
              <div class="checkbox-item">
                <input type="checkbox" id="cardio">
                <label for="cardio">20-min HIIT Cardio</label>
              </div>
            </div>
          </div>

          <!-- Nutrition Tracking -->
          <div class="section">
            <h2>Step 3: Nutrition & Calorie Tracking</h2>
            <p style="color: #374151; margin-bottom: 20px;">Track your meals and maintain a calorie deficit of 500 calories per day for 1lb weekly fat loss.</p>

            <div class="meal-tracker">
              <div class="meal-card">
                <h4>Breakfast</h4>
                <input type="text" class="meal-input" placeholder="Oatmeal with berries">
                <input type="text" class="meal-input" placeholder="Calories: 350">
              </div>
              <div class="meal-card">
                <h4>Lunch</h4>
                <input type="text" class="meal-input" placeholder="Grilled chicken salad">
                <input type="text" class="meal-input" placeholder="Calories: 450">
              </div>
              <div class="meal-card">
                <h4>Dinner</h4>
                <input type="text" class="meal-input" placeholder="Fish with vegetables">
                <input type="text" class="meal-input" placeholder="Calories: 400">
              </div>
              <div class="meal-card">
                <h4>Snacks</h4>
                <input type="text" class="meal-input" placeholder="Greek yogurt, apple">
                <input type="text" class="meal-input" placeholder="Calories: 200">
              </div>
            </div>

            <div class="input-group">
              <label class="input-label">Daily Water Intake</label>
              <input type="text" class="input-field" placeholder="Glasses/cups: 8-10 minimum">
            </div>
          </div>

          <!-- Weekly Progress -->
          <div class="section">
            <h2>Step 4: Weekly Measurements</h2>
            <div class="input-group">
              <label class="input-label">Week 1 Weight</label>
              <input type="text" class="input-field" placeholder="Starting weight">
            </div>
            <div class="input-group">
              <label class="input-label">Week 1 Waist</label>
              <input type="text" class="input-field" placeholder="Starting measurement">
            </div>
            <div class="input-group">
              <label class="input-label">Week 2 Progress</label>
              <textarea class="textarea-field" placeholder="How do you feel? Any changes noticed?"></textarea>
            </div>
          </div>

          <!-- Motivation & Accountability -->
          <div class="section">
            <h2>Step 5: Stay Motivated</h2>
            <div class="input-group">
              <label class="input-label">Why do you want to lose belly fat?</label>
              <textarea class="textarea-field" placeholder="Health, confidence, fitting into clothes, etc."></textarea>
            </div>

            <div class="input-group">
              <label class="input-label">Accountability Partner</label>
              <input type="text" class="input-field" placeholder="Friend, family member, or coach name">
            </div>

            <div class="input-group">
              <label class="input-label">Weekly Reward</label>
              <input type="text" class="input-field" placeholder="New workout clothes, massage, etc.">
            </div>
          </div>

          <!-- Progress Tracker -->
          <div class="progress-tracker">
            <h3>Your 30-Day Progress</h3>
            <div class="progress-bar">
              <div class="progress-fill" id="progressFill"></div>
            </div>
            <p style="color: #6b7280; margin-top: 10px;">Track your consistency with daily check-ins</p>
          </div>
        </div>

        <script>
          // Simple progress tracking
          document.addEventListener('DOMContentLoaded', function() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const progressFill = document.getElementById('progressFill');

            function updateProgress() {
              const checked = document.querySelectorAll('input[type="checkbox"]:checked').length;
              const total = checkboxes.length;
              const percentage = (checked / total) * 100;
              progressFill.style.width = percentage + '%';
            }

            checkboxes.forEach(checkbox => {
              checkbox.addEventListener('change', updateProgress);
            });

            updateProgress();
          });
        </script>
      </body>
      </html>
    `;
  }

  if (product.id === 'worksheet-time-management-008') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@300;400;500;600;700&family=Raleway:wght@300;400;500;600;700;800;900&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 50%, #1e3a8a 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 30% 70%, rgba(59, 130, 246, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Oswald', sans-serif;
            font-size: 3.2rem;
            font-weight: 600;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.02em;
            color: #dbeafe;
            line-height: 1.1;
          }

          .cover-page .subtitle {
            font-size: 1.6rem;
            font-weight: 400;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            color: #dbeafe;
            font-family: 'Raleway', sans-serif;
          }

          .cover-page .author {
            font-size: 1.2rem;
            font-weight: 600;
            opacity: 0.9;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Quicksand', sans-serif;
          }

          .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 40px;
          }

          .section {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            padding: 30px;
            margin-bottom: 25px;
            box-shadow: 0 4px 20px rgba(124, 58, 237, 0.1);
            border: 1px solid rgba(124, 58, 237, 0.2);
          }

          .section h2 {
            color: #581c87;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #7c3aed;
            display: flex;
            align-items: center;
          }

          .section h2::before {
            content: "⏰";
            margin-right: 12px;
            font-size: 1.5rem;
          }

          .input-group {
            margin-bottom: 20px;
          }

          .input-label {
            display: block;
            color: #374151;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 1rem;
          }

          .input-field, .textarea-field {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid #9333ea;
            border-radius: 8px;
            font-size: 1rem;
            font-family: 'League Spartan', sans-serif;
            transition: border-color 0.2s ease;
            background: #ffffff;
          }

          .input-field:focus, .textarea-field:focus {
            outline: none;
            border-color: #7c3aed;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          }

          .textarea-field {
            min-height: 100px;
            resize: vertical;
          }

          .time-block-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 10px;
            margin: 20px 0;
          }

          .time-block {
            background: #f3e8ff;
            border: 1px solid #c4b5fd;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            min-height: 100px;
          }

          .time-block h4 {
            color: #581c87;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .time-input {
            width: 100%;
            padding: 4px 8px;
            border: 1px solid #a78bfa;
            border-radius: 4px;
            font-size: 0.8rem;
            margin-bottom: 4px;
          }

          .priority-matrix {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 25px 0;
          }

          .matrix-quadrant {
            background: #ffffff;
            border: 2px solid #c4b5fd;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
          }

          .matrix-quadrant h3 {
            color: #581c87;
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .matrix-quadrant .quadrant-content {
            min-height: 120px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .matrix-item {
            background: #f3e8ff;
            padding: 6px 10px;
            border-radius: 4px;
            font-size: 0.85rem;
            border: 1px solid #c4b5fd;
          }

          .weekly-goals {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin: 20px 0;
          }

          .goal-card {
            background: #ffffff;
            border: 2px solid #c4b5fd;
            border-radius: 8px;
            padding: 15px;
          }

          .goal-card h4 {
            color: #581c87;
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .goal-input {
            width: 100%;
            padding: 6px 10px;
            border: 1px solid #a78bfa;
            border-radius: 4px;
            font-size: 0.9rem;
            margin-bottom: 6px;
          }

          .reflection-section {
            background: linear-gradient(135deg, #e9d5ff 0%, #d8b4fe 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
          }

          .reflection-section h3 {
            color: #581c87;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
            text-align: center;
          }

          .reflection-questions {
            display: grid;
            gap: 15px;
          }

          .reflection-question {
            background: #ffffff;
            border-radius: 8px;
            padding: 15px;
            border: 1px solid #c4b5fd;
          }

          .reflection-question .question {
            color: #581c87;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 0.95rem;
          }

          .reflection-answer {
            width: 100%;
            padding: 8px 12px;
            border: 1px solid #a78bfa;
            border-radius: 4px;
            font-size: 0.9rem;
          }

          @media (max-width: 768px) {
            .cover-page {
              padding: 60px 30px;
            }
            .cover-page h1 {
              font-size: 2.2rem;
            }
            .container {
              padding: 30px 20px;
            }
            .time-block-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .priority-matrix {
              grid-template-columns: 1fr;
            }
            .weekly-goals {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Time Management Mastery Worksheet</h1>
          <p class="subtitle">Transform Your Productivity with Strategic Planning and Time-Blocking Techniques</p>
          <p class="author">By Productivity Strategist</p>
        </div>

        <div class="container">
          <!-- Current Assessment -->
          <div class="section">
            <h2>Step 1: Assess Your Current Time Usage</h2>
            <div class="input-group">
              <label class="input-label">How many hours per week do you work?</label>
              <input type="text" class="input-field" placeholder="Include work, side projects, etc.">
            </div>

            <div class="input-group">
              <label class="input-label">Top 3 time-wasters in your day</label>
              <textarea class="textarea-field" placeholder="Social media, meetings, procrastination, etc."></textarea>
            </div>

            <div class="input-group">
              <label class="input-label">Your energy peak times</label>
              <input type="text" class="input-field" placeholder="Morning person, night owl, or steady throughout day?">
            </div>
          </div>

          <!-- Weekly Time Blocking -->
          <div class="section">
            <h2>Step 2: Weekly Time Blocking</h2>
            <p style="color: #374151; margin-bottom: 20px;">Block your week strategically. Color-code by priority: Red=High, Yellow=Medium, Green=Low.</p>

            <div class="time-block-grid">
              <div class="time-block">
                <h4>Monday</h4>
                <input type="text" class="time-input" placeholder="9-11AM: Deep work">
                <input type="text" class="time-input" placeholder="2-3PM: Meetings">
              </div>
              <div class="time-block">
                <h4>Tuesday</h4>
                <input type="text" class="time-input" placeholder="9-11AM: Deep work">
                <input type="text" class="time-input" placeholder="2-3PM: Meetings">
              </div>
              <div class="time-block">
                <h4>Wednesday</h4>
                <input type="text" class="time-input" placeholder="9-11AM: Deep work">
                <input type="text" class="time-input" placeholder="2-3PM: Meetings">
              </div>
              <div class="time-block">
                <h4>Thursday</h4>
                <input type="text" class="time-input" placeholder="9-11AM: Deep work">
                <input type="text" class="time-input" placeholder="2-3PM: Meetings">
              </div>
              <div class="time-block">
                <h4>Friday</h4>
                <input type="text" class="time-input" placeholder="9-11AM: Deep work">
                <input type="text" class="time-input" placeholder="2-3PM: Meetings">
              </div>
              <div class="time-block">
                <h4>Saturday</h4>
                <input type="text" class="time-input" placeholder="Family time, hobbies">
              </div>
              <div class="time-block">
                <h4>Sunday</h4>
                <input type="text" class="time-input" placeholder="Planning, rest">
              </div>
            </div>
          </div>

          <!-- Eisenhower Priority Matrix -->
          <div class="section">
            <h2>Step 3: Eisenhower Priority Matrix</h2>
            <p style="color: #374151; margin-bottom: 20px;">Categorize your tasks: Urgent/Important = Do First, Not Urgent/Important = Schedule, Urgent/Not Important = Delegate, Neither = Delete.</p>

            <div class="priority-matrix">
              <div class="matrix-quadrant">
                <h3>🔴 Urgent & Important</h3>
                <div class="quadrant-content">
                  <input type="text" class="matrix-item" placeholder="Crisis deadlines">
                  <input type="text" class="matrix-item" placeholder="Health emergencies">
                  <input type="text" class="matrix-item" placeholder="Key meetings">
                </div>
              </div>

              <div class="matrix-quadrant">
                <h3>🟡 Not Urgent & Important</h3>
                <div class="quadrant-content">
                  <input type="text" class="matrix-item" placeholder="Exercise, learning">
                  <input type="text" class="matrix-item" placeholder="Relationship building">
                  <input type="text" class="matrix-item" placeholder="Strategic planning">
                </div>
              </div>

              <div class="matrix-quadrant">
                <h3>🟠 Urgent & Not Important</h3>
                <div class="quadrant-content">
                  <input type="text" class="matrix-item" placeholder="Some emails/calls">
                  <input type="text" class="matrix-item" placeholder="Minor interruptions">
                  <input type="text" class="matrix-item" placeholder="Delegate these">
                </div>
              </div>

              <div class="matrix-quadrant">
                <h3>⚪ Neither Urgent Nor Important</h3>
                <div class="quadrant-content">
                  <input type="text" class="matrix-item" placeholder="Excess social media">
                  <input type="text" class="matrix-item" placeholder="Time-wasting activities">
                  <input type="text" class="matrix-item" placeholder="Minimize/eliminate">
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Goals -->
          <div class="section">
            <h2>Step 4: Weekly Goal Setting</h2>

            <div class="weekly-goals">
              <div class="goal-card">
                <h4>🎯 Big Goal</h4>
                <input type="text" class="goal-input" placeholder="One major accomplishment">
                <input type="text" class="goal-input" placeholder="Deadline">
              </div>
              <div class="goal-card">
                <h4>📚 Learning</h4>
                <input type="text" class="goal-input" placeholder="New skill to acquire">
                <input type="text" class="goal-input" placeholder="Hours to dedicate">
              </div>
              <div class="goal-card">
                <h4>💼 Career</h4>
                <input type="text" class="goal-input" placeholder="Professional milestone">
                <input type="text" class="goal-input" placeholder="Key actions">
              </div>
              <div class="goal-card">
                <h4>🏃 Health</h4>
                <input type="text" class="goal-input" placeholder="Fitness/wellness goal">
                <input type="text" class="goal-input" placeholder="Measurement of success">
              </div>
            </div>
          </div>

          <!-- Reflection & Adjustment -->
          <div class="reflection-section">
            <h3>Weekly Reflection & Adjustment</h3>
            <div class="reflection-questions">
              <div class="reflection-question">
                <div class="question">What worked well this week?</div>
                <input type="text" class="reflection-answer" placeholder="Time blocks, priorities, etc.">
              </div>
              <div class="reflection-question">
                <div class="question">What needs adjustment?</div>
                <input type="text" class="reflection-answer" placeholder="Overestimated tasks, distractions, etc.">
              </div>
              <div class="reflection-question">
                <div class="question">One productivity win?</div>
                <input type="text" class="reflection-answer" placeholder="Completed project, better focus, etc.">
              </div>
              <div class="reflection-question">
                <div class="question">Next week's focus area?</div>
                <input type="text" class="reflection-answer" placeholder="Deep work, delegation, boundaries, etc.">
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'course-blueprint-smma-009') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 20% 80%, rgba(255,215,0,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,215,0,0.05) 0%, transparent 50%),
              linear-gradient(45deg, rgba(255,215,0,0.03) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Poppins', sans-serif;
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.03em;
            color: #FFD700;
            line-height: 1.1;
            background: linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .cover-page .subtitle {
            font-size: 1.6rem;
            font-weight: 500;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            color: #e2e8f0;
            line-height: 1.4;
          }

          .cover-page .author {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-family: 'League Spartan', sans-serif;
          }

          .container {
            max-width: 950px;
            margin: 0 auto;
            padding: 50px 40px;
          }

          .module {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 35px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
          }

          .module::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
          }

          .module h2 {
            color: #0f172a;
            font-family: 'League Spartan', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
          }

          .module h2::before {
            content: "🚀";
            margin-right: 15px;
            font-size: 1.8rem;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          }

          .module-meta {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            align-items: center;
          }

          .module-meta-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .module-meta-item .icon {
            font-size: 1.5rem;
            margin-bottom: 8px;
          }

          .module-meta-item strong {
            color: #0f172a;
            font-size: 1.1rem;
            font-weight: 700;
            margin-bottom: 4px;
          }

          .module-meta-item span {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
          }

          .lesson-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .lesson-card {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border: 2px solid #e2e8f0;
            border-radius: 16px;
            padding: 25px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .lesson-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #FFD700 0%, #FFA500 50%, #FFD700 100%);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .lesson-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06);
            border-color: #FFD700;
          }

          .lesson-card:hover::before {
            transform: scaleX(1);
          }

          .lesson-card h3 {
            color: #0f172a;
            font-family: 'League Spartan', sans-serif;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
            line-height: 1.3;
          }

          .lesson-card .lesson-desc {
            color: #475569;
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .lesson-card .duration {
            color: #FFD700;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
          }

          .lesson-card .duration::before {
            content: "⏱️";
            margin-right: 6px;
            font-size: 1rem;
          }

          .assignment-section {
            background: linear-gradient(135deg, #fefce8 0%, #fef3c7 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            border: 2px solid #fbbf24;
            position: relative;
          }

          .assignment-section::before {
            content: "📋";
            position: absolute;
            top: -15px;
            left: 20px;
            background: #ffffff;
            padding: 10px;
            border-radius: 50%;
            font-size: 1.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .assignment-section h3 {
            color: #92400e;
            font-family: 'League Spartan', sans-serif;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
            margin-left: 30px;
          }

          .assignment-list {
            list-style: none;
            padding: 0;
            margin-left: 30px;
          }

          .assignment-list li {
            background: #ffffff;
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: 12px;
            border: 1px solid #f59e0b;
            color: #374151;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.1);
            transition: all 0.2s ease;
          }

          .assignment-list li:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
          }
          }

          .assignment-list li:before {
            content: "📋";
            margin-right: 8px;
            color: #1d4ed8;
          }

          .milestone-tracker {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 4px 20px rgba(29, 78, 216, 0.1);
          }

          .milestone-tracker h3 {
            color: #1e3a8a;
            font-size: 1.6rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .progress-bar {
            background: #e5e7eb;
            border-radius: 20px;
            height: 12px;
            margin: 20px 0;
            overflow: hidden;
          }

          .progress-fill {
            background: linear-gradient(90deg, #1d4ed8 0%, #1e40af 100%);
            height: 100%;
            width: 0%;
            border-radius: 20px;
            transition: width 0.3s ease;
          }

          .week-overview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .week-card {
            background: #ffffff;
            border: 2px solid #bfdbfe;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s ease;
          }

          .week-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 32px rgba(29, 78, 216, 0.15);
          }

          .week-number {
            color: #1d4ed8;
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 10px;
          }

          .week-title {
            color: #1e3a8a;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .week-focus {
            color: #374151;
            font-size: 0.95rem;
            line-height: 1.5;
          }

          .success-metrics {
            background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
            color: white;
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 8px 32px rgba(29, 78, 216, 0.2);
          }

          .success-metrics h3 {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 25px;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
          }

          .metric {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 20px;
          }

          .metric .metric-value {
            font-size: 1.8rem;
            font-weight: 800;
            margin-bottom: 5px;
          }

          .metric .metric-label {
            font-size: 0.9rem;
            opacity: 0.9;
          }

          .final-section {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            margin-top: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          }

          .final-section h2 {
            font-family: 'League Spartan', sans-serif;
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 20px;
            color: #FFD700;
          }

          .final-section p {
            font-size: 1.1rem;
            margin-bottom: 30px;
            opacity: 0.95;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
          }

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 30px;
          }

          .stat-item {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .stat-item .stat-number {
            font-size: 2rem;
            font-weight: 800;
            color: #FFD700;
            margin-bottom: 8px;
          }

          .stat-item .stat-label {
            font-size: 0.9rem;
            opacity: 0.9;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 30px 20px;
            }
            .cover-page {
              padding: 70px 25px;
            }
            .cover-page h1 {
              font-size: 2.5rem;
            }
            .module {
              padding: 30px 20px;
            }
            .lesson-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .module-meta {
              flex-direction: column;
              gap: 15px;
            }
            .final-section {
              padding: 30px 20px;
            }
            .final-section h2 {
              font-size: 1.8rem;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Scaling SMMA Agency to 10K/Month Blueprint</h1>
          <p class="subtitle">12-Week Course to Scale Your Social Media Marketing Agency from Startup to $10K Monthly Revenue</p>
          <p class="author">By Agency Scaling Expert</p>
        </div>

        <div class="container">
          <!-- Introduction -->
          <div class="module">
            <h2>Course Overview: Your Scaling Journey</h2>
            <p style="color: #374151; font-size: 1.1rem; margin-bottom: 20px;">This 12-week blueprint transforms your SMMA from struggling startup to profitable agency. Learn proven systems for client acquisition, team building, and scaling operations to $10K/month.</p>

            <div class="module-meta">
              <div class="module-meta-item">
                <div class="icon">⏱️</div>
                <strong>12 weeks</strong>
                <span>Duration</span>
              </div>
              <div class="module-meta-item">
                <div class="icon">📚</div>
                <strong>Self-paced</strong>
                <span>Weekly milestones</span>
              </div>
              <div class="module-meta-item">
                <div class="icon">💰</div>
                <strong>$10K/month</strong>
                <span>Target revenue</span>
              </div>
            </div>
          </div>

          <!-- Week Overview -->
          <div class="week-overview">
            <div class="week-card">
              <div class="week-number">W1-2</div>
              <div class="week-title">Foundation & Mindset</div>
              <div class="week-focus">Build agency owner mindset, basic operations, initial client systems</div>
            </div>

            <div class="week-card">
              <div class="week-number">W3-4</div>
              <div class="week-title">Client Acquisition</div>
              <div class="week-focus">Lead generation, sales funnels, proposal systems, conversion optimization</div>
            </div>

            <div class="week-card">
              <div class="week-number">W5-6</div>
              <div class="week-title">Service Delivery</div>
              <div class="week-focus">Content creation workflows, ad management systems, reporting processes</div>
            </div>

            <div class="week-card">
              <div class="week-number">W7-8</div>
              <div class="week-title">Team Building</div>
              <div class="week-focus">Hiring freelancers, delegation systems, quality control, team management</div>
            </div>

            <div class="week-card">
              <div class="week-number">W9-10</div>
              <div class="week-title">Systems & Automation</div>
              <div class="week-focus">CRM setup, project management, automated reporting, efficiency tools</div>
            </div>

            <div class="week-card">
              <div class="week-number">W11-12</div>
              <div class="week-title">Scaling & Growth</div>
              <div class="week-focus">Multiple streams, agency pricing, passive income, business sale preparation</div>
            </div>
          </div>

          <!-- Module 1 Detail -->
          <div class="module">
            <h2>Module 1: Agency Foundation (Weeks 1-2)</h2>

            <div class="lesson-grid">
              <div class="lesson-card">
                <h3>From Freelancer to Agency Owner</h3>
                <div class="lesson-desc">Shift your mindset from doing work to building systems that scale beyond you.</div>
                <div class="duration">📖 45 min read + exercises</div>
              </div>

              <div class="lesson-card">
                <h3>Choosing Your SMMA Niche</h3>
                <div class="lesson-desc">Pick a profitable niche based on demand, competition, and your expertise.</div>
                <div class="duration">🎯 30 min + niche analysis</div>
              </div>

              <div class="lesson-card">
                <h3>Basic Operations Setup</h3>
                <div class="lesson-desc">Project management, client onboarding, basic contract templates.</div>
                <div class="duration">⚙️ 60 min + templates</div>
              </div>
            </div>

            <div class="assignment-section">
              <h3>Week 1-2 Assignments:</h3>
              <ul class="assignment-list">
                <li>Set up basic agency operations (CRM, contracts, onboarding)</li>
                <li>Choose and validate your SMMA niche</li>
                <li>Create service packages and pricing structure</li>
                <li>Build your first client proposal template</li>
                <li>Set up social proof collection system</li>
              </ul>
            </div>
          </div>

          <!-- Module 2 Detail -->
          <div class="module">
            <h2>Module 2: Client Acquisition Engine (Weeks 3-4)</h2>

            <div class="lesson-grid">
              <div class="lesson-card">
                <h3>Lead Generation Systems</h3>
                <div class="lesson-desc">Content marketing, social selling, networking strategies for consistent leads.</div>
                <div class="duration">🎣 90 min + strategy templates</div>
              </div>

              <div class="lesson-card">
                <h3>Sales Funnel Mastery</h3>
                <div class="lesson-desc">Discovery calls, proposals, objections handling, closing techniques.</div>
                <div class="duration">💰 75 min + scripts</div>
              </div>

              <div class="lesson-card">
                <h3>Proposal & Contract Systems</h3>
                <div class="lesson-desc">Automated proposals, payment processing, legal protection.</div>
                <div class="duration">📄 60 min + templates</div>
              </div>
            </div>

            <div class="assignment-section">
              <h3>Week 3-4 Assignments:</h3>
              <ul class="assignment-list">
                <li>Implement 3 lead generation channels</li>
                <li>Conduct 5 discovery calls with prospects</li>
                <li>Create automated proposal system</li>
                <li>Develop sales objection responses</li>
                <li>Achieve first paying client</li>
              </ul>
            </div>
          </div>

          <!-- Progress Tracker -->
          <div class="milestone-tracker">
            <h3>Your Agency Scaling Progress</h3>
            <div class="progress-bar">
              <div class="progress-fill" id="progressFill"></div>
            </div>
            <p style="color: #6b7280; margin-top: 10px;">Complete modules and assignments to track your scaling journey</p>
          </div>

          <!-- Success Metrics -->
          <div class="success-metrics">
            <h3>Expected Results After 12 Weeks</h3>
            <div class="metrics-grid">
              <div class="metric">
                <div class="metric-value">$10K+</div>
                <div class="metric-label">Monthly Revenue</div>
              </div>
              <div class="metric">
                <div class="metric-value">15+</div>
                <div class="metric-label">Active Clients</div>
              </div>
              <div class="metric">
                <div class="metric-value">5</div>
                <div class="metric-label">Team Members</div>
              </div>
              <div class="metric">
                <div class="metric-value">80%</div>
                <div class="metric-label">Profit Margin</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Metrics -->
        <div class="final-section">
          <h2>Real Results from This Blueprint</h2>
          <p>Join hundreds of agency owners who have successfully scaled to $10K/month using this proven system.</p>

          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">85%</div>
              <div class="stat-label">Success Rate</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">$10K+</div>
              <div class="stat-label">Monthly Revenue</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">12</div>
              <div class="stat-label">Weeks to Scale</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Students Scaled</div>
            </div>
          </div>
        </div>

        <script>
          // Simple progress tracking
          document.addEventListener('DOMContentLoaded', function() {
            // Initialize progress (this would be more sophisticated in real implementation)
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = '0%'; // Start at 0%
          });
        </script>
      </body>
      </html>
    `;
  }

  if (product.id === 'ebook-discipline-summary-010') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700;800;900&family=Lato:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Cormorant Garamond', serif;
            font-size: 3.2rem;
            font-weight: 600;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.03em;
            color: #a855f7;
            line-height: 1.1;
            background: linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .cover-page .subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            color: #e2e8f0;
            line-height: 1.4;
            font-family: 'Lato', sans-serif;
          }

          .cover-page .author {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-family: 'Cinzel', serif;
          }

          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
          }

          .chapter {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            padding: 35px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.2);
          }

          .chapter h2 {
            color: #7f1d1d;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid #dc2626;
            display: flex;
            align-items: center;
          }

          .chapter h2::before {
            content: "🎯";
            margin-right: 12px;
            font-size: 1.5rem;
          }

          .chapter p {
            color: #374151;
            font-size: 1rem;
            margin-bottom: 18px;
            line-height: 1.7;
          }

          .key-insight {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-left: 4px solid #dc2626;
            padding: 25px;
            margin: 25px 0;
            border-radius: 0 12px 12px 0;
            font-weight: 600;
          }

          .key-insight .insight-title {
            color: #7f1d1d;
            font-size: 1.1rem;
            margin-bottom: 10px;
          }

          .key-insight .insight-desc {
            color: #374151;
            font-weight: 400;
            font-size: 1rem;
          }

          .video-summary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 25px 0;
          }

          .video-card {
            background: #ffffff;
            border: 2px solid #fecaca;
            border-radius: 12px;
            padding: 20px;
            transition: all 0.3s ease;
          }

          .video-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(220, 38, 38, 0.15);
            border-color: #dc2626;
          }

          .video-card h3 {
            color: #7f1d1d;
            font-size: 1.2rem;
            font-weight: 700;
            margin-bottom: 12px;
          }

          .video-card .video-desc {
            color: #374151;
            font-size: 0.95rem;
            margin-bottom: 15px;
            line-height: 1.5;
          }

          .video-card .key-takeaway {
            background: #fef2f2;
            border-radius: 6px;
            padding: 10px;
            border: 1px solid #fecaca;
          }

          .video-card .key-takeaway strong {
            color: #7f1d1d;
            font-size: 0.9rem;
          }

          .discipline-framework {
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            box-shadow: 0 8px 32px rgba(220, 38, 38, 0.2);
          }

          .discipline-framework h3 {
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .framework-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 25px;
          }

          .framework-item {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 20px;
          }

          .framework-item .item-number {
            font-size: 2rem;
            font-weight: 800;
            margin-bottom: 10px;
          }

          .framework-item .item-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 8px;
          }

          .framework-item .item-desc {
            font-size: 0.9rem;
            opacity: 0.9;
          }

          .action-plan {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            border: 1px solid #fecaca;
          }

          .action-plan h3 {
            color: #7f1d1d;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .action-list {
            list-style: none;
            padding: 0;
          }

          .action-list li {
            background: #fef2f2;
            border-radius: 6px;
            padding: 12px 15px;
            margin-bottom: 8px;
            border: 1px solid #fecaca;
            color: #374151;
          }

          .action-list li:before {
            content: "✅";
            margin-right: 8px;
            color: #dc2626;
          }

          .progress-section {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
          }

          .progress-section h3 {
            color: #7f1d1d;
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 15px;
          }

          .progress-bar {
            background: #e5e7eb;
            border-radius: 20px;
            height: 12px;
            margin: 15px 0;
            overflow: hidden;
          }

          .progress-fill {
            background: linear-gradient(90deg, #dc2626 0%, #b91c1c 100%);
            height: 100%;
            width: 0%;
            border-radius: 20px;
            transition: width 0.3s ease;
          }

          @media (max-width: 768px) {
            .cover-page {
              padding: 60px 30px;
            }
            .cover-page h1 {
              font-size: 2.2rem;
            }
            .container {
              padding: 30px 20px;
            }
            .video-summary-grid {
              grid-template-columns: 1fr;
            }
            .framework-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>YouTube Discipline Journey Summary</h1>
          <p class="subtitle">200+ Videos Analyzed: The Complete Framework for Building Unbreakable Discipline</p>
          <p class="author">By Discipline Mastery Coach</p>
        </div>

        <div class="container">
          <!-- Introduction -->
          <div class="chapter">
            <h2>My YouTube Discipline Journey</h2>
            <p>After watching over 200 YouTube videos on discipline, productivity, and habit formation, I finally cracked the code. This summary distills the most powerful insights from top creators like Jocko Willink, Andrew Huberman, Thomas Frank, and many others into a practical framework you can implement today.</p>

            <p>The journey started with frustration - I knew I needed discipline but couldn't sustain it. Through countless videos, I discovered that discipline isn't about willpower or punishment. It's about systems, identity shifts, and understanding the neuroscience behind habit formation.</p>

            <div class="key-insight">
              <div class="insight-title">The Big Realization</div>
              <div class="insight-desc">Discipline compounds like interest. Small daily actions create massive long-term results. The key is starting small and being consistent.</div>
            </div>
          </div>

          <!-- Key Video Insights -->
          <div class="chapter">
            <h2>Key Insights from 200+ Videos</h2>

            <div class="video-summary-grid">
              <div class="video-card">
                <h3>Identity Shift (Atomic Habits)</h3>
                <div class="video-desc">Your habits reflect your identity. To build discipline, you must become the type of person who does the disciplined thing.</div>
                <div class="key-takeaway">
                  <strong>Action:</strong> Replace "I want to be disciplined" with "I am a disciplined person"
                </div>
              </div>

              <div class="video-card">
                <h3>Environment Design (James Clear)</h3>
                <div class="video-desc">Your environment shapes your behavior more than willpower. Design your surroundings to make good habits easy.</div>
                <div class="key-takeaway">
                  <strong>Action:</strong> Remove temptations and place cues for desired behaviors
                </div>
              </div>

              <div class="video-card">
                <h3>Implementation Intention (Peter Gollwitzer)</h3>
                <div class="video-desc">If-then planning dramatically increases follow-through. "If situation X occurs, then I will do Y."</div>
                <div class="key-takeaway">
                  <strong>Action:</strong> Create specific triggers for habits ("If alarm goes off, then I do 5 pushups")
                </div>
              </div>

              <div class="video-card">
                <h3>Dopamine Fasting (Dr. Cameron Sepah)</h3>
                <div class="video-desc">Modern life overstimulates dopamine receptors. Strategic fasting helps reset motivation and focus.</div>
                <div class="key-takeaway">
                  <strong>Action:</strong> 1 hour before bed, no screens, social media, or high-stimulation activities
                </div>
              </div>

              <div class="video-card">
                <h3>Stress + Recovery Balance (Huberman)</h3>
                <div class="video-desc">Discipline requires both productive stress and adequate recovery. Sleep and stress management are non-negotiable.</div>
                <div class="key-takeaway">
                  <strong>Action:</strong> 7-9 hours sleep, morning sunlight, deliberate stress management
                </div>
              </div>

              <div class="video-card">
                <h3>40% Rule (David Goggins)</h3>
                <div class="video-desc">When you think you're done, you're only 40% finished. Push through discomfort to build mental toughness.</div>
                <div class="key-takeaway">
                  <strong>Action:</strong> When you want to quit, go 40% longer than planned
                </div>
              </div>
            </div>
          </div>

          <!-- The Discipline Framework -->
          <div class="discipline-framework">
            <h3>The Complete Discipline Framework</h3>
            <p>After analyzing all the videos, here's the distilled framework that actually works:</p>

            <div class="framework-grid">
              <div class="framework-item">
                <div class="item-number">1</div>
                <div class="item-title">Identity First</div>
                <div class="item-desc">Become the disciplined person through small daily actions</div>
              </div>

              <div class="framework-item">
                <div class="item-number">2</div>
                <div class="item-title">Systems Over Willpower</div>
                <div class="item-desc">Design your environment and routines to make discipline automatic</div>
              </div>

              <div class="framework-item">
                <div class="item-number">3</div>
                <div class="item-title">Start Microscopic</div>
                <div class="item-desc">Begin with 2-minute habits that compound into unbreakable routines</div>
              </div>

              <div class="framework-item">
                <div class="item-number">4</div>
                <div class="item-title">Track & Celebrate</div>
                <div class="item-desc">Measure progress and reward consistency to build momentum</div>
              </div>
            </div>
          </div>

          <!-- Implementation Plan -->
          <div class="chapter">
            <h2>Your 30-Day Discipline Implementation</h2>
            <p>This plan combines the best insights from all the videos I watched. Start small, be consistent, and watch discipline become your natural state.</p>

            <div class="action-plan">
              <h3>Week 1: Foundation Building</h3>
              <ul class="action-list">
                <li>Choose one keystone habit (exercise, reading, meditation)</li>
                <li>Set up environmental cues and remove temptations</li>
                <li>Create implementation intentions for your habit</li>
                <li>Establish a consistent sleep schedule (7-9 hours)</li>
                <li>Track your habit daily in a simple journal</li>
              </ul>
            </div>

            <div class="action-plan">
              <h3>Week 2-4: Habit Stacking & Scaling</h3>
              <ul class="action-list">
                <li>Add one related habit using habit stacking</li>
                <li>Implement dopamine fasting before bed</li>
                <li>Practice the 40% rule when motivation dips</li>
                <li>Celebrate small wins to build momentum</li>
                <li>Adjust your environment based on what works</li>
              </ul>
            </div>
          </div>

          <!-- Progress Tracking -->
          <div class="progress-section">
            <h3>Your Discipline Building Progress</h3>
            <div class="progress-bar">
              <div class="progress-fill" id="progressFill"></div>
            </div>
            <p style="color: #6b7280; margin-top: 10px;">Complete the 30-day plan to build unbreakable discipline</p>
          </div>

          <!-- Conclusion -->
          <div class="chapter">
            <h2>The Final Lesson from 200 Videos</h2>
            <p>Discipline isn't about being perfect. It's about showing up consistently, even when you don't feel like it. Every expert I studied emphasized the same truth: discipline compounds, and small daily actions create extraordinary results.</p>

            <p>The YouTube videos taught me that discipline is a skill you can develop, not a personality trait you're born with. It requires understanding your psychology, designing your environment, and committing to the process.</p>

            <div class="key-insight">
              <div class="insight-title">The Ultimate Truth</div>
              <div class="insight-desc">Discipline is freedom. It frees you from dependency on motivation and circumstances. Once discipline becomes your default, you can achieve anything you set your mind to.</div>
            </div>

            <p>Your journey starts today. Choose one small action and commit to it. The rest will follow.</p>
          </div>
        </div>

        <script>
          // Simple progress tracking
          document.addEventListener('DOMContentLoaded', function() {
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = '0%'; // Start at 0%
          });
        </script>
      </body>
      </html>
    `;
  }

  if (product.id === 'course-social-media-growth-011') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;600;700;800&family=Karla:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Karla', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #be185d 0%, #db2777 50%, #ec4899 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 30% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Ubuntu', sans-serif;
            font-size: 3.4rem;
            font-weight: 700;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.03em;
            color: #fce7f3;
            line-height: 1.1;
          }

          .cover-page .subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            color: #fce7f3;
            line-height: 1.4;
            font-family: 'Karla', sans-serif;
          }

          .cover-page .author {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            color: #fbcfe8;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-family: 'Ubuntu', sans-serif;
          }

          .container {
            max-width: 950px;
            margin: 0 auto;
            padding: 50px 40px;
          }

          .module {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 35px;
            box-shadow: 0 10px 40px rgba(236, 72, 153, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
          }

          .module::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #ec4899 100%);
          }

          .module h2 {
            color: #0f172a;
            font-family: 'Ubuntu', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
          }

          .module h2::before {
            content: "🚀";
            margin-right: 15px;
            font-size: 1.8rem;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          }

          .strategy-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .strategy-card {
            background: linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%);
            border: 2px solid #fce7f3;
            border-radius: 16px;
            padding: 25px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .strategy-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #ec4899 0%, #f472b6 50%, #ec4899 100%);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .strategy-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(236, 72, 153, 0.15), 0 8px 16px rgba(236, 72, 153, 0.08);
            border-color: #ec4899;
          }

          .strategy-card:hover::before {
            transform: scaleX(1);
          }

          .strategy-card h3 {
            color: #be185d;
            font-family: 'Ubuntu', sans-serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            line-height: 1.3;
          }

          .strategy-card .strategy-desc {
            color: #6b7280;
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .strategy-card .duration {
            color: #ec4899;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
          }

          .strategy-card .duration::before {
            content: "📈";
            margin-right: 6px;
            font-size: 1rem;
          }

          .growth-metrics {
            background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            border: 2px solid #f472b6;
          }

          .growth-metrics h3 {
            color: #be185d;
            font-family: 'Ubuntu', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 25px;
          }

          .metric {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #f472b6;
          }

          .metric .metric-value {
            font-size: 2rem;
            font-weight: 800;
            color: #ec4899;
            margin-bottom: 8px;
          }

          .metric .metric-label {
            font-size: 0.9rem;
            color: #6b7280;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 30px 20px;
            }
            .cover-page {
              padding: 70px 25px;
            }
            .cover-page h1 {
              font-size: 2.5rem;
            }
            .module {
              padding: 30px 20px;
            }
            .strategy-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Social Media Growth Accelerator Course</h1>
          <p class="subtitle">8-Week Comprehensive Course: Instagram & TikTok Growth Strategies, Algorithm Hacks, Content Calendars & Viral Posting Techniques</p>
          <p class="author">By Social Media Strategist</p>
        </div>

        <div class="container">
          <!-- Course Overview -->
          <div class="module">
            <h2>Course Overview: From Zero to Viral</h2>
            <p style="color: #374151; font-size: 1.1rem; margin-bottom: 20px;">Master the art of social media growth with this comprehensive 8-week course. Learn proven strategies to grow your Instagram and TikTok following, understand algorithm changes, and create content that goes viral.</p>

            <div class="growth-metrics">
              <h3>Real Results from Our Students</h3>
              <div class="metrics-grid">
                <div class="metric">
                  <div class="metric-value">5K+</div>
                  <div class="metric-label">New Followers</div>
                </div>
                <div class="metric">
                  <div class="metric-value">300%</div>
                  <div class="metric-label">Engagement Boost</div>
                </div>
                <div class="metric">
                  <div class="metric-value">8</div>
                  <div class="metric-label">Weeks to Scale</div>
                </div>
                <div class="metric">
                  <div class="metric-value">95%</div>
                  <div class="metric-label">Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Modules -->
          <div class="module">
            <h2>Weekly Growth Modules</h2>
            <div class="strategy-grid">
              <div class="strategy-card">
                <h3>Week 1-2: Foundation & Profile Optimization</h3>
                <div class="strategy-desc">Perfect your profile, bio optimization, niche selection, and create a compelling brand identity that attracts your ideal audience.</div>
                <div class="duration">2 weeks</div>
              </div>

              <div class="strategy-card">
                <h3>Week 3-4: Content Strategy & Calendar Planning</h3>
                <div class="strategy-desc">Master content pillars, posting schedules, hashtag strategies, and build a 30-day content calendar that drives consistent growth.</div>
                <div class="duration">2 weeks</div>
              </div>

              <div class="strategy-card">
                <h3>Week 5-6: Algorithm Mastery & Viral Content</h3>
                <div class="strategy-desc">Understand platform algorithms, create viral-worthy content, master trending sounds and challenges, and optimize posting times.</div>
                <div class="duration">2 weeks</div>
              </div>

              <div class="strategy-card">
                <h3>Week 7-8: Scaling & Monetization</h3>
                <div class="strategy-desc">Scale your growth with collaborations, giveaways, and paid promotion strategies. Learn to monetize your social media presence.</div>
                <div class="duration">2 weeks</div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'ebook-passive-income-playbook-012') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;500;600;700;800;900&family=Merriweather:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Source Sans Pro', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Merriweather', serif;
            font-size: 3.3rem;
            font-weight: 700;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.03em;
            color: #fef3c7;
            line-height: 1.1;
          }

          .cover-page .subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            color: #fef3c7;
            line-height: 1.4;
            font-family: 'Source Sans Pro', sans-serif;
          }

          .cover-page .author {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            color: #fde68a;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-family: 'Merriweather', serif;
          }

          .container {
            max-width: 950px;
            margin: 0 auto;
            padding: 50px 40px;
          }

          .chapter {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 35px;
            box-shadow: 0 10px 40px rgba(245, 158, 11, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
          }

          .chapter::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%);
          }

          .chapter h2 {
            color: #0f172a;
            font-family: 'Merriweather', serif;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
          }

          .chapter h2::before {
            content: "💰";
            margin-right: 15px;
            font-size: 1.8rem;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          }

          .income-streams {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .stream-card {
            background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
            border: 2px solid #fef3c7;
            border-radius: 16px;
            padding: 25px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .stream-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .stream-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15), 0 8px 16px rgba(245, 158, 11, 0.08);
            border-color: #d97706;
          }

          .stream-card:hover::before {
            transform: scaleX(1);
          }

          .stream-card h3 {
            color: #92400e;
            font-family: 'Merriweather', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            line-height: 1.3;
          }

          .stream-card .stream-desc {
            color: #6b7280;
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .stream-card .potential {
            color: #d97706;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
          }

          .stream-card .potential::before {
            content: "📈";
            margin-right: 6px;
            font-size: 1rem;
          }

          .success-stories {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            border: 2px solid #f59e0b;
          }

          .success-stories h3 {
            color: #92400e;
            font-family: 'Merriweather', serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 20px;
          }

          .success-stories p {
            color: #6b7280;
            font-size: 1rem;
            margin-bottom: 25px;
          }

          .case-studies {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 25px;
          }

          .case-study {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #f59e0b;
          }

          .case-study .income {
            font-size: 1.5rem;
            font-weight: 800;
            color: #d97706;
            margin-bottom: 8px;
          }

          .case-study .method {
            font-size: 0.9rem;
            color: #6b7280;
            font-weight: 600;
          }

          .case-study .timeframe {
            font-size: 0.8rem;
            color: #92400e;
            margin-top: 8px;
          }

          @media (max-width: 768px) {
            .container {
              padding: 30px 20px;
            }
            .cover-page {
              padding: 70px 25px;
            }
            .cover-page h1 {
              font-size: 2.5rem;
            }
            .chapter {
              padding: 30px 20px;
            }
            .income-streams {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Passive Income Playbook</h1>
          <p class="subtitle">Complete Guide to Building Multiple Passive Income Streams Through Digital Products, Affiliate Marketing & Automated Online Businesses</p>
          <p class="author">By Passive Income Expert</p>
        </div>

        <div class="container">
          <!-- Book Overview -->
          <div class="chapter">
            <h2>The Ultimate Passive Income Blueprint</h2>
            <p style="color: #374151; font-size: 1.1rem; margin-bottom: 20px;">Stop trading time for money. This comprehensive playbook reveals proven strategies to build multiple passive income streams that work 24/7. From digital products to affiliate marketing, learn how to create automated income that scales.</p>

            <div class="success-stories">
              <h3>Real Student Success Stories</h3>
              <p>Our students have built passive income streams generating:</p>
              <div class="case-studies">
                <div class="case-study">
                  <div class="income">$2,500/month</div>
                  <div class="method">Digital Product Sales</div>
                  <div class="timeframe">3 months to launch</div>
                </div>
                <div class="case-study">
                  <div class="income">$1,800/month</div>
                  <div class="method">Affiliate Marketing</div>
                  <div class="timeframe">6 months to scale</div>
                </div>
                <div class="case-study">
                  <div class="income">$950/month</div>
                  <div class="method">Membership Site</div>
                  <div class="timeframe">4 months to profit</div>
                </div>
                <div class="case-study">
                  <div class="income">$3,200/month</div>
                  <div class="method">Combined Streams</div>
                  <div class="timeframe">8 months total</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Income Streams -->
          <div class="chapter">
            <h2>7 Proven Passive Income Streams</h2>
            <div class="income-streams">
              <div class="stream-card">
                <h3>Digital Product Empire</h3>
                <div class="stream-desc">Create and sell ebooks, courses, templates, and software. One-time creation, lifetime sales with zero marginal costs.</div>
                <div class="potential">High scalability</div>
              </div>

              <div class="stream-card">
                <h3>Affiliate Marketing Networks</h3>
                <div class="stream-desc">Promote products you believe in and earn commissions on every sale. Build authority while earning passive income.</div>
                <div class="potential">Low startup costs</div>
              </div>

              <div class="stream-card">
                <h3>Membership Communities</h3>
                <div class="stream-desc">Create exclusive communities with premium content, tools, and networking opportunities that members pay monthly to access.</div>
                <div class="potential">Recurring revenue</div>
              </div>

              <div class="stream-card">
                <h3>Stock Photography & Graphics</h3>
                <div class="stream-desc">Sell photos, graphics, and design assets on marketplaces. Upload once, earn forever from licensing fees.</div>
                <div class="potential">Creative outlet</div>
              </div>

              <div class="stream-card">
                <h3>Automated YouTube Channel</h3>
                <div class="stream-desc">Create evergreen content that continues to generate ad revenue and sponsorships years after publication.</div>
                <div class="potential">Massive reach potential</div>
              </div>

              <div class="stream-card">
                <h3>Dropshipping Store Automation</h3>
                <div class="stream-desc">Set up automated e-commerce stores with supplier integrations and marketing funnels that run without your daily involvement.</div>
                <div class="potential">High profit margins</div>
              </div>

              <div class="stream-card">
                <h3>Print-on-Demand Merchandise</h3>
                <div class="stream-desc">Design apparel and merchandise once, sell through automated print fulfillment services with no inventory management.</div>
                <div class="potential">Creative & fun</div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  if (product.id === 'course-email-marketing-mastery-013') {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700;800;900&family=Crimson+Text:wght@400;500;600;700&display=swap" rel="stylesheet">
        <title>${product.title}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Work Sans', sans-serif;
            line-height: 1.7;
            color: #0f172a;
            background: linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #a7f3d0 100%);
            min-height: 100vh;
          }

          .cover-page {
            background: linear-gradient(135deg, #0f766e 0%, #115e59 50%, #0d9488 100%);
            padding: 100px 40px;
            text-align: center;
            color: white;
            min-height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
          }

          .cover-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              radial-gradient(circle at 30% 70%, rgba(20, 184, 166, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 70% 30%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
              linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, transparent 100%);
            pointer-events: none;
          }

          .cover-page > * {
            position: relative;
            z-index: 1;
          }

          .cover-page h1 {
            font-family: 'Crimson Text', serif;
            font-size: 3.2rem;
            font-weight: 600;
            margin-bottom: 25px;
            text-shadow: 0 3px 6px rgba(0,0,0,0.5);
            letter-spacing: -0.03em;
            color: #ccfbf1;
            line-height: 1.1;
          }

          .cover-page .subtitle {
            font-size: 1.5rem;
            font-weight: 400;
            margin-bottom: 35px;
            opacity: 0.95;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
            color: #ccfbf1;
            line-height: 1.4;
            font-family: 'Work Sans', sans-serif;
          }

          .cover-page .author {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            color: #a7f3d0;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-family: 'Crimson Text', serif;
          }

          .container {
            max-width: 950px;
            margin: 0 auto;
            padding: 50px 40px;
          }

          .module {
            background: #ffffff;
            border-radius: 20px;
            padding: 40px;
            margin-bottom: 35px;
            box-shadow: 0 10px 40px rgba(13, 148, 136, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
          }

          .module::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #0d9488 0%, #14b8a6 50%, #0d9488 100%);
          }

          .module h2 {
            color: #0f172a;
            font-family: 'Crimson Text', serif;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
          }

          .module h2::before {
            content: "📧";
            margin-right: 15px;
            font-size: 1.8rem;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
          }

          .email-strategies {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
            margin: 30px 0;
          }

          .strategy-card {
            background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%);
            border: 2px solid #ccfbf1;
            border-radius: 16px;
            padding: 25px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
          }

          .strategy-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #0d9488 0%, #14b8a6 50%, #0d9488 100%);
            transform: scaleX(0);
            transition: transform 0.3s ease;
          }

          .strategy-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(13, 148, 136, 0.15), 0 8px 16px rgba(13, 148, 136, 0.08);
            border-color: #0d9488;
          }

          .strategy-card:hover::before {
            transform: scaleX(1);
          }

          .strategy-card h3 {
            color: #0f766e;
            font-family: 'Crimson Text', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            line-height: 1.3;
          }

          .strategy-card .strategy-desc {
            color: #6b7280;
            font-size: 0.95rem;
            margin-bottom: 20px;
            line-height: 1.6;
          }

          .strategy-card .templates {
            color: #0d9488;
            font-weight: 700;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
          }

          .strategy-card .templates::before {
            content: "📝";
            margin-right: 6px;
            font-size: 1rem;
          }

          .email-templates {
            background: linear-gradient(135deg, #ccfbf1 0%, #a7f3d0 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            text-align: center;
            border: 2px solid #14b8a6;
          }

          .email-templates h3 {
            color: #0f766e;
            font-family: 'Crimson Text', serif;
            font-size: 1.8rem;
            font-weight: 600;
            margin-bottom: 20px;
          }

          .templates-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 25px;
          }

          .template-item {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #14b8a6;
            transition: transform 0.2s ease;
          }

          .template-item:hover {
            transform: scale(1.05);
          }

          .template-item .template-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #0d9488;
            margin-bottom: 8px;
          }

          .template-item .template-desc {
            font-size: 0.9rem;
            color: #6b7280;
          }

          .automation-section {
            background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%);
            border-radius: 16px;
            padding: 30px;
            margin: 30px 0;
            border: 2px solid #ccfbf1;
          }

          .automation-section h3 {
            color: #0f766e;
            font-family: 'Crimson Text', serif;
            font-size: 1.6rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-align: center;
          }

          .automation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }

          .automation-item {
            background: #ffffff;
            border-radius: 12px;
            padding: 20px;
            border: 1px solid #ccfbf1;
            text-align: center;
            box-shadow: 0 2px 8px rgba(13, 148, 136, 0.05);
          }

          .automation-item .automation-icon {
            font-size: 2rem;
            margin-bottom: 15px;
          }

          .automation-item .automation-title {
            font-size: 1rem;
            font-weight: 700;
            color: #0d9488;
            margin-bottom: 8px;
          }

          .automation-item .automation-desc {
            font-size: 0.9rem;
            color: #6b7280;
            line-height: 1.4;
          }

          @media (max-width: 768px) {
            .container {
              padding: 30px 20px;
            }
            .cover-page {
              padding: 70px 25px;
            }
            .cover-page h1 {
              font-size: 2.5rem;
            }
            .module {
              padding: 30px 20px;
            }
            .email-strategies {
              grid-template-columns: 1fr;
              gap: 20px;
            }
          }
        </style>
      </head>
      <body>
        <!-- Cover Page -->
        <div class="cover-page">
          <h1>Email Marketing Mastery System</h1>
          <p class="subtitle">Complete Email Marketing Course with Automation Sequences, Copywriting Templates, List Building Strategies & 50+ Ready-to-Use Email Templates</p>
          <p class="author">By Email Marketing Guru</p>
        </div>

        <div class="container">
          <!-- Course Overview -->
          <div class="module">
            <h2>Master Email Marketing from Zero to Hero</h2>
            <p style="color: #374151; font-size: 1.1rem; margin-bottom: 20px;">Transform your email list into your most profitable asset. This comprehensive course covers everything from building your first list to creating automated sequences that convert subscribers into loyal customers and brand advocates.</p>

            <div class="email-templates">
              <h3>50+ Professional Email Templates Included</h3>
              <div class="templates-grid">
                <div class="template-item">
                  <div class="template-name">Welcome Sequence</div>
                  <div class="template-desc">5-email onboarding series</div>
                </div>
                <div class="template-item">
                  <div class="template-name">Product Launch</div>
                  <div class="template-desc">Pre-launch to post-launch</div>
                </div>
                <div class="template-item">
                  <div class="template-name">Re-engagement</div>
                  <div class="template-desc">Win back inactive subscribers</div>
                </div>
                <div class="template-item">
                  <div class="template-name">Seasonal Promotions</div>
                  <div class="template-desc">Holiday and event campaigns</div>
                </div>
                <div class="template-item">
                  <div class="template-name">Newsletter Content</div>
                  <div class="template-desc">Weekly value delivery</div>
                </div>
                <div class="template-item">
                  <div class="template-name">Sales Funnels</div>
                  <div class="template-desc">Tripwire to high-ticket</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email Marketing Strategies -->
          <div class="module">
            <h2>Core Email Marketing Strategies</h2>
            <div class="email-strategies">
              <div class="strategy-card">
                <h3>List Building Mastery</h3>
                <div class="strategy-desc">Lead magnets, opt-in forms, popups, and ethical growth strategies to build a high-quality email list that converts.</div>
                <div class="templates">5 templates</div>
              </div>

              <div class="strategy-card">
                <h3>Copywriting That Converts</h3>
                <div class="strategy-desc">Subject line formulas, email body structure, and psychological triggers that boost open rates and clicks.</div>
                <div class="templates">15 templates</div>
              </div>

              <div class="strategy-card">
                <h3>Automation Sequences</h3>
                <div class="strategy-desc">Welcome series, nurture campaigns, and sales funnels that work 24/7 without your constant attention.</div>
                <div class="templates">12 sequences</div>
              </div>

              <div class="strategy-card">
                <h3>Analytics & Optimization</h3>
                <div class="strategy-desc">Track performance, A/B testing, and data-driven improvements to continuously increase revenue.</div>
                <div class="templates">Dashboard templates</div>
              </div>
            </div>

            <div class="automation-section">
              <h3>Automation Workflows Included</h3>
              <div class="automation-grid">
                <div class="automation-item">
                  <div class="automation-icon">👋</div>
                  <div class="automation-title">Welcome Series</div>
                  <div class="automation-desc">Automatically onboard new subscribers with value-driven content</div>
                </div>
                <div class="automation-item">
                  <div class="automation-icon">🎯</div>
                  <div class="automation-title">Lead Nurture</div>
                  <div class="automation-desc">Warm up prospects with educational content before sales</div>
                </div>
                <div class="automation-item">
                  <div class="automation-icon">🛒</div>
                  <div class="automation-title">Sales Funnel</div>
                  <div class="automation-desc">Tripwire → Core → Profit maximizer sequences</div>
                </div>
                <div class="automation-item">
                  <div class="automation-icon">🔄</div>
                  <div class="automation-title">Re-engagement</div>
                  <div class="automation-desc">Win back inactive subscribers automatically</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // For other products, return a placeholder
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${product.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          color: #333;
        }
        .loading {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="loading">
        <h2>${product.title}</h2>
        <p>AI is generating the complete design...</p>
        <p style="font-size: 0.9em; color: #999;">This preview will be replaced with AI-generated content</p>
      </div>
    </body>
    </html>
  `;
}

export default function CommunitySection() {

  // Sample products using real AI templates
  const sampleProducts: ProductItem[] = [
    {
      id: 'ebook-fitness-001',
      title: 'The Ultimate Body Transformation Blueprint',
      type: 'ebook',
      category: 'Fitness & Health',
      description: 'Transform your physique in 90 days with this comprehensive guide that combines cutting-edge science with practical strategies for sustainable fat loss and muscle gain.',
      author: 'Fitness Transformation Expert',
      skinName: 'fast_skin',
      primaryColor: '#ff4757',
      secondaryColor: '#ff6b6b',
      accentColor: '#ff9f43',
      backgroundColor: 'linear-gradient(135deg,#1a1a1a,#2d2d2d)',
      textColor: '#e8e8e8'
    },
    {
      id: 'checklist-productivity-002',
      title: 'Morning Success Ritual Checklist',
      type: 'checklist',
      category: 'Productivity',
      description: 'Start your day with intention using this comprehensive checklist designed to optimize your morning routine and set you up for success.',
      author: 'Productivity Coach',
      skinName: 'checklist_morning',
      primaryColor: '#10B981',
      secondaryColor: '#34D399',
      accentColor: '#F59E0B',
      backgroundColor: '#ECFDF5',
      textColor: '#064E3B'
    },
    {
      id: 'worksheet-goal-setting-003',
      title: 'SMART Goal Setting Worksheet',
      type: 'worksheet',
      category: 'Personal Development',
      description: 'Transform your dreams into achievable goals with this interactive worksheet that guides you through the SMART goal-setting framework.',
      author: 'Life Coach',
      skinName: 'worksheet_blue',
      primaryColor: '#3B82F6',
      secondaryColor: '#60A5FA',
      accentColor: '#F59E0B',
      backgroundColor: '#EFF6FF',
      textColor: '#1E3A8A'
    },
    {
      id: 'course-blueprint-business-004',
      title: 'Online Business Launch Blueprint',
      type: 'course-blueprint',
      category: 'Entrepreneurship',
      description: 'Launch your profitable online business in 30 days with this comprehensive course blueprint including modules, assignments, and success strategies.',
      author: 'Business Strategist',
      skinName: 'business_blueprint',
      primaryColor: '#000000',
      secondaryColor: '#333333',
      accentColor: '#FFD700',
      backgroundColor: '#000000',
      textColor: '#FFFFFF'
    },
    {
      id: 'ebook-fitness-clients-007',
      title: 'How to Attract More Fitness Clients: A Mini Guide for Coaches',
      type: 'ebook',
      category: 'Fitness & Health',
      description: 'A comprehensive mini guide for fitness coaches on attracting more clients, building trust, and growing a thriving coaching business.',
      author: 'Fitness Coach Expert',
      skinName: 'fitness_clients_red',
      primaryColor: '#DC2626',
      secondaryColor: '#EF4444',
      accentColor: '#F59E0B',
      backgroundColor: '#FEF2F2',
      textColor: '#7F1D1D'
    },
    {
      id: 'ebook-mindful-living-006',
      title: 'The Art of Mindful Living',
      type: 'ebook',
      category: 'Wellness & Mindfulness',
      description: 'Discover the transformative power of mindfulness with ancient wisdom adapted for modern life, including meditation techniques and stress management strategies.',
      author: 'Daniel Rowan Hartley',
      skinName: 'mindful_living_green',
      primaryColor: '#059669',
      secondaryColor: '#34D399',
      accentColor: '#F59E0B',
      backgroundColor: '#ECFDF5',
      textColor: '#064E3B'
    },
    {
      id: 'worksheet-belly-fat-007',
      title: 'Lose Belly Fat Worksheet',
      type: 'worksheet',
      category: 'Fitness & Health',
      description: 'A comprehensive 30-day worksheet to lose belly fat through targeted exercises, nutrition tracking, and habit formation for sustainable results.',
      author: 'Fitness Nutrition Expert',
      skinName: 'belly_fat_orange',
      primaryColor: '#EA580C',
      secondaryColor: '#F97316',
      accentColor: '#DC2626',
      backgroundColor: '#FFF7ED',
      textColor: '#9A3412'
    },
    {
      id: 'worksheet-time-management-008',
      title: 'Time Management Mastery Worksheet',
      type: 'worksheet',
      category: 'Productivity',
      description: 'Transform your productivity with this interactive worksheet featuring time-blocking techniques, priority matrices, and goal-setting frameworks.',
      author: 'Productivity Strategist',
      skinName: 'time_management_purple',
      primaryColor: '#7C3AED',
      secondaryColor: '#A855F7',
      accentColor: '#F59E0B',
      backgroundColor: '#F3E8FF',
      textColor: '#581C87'
    },
    {
      id: 'course-blueprint-smma-009',
      title: 'Scaling SMMA Agency to 10K/Month Blueprint',
      type: 'course-blueprint',
      category: 'Entrepreneurship',
      description: 'Complete 12-week course blueprint to scale your social media marketing agency from startup to $10K monthly recurring revenue.',
      author: 'Agency Scaling Expert',
      skinName: 'smma_scaling_blue',
      primaryColor: '#1D4ED8',
      secondaryColor: '#3B82F6',
      accentColor: '#10B981',
      backgroundColor: '#EFF6FF',
      textColor: '#1E3A8A'
    },
    {
      id: 'ebook-discipline-summary-010',
      title: 'YouTube Discipline Journey Summary',
      type: 'ebook',
      category: 'Personal Development',
      description: 'A comprehensive summary of 200+ YouTube videos that finally helped me build unbreakable discipline, featuring key insights and actionable frameworks.',
      author: 'Discipline Mastery Coach',
      skinName: 'discipline_red',
      primaryColor: '#DC2626',
      secondaryColor: '#EF4444',
      accentColor: '#F59E0B',
      backgroundColor: '#FEF2F2',
      textColor: '#7F1D1D'
    },
    {
      id: 'course-social-media-growth-011',
      title: 'Social Media Growth Accelerator Course',
      type: 'course-blueprint',
      category: 'Social Media',
      description: '8-week comprehensive course teaching Instagram and TikTok growth strategies, algorithm hacks, content calendars, and viral posting techniques.',
      author: 'Social Media Strategist',
      skinName: 'social_growth_pink',
      primaryColor: '#EC4899',
      secondaryColor: '#F472B6',
      accentColor: '#10B981',
      backgroundColor: '#FDF2F8',
      textColor: '#BE185D'
    },
    {
      id: 'ebook-passive-income-playbook-012',
      title: 'Passive Income Playbook',
      type: 'ebook',
      category: 'Entrepreneurship',
      description: 'Complete guide to building multiple passive income streams through digital products, affiliate marketing, and automated online businesses.',
      author: 'Passive Income Expert',
      skinName: 'passive_income_gold',
      primaryColor: '#D97706',
      secondaryColor: '#F59E0B',
      accentColor: '#7C3AED',
      backgroundColor: '#FFFBEB',
      textColor: '#92400E'
    },
    {
      id: 'course-email-marketing-mastery-013',
      title: 'Email Marketing Mastery System',
      type: 'course-blueprint',
      category: 'Marketing',
      description: 'Complete email marketing course with automation sequences, copywriting templates, list building strategies, and 50+ ready-to-use email templates.',
      author: 'Email Marketing Guru',
      skinName: 'email_marketing_teal',
      primaryColor: '#0D9488',
      secondaryColor: '#14B8A6',
      accentColor: '#F59E0B',
      backgroundColor: '#F0FDFA',
      textColor: '#0F766E'
    }
  ];

  // State for selected product modal
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Some products created with <span className="text-gray-900">Sellable</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI transforms simple ideas into professional, sellable products.
            Each preview shows a complete product design ready for market.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-200"
              onClick={() => setSelectedProduct(product)}
            >
              {/* Product Preview */}
              <div className="h-72 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center relative overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  srcDoc={generateProductPreview(product)}
                  className="w-full h-full border-0"
                  title={`${product.title} Preview`}
                  sandbox="allow-scripts"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    Click to preview
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.category === 'Fitness & Health' ? 'bg-blue-100 text-blue-800' :
                    product.category === 'Productivity' ? 'bg-green-100 text-green-800' :
                    product.category === 'Personal Development' ? 'bg-blue-100 text-blue-800' :
                    product.category === 'Entrepreneurship' ? 'bg-gray-100 text-gray-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.category}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">{product.type.replace('-', ' ')}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">by {product.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
              <div className="flex justify-between items-center p-6 border-b">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{selectedProduct.title}</h3>
                  <p className="text-gray-600">by {selectedProduct.author}</p>
                </div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <iframe
                  srcDoc={generateProductPreview(selectedProduct)}
                  className="w-full h-[600px] border-0 rounded-lg"
                  title={`${selectedProduct.title} Full Preview`}
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
