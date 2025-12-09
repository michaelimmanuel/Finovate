"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Threads from "@/components/visuals/Threads"

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function Hero() {
  useEffect(() => {
    // Reserved for future hero-specific effects
  }, [])

  return (
    <header className="relative min-h-[70svh] md:min-h-[90svh] bg-white text-black overflow-hidden">

      {/* Hero content container: centered and responsive without absolute positioning on mobile */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative min-h-[70svh] md:min-h-[90svh]">
          {/* Threads only under the text area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full z-0 pointer-events-none">
            <Threads color={[1, 0.9, 0.6]} amplitude={0.9} distance={0.35} enableMouseInteraction={false} />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center pt-10 sm:pt-16 md:pt-24 pb-12">
          <motion.h1
            className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-tight"
            {...fadeUp}
          >
            Innovate Your Finance and Technology
          </motion.h1>

          <motion.p
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1 } }}
          >
            Get a 50‑second daily digest and crisp AI analysis on stocks and crypto.
          </motion.p>

          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.18 } }}
          >
            <Button asChild variant="accent">
              <Link href="/signup">Create your account</Link>
            </Button>
          </motion.div>

          <div className="mt-3 text-xs sm:text-[13px] text-neutral-600">
            You can also browse <a href="#articles" className="underline">latest articles</a>.
          </div>
          </div>
        </div>
      </div>
    </header>
  )
}
