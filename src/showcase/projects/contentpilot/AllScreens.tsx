import * as React from 'react'
import { useParams } from 'react-router-dom'
import { Maximize2, X } from 'lucide-react'
import AIChatScreen from './AIChatScreen'
import AITeamsScreen from './AITeamsScreen'

const SCREENS = [
  { path: 'ai-chat',  label: 'AI Chat',   Component: AIChatScreen },
  { path: 'ai-teams', label: 'AI Teams',  Component: AITeamsScreen },
]

export default function AllScreens() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const [fullscreen, setFullscreen] = React.useState<string | null>(null)

  const fullItem = SCREENS.find(s => s.path === fullscreen)

  return (
    <>
      {fullItem && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="h-10 border-b bg-white flex items-center px-4 justify-between shrink-0">
            <span className="text-xs font-medium text-muted-foreground">{fullItem.label}</span>
            <button
              onClick={() => setFullscreen(null)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Zamknij
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <fullItem.Component />
          </div>
        </div>
      )}

      <div className="overflow-y-auto h-full bg-[#fafafa] px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-xl font-semibold tracking-tight mb-1">ContentPilot – widoki</h1>
            <p className="text-xs text-muted-foreground">Kliknij widok, aby go otworzyć. Ikona pełnego ekranu dla podglądu 1:1.</p>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
            {SCREENS.map(({ path, label, Component }) => (
              <div key={path} className="group border rounded-xl bg-white overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all">
                <div className="relative h-48 overflow-hidden bg-muted/10">
                  <div
                    className="absolute top-0 left-0 pointer-events-none origin-top-left"
                    style={{ width: '1280px', height: '720px', transform: 'scale(0.234)' }}
                  >
                    <div style={{ width: '1280px', height: '720px' }} className="overflow-hidden">
                      <Component />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-t flex items-center justify-between">
                  <span className="text-sm font-medium">{label}</span>
                  <button
                    onClick={() => setFullscreen(path)}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
