import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  ArrowLeft, ChevronDown, ChevronRight, Plus, Sparkles,
  Clock, Hash, CheckCircle2, Timer, Circle, Settings,
  Eye, ExternalLink, Search, History, PanelLeft, Star,
  Save, AlignLeft, Heading1, Heading2, Heading3, X,
  Maximize2, Minimize2,
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { EditorToolbar } from './_Toolbar'
import { AIPanel } from './_AIPanel'
import { SelectionMenu } from './_SelectionMenu'
import { cn } from '@/lib/utils'

// ── Dane ──────────────────────────────────────────────────────────────────────

const STRUCTURE = [
  { id: 'p1', status: 'done', title: 'Część I: Fundamenty', children: [
    { id: 'c1', title: 'Wprowadzenie do agentów AI', status: 'done', words: 3200 },
    { id: 'c2', title: 'Architektura systemów agentowych', status: 'done', words: 2800 },
    { id: 'c3', title: 'Modele językowe jako fundament', status: 'in-progress', words: 2400, active: true },
  ]},
  { id: 'p2', status: 'in-progress', title: 'Część II: Implementacja', children: [
    { id: 'c4', title: 'Projektowanie przepływów pracy', status: 'in-progress', words: 1800 },
    { id: 'c5', title: 'Integracja z istniejącymi systemami', status: 'draft', words: 600 },
    { id: 'c6', title: 'Testowanie i walidacja agentów', status: 'draft', words: 0 },
  ]},
  { id: 'p3', status: 'draft', title: 'Część III: Skalowanie', children: [
    { id: 'c7', title: 'Zarządzanie zespołami agentów', status: 'draft', words: 0 },
    { id: 'c8', title: 'Ekonomia wdrożeń AI', status: 'draft', words: 0 },
  ]},
]

const HEADINGS = [
  { id: 'h1',  level: 1, title: 'Modele językowe jako fundament' },
  { id: 'h2a', level: 2, title: 'Czym jest model językowy?' },
  { id: 'h2b', level: 2, title: 'Function calling i narzędzia' },
  { id: 'h3a', level: 3, title: 'Porównanie modeli' },
  { id: 'h3b', level: 3, title: 'Koszty i latency' },
  { id: 'h2c', level: 2, title: 'Context window' },
  { id: 'h2d', level: 2, title: 'Embeddingi i RAG' },
]

const SI: Record<string, React.ComponentType<{className?:string}>> = {
  done: CheckCircle2, 'in-progress': Timer, draft: Circle,
}
const SC: Record<string, string> = {
  done: 'text-emerald-500', 'in-progress': 'text-blue-500', draft: 'text-foreground/30',
}

// ── Settings Sheet ─────────────────────────────────────────────────────────────

