import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { registry } from '../../registry'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>()
  const [copied, setCopied] = useState(false)
  const entry = registry.find(c => c.slug === slug)

  if (!entry) {
    return (
      <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
        Nie znaleziono komponentu.
      </div>
    )
  }

  const handleCopy = async () => {
    if (!entry.source) return
    await navigator.clipboard.writeText(entry.source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFigma = () => {
    window.open(`/preview/${entry.slug}`, '_blank')
  }

  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-baseline gap-3 mb-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">{entry.title}</h1>
            <span className="text-xs text-muted-foreground border rounded-full px-2.5 py-0.5 bg-white">
              {entry.category}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{entry.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={handleCopy} className="gap-1.5">
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Skopiowano!' : 'Kopiuj kod'}
          </Button>
          <Button size="sm" variant="outline" onClick={handleFigma} className="gap-1.5" title="Otwórz podgląd – wklej URL do html.to.design w Figmie">
            <ExternalLink className="w-3.5 h-3.5" />
            Figma
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      <Tabs defaultValue="preview">
        <TabsList className="mb-6">
          <TabsTrigger value="preview">Podgląd</TabsTrigger>
          <TabsTrigger value="code" disabled={!entry.source}>Kod źródłowy</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-8">
          {entry.examples.map((example, i) => (
            <div key={i}>
              <p className="text-sm font-medium mb-3">{example.title}</p>
              {example.description && (
                <p className="text-xs text-muted-foreground -mt-2 mb-3 leading-relaxed">{example.description}</p>
              )}
              <div className="border rounded-xl bg-white px-8 py-10 flex items-center justify-center min-h-28">
                <example.render />
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="code">
          <div className="relative">
            <pre className="border rounded-xl bg-muted/30 p-5 overflow-x-auto text-xs font-mono leading-relaxed max-h-[600px] overflow-y-auto">
              {entry.source}
            </pre>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              className="absolute top-3 right-3 gap-1.5 opacity-80 hover:opacity-100"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'OK' : 'Kopiuj'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {entry.props.length > 0 && (
        <>
          <Separator className="my-10" />
          <div>
            <h2 className="text-sm font-semibold mb-4 tracking-tight">Props</h2>
            <div className="border rounded-xl overflow-hidden bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Prop</th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Typ</th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Default</th>
                    <th className="text-left px-4 py-2.5 font-medium text-muted-foreground text-xs uppercase tracking-wider">Opis</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {entry.props.map(prop => (
                    <tr key={prop.name} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-mono text-xs font-medium">{prop.name}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-blue-600">
                        {prop.options ? prop.options.join(' | ') : prop.type}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{prop.default ?? '–'}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{prop.description ?? '–'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
