import { Link, useOutletContext } from 'react-router-dom'
import { registry } from '../../registry'

const CATEGORY_ORDER = ['Atoms', 'Forms', 'Feedback', 'Navigation', 'Layout', 'Blocks']
const CATEGORY_DESC: Record<string, string> = {
  Atoms:      'Podstawowe elementy interfejsu',
  Forms:      'Pola i elementy formularzy',
  Feedback:   'Komunikaty i stany systemu',
  Navigation: 'Elementy nawigacji',
  Layout:     'Kontenery i struktury',
  Blocks:     'Gotowe sekcje i widoki',
}

export default function Home() {
  const { query } = useOutletContext<{ query: string }>()

  const filtered = query.trim()
    ? registry.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
    : registry

  const grouped = filtered.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push(comp)
    return acc
  }, {} as Record<string, typeof registry>)

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      {!query && (
        <div className="mb-10">
          <h1 className="text-2xl font-semibold mb-1.5 tracking-tight">Atomic UI</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Centralna biblioteka komponentow React + Tailwind + Shadcn/ui.
            Tworzysz, przegladasz i eksportujesz do swoich projektow.
          </p>
        </div>
      )}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Brak wynikow dla &ldquo;{query}&rdquo;</p>
      ) : (
        <div className="space-y-10">
          {CATEGORY_ORDER.map(cat => {
            const items = grouped[cat]
            if (!items?.length) return null
            return (
              <div key={cat}>
                <div className="flex items-baseline gap-3 mb-4">
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{cat}</h2>
                  {!query && <span className="text-xs text-muted-foreground/60">{CATEGORY_DESC[cat]}</span>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {items.map(comp => (
                    <Link
                      key={comp.slug}
                      to={`/components/${comp.slug}`}
                      className="border rounded-lg p-4 bg-white hover:border-foreground/30 hover:shadow-sm transition-all group"
                    >
                      <p className="font-medium text-sm">{comp.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">{comp.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
