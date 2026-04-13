/**
 * Zephyr – History
 * Używa: StatCard, EmptyState, PageHeader z @/components/blocks
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { StatCard } from '@/components/blocks/stat-card'
import { PageHeader } from '@/components/blocks/page-header'
import { useHistory } from '@/modules/zephyr'
import { FilterBar } from '@/components/blocks/filter-bar'
import { EmptyState } from '@/components/blocks/empty-state'
import { Eye, Copy, Download, MoreHorizontal, Trash2, Zap, Mail, Clock, Code2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type NLStatus = 'draft' | 'generated' | 'exported'

interface Newsletter {
  id: string; subject: string; preheader: string
  createdAt: string; status: NLStatus
  sections: number; tokens: number; campaign: string
}

const NEWSLETTERS: Newsletter[] = [
  { id: '1', subject: 'Wiosenna promocja – do -40% na karmy!',       preheader: 'Sprawdź, co przygotowaliśmy dla Twojego pupila',  createdAt: 'dziś, 14:09',    status: 'generated', sections: 5, tokens: 3260, campaign: 'wiosna-2026'    },
  { id: '2', subject: 'Nowości marzec 2026 – karma Royal Canin',      preheader: 'Polecamy produkty, które Twój pupil pokocha',      createdAt: 'wczoraj, 11:23', status: 'exported',  sections: 4, tokens: 2840, campaign: 'mar-2026'        },
  { id: '3', subject: 'Walentynki dla pupili – prezenty do 80 zł',    preheader: 'Znajdź idealny prezent dla czworonoga',            createdAt: '12 lut, 09:00',  status: 'exported',  sections: 6, tokens: 4120, campaign: 'walentynki-2026' },
  { id: '4', subject: 'Nowa karma bezzbożowa – premiera',             preheader: 'Odkryj nową linię karm dla wrażliwych psów',       createdAt: '3 lut, 16:45',   status: 'draft',     sections: 3, tokens: 0,    campaign: ''               },
]

// Hierarchia semantyczna: exported > generated > draft
const STATUS_CONFIG: Record<NLStatus, { label: string; className: string }> = {
  exported:  { label: 'Wyeksportowany', className: 'bg-foreground text-background border-transparent' },
  generated: { label: 'Wygenerowany',   className: 'bg-background text-foreground border-border' },
  draft:     { label: 'Szkic',          className: 'bg-muted/60 text-foreground/50 border-transparent' },
}

export default function HistoryScreen() {
  const [search, setSearch] = React.useState('')
  const filtered = NEWSLETTERS.filter(n =>
    n.subject.toLowerCase().includes(search.toLowerCase()) ||
    n.campaign.toLowerCase().includes(search.toLowerCase())
  )
  const exported = NEWSLETTERS.filter(n => n.status === 'exported').length
  const totalTokens = NEWSLETTERS.reduce((s, n) => s + n.tokens, 0)

  return (
    <div className="flex flex-col h-full bg-background">
      <PageHeader
        title="Historia newsletterów"
        actions={
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Zap className="w-3.5 h-3.5" />Nowy newsletter
          </Button>
        }
      />

      <ScrollArea className="flex-1">
        <div className="px-6 py-6 space-y-6">

          {/* ── StatCard z blocks/ ── */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard label="Łącznie" value={NEWSLETTERS.length} />
            <StatCard label="Wyeksportowanych" value={exported} />
            <StatCard label="Tokenów zużytych" value={totalTokens.toLocaleString('pl')} />
            <StatCard label="Średnio sekcji" value={(NEWSLETTERS.reduce((s, n) => s + n.sections, 0) / NEWSLETTERS.length).toFixed(1)} />
          </div>

          {/* ── FilterBar z blocks/ ── */}
          <FilterBar
            placeholder="Szukaj newslettera..."
            onSearch={setSearch}
            filters={[{ key: 'status', label: 'Status', options: [{ value: 'draft', label: 'Szkic' }, { value: 'generated', label: 'Wygenerowany' }, { value: 'exported', label: 'Wyeksportowany' }] }]}
          />

          {/* ── Lista ── */}
          <div className="space-y-2">
          {filtered.length === 0 ? (
            /* ── EmptyState z blocks/ ── */
            <EmptyState icon={Mail} title="Brak newsletterów"
              description="Historia pojawi się tu po wygenerowaniu pierwszego newslettera." />
          ) : filtered.map(nl => (
            <div key={nl.id} className="bg-card border rounded-xl px-5 py-4 flex items-start gap-4 hover:shadow-sm transition-shadow group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${STATUS_CONFIG[nl.status].className}`}>
                    {STATUS_CONFIG[nl.status].label}
                  </span>
                  {nl.campaign && (
                    <span className="text-[10px] text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded">
                      {nl.campaign}
                    </span>
                  )}
                </div>
                <p className="font-medium text-sm">{nl.subject}</p>
                <p className="text-xs text-muted-foreground truncate">{nl.preheader}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{nl.createdAt}</span>
                  <span>{nl.sections} sekcji</span>
                  {nl.tokens > 0 && <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{nl.tokens.toLocaleString('pl')} tokenów</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Copy className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="w-3.5 h-3.5" /></Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="w-3.5 h-3.5" /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Code2 className="w-3.5 h-3.5 mr-2" />Pokaż HTML</DropdownMenuItem>
                    <DropdownMenuItem><Zap className="w-3.5 h-3.5 mr-2" />Replikuj kampanię</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive"><Trash2 className="w-3.5 h-3.5 mr-2" />Usuń</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
