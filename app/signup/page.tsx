"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get("email") || "").trim()
    const password = String(fd.get("password") || "").trim()
    if (!email || !password) { setError("Email and password are required."); return }
    setLoading(true)
    // Demo-only: simulate success without any API call
    setTimeout(() => {
      setDone(true)
      setLoading(false)
    }, 700)
  }

  return (
    <main className="bg-white text-black min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="font-heading text-2xl tracking-tight">Finovate</div>
      </div>
      <div className="mx-auto max-w-xl px-6 pb-24">
        <h1 className="font-heading text-4xl md:text-5xl">Create your account</h1>
        <p className="mt-2 text-sm opacity-80">Personalize your feed and save your reads. Strictly monochrome, no noise.</p>

        {done ? (
          <div className="mt-8 rounded-xl border p-6">
            <div className="font-heading text-xl mb-1">You're in.</div>
            <p className="text-sm opacity-80">Account created (stub). We'll wire auth next. You can head back to the <a href="/" className="underline">homepage</a>.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-8 space-y-4 max-w-md">
            <div>
              <label className="mb-1 block text-sm opacity-70">Email</label>
              <Input name="email" type="email" placeholder="you@domain.com" className="bg-transparent" />
            </div>
            <div>
              <label className="mb-1 block text-sm opacity-70">Password</label>
              <Input name="password" type="password" placeholder="••••••••" className="bg-transparent" />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <div className="pt-2">
              <Button type="submit" disabled={loading} className="bg-black text-white hover:bg-black/90">
                {loading ? "Creating..." : "Create account"}
              </Button>
            </div>
            <div className="text-xs opacity-60">Demo only — no backend. By creating an account, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>.</div>
          </form>
        )}
      </div>
    </main>
  )
}
