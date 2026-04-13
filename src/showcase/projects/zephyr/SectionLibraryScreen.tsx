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
import { FilterBar } from '@/components/blocks/filter-bar'
import { Plus, Eye, Code2, Copy, MoreHorizontal, Trash2, Globe, User, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'divider' | 'footer'
type SectionScope = 'global' | 'client'

interface Section {
  id: string; name: string; type: SectionType
  description: string; scope: SectionScope; usedBy?: number
  previewBg: string; previewAccent: string
}

const TYPE_COLOR: Record<SectionType, string> = {
  header:  'bg-muted text-foreground/60',
  hero:    'bg-muted text-foreground/70',
  cta:     'bg-foreground/[0.07] text-foreground/75',
  product: 'bg-foreground/[0.07] text-foreground/75',
  content: 'bg-muted text-foreground/70',
  divider: 'bg-muted/60 text-foreground/50',
  footer:  'bg-muted text-foreground/60',
}
const TYPE_LABEL: Record<SectionType, string> = {
  header: 'Nagłówek', hero: 'Hero', cta: 'CTA', product: 'Produkt',
  content: 'Treść', divider: 'Separator', footer: 'Stopka',
}

const SECTIONS: Section[] = [
  { id: '1', name: 'Nagłówek standardowy',  type: 'header',  description: 'Logo + nawigacja + przycisk CTA', scope: 'global', usedBy: 8,  previewBg: '#f8fafc', previewAccent: '#0ea5e9' },
  { id: '2', name: 'Hero full-width',        type: 'hero',    description: 'Duży baner z tłem i CTA',        scope: 'global', usedBy: 5,  previewBg: '#eff6ff', previewAccent: '#3b82f6' },
  { id: '3', name: 'Sekcja CTA prosta',      type: 'cta',     description: 'Tekst + przycisk wyśrodkowany',  scope: 'global', usedBy: 12, previewBg: '#fff7ed', previewAccent: '#f59e0b' },
  { id: '4', name: 'Stopka standardowa',     type: 'footer',  description: 'Dane firmy + linki + dane kontaktowe', scope: 'global', usedBy: 9, previewBg: '#f8fafc', previewAccent: '#64748b' },
  { id: '5', name: 'Nagłówek Animails',      type: 'header',  description: 'Logo Animails + tagline',        scope: 'client', previewBg: '#f0f9ff', previewAccent: '#0ea5e9' },
  { id: '6', name: 'Produkty 3 kolumny',     type: 'product', description: 'Siatka 3 produktów z cenami',   scope: 'client', previewBg: '#f0fdf4', previewAccent: '#10b981' },
]

function SectionCard({ section }: { section: Section }) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden hover:shadow-sm transition-shadow group">
      {/* Mini preview */}
      <div className="h-20 border-b relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: section.previewBg }}>
        <div className="w-3/4 space-y-1.5 px-3">
          <div className="h-2 rounded-full w-1/2" style={{ backgroundColor: section.previewAccent + '80' }} />
          <div className="h-1.5 rounded-full w-full bg-black/10" />
          <div className="h-1.5 rounded-full w-4/5 bg-black/10" />
          {section.type === 'cta' && (
            <div className="h-4 rounded w-16 mt-1" style={{ backgroundColor: section.previewAccent }} />
          )}
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0', TYPE_COLOR[section.type])}>
              {TYPE_LABEL[section.type]}
            </span>
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
        <p className="text-xs font-medium truncate">{section.name}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{section.description}</p>
        {section.usedBy !== undefined && (
          <p className="text-[10px] text-muted-foreground/60 mt-1.5">używana przez {section.usedBy} klientów</p>
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
      <div className="h-14 border-b flex items-center px-6 gap-4 shrink-0">
        <h1 className="text-sm font-semibold flex-1">Biblioteka sekcji</h1>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" />Nowa sekcja
        </Button>
      </div>

      {/* Filtry */}
      <div className="px-6 py-3 border-b shrink-0">
        <FilterBar
          placeholder="Szukaj sekcji..."
          onSearch={setSearch}
          filters={[{ key: 'type', label: 'Typ', options: Object.entries(TYPE_LABEL).map(([v, l]) => ({ value: v, label: l })) }]}
        />
      </div>

      {/* ── Tabs z ui/ ── */}
      <Tabs defaultValue="global" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="h-10 bg-transparent p-0 gap-0 border-b rounded-none px-6 justify-start shrink-0">
          <TabsTrigger value="global"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5">
            <Globe className="w-3.5 h-3.5" />Globalne
          </TabsTrigger>
          <TabsTrigger value="client"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5">
            <User className="w-3.5 h-3.5" />Per klient (Animails)
          </TabsTrigger>
        </TabsList>

        {(['global', 'client'] as SectionScope[]).map(scope => (
          <TabsContent key={scope} value={scope} className="flex-1 overflow-hidden mt-0">
            <ScrollArea className="h-full">
              <div className="p-6 max-w-5xl mx-auto">
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
