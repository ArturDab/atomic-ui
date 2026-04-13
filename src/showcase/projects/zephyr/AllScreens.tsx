/**
 * Zephyr – All Screens
 * Siatka miniatur wszystkich ekranów projektu.
 */
import { Link, useParams } from 'react-router-dom'

const SCREENS = [
  { path: 'zp-clients',        label: 'Klienci',              description: 'Lista klientów z podglądem aktywności' },
  { path: 'zp-client-config',  label: 'Konfiguracja klienta', description: 'Wygląd, AI, UTM, sekcje per klient' },
  { path: 'zp-section-library', label: 'Biblioteka sekcji',   description: 'Globalne i per-klient sekcje HTML' },
  { path: 'zp-creator',        label: 'Kreator',              description: 'Brief, sekcje, grafiki, URL-e + UTM' },
  { path: 'zp-artifact',       label: 'Artefakt',             description: 'Podgląd desktop/mobile + AI chat + HTML' },
  { path: 'zp-history',        label: 'Historia',             description: 'Archiwum wygenerowanych newsletterów' },
]

export default function AllScreens() {
  const { projectSlug } = useParams<{ projectSlug: string }>()

  return (
    <div className="p-8 bg-muted/30 min-h-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Zephyr – wszystkie ekrany</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kreator newsletterów z konfiguracją per klient, biblioteką sekcji i generacją AI.
        </p>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        {SCREENS.map(screen => (
          <Link
            key={screen.path}
            to={`/projects/${projectSlug}/${screen.path}`}
            className="group block bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Miniatura – placeholder z inicjałami */}
            <div className="h-36 bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center border-b group-hover:from-sky-100 group-hover:to-sky-200 transition-colors">
              <span className="text-4xl font-bold text-sky-200 select-none group-hover:text-sky-300 transition-colors">
                {screen.label.slice(0, 2)}
              </span>
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold">{screen.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{screen.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
