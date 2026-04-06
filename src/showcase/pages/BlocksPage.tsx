import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { blockRegistry } from '../../registry/blocks'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

const BLOCK_SOURCES: Record<string, string> = {}

export default function BlocksPage() {
  const { query } = useOutletContext<{ query: string }>()
  const [copied, setCopied] = useState<string | null>(null)

  const filtered = query.trim()
    ? blockRegistry.filter(b => b.title.toLowerCase().includes(query.toLowerCase()) || b.description.toLowerCase().includes(query.toLowerCase()))
    : blockRegistry

  const handleCopy = async (slug: string, source?: string) => {
    const text = source ?? `// ${slug} – skopiuj plik src/components/blocks/${slug.replace('block-', '')}.tsx`
    await navigator.clipboard.writeText(text)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">
      {!query && (
        <div className="mb-10">
          <h1 className="text-2xl font-semibold mb-1.5 tracking-tight">Bloki</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Gotowe sekcje złożone z bazowych komponentów. Kopiuj i używaj bezpośrednio w projektach.
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Brak wyników dla &ldquo;{query}&rdquo;</p>
      ) : (
        <div className="space-y-12">
          {filtered.map(block => (
            <div key={block.slug} className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-sm font-semibold">{block.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{block.description}</p>
                </div>
                <Button
                  size="sm" variant="outline"
                  className="gap-1.5 shrink-0"
                  onClick={() => handleCopy(block.slug, block.source)}
                >
                  {copied === block.slug
                    ? <><Check className="w-3.5 h-3.5" />Skopiowano</>
                    : <><Copy className="w-3.5 h-3.5" />Kopiuj kod</>
                  }
                </Button>
              </div>
              {block.examples.map((ex, i) => (
                <div key={i} className="border rounded-xl bg-white px-8 py-10 flex items-center justify-center min-h-28">
                  <ex.render />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
