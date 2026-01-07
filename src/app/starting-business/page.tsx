import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function StartingBusinessPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section - Clean and focused */}
        <section className="min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-300/80 to-orange-400/90">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 leading-tight">
              <span className="text-gray-900 text-4xl sm:text-5xl lg:text-6xl mr-4">Planning</span>
              <span className="text-[#000000]">is over.</span>
              <br />
              <span className="text-gray-900">Business begins.</span>
            </h1>

            {/* CTA Button */}
            <button className="bg-[#000000] text-white px-8 py-3 rounded-xl text-base font-semibold hover:bg-gray-900 transition-colors duration-300">
              Start Creating Now
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Make your business unstoppable
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Everything you need to turn ideas into income-generating digital products
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-orange-200/50 hover:border-orange-200 transition-all duration-300">
                <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Design not just text
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Create visually stunning products with professional layouts, graphics, and branding that make your content stand out.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-200 transition-all duration-300">
                <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Podcasts with real AI voices
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate professional audio content with natural-sounding AI voices that engage your audience like never before.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-orange-200/50 hover:border-orange-200 transition-all duration-300">
                <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Pricing and description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Get optimal pricing strategies and compelling product descriptions that convert browsers into buyers.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-200 transition-all duration-300">
                <div className="w-12 h-12 bg-[#000000] rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Ways to promote your product
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Discover proven marketing strategies and sales channels to effectively promote and sell your digital products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Slideshow */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                What you can build
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Transform your ideas into professional digital products
              </p>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="slideshow-container relative h-80">
                {/* Slide 1 - Podcasts */}
                <div className="slide absolute inset-0 opacity-100 transition-all duration-1000 transform translate-x-0">
                  <div className="grid lg:grid-cols-2 h-full">
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Podcasts
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        Create engaging podcast episodes with AI-generated scripts, show notes, and marketing materials. Perfect for building your audience and establishing authority in your niche.
                      </p>
                    </div>
                    <div className="bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        <p className="text-xs">Podcast Image</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 2 - Videos */}
                <div className="slide absolute inset-0 opacity-0 transition-all duration-1000 transform translate-x-full">
                  <div className="grid lg:grid-cols-2 h-full">
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Videos
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        Generate complete video content including scripts, thumbnails, and editing guidelines. Create engaging videos that captivate your audience and drive engagement.
                      </p>
                    </div>
                    <div className="bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs">Video Image</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 3 - Plans */}
                <div className="slide absolute inset-0 opacity-0 transition-all duration-1000 transform translate-x-full">
                  <div className="grid lg:grid-cols-2 h-full">
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Plans
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        Create detailed business plans, project roadmaps, and strategic documents. Perfect for entrepreneurs planning their next venture or project.
                      </p>
                    </div>
                    <div className="bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-xs">Plan Image</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slide 4 - Ebooks */}
                <div className="slide absolute inset-0 opacity-0 transition-all duration-1000 transform translate-x-full">
                  <div className="grid lg:grid-cols-2 h-full">
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Ebooks
                      </h3>
                      <p className="text-gray-600 text-base leading-relaxed">
                        Generate comprehensive ebooks with structured chapters, professional formatting, and engaging content. Perfect for establishing authority and generating leads.
                      </p>
                    </div>
                    <div className="bg-gray-100 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="text-xs">Ebook Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button className="slide-prev absolute left-4 bottom-6 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button className="slide-next absolute right-4 bottom-6 transform -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10">
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                <button className="slide-indicator w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors active"></button>
                <button className="slide-indicator w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors"></button>
                <button className="slide-indicator w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors"></button>
                <button className="slide-indicator w-3 h-3 rounded-full bg-white/50 hover:bg-white transition-colors"></button>
              </div>
            </div>
          </div>

          {/* Slideshow JavaScript */}
          <script dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const slides = document.querySelectorAll('.slide');
                const indicators = document.querySelectorAll('.slide-indicator');
                const prevBtn = document.querySelector('.slide-prev');
                const nextBtn = document.querySelector('.slide-next');
                let currentSlide = 0;
                let slideInterval;

                function showSlide(index) {
                  slides.forEach((slide, i) => {
                    slide.classList.toggle('opacity-100', i === index);
                    slide.classList.toggle('opacity-0', i !== index);
                    slide.classList.toggle('translate-x-0', i === index);
                    slide.classList.toggle('translate-x-full', i !== index);
                  });

                  indicators.forEach((indicator, i) => {
                    indicator.classList.toggle('bg-white', i === index);
                    indicator.classList.toggle('bg-white/50', i !== index);
                  });
                }

                function nextSlide() {
                  currentSlide = (currentSlide + 1) % slides.length;
                  showSlide(currentSlide);
                }

                function prevSlide() {
                  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                  showSlide(currentSlide);
                }

                function startSlideshow() {
                  slideInterval = setInterval(nextSlide, 6000);
                }

                function stopSlideshow() {
                  clearInterval(slideInterval);
                }

                // Arrow button handlers
                if (prevBtn) {
                  prevBtn.addEventListener('click', () => {
                    prevSlide();
                    stopSlideshow();
                    startSlideshow();
                  });
                }

                if (nextBtn) {
                  nextBtn.addEventListener('click', () => {
                    nextSlide();
                    stopSlideshow();
                    startSlideshow();
                  });
                }

                // Indicator click handlers
                indicators.forEach((indicator, index) => {
                  indicator.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                    stopSlideshow();
                    startSlideshow();
                  });
                });

                // Start slideshow
                startSlideshow();
              });
            `
          }} />
        </section>

        {/* How it Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                How it works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From idea to product in just a few simple steps
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left side - Image placeholder */}
              <div className="lg:col-span-1">
                <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center sticky top-8">
                  <div className="text-center text-gray-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">Image coming soon</p>
                  </div>
                </div>
              </div>

              {/* Right side - Steps */}
              <div className="lg:col-span-1">
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Describe Your Idea
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Tell us about your expertise, target audience, and the problem you want to solve. Our AI understands context and generates relevant content.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        AI Creates Your Product
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Watch as our advanced AI generates professional content, designs, and marketing materials tailored specifically to your needs.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Launch & Profit
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Download your complete digital product package and start selling on any platform you choose.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA & FAQ Combined Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* CTA Section - Smaller */}
              <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-orange-500 text-white rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6 leading-tight">
                    Ready to see what's <span className="text-white">possible</span>?
                  </h2>
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-xl text-base font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                    Start Creating Now
                  </button>
                </div>
              </div>

              {/* FAQ Section - Accordion Style */}
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-lg text-gray-600">
                    Common questions about starting your business
                  </p>
                </div>

                <div className="space-y-3" id="faq-accordion">
                  {/* FAQ Item 1 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[60px]">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-1"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Do I need business experience to use Sellable?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-1">
                      Absolutely not! Sellable is built for beginners. Our AI handles all the complex parts while you focus on what you know best - your expertise and passion.
                    </div>
                  </div>

                  {/* FAQ Item 2 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[60px]">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-2"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        How long does it take to create a product?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-2">
                      Most users create their first complete product in under 2 minutes. The AI handles the complex work while you focus on your ideas and goals.
                    </div>
                  </div>

                  {/* FAQ Item 3 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[60px]">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-3"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        What types of products can I create?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-3">
                      You can create PDFs, e-books, podcasts, marketing materials, business plans, and much more. Any digital product that helps solve problems or provide value.
                    </div>
                  </div>

                  {/* FAQ Item 4 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[60px]">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Can I really make money with digital products?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-4">
                      Absolutely! Thousands of creators earn passive income through digital products. With proper pricing and marketing strategies (which Sellable provides), you can build a sustainable business.
                    </div>
                  </div>

                  {/* FAQ Item 5 */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[60px]">
                    <button
                      className="w-full px-6 py-4 text-left flex justify-between items-center faq-toggle"
                      data-target="faq-5"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        Is there any setup required?
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-gray-600 transform transition-transform duration-300 faq-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                    </button>
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed faq-content hidden" id="faq-5">
                      None! Sellable works directly in your browser. Just describe your idea, and our AI creates everything you need - from content to design to marketing materials.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ JavaScript */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const toggles = document.querySelectorAll('.faq-toggle');

              toggles.forEach(toggle => {
                toggle.addEventListener('click', function() {
                  const targetId = this.getAttribute('data-target');
                  const content = document.getElementById(targetId);
                  const icon = this.querySelector('.faq-icon');

                  // Close all other FAQ items
                  document.querySelectorAll('.faq-content').forEach(item => {
                    if (item.id !== targetId) {
                      item.classList.add('hidden');
                      const otherIcon = item.parentElement.querySelector('.faq-icon');
                      if (otherIcon) {
                        otherIcon.classList.remove('rotate-45');
                      }
                    }
                  });

                  // Toggle current item
                  content.classList.toggle('hidden');
                  icon.classList.toggle('rotate-45');
                });
              });
            });
          `
        }} />
      </main>

      <Footer />
    </div>
  )
}
