/**
 * Zephyr – Clients
 * Lista klientów z podglądem aktywności i szybkim dostępem do kreatora.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus, Search, Settings, Clock, Calendar, Zap,
  MoreHorizontal, Mail, Pause, Play,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Client {
  id: string
  name: string
  color: string
  newsletterCount: number
  lastSentAt: string | null
  status: 'active' | 'paused'
  nextScheduled?: string
}

const CLIENTS: Client[] = [
  { id: '1', name: 'Animails',      color: '#4d2e93', newsletterCount: 24, lastSentAt: 'wczoraj',       status: 'active', nextScheduled: 'w piątek' },
  { id: '2', name: 'Beezu',         color: '#10b981', newsletterCount: 12, lastSentAt: '5 dni temu',    status: 'active' },
  { id: '3', name: 'Kosmik Studio', color: '#7c3aed', newsletterCount: 7,  lastSentAt: '3 tyg. temu',   status: 'paused' },
  { id: '4', name: 'Growthers',     color: '#d97706', newsletterCount: 31, lastSentAt: 'dziś, 09:00',   status: 'active', nextScheduled: 'za 2 tyg.' },
]

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-card border rounded-xl px-5 py-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
    </div>
  )
}

function ClientCard({ client }: { client: Client }) {
  return (
    <div className="bg-card border rounded-xl p-5 hover:shadow-sm transition-shadow group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: client.color }}
          >
            {getInitials(client.name)}
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ fontFamily: "'Lora', Georgia, serif" }}>{client.name}</p>
            <p className="text-xs text-muted-foreground">{client.newsletterCount} newsletterów</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={client.status === 'active' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {client.status === 'active' ? 'Aktywny' : 'Pauza'}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-3.5 h-3.5 mr-2" />Konfiguracja
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="w-3.5 h-3.5 mr-2" />Historia
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {client.status === 'active'
                ? <DropdownMenuItem><Pause className="w-3.5 h-3.5 mr-2" />Wstrzymaj</DropdownMenuItem>
                : <DropdownMenuItem><Play className="w-3.5 h-3.5 mr-2" />Wznów</DropdownMenuItem>
              }
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Usuń klienta</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="space-y-1.5 mb-4 text-xs text-muted-foreground">
        {client.lastSentAt && (
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Ostatni: {client.lastSentAt}</span>
          </div>
        )}
        {client.nextScheduled && (
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary font-medium">Następny: {client.nextScheduled}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t">
        <Button size="sm" className="flex-1 h-8 text-xs gap-1.5 justify-start">
          <Zap className="w-3.5 h-3.5" />
          Nowy newsletter
        </Button>
        <Button size="sm" variant="ghost" className="h-8 px-3">
          <Settings className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default function ClientsScreen() {
  const [search, setSearch] = React.useState('')
  const filtered = CLIENTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-6 gap-4 shrink-0">
        <h1 className="text-sm font-semibold flex-1">Klienci</h1>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="w-3.5 h-3.5" />
          Nowy klient
        </Button>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 grid grid-cols-4 gap-3 border-b shrink-0">
        <StatCard label="Klientów" value={CLIENTS.length} />
        <StatCard label="Newsletterów łącznie" value={CLIENTS.reduce((s, c) => s + c.newsletterCount, 0)} />
        <StatCard label="Aktywnych" value={CLIENTS.filter(c => c.status === 'active').length} />
        <StatCard label="Ten miesiąc" value="8" sub="wygenerowanych" />
      </div>

      {/* Search */}
      <div className="px-6 py-3 border-b shrink-0">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj klienta..."
            className="pl-9 h-8 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto p-6">
        <div className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filtered.map(client => <ClientCard key={client.id} client={client} />)}
          {/* Add new client card */}
          <button className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 p-6 text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors min-h-[200px]">
            <Plus className="w-6 h-6" />
            <span className="text-xs">Dodaj klienta</span>
          </button>
        </div>
      </div>
    </div>
  )
}
