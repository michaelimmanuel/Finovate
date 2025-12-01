"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section id="subscribe" className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <motion.h2
          className="font-heading text-3xl md:text-5xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to get started?
        </motion.h2>
        <motion.div
          className="mx-auto mt-6 flex w-full max-w-lg items-center justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Button asChild variant="accent">
            <Link href="/signup">Create your account</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
