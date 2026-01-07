import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import CommunitySection from '@/components/CommunitySection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Background - must be first for proper layering */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .playground-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(
                to bottom,
                #ffffff 0%,    /* Weiß */
                #fefefe 10%,   /* Fast weiß */
                #f1f5f9 25%,   /* Sehr hell blau */
                #e2e8f0 45%,   /* Hell blau */
                #cbd5e1 65%,   /* Mittel blau */
                #94a3b8 80%,   /* Blau */
                #fdba74 90%,   /* Hell orange */
                #fb923c 100%   /* Orange */
            );
            z-index: -1;
            pointer-events: none;
            animation: backgroundFadeIn 1.5s ease-out;
            opacity: 1;
          }

          @keyframes backgroundFadeIn {
            0% {
              opacity: 0;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `
      }} />

      <div className="playground-background" key={Date.now()}></div>

      <Header />
      <main>
        <HeroSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  )
}
