import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { Search } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'

export default function Layout() {
  const [query, setQuery] = useState('')
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar query={query} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b flex items-center px-6 gap-4 shrink-0 bg-white">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Szukaj komponentu..."
              className="w-full pl-9 pr-12 py-2 text-sm bg-muted/50 rounded-lg border border-transparent outline-none focus:border-border focus:bg-white transition-colors placeholder:text-muted-foreground/60"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/50 font-mono pointer-events-none">
              /
            </kbd>
          </div>

          {/* Version */}
          <div className="ml-auto">
            <span className="text-[11px] text-muted-foreground/50 font-mono tracking-wide">v0.1.0</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          <Outlet context={{ query }} />
        </main>
      </div>
      <Toaster />
    </div>
  )
}
