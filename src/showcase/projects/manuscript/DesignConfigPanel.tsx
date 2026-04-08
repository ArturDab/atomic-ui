/**
 * DesignConfigPanel – konfigurator design systemu.
 * Edycja tokenów (kolory, typografia, radius) z live preview.
 */
import * as React from 'react'
import { THEMES, type ThemeId, type Theme } from './themes'
import { useManuscriptTheme } from './ThemeContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  Palette, Type, Sliders, RotateCcw, Download, ChevronDown,
  Check, Copy,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Token groups ─────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  { key: '--background',        label: 'Tło główne',         group: 'Tła' },
  { key: '--card',              label: 'Tło kart',           group: 'Tła' },
  { key: '--muted',             label: 'Tło poboczne',       group: 'Tła' },
  { key: '--foreground',        label: 'Tekst główny',       group: 'Tekst' },
  { key: '--muted-foreground',  label: 'Tekst poboczny',     group: 'Tekst' },
  { key: '--primary',           label: 'Kolor akcji (CTA)',  group: 'Akcent' },
  { key: '--primary-foreground',label: 'Tekst na CTA',       group: 'Akcent' },
  { key: '--accent',            label: 'Akcent dekoracyjny', group: 'Akcent' },
  { key: '--border',            label: 'Obramowania',        group: 'Obramowania' },
  { key: '--input',             label: 'Tło inputów',        group: 'Obramowania' },
]

const FONT_OPTIONS = [
  { value: "'DM Sans', system-ui, sans-serif",                 label: 'DM Sans',          type: 'sans' as const },
  { value: "'Inter', system-ui, sans-serif",                   label: 'Inter',            type: 'sans' as const },
  { value: "'Lora', Georgia, serif",                           label: 'Lora',             type: 'serif' as const },
  { value: "'Merriweather', Georgia, serif",                   label: 'Merriweather',     type: 'serif' as const },
  { value: "'Source Serif 4', Georgia, serif",                 label: 'Source Serif 4',   type: 'serif' as const },
  { value: "Georgia, 'Times New Roman', serif",                label: 'Georgia',          type: 'serif' as const },
  { value: "system-ui, -apple-system, sans-serif",             label: 'System UI',        type: 'sans' as const },
]

const RADIUS_PRESETS = [
  { label: 'Brak', value: '0px' },
  { label: 'XS',   value: '2px' },
  { label: 'SM',   value: '4px' },
  { label: 'MD',   value: '6px' },
  { label: 'LG',   value: '8px' },
  { label: 'XL',   value: '12px' },
  { label: 'Full', value: '9999px' },
]

// HSL value "H S% L%" → { h, s, l }
function parseHsl(val: string) {
  const parts = val.trim().split(/\s+/)
  return {
    h: parseFloat(parts[0]) || 0,
    s: parseFloat(parts[1]) || 0,
    l: parseFloat(parts[2]) || 0,
  }
}

function hslToString(h: number, s: number, l: number) {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100; s /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * c).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

// ── Konfigurator ─────────────────────────────────────────────────────────────

interface DesignConfigPanelProps {
  themeId: ThemeId
  onVarsChange: (vars: Record<string, string>) => void
}

