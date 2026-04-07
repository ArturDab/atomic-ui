/**
 * DesignSystemScreen – trzy warianty design systemu dla Manuscript.
 * Pełny podgląd edytora książki w każdym motywie.
 * Przełącznik motywu nad podglądem.
 */
import * as React from 'react'
import { THEMES, type ThemeId } from './themes'
import { cn } from '@/lib/utils'
import { Check, Palette, ChevronDown, ChevronRight, CheckCircle2, Timer, Circle,
  Sparkles, Hash, Search, History, Star, Settings, Eye, ExternalLink,
  PanelLeft, AlignLeft, ArrowLeft, Maximize2, X, Plus, Clock, Heading1, Heading2, Heading3 } from 'lucide-react'

// ── Pełny podgląd edytora w danym motywie ──────────────────────────────────

function ThemedBookEditor({ themeId }: { themeId: ThemeId }) {
  const theme = THEMES.find(t => t.id === themeId)!
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!containerRef.current) return
    Object.entries(theme.vars).forEach(([key, val]) => {
      containerRef.current!.style.setProperty(key, val)
    })
  }, [themeId, theme.vars])

  // Mock structure data
  const chapters = [
    { id: 'c1', title: 'Wprowadzenie do agentów AI', status: 'done', words: 3200 },
    { id: 'c2', title: 'Architektura systemów agentowych', status: 'done', words: 2800 },
    { id: 'c3', title: 'Modele językowe jako fundament', status: 'in-progress', words: 2400, active: true },
    { id: 'c4', title: 'Projektowanie przepływów pracy', status: 'in-progress', words: 1800 },
    { id: 'c5', title: 'Integracja z systemami', status: 'draft', words: 600 },
  ]
  const headings = [
    { level: 1, title: 'Modele językowe jako fundament' },
    { level: 2, title: 'Czym jest model językowy?' },
    { level: 2, title: 'Function calling i narzędzia' },
    { level: 3, title: 'Porównanie modeli' },
    { level: 3, title: 'Koszty i latency' },
    { level: 2, title: 'Context window' },
  ]

  const StatusIcon = ({ status }: { status: string }) => {
    const Icon = status === 'done' ? CheckCircle2 : status === 'in-progress' ? Timer : Circle
    const color = status === 'done' ? 'text-emerald-500' : status === 'in-progress' ? 'text-blue-500' : 'opacity-30'
    return <Icon className={cn('w-2.5 h-2.5 shrink-0', color)} />
  }

  const HIcon: Record<number, React.ComponentType<{className?: string}>> = { 1: Heading1, 2: Heading2, 3: Heading3 }

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-background text-foreground overflow-hidden rounded-xl border shadow-lg"
      style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <div className="h-14 border-b flex items-center px-4 gap-3 shrink-0 bg-background">
        <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
          <ArrowLeft className="w-3 h-3 text-primary" />
        </div>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary font-medium shrink-0">
            Książka
          </span>
          <span className="text-xs text-muted-foreground hidden lg:block truncate">Strategie Contentowe</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 hidden lg:block" />
          <span className="text-sm font-medium truncate">Modele językowe jako fundament</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded border text-muted-foreground shrink-0">W trakcie</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <div className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer"><Search className="w-4 h-4" /></div>
          <div className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer"><History className="w-4 h-4" /></div>
          <div className="w-8 h-8 rounded flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer"><Settings className="w-4 h-4" /></div>
          <div className="w-px h-5 bg-border mx-1" />
          <div className="flex items-center gap-1.5 px-3 h-8 rounded border text-xs font-medium cursor-pointer text-muted-foreground hover:bg-muted">
            <Eye className="w-3.5 h-3.5" /> Podgląd
          </div>
          <div className="flex items-center gap-1.5 px-3 h-8 rounded bg-primary text-primary-foreground text-xs font-medium cursor-pointer">
            <ExternalLink className="w-3.5 h-3.5" /> Eksportuj
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Struktura */}
        <div className="w-52 border-r flex flex-col shrink-0 bg-background">
          <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Struktura</span>
            <div className="w-6 h-6 rounded flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer"><Plus className="w-3.5 h-3.5" /></div>
          </div>
          <div className="px-3 py-2 border-b">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>18 400 słów</span><span>50 000 cel</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary/40 rounded-full transition-all" style={{ width: '28%' }} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="py-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs">
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />
                <span className="font-medium text-muted-foreground text-[11px]">Część I: Fundamenty</span>
              </div>
              {chapters.map(ch => (
                <div key={ch.id} className={cn(
                  'flex items-center gap-2 px-3 py-1.5 pl-7 text-[11px] border-l-2 mx-0 cursor-pointer',
                  ch.active ? 'bg-muted border-l-primary font-medium' : 'border-l-transparent text-muted-foreground hover:bg-muted/50'
                )}>
                  <StatusIcon status={ch.status} />
                  <span className="flex-1 line-clamp-1">{ch.title}</span>
                  {ch.words > 0 && <span className="text-[10px] text-muted-foreground tabular-nums">{ch.words}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nagłówki */}
        <div className="w-44 border-r flex flex-col shrink-0 bg-background">
          <div className="h-14 border-b flex items-center px-4 shrink-0">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Rozdział</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
            {headings.map((h, i) => {
              const Icon = HIcon[h.level]
              return (
                <div key={i} className={cn(
                  'flex items-start gap-1.5 px-2 py-1.5 rounded-md cursor-pointer text-xs',
                  h.level === 1 ? 'pl-2' : h.level === 2 ? 'pl-4' : 'pl-6',
                  i === 1 ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/50'
                )}>
                  <Icon className={cn('shrink-0 mt-0.5', h.level === 1 ? 'w-3.5 h-3.5' : 'w-3 h-3')} />
                  <span className="leading-snug">{h.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Edytor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Toolbar */}
          <div className="h-11 border-b flex items-center px-4 gap-1 bg-background overflow-x-auto shrink-0">
            {['H1','H2','H3','B','I','U','≡','⋮','"','—'].map(t => (
              <div key={t} className="w-7 h-7 rounded text-[10px] flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer font-mono">{t}</div>
            ))}
          </div>
          {/* Sub-toolbar */}
          <div className="h-9 border-b flex items-center px-4 gap-2 bg-muted/20 shrink-0">
            <span className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Hash className="w-3 h-3" /> 2 400 / 3 000 słów
            </span>
          </div>
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-xl mx-auto px-8 py-8">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Rozdział 3</p>
              <h1 className="font-bold leading-tight mb-4 text-foreground"
                style={{ fontFamily: theme.editorFont, fontSize: '22px' }}>
                Modele językowe jako fundament
              </h1>
              <h2 className="font-semibold mb-2 text-foreground mt-5"
                style={{ fontFamily: theme.editorFont, fontSize: '16px' }}>
                Czym jest model językowy?
              </h2>
              <p className="leading-relaxed mb-3 text-foreground/90"
                style={{ fontFamily: theme.editorFont, fontSize: theme.editorFontSize, lineHeight: '1.8' }}>
                Modele językowe stanowią serce współczesnych systemów agentowych. Ich zdolność do rozumienia i generowania tekstu w języku naturalnym sprawia, że mogą pełnić rolę „mózgu" agenta – interpretować polecenia, planować działania i komunikować wyniki.
              </p>
              <p className="leading-relaxed mb-3 text-foreground/90"
                style={{ fontFamily: theme.editorFont, fontSize: theme.editorFontSize, lineHeight: '1.8' }}>
                Kluczowym aspektem odróżniającym modele odpowiednie dla systemów agentowych jest zdolność do tzw. function calling – wywoływania zewnętrznych narzędzi i API na podstawie konwersacji.
              </p>
              {/* Skeleton loader - shows loading state */}
              <div className="mt-6 space-y-2 animate-pulse">
                <div className="h-3 bg-muted rounded-full w-full" />
                <div className="h-3 bg-muted/70 rounded-full w-4/5" />
                <div className="h-3 bg-muted/50 rounded-full w-3/5" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Panel */}
        <div className="w-72 border-l flex flex-col shrink-0 bg-background">
          <div className="h-14 border-b flex items-center gap-2.5 px-4 shrink-0">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold flex-1">Asystent AI</span>
            <div className="w-7 h-7 rounded flex items-center justify-center text-muted-foreground hover:bg-muted cursor-pointer">
              <X className="w-4 h-4" />
            </div>
          </div>
          <div className="border-b px-4 py-2 bg-muted/20">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 text-xs w-fit">
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-background shadow-sm font-medium text-foreground text-[11px]">
                Rozdział
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 text-muted-foreground text-[11px]">
                Książka
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Modele językowe jako fundament</p>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-muted border flex items-center justify-center shrink-0">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="bg-muted/50 border rounded-xl px-3 py-2 text-sm leading-relaxed max-w-[85%]">
                Implementacja agentów AI w małych firmach to dziś nie tylko możliwość, ale coraz częściej konieczność konkurencyjna.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-xl px-3 py-2 text-sm max-w-[85%]">
                Napisz wstęp do rozdziału o implementacji agentów.
              </div>
            </div>
          </div>
          <div className="p-3 border-t shrink-0">
            <div className="border rounded-xl overflow-hidden">
              <div className="px-3 py-2 text-sm text-muted-foreground bg-transparent">
                Zapytaj o ten rozdział...
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 border-t bg-muted/20">
                <span className="text-[10px] text-muted-foreground">⏎ wyślij</span>
                <div className="flex items-center gap-1.5 px-3 h-7 rounded bg-primary text-primary-foreground text-xs cursor-pointer">
                  Wyślij
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Główny widok ────────────────────────────────────────────────────────────

export default function DesignSystemScreen() {
  const [active, setActive] = React.useState<ThemeId>('ink')
  const theme = THEMES.find(t => t.id === active)!

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Nagłówek z przełącznikiem */}
      <div className="border-b bg-white px-8 py-4 shrink-0">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-base font-semibold">Design System – podgląd</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Pełny podgląd Edytora książki w każdym wariancie. Kliknij motyw żeby przełączyć.
            </p>
          </div>
          {/* Theme switcher */}
          <div className="flex items-center gap-2">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => setActive(t.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl border text-sm transition-all',
                  active === t.id
                    ? 'border-foreground bg-foreground text-background font-semibold shadow-sm'
                    : 'border-border bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                )}>
                {active === t.id && <Check className="w-3.5 h-3.5" />}
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Theme info bar */}
      <div className="border-b bg-white/60 px-8 py-2.5 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{theme.name} – {theme.tagline}</span>
          <span>Edytor: {theme.editorFont.split(',')[0].replace(/'/g, '')} {theme.editorFontSize}</span>
          <span>Radius: {theme.radius}</span>
          {/* Color dots */}
          <div className="flex items-center gap-1.5">
            {Object.entries(theme.vars)
              .filter(([k]) => ['--primary', '--accent', '--muted', '--background', '--border'].includes(k))
              .map(([k, v]) => (
                <div key={k} className="w-4 h-4 rounded-full border border-black/10"
                  style={{ background: `hsl(${v})` }} title={k} />
              ))}
          </div>
        </div>
      </div>

      {/* Full preview */}
      <div className="flex-1 overflow-hidden px-6 py-6">
        <div className="max-w-7xl mx-auto h-full">
          <ThemedBookEditor themeId={active} />
        </div>
      </div>
    </div>
  )
}
