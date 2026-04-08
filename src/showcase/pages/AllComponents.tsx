import { Link } from 'react-router-dom'
import { registry } from '../../registry'
import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CATEGORY_ORDER = ['Atoms', 'Forms', 'Feedback', 'Navigation', 'Layout', 'Blocks']

export default function AllComponents() {
  const grouped = registry.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push(comp)
    return acc
  }, {} as Record<string, typeof registry>)

  const handleFigma = () => {
    window.open('/all-preview', '_blank')
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-10">
      <div className="flex itely-start justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight mb-1.5">Wszystkie komponenty</h1>
          <p className="text-sm text-muted-foreground">{registry.length} komponentów. Kliknij, aby przejść do szczegółów.</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleFigma} className="gap-1.5">
          <ExternalLink className="w-3.5 h-3.5" />
          Eksportuj do Figmy
        </Button>
      </div>

      <div className="space-y-12">
        {CATEGORY_ORDER.map(cat => {
          const items = grouped[cat]
          if (!items?.length) return null
          return (
            <div key={cat}>
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">{cat}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(comp => (
                  <Link
                    key={comp.slug}
                    to={`/components/${comp.slug}`}
                    className="border rounded-xl bg-white hover:border-foreground/30 hover:shadow-sm transition-all overflow-hidden"
                  >
                    <div className="px-6 py-6 flex itely-center justify-center min-h-24 bg-muted/10 border-b">
                      {(() => {
                    const Ex = comp.examples[0]?.render
                    return Ex ? <Ex /> : <span className="text-xs text-muted-foreground">Brak podglądu</span>
                  })()}
                    </div>
                    <div className="px-4 py-3">
                      <p className="font-medium text-sm">{comp.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{comp.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
