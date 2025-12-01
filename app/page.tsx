"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-10">
      <motion.h1
        className="text-4xl font-bold"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Finovate
      </motion.h1>

      <p className="mt-2 text-gray-600">Next.js + Tailwind v4 + shadcn/ui + Framer Motion</p>

      <div className="mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>UI Demo</CardTitle>
          </CardHeader>
          <CardContent className="space-x-3">
            <Button onClick={() => alert("Primary clicked")}>Primary</Button>
            <Button variant="outline">Outline</Button>
          </CardContent>
        </Card>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="rounded-lg border p-6"
        >
          <p className="text-sm text-gray-700">Framer Motion animated container</p>
        </motion.div>
      </div>
    </main>
  )
}
