import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft, Edit3, BookOpen, Hash, Star, Clock, Users,
  MapPin, FileText, Sparkles, Image, Upload, Plus, ChevronRight,
  ChevronDown, Circle, CheckCircle2, Timer, MoreHorizontal,
  List, Grid2X2, Paperclip, Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { id: 'overview',   label: 'Przegląd',  icon: BookOpen },
  { id: 'outline',    label: 'Konspekt',  icon: List },
  { id: 'characters', label: 'Postacie',  icon: Users },
  { id: 'world',      label: 'Świat',     icon: MapPin },
  { id: 'notes',      label: 'Notatki',   icon: FileText },
  { id: 'ai',         label: 'AI',        icon: Sparkles },
  { id: 'files',      label: 'Pliki',     icon: Paperclip },
  { id: 'covers',     label: 'Okładki',   icon: Image },
]

const CHAPTERS = [
  { id: 'p1', type: 'part', title: 'Część I: Fundamenty', level: 0, status: 'done', words: 8400, children: [
    { id: 'c1', type: 'chapter', title: 'Wprowadzenie do agentów AI', level: 1, status: 'done', words: 3200, goal: 3000 },
    { id: 'c2', type: 'chapter', title: 'Architektura systemów agentowych', level: 1, status: 'done', words: 2800, goal: 3000 },
    { id: 'c3', type: 'chapter', title: 'Modele językowe jako fundament', level: 1, status: 'in-progress', words: 2400, goal: 3000 },
  ]},
  { id: 'p2', type: 'part', title: 'Część II: Implementacja', level: 0, status: 'in-progress', words: 5600, children: [
    { id: 'c4', type: 'chapter', title: 'Projektowanie przepływów pracy', level: 1, status: 'in-progress', words: 1800, goal: 3000 },
    { id: 'c5', type: 'chapter', title: 'Integracja z istniejącymi systemami', level: 1, status: 'draft', words: 600, goal: 3000 },
    { id: 'c6', type: 'chapter', title: 'Testowanie i walidacja agentów', level: 1, status: 'draft', words: 200, goal: 3000 },
    { id: 'c7', type: 'chapter', title: 'Monitoring i optymalizacja', level: 1, status: 'draft', words: 0, goal: 3000 },
  ]},
  { id: 'p3', type: 'part', title: 'Część III: Skalowanie', level: 0, status: 'draft', words: 0, children: [
    { id: 'c8', type: 'chapter', title: 'Zarządzanie zespołami agentów', level: 1, status: 'draft', words: 0, goal: 3000 },
    { id: 'c9', type: 'chapter', title: 'Ekonomia wdrożeń AI', level: 1, status: 'draft', words: 0, goal: 3000 },
    { id: 'c10', type: 'chapter', title: 'Przyszłość systemów agentowych', level: 1, status: 'draft', words: 0, goal: 3000 },
  ]},
]

const STATUS_CONFIG = {
  done: { label: 'Gotowe', icon: CheckCircle2, color: 'text-emerald-500' },
  'in-progress': { label: 'W trakcie', icon: Timer, color: 'text-blue-500' },
  draft: { label: 'Szkic', icon: Circle, color: 'text-muted-foreground/40' },
}

