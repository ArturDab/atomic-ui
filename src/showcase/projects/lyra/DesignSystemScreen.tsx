import * as React from 'react'
import { THEMES, type ThemeId } from './themes'
import { useLyraTheme } from './ThemeContext'
import DesignConfigPanel from './DesignConfigPanel'
import { cn } from '@/lib/utils'
import {
  Check, ChevronDown, ChevronRight, CheckCircle2, Timer,
  Circle, Sparkles, Hash, Search, History, Star, Settings,
  Eye, ExternalLink, PanelLeft, AlignLeft, Heading1, Heading2, Heading3,
  Plus, X,
} from 'lucide-react'

// ── Mini Book Editor with theme vars ─────────────────────────────────────────

function ThemedBookEditor({ vars }: { vars: Record<string, string> }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v))
    const fontSans = vars['--font-sans']
    if (fontSans) el.setAttribute('data-lyra-theme', 'true')
  }, [vars])

  const chapters = [
    { id:'c1', title:'Wprowadzenie do agentów AI',      status:'done',        words:3200 },
    { id:'c2', title:'Architektura systemów agentowych', status:'done',        words:2800 },
    { id:'c3', title:'Modele językowe jako fundament',   status:'in-progress', words:2400, active:true },
    { id:'c4', title:'Projektowanie przepływów pracy',   status:'in-progress', words:1800 },
    { id:'c5', title:'Integracja z systemami',           status:'draft',       words:600 },
  ]
  const headings = [
    {level:1, title:'Modele językowe jako fundament'},
    {level:2, title:'Czym jest model językowy?'},
    {level:2, title:'Function calling i narzędzia'},
    {level:3, title:'Porównanie modeli'},
    {level:2, title:'Context window'},
  ]
  const SIcon = ({s}:{s:string}) => {
    const I = s==='done'?CheckCircle2:s==='in-progress'?Timer:Circle
    return <I className={cn('w-2.5 h-2.5 shrink-0',s==='done'?'text-emerald-500':s==='in-progress'?'text-blue-500':'opacity-20')}/>
  }
  const HI:{[k:number]:React.ComponentType<{className?:string}>} = {1:Heading1,2:Heading2,3:Heading3}
  const editorFont = vars['--editor-font'] || "'Lora', serif"
  const editorSize = vars['--editor-size'] || '17px'
  const radius = vars['--radius'] || '0.375rem'

  return (
    <div ref={containerRef} data-lyra-theme="true"
      className="flex flex-col h-full bg-background text-foreground overflow-hidden rounded-xl border"
      style={{
        '--radius': radius,
        fontFamily: vars['--font-sans'] || 'system-ui',
        boxShadow: vars['--card-shadow'] && vars['--card-shadow'] !== 'none' ? vars['--card-shadow'] : undefined,
      } as React.CSSProperties}>

      {/* Header */}
      <div className="h-14 border-b flex itely-center px-4 gap-3 shrink-0 bg-background">
        <div className="w-6 h-6 rounded-md bg-primary/10 flex itely-center justify-center"
          style={{ borderRadius: radius }}>
          <ChevronRight className="w-3 h-3 text-primary rotate-180"/>
        </div>
        <div className="flex itely-center gap-2 flex-1 min-w-0">
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-emerald-200 bg-emerald-50 text-emerald-600 font-medium shrink-0"
            style={{ borderRadius: `calc(${radius} * 0.7)` }}>Książka</span>
          <span className="text-xs text-muted-foreground hidden lg:block">Strategie Contentowe</span>
          <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0 hidden lg:block"/>
          <span className="text-sm font-medium truncate">Modele językowe</span>
        </div>
        <div className="flex itely-center gap-1">
          {[Search,History,Settings].map((I,i) => (
            <div key={i} className="w-8 h-8 flex itely-center justify-center text-muted-foreground hover:bg-muted rounded cursor-pointer"
              style={{ borderRadius: radius }}>
              <I className="w-4 h-4"/>
            </div>
          ))}
          <div className="flex itely-center gap-1.5 px-3 h-8 rounded border text-xs font-medium cursor-pointer text-muted-foreground hover:bg-muted"
            style={{ borderRadius: radius }}>
            <Eye className="w-3.5 h-3.5"/> Podgląd
          </div>
          <div className="flex itely-center gap-1.5 px-3 h-8 rounded bg-primary text-primary-foreground text-xs font-medium cursor-pointer"
            style={{ borderRadius: radius }}>
            <ExternalLink className="w-3.5 h-3.5"/> Eksportuj
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Structure */}
        <div className="w-48 border-r flex flex-col shrink-0" style={{ background: `hsl(${vars['--sidebar'] || '0 0% 95%'})` }}>
          <div className="h-14 border-b flex itely-center justify-between px-4 shrink-0" style={{ background: `hsl(${vars['--sidebar-header'] || '0 0% 93%'})` }}>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Struktura</span>
            <Plus className="w-4 h-4 text-muted-foreground"/>
          </div>
          <div className="px-3 py-2 border-b">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>18 400</span><span>50 000 cel</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary/40 rounded-full" style={{width:'28%'}}/>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-1">
            <div className="flex itely-center gap-1.5 px-3 py-1.5 text-[11px]">
              <ChevronDown className="w-3 h-3 text-muted-foreground"/>
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500"/>
              <span className="font-medium text-muted-foreground">Część I: Fundamenty</span>
            </div>
            {chapters.map(ch => (
              <div key={ch.id} className={cn(
                'flex itely-center gap-2 px-3 py-1.5 pl-7 text-[11px] border-l-2',
                (ch as any).active?'bg-muted border-l-primary font-medium':'border-l-transparent text-muted-foreground')}>
                <SIcon s={ch.status}/>
                <span className="flex-1 line-clamp-1">{ch.title}</span>
                {ch.words>0&&<span className="text-[10px] text-muted-foreground">{ch.words}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Outline */}
        <div className="w-36 border-r flex flex-col shrink-0" style={{ background: `hsl(${vars['--sidebar-light'] || vars['--sidebar'] || '0 0% 97%'})` }}>
          <div className="h-14 border-b flex itely-center px-4 shrink-0" style={{ background: `hsl(${vars['--sidebar-header'] || '0 0% 93%'})` }}>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Rozdział</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
            {headings.map((h,i) => {
              const Icon = HI[h.level]
              return (
                <div key={i} className={cn('flex itely-start gap-1.5 px-2 py-1.5 rounded-md text-[11px] cursor-pointer',
                  h.level===1?'pl-2':h.level===2?'pl-3':'pl-5',
                  i===1?'bg-muted font-medium':'text-muted-foreground hover:bg-muted/50')}
                  style={{ borderRadius: `calc(${radius} * 0.7)` }}>
                  <Icon className="w-3 h-3 shrink-0 mt-0.5"/>
                  <span className="leading-snug">{h.title}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <div className="h-11 border-b flex itely-center px-4 gap-1 bg-background shrink-0 overflow-hidden">
            {['H1','H2','B','I','U','≡','⋮'].map(t=>(
              <div key={t} className="w-7 h-7 rounded text-[10px] flex itely-center justify-center text-muted-foreground hover:bg-muted cursor-pointer font-mono"
                style={{ borderRadius: `calc(${radius} * 0.5)` }}>{t}</div>
            ))}
          </div>
          <div className="h-9 border-b flex itely-center px-4 text-xs text-muted-foreground bg-muted/20 shrink-0">
            <Hash className="w-3 h-3 mr-1.5"/> 2 400 / 3 000 słów
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-md mx-auto px-6 py-8">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Rozdział 3</p>
              <h1 className="font-bold leading-tight mb-4"
                style={{ fontFamily: editorFont, fontSize:'20px' }}>
                Modele językowe jako fundament
              </h1>
              <h2 className="font-semibold mb-2 mt-5"
                style={{ fontFamily: editorFont, fontSize:'15px' }}>
                Czym jest model językowy?
              </h2>
              <p className="leading-relaxed mb-3 text-foreground/90"
                style={{ fontFamily: editorFont, fontSize: editorSize, lineHeight:1.8 }}>
                Modele językowe stanowią serce współczesnych systemów agentowych. Ich zdolność do rozumienia tekstu sprawia, że mogą pełnić rolę „mózgu" agenta.
              </p>
              <p className="leading-relaxed text-foreground/90"
                style={{ fontFamily: editorFont, fontSize: editorSize, lineHeight:1.8 }}>
                Kluczowym aspektem jest zdolność do function calling – wywoływania zewnętrznych narzędzi i API.
              </p>
              <div className="mt-5 space-y-1.5 animate-pulse">
                <div className="h-2.5 bg-muted rounded-full w-full"/>
                <div className="h-2.5 bg-muted/70 rounded-full w-4/5"/>
                <div className="h-2.5 bg-muted/50 rounded-full w-3/5"/>
              </div>
            </div>
          </div>
        </div>

        {/* AI Panel */}
        <div className="w-64 border-l flex flex-col shrink-0" style={{ background: `hsl(${vars['--sidebar'] || vars['--background'] || '0 0% 100%'})` }}>
          <div className="h-14 border-b flex itely-center gap-2.5 px-4 shrink-0">
            <Sparkles className="w-4 h-4 text-muted-foreground"/>
            <span className="text-sm font-semibold flex-1">Asystent AI</span>
            <X className="w-4 h-4 text-muted-foreground cursor-pointer"/>
          </div>
          <div className="border-b px-3 py-2 bg-muted/20">
            <div className="flex itely-center gap-1 bg-muted rounded-lg p-0.5 text-[11px] w-fit">
              <div className="px-2.5 py-1 rounded-md bg-background shadow-sm font-medium"
                style={{ borderRadius: `calc(${radius} * 0.7)` }}>Rozdział</div>
              <div className="px-2.5 py-1 text-muted-foreground">Książka</div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">Modele językowe...</p>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-muted border flex itely-center justify-center shrink-0">
                <Sparkles className="w-3 h-3"/>
              </div>
              <div className="bg-muted/50 border rounded-xl px-3 py-2 text-[11px] leading-relaxed"
                style={{ borderRadius: radius }}>
                Implementacja agentów AI to coraz częściej konieczność konkurencyjna.
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-xl px-3 py-2 text-[11px]"
                style={{ borderRadius: radius }}>
                Napisz wstęp do rozdziału.
              </div>
            </div>
          </div>
          <div className="p-3 border-t shrink-0">
            <div className="border rounded-xl overflow-hidden" style={{ borderRadius: radius }}>
              <div className="px-3 py-2 text-[11px] text-muted-foreground">Zapytaj...</div>
              <div className="flex itely-center justify-between px-2 py-1.5 border-t bg-muted/20">
                <span className="text-[10px] text-muted-foreground">⏎ wyślij</span>
                <div className="flex itely-center gap-1 px-2.5 py-1 rounded bg-primary text-primary-foreground text-[11px] cursor-pointer"
                  style={{ borderRadius: `calc(${radius} * 0.7)` }}>Wyślij</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Główny ekran ──────────────────────────────────────────────────────────────

export default function DesignSystemScreen() {
  const { themeId, setThemeId } = useLyraTheme()
  const [customVars, setCustomVars] = React.useState<Record<string,string>>({})
  const baseTheme = THEMES.find(t => t.id === themeId)!
  const activeVars = { ...baseTheme.vars, ...customVars }

  const handleThemeSwitch = (id: ThemeId) => {
    setThemeId(id)
    setCustomVars({}) // reset customizations when switching base theme
  }

  return (
    <div className="flex flex-col h-full" style={{ background: themeId === 'verso' ? `hsl(222 22% 9%)` : `#fafafa` }}>
      {/* Header */}
      <div className={cn('border-b px-6 py-3.5 shrink-0', themeId === 'verso' ? 'bg-[#181c2a]' : 'bg-white')}>
        <div className="flex itely-center justify-between">
          <div>
            <h1 className="text-sm font-semibold">Design System</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Wybierz bazowy motyw i dostosuj tokeny. Podgląd aktualizuje się na żywo.
            </p>
          </div>
          {/* Theme switcher */}
          <div className="flex itely-center gap-1.5">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => handleThemeSwitch(t.id)}
                className={cn(
                  'flex itely-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm transition-all',
                  themeId === t.id
                    ? 'border-foreground bg-foreground text-background font-semibold shadow-sm'
                    : t.id === 'verso'
                      ? 'border-border bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      : 'border-border bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                )}>
                {themeId === t.id && <Check className="w-3.5 h-3.5" />}
                {t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info bar */}
        <div className="flex itely-center gap-5 mt-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{baseTheme.tagline}</span>
          <span>Edytor: {baseTheme.editorFont.split(',')[0].replace(/'/g,'')} {customVars['--editor-size']||baseTheme.editorFontSize}</span>
          <span>Radius: {customVars['--radius']||baseTheme.radius}</span>
          <div className="flex itely-center gap-1">
            {['--primary','--accent','--background','--muted','--border'].map(k=>(
              <div key={k} className="w-4 h-4 rounded-full border border-black/10"
                style={{background:`hsl(${activeVars[k]||'0 0% 50%'})`}} title={k}/>
            ))}
          </div>
          {Object.keys(customVars).length>0 && (
            <span className="text-amber-600 font-medium">
              {Object.keys(customVars).length} modyfikacji
            </span>
          )}
        </div>
      </div>

      {/* Main content: preview + config panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className="flex-1 overflow-hidden p-5">
          <ThemedBookEditor vars={activeVars} />
        </div>

        {/* Config panel */}
        <DesignConfigPanel
          themeId={themeId}
          onVarsChange={setCustomVars}
        />
      </div>
    </div>
  )
}
