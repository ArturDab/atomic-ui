/**
 * Article Editor
 * Edytor artykułu z blokami treści, AI panelem, SelectionMenu i biblioteką bloków.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft, Star, Clock, Hash, Save, Eye, ExternalLink,
  Wand2, Sparkles, LayoutTemplate, ChevronDown, PanelLeft,
  Search, History, MoreHorizontal, Trash2, Globe, Image as ImageIcon,
  Code2, GripVertical, Plus, AlignLeft,
} from 'lucide-react'
import { EditorToolbar } from './_Toolbar'
import { AIPanel } from './_AIPanel'
import { SelectionMenu } from './_SelectionMenu'
import { BlocksLibrary } from './_BlocksLibrary'
import { cn } from '@/lib/utils'

// ── Typy bloków ───────────────────────────────────────────────────────────────

type BlockType = 'h1' | 'h2' | 'h3' | 'p' | 'quote' | 'list' | 'image' | 'html' | 'divider' | 'ai-generated'

interface Block {
  id: string
  type: BlockType
  content: string
  caption?: string
}

// ── Demo content ──────────────────────────────────────────────────────────────

const DEMO_BLOCKS: Block[] = [
  { id: '1', type: 'h1',  content: 'Jak AI Zmienia Content Marketing w 2025 Roku' },
  { id: '2', type: 'p',   content: 'Sztuczna inteligencja przestała być technologią przyszłości – jest narzędziem teraźniejszości, które fundamentalnie zmienia sposób tworzenia, dystrybucji i optymalizacji treści marketingowych. W 2025 roku firmy, które nie wdrożyły AI do swojego content marketingu, są w wyraźnie trudniejszej pozycji konkurencyjnej.' },
  { id: '3', type: 'h2',  content: 'Automatyzacja tworzenia treści' },
  { id: '4', type: 'p',   content: 'Modele językowe klasy GPT-4 czy Claude Sonnet potrafią dziś wygenerować szkic artykułu blogowego w ciągu sekund. Kluczem nie jest jednak zastąpienie człowieka, ale amplifikacja jego możliwości. Copywriter z dostępem do AI może wyprodukować 5–10x więcej treści przy zachowaniu tej samej jakości.' },
  { id: '5', type: 'quote', content: 'AI nie zastępuje kreatywności – wzmacnia ją. Najlepsze treści powstają na styku ludzkiej intuicji i maszynowej efektywności.' },
  { id: '6', type: 'h2',  content: 'Personalizacja na skalę' },
  { id: '7', type: 'p',   content: 'Jeszcze kilka lat temu personalizacja treści w skali oznaczała setki wariacji pisanych ręcznie. Dziś AI umożliwia dynamiczne dostosowanie przekazu do segmentu odbiorcy, etapu lejka sprzedażowego czy nawet konkretnego użytkownika – w czasie rzeczywistym.' },
  { id: '8', type: 'list', content: 'Personalizacja nagłówków i lead magnet\nDynamiczne CTA dopasowane do historii użytkownika\nAutomatyczne tłumaczenia z zachowaniem tonu marki\nA/B testing treści generowanych przez AI' },
  { id: '9', type: 'image', content: '/placeholder-ai-content.jpg', caption: 'Ilustracja: porównanie efektywności tradycyjnego vs AI-wspomaganego content marketingu' },
  { id: '10', type: 'html', content: `<div class="info-box">\n  <h3>Kluczowe statystyki 2025</h3>\n  <ul>\n    <li>72% marketerów używa AI do tworzenia treści</li>\n    <li>Średni ROI z AI content tools: 340%</li>\n  </ul>\n</div>` },
  { id: '11', type: 'h2', content: 'Wyzwania i pułapki' },
  { id: '12', type: 'p',  content: 'Automatyzacja przynosi też ryzyka. Treści generowane bez odpowiedniego nadzoru mogą być niespójne z głosem marki, zawierać błędy faktyczne lub – co gorsza – plagiatować istniejące materiały. Kluczem jest wypracowanie procesu human-in-the-loop.' },
  { id: '13', type: 'ai-generated', content: 'Kluczową kompetencją content marketerów w 2025 roku staje się "prompt engineering" – umiejętność formułowania precyzyjnych poleceń dla modeli AI, które przekładają się na treści wysokiej jakości. To nowa specjalizacja, za którą rynek gotów jest płacić premię.' },
]

// ── Renderowanie bloków ───────────────────────────────────────────────────────

function BlockRenderer({ block, isSelected, onClick }: {
  block: Block; isSelected: boolean; onClick: () => void
}) {
  const base = 'group relative cursor-text'

  const handleMouseUp = (e: React.MouseEvent) => {
    const sel = window.getSelection()?.toString().trim()
    if (sel && sel.length > 0) onClick()
  }

  switch (block.type) {
    case 'h1': return (
      <div className={base} onMouseUp={handleMouseUp}>
        <h1 className="text-3xl font-bold tracking-tight mb-2 leading-tight">{block.content}</h1>
      </div>
    )
    case 'h2': return (
      <div className={base} onMouseUp={handleMouseUp}>
        <h2 className="text-xl font-bold mt-6 mb-2 leading-snug">{block.content}</h2>
      </div>
    )
    case 'h3': return (
      <div className={base} onMouseUp={handleMouseUp}>
        <h3 className="text-lg font-semibold mt-4 mb-1.5">{block.content}</h3>
      </div>
    )
    case 'p': return (
      <div className={base} onMouseUp={handleMouseUp}>
        <p className="text-base leading-relaxed mb-3 text-foreground">{block.content}</p>
      </div>
    )
    case 'quote': return (
      <div className={base} onMouseUp={handleMouseUp}>
        <blockquote className="border-l-4 border-foreground/20 pl-4 my-4 italic text-muted-foreground text-base leading-relaxed">
          {block.content}
        </blockquote>
      </div>
    )
    case 'list': return (
      <div className={base} onMouseUp={handleMouseUp}>
        <ul className="space-y-1.5 mb-3 ml-4">
          {block.content.split('\n').map((item, i) => (
            <li key={i} className="text-base leading-relaxed flex gap-2">
              <span className="text-muted-foreground mt-1.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
    case 'image': return (
      <div className="my-6">
        <div className="rounded-xl border bg-muted/30 aspect-video flex flex-col items-center justify-center gap-2">
          <ImageIcon className="w-8 h-8 text-foreground/30" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">{block.content}</p>
        </div>
        {block.caption && (
          <p className="text-xs text-muted-foreground text-center mt-2 italic">{block.caption}</p>
        )}
      </div>
    )
    case 'html': return (
      <div className="my-4 rounded-xl border overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b bg-muted/40">
          <Code2 className="w-3.5 h-3.5 text-violet-600" />
          <span className="text-xs font-medium text-violet-600">Blok HTML</span>
        </div>
        <pre className="px-4 py-3 text-xs font-mono text-foreground/70 bg-muted/10 overflow-x-auto leading-relaxed">
          {block.content}
        </pre>
      </div>
    )
    case 'divider': return <hr className="my-6 border-border" />
    case 'ai-generated': return (
      <div className="my-4 relative" onMouseUp={handleMouseUp}>
        <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
        </div>
        <p className="text-base leading-relaxed mb-3 text-foreground border-l-2 border-amber-200 pl-4">
          {block.content}
        </p>
      </div>
    )
    default: return null
  }
}

// ── Główny komponent ──────────────────────────────────────────────────────────

export default function ArticleEditorScreen() {
  const [showAI, setShowAI] = React.useState(true)
  const [showBlocks, setShowBlocks] = React.useState(false)
  const [showSelection, setShowSelection] = React.useState(false)
  const [selectionText, setSelectionText] = React.useState('')
  const [wordCount] = React.useState(DEMO_BLOCKS.filter(b => ['p','h1','h2','h3','quote','list','ai-generated'].includes(b.type)).reduce((n, b) => n + b.content.split(' ').length, 0))

  const handleTextSelect = (text?: string) => {
    setSelectionText(text || 'implementacja agentów AI w małych firmach przynosi nieproporcjonalnie duże korzyści')
    setShowSelection(true)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* App header */}
      <div className="h-12 border-b flex items-center px-4 gap-3 shrink-0 bg-white">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant="outline" className="text-[10px] border-blue-200 bg-blue-50 text-blue-600">Artykuł</Badge>
          <span className="text-sm text-muted-foreground truncate">Jak AI Zmienia Content Marketing...</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-foreground/60 flex items-center gap-1">
            <Clock className="w-3 h-3" /> Autozapis 14:22
            <Hash className="w-3 h-3 ml-2" /> {wordCount} słów
          </span>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Szukaj i zamień">
            <Search className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="Historia wersji">
            <History className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className="w-4 h-4" />
          </Button>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
            <Eye className="w-4 h-4" /> Podgląd
          </Button>
          <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
            <Globe className="w-4 h-4" /> Eksportuj
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-sm">
            <ExternalLink className="w-4 h-4" /> Publikuj w WP
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Blocks library panel */}
        {showBlocks && (
          <BlocksLibrary
            className="w-64 shrink-0"
            onClose={() => setShowBlocks(false)}
            onInsert={(id) => console.log('insert', id)}
          />
        )}

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorToolbar
            wordCount={wordCount}
            onInsertBlock={(type) => {
              if (type === 'html' || type === 'image' || type === 'prompt') setShowBlocks(true)
            }}
          />

          {/* Secondary toolbar: library + status */}
          <div className="h-9 border-b flex items-center px-4 gap-2 shrink-0 bg-muted/20">
            <button
              onClick={() => setShowBlocks(o => !o)}
              className={cn('flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors',
                showBlocks ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:bg-muted'
              )}>
              <LayoutTemplate className="w-3.5 h-3.5" /> Biblioteka bloków
            </button>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center gap-2">
              <select className="text-xs bg-transparent text-muted-foreground border-0 outline-none">
                <option>Szkic</option>
                <option>W trakcie</option>
                <option>Do rewizji</option>
                <option>Gotowe</option>
              </select>
              <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                Tagi: AI, marketing
              </button>
            </div>
            <div className="flex-1" />
            {/* Demo: simulate text selection */}
            <button
              onClick={() => handleTextSelect()}
              className="text-xs text-foreground/55 hover:text-foreground border border-dashed rounded px-2 py-0.5 transition-colors">
              Zaznacz tekst →
            </button>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto px-8 py-10 relative">
              {DEMO_BLOCKS.map(block => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  isSelected={false}
                  onClick={() => handleTextSelect(block.content.slice(0, 100))}
                />
              ))}

              {/* Add block button */}
              <div className="flex items-center gap-2 mt-6 group">
                <div className="flex-1 h-px bg-border" />
                <button
                  onClick={() => setShowBlocks(true)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-muted-foreground border border-dashed rounded-lg px-3 py-1.5 transition-colors group-hover:border-border">
                  <Plus className="w-3.5 h-3.5" /> Dodaj blok
                </button>
                <div className="flex-1 h-px bg-border" />
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* AI Panel */}
        {showAI ? (
          <AIPanel
            className="w-80 shrink-0"
            onClose={() => setShowAI(false)}
            contextTitle="Jak AI Zmienia Content..."
          />
        ) : (
          <button
            onClick={() => setShowAI(true)}
            className="w-9 border-l flex flex-col items-center justify-center gap-1 hover:bg-muted/40 transition-colors shrink-0">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Selection menu overlay */}
      {showSelection && (
        <>
          <div className="fixed inset-0 z-[99]" onClick={() => setShowSelection(false)} />
          <SelectionMenu
            selectedText={selectionText}
            onClose={() => setShowSelection(false)}
            style={{ top: '280px', left: '50%', transform: 'translateX(-20%)' }}
          />
        </>
      )}
    </div>
  )
}
