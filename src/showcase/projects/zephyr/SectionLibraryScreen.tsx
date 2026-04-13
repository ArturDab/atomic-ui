/**
 * Zephyr – Section Library
 * Globalna i per-klient biblioteka sekcji HTML do składania newsletterów.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus, Search, Eye, Code2, Copy, MoreHorizontal, Trash2,
  Globe, User,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'divider' | 'footer'

interface Section {
  id: string
  name: string
  type: SectionType
  description: string
  scope: 'global' | 'client'
  usedBy?: number
  previewBg: string
  previewAccent: string
}

const SECTION_TYPE_COLOR: Record<SectionType, string> = {
  header:  'bg-blue-50 text-blue-700 border-blue-200',
  hero:    'bg-purple-50 text-purple-700 border-purple-200',
  cta:     'bg-amber-50 text-amber-700 border-amber-200',
  product: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  content: 'bg-slate-50 text-slate-700 border-slate-200',
  divider: 'bg-rose-50 text-rose-700 border-rose-200',
  footer:  'bg-neutral-50 text-neutral-700 border-neutral-200',
}

const SECTION_TYPE_LABEL: Record<SectionType, string> = {
  header: 'Nagłówek', hero: 'Hero', cta: 'CTA', product: 'Produkt',
  content: 'Treść', divider: 'Separator', footer: 'Stopka',
}

const ALL_TYPES: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'Wszystkie' },
  ...Object.entries(SECTION_TYPE_LABEL).map(([value, label]) => ({ value, label })),
]

const GLOBAL_SECTIONS: Section[] = [
  { id: 'g1', name: 'Nagłówek z logo i menu',    type: 'header',  description: 'Logo z lewej, linki nawigacyjne, unsubscribe po prawej', scope: 'global', usedBy: 4, previewBg: '#1e293b', previewAccent: '#38bdf8' },
  { id: 'g2', name: 'Hero full-width z obrazem', type: 'hero',    description: 'Pełna szerokość, obraz tła, nagłówek + CTA',             scope: 'global', usedBy: 3, previewBg: '#f0f9ff', previewAccent: '#0ea5e9' },
  { id: 'g3', name: 'Hero split 50/50',          type: 'hero',    description: 'Obraz po lewej, tekst + CTA po prawej',                  scope: 'global', usedBy: 2, previewBg: '#fdf4ff', previewAccent: '#a855f7' },
  { id: 'g4', name: 'Produkty 3 kolumny',        type: 'product', description: '3 produkty z obrazem, ceną, przyciskiem',               scope: 'global', usedBy: 3, previewBg: '#f0fdf4', previewAccent: '#22c55e' },
  { id: 'g5', name: 'Tekst + CTA wyśrodkowany', type: 'cta',     description: 'Tytuł, paragraf, duży przycisk CTA',                    scope: 'global', usedBy: 4, previewBg: '#fffbeb', previewAccent: '#f59e0b' },
  { id: 'g6', name: 'Separator z grafiką',       type: 'divider', description: 'Linia z ikoną lub ornamentem',                          scope: 'global', usedBy: 2, previewBg: '#ffffff', previewAccent: '#e2e8f0' },
  { id: 'g7', name: 'Stopka standardowa',        type: 'footer',  description: 'Logo, adres, linki, unsubscribe, social media',         scope: 'global', usedBy: 4, previewBg: '#f8fafc', previewAccent: '#94a3b8' },
  { id: 'g8', name: 'Produkty 2 kolumny',        type: 'product', description: '2 produkty z obszerniejszym opisem',                    scope: 'global', usedBy: 1, previewBg: '#f0fdf4', previewAccent: '#16a34a' },
  { id: 'g9', name: 'Cytat / testimonial',       type: 'content', description: 'Duży cytat z avatarem i podpisem',                      scope: 'global', usedBy: 2, previewBg: '#fafaf9', previewAccent: '#78716c' },
]

const CLIENT_SECTIONS: Section[] = [
  { id: 'c1', name: 'Nagłówek Animails',          type: 'header',  description: 'Logo Animails z niebieskim tłem i ikoną łapy',             scope: 'client', previewBg: '#0ea5e9', previewAccent: '#ffffff' },
  { id: 'c2', name: 'Sekcja promocyjna z kodem', type: 'cta',     description: 'Duży % rabatu, kod promocyjny w boksie, countdown',         scope: 'client', previewBg: '#fff7ed', previewAccent: '#ea580c' },
  { id: 'c3', name: 'Karma – produkty tygodnia', type: 'product', description: 'Specjalny layout dla karm – 4 produkty 2×2',                scope: 'client', previewBg: '#f0fdf4', previewAccent: '#0ea5e9' },
]

// ── Miniatura sekcji ─────────────────────────────────────────────────────────

function SectionPreview({ section }: { section: Section }) {
  const bg = section.previewBg
  const ac = section.previewAccent

  return (
    <div className="rounded overflow-hidden border" style={{ backgroundColor: bg, height: 88 }}>
      {section.type === 'header' && (
        <div className="h-full flex items-center px-3 gap-2" style={{ backgroundColor: ac + '22' }}>
          <div className="w-6 h-6 rounded" style={{ backgroundColor: ac }} />
          <div className="flex-1" />
          {[1, 2, 3].map(i => (
            <div key={i} className="h-1.5 w-8 rounded-full" style={{ backgroundColor: ac, opacity: 0.5 }} />
          ))}
        </div>
      )}
      {section.type === 'hero' && (
        <div className="h-full flex flex-col items-center justify-center gap-1.5 px-3">
          <div className="h-2.5 w-24 rounded-full" style={{ backgroundColor: ac }} />
          <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: ac, opacity: 0.55 }} />
          <div className="h-5 w-14 rounded-md mt-1" style={{ backgroundColor: ac }} />
        </div>
      )}
      {section.type === 'product' && (
        <div className="h-full flex items-stretch gap-1.5 px-2 py-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 rounded border flex flex-col items-center justify-between py-1.5 gap-1"
              style={{ borderColor: ac + '50' }}>
              <div className="w-5 h-5 rounded" style={{ backgroundColor: ac + '60' }} />
              <div className="h-1 w-8 rounded-full" style={{ backgroundColor: ac + '80' }} />
              <div className="h-3 w-10 rounded" style={{ backgroundColor: ac + '90' }} />
            </div>
          ))}
        </div>
      )}
      {section.type === 'cta' && (
        <div className="h-full flex flex-col items-center justify-center gap-1.5">
          <div className="h-2.5 w-20 rounded-full" style={{ backgroundColor: ac, opacity: 0.9 }} />
          <div className="h-1.5 w-28 rounded-full" style={{ backgroundColor: ac, opacity: 0.45 }} />
          <div className="h-5 w-16 rounded-md mt-1" style={{ backgroundColor: ac }} />
        </div>
      )}
      {section.type === 'divider' && (
        <div className="h-full flex items-center px-4">
          <div className="flex-1 h-px" style={{ backgroundColor: ac }} />
          <div className="mx-3 w-4 h-4 rounded-full" style={{ backgroundColor: ac + '40' }} />
          <div className="flex-1 h-px" style={{ backgroundColor: ac }} />
        </div>
      )}
      {section.type === 'content' && (
        <div className="h-full flex flex-col justify-center gap-1.5 px-4">
          {[28, 36, 28, 20].map((w, i) => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: w * 2, backgroundColor: ac, opacity: 0.3 + i * 0.1 }} />
          ))}
        </div>
      )}
      {section.type === 'footer' && (
        <div className="h-full flex flex-col justify-center gap-1.5 px-4">
          <div className="h-px w-full" style={{ backgroundColor: ac }} />
          <div className="flex gap-2 py-1">
            {[1, 2, 3].map(i => <div key={i} className="h-1 w-10 rounded-full" style={{ backgroundColor: ac, opacity: 0.5 }} />)}
          </div>
          <div className="h-1 w-16 rounded-full mx-auto" style={{ backgroundColor: ac, opacity: 0.3 }} />
        </div>
      )}
    </div>
  )
}

// ── Karta sekcji ─────────────────────────────────────────────────────────────

function SectionCard({ section }: { section: Section }) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden hover:shadow-sm transition-shadow group">
      <SectionPreview section={section} />
      <div className="p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <p className="text-xs font-semibold leading-tight">{section.name}</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" />Podgląd HTML</DropdownMenuItem>
              <DropdownMenuItem><Code2 className="w-3.5 h-3.5 mr-2" />Edytuj kod</DropdownMenuItem>
              <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" />Duplikuj</DropdownMenuItem>
              {section.scope === 'global' && (
                <DropdownMenuItem><User className="w-3.5 h-3.5 mr-2" />Dodaj do klienta</DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="w-3.5 h-3.5 mr-2" />Usuń
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1">{section.description}</p>
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className={cn('text-xs border', SECTION_TYPE_COLOR[section.type])}>
            {SECTION_TYPE_LABEL[section.type]}
          </Badge>
          {section.usedBy !== undefined && (
            <span className="text-xs text-muted-foreground">{section.usedBy} klientów</span>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Główny ekran ─────────────────────────────────────────────────────────────

export default function SectionLibraryScreen() {
  const [search, setSearch]       = React.useState('')
  const [typeFilter, setTypeFilter] = React.useState('all')

  const filterSections = (sections: Section[]) =>
    sections
      .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
      .filter(s => typeFilter === 'all' || s.type === typeFilter)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-6 gap-4 shrink-0">
        <h1 className="text-sm font-semibold flex-1">Biblioteka sekcji</h1>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" />
          Nowa sekcja
        </Button>
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b flex items-center gap-3 flex-wrap shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj sekcji..."
            className="pl-9 h-8 text-sm w-52"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {ALL_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setTypeFilter(value)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                typeFilter === value
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs: global vs client */}
      <Tabs defaultValue="global" className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b px-6 shrink-0">
          <TabsList className="h-10 bg-transparent p-0 gap-0">
            <TabsTrigger
              value="global"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />Globalna ({GLOBAL_SECTIONS.length})
            </TabsTrigger>
            <TabsTrigger
              value="client"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5"
            >
              <User className="w-3.5 h-3.5" />Animails ({CLIENT_SECTIONS.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <TabsContent value="global" className="mt-0">
            <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filterSections(GLOBAL_SECTIONS).map(s => <SectionCard key={s.id} section={s} />)}
            </div>
          </TabsContent>
          <TabsContent value="client" className="mt-0">
            <div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
              {filterSections(CLIENT_SECTIONS).map(s => <SectionCard key={s.id} section={s} />)}
              <button className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 p-4 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[160px]">
                <Plus className="w-6 h-6" />
                <span className="text-xs text-center">Dodaj sekcję<br />z biblioteki globalnej</span>
              </button>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