function StatusIcon({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.draft
  return <cfg.icon className={cn('w-3.5 h-3.5 shrink-0', cfg.color)} />
}

export default function BookOverviewScreen() {
  const [activeTab, setActiveTab] = React.useState('overview')
  const [expandedParts, setExpandedParts] = React.useState(new Set(['p1', 'p2']))
  const totalWords = CHAPTERS.reduce((n, p) => n + (p as any).words, 0)
  const totalGoal = 50000
  const doneChapters = CHAPTERS.flatMap(p => (p as any).children || []).filter(c => c.status === 'done').length
  const totalChapters = CHAPTERS.flatMap(p => (p as any).children || []).length

  return (
    <div className="flex flex-col h-full bg-background">
      {/* App header */}
      <div className="h-14 border-b flex items-center px-4 gap-3 shrink-0 bg-white">
        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="w-4 h-4" /></Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant="outline" className="text-[10px] border-emerald-200 bg-emerald-50 text-emerald-600 shrink-0">Książka</Badge>
          <span className="text-sm font-semibold truncate">Strategie Contentowe dla Ekspertów</span>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-sm shrink-0">
          <Edit3 className="w-4 h-4" /> Edytuj
        </Button>
      </div>

      {/* Tab bar */}
      <div className="border-b flex items-center justify-center overflow-x-auto bg-white">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-3 text-sm border-b-2 transition-colors whitespace-nowrap',
                activeTab === tab.id
                  ? 'border-foreground text-foreground font-medium'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}>
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          )
        })}
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-6">

          {/* PRZEGLĄD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Słów napisano', value: totalWords.toLocaleString(), sub: `z ${totalGoal.toLocaleString()}` },
                  { label: 'Stron (~250 słów)', value: Math.round(totalWords / 250), sub: 'standardowy format' },
                  { label: 'Rozdziałów', value: `${doneChapters}/${totalChapters}`, sub: 'gotowych' },
                  { label: 'Ukończono', value: `${Math.round(totalWords / totalGoal * 100)}%`, sub: 'całości' },
                ].map(stat => (
                  <div key={stat.label} className="bg-white border rounded-xl p-4">
                    <p className="text-xs text-foreground/65 mb-1">{stat.label}</p>
                    <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
                    <p className="text-xs text-foreground/60 mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="bg-white border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Postęp pracy</p>
                  <p className="text-xs text-muted-foreground">{totalWords.toLocaleString()} / {totalGoal.toLocaleString()} słów</p>
                </div>
                <Progress value={totalWords / totalGoal * 100} className="h-2" />
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {Object.entries(STATUS_CONFIG).map(([key, cfg]) => {
                    const count = CHAPTERS.flatMap(p => (p as any).children || []).filter(c => c.status === key).length
                    return (
                      <div key={key} className="flex items-center gap-2">
                        <cfg.icon className={cn('w-3.5 h-3.5', cfg.color)} />
                        <span className="text-xs text-muted-foreground">{cfg.label}</span>
                        <span className="text-xs font-semibold ml-auto">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Ostatnie aktywności */}
              <div className="bg-white border rounded-xl p-4">
                <p className="text-sm font-medium mb-3">Ostatnio edytowane</p>
                <div className="space-y-2">
                  {[
                    { title: 'Architektura systemów agentowych', time: 'dziś, 14:22', words: '+340' },
                    { title: 'Projektowanie przepływów pracy', time: 'wczoraj, 18:05', words: '+180' },
                    { title: 'Wprowadzenie do agentów AI', time: '2 dni temu', words: '+0' },
                  ].map(item => (
                    <div key={item.title} className="flex items-center gap-3 py-2 border-b last:border-0">
                      <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                      <p className="text-sm flex-1 truncate">{item.title}</p>
                      <span className="text-xs text-emerald-600 shrink-0">{item.words}</span>
                      <span className="text-xs text-foreground/65 shrink-0">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* KONSPEKT */}
          {activeTab === 'outline' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{totalChapters} rozdziałów · {CHAPTERS.length} części</p>
                <Button size="sm" variant="outline" className="h-8 gap-1.5 text-sm">
                  <Plus className="w-4 h-4" /> Dodaj część
                </Button>
              </div>
              {CHAPTERS.map(part => (
                <div key={part.id}>
                  <button
                    onClick={() => setExpandedParts(prev => {
                      const n = new Set(prev); n.has(part.id) ? n.delete(part.id) : n.add(part.id); return n
                    })}
                    className="w-full flex items-center gap-3 px-4 py-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors">
                    {expandedParts.has(part.id) ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    <StatusIcon status={part.status} />
                    <span className="text-sm font-semibold flex-1 text-left">{part.title}</span>
                    <span className="text-xs text-muted-foreground">{(part as any).words?.toLocaleString()} słów</span>
                  </button>
                  {expandedParts.has(part.id) && (part as any).children?.map((ch: any) => (
                    <div key={ch.id} className="flex items-center gap-3 px-4 py-2.5 ml-4 border-b hover:bg-muted/30 transition-colors group">
                      <StatusIcon status={ch.status} />
                      <span className="text-sm flex-1">{ch.title}</span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {ch.words > 0 && (
                          <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-foreground/25 rounded-full" style={{ width: `${Math.min(ch.words / ch.goal * 100, 100)}%` }} />
                          </div>
                        )}
                        <span>{ch.words > 0 ? `${ch.words} / ${ch.goal}` : 'nie zaczęty'}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit3 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* AI */}
          {activeTab === 'ai' && (
            <div className="space-y-6">
              <div className="bg-white border rounded-xl p-5">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4" /> Instrukcje dla AI
                </h3>
                <p className="text-xs text-foreground/85 mb-4">
                  Te instrukcje będą automatycznie dołączane do każdego zapytania AI w tej książce.
                </p>
                <Textarea
                  className="min-h-32 text-sm"
                  defaultValue="Pisz w stylu przystępnym, ale eksperckim. Tekst jest przeznaczony dla doświadczonych marketerów i menedżerów produktu. Unikaj nadmiernego żargonu technicznego. Zamiast abstrakcji, używaj konkretnych przykładów z rynku polskiego i europejskiego."
                  placeholder="Opisz styl, ton, kontekst, persony czytelnicze..."
                />
                <p className="text-xs text-muted-foreground mt-2">AI widzi te instrukcje + tytuł książki + aktualny rozdział.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Postacie', value: '0 zdefiniowanych' },
                  { label: 'Miejsca/Świat', value: '0 zdefiniowanych' },
                  { label: 'Rozdziałów', value: `${totalChapters} rozdziałów` },
                  { label: 'Słów w kontekście', value: `~${totalWords} słów` },
                ].map(item => (
                  <div key={item.label} className="bg-muted/30 border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Prosty placeholder dla innych tabów */}
          {!['overview', 'outline', 'ai'].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                {(() => { const Tab = TABS.find(t => t.id === activeTab); return Tab ? <Tab.icon className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} /> : null })()}
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {TABS.find(t => t.id === activeTab)?.label}
              </p>
              <p className="text-xs text-foreground/65 mt-1 mb-4">
                {activeTab === 'characters' && 'Zarządzaj postaciami w swojej historii'}
                {activeTab === 'world' && 'Buduj świat i miejsca swojej narracji'}
                {activeTab === 'notes' && 'Notatki projektu i rozdziałów'}
                {activeTab === 'files' && 'Załączniki i pliki badawcze'}
                {activeTab === 'covers' && 'Okładka przednia i tylna'}
              </p>
              <Button size="sm" className="h-9 gap-2">
                <Plus className="w-4 h-4" /> Dodaj pierwszy element
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
