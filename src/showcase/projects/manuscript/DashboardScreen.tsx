/**
 * Manuscript – Dashboard
 *
 * Lista wszystkich treści (artykuły, opracowania, książki).
 * Trzy typy: Artykuł, Opracowanie, Książka.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus, Search, ArrowUpDown, FileText, BookOpen, Layers,
  Star, Clock, Hash, MoreHorizontal, Trash2, Copy,
  ExternalLink, ChevronDown, Filter, Grid2X2, List,
  Edit3, Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Typy ─────────────────────────────────────────────────────────────────────

type ContentType = 'article' | 'study' | 'book'
type Status = 'draft' | 'in-progress' | 'review' | 'done'

interface ContentItem {
  id: string
  type: ContentType
  title: string
  status: Status
  words: number
  updatedAt: string
  starred: boolean
  tags?: string[]
  chapters?: number    // tylko book/study
  progress?: number    // 0–100
}

// ── Dane demo ─────────────────────────────────────────────────────────────────

const ITEMS: ContentItem[] = [
  { id: '1', type: 'article', title: 'Jak AI zmienia content marketing w 2025 roku', status: 'done',    words: 2840, updatedAt: 'dziś, 14:22',   starred: true,  tags: ['AI', 'marketing'] },
  { id: '2', type: 'book',    title: 'Strategie Contentowe dla Ekspertów',           status: 'in-progress', words: 18400, updatedAt: 'dziś, 11:05', starred: true,  chapters: 12, progress: 42 },
  { id: '3', type: 'article', title: 'Newsletter Q1 – podsumowanie wyników Animails', status: 'done',    words: 1240, updatedAt: 'wczoraj',        starred: false, tags: ['newsletter'] },
  { id: '4', type: 'study',   title: 'Raport: AI w polskim e-commerce 2025',         status: 'in-progress', words: 7200, updatedAt: 'wczoraj',    starred: false, chapters: 5, progress: 68 },
  { id: '5', type: 'article', title: 'SEO meta tagi dla Beezu.pl – strona główna',   status: 'done',    words: 420,  updatedAt: '2 dni temu',      starred: false, tags: ['SEO'] },
  { id: '6', type: 'book',    title: 'Prompt Engineering od Zera',                   status: 'draft',   words: 3100, updatedAt: '5 dni temu',      starred: false, chapters: 18, progress: 12 },
  { id: '7', type: 'study',   title: 'Przewodnik po Make.com dla marketingowców',    status: 'review',  words: 9800, updatedAt: '1 tyg. temu',     starred: false, chapters: 8, progress: 85 },
  { id: '8', type: 'article', title: 'Copywriting dla Animails – kampania wiosna',   status: 'draft',   words: 680,  updatedAt: '2 tyg. temu',     starred: false, tags: ['copywriting'] },
]

// ── Mapy ─────────────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<ContentType, { label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }> = {
  article: { label: 'Artykuł',     icon: FileText,  color: 'text-blue-600',   bg: 'bg-blue-50 border-blue-200' },
  study:   { label: 'Opracowanie', icon: Layers,    color: 'text-violet-600', bg: 'bg-violet-50 border-violet-200' },
  book:    { label: 'Książka',     icon: BookOpen,  color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
}

const STATUS_CONFIG: Record<Status, { label: string; dot: string }> = {
  draft:       { label: 'Szkic',      dot: 'bg-slate-400' },
  'in-progress': { label: 'W trakcie', dot: 'bg-blue-500' },
  review:      { label: 'Do rewizji', dot: 'bg-amber-500' },
  done:        { label: 'Gotowe',     dot: 'bg-emerald-500' },
}

// ── Komponenty ────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white border rounded-xl px-5 py-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  )
}

function TypeBadge({ type }: { type: ContentType }) {
  const { label, icon: Icon, bg } = TYPE_CONFIG[type]
  return (
    <span className={cn('inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md border', bg)}>
      <Icon className="w-2.5 h-2.5" /> {label}
    </span>
  )
}

function StatusDot({ status }: { status: Status }) {
  const { dot } = STATUS_CONFIG[status]
  return <span className={cn('w-1.5 h-1.5 rounded-full shrink-0 inline-block', dot)} />
}

function ItemCard({ item, view }: { item: ContentItem; view: 'grid' | 'list' }) {
  const { icon: Icon, color } = TYPE_CONFIG[item.type]

  if (view === 'list') {
    return (
      <div className="group flex items-center gap-4 px-4 py-3 bg-white border rounded-xl hover:border-foreground/20 hover:shadow-sm transition-all">
        <div className={cn('w-8 h-8 rounded-lg border flex items-center justify-center shrink-0', TYPE_CONFIG[item.type].bg)}>
          <Icon className={cn('w-4 h-4', color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {item.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
            <p className="text-sm font-medium truncate">{item.title}</p>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <TypeBadge type={item.type} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <StatusDot status={item.status} />
              {STATUS_CONFIG[item.status].label}
            </span>
            {item.tags?.map(t => (
              <span key={t} className="text-[10px] text-muted-foreground/70">#{t}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
          <span className="flex items-center gap-1"><Hash className="w-3 h-3" />{item.words.toLocaleString()}</span>
          {item.chapters && <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{item.chapters} rozdz.</span>}
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.updatedAt}</span>
          {item.progress !== undefined && (
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-foreground/30 rounded-full" style={{ width: `${item.progress}%` }} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-7 w-7"><Edit3 className="w-3.5 h-3.5" /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" /> Podgląd</DropdownMenuItem>
              <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" /> Duplikuj</DropdownMenuItem>
              <DropdownMenuItem><ExternalLink className="w-3.5 h-3.5 mr-2" /> Eksportuj</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Usuń
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white border rounded-xl p-4 hover:border-foreground/20 hover:shadow-sm transition-all flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-9 h-9 rounded-lg border flex items-center justify-center', TYPE_CONFIG[item.type].bg)}>
          <Icon className={cn('w-4 h-4', color)} />
        </div>
        <div className="flex items-center gap-1">
          {item.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem><Edit3 className="w-3.5 h-3.5 mr-2" /> Otwórz</DropdownMenuItem>
              <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" /> Duplikuj</DropdownMenuItem>
              <DropdownMenuItem><ExternalLink className="w-3.5 h-3.5 mr-2" /> Eksportuj</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Usuń
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="text-sm font-medium leading-snug flex-1 mb-3 line-clamp-2">{item.title}</p>

      {item.progress !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{item.progress}% ukończone</span>
            {item.chapters && <span>{item.chapters} rozdz.</span>}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-foreground/25 rounded-full transition-all" style={{ width: `${item.progress}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t">
        <div className="flex items-center gap-2">
          <TypeBadge type={item.type} />
          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <StatusDot status={item.status} />
            {STATUS_CONFIG[item.status].label}
          </span>
        </div>
        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Hash className="w-3 h-3" /> {item.words.toLocaleString()}
        </div>
      </div>
    </div>
  )
}

// ── Główny komponent ──────────────────────────────────────────────────────────

type FilterType = 'all' | ContentType
type SortOption = 'updated' | 'title' | 'words'

export default function DashboardScreen() {
  const [search, setSearch] = React.useState('')
  const [filter, setFilter] = React.useState<FilterType>('all')
  const [sort, setSort] = React.useState<SortOption>('updated')
  const [view, setView] = React.useState<'grid' | 'list'>('list')

  const filtered = ITEMS
    .filter(i => filter === 'all' || i.type === filter)
    .filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'words') return b.words - a.words
      return 0 // updated – kolejność z tablicy
    })

  const totalWords = ITEMS.reduce((s, i) => s + i.words, 0)
  const thisWeek = ITEMS.filter(i => i.updatedAt.includes('dziś') || i.updatedAt.includes('wczoraj')).length

  const FILTERS: { value: FilterType; label: string }[] = [
    { value: 'all',     label: 'Wszystkie' },
    { value: 'article', label: 'Artykuły' },
    { value: 'study',   label: 'Opracowania' },
    { value: 'book',    label: 'Książki' },
  ]

  return (
    <div className="min-h-full bg-[#fafafa]">
      {/* Top bar */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Manuscript</h1>
            <p className="text-xs text-muted-foreground">Twoje treści w jednym miejscu</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 h-10">
                <Plus className="w-4 h-4" /> Nowa treść <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {(['article', 'study', 'book'] as ContentType[]).map(type => {
                const { label, icon: Icon, color, bg } = TYPE_CONFIG[type]
                return (
                  <DropdownMenuItem key={type} className="gap-3 py-2.5">
                    <div className={cn('w-7 h-7 rounded-md border flex items-center justify-center shrink-0', bg)}>
                      <Icon className={cn('w-3.5 h-3.5', color)} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {type === 'article' ? 'Jeden dokument, bloki treści' : type === 'study' ? 'Sekcje bez hierarchii' : 'Części i rozdziały'}
                      </p>
                    </div>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatCard label="Łącznie treści" value={ITEMS.length} sub={`${ITEMS.filter(i => i.status === 'done').length} gotowych`} />
          <StatCard label="Słów łącznie" value={totalWords.toLocaleString()} sub="we wszystkich plikach" />
          <StatCard label="Aktywne w tym tyg." value={thisWeek} sub="edytowane dziś lub wczoraj" />
          <StatCard label="W trakcie" value={ITEMS.filter(i => i.status === 'in-progress').length} sub={`${ITEMS.filter(i => i.status === 'draft').length} szkiców`} />
        </div>

        {/* Filters + search + sort */}
        <div className="flex items-center gap-3">
          {/* Type tabs */}
          <div className="flex items-center gap-1 bg-white border rounded-lg p-1 shrink-0">
            {FILTERS.map(f => (
              <button key={f.value} onClick={() => setFilter(f.value)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm transition-colors',
                  filter === f.value ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground'
                )}>
                {f.label}
              </button>
            ))}
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Szukaj po tytule lub tagu..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 bg-white h-9" />
          </div>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1.5 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" />
                {sort === 'updated' ? 'Ostatnio edytowane' : sort === 'title' ? 'Tytuł' : 'Liczba słów'}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSort('updated')}>Ostatnio edytowane</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort('title')}>Tytuł A–Z</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSort('words')}>Liczba słów</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View toggle */}
          <div className="flex items-center border rounded-md bg-white overflow-hidden shrink-0">
            <button onClick={() => setView('list')}
              className={cn('p-2 transition-colors', view === 'list' ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted')}>
              <List className="w-4 h-4" />
            </button>
            <button onClick={() => setView('grid')}
              className={cn('p-2 transition-colors', view === 'grid' ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted')}>
              <Grid2X2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wyniki */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground px-1 mb-2">
            {filtered.length} {filtered.length === 1 ? 'pozycja' : filtered.length < 5 ? 'pozycje' : 'pozycji'}
          </p>

          {view === 'list' ? (
            <div className="space-y-2">
              {/* Starred first */}
              {filtered.filter(i => i.starred).length > 0 && (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mt-4 mb-2">Przypięte</p>
                  {filtered.filter(i => i.starred).map(i => <ItemCard key={i.id} item={i} view="list" />)}
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-1 mt-4 mb-2">Pozostałe</p>
                </>
              )}
              {filtered.filter(i => !i.starred).map(i => <ItemCard key={i.id} item={i} view="list" />)}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map(i => <ItemCard key={i.id} item={i} view="grid" />)}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Brak wyników dla „{search}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
