import * as React from 'react'
import { CP2Sidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Plus, FolderPlus, Search, Star, ChevronDown, ChevronRight,
  FileText, FolderClosed, Trash2, Copy, Download, Wand2, Sparkles,
  Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter,
  Quote, Minus, Link2, Undo2, Redo2, PanelLeft, X, Clock, Hash,
  Send, RotateCcw, ArrowDown, Check, PenLine, Shrink, Expand,
  Languages, Palette, MessageSquare,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Inline AI popup ───────────────────────────────────────────────────────────
// Wzorce: Notion AI, Craft.do, Linear
// Zasady: input dominuje, akcje jako jedna linia, wynik bez ozdobników

const QUICK_ACTIONS = ['Przepisz', 'Skróć', 'Rozwiń', 'Formalniej', 'Swobodniej', 'Na angielski', 'Kontynuuj']

const RESULT_TEXT = 'Tworzenie skutecznego zespołu agentów AI wymaga precyzyjnego zdefiniowania ról i odpowiedzialności każdego z nich – zanim uruchomisz pierwszy model, musisz wiedzieć, kto odpowiada za co.'

function AIInlinePopup({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = React.useState<'input' | 'loading' | 'result'>('input')
  const [custom, setCustom] = React.useState('')
  const [label, setLabel] = React.useState('')
  const inputRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => { inputRef.current?.focus() }, [])

  const run = (actionLabel: string) => {
    setLabel(actionLabel)
    setPhase('loading')
    setTimeout(() => setPhase('result'), 1500)
  }

  return (
    <div
      className="absolute z-30 w-[360px] bg-background rounded-xl shadow-xl border border-border/80 flex flex-col overflow-hidden"
      style={{ top: '185px', left: '50%', transform: 'translateX(-28%)' }}
    >
      {/* ── INPUT ── */}
      {phase === 'input' && (
        <>
          {/* Pole input – bez obramowania, dominuje */}
          <div className="flex items-start gap-2.5 px-3.5 pt-3 pb-1">
            <Sparkles className="w-4 h-4 text-muted-foreground shrink-0 mt-2.5" />
            <textarea
              ref={inputRef}
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Escape') onClose()
                if (e.key === 'Enter' && !e.shiftKey && custom.trim()) {
                  e.preventDefault(); run(custom.trim())
                }
              }}
              placeholder="Co zrobić z zaznaczonym tekstem?"
              rows={2}
              className="flex-1 text-sm outline-none bg-transparent resize-none placeholder:text-muted-foreground/50 leading-relaxed py-2"
            />
            {custom.trim() && (
              <button
                onClick={() => run(custom.trim())}
                className="shrink-0 mt-1.5 w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Separator + quick actions – jedna linia, scrollowalna */}
          <div className="border-t mx-3 mb-1" />
          <div className="px-3 pb-3 pt-2 flex items-center gap-0 overflow-x-auto scrollbar-none">
            {QUICK_ACTIONS.map((a, i) => (
              <React.Fragment key={a}>
                {i > 0 && <span className="text-border select-none px-0.5 shrink-0">·</span>}
                <button
                  onClick={() => run(a)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0 px-1 py-0.5 rounded hover:bg-muted"
                >
                  {a}
                </button>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {/* ── LOADING ── */}
      {phase === 'loading' && (
        <div className="px-4 py-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1">
                {[0, 120, 240].map(d => (
                  <span key={d}
                    className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: `${d}ms`, animationDuration: '700ms' }}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{label}...</span>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Skeleton */}
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-muted rounded-full w-full" />
            <div className="h-3 bg-muted/70 rounded-full w-[88%]" />
            <div className="h-3 bg-muted/50 rounded-full w-[72%]" />
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {phase === 'result' && (
        <>
          {/* Wynik – czyste tło, bez boksów z nagłówkami */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground font-medium">{label}</span>
              <div className="flex-1" />
              <button onClick={() => run(label)} className="text-muted-foreground hover:text-foreground transition-colors" title="Generuj ponownie">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => { navigator.clipboard?.writeText(RESULT_TEXT) }} className="text-muted-foreground hover:text-foreground transition-colors" title="Kopiuj">
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors ml-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Propozycja – subtelne zielone tło, bez nagłówka "Propozycja AI" */}
            <p className="text-sm leading-relaxed bg-emerald-50 text-foreground px-3 py-2.5 rounded-lg border border-emerald-100">
              {RESULT_TEXT}
            </p>
          </div>

          {/* CTA – pełna szerokość primary, ghost secondary */}
          <div className="px-3 pb-3 space-y-1.5">
            <Button className="w-full h-9 gap-2" onClick={onClose}>
              <Check className="w-4 h-4" /> Zamień zaznaczony tekst
            </Button>
            <div className="flex gap-1.5">
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs gap-1.5" onClick={onClose}>
                <ArrowDown className="w-3.5 h-3.5" /> Wstaw poniżej
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs" onClick={() => setPhase('input')}>
                Odrzuć
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ── Główny komponent ──────────────────────────────────────────────────────────

const DOC_CONTENT = [
  { type: 'h1', text: 'Jak Stworzyć Skuteczny Zespół Agentów AI?' },
  { type: 'p',  text: 'Tworzenie skutecznego zespołu agentów AI to wyzwanie, które wymaga starannego planowania i kluczowej strategii. Agenci AI mogą przekształcić sposób funkcjonowania firm, zwiększając efektywność i wspierając innowacje.' },
  { type: 'h2', text: '1. Zrozum cel i zakres działań' },
  { type: 'p',  text: 'Przed rozpoczęciem budowania zespołu agentów AI, kluczowe jest dokładne zrozumienie ich roli i celów:' },
  { type: 'li', text: '**Określenie celów biznesowych:** Upewnij się, że cele agentów są zgodne z ogólnymi strategiami firmy.' },
  { type: 'li', text: '**Identyfikacja zadań:** Jasno określ, jakie zadania agenci będą realizować.' },
  { type: 'h2', text: '2. Wybór odpowiednich narzędzi' },
  { type: 'p',  text: 'Agenci AI wymagają odpowiedniego zaplecza technologicznego, aby działać skutecznie.' },
]

const TOOLBAR = [[Undo2, Redo2], [Bold, Italic, Underline], [List, ListOrdered], [AlignLeft, AlignCenter], [Quote, Minus, Link2]]

export default function DocumentsScreen() {
  const [leftOpen, setLeftOpen] = React.useState(true)
  const [aiOpen, setAiOpen] = React.useState(true)
  const [inlineOpen, setInlineOpen] = React.useState(false)
  const [expandedFolders, setExpandedFolders] = React.useState(new Set(['dokumenty']))

  const toggleFolder = (id: string) =>
    setExpandedFolders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const formatBold = (text: string) => text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  )

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="documents" />

      {/* Left panel – slide-in */}
      {leftOpen && (
        <div className="w-60 border-r flex flex-col shrink-0">
          <div className="h-14 border-b flex items-center px-3 gap-2">
            <Button className="flex-1 gap-2 justify-start h-10">
              <Plus className="w-4 h-4 shrink-0" /> Nowy dokument
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
              <FolderPlus className="w-4 h-4" />
            </Button>
          </div>
          <div className="px-3 py-2 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Szukaj" className="pl-8 h-8 text-sm bg-muted/30 border-0 focus-visible:ring-0" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            {/* Starred */}
            <button className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 border-b bg-amber-50 hover:bg-amber-100 transition-colors">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-sm font-medium line-clamp-2 leading-snug">Jak Stworzyć Skuteczny Zespół Agentów AI?</span>
            </button>
            {[
              { id: 'interia', name: 'Interia', count: 3, docs: [
                { name: 'Newsy o grach – Q1 2025', date: '2 godz. temu', active: true },
                { name: 'Recenzja Clair Obscur', date: 'wczoraj' },
              ]},
              { id: 'dokumenty', name: 'Dokumenty', count: 2, docs: [
                { name: 'Jak Stworzyć Skuteczny Zespół...', date: '27 mar' },
              ]},
            ].map(folder => (
              <div key={folder.id}>
                <button onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 border-b hover:bg-muted/50 transition-colors group">
                  {expandedFolders.has(folder.id)
                    ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                  <FolderClosed className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm flex-1 text-left">{folder.name}</span>
                  <span className="text-xs text-muted-foreground/60">{folder.count}</span>
                </button>
                {expandedFolders.has(folder.id) && folder.docs.map((doc, i) => (
                  <button key={i} className={cn(
                    'w-full flex items-center gap-2.5 pl-9 pr-4 py-2.5 border-b hover:bg-muted/50 transition-colors border-l-2',
                    (doc as any).active ? 'bg-muted border-l-foreground' : 'border-l-transparent'
                  )}>
                    <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm line-clamp-2 leading-snug">{doc.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{doc.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Header */}
        <div className="h-14 border-b flex items-center px-5 gap-3 shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setLeftOpen(o => !o)}>
            <PanelLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-1 min-w-0">
            <span className="hover:text-foreground cursor-pointer transition-colors">Interia</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium truncate">Jak Stworzyć Skuteczny Zespół Agentów AI?</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> 2 godz. temu
              <Hash className="w-3 h-3 ml-1" /> 820 słów
            </span>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
              <Copy className="w-3.5 h-3.5" /> Kopiuj
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b flex items-center px-5 gap-0.5 h-10 shrink-0 overflow-x-auto">
          {TOOLBAR.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className="w-px h-4 bg-border mx-1.5 shrink-0" />}
              {group.map((Icon, bi) => (
                <button key={bi} className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </React.Fragment>
          ))}
          <Separator orientation="vertical" className="h-4 mx-2" />
          {/* Przycisk demonstracji inline popup */}
          <button
            onClick={() => setInlineOpen(o => !o)}
            className={cn(
              'flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-medium transition-colors',
              inlineOpen
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-dashed'
            )}
          >
            <Wand2 className="w-3 h-3" />
            {inlineOpen ? 'Zamknij popup' : 'Zaznacz fragment →'}
          </button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto px-8 py-10">
            {/* Symulacja zaznaczenia */}
            {DOC_CONTENT.map((block, i) => {
              const isSelected = i === 1 && inlineOpen
              switch (block.type) {
                case 'h1': return <h1 key={i} className="text-2xl font-bold mb-4 mt-2">{block.text}</h1>
                case 'h2': return <h2 key={i} className="text-lg font-bold mb-3 mt-6">{block.text}</h2>
                case 'p':  return (
                  <p key={i} className={cn('text-base leading-relaxed mb-3', isSelected && 'bg-blue-100 rounded px-1')}>
                    {block.text}
                  </p>
                )
                case 'li': return (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-muted-foreground mt-1.5 shrink-0">•</span>
                    <p className="text-base leading-relaxed">{formatBold(block.text)}</p>
                  </div>
                )
              }
            })}
          </div>
        </ScrollArea>

        {/* Inline AI popup – pojawia się nad zaznaczonym tekstem */}
        {inlineOpen && <AIInlinePopup onClose={() => setInlineOpen(false)} />}
      </div>

      {/* Right panel – AI asystent */}
      {aiOpen && (
        <div className="w-72 border-l flex flex-col shrink-0 bg-background">
          <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Asystent AI</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setAiOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                <p className="text-xs text-muted-foreground">Zaznacz fragment tekstu, żeby użyć AI inline. Tutaj możesz zadawać ogólne pytania o dokument.</p>
                <Separator />
                <div className="space-y-1.5">
                  {['Popraw gramatykę i styl', 'Skróć cały dokument', 'Przetłumacz na angielski', 'Dodaj podsumowanie', 'Zasugeruj tytuł SEO'].map(s => (
                    <button key={s} className="w-full text-left text-xs px-3 py-2 border rounded-lg hover:bg-muted transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
            <div className="p-3 border-t">
              <div className="border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-ring">
                <textarea
                  placeholder="Opisz co zmienić w dokumencie..."
                  rows={2}
                  className="w-full resize-none px-3 py-2.5 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
                />
                <div className="flex justify-end px-2 py-1.5 border-t bg-muted/20">
                  <Button size="sm" className="h-7 text-xs gap-1">
                    <Send className="w-3 h-3" /> Wyślij
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating button gdy AI panel zamknięty */}
      {!aiOpen && (
        <button onClick={() => setAiOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10">
          <Sparkles className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
