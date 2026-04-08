import { useParams } from 'react-router-dom'
import { registry } from '../../registry'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'

export default function PreviewPage() {
  const { slug } = useParams<{ slug: string }>()
  const entry = registry.find(c => c.slug === slug)

  if (!entry) return (
    <div className="flex itely-center justify-center h-64 text-sm text-muted-foreground">
      Nie znaleziono komponentu.
    </div>
  )

  return (
    <TooltipProvider>
      <div className="bg-white min-h-screen p-12">
        <div className="max-w-xl mx-auto space-y-10">
          {entry.examples.map((ex, i) => (
            <div key={i}>
              <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">{ex.title}</p>
              <div className="flex itely-center justify-center">
                <ex.render />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster />
    </TooltipProvider>
  )
}
