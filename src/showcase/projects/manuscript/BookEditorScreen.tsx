import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import {
  ArrowLeft, ChevronDown, ChevronRight, Plus, Sparkles,
  Clock, Hash, CheckCircle2, Timer, Circle, MoreHorizontal,
  BookOpen, FileText, Sparkles as AI, Settings, Eye,
  ExternalLink, Search, History, PanelLeft,
  GripVertical, Edit3, Star,
} from 'lucide-react'
import { EditorToolbar } from './_Toolbar'
import { AIPanel } from './_AIPanel'
import { SelectionMenu } from './_SelectionMenu'
import { cn } from '@/lib/utils'

// ── Struktura ─────────────────────────────────────────────────────────────────

const STRUCTURE = [
  { id: 'p1', type: 'part', title: 'Część I: Fundamenty', status: 'done', words: 8400, children: [
    { id: 'c1', type: 'chapter', title: 'Wprowadzenie do agentów AI', status: 'done', words: 3200, active: false },
    { id: 'c2', type: 'chapter', title: 'Architektura systemów agentowych', status: 'done', words: 2800, active: false },
    { id: 'c3', type: 'chapter', title: 'Modele językowe jako fundament', status: 'in-progress', words: 2400, active: true },
  ]},
  { id: 'p2', type: 'part', title: 'Część II: Implementacja', status: 'in-progress', words: 2400, children: [
    { id: 'c4', type: 'chapter', title: 'Projektowanie przepływów pracy', status: 'in-progress', words: 1800, active: false },
    { id: 'c5', type: 'chapter', title: 'Integracja z systemami', status: 'draft', words: 600, active: false },
  ]},
]

const STATUS_COLORS = {
  done: 'text-emerald-500',
  'in-progress': 'text-blue-500',
  draft: 'text-muted-foreground/30',
}
const STATUS_ICONS = {
  done: CheckCircle2,
  'in-progress': Timer,
  draft: Circle,
}

const CHAPTER_CONTENT = [
  'Modele językowe stanowią serce współczesnych systemów agentowych. Ich zdolność do rozumienia i generowania tekstu w języku naturalnym sprawia, że mogą pełnić rolę "mózgu" agenta – interpretować polecenia, planować działania i komunikować wyniki.',
  'Kluczowym aspektem, który odróżnia modele odpowiednie dla systemów agentowych od tych do prostych zastosowań, jest zdolność do tzw. function calling – wywoływania zewnętrznych narzędzi i API na podstawie konwersacji. GPT-4o, Claude Sonnet czy Gemini Pro oferują tę funkcjonalność natywnie.',
  'Warto podkreślić, że wybór modelu powinien być podyktowany nie tylko możliwościami, ale też latency i kosztami. W systemach agentowych, gdzie jeden przepływ może wymagać kilkunastu wywołań modelu, różnice w szybkości i cenie kumulują się znacząco.',
]

