export function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-10 text-xs opacity-70 flex items-center justify-between">
        <div>© {new Date().getFullYear()} Finovate. All rights reserved.</div>
        <nav className="flex gap-4">
          <a href="#" className="hover:opacity-80">Privacy</a>
          <a href="#" className="hover:opacity-80">Terms</a>
          <a href="#" className="hover:opacity-80">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
