import * as React from 'react'
import { THEMES, type ThemeId } from './themes'
import { useZephyrTheme } from './ThemeContext'
import DesignConfigPanel from './DesignConfigPanel'
import { cn } from '@/lib/utils'
import { Check, Wind, Sparkles, Upload, Mail, Settings } from 'lucide-react'

// ── Mini Creator Preview with theme vars ──────────────────────────────────────

function ThemedCreatorPreview({ vars }: { vars: Record<string, string> }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v))
  }, [vars])

  const hsl = (key: string, fallback = '0 0% 50%') => `hsl(${vars[key] || fallback})`
  const radius = vars['--radius'] || '0.5rem'
  const r = (mult: number) => `calc(${radius} * ${mult})`
  const shadow = vars['--card-shadow'] && vars['--card-shadow'] !== 'none' ? vars['--card-shadow'] : undefined
  const font = vars['--font-sans'] || "'DM Sans', system-ui, sans-serif"

  const bs = { borderColor: hsl('--border', '215 14% 91%') }

  const sections = [
    { label: 'Nagłówek Animails', type: 'header',  cl: 'text-blue-700 bg-blue-50' },
    { label: 'Hero full-width',   type: 'hero',     cl: 'text-violet-700 bg-violet-50' },
    { label: 'Karma – produkty',  type: 'product',  cl: 'text-emerald-700 bg-emerald-50' },
    { label: 'Przycisk CTA',      type: 'cta',      cl: 'text-amber-700 bg-amber-50' },
    { label: 'Stopka',            type: 'footer',   cl: 'text-slate-600 bg-slate-100' },
  ]

  return (
    <div
      ref={containerRef}
      data-zephyr-theme="true"
      className="flex flex-col h-full overflow-hidden rounded-xl border"
      style={{
        background: hsl('--background', '0 0% 100%'),
        color: hsl('--foreground', '215 25% 9%'),
        borderColor: hsl('--border', '215 14% 91%'),
        boxShadow: shadow,
        fontFamily: font,
      }}
    >
      {/* App header */}
      <div className="h-10 flex items-center px-3 gap-2 shrink-0 border-b" style={{ ...bs, background: hsl('--background') }}>
        <div className="w-5 h-5 flex items-center justify-center shrink-0"
          style={{ background: hsl('--primary', '199 89% 48%'), borderRadius: r(0.7) }}>
          <Wind className="w-3 h-3" style={{ color: hsl('--primary-foreground', '0 0% 100%') }} />
        </div>
        <span className="text-[11px] font-semibold flex-1 truncate">Animails · Nowy newsletter</span>
        <div className="flex items-center gap-1">
          {[Mail, Settings].map((Icon, i) => (
            <div key={i} className="w-6 h-6 flex items-center justify-center"
              style={{ borderRadius: r(0.5) }}>
              <Icon className="w-3 h-3" style={{ color: hsl('--muted-foreground', '215 12% 48%') }} />
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden min-h-0">

        {/* LEFT: form area */}
        <div className="flex flex-col flex-1 overflow-hidden border-r" style={bs}>
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">

            {/* Subject */}
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider mb-1"
                style={{ color: hsl('--muted-foreground', '215 12% 48%') }}>Temat wiadomości</p>
              <div className="h-6 px-2 flex items-center text-[10px] border"
                style={{
                  background: hsl('--background'),
                  borderColor: hsl('--border', '215 14% 91%'),
                  borderRadius: r(0.6),
                  color: hsl('--foreground', '215 25% 9%'),
                }}>
                Wiosenna promocja – do -40% na karmy!
              </div>
            </div>

            {/* Preheader */}
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider mb-1"
                style={{ color: hsl('--muted-foreground', '215 12% 48%') }}>Preheader</p>
              <div className="h-5 px-2 flex items-center text-[9px] border"
                style={{
                  background: hsl('--background'),
                  borderColor: hsl('--border', '215 14% 91%'),
                  borderRadius: r(0.6),
                  color: hsl('--muted-foreground', '215 12% 48%'),
                }}>
                Sprawdź bestsellery w nowych cenach
              </div>
            </div>

            {/* Brief */}
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider mb-1"
                style={{ color: hsl('--muted-foreground', '215 12% 48%') }}>Brief AI</p>
              <div className="h-12 p-2 border text-[9px] leading-relaxed"
                style={{
                  background: hsl('--muted', '210 16% 95%'),
                  borderColor: hsl('--border', '215 14% 91%'),
                  borderRadius: r(0.6),
                  color: hsl('--muted-foreground', '215 12% 48%'),
                }}>
                Newsletter wiosenny z promocją na karmy. -40% Royal Canin i Hill's. Ton ciepły, zachęcający...
              </div>
            </div>

            {/* Sections */}
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider mb-1"
                style={{ color: hsl('--muted-foreground', '215 12% 48%') }}>
                Sekcje HTML ({sections.length})
              </p>
              <div className="space-y-1">
                {sections.map((s, i) => (
                  <div key={i} className="flex items-center gap-1.5 px-2 py-1 border"
                    style={{
                      background: hsl('--background'),
                      borderColor: hsl('--border', '215 14% 91%'),
                      borderRadius: r(0.5),
                    }}>
                    <span className="text-[8px] w-3 shrink-0"
                      style={{ color: hsl('--muted-foreground') }}>{i + 1}.</span>
                    <span className={cn('text-[8px] px-1 py-0.5 rounded font-medium shrink-0', s.cl)}
                      style={{ borderRadius: r(0.4) }}>{s.type}</span>
                    <span className="text-[9px] truncate flex-1"
                      style={{ color: hsl('--foreground') }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload */}
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider mb-1"
                style={{ color: hsl('--muted-foreground') }}>Grafiki</p>
              <div className="flex items-center gap-1.5 px-2 py-1.5 border border-dashed"
                style={{
                  background: hsl('--muted', '210 16% 95%'),
                  borderColor: hsl('--border', '215 14% 91%'),
                  borderRadius: r(0.6),
                }}>
                <Upload className="w-3 h-3 shrink-0" style={{ color: hsl('--muted-foreground') }} />
                <span className="text-[9px]" style={{ color: hsl('--muted-foreground') }}>
                  Wgraj grafiki → Cloudflare CDN
                </span>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <div className="p-2.5 border-t shrink-0" style={bs}>
            <div className="h-7 flex items-center justify-center gap-1.5 text-[10px] font-semibold"
              style={{
                background: hsl('--primary', '199 89% 48%'),
                color: hsl('--primary-foreground', '0 0% 100%'),
                borderRadius: radius,
              }}>
              <Sparkles className="w-3 h-3" />
              Generuj newsletter
            </div>
          </div>
        </div>

        {/* RIGHT: summary sidebar */}
        <div className="w-32 flex flex-col shrink-0"
          style={{ background: hsl('--sidebar', '210 18% 97%') }}>
          <div className="h-9 border-b flex items-center px-3 shrink-0"
            style={{ ...bs, background: hsl('--sidebar-header', '210 20% 93%') }}>
            <span className="text-[8px] font-semibold uppercase tracking-wider"
              style={{ color: hsl('--muted-foreground') }}>Podsumowanie</span>
          </div>

          <div className="flex-1 p-2 space-y-2 overflow-hidden">
            {/* Subject card */}
            <div className="p-1.5 border"
              style={{
                background: hsl('--background'),
                borderColor: hsl('--border', '215 14% 91%'),
                borderRadius: r(0.7),
              }}>
              <p className="text-[8px] mb-0.5" style={{ color: hsl('--muted-foreground') }}>Temat</p>
              <p className="text-[9px] font-medium leading-snug line-clamp-2"
                style={{ color: hsl('--foreground') }}>
                Wiosenna promocja – -40% karmy!
              </p>
            </div>

            {/* Sections list */}
            <div className="space-y-0.5">
              <p className="text-[8px]" style={{ color: hsl('--muted-foreground') }}>5 sekcji</p>
              {['Nagłówek', 'Hero', 'Produkty', 'CTA', 'Stopka'].map((s, i) => (
                <div key={i} className="flex items-center gap-1 text-[9px]"
                  style={{ color: hsl('--muted-foreground') }}>
                  <span style={{ color: hsl('--border') }}>{i + 1}.</span>{s}
                </div>
              ))}
            </div>

            {/* Ready indicator */}
            <div className="p-1.5 border"
              style={{
                background: hsl('--muted', '210 16% 95%'),
                borderColor: hsl('--border', '215 14% 91%'),
                borderRadius: r(0.7),
              }}>
              <p className="text-[8px] font-semibold"
                style={{ color: hsl('--primary', '199 89% 48%') }}>
                Gotowe do generacji
              </p>
              <p className="text-[8px] leading-snug mt-0.5"
                style={{ color: hsl('--muted-foreground') }}>
                AI + brief + 5 sekcji
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Główny ekran ──────────────────────────────────────────────────────────────

export default function DesignSystemScreen() {
  const { themeId, setThemeId } = useZephyrTheme()
  const [customVars, setCustomVars] = React.useState<Record<string, string>>({})
  const baseTheme = THEMES.find(t => t.id === themeId)!
  const activeVars = { ...baseTheme.vars, ...customVars }

  const handleThemeSwitch = (id: ThemeId) => {
    setThemeId(id)
    setCustomVars({})
  }

  const isNoir = themeId === 'noir'

  return (
    <div className="flex flex-col h-full" style={{ background: isNoir ? `hsl(222 22% 9%)` : `#fafafa` }}>
      {/* Header */}
      <div className={cn('border-b px-6 py-3.5 shrink-0', isNoir ? 'bg-[#13172a]' : 'bg-white')}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-semibold">Design System</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Wybierz motyw i dostosuj tokeny. Podgląd aktualizuje się na żywo.
            </p>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center gap-1.5">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => handleThemeSwitch(t.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-sm transition-all',
                  themeId === t.id
                    ? 'border-foreground bg-foreground text-background font-semibold shadow-sm'
                    : t.id === 'noir'
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
        <div className="flex items-center gap-5 mt-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{baseTheme.tagline}</span>
          <span>
            Font: {(activeVars['--font-sans'] || '').split(',')[0].replace(/'/g, '') || 'DM Sans'}
          </span>
          <span>Radius: {customVars['--radius'] || baseTheme.radius}</span>
          <div className="flex items-center gap-1">
            {['--primary', '--background', '--sidebar', '--foreground', '--border'].map(k => (
              <div key={k} className="w-4 h-4 rounded-full border border-black/10"
                style={{ background: `hsl(${activeVars[k] || '0 0% 50%'})` }} title={k} />
            ))}
          </div>
          {Object.keys(customVars).length > 0 && (
            <span className="text-amber-600 font-medium">
              {Object.keys(customVars).length} modyfikacji
            </span>
          )}
        </div>
      </div>

      {/* Main: preview + config panel */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview */}
        <div className="flex-1 overflow-hidden p-5">
          <ThemedCreatorPreview vars={activeVars} />
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
