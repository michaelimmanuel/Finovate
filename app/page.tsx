import { Hero } from "@/components/sections/Hero"
import { DailyDigest } from "@/components/sections/DailyDigest"
import { AIAnalysis } from "@/components/sections/AIAnalysis"
import { LatestArticles } from "@/components/sections/LatestArticles"
import { FinalCTA } from "@/components/sections/FinalCTA"
import { Footer } from "@/components/sections/Footer"
import { ScrollProgress } from "@/components/ScrollProgress"
import FeaturesOnboardingModal from "@/components/modals/Preview" 


export default function Home() {
  return (
    <main className="bg-white text-black z-90">
      <FeaturesOnboardingModal />
      <ScrollProgress />
      <Hero />
      <DailyDigest />
      <AIAnalysis />
      <LatestArticles />
      <FinalCTA />
      <Footer />
    </main>
  )
}
