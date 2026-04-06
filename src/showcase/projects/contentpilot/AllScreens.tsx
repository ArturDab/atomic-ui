import * as React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Maximize2, X } from 'lucide-react'
import DashboardScreen from './DashboardScreen'
import DocumentsScreen from './DocumentsScreen'
import EditorScreen from './EditorScreen'
import PromptsScreen from './PromptsScreen'
import SettingsScreen from './SettingsScreen'

const SCREENS = [
  { path: 'dashboard', label: 'Dashboard',    Component: DashboardScreen },
  { path: 'documents', label: 'Dokumenty',    Component: DocumentsScreen },
  { path: 'editor',    label: 'Edytor',       Component: EditorScreen },
  { path: 'prompts',   label: 'Prompty',      Component: PromptsScreen },
  { path: 'settings',  label: 'Ustawienia',   Component: SettingsScreen },
]

export default function AllScreens() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const [fullscreen, setFullscreen] = React.useState<string | null>(null)

  const fullItem = SCREENS.find(s => s.path === fullscreen)

  return (
    <>
      {/* Fullscreen overlay */}
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

      {/* Grid */}
      <div className="overflow-y-auto h-full bg-[#fafafa] px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-xl font-semibold tracking-tight mb-1">ContentPilot – wszystkie widoki</h1>
            <p className="text-xs text-muted-foreground">Kliknij widok, aby go otworzyć. Użyj ikony pełnego ekranu, aby zobaczyć szczegóły.</p>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
            {SCREENS.map(({ path, label, Component }) => (
              <div key={path} className="group border rounded-xl bg-white overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all">
                {/* Scaled preview */}
                <Link to={`/projects/${projectSlug}/${path}`} className="block">
                  <div className="relative h-48 overflow-hidden bg-muted/20">
                    <div
                      className="absolute top-0 left-0 pointer-events-none"
                      style={{ width: '1280px', height: '720px', transform: 'scale(0.234)', transformOrigin: 'top left' }}
                    >
                      <div style={{ width: '1280px', height: '720px' }} className="overflow-hidden">
                        <Component />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Footer */}
                <div className="px-4 py-3 border-t flex items-center justify-between">
                  <Link
                    to={`/projects/${projectSlug}/${path}`}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                  <button
                    onClick={() => setFullscreen(path)}
                    className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                    title="Pełny ekran"
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
