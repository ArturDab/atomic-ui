import { registry } from '../../registry'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'

const CATEGORY_ORDER = ['Atoms', 'Forms', 'Feedback', 'Navigation', 'Layout', 'Blocks']

export default function AllPreviewPage() {
  const grouped = registry.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = []
    acc[comp.category].push(comp)
    return acc
  }, {} as Record<string, typeof registry>)

  return (
    <TooltipProvider>
      <div className="bg-white min-h-screen p-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold mb-2 tracking-tight">Atomic UI</h1>
          <p className="text-sm text-muted-foreground mb-12">Biblioteka komponentów React + Tailwind + Shadcn/ui</p>

          {CATEGORY_ORDER.map(cat => {
            const items = grouped[cat]
            if (!items?.length) return null
            return (
              <div key={cat} className="mb-16">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-8">{cat}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map(comp => (
                    <div key={comp.slug} className="border rounded-xl overflow-hidden">
                      <div className="px-6 py-8 flex itely-center justify-center min-h-24 bg-muted/10 border-b">
                        {(() => { const Ex = comp.examples[0]?.render; return Ex ? <Ex /> : null })()}
                      </div>
                      <div className="px-4 py-3">
                        <p className="font-medium text-sm">{comp.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}