function SettingsSheet() {
  const [tab, setTab] = React.useState<'chapter'|'book'|'editor'>('chapter')
  const TABS = [
    { id: 'chapter' as const, label: 'Rozdział' },
    { id: 'book'    as const, label: 'Książka' },
    { id: 'editor'  as const, label: 'Edytor' },
  ]
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Ustawienia">
          <Settings className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 flex flex-col p-0">
        <SheetHeader className="px-5 pt-5 pb-0 shrink-0">
          <SheetTitle>Ustawienia</SheetTitle>
        </SheetHeader>
        <div className="flex border-b px-5 mt-4 shrink-0 gap-5">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn('pb-2.5 text-sm border-b-2 transition-colors',
                tab === t.id ? 'border-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground')}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {tab === 'chapter' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Tytuł rozdziału</label>
                <Input defaultValue="Modele językowe jako fundament" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Status</label>
                <select className="w-full text-sm border rounded-md px-3 py-2 bg-background">
                  <option>Szkic</option><option>W trakcie</option><option>Do rewizji</option><option>Gotowe</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium flex justify-between">
                  Cel słów <span className="font-mono text-muted-foreground text-xs">2 400 / 3 000</span>
                </label>
                <Input defaultValue="3000" type="number" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Notatki prywatne</label>
                <Textarea defaultValue="Wspomnieć o context window 200k Gemini. Porównać koszty modeli." className="text-sm min-h-24 resize-none" />
                <p className="text-[10px] text-muted-foreground">Nie będą eksportowane</p>
              </div>
              <Button variant="outline" size="sm" className="w-full gap-2 h-9">
                <Plus className="w-3.5 h-3.5" /> Dodaj załącznik
              </Button>
            </>
          )}
          {tab === 'book' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Tytuł książki</label>
                <Input defaultValue="Strategie Contentowe dla Ekspertów" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Autor</label>
                <Input defaultValue="Artur Kamiński" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Cel słów</label>
                <Input defaultValue="50000" type="number" className="h-9" />
              </div>
              <div className="bg-muted/40 rounded-lg p-3 space-y-2">
                <p className="text-xs font-medium">Postęp</p>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-foreground/30 rounded-full" style={{ width: '28%' }} />
                </div>
                <p className="text-[10px] text-muted-foreground">18 400 / 50 000 słów · 28%</p>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Instrukcje AI dla całej książki</label>
                <Textarea defaultValue="Pisz w stylu przystępnym, ale eksperckim. Audience: doświadczeni marketerzy." className="text-sm min-h-24 resize-none" />
                <p className="text-[10px] text-muted-foreground">Dodawane do każdego zapytania AI</p>
              </div>
            </>
          )}
          {tab === 'editor' && (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Czcionka edytora</label>
                <select className="w-full text-sm border rounded-md px-3 py-2 bg-background">
                  <option>Merriweather</option><option>Geist</option><option>Lora</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Rozmiar czcionki</label>
                <Input defaultValue="18" type="number" className="h-9" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Szerokość edytora</label>
                <select className="w-full text-sm border rounded-md px-3 py-2 bg-background">
                  <option>Wąska (600px)</option><option>Średnia (800px)</option><option>Szeroka (1000px)</option>
                </select>
              </div>
              <Separator />
              {[
                { label: 'Tryb skupienia', desc: 'Przyciemnia inne akapity' },
                { label: 'Autozapis', desc: 'Co 30 sekund' },
                { label: 'Tryb maszyny do pisania', desc: 'Kursor zawsze wyśrodkowany' },
                { label: 'Licznik znaków', desc: 'Obok licznika słów' },
              ].map(opt => (
                <div key={opt.label} className="flex items-center justify-between py-0.5">
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                  <div className="w-10 h-5 rounded-full bg-muted border cursor-pointer relative shrink-0">
                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background border shadow-sm" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="px-5 py-4 border-t shrink-0">
          <Button className="w-full gap-2 h-9"><Save className="w-4 h-4" /> Zapisz</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Główny komponent ──────────────────────────────────────────────────────────

export default function BookEditorScreen() {
  const [expanded, setExpanded] = React.useState(new Set(['p1', 'p2']))
  const [showAI, setShowAI] = React.useState(true)
  const [showStructure, setShowStructure] = React.useState(true)
  const [showOutline, setShowOutline] = React.useState(true)
  const [showSelection, setShowSelection] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [activeH, setActiveH] = React.useState('h2a')

  const toggle = (id: string) => setExpanded(p => {
    const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  const HIcon: Record<number, React.ComponentType<{className?:string}>> = {
    1: Heading1, 2: Heading2, 3: Heading3,
  }

  // W trybie pełnoekranowym owijamy cały widok fixed overlay
  const wrapClass = fullscreen
    ? 'fixed inset-0 z-50 flex flex-col bg-background'
    : 'flex flex-col h-full bg-background'

  return (
    <div className={wrapClass}>

      {/* Header – h-14, wyrównany ze wszystkimi kolumnami */}
      <div className="h-14 border-b flex items-center px-4 gap-3 shrink-0 bg-white">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant="outline" className="text-[10px] border-emerald-200 bg-emerald-50 text-emerald-600 shrink-0">
            Książka
          </Badge>
          <span className="text-sm text-muted-foreground truncate hidden lg:block">Strategie Contentowe</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 hidden lg:block" />
          <span className="text-sm font-medium truncate">Modele językowe jako fundament</span>
          <Badge variant="outline" className="text-[10px] ml-1 shrink-0">W trakcie</Badge>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs text-muted-foreground hidden xl:flex items-center gap-1">
            <Clock className="w-3 h-3" /> Autozapis
          </span>
          <Separator orientation="vertical" className="h-5 mx-1 hidden xl:block" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><Search className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><History className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Star className="w-4 h-4" /></Button>
          <SettingsSheet />
          <Separator orientation="vertical" className="h-5 mx-1" />
          <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm hidden sm:flex">
            <Eye className="w-4 h-4" /> Podgląd
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"
            onClick={() => setFullscreen(f => !f)}
            title={fullscreen ? 'Wyjdź z pełnego ekranu' : 'Pełny ekran'}>
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button size="sm" className="h-8 gap-1.5 text-sm">
            <ExternalLink className="w-4 h-4" /> Eksportuj
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Kolumna 1: Struktura – h-14 header, text-xs */}
        {showStructure && !fullscreen && (
          <div className="w-64 border-r flex flex-col shrink-0 bg-background">
            {/* h-14 – wyrównane z app header i AI panelem */}
            <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
              <span className="text-xs font-semibold text-foreground/55 uppercase tracking-wider">Struktura</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowStructure(false)}>
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
            <div className="px-4 py-2.5 border-b">
              <div className="flex justify-between text-xs text-foreground/60 mb-1.5">
                <span>18 400 słów</span><span>50 000 cel</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-foreground/25 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="py-2">
                {STRUCTURE.map(part => {
                  const PIcon = SI[part.status] || Circle
                  return (
                    <div key={part.id}>
                      <button onClick={() => toggle(part.id)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs hover:bg-muted/50 transition-colors">
                        {expanded.has(part.id)
                          ? <ChevronDown className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
                          : <ChevronRight className="w-3.5 h-3.5 text-foreground/40 shrink-0" />}
                        <PIcon className={cn('w-3 h-3 shrink-0', SC[part.status])} />
                        <span className="flex-1 text-left font-semibold text-foreground/75 text-xs leading-snug">
                          {part.title}
                        </span>
                      </button>
                      {expanded.has(part.id) && (part as any).children?.map((ch: any) => {
                        const CIcon = SI[ch.status] || Circle
                        return (
                          <button key={ch.id}
                            className={cn(
                              'w-full flex items-center gap-2 px-4 py-2 pl-9 text-xs transition-colors border-l-2 border-l-transparent',
                              (ch as any).active
                                ? 'bg-muted !border-l-foreground font-medium text-foreground'
                                : 'hover:bg-muted/40 text-foreground/65'
                            )}>
                            <CIcon className={cn('w-2.5 h-2.5 shrink-0', SC[ch.status])} />
                            <span className="flex-1 text-left line-clamp-2 leading-snug">{ch.title}</span>
                            {ch.words > 0 && (
                              <span className="text-muted-foreground shrink-0 tabular-nums text-xs ml-1">
                                {ch.words.toLocaleString()}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Kolumna 2: Nagłówki rozdziału – h-14, text-xs */}
        {showOutline && !fullscreen && (
          <div className="w-52 border-r flex flex-col shrink-0 bg-background">
            <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
              <span className="text-xs font-semibold text-foreground/55 uppercase tracking-wider">Rozdział</span>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowOutline(false)}>
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="py-3 px-2 space-y-0.5">
                {HEADINGS.map(h => {
                  const Icon = HIcon[h.level]
                  return (
                    <button key={h.id} onClick={() => setActiveH(h.id)}
                      className={cn(
                        'w-full flex items-start gap-2 px-2 py-2 rounded-md text-left transition-colors',
                        h.level === 1 ? 'pl-2' : h.level === 2 ? 'pl-4' : 'pl-7',
                        activeH === h.id
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      )}>
                      <Icon className={cn('shrink-0 mt-0.5',
                        h.level === 1 ? 'w-3.5 h-3.5' : 'w-3 h-3'
                      )} />
                      <span className={cn('leading-snug text-xs')}>{h.title}</span>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Kolumna 3: Edytor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <EditorToolbar wordCount={2400} chapterWordCount={2400} />

          {/* Sub-toolbar */}
          <div className="h-9 border-b flex items-center px-4 gap-2 bg-muted/20 shrink-0">
            {(!showStructure || fullscreen) && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setShowStructure(true); setFullscreen(false) }}>
                <PanelLeft className="w-3.5 h-3.5" />
              </Button>
            )}
            {(!showOutline || fullscreen) && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setShowOutline(true); setFullscreen(false) }}>
                <AlignLeft className="w-3.5 h-3.5" />
              </Button>
            )}
            <span className="text-xs text-foreground/60 flex items-center gap-1.5">
              <Hash className="w-3 h-3" /> 2 400 / 3 000 słów
            </span>
            <div className="flex-1" />
            <button onClick={() => setShowSelection(true)}
              className="text-xs text-muted-foreground hover:text-foreground border border-dashed rounded px-2 py-0.5 transition-colors">
              Zaznacz →
            </button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAI(o => !o)}>
              <Sparkles className={cn('w-4 h-4', showAI ? 'text-foreground' : 'text-muted-foreground')} />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto px-8 py-10">
              <div className="mb-6">
                <p className="text-xs text-foreground/55 uppercase tracking-widest mb-1">Rozdział 3</p>
                <h1 className="text-2xl font-bold tracking-tight leading-tight">Modele językowe jako fundament</h1>
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-3">Czym jest model językowy?</h2>
              <p className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                Modele językowe stanowią serce współczesnych systemów agentowych. Ich zdolność do rozumienia i generowania tekstu w języku naturalnym sprawia, że mogą pełnić rolę „mózgu" agenta – interpretować polecenia, planować działania i komunikować wyniki.
              </p>

              <h2 className="text-lg font-semibold mt-6 mb-3">Function calling i narzędzia</h2>
              <p className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                Kluczowym aspektem odróżniającym modele odpowiednie dla systemów agentowych jest zdolność do tzw. function calling – wywoływania zewnętrznych narzędzi i API na podstawie konwersacji.
              </p>

              <h3 className="text-base font-semibold mt-4 mb-2 text-muted-foreground">Porównanie modeli</h3>
              <p className="text-base leading-relaxed mb-4">
                Praktycznym kryterium wyboru jest context window – maksymalna liczba tokenów w jednym wywołaniu. Dla systemów z długą historią działań kluczowe są modele z oknem 100k+ tokenów.
              </p>

              <h3 className="text-base font-semibold mt-4 mb-2 text-muted-foreground">Koszty i latency</h3>
              <p className="text-base leading-relaxed mb-4">
                Wybór modelu powinien być podyktowany nie tylko możliwościami, ale też latency i kosztami. W systemach agentowych różnice te kumulują się znacząco.
              </p>

              <h2 className="text-lg font-semibold mt-6 mb-3">Context window</h2>
              <p className="text-base leading-relaxed mb-4">
                Okno kontekstu determinuje ile informacji model może uwzględnić jednocześnie. Dla systemów agentowych minimalna wartość to 32k tokenów.
              </p>

              <p className="text-base text-muted-foreground/50 mt-6">Kontynuuj pisanie...</p>
              <span className="inline-block w-0.5 h-5 bg-foreground/40 animate-pulse align-middle ml-0.5" />

              <div className="mt-12 pt-6 border-t border-dashed text-center">
                <p className="text-xs text-muted-foreground">Koniec zapisanej treści</p>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Kolumna 4: AI Panel */}
        {showAI ? (
          <AIPanel
            className="w-72 shrink-0"
            onClose={() => setShowAI(false)}
            contextTitle="Modele językowe jako fundament"
          />
        ) : (
          <button onClick={() => setShowAI(true)}
            className="w-9 border-l flex flex-col items-center justify-center gap-1 hover:bg-muted/40 transition-colors shrink-0">
            <Sparkles className="w-4 h-4 text-foreground/50" />
          </button>
        )}
      </div>

      {/* Selection menu */}
      {showSelection && (
        <>
          <div className="fixed inset-0 z-[99]" onClick={() => setShowSelection(false)} />
          <SelectionMenu
            selectedText="Modele językowe stanowią serce współczesnych systemów agentowych – interpretować polecenia, planować działania i komunikować wyniki."
            onClose={() => setShowSelection(false)}
            style={{ top: '240px', left: '38%' }}
          />
        </>
      )}
    </div>
  )
}
