/**
 * Book Editor – przepisany wg feedbacku:
 * - Kolumna nagłówków H1/H2/H3 aktualnego rozdziału (między strukturą a edytorem)
 * - Prawy panel = AI chat (jak w artykule), bez 4 tabów
 * - Ustawienia rozdziału/książki przeniesione do headera (ikona Settings)
 * - Badge "Książka" w headerze
 * - Wyraźna sekcja czatu AI
 */
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
  BookOpen, Eye, ExternalLink, Search, History,
  PanelLeft, Star, X, Save, AlignLeft,
  Heading1, Heading2, Heading3,
} from 'lucide-react'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet'
import { EditorToolbar } from './_Toolbar'
import { AIPanel } from './_AIPanel'
import { SelectionMenu } from './_SelectionMenu'
import { cn } from '@/lib/utils'

// ── Struktura ─────────────────────────────────────────────────────────────────

const STRUCTURE = [
  { id: 'p1', type: 'part', title: 'Część I: Fundamenty', status: 'done', children: [
    { id: 'c1', type: 'chapter', title: 'Wprowadzenie do agentów AI', status: 'done', words: 3200 },
    { id: 'c2', type: 'chapter', title: 'Architektura systemów agentowych', status: 'done', words: 2800 },
    { id: 'c3', type: 'chapter', title: 'Modele językowe jako fundament', status: 'in-progress', words: 2400, active: true },
  ]},
  { id: 'p2', type: 'part', title: 'Część II: Implementacja', status: 'in-progress', children: [
    { id: 'c4', type: 'chapter', title: 'Projektowanie przepływów pracy', status: 'in-progress', words: 1800 },
    { id: 'c5', type: 'chapter', title: 'Integracja z systemami', status: 'draft', words: 600 },
    { id: 'c6', type: 'chapter', title: 'Testowanie agentów', status: 'draft', words: 0 },
  ]},
  { id: 'p3', type: 'part', title: 'Część III: Skalowanie', status: 'draft', children: [
    { id: 'c7', type: 'chapter', title: 'Zarządzanie zespołami agentów', status: 'draft', words: 0 },
    { id: 'c8', type: 'chapter', title: 'Ekonomia wdrożeń AI', status: 'draft', words: 0 },
  ]},
]

// Nagłówki aktualnego rozdziału
const CHAPTER_HEADINGS = [
  { id: 'h1', level: 1, title: 'Modele językowe jako fundament', line: 1 },
  { id: 'h2a', level: 2, title: 'Czym jest model językowy?', line: 4 },
  { id: 'h2b', level: 2, title: 'Function calling i narzędzia', line: 12 },
  { id: 'h3a', level: 3, title: 'Porównanie modeli', line: 16 },
  { id: 'h3b', level: 3, title: 'Koszty i latency', line: 22 },
  { id: 'h2c', level: 2, title: 'Context window', line: 28 },
  { id: 'h2d', level: 2, title: 'Embeddingi i RAG', line: 35 },
]

// Demo treść rozdziału
const PARAGRAPHS = [
  'Modele językowe stanowią serce współczesnych systemów agentowych. Ich zdolność do rozumienia i generowania tekstu w języku naturalnym sprawia, że mogą pełnić rolę „mózgu" agenta – interpretować polecenia, planować działania i komunikować wyniki.',
  'Kluczowym aspektem odróżniającym modele odpowiednie dla systemów agentowych jest zdolność do tzw. function calling – wywoływania zewnętrznych narzędzi i API na podstawie konwersacji. GPT-4o, Claude Sonnet czy Gemini Pro oferują tę funkcjonalność natywnie.',
  'Praktycznym kryterium wyboru jest context window – maksymalna liczba tokenów w jednym wywołaniu. W systemach z długą historią działań lub bogatym kontekstem dokumentów kluczowe są modele z oknem 100k+ tokenów.',
]

const STATUS_ICONS = { done: CheckCircle2, 'in-progress': Timer, draft: Circle }
const STATUS_COLORS = { done: 'text-emerald-500', 'in-progress': 'text-blue-500', draft: 'text-muted-foreground/30' }

function StatusIcon({ status }: { status: string }) {
  const Icon = STATUS_ICONS[status as keyof typeof STATUS_ICONS] || Circle
  return <Icon className={cn('w-2.5 h-2.5 shrink-0', STATUS_COLORS[status as keyof typeof STATUS_COLORS])} />
}

// ── Settings Sheet ────────────────────────────────────────────────────────────

function SettingsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Ustawienia rozdziału i książki">
          <Settings className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80">
        <SheetHeader>
          <SheetTitle>Ustawienia</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          {/* Rozdział */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Rozdział</p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Tytuł</label>
              <Input defaultValue="Modele językowe jako fundament" className="text-sm h-8" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Status</label>
              <select className="w-full text-xs border rounded-md px-2.5 py-2 bg-background">
                <option>Szkic</option>
                <option>W trakcie</option>
                <option>Do rewizji</option>
                <option>Gotowe</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex justify-between">
                Cel słów <span className="font-mono text-muted-foreground">2 400 / 3 000</span>
              </label>
              <Input defaultValue="3000" type="number" className="text-sm h-8" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Notatki prywatne</label>
              <Textarea defaultValue="Wspomnieć o context window 200k Gemini. Porównać koszty modeli." className="text-xs min-h-20 resize-none" />
              <p className="text-[10px] text-muted-foreground">Nie będą eksportowane</p>
            </div>
          </div>
          <Separator />
          {/* Książka */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Książka</p>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Tytuł</label>
              <Input defaultValue="Strategie Contentowe dla Ekspertów" className="text-sm h-8" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Cel słów</label>
              <Input defaultValue="50000" type="number" className="text-sm h-8" />
            </div>
          </div>
          <Separator />
          {/* Edytor */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Edytor</p>
            {[
              { label: 'Tryb skupienia', desc: 'Przyciemnia inne akapity' },
              { label: 'Autozapis', desc: 'Co 30 sekund' },
              { label: 'Tryb maszyny do pisania', desc: 'Kursor zawsze wyśrodkowany' },
            ].map(opt => (
              <div key={opt.label} className="flex items-center justify-between py-0.5">
                <div>
                  <p className="text-xs font-medium">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground">{opt.desc}</p>
                </div>
                <div className="w-9 h-5 rounded-full bg-muted border cursor-pointer relative">
                  <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-background border shadow-sm" />
                </div>
              </div>
            ))}
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Czcionka edytora</label>
              <select className="w-full text-xs border rounded-md px-2.5 py-2 bg-background">
                <option>Merriweather</option><option>Geist</option><option>Lora</option>
              </select>
            </div>
          </div>
          <Button className="w-full gap-2"><Save className="w-4 h-4" /> Zapisz ustawienia</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// ── Główny komponent ──────────────────────────────────────────────────────────

export default function BookEditorScreen() {
  const [expandedParts, setExpandedParts] = React.useState(new Set(['p1', 'p2']))
  const [showAI, setShowAI] = React.useState(true)
  const [showStructure, setShowStructure] = React.useState(true)
  const [showOutline, setShowOutline] = React.useState(true)
  const [showSelection, setShowSelection] = React.useState(false)
  const [activeHeading, setActiveHeading] = React.useState('h2a')

  const togglePart = (id: string) => setExpandedParts(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  const HeadingIcon = { 1: Heading1, 2: Heading2, 3: Heading3 }

  return (
    <div className="flex flex-col h-full bg-background">

      {/* ── App header ─────────────────────────────────────────────── */}
      <div className="h-12 border-b flex items-center px-4 gap-3 shrink-0 bg-white">
        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowLeft className="w-4 h-4" /></Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Badge wszędzie gdzie jest tytuł */}
          <Badge variant="outline" className="text-[10px] border-emerald-200 bg-emerald-50 text-emerald-600 shrink-0">Książka</Badge>
          <span className="text-sm text-muted-foreground truncate hidden sm:block">Strategie Contentowe</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 hidden sm:block" />
          <span className="text-sm font-medium truncate">Modele językowe jako fundament</span>
          <Badge variant="outline" className="text-[10px] ml-1 shrink-0">W trakcie</Badge>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs text-muted-foreground hidden md:flex items-center gap-1">
            <Clock className="w-3 h-3" /> Autozapis
          </span>
          <Separator orientation="vertical" className="h-5 mx-1 hidden md:block" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><Search className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><History className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Star className="w-4 h-4" /></Button>
          <SettingsSheet />
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

        {/* ── Kolumna 1: Drzewo struktury (części/rozdziały) ──────── */}
        {showStructure && (
          <div className="w-52 border-r flex flex-col shrink-0 bg-background">
            <div className="h-10 border-b flex items-center justify-between px-3 shrink-0">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Struktura</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowStructure(false)}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
            {/* Progress */}
            <div className="px-3 py-2 border-b">
              <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
                <span>18 400 słów</span><span>50 000 cel</span>
              </div>
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-foreground/25 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="py-1.5">
                {STRUCTURE.map(part => (
                  <div key={part.id}>
                    <button onClick={() => togglePart(part.id)}
                      className="w-full flex items-center gap-1.5 px-3 py-2 text-xs hover:bg-muted/50 transition-colors">
                      {expandedParts.has(part.id)
                        ? <ChevronDown className="w-3 h-3 text-muted-foreground shrink-0" />
                        : <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />}
                      <StatusIcon status={part.status} />
                      <span className="flex-1 text-left font-medium truncate text-muted-foreground text-[11px]">{part.title}</span>
                    </button>
                    {expandedParts.has(part.id) && (part as any).children?.map((ch: any) => (
                      <button key={ch.id}
                        className={cn(
                          'w-full flex items-center gap-1.5 px-3 py-1.5 text-[11px] pl-8 transition-colors border-l-2 mx-0',
                          (ch as any).active
                            ? 'bg-muted border-l-foreground font-medium text-foreground'
                            : 'border-l-transparent hover:bg-muted/40 text-muted-foreground'
                        )}>
                        <StatusIcon status={ch.status} />
                        <span className="flex-1 text-left truncate">{ch.title}</span>
                        {ch.words > 0 && <span className="text-muted-foreground/50 shrink-0 tabular-nums">{ch.words}</span>}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* ── Kolumna 2: Nagłówki rozdziału (mini outline) ─────────── */}
        {showOutline && (
          <div className="w-44 border-r flex flex-col shrink-0 bg-background">
            <div className="h-10 border-b flex items-center justify-between px-3 shrink-0">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Rozdział</span>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowOutline(false)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="py-2 px-2 space-y-0.5">
                {CHAPTER_HEADINGS.map(h => {
                  const Icon = HeadingIcon[h.level as 1|2|3]
                  return (
                    <button key={h.id}
                      onClick={() => setActiveHeading(h.id)}
                      className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors',
                        h.level === 1 && 'pl-2',
                        h.level === 2 && 'pl-4',
                        h.level === 3 && 'pl-6',
                        activeHeading === h.id
                          ? 'bg-muted text-foreground font-medium'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                      )}>
                      <Icon className={cn('shrink-0',
                        h.level === 1 ? 'w-3.5 h-3.5' : h.level === 2 ? 'w-3 h-3' : 'w-2.5 h-2.5'
                      )} />
                      <span className={cn('truncate leading-tight',
                        h.level === 1 ? 'text-[11px] font-semibold' : h.level === 2 ? 'text-[11px]' : 'text-[10px]'
                      )}>{h.title}</span>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* ── Kolumna 3: Edytor treści ────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <EditorToolbar wordCount={2400} chapterWordCount={2400} />

          {/* Sub-toolbar */}
          <div className="h-9 border-b flex items-center px-4 gap-2 bg-muted/20 shrink-0">
            {!showStructure && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowStructure(true)} title="Pokaż strukturę">
                <PanelLeft className="w-3.5 h-3.5" />
              </Button>
            )}
            {!showOutline && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowOutline(true)} title="Pokaż nagłówki rozdziału">
                <AlignLeft className="w-3.5 h-3.5" />
              </Button>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Hash className="w-3 h-3" /> 2 400 / 3 000 słów
            </span>
            <div className="flex-1" />
            <button onClick={() => setShowSelection(true)}
              className="text-xs text-muted-foreground hover:text-foreground border border-dashed rounded px-2 py-0.5 transition-colors">
              Zaznacz tekst →
            </button>
            <Button variant="ghost" size="icon" className="h-7 w-7"
              onClick={() => setShowAI(o => !o)} title="Panel AI">
              <Sparkles className={cn('w-4 h-4', showAI ? 'text-foreground' : 'text-muted-foreground')} />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto px-8 py-10">
              <div className="mb-6">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Rozdział 3</p>
                <h1 className="text-2xl font-bold tracking-tight leading-tight">Modele językowe jako fundament</h1>
              </div>

              <h2 className="text-lg font-semibold mt-6 mb-3">Czym jest model językowy?</h2>
              <p className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                {PARAGRAPHS[0]}
              </p>

              <h2 className="text-lg font-semibold mt-6 mb-3">Function calling i narzędzia</h2>
              <p className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                {PARAGRAPHS[1]}
              </p>

              <h3 className="text-base font-semibold mt-4 mb-2 text-muted-foreground">Porównanie modeli</h3>
              <p className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                {PARAGRAPHS[2]}
              </p>

              <h3 className="text-base font-semibold mt-4 mb-2 text-muted-foreground">Koszty i latency</h3>
              <p className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                Warto podkreślić, że wybór modelu powinien być podyktowany nie tylko możliwościami, ale też latency i kosztami. W systemach agentowych różnice te kumulują się znacząco.
              </p>

              <h2 className="text-lg font-semibold mt-6 mb-3">Context window</h2>
              <p className="text-base leading-relaxed mb-4">
                Praktycznym kryterium wyboru jest context window. W systemach z długą historią działań kluczowe są modele z oknem 100k+ tokenów.
              </p>

              {/* Kursor */}
              <p className="text-base leading-relaxed text-muted-foreground/60">
                Kontynuuj pisanie...
              </p>
              <span className="inline-block w-0.5 h-5 bg-foreground/40 animate-pulse align-middle ml-0.5" />

              <div className="mt-12 pt-6 border-t border-dashed text-center">
                <p className="text-xs text-muted-foreground">Koniec zapisanej treści</p>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* ── Kolumna 4: AI Panel ─────────────────────────────────── */}
        {showAI ? (
          <AIPanel
            className="w-72 shrink-0"
            onClose={() => setShowAI(false)}
            contextTitle="Modele językowe jako fundament"
          />
        ) : (
          <button onClick={() => setShowAI(true)}
            className="w-9 border-l flex flex-col items-center justify-center gap-1 hover:bg-muted/40 transition-colors shrink-0">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
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
            style={{ top: '240px', left: '42%' }}
          />
        </>
      )}
    </div>
  )
}
