/**
 * Zephyr – Section Library
 * Używa: EmptyState z @/components/blocks, Tabs, Badge, ScrollArea z ui/
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/blocks/empty-state'
import { PageHeader } from '@/components/blocks/page-header'
import { FilterBar } from '@/components/blocks/filter-bar'
import { Plus, Eye, Code2, Copy, MoreHorizontal, Trash2, Globe, User, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'divider' | 'footer'
type SectionScope = 'global' | 'client'

interface Section {
  id: string; name: string; type: SectionType
  description: string; scope: SectionScope; usedBy?: number
}

const TYPE_META: Record<SectionType, { label: string; short: string }> = {
  header:  { label: 'Nagłówek', short: 'H' },
  hero:    { label: 'Hero',     short: '◈' },
  cta:     { label: 'CTA',      short: '→' },
  product: { label: 'Produkt',  short: '☰' },
  content: { label: 'Treść',    short: 'T' },
  divider: { label: 'Separator',short: '─' },
  footer:  { label: 'Stopka',   short: 'F' },
}

function SectionTypeBadge({ type }: { type: SectionType }) {
  const meta = TYPE_META[type]
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-mono text-foreground/65 shrink-0 select-none">
      <span className="text-foreground/35 text-[9px] leading-none">{meta.short}</span>
      <span>{meta.label}</span>
    </span>
  )
}

const SECTIONS: Section[] = [
  { id: '1', name: 'Nagłówek standardowy',  type: 'header',  description: 'Logo + nawigacja + przycisk CTA', scope: 'global', usedBy: 8 },
  { id: '2', name: 'Hero full-width',        type: 'hero',    description: 'Duży baner z tłem i CTA',        scope: 'global', usedBy: 5 },
  { id: '3', name: 'Sekcja CTA prosta',      type: 'cta',     description: 'Tekst + przycisk wyśrodkowany',  scope: 'global', usedBy: 12 },
  { id: '4', name: 'Stopka standardowa',     type: 'footer',  description: 'Dane firmy + linki + dane kontaktowe', scope: 'global', usedBy: 9 },
  { id: '5', name: 'Nagłówek Animails',      type: 'header',  description: 'Logo Animails + tagline',        scope: 'client' },
  { id: '6', name: 'Produkty 3 kolumny',     type: 'product', description: 'Siatka 3 produktów z cenami',   scope: 'client' },
]

function SectionCard({ section }: { section: Section }) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden hover:shadow-sm transition-shadow group">
      {/* Mini preview – strukturalny wireframe bez hardkodowanych kolorów */}
      <div className="h-20 border-b bg-muted/30 flex items-center justify-center px-4">
        <div className="w-full space-y-1.5">
          {section.type === 'header' && (
            <div className="flex items-center justify-between">
              <div className="h-2 rounded w-10 bg-foreground/20" />
              <div className="h-2 rounded w-8 bg-foreground/10" />
            </div>
          )}
          {section.type === 'hero' && (
            <div className="space-y-1">
              <div className="h-2.5 rounded w-3/4 bg-foreground/25" />
              <div className="h-1.5 rounded w-full bg-foreground/10" />
              <div className="h-4 rounded w-16 bg-foreground/15 mt-1" />
            </div>
          )}
          {section.type === 'cta' && (
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-2 rounded w-1/2 bg-foreground/20" />
              <div className="h-4 rounded w-20 bg-foreground/25" />
            </div>
          )}
          {section.type === 'product' && (
            <div className="grid grid-cols-3 gap-1">
              {[0,1,2].map(i => <div key={i} className="space-y-1"><div className="h-6 rounded bg-foreground/10" /><div className="h-1.5 rounded bg-foreground/15 w-2/3" /></div>)}
            </div>
          )}
          {(section.type === 'content' || section.type === 'divider') && (
            <div className="space-y-1">
              <div className="h-1.5 rounded w-full bg-foreground/10" />
              <div className="h-1.5 rounded w-4/5 bg-foreground/10" />
              <div className="h-1.5 rounded w-3/5 bg-foreground/10" />
            </div>
          )}
          {section.type === 'footer' && (
            <div className="space-y-1.5">
              <div className="h-1.5 rounded w-1/3 bg-foreground/20" />
              <div className="flex gap-2">{[0,1,2].map(i => <div key={i} className="h-1 rounded w-8 bg-foreground/10" />)}</div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <SectionTypeBadge type={section.type} />
            {section.scope === 'global'
              ? <Globe className="w-3 h-3 text-muted-foreground shrink-0" />
              : <User className="w-3 h-3 text-muted-foreground shrink-0" />}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 -mr-1">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" />Podgląd</DropdownMenuItem>
              <DropdownMenuItem><Code2 className="w-3.5 h-3.5 mr-2" />Edytuj HTML</DropdownMenuItem>
              <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" />Duplikuj</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><Trash2 className="w-3.5 h-3.5 mr-2" />Usuń</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm font-medium truncate">{section.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{section.description}</p>
        {section.usedBy !== undefined && (
          <p className="text-xs text-muted-foreground/60 mt-1.5">używana przez {section.usedBy} klientów</p>
        )}
      </div>
    </div>
  )
}

export default function SectionLibraryScreen() {
  const [search, setSearch] = React.useState('')
  const [typeFilter, setTypeFilter] = React.useState('all')

  const filterSections = (scope: SectionScope) =>
    SECTIONS
      .filter(s => s.scope === scope)
      .filter(s => typeFilter === 'all' || s.type === typeFilter)
      .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex flex-col h-full bg-background">
      <PageHeader
        title="Biblioteka sekcji"
        actions={
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" />Nowa sekcja
          </Button>
        }
      />

      {/* Filtry */}
      <div className="border-b shrink-0">
        <div className="px-6 py-3">
        <FilterBar
          placeholder="Szukaj sekcji..."
          onSearch={setSearch}
          filters={[{ key: 'type', label: 'Typ', options: Object.entries(TYPE_META).map(([v, m]) => ({ value: v, label: (m as any).label })) }]}
        />
        </div>
      </div>

      {/* ── Tabs z ui/ ── */}
      <Tabs defaultValue="global" className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b shrink-0">
        <div className="">
        <TabsList className="h-10 bg-transparent p-0 gap-0 rounded-none px-6 justify-start">
          <TabsTrigger value="global"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5">
            <Globe className="w-3.5 h-3.5" />Globalne
          </TabsTrigger>
          <TabsTrigger value="client"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5">
            <User className="w-3.5 h-3.5" />Per klient (Animails)
          </TabsTrigger>
        </TabsList>
        </div>
        </div>

        {(['global', 'client'] as SectionScope[]).map(scope => (
          <TabsContent key={scope} value={scope} className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="p-6">
                {filterSections(scope).length === 0 ? (
                  /* ── EmptyState z blocks/ ── */
                  <EmptyState icon={Layers} title="Brak sekcji"
                    description={scope === 'global' ? 'Dodaj pierwszą globalną sekcję HTML.' : 'Brak sekcji dla tego klienta.'}
                    action={{ label: 'Dodaj sekcję' }} />
                ) : (
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                    {filterSections(scope).map(s => <SectionCard key={s.id} section={s} />)}
                    <button className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 p-4 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[160px]">
                      <Plus className="w-5 h-5" /><span className="text-xs">Dodaj sekcję</span>
                    </button>
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
