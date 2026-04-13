/**
 * Zephyr – History
 * Historia newsletterów wygenerowanych dla danego klienta.
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
  Search, Eye, Copy, Download, MoreHorizontal, Trash2,
  Zap, TrendingUp, Mail, Clock, Code2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type NLStatus = 'draft' | 'generated' | 'exported'

interface Newsletter {
  id: string
  subject: string
  preheader: string
  createdAt: string
  status: NLStatus
  sections: number
  tokens: number
  campaign: string
}

const NEWSLETTERS: Newsletter[] = [
  { id: '1', subject: 'Wiosenna promocja – do -40% na karmy!',         preheader: 'Sprawdź, co przygotowaliśmy dla Twojego pupila na tę wiosnę 🐾', createdAt: 'dziś, 14:09',    status: 'generated', sections: 5, tokens: 3260, campaign: 'wiosna-2026'    },
  { id: '2', subject: 'Wielkanocny koszyczek dla pupila – nowości!',    preheader: 'Zestawy prezentowe już dostępne. Kup z dostawą przed świętami.',  createdAt: 'wczoraj',          status: 'exported',  sections: 6, tokens: 4100, campaign: 'wielkanoc-2026' },
  { id: '3', subject: 'Ostatnia szansa: zimowa wyprzedaż do -50%',     preheader: 'Tylko 48 godzin. Skorzystaj, zanim skończą się zapasy.',           createdAt: '3 dni temu',       status: 'exported',  sections: 5, tokens: 3880, campaign: 'zima-outlet-2026' },
  { id: '4', subject: 'Nowe przysmaki dla kota – test naszego zespołu', preheader: 'Przetestowaliśmy 8 nowości. Oto nasza ocena (i kotów!).',           createdAt: '1 tyg. temu',      status: 'exported',  sections: 7, tokens: 5120, campaign: 'nowosci-koty-q1' },
  { id: '5', subject: 'Styczeń w Animails – co nowego?',               preheader: 'Nowe marki, nowe produkty, nowe ceny. Sprawdź sam.',               createdAt: '3 tyg. temu',      status: 'exported',  sections: 4, tokens: 2940, campaign: 'styczen-2026' },
  { id: '6', subject: '[Szkic] Poradnik: jak wybrać karmę dla szczeniaka', preheader: 'Przegląd 6 kryteriów i top 3 polecane przez weterynarzy.',      createdAt: '1 mies. temu',     status: 'draft',     sections: 0, tokens: 0,    campaign: 'edukacja-q1' },
]

const STATUS_CONFIG: Record<NLStatus, { label: string; dot: string; badgeClass: string }> = {
  draft:     { label: 'Szkic',      dot: 'bg-slate-400',   badgeClass: 'bg-slate-100 text-slate-600 border-slate-200' },
  generated: { label: 'Wygenerowany', dot: 'bg-sky-500',   badgeClass: 'bg-sky-50 text-sky-700 border-sky-200' },
  exported:  { label: 'Wyeksportowany', dot: 'bg-emerald-500', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
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

export default function HistoryScreen() {
  const [search, setSearch]     = React.useState('')
  const [filter, setFilter]     = React.useState<NLStatus | 'all'>('all')

  const filtered = NEWSLETTERS
    .filter(n => n.subject.toLowerCase().includes(search.toLowerCase()))
    .filter(n => filter === 'all' || n.status === filter)

  const totalTokens = NEWSLETTERS.reduce((s, n) => s + n.tokens, 0)

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
          AN
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">Animails · Historia</h1>
          <p className="text-xs text-muted-foreground">Wygenerowane newslettery</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Zap className="w-3.5 h-3.5" />
          Nowy newsletter
        </Button>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 grid grid-cols-4 gap-3 border-b shrink-0">
        <StatCard label="Łącznie"         value={NEWSLETTERS.length} />
        <StatCard label="Wyeksportowanych" value={NEWSLETTERS.filter(n => n.status === 'exported').length} />
        <StatCard label="Zużyte tokeny"   value={totalTokens.toLocaleString()} sub="łącznie" />
        <StatCard label="Średnio sekcji"  value={(NEWSLETTERS.filter(n => n.sections > 0).reduce((s, n) => s + n.sections, 0) / NEWSLETTERS.filter(n => n.sections > 0).length).toFixed(1)} />
      </div>

      {/* Filters */}
      <div className="px-6 py-3 border-b flex items-center gap-3 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Szukaj po temacie..."
            className="pl-9 h-8 text-sm w-60"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          {([['all', 'Wszystkie'], ['draft', 'Szkice'], ['generated', 'Wygenerowane'], ['exported', 'Wyeksportowane']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={cn(
                'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
                filter === val
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-background border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground">Temat</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Kampania</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Sekcje</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Tokeny</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Data</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(n => {
              const st = STATUS_CONFIG[n.status]
              return (
                <tr key={n.id} className="hover:bg-muted/40 transition-colors group">
                  <td className="px-6 py-3">
                    <p className="text-sm font-medium truncate max-w-[340px]">{n.subject}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[340px] mt-0.5 italic">{n.preheader}</p>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {n.campaign}
                    </code>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {n.sections > 0 ? n.sections : '—'}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {n.tokens > 0 ? n.tokens.toLocaleString() : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {n.createdAt}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={cn('text-xs border gap-1.5', st.badgeClass)}>
                      <div className={cn('w-1.5 h-1.5 rounded-full', st.dot)} />
                      {st.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {n.status !== 'draft' && (
                        <>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Code2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Download className="w-3.5 h-3.5" />
                          </Button>
                        </>
                      )}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Eye className="w-3.5 h-3.5 mr-2" />Podgląd</DropdownMenuItem>
                          <DropdownMenuItem><Copy className="w-3.5 h-3.5 mr-2" />Duplikuj brief</DropdownMenuItem>
                          <DropdownMenuItem><Download className="w-3.5 h-3.5 mr-2" />Pobierz HTML</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-3.5 h-3.5 mr-2" />Usuń
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Mail className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">Brak newsletterów spełniających kryteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
