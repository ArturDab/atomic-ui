/**
 * BlocksLibrary – biblioteka bloków treści i promptów.
 * Drag-and-drop do edytora lub klik żeby wstawić.
 */
import * as React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search, X, Type, Heading1, Heading2, Quote, List, Minus,
  Image, Code2, Wand2, FileText, Globe, Star, Zap, Hash,
  LayoutTemplate, BookOpen, ChevronRight, GripVertical,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Block {
  id: string
  category: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  type: 'text' | 'html' | 'ai' | 'image' | 'structure'
}

const BLOCKS: Block[] = [
  // Tekst
  { id: 'p',    category: 'Tekst', name: 'Akapit',     description: 'Zwykły paragraf', icon: Type,    color: 'text-slate-500 bg-slate-50',   type: 'text' },
  { id: 'h1',   category: 'Tekst', name: 'Nagłówek H1', description: 'Tytuł główny',  icon: Heading1, color: 'text-slate-500 bg-slate-50',   type: 'text' },
  { id: 'h2',   category: 'Tekst', name: 'Nagłówek H2', description: 'Podtytuł',      icon: Heading2, color: 'text-slate-500 bg-slate-50',   type: 'text' },
  { id: 'quote',category: 'Tekst', name: 'Cytat',       description: 'Blok cytatu',    icon: Quote,   color: 'text-slate-500 bg-slate-50',   type: 'text' },
  { id: 'list', category: 'Tekst', name: 'Lista',       description: 'Punkty lub numeracja', icon: List, color: 'text-slate-500 bg-slate-50', type: 'text' },
  { id: 'hr',   category: 'Tekst', name: 'Separator',   description: 'Linia podziału',  icon: Minus,   color: 'text-slate-500 bg-slate-50',   type: 'text' },
  // Grafika
  { id: 'img-upload', category: 'Grafika', name: 'Obraz',    description: 'Wgraj plik',      icon: Image, color: 'text-blue-500 bg-blue-50',   type: 'image' },
  { id: 'img-ai',     category: 'Grafika', name: 'Grafika AI', description: 'Wygeneruj obrazek AI', icon: Wand2, color: 'text-blue-500 bg-blue-50', type: 'image' },
  // HTML
  { id: 'html-raw',  category: 'HTML', name: 'Surowy HTML',   description: 'Dowolny kod HTML',         icon: Code2,        color: 'text-violet-500 bg-violet-50', type: 'html' },
  { id: 'html-box',  category: 'HTML', name: 'Ramka info',    description: 'Stylizowana ramka z treścią', icon: LayoutTemplate, color: 'text-violet-500 bg-violet-50', type: 'html' },
  { id: 'html-cta',  category: 'HTML', name: 'CTA',           description: 'Przycisk / wezwanie do działania', icon: Zap,    color: 'text-violet-500 bg-violet-50', type: 'html' },
  { id: 'html-toc',  category: 'HTML', name: 'Spis treści',   description: 'Rankmat SEO / ręczny',     icon: List,         color: 'text-violet-500 bg-violet-50', type: 'html' },
  { id: 'html-faq',  category: 'HTML', name: 'FAQ',           description: 'Accordion z pytaniami',    icon: Hash,         color: 'text-violet-500 bg-violet-50', type: 'html' },
  // AI Prompty
  { id: 'ai-intro',   category: 'Prompty AI', name: 'Wstęp',      description: 'Generuj wprowadzenie do artykułu', icon: Star,     color: 'text-amber-500 bg-amber-50',  type: 'ai' },
  { id: 'ai-summary', category: 'Prompty AI', name: 'Podsumowanie', description: 'Kluczowe wnioski na końcu',      icon: FileText, color: 'text-amber-500 bg-amber-50',  type: 'ai' },
  { id: 'ai-expert',  category: 'Prompty AI', name: 'Cytat eksperta', description: 'Wymyślony cytat branżowy',   icon: Quote,    color: 'text-amber-500 bg-amber-50',  type: 'ai' },
  { id: 'ai-stats',   category: 'Prompty AI', name: 'Statystyki',  description: 'Dane i liczby z kontekstem',     icon: Hash,     color: 'text-amber-500 bg-amber-50',  type: 'ai' },
  { id: 'ai-seo',     category: 'Prompty AI', name: 'Meta SEO',    description: 'Title, description, keywords',  icon: Globe,    color: 'text-amber-500 bg-amber-50',  type: 'ai' },
  { id: 'ai-wp-export', category: 'Prompty AI', name: 'Eksport WP', description: 'Przygotuj do Gutenberga',     icon: BookOpen, color: 'text-amber-500 bg-amber-50',  type: 'ai' },
]

const CATEGORIES = ['Tekst', 'Grafika', 'HTML', 'Prompty AI']

interface BlocksLibraryProps {
  onInsert?: (blockId: string) => void
  onClose?: () => void
  className?: string
}

export function BlocksLibrary({ onInsert, onClose, className }: BlocksLibraryProps) {
  const [search, setSearch] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)

  const filtered = BLOCKS.filter(b => {
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase())
    const matchCat = !activeCategory || b.category === activeCategory
    return matchSearch && matchCat
  })

  const grouped = CATEGORIES.reduce((acc, cat) => {
    const items = filtered.filter(b => b.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {} as Record<string, Block[]>)

  return (
    <div className={cn('flex flex-col bg-background border-r', className)}>
      <div className="h-14 border-b flex items-center gap-2 px-4 shrink-0">
        <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-semibold flex-1">Bloki treści</span>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Szukaj bloku..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm bg-muted/30 border-0 focus-visible:ring-0" />
        </div>
      </div>

      {/* Category filter */}
      <div className="px-3 py-2 border-b flex items-center gap-1 overflow-x-auto">
        <button onClick={() => setActiveCategory(null)}
          className={cn('text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors',
            !activeCategory ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:bg-muted')}>
          Wszystkie
        </button>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            className={cn('text-xs px-2.5 py-1 rounded-md whitespace-nowrap transition-colors',
              activeCategory === cat ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:bg-muted')}>
            {cat}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {Object.entries(grouped).map(([cat, blocks]) => (
            <div key={cat}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2 px-1">{cat}</p>
              <div className="space-y-1">
                {blocks.map(block => (
                  <button key={block.id}
                    onClick={() => onInsert?.(block.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-white hover:border-foreground/20 hover:shadow-sm transition-all text-left group">
                    <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', block.color)}>
                      <block.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight">{block.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{block.description}</p>
                    </div>
                    <GripVertical className="w-3.5 h-3.5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t">
        <p className="text-[10px] text-muted-foreground text-center">Kliknij lub przeciągnij do edytora</p>
      </div>
    </div>
  )
}