export default function DesignConfigPanel({ themeId, onVarsChange }: DesignConfigPanelProps) {
  const baseTheme = THEMES.find(t => t.id === themeId)!
  const [vars, setVars] = React.useState<Record<string, string>>({ ...baseTheme.vars })
  const [activeTab, setActiveTab] = React.useState<'colors' | 'type' | 'spacing'>('colors')
  const [copied, setCopied] = React.useState(false)

  // Reset when theme changes
  React.useEffect(() => {
    const base = THEMES.find(t => t.id === themeId)!
    setVars({ ...base.vars })
  }, [themeId])

  const updateVar = (key: string, value: string) => {
    const next = { ...vars, [key]: value }
    setVars(next)
    onVarsChange(next)
  }

  const reset = () => {
    const base = THEMES.find(t => t.id === themeId)!
    setVars({ ...base.vars })
    onVarsChange({ ...base.vars })
  }

  const exportCss = () => {
    const css = `:root {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`
    navigator.clipboard.writeText(css)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const groups = COLOR_TOKENS.reduce((acc, t) => {
    if (!acc[t.group]) acc[t.group] = []
    acc[t.group].push(t)
    return acc
  }, {} as Record<string, typeof COLOR_TOKENS>)

  const editorFont = vars['--editor-font'] || baseTheme.editorFont
  const editorSize = parseInt(vars['--editor-size'] || baseTheme.editorFontSize) || 18
  const radius = vars['--radius'] || '0.375rem'
  const radiusPx = radius.includes('rem') ? parseFloat(radius) * 16 : parseFloat(radius)

  const TABS = [
    { id: 'colors',  label: 'Kolory',      icon: Palette },
    { id: 'type',    label: 'Typografia',  icon: Type },
    { id: 'spacing', label: 'Geometria',   icon: Sliders },
  ] as const

  return (
    <div className="w-80 border-l flex flex-col bg-background shrink-0">
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Konfigurator</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={reset} title="Resetuj do domyślnych">
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={exportCss} title="Kopiuj jako CSS">
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b shrink-0">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-colors border-b-2',
                activeTab === tab.id
                  ? 'border-foreground font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground')}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 py-4 space-y-5">

          {/* COLORS */}
          {activeTab === 'colors' && Object.entries(groups).map(([groupName, tokens]) => (
            <div key={groupName}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                {groupName}
              </p>
              <div className="space-y-3">
                {tokens.map(token => {
                  const hslStr = vars[token.key] || ''
                  const { h, s, l } = parseHsl(hslStr)
                  const hexColor = hslToHex(h, s, l)

                  return (
                    <div key={token.key} className="flex items-center gap-3">
                      {/* Color picker */}
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-lg border shadow-sm overflow-hidden cursor-pointer"
                          style={{ background: `hsl(${h} ${s}% ${l}%)` }}>
                          <input type="color" value={hexColor}
                            onChange={e => {
                              const { h: nh, s: ns, l: nl } = hexToHsl(e.target.value)
                              updateVar(token.key, hslToString(nh, ns, nl))
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                          />
                        </div>
                      </div>
                      {/* Label + HSL value */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium leading-tight">{token.label}</p>
                        <p className="text-[10px] text-muted-foreground font-mono mt-0.5 truncate">
                          {hslStr}
                        </p>
                      </div>
                      {/* L slider */}
                      <div className="w-16 shrink-0">
                        <input type="range" min={0} max={100} value={l}
                          onChange={e => updateVar(token.key, hslToString(h, s, parseFloat(e.target.value)))}
                          className="w-full h-1.5 accent-current cursor-pointer"
                          style={{ accentColor: `hsl(${h} ${s}% ${l}%)` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* TYPOGRAPHY */}
          {activeTab === 'type' && (
            <>
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Font edytora</p>
                <div className="space-y-2">
                  {FONT_OPTIONS.filter(f => f.type === 'serif').map(font => (
                    <button key={font.value}
                      onClick={() => updateVar('--editor-font', font.value)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all',
                        editorFont === font.value
                          ? 'border-foreground bg-muted/30'
                          : 'border-border hover:border-foreground/30'
                      )}>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ fontFamily: font.value }}>
                          {font.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5"
                          style={{ fontFamily: font.value }}>
                          Szybki brązowy lis przeskoczył przez leniwego psa.
                        </p>
                      </div>
                      {editorFont === font.value && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Rozmiar fontu edytora</p>
                <div className="flex items-center gap-3">
                  <input type="range" min={14} max={24} value={editorSize}
                    onChange={e => updateVar('--editor-size', e.target.value + 'px')}
                    className="flex-1 h-1.5 cursor-pointer" />
                  <span className="text-sm font-mono w-10 text-right">{editorSize}px</span>
                </div>
                <div className="p-3 bg-muted/30 rounded-xl border">
                  <p style={{ fontFamily: editorFont, fontSize: editorSize + 'px', lineHeight: 1.8 }}
                    className="text-foreground">
                    Modele językowe stanowią serce współczesnych systemów agentowych.
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Font UI</p>
                <div className="space-y-2">
                  {FONT_OPTIONS.filter(f => f.type === 'sans').map(font => (
                    <button key={font.value}
                      onClick={() => {
                        updateVar('--font-sans', font.value)
                        // Apply directly to container
                        const container = document.querySelector('[data-manuscript-theme]') as HTMLElement
                        if (container) container.style.fontFamily = font.value
                      }}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all',
                        (vars['--font-sans'] || '') === font.value
                          ? 'border-foreground bg-muted/30'
                          : 'border-border hover:border-foreground/30'
                      )}>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{font.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Dashboard · Nawigacja · Przyciski</p>
                      </div>
                      {(vars['--font-sans'] || '') === font.value && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* GEOMETRY */}
          {activeTab === 'spacing' && (
            <>
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Radius przycisków i kart</p>

                {/* Radius presets */}
                <div className="grid grid-cols-7 gap-1">
                  {RADIUS_PRESETS.map(preset => (
                    <button key={preset.value}
                      onClick={() => updateVar('--radius', preset.label === 'Full' ? '9999px'
                        : (parseFloat(preset.value) / 16) + 'rem')}
                      className={cn(
                        'flex flex-col items-center gap-1.5 py-2.5 rounded-lg border transition-all',
                        Math.abs(radiusPx - parseFloat(preset.value)) < 2
                          ? 'border-foreground bg-muted/30'
                          : 'border-border hover:border-foreground/30'
                      )}>
                      <div className="w-6 h-6 bg-foreground/80"
                        style={{ borderRadius: preset.value }} />
                      <span className="text-[9px] text-muted-foreground">{preset.label}</span>
                    </button>
                  ))}
                </div>

                {/* Slider */}
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={24} value={Math.min(radiusPx, 24)}
                    onChange={e => updateVar('--radius', (parseFloat(e.target.value) / 16) + 'rem')}
                    className="flex-1 h-1.5 cursor-pointer" />
                  <span className="text-sm font-mono w-10 text-right">{Math.round(radiusPx)}px</span>
                </div>

                {/* Preview */}
                <div className="space-y-2">
                  <p className="text-[10px] text-muted-foreground">Podgląd</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['btn', 'card', 'badge', 'input'].map(type => (
                      <div key={type}
                        style={{ borderRadius: radius }}
                        className={cn('border border-foreground/20 bg-muted/30 flex items-center justify-center text-xs',
                          type === 'btn' ? 'px-4 py-2' : type === 'card' ? 'w-20 h-12' :
                          type === 'badge' ? 'px-2.5 py-0.5 text-[10px]' : 'px-3 py-1.5 w-24')}>
                        {type === 'btn' ? 'Button' : type === 'card' ? 'Karta' :
                         type === 'badge' ? 'Tag' : 'Input'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Shadow strength */}
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Cień kart</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Brak',      shadow: 'none' },
                    { label: 'Subtelny',  shadow: '0 1px 3px rgba(0,0,0,0.06)' },
                    { label: 'Wyraźny',   shadow: '0 4px 12px rgba(0,0,0,0.10)' },
                  ].map(opt => (
                    <button key={opt.label}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border hover:border-foreground/30 transition-all">
                      <div className="w-12 h-8 bg-background border rounded-lg"
                        style={{ boxShadow: opt.shadow }} />
                      <span className="text-[10px] text-muted-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </ScrollArea>

      {/* Export */}
      <div className="p-4 border-t shrink-0 space-y-2">
        <Button className="w-full h-9 gap-2 text-sm" onClick={exportCss}>
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Skopiowano CSS!' : 'Kopiuj jako CSS'}
        </Button>
        <p className="text-[10px] text-muted-foreground text-center">
          Gotowe do wklejenia w tokens.css nowej aplikacji
        </p>
      </div>
    </div>
  )
}
