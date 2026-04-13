/**
 * ModulesPage – przegląd modułów w src/modules/
 * Każdy moduł: opis, lista hooków, lista komponentów, jak użyć.
 */
import { useState } from 'react'
import { BookOpen, FileText, Layers, Sparkles, Globe, Plus, Code2, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const MODULES = [
  {
    id: 'lyra',
    name: 'Lyra',
    description: 'Edytor treści z AI – artykuły, opracowania i książki. Gotowy do przeniesienia do dowolnej aplikacji.',
    status: 'ready' as const,
    path: 'src/modules/lyra/',
    hooks: [
      { name: 'useDashboard', desc: 'Filtrowanie, sortowanie, widok listy/siatki, stats, star/delete' },
      { name: 'useArticleEditor', desc: 'Bloki treści, CRUD, wordCount, pełny/pełnoekranowy widok' },
      { name: 'useBookEditor', desc: 'Drzewo struktury, aktywny rozdział, bloki per rozdział' },
      { name: 'useAIConversation', desc: 'Historia konwersacji per dokument/poziom, ready na real API' },
    ],
    types: [
      'ContentType', 'ContentItem', 'ContentBlock', 'BlockType',
      'BookPart', 'BookChapter', 'BookMeta', 'StudySection',
      'AIMessage', 'AIConversation', 'WPExportOptions',
      'NewContentConfig',
    ],
    screens: [
      { name: 'Dashboard', path: '/projects/lyra/ly-dashboard' },
      { name: 'Edytor artykułu', path: '/projects/lyra/ly-article' },
      { name: 'Edytor opracowania', path: '/projects/lyra/ly-study-editor' },
      { name: 'Przegląd książki', path: '/projects/lyra/ly-book-overview' },
      { name: 'Edytor książki', path: '/projects/lyra/ly-book-editor' },
      { name: 'Nowa treść', path: '/projects/lyra/ly-new-content' },
      { name: 'Eksport WordPress', path: '/projects/lyra/ly-wp-export' },
    ],
    usage: `// 1. Importuj hook i typy
import { useBookEditor } from '@/modules/lyra'
import type { BookPart } from '@/modules/lyra'

// 2. Dostarcz dane (z API / Supabase / mock)
const parts: BookPart[] = await fetchPartsFromDB()

// 3. Użyj hooka – logika stanu bez warstwy danych
const editor = useBookEditor(parts)

// 4. Podłącz widok z callbackami zapisu
<BookEditorView
  {...editor}
  onSave={saveToDB}
  onExport={exportToWP}
/>`,
  },
]

const STATUS = {
  ready:       { label: 'Gotowy',      color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'in-progress': { label: 'W budowie', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  planned:     { label: 'Planowany',   color: 'bg-muted text-muted-foreground border-border' },
}

export default function ModulesPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ lyra: true })
  const toggle = (id: string) => setExpanded(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="max-w-3xl mx-auto px-8 py-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Moduły</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Funkcjonalne moduły gotowe do przeniesienia do docelowej aplikacji.
          Każdy moduł: typy TypeScript + hooki stanu + widoki UI.
        </p>
      </div>

      {/* Diagram warstw */}
      <div className="border rounded-xl overflow-hidden">
        <div className="bg-muted/30 px-4 py-2.5 border-b">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Architektura</p>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {[
            { label: 'Nowa aplikacja', desc: 'Design system · Backend (Supabase) · Routing', color: 'bg-blue-50 border-blue-200 text-blue-700' },
            { label: 'src/modules/', desc: 'Typy · Hooki · Komponenty UI (przeniesione z showcase)', color: 'bg-violet-50 border-violet-200 text-violet-700', arrow: true },
            { label: 'src/components/blocks/', desc: 'SidePanel · EditorToolbar · inne bloki kompozytowe', color: 'bg-muted border-border text-foreground/70', arrow: true },
            { label: 'src/components/ui/', desc: 'Button · Input · Badge · Atomy Shadcn', color: 'bg-muted border-border text-foreground/60', arrow: true },
          ].map(layer => (
            <div key={layer.label}>
              {(layer as any).arrow && (
                <div className="flex justify-center text-muted-foreground text-xs my-0.5">↓</div>
              )}
              <div className={cn('rounded-lg border px-4 py-2.5 flex items-center justify-between', layer.color)}>
                <span className="text-sm font-semibold font-mono">{layer.label}</span>
                <span className="text-xs opacity-70">{layer.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Moduły */}
      {MODULES.map(mod => {
        const open = expanded[mod.id]
        const st = STATUS[mod.status]
        return (
          <div key={mod.id} className="border rounded-xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() => toggle(mod.id)}
              className="w-full flex items-center gap-3 px-5 py-4 hover:bg-muted/30 transition-colors text-left">
              <BookOpen className="w-5 h-5 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{mod.name}</span>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full border font-medium', st.color)}>
                    {st.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{mod.description}</p>
              </div>
              <code className="text-[10px] text-muted-foreground font-mono hidden sm:block">{mod.path}</code>
              {open ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                     : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
            </button>

            {open && (
              <div className="border-t divide-y">
                {/* Hooki */}
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Hooki</p>
                  <div className="space-y-2">
                    {mod.hooks.map(h => (
                      <div key={h.name} className="flex items-start gap-3">
                        <code className="text-xs font-mono bg-muted px-2 py-0.5 rounded text-foreground shrink-0">{h.name}</code>
                        <span className="text-xs text-muted-foreground leading-relaxed">{h.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Typy */}
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Typy TypeScript</p>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.types.map(t => (
                      <code key={t} className="text-[10px] font-mono bg-muted px-2 py-0.5 rounded border text-foreground/70">{t}</code>
                    ))}
                  </div>
                </div>

                {/* Widoki */}
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Widoki w showcase</p>
                  <div className="flex flex-wrap gap-2">
                    {mod.screens.map(s => (
                      <a key={s.name} href={s.path}
                        className="text-xs px-3 py-1.5 rounded-lg border hover:border-foreground/30 hover:bg-muted/30 transition-colors flex items-center gap-1.5 text-foreground/70 hover:text-foreground">
                        {s.name} <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Użycie */}
                <div className="px-5 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Jak użyć w nowej aplikacji</p>
                  <pre className="bg-muted/50 border rounded-lg px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
                    {mod.usage}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Planowane moduły */}
      <div className="border rounded-xl p-5 border-dashed">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Planowane moduły</p>
        <div className="flex flex-wrap gap-2">
          {['AI Chat', 'AI Teams', 'AI Studio', 'Documents'].map(name => (
            <span key={name} className="text-xs px-3 py-1.5 rounded-lg border border-dashed text-muted-foreground">
              {name}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Wyekstrahowane z Altair 2.0 gdy zakończą fazę prototypowania.
        </p>
      </div>
    </div>
  )
}
