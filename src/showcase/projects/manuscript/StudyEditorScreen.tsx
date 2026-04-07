/**
 * Study Editor – edytor opracowania.
 * Sekcje bez hierarchii (nie Część→Rozdział). Pomiędzy artykułem a książką.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft, Plus, Sparkles, Clock, Hash, Eye, ExternalLink,
  Search, History, Star, Settings, GripVertical, MoreHorizontal,
  ChevronRight, CheckCircle2, Timer, Circle, AlignLeft,
  Maximize2, Trash2,
} from 'lucide-react'
import { EditorToolbar } from './_Toolbar'
import { AIPanel } from './_AIPanel'
import { SelectionMenu } from './_SelectionMenu'
import { cn } from '@/lib/utils'

// ── Dane ──────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 's0', title: 'Streszczenie wykonawcze', status: 'done',        words: 420,  active: false },
  { id: 's1', title: 'Metodologia badania',     status: 'done',        words: 680,  active: false },
  { id: 's2', title: 'Rynek AI w Polsce 2025',  status: 'in-progress', words: 1240, active: true  },
  { id: 's3', title: 'E-commerce i AI',         status: 'in-progress', words: 880,  active: false },
  { id: 's4', title: 'Automatyzacja procesów',  status: 'draft',       words: 320,  active: false },
  { id: 's5', title: 'Bariery wdrożenia',       status: 'draft',       words: 0,    active: false },
  { id: 's6', title: 'Rekomendacje',            status: 'draft',       words: 0,    active: false },
  { id: 's7', title: 'Wnioski',                 status: 'draft',       words: 0,    active: false },
]

const SI: Record<string, React.ComponentType<{className?:string}>> = {
  done: CheckCircle2, 'in-progress': Timer, draft: Circle,
}
const SC: Record<string, string> = {
  done: 'text-emerald-500', 'in-progress': 'text-blue-500', draft: 'text-foreground/30',
}

const ACTIVE_CONTENT = [
  'Polski rynek rozwiązań AI w e-commerce dynamicznie rośnie – według naszego badania, 68% badanych sklepów internetowych wdrożyło przynajmniej jedno narzędzie AI w 2024 roku, co oznacza wzrost o 34 punkty procentowe względem roku poprzedniego.',
  'Najchętniej wdrażane są systemy rekomendacji produktowych (82% wskazań wśród firm używających AI), chatboty obsługi klienta (61%) oraz narzędzia do personalizacji komunikacji marketingowej (54%).',
  'Warto podkreślić, że małe i średnie sklepy internetowe (do 50 pracowników) wyraźnie przyspieszyły adopcję AI w ciągu ostatnich 12 miesięcy – segment ten zanotował najwyższy wzrost procentowy ze wszystkich badanych grup.',
]

export default function StudyEditorScreen() {
  const [showAI, setShowAI] = React.useState(true)
  const [showSections, setShowSections] = React.useState(true)
  const [showSelection, setShowSelection] = React.useState(false)
  const [fullscreen, setFullscreen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('s2')

  const totalWords = SECTIONS.reduce((n, s) => n + s.words, 0)
  const doneCount = SECTIONS.filter(s => s.status === 'done').length

  return (
    <div className={fullscreen ? 'fixed inset-0 z-50 flex flex-col bg-background' : 'flex flex-col h-full bg-background'}>

      {/* Header */}
      <div className="h-14 border-b flex items-center px-4 gap-3 shrink-0 bg-white">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Badge variant="outline" className="text-[10px] border-violet-200 bg-violet-50 text-violet-600 shrink-0">
            Opracowanie
          </Badge>
          <span className="text-sm font-medium truncate">Raport: AI w polskim e-commerce 2025</span>
          <Badge variant="outline" className="text-[10px] ml-1 shrink-0">W trakcie</Badge>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-xs text-foreground/60 hidden lg:flex items-center gap-1">
            <Clock className="w-3 h-3" /> Autozapis
          </span>
          <Separator orientation="vertical" className="h-5 mx-1 hidden lg:block" />
          <Button variant="ghost" size="icon" className="h-8 w-8"><Search className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><History className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Star className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setFullscreen(f => !f)}>
            <Maximize2 className="w-4 h-4" />
          </Button>
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

        {/* Lewy panel: lista sekcji */}
        {showSections && !fullscreen && (
          <div className="w-64 border-r flex flex-col shrink-0 bg-background">
            <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
              <div>
                <p className="text-xs font-semibold text-foreground/55 uppercase tracking-wider">Sekcje</p>
                <p className="text-[10px] text-foreground/50 mt-0.5">
                  {doneCount}/{SECTIONS.length} gotowych · {totalWords.toLocaleString()} słów
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Pasek postępu */}
            <div className="px-4 py-2.5 border-b">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-foreground/25 rounded-full" style={{ width: `${Math.round(totalWords / 10000 * 100)}%` }} />
              </div>
              <div className="flex justify-between text-[10px] text-foreground/50 mt-1">
                <span>{totalWords.toLocaleString()} słów</span><span>10 000 cel</span>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="py-2 space-y-0.5">
                {SECTIONS.map((s, i) => {
                  const SIcon = SI[s.status] || Circle
                  return (
                    <button key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors border-l-2 group',
                        activeSection === s.id
                          ? 'bg-muted border-l-foreground font-medium text-foreground'
                          : 'border-l-transparent hover:bg-muted/40 text-foreground/65'
                      )}>
                      <SIcon className={cn('w-3 h-3 shrink-0', SC[s.status])} />
                      <span className="flex-1 text-left leading-snug text-xs">{s.title}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        {s.words > 0 && (
                          <span className="text-[10px] text-foreground/45 tabular-nums">{s.words}</span>
                        )}
                        <GripVertical className="w-3 h-3 text-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </ScrollArea>

            {/* Spis treści auto */}
            <div className="p-3 border-t">
              <button className="w-full flex items-center gap-2 text-xs text-foreground/55 hover:text-foreground transition-colors px-2 py-1.5 rounded-lg hover:bg-muted">
                <AlignLeft className="w-3.5 h-3.5" />
                Podgląd spisu treści
              </button>
            </div>
          </div>
        )}

        {/* Edytor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <EditorToolbar wordCount={totalWords} chapterWordCount={1240} />

          <div className="h-9 border-b flex items-center px-4 gap-2 bg-muted/20 shrink-0">
            {(!showSections || fullscreen) && (
              <Button variant="ghost" size="icon" className="h-7 w-7"
                onClick={() => { setShowSections(true); setFullscreen(false) }}>
                <AlignLeft className="w-3.5 h-3.5" />
              </Button>
            )}
            <span className="text-xs text-foreground/60">
              Sekcja {SECTIONS.findIndex(s => s.id === activeSection) + 1} z {SECTIONS.length}
            </span>
            <ChevronRight className="w-3 h-3 text-foreground/30" />
            <span className="text-xs font-medium text-foreground/70 truncate">
              {SECTIONS.find(s => s.id === activeSection)?.title}
            </span>
            <div className="flex-1" />
            <button onClick={() => setShowSelection(true)}
              className="text-xs text-foreground/55 hover:text-foreground border border-dashed rounded px-2 py-0.5 transition-colors">
              Zaznacz →
            </button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAI(o => !o)}>
              <Sparkles className={cn('w-4 h-4', showAI ? 'text-foreground' : 'text-foreground/40')} />
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-2xl mx-auto px-8 py-10">
              <div className="mb-8">
                <p className="text-[10px] text-foreground/50 uppercase tracking-widest mb-1.5">
                  Sekcja 3
                </p>
                <h2 className="text-2xl font-bold leading-tight tracking-tight">
                  Rynek AI w Polsce 2025
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-[10px]">W trakcie</Badge>
                  <span className="text-xs text-foreground/55">1 240 słów</span>
                </div>
              </div>

              {ACTIVE_CONTENT.map((para, i) => (
                <p key={i} className="text-base leading-relaxed mb-4" onMouseUp={() => setShowSelection(true)}>
                  {para}
                </p>
              ))}

              {/* Blok danych / wykres placeholder */}
              <div className="my-6 rounded-xl border bg-muted/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-medium text-foreground/65">Dane do wykresu</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[['68%', 'Firm używa AI'], ['82%', 'Rekomendacje'], ['34pp', 'Wzrost YoY']].map(([val, label]) => (
                    <div key={label} className="text-center">
                      <p className="text-2xl font-bold tracking-tight">{val}</p>
                      <p className="text-xs text-foreground/55 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-base text-foreground/40 mt-6">Kontynuuj pisanie...</p>
              <span className="inline-block w-0.5 h-5 bg-foreground/30 animate-pulse align-middle ml-0.5" />
            </div>
          </ScrollArea>
        </div>

        {/* AI Panel */}
        {showAI ? (
          <AIPanel
            className="w-80 shrink-0"
            onClose={() => setShowAI(false)}
            contextTitle="Rynek AI w Polsce 2025"
            contextType="article"
          />
        ) : (
          <button onClick={() => setShowAI(true)}
            className="w-9 border-l flex flex-col items-center justify-center hover:bg-muted/40 transition-colors shrink-0">
            <Sparkles className="w-4 h-4 text-foreground/40" />
          </button>
        )}
      </div>

      {showSelection && (
        <>
          <div className="fixed inset-0 z-[99]" onClick={() => setShowSelection(false)} />
          <SelectionMenu
            selectedText="Polski rynek rozwiązań AI w e-commerce dynamicznie rośnie – 68% badanych sklepów wdrożyło przynajmniej jedno narzędzie AI w 2024 roku."
            onClose={() => setShowSelection(false)}
            style={{ top: '260px', left: '40%' }}
          />
        </>
      )}
    </div>
  )
}