export default function BookEditorScreen() {
  const [expandedParts, setExpandedParts] = React.useState(new Set(['p1', 'p2']))
  const [showAI, setShowAI] = React.useState(true)
  const [activeRightTab, setActiveRightTab] = React.useState<'chapter' | 'book' | 'ai' | 'settings'>('chapter')
  const [showSelection, setShowSelection] = React.useState(false)
  const [showStructure, setShowStructure] = React.useState(true)

  const togglePart = (id: string) => setExpandedParts(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  return (
    <div className="flex flex-col h-full bg-background">
      {/* App header */}
      <div className="h-12 border-b flex items-center px-4 gap-3 shrink-0 bg-white">
        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="w-4 h-4" /></Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-sm text-muted-foreground truncate hidden sm:block">Strategie Contentowe</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 hidden sm:block" />
          <span className="text-sm font-medium truncate">Modele językowe jako fundament</span>
          <Badge variant="outline" className="text-[10px] ml-1 shrink-0">W trakcie</Badge>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-muted-foreground hidden md:flex items-center gap-1">
            <Clock className="w-3 h-3" /> Autozapis
          </span>
          <Separator orientation="vertical" className="h-5 mx-1 hidden md:block" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><Search className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><History className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Star className="w-4 h-4" /></Button>
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm hidden sm:flex">
            <Eye className="w-4 h-4" /> Podgląd
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-sm">
            <ExternalLink className="w-4 h-4" /> Eksportuj
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Lewy panel: drzewo struktury ─────────────────────────────── */}
        {showStructure && (
          <div className="w-56 border-r flex flex-col shrink-0 bg-background">
            <div className="h-10 border-b flex items-center justify-between px-3 shrink-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Struktura</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowStructure(false)}>
                  <PanelLeft className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="px-2 py-1.5 border-b">
              <div className="flex items-center justify-between px-2 py-1 text-xs text-muted-foreground">
                <span>0 słów</span>
                <span>50 000 cel</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden mx-2">
                <div className="h-full bg-foreground/25 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="py-2">
                {STRUCTURE.map(part => {
                  const StatusIcon = STATUS_ICONS[part.status as keyof typeof STATUS_ICONS]
                  return (
                    <div key={part.id}>
                      <button onClick={() => togglePart(part.id)}
                        className="w-full flex items-center gap-1.5 px-3 py-2 text-xs hover:bg-muted/50 transition-colors group">
                        {expandedParts.has(part.id)
                          ? <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                          : <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
                        <StatusIcon className={cn('w-2.5 h-2.5 shrink-0', STATUS_COLORS[part.status as keyof typeof STATUS_COLORS])} />
                        <span className="flex-1 text-left font-medium truncate text-muted-foreground">{part.title}</span>
                      </button>
                      {expandedParts.has(part.id) && (part as any).children?.map((ch: any) => {
                        const ChIcon = STATUS_ICONS[ch.status as keyof typeof STATUS_ICONS]
                        return (
                          <button key={ch.id}
                            className={cn(
                              'w-full flex items-center gap-1.5 px-3 py-2 text-xs pl-8 transition-colors group border-l-2',
                              ch.active ? 'bg-muted border-l-foreground font-medium' : 'border-l-transparent hover:bg-muted/50'
                            )}>
                            <ChIcon className={cn('w-2.5 h-2.5 shrink-0', STATUS_COLORS[ch.status as keyof typeof STATUS_COLORS])} />
                            <span className="flex-1 text-left truncate">{ch.title}</span>
                            <span className="text-muted-foreground/60 shrink-0">{ch.words > 0 ? ch.words : ''}</span>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full gap-1.5 text-xs text-muted-foreground justify-start h-8">
                <Plus className="w-3.5 h-3.5" /> Dodaj element
              </Button>
            </div>
          </div>
        )}

        {/* ── Środkowy panel: edytor ─────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorToolbar wordCount={2400} chapterWordCount={2400} />

          {/* Breadcrumb + statusy */}
          <div className="h-9 border-b flex items-center px-4 gap-2 bg-muted/20 shrink-0">
            {!showStructure && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowStructure(true)}>
                <PanelLeft className="w-3.5 h-3.5" />
              </Button>
            )}
            <span className="text-xs text-muted-foreground">Rozdział · Szkic</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Hash className="w-3 h-3" /> Cel: 3 000 słów
            </span>
            <div className="flex-1" />
            <button onClick={() => setShowSelection(true)}
              className="text-xs text-muted-foreground hover:text-foreground border border-dashed rounded px-2 py-0.5 transition-colors">
              Zaznacz tekst →
            </button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAI(o => !o)} title="Panel AI">
              <Sparkles className={cn('w-4 h-4', showAI ? 'text-foreground' : 'text-muted-foreground')} />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto px-8 py-10">
              {/* Tytuł rozdziału */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground mb-1">ROZDZIAŁ 3</p>
                <h1 className="text-2xl font-bold tracking-tight leading-tight mb-1">
                  Modele językowe jako fundament
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px]">W trakcie</Badge>
                  <span className="text-xs text-muted-foreground">2 400 / 3 000 słów</span>
                  <div className="w-20 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-foreground/30 rounded-full" style={{ width: '80%' }} />
                  </div>
                </div>
              </div>

              {CHAPTER_CONTENT.map((para, i) => (
                <p key={i} className="text-base leading-relaxed mb-4 text-foreground"
                  onMouseUp={() => setShowSelection(true)}>
                  {para}
                </p>
              ))}

              {/* Kursor */}
              <div className="flex items-start gap-3 mt-4">
                <p className="text-base leading-relaxed text-foreground">
                  Praktycznym kryterium wyboru jest tzw. "context window" – maksymalna liczba tokenów,
                </p>
              </div>
              <span className="inline-block w-0.5 h-5 bg-foreground animate-pulse align-middle" />

              <div className="mt-12 pt-6 border-t border-dashed">
                <p className="text-xs text-muted-foreground text-center">
                  Koniec zapisanej treści · Kontynuuj pisanie lub użyj AI
                </p>
              </div>
            </div>
          </ScrollArea>

          {/* Bottom AI bar */}
          <div className="border-t">
            <button
              onClick={() => setShowAI(o => !o)}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted/40 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">AI</span>
              <span className="text-xs text-muted-foreground/60 ml-1">OpenAI GPT-4o</span>
              <ChevronDown className={cn('w-3.5 h-3.5 text-muted-foreground ml-auto transition-transform', showAI && 'rotate-180')} />
            </button>
          </div>
        </div>

        {/* ── Prawy panel: właściwości ──────────────────────────────── */}
        <div className="w-64 border-l flex flex-col shrink-0 bg-background">
          {/* Tab bar */}
          <div className="flex border-b shrink-0">
            {([
              { id: 'chapter', label: 'Rozdział', icon: BookOpen },
              { id: 'book',    label: 'Książka',  icon: FileText },
              { id: 'ai',      label: 'AI',        icon: AI },
              { id: 'settings',label: 'Ustawienia', icon: Settings },
            ] as const).map(tab => {
              const Icon = tab.icon
              return (
                <button key={tab.id} onClick={() => setActiveRightTab(tab.id)}
                  className={cn('flex-1 flex flex-col items-center gap-0.5 py-2.5 text-[10px] border-b-2 transition-colors',
                    activeRightTab === tab.id ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="font-medium hidden sm:block">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {activeRightTab === 'chapter' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Tytuł rozdziału</label>
                    <Input defaultValue="Modele językowe jako fundament" className="text-sm h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Status</label>
                    <select className="w-full text-xs border rounded-md px-2.5 py-2 bg-background">
                      <option>Szkic</option>
                      <option selected>W trakcie</option>
                      <option>Do rewizji</option>
                      <option>Gotowe</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium flex items-center justify-between">
                      Cel słów
                      <span className="font-mono text-muted-foreground">2 400 / 3 000</span>
                    </label>
                    <Input defaultValue="3000" type="number" className="text-sm h-8" />
                  </div>
                  <Separator />
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Notatki prywatne</label>
                    <Textarea
                      defaultValue="Wspomnieć o context window 200k Gemini. Porównać koszty modeli. Dodać przykład z RAG."
                      className="text-xs min-h-24 resize-none"
                      placeholder="Notatki widoczne tylko dla autora..."
                    />
                    <p className="text-[10px] text-muted-foreground">Nie będą eksportowane</p>
                  </div>
                  <Separator />
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Załączniki</label>
                    <Button variant="outline" size="sm" className="w-full gap-2 h-8 text-xs">
                      <Plus className="w-3.5 h-3.5" /> Dodaj załącznik
                    </Button>
                  </div>
                </>
              )}

              {activeRightTab === 'ai' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Instrukcje dla AI</label>
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800">Wpisz dowolne instrukcje dla AI: postacie, świat, styl, zasady...</p>
                    </div>
                    <Textarea
                      className="text-xs min-h-28 resize-none"
                      placeholder="Opisz styl, ton, kontekst swojej książki..."
                      defaultValue="Pisz w stylu przystępnym, ale eksperckim. Audience: doświadczeni marketerzy i product managerowie."
                    />
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      ['Postacie', '0'],
                      ['Miejsca', '0'],
                      ['Rozdziały', '12'],
                      ['Słów', '18 400'],
                    ].map(([label, val]) => (
                      <div key={label} className="bg-muted/30 rounded-lg p-2.5">
                        <p className="text-muted-foreground">{label}</p>
                        <p className="font-semibold mt-0.5">{val}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground">AI widzi te instrukcje + tytuł + aktualny rozdział</p>
                </>
              )}

              {activeRightTab === 'settings' && (
                <>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Czcionka edytora</label>
                      <select className="w-full text-xs border rounded-md px-2.5 py-2 bg-background">
                        <option>Merriweather</option>
                        <option>Geist</option>
                        <option>Lora</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Rozmiar czcionki</label>
                      <Input defaultValue="18" type="number" className="text-sm h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Szerokość edytora</label>
                      <select className="w-full text-xs border rounded-md px-2.5 py-2 bg-background">
                        <option>Wąska (600px)</option>
                        <option selected>Średnia (800px)</option>
                        <option>Szeroka (1000px)</option>
                      </select>
                    </div>
                    {[
                      { label: 'Tryb skupienia', desc: 'Przyciemnia inne akapity' },
                      { label: 'Autozapis', desc: 'Co 30 sekund' },
                      { label: 'Tryb maszyny do pisania', desc: 'Kursor zawsze wyśrodkowany' },
                    ].map(opt => (
                      <div key={opt.label} className="flex items-center justify-between py-1">
                        <div>
                          <p className="text-xs font-medium">{opt.label}</p>
                          <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                        </div>
                        <div className="w-9 h-5 rounded-full bg-muted border relative cursor-pointer">
                          <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background border shadow-sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeRightTab === 'book' && (
                <>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Tytuł książki</label>
                      <Input defaultValue="Strategie Contentowe dla Ekspertów" className="text-sm h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Autor</label>
                      <Input defaultValue="Artur Kamiński" className="text-sm h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium">Cel słów (cała książka)</label>
                      <Input defaultValue="50000" type="number" className="text-sm h-8" />
                    </div>
                    <Separator />
                    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-medium">Postęp</p>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-foreground/30 rounded-full" style={{ width: '28%' }} />
                      </div>
                      <p className="text-[10px] text-muted-foreground">18 400 / 50 000 słów (28%)</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Selection menu overlay */}
      {showSelection && (
        <>
          <div className="fixed inset-0 z-[99]" onClick={() => setShowSelection(false)} />
          <SelectionMenu
            selectedText="Modele językowe stanowią serce współczesnych systemów agentowych. Ich zdolność do rozumienia i generowania tekstu w języku naturalnym sprawia, że mogą pełnić rolę mózgu agenta."
            onClose={() => setShowSelection(false)}
            style={{ top: '220px', left: '35%' }}
          />
        </>
      )}
    </div>
  )
}
