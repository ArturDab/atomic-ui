/**
 * Zephyr – Clients
 * Używa: StatCard, EmptyState, FilterBar, ChatPanel z @/components/blocks
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { StatCard } from '@/components/blocks/stat-card'
import { EmptyState } from '@/components/blocks/empty-state'
import { FilterBar } from '@/components/blocks/filter-bar'
import { Plus, Settings, Clock, Calendar, Zap, MoreHorizontal, Mail, Pause, Play, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Client {
  id: string; name: string; color: string
  newsletterCount: number; lastSentAt: string | null
  status: 'active' | 'paused'; nextScheduled?: string
}

const CLIENTS: Client[] = [
  { id: '1', name: 'Animails',      color: '#0ea5e9', newsletterCount: 24, lastSentAt: 'wczoraj',     status: 'active', nextScheduled: 'w piątek' },
  { id: '2', name: 'Beezu',         color: '#10b981', newsletterCount: 12, lastSentAt: '5 dni temu',  status: 'active' },
  { id: '3', name: 'Kosmik Studio', color: '#8b5cf6', newsletterCount: 7,  lastSentAt: '3 tyg. temu', status: 'paused' },
  { id: '4', name: 'Growthers',     color: '#f59e0b', newsletterCount: 31, lastSentAt: 'dziś, 09:00', status: 'active', nextScheduled: 'za 2 tyg.' },
]

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

// ── Status dot ────────────────────────────────────────────────────────────────
function StatusDot({ status }: { status: 'active' | 'paused' }) {
  return (
    <span className={cn(
      'w-1.5 h-1.5 rounded-full shrink-0',
      status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/40'
    )} />
  )
}

// ── Client Card ───────────────────────────────────────────────────────────────
function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden hover:shadow-sm transition-all group">

      {/* Górny pasek koloru klienta – 3px accent */}
      <div className="h-0.5 w-full" style={{ backgroundColor: client.color }} />

      <div className="p-5">
        {/* ── Nagłówek karty ── */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ backgroundColor: client.color }}
            >
              {initials(client.name)}
            </div>
            {/* Nazwa + meta */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold leading-none truncate">{client.name}</p>
                <StatusDot status={client.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {client.newsletterCount} newsletterów
              </p>
            </div>
          </div>

          {/* Menu – zawsze widoczne */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground -mr-1">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Settings className="w-3.5 h-3.5 mr-2" />Konfiguracja</DropdownMenuItem>
              <DropdownMenuItem><Mail className="w-3.5 h-3.5 mr-2" />Historia</DropdownMenuItem>
              <DropdownMenuSeparator />
              {client.status === 'active'
                ? <DropdownMenuItem><Pause className="w-3.5 h-3.5 mr-2" />Wstrzymaj</DropdownMenuItem>
                : <DropdownMenuItem><Play className="w-3.5 h-3.5 mr-2" />Wznów</DropdownMenuItem>}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Usuń klienta</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ── Info ── */}
        {(client.lastSentAt || client.nextScheduled) && (
          <div className="space-y-1 mb-4 text-xs text-muted-foreground">
            {client.lastSentAt && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 shrink-0" />
                <span>Ostatni: {client.lastSentAt}</span>
              </div>
            )}
            {client.nextScheduled && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 shrink-0 text-foreground/60" />
                <span className="text-foreground/80">Następny: {client.nextScheduled}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Akcje ── */}
        <div className="flex gap-2 pt-3 border-t">
          <Button size="sm" className="flex-1 h-8 text-xs gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            Nowy newsletter
          </Button>
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 shrink-0">
            <Settings className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Ekran ─────────────────────────────────────────────────────────────────────

export default function ClientsScreen() {
  const [search, setSearch] = React.useState('')
  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )
  const active = CLIENTS.filter(c => c.status === 'active').length

  return (
    <div className="flex flex-col h-full bg-background">

      {/* Header h-14 */}
      <div className="h-14 border-b flex items-center px-6 gap-4 shrink-0">
        <h1 className="text-sm font-semibold flex-1">Klienci</h1>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" />Nowy klient
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">

          {/* ── StatCard z blocks/ ── */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard label="Klientów" value={CLIENTS.length} />
            <StatCard label="Newsletterów" value={CLIENTS.reduce((s, c) => s + c.newsletterCount, 0)} />
            <StatCard label="Aktywnych" value={active} />
            <StatCard label="Ten miesiąc" value={8} />
          </div>

          {/* ── FilterBar z blocks/ ── */}
          <FilterBar
            placeholder="Szukaj klienta..."
            onSearch={setSearch}
            filters={[{
              key: 'status',
              label: 'Status',
              options: [
                { value: 'active', label: 'Aktywni' },
                { value: 'paused', label: 'Pauza' },
              ],
            }]}
          />

          {/* ── Grid kart ── */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={Users}
              title="Brak klientów"
              description="Dodaj pierwszego klienta żeby zacząć tworzyć newslettery."
              action={{ label: 'Dodaj klienta' }}
            />
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filtered.map(client => <ClientCard key={client.id} client={client} />)}
              {/* Dodaj klienta */}
              <button className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors min-h-[160px]">
                <Plus className="w-5 h-5" />
                <span className="text-xs">Dodaj klienta</span>
              </button>
            </div>
          )}

        </div>
      </ScrollArea>
    </div>
  )
}
