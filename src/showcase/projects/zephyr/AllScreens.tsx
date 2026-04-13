/**
 * Zephyr – All Screens
 * Siatka miniatur wszystkich widoków prototypu.
 */
import { Link, useParams } from 'react-router-dom'
import ClientsScreen from './ClientsScreen'
import ClientConfigScreen from './ClientConfigScreen'
import SectionLibraryScreen from './SectionLibraryScreen'
import CreatorScreen from './CreatorScreen'
import ArtifactScreen from './ArtifactScreen'
import HistoryScreen from './HistoryScreen'

const SCREENS = [
  { path: 'zp-clients',         label: 'Klienci',               Component: ClientsScreen },
  { path: 'zp-client-config',   label: 'Konfiguracja klienta',  Component: ClientConfigScreen },
  { path: 'zp-section-library', label: 'Biblioteka sekcji',     Component: SectionLibraryScreen },
  { path: 'zp-creator',         label: 'Kreator',               Component: CreatorScreen },
  { path: 'zp-artifact',        label: 'Artefakt',              Component: ArtifactScreen },
  { path: 'zp-history',         label: 'Historia',              Component: HistoryScreen },
]

export default function AllScreens() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  return (
    <div className="overflow-y-auto h-full bg-[#fafafa] px-8 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl font-semibold tracking-tight mb-1">Zephyr</h1>
          <p className="text-xs text-muted-foreground">
            Generator newsletterów HTML z AI – konfiguracja per klient, biblioteka sekcji, podgląd desktop/mobile.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {SCREENS.map(({ path, label, Component }) => (
            <Link
              key={path}
              to={`/projects/${projectSlug}/${path}`}
              className="group border rounded-xl bg-white overflow-hidden hover:border-foreground/30 hover:shadow-md transition-all"
            >
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
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                  Otwórz →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
