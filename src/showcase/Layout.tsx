import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { Search } from 'lucide-react'

export default function Layout() {
  const [query, setQuery] = useState('')
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar query={query} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-13 border-b flex items-center px-6 gap-4 shrink-0 bg-white">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Szukaj komponentu..."
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-muted/60 rounded-md outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
            />
          </div>
          <div className="ml-auto">
            <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md">v0.1.0</span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-[#fafafa]">
          <Outlet context={{ query }} />
        </main>
      </div>
    </div>
  )
}
