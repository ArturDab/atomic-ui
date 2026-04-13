import * as React from 'react'
import { THEMES, type ThemeId } from './themes'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Palette, Type, Sliders, RotateCcw, Copy, Check,
  Save, History, Plus, Trash2, Edit2, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Color conversion ──────────────────────────────────────────────────────────

function parseHsl(val: string) {
  const p = (val || '').trim().split(/\s+/)
  return { h: parseFloat(p[0]) || 0, s: parseFloat(p[1]) || 0, l: parseFloat(p[2]) || 0 }
}
function hslToHex(h: number, s: number, l: number) {
  l /= 100; s /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => { const k = (n + h / 30) % 12; return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, '0') }
  return `#${f(0)}${f(8)}${f(4)}`
}
function hexToHsl(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b); let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min; s = l > .5 ? d / (2 - max - min) : d / (max + min)
    switch (max) { case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break; case g: h = ((b - r) / d + 2) / 6; break; case b: h = ((r - g) / d + 4) / 6; break }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}
function hexToRgb(hex: string) { return { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) } }
function rgbToHex(r: number, g: number, b: number) { return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('') }
function hslStr(h: number, s: number, l: number) { return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%` }

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'zephyr-ds-customizations'
const VERSIONS_KEY = 'zephyr-ds-versions'

function loadSaved(): Record<string, Record<string, string>> { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} } }
function saveCurrent(themeId: string, vars: Record<string, string>) { const all = loadSaved(); all[themeId] = vars; localStorage.setItem(STORAGE_KEY, JSON.stringify(all)) }
function loadForTheme(themeId: string): Record<string, string> { return loadSaved()[themeId] || {} }

interface SavedVersion { id: string; name: string; themeId: ThemeId; vars: Record<string, string>; createdAt: string }
function loadVersions(): SavedVersion[] { try { return JSON.parse(localStorage.getItem(VERSIONS_KEY) || '[]') } catch { return [] } }
function saveVersions(v: SavedVersion[]) { localStorage.setItem(VERSIONS_KEY, JSON.stringify(v)) }

// ── Token groups ──────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  { key: '--background',        label: 'Tło aplikacji',           group: 'Tła' },
  { key: '--card',              label: 'Tło kart i formularzy',   group: 'Tła' },
  { key: '--muted',             label: 'Tło poboczne',            group: 'Tła' },
  { key: '--sidebar',           label: 'Panel boczny',            group: 'Panele' },
  { key: '--sidebar-header',    label: 'Belki nagłówkowe',        group: 'Panele' },
  { key: '--foreground',        label: 'Tekst główny',            group: 'Tekst' },
  { key: '--muted-foreground',  label: 'Tekst poboczny',          group: 'Tekst' },
  { key: '--primary',           label: 'Kolor akcji (CTA)',       group: 'Akcent' },
  { key: '--primary-foreground',label: 'Tekst na CTA',            group: 'Akcent' },
  { key: '--border',            label: 'Obramowania',             group: 'Obramowania' },
  { key: '--input',             label: 'Tło inputów',             group: 'Obramowania' },
]

const DISPLAY_FONT_OPTIONS = [
  { value: "'Lora', Georgia, serif",                 label: 'Lora',           preview: 'Animails · Newsletter · Kreator' },
  { value: "'Source Serif 4', Georgia, serif",       label: 'Source Serif 4', preview: 'Animails · Newsletter · Kreator' },
  { value: "'Merriweather', Georgia, serif",         label: 'Merriweather',   preview: 'Animails · Newsletter · Kreator' },
  { value: "Georgia, serif",                         label: 'Georgia',        preview: 'Animails · Newsletter · Kreator' },
  { value: "'DM Sans', system-ui, sans-serif",       label: 'Bez szeryfów',   preview: 'Animails · Newsletter · Kreator' },
]

const FONT_OPTIONS = [
  { value: "'DM Sans', system-ui, sans-serif",       label: 'DM Sans',    preview: 'Klient · Sekcje · Konfiguracja' },
  { value: "'Geist', system-ui, sans-serif",         label: 'Geist',      preview: 'Klient · Sekcje · Konfiguracja' },
  { value: "'Inter', system-ui, sans-serif",         label: 'Inter',      preview: 'Klient · Sekcje · Konfiguracja' },
  { value: "system-ui, -apple-system, sans-serif",   label: 'System UI',  preview: 'Klient · Sekcje · Konfiguracja' },
]

const RADIUS_PRESETS = [
  { label: 'Brak', px: 0 }, { label: 'XS', px: 2 }, { label: 'SM', px: 4 },
  { label: 'MD', px: 6 }, { label: 'LG', px: 8 }, { label: 'XL', px: 12 }, { label: 'Full', px: 999 },
]

const SHADOW_OPTIONS = [
  { label: 'Brak',     value: 'none' },
  { label: 'Subtelny', value: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)' },
  { label: 'Wyraźny',  value: '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)' },
]

// ── ColorRow ──────────────────────────────────────────────────────────────────

function ColorRow({ tokenKey, label, hslValue, defaultHsl, onChange, onReset }: {
  tokenKey: string; label: string; hslValue: string
  defaultHsl: string; onChange: (k: string, v: string) => void; onReset: (k: string) => void
}) {
  const { h, s, l } = parseHsl(hslValue)
  const hex = hslToHex(h, s, l)
  const { r, g, b } = hexToRgb(hex)
  const [hexInput, setHexInput] = React.useState(hex)
  const [rgbInput, setRgbInput] = React.useState({ r: String(r), g: String(g), b: String(b) })
  const [expanded, setExpanded] = React.useState(false)
  const isModified = hslValue !== defaultHsl

  React.useEffect(() => {
    const { h: nh, s: ns, l: nl } = parseHsl(hslValue)
    const newHex = hslToHex(nh, ns, nl)
    const { r: nr, g: ng, b: nb } = hexToRgb(newHex)
    setHexInput(newHex); setRgbInput({ r: String(nr), g: String(ng), b: String(nb) })
  }, [hslValue])

  const applyHex = (val: string) => {
    const clean = val.startsWith('#') ? val : '#' + val
    if (!/^#[0-9a-fA-F]{6}$/.test(clean)) return
    const { h, s, l } = hexToHsl(clean); onChange(tokenKey, hslStr(h, s, l))
    setHexInput(clean); const { r, g, b } = hexToRgb(clean); setRgbInput({ r: String(r), g: String(g), b: String(b) })
  }
  const applyRgb = (nr: number, ng: number, nb: number) => {
    const newHex = rgbToHex(nr, ng, nb); const { h, s, l } = hexToHsl(newHex)
    onChange(tokenKey, hslStr(h, s, l)); setHexInput(newHex)
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0 w-9 h-9 rounded-lg border shadow-sm overflow-hidden cursor-pointer"
          style={{ background: `hsl(${h} ${s}% ${l}%)`, borderRadius: '6px' }}>
          <input type="color" value={hex} onChange={e => applyHex(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs font-medium flex-1">{label}</p>
            {isModified && (
              <button onClick={() => onReset(tokenKey)} title="Przywróć domyślny"
                className="text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
            <button onClick={() => setExpanded(o => !o)}
              className={cn('text-[10px] px-1.5 py-0.5 rounded transition-colors',
                expanded ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground')}>
              RGB
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">#</span>
              <Input value={hexInput.replace('#', '')}
                onChange={e => { const v = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6); setHexInput('#' + v); if (v.length === 6) applyHex('#' + v) }}
                onBlur={() => applyHex(hexInput)}
                className={cn('h-7 pl-6 text-xs font-mono uppercase', isModified && 'ring-1 ring-amber-400')}
                maxLength={6} />
            </div>
            <input type="range" min={0} max={100} value={l}
              onChange={e => onChange(tokenKey, hslStr(h, s, parseFloat(e.target.value)))}
              className="w-16 h-1.5 cursor-pointer shrink-0"
              style={{ accentColor: `hsl(${h} ${s}% ${l}%)` }} title="Jasność" />
          </div>
          {expanded && (
            <div className="flex gap-1 mt-1.5">
              {(['r', 'g', 'b'] as const).map(ch => (
                <div key={ch} className="flex-1">
                  <span className="text-[9px] text-muted-foreground uppercase block text-center mb-0.5">{ch}</span>
                  <Input value={rgbInput[ch]}
                    onChange={e => setRgbInput(p => ({ ...p, [ch]: e.target.value.replace(/\D/g, '').slice(0, 3) }))}
                    onBlur={() => applyRgb(parseInt(rgbInput.r) || 0, parseInt(rgbInput.g) || 0, parseInt(rgbInput.b) || 0)}
                    onKeyDown={e => e.key === 'Enter' && applyRgb(parseInt(rgbInput.r) || 0, parseInt(rgbInput.g) || 0, parseInt(rgbInput.b) || 0)}
                    className="h-7 text-xs font-mono text-center px-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Versions manager ──────────────────────────────────────────────────────────

function VersionsPanel({ currentVars, themeId, onLoad }: {
  currentVars: Record<string, string>; themeId: ThemeId
  onLoad: (vars: Record<string, string>) => void
}) {
  const [versions, setVersions] = React.useState<SavedVersion[]>(loadVersions)
  const [naming, setNaming] = React.useState(false)
  const [name, setName] = React.useState('')

  const save = () => {
    if (!name.trim()) return
    const v: SavedVersion = {
      id: Date.now().toString(), name: name.trim(), themeId,
      vars: currentVars, createdAt: new Date().toLocaleString('pl-PL'),
    }
    const next = [...versions, v]
    setVersions(next); saveVersions(next); setName(''); setNaming(false)
  }

  const remove = (id: string) => {
    const next = versions.filter(v => v.id !== id)
    setVersions(next); saveVersions(next)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Zapisane wersje</p>
        <button onClick={() => setNaming(o => !o)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Plus className="w-3.5 h-3.5" /> Zapisz wersję
        </button>
      </div>

      {naming && (
        <div className="flex gap-2">
          <Input value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') save(); if (e.key === 'Escape') setNaming(false) }}
            placeholder="Nazwa wersji..." className="h-8 text-sm flex-1" autoFocus />
          <Button size="sm" className="h-8 px-3" onClick={save} disabled={!name.trim()}>
            <Check className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={() => setNaming(false)}>
            <X className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {versions.length === 0 && !naming ? (
        <p className="text-xs text-muted-foreground/60 text-center py-3 border border-dashed rounded-lg">
          Brak zapisanych wersji
        </p>
      ) : (
        <div className="space-y-1.5">
          {versions.map(v => (
            <div key={v.id} className="flex items-center gap-2 px-3 py-2.5 border rounded-xl hover:border-foreground/20 transition-colors group">
              <div className="flex gap-0.5 shrink-0">
                {['--primary', '--background', '--sidebar'].map(k => (
                  <div key={k} className="w-3 h-3 rounded-full border border-black/10"
                    style={{ background: `hsl(${v.vars[k] || '0 0% 80%'})` }} />
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{v.name}</p>
                <p className="text-[10px] text-muted-foreground">{v.themeId} · {v.createdAt}</p>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onLoad(v.vars)} title="Wczytaj">
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => remove(v.id)} title="Usuń">
                  <Trash2 className="w-3 h-3 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Główny konfigurator ───────────────────────────────────────────────────────

interface DesignConfigPanelProps {
  themeId: ThemeId
  onVarsChange: (vars: Record<string, string>) => void
}

export default function DesignConfigPanel({ themeId, onVarsChange }: DesignConfigPanelProps) {
  const baseTheme = THEMES.find(t => t.id === themeId)!
  const [vars, setVars] = React.useState<Record<string, string>>(() => ({
    ...baseTheme.vars, ...loadForTheme(themeId),
  }))
  const [saved, setSaved] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'colors' | 'type' | 'spacing' | 'versions'>('colors')
  const hasChanges = Object.entries(vars).some(([k, v]) => baseTheme.vars[k] !== v)

  React.useEffect(() => {
    const base = THEMES.find(t => t.id === themeId)!
    const next = { ...base.vars, ...loadForTheme(themeId) }
    setVars(next); onVarsChange(next)
  }, [themeId])

  const updateVar = (key: string, value: string) => {
    const next = { ...vars, [key]: value }; setVars(next); onVarsChange(next)
  }

  const resetVar = (key: string) => {
    const base = THEMES.find(t => t.id === themeId)!
    const next = { ...vars, [key]: base.vars[key] || '' }
    setVars(next); onVarsChange(next)
  }

  const applyAndSave = () => {
    const base = THEMES.find(t => t.id === themeId)!.vars
    const diff: Record<string, string> = {}
    Object.entries(vars).forEach(([k, v]) => { if (base[k] !== v) diff[k] = v })
    saveCurrent(themeId, diff); setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const restoreAll = () => {
    const base = THEMES.find(t => t.id === themeId)!
    const all = loadSaved(); delete all[themeId]; localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    const next = { ...base.vars }; setVars(next); onVarsChange(next)
  }

  const exportCss = () => {
    const css = `:root {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`
    navigator.clipboard.writeText(css); setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const groups = COLOR_TOKENS.reduce((acc, t) => {
    if (!acc[t.group]) acc[t.group] = []
    acc[t.group].push(t)
    return acc
  }, {} as Record<string, typeof COLOR_TOKENS>)

  const uiFont = vars['--font-sans'] || baseTheme.vars['--font-sans'] || ''
  const radius = vars['--radius'] || '0.5rem'
  const radiusPx = radius.includes('rem') ? parseFloat(radius) * 16 : parseFloat(radius)

  const TABS = [
    { id: 'colors'   as const, label: 'Kolory',    icon: Palette },
    { id: 'type'     as const, label: 'Typografia', icon: Type },
    { id: 'spacing'  as const, label: 'Geometria', icon: Sliders },
    { id: 'versions' as const, label: 'Wersje',    icon: Save },
  ]

  return (
    <div className="w-80 border-l flex flex-col bg-background shrink-0">
      <div className="h-14 border-b flex items-center gap-2.5 px-4 shrink-0">
        <Palette className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-semibold flex-1">Konfigurator</span>
        {hasChanges && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Zmiany</span>}
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={exportCss}>
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        </Button>
      </div>

      <div className="grid grid-cols-4 border-b shrink-0">
        {TABS.map(tab => { const Icon = tab.icon; return (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={cn('flex flex-col items-center gap-1 py-2.5 text-[10px] border-b-2 transition-colors',
              activeTab === tab.id ? 'border-foreground font-medium text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground')}>
            <Icon className="w-3.5 h-3.5" />{tab.label}
          </button>
        )})}
      </div>

      <ScrollArea className="flex-1">
        <div className="px-4 py-4 space-y-5">

          {activeTab === 'colors' && Object.entries(groups).map(([groupName, tokens]) => (
            <div key={groupName}>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">{groupName}</p>
              {groupName === 'Panele' && (
                <div className="mb-3 p-2.5 bg-muted/40 rounded-lg border text-[10px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground/70">Hierarchia:</strong> Belki nagłówkowe &gt; Panel &gt; Tło główne
                </div>
              )}
              <div className="space-y-4">
                {tokens.map(token => (
                  <ColorRow key={token.key} tokenKey={token.key} label={token.label}
                    hslValue={vars[token.key] || baseTheme.vars[token.key] || '0 0% 50%'}
                    defaultHsl={baseTheme.vars[token.key] || '0 0% 50%'}
                    onChange={updateVar} onReset={resetVar} />
                ))}
              </div>
            </div>
          ))}

          {activeTab === 'type' && (
            <>
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Font wyświetlania</p>
                <p className="text-[10px] text-muted-foreground mb-3">
                  Nazwy klientów, tematy, nagłówki sekcji. Serce tożsamości Ink & Air.
                </p>
                {DISPLAY_FONT_OPTIONS.map(font => {
                  const displayFont = vars['--font-display'] || baseTheme.vars['--font-display'] || ''
                  return (
                    <button key={font.value} onClick={() => updateVar('--font-display', font.value)}
                      className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all',
                        displayFont === font.value ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/30')}>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ fontFamily: font.value }}>{font.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: font.value }}>{font.preview}</p>
                      </div>
                      {displayFont === font.value && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                    </button>
                  )
                })}
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Font UI</p>
                <p className="text-[10px] text-muted-foreground mb-3">
                  Nawigacja, przyciski, formularze i panele.
                </p>
                {FONT_OPTIONS.map(font => (
                  <button key={font.value} onClick={() => updateVar('--font-sans', font.value)}
                    className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all',
                      uiFont === font.value ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/30')}>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ fontFamily: font.value }}>{font.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: font.value }}>{font.preview}</p>
                    </div>
                    {uiFont === font.value && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTab === 'spacing' && (
            <>
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Radius</p>
                <div className="grid grid-cols-7 gap-1">
                  {RADIUS_PRESETS.map(preset => {
                    const pxVal = preset.px >= 999 ? 9999 : preset.px
                    const remVal = pxVal >= 9999 ? '9999px' : (pxVal / 16) + 'rem'
                    const active = Math.abs(radiusPx - pxVal) < 2 || (pxVal >= 999 && radiusPx > 50)
                    return (
                      <button key={preset.label} onClick={() => updateVar('--radius', remVal)}
                        className={cn('flex flex-col items-center gap-1.5 py-2.5 rounded-lg border transition-all',
                          active ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/30')}>
                        <div className="w-6 h-6 bg-foreground/70" style={{ borderRadius: preset.px >= 999 ? '9999px' : preset.px + 'px' }} />
                        <span className="text-[9px] text-muted-foreground">{preset.label}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="flex items-center gap-3">
                  <input type="range" min={0} max={24} value={Math.min(radiusPx, 24)}
                    onChange={e => updateVar('--radius', (parseFloat(e.target.value) / 16) + 'rem')}
                    className="flex-1 h-1.5 cursor-pointer" />
                  <span className="text-sm font-mono w-10 text-right">{Math.round(radiusPx)}px</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {['Przycisk', 'Karta', 'Input', 'Badge'].map((t, i) => (
                    <div key={t} style={{ borderRadius: radius }}
                      className={cn('border border-foreground/20 bg-muted/30 text-xs flex items-center justify-center',
                        i === 0 ? 'px-4 py-2' : i === 1 ? 'w-20 h-12' : i === 2 ? 'px-3 py-1.5 w-24' : 'px-2.5 py-1')}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Cień kart</p>
                <div className="grid grid-cols-3 gap-2">
                  {SHADOW_OPTIONS.map(opt => (
                    <button key={opt.label} onClick={() => updateVar('--card-shadow', opt.value)}
                      className={cn('flex flex-col items-center gap-2 p-3 rounded-xl border transition-all',
                        (vars['--card-shadow'] || 'none') === opt.value ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/30')}>
                      <div className="w-14 h-9 bg-background border rounded-lg"
                        style={{ boxShadow: opt.value, borderRadius: radius }} />
                      <span className="text-[10px] text-muted-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'versions' && (
            <VersionsPanel currentVars={vars} themeId={themeId} onLoad={v => { setVars(v); onVarsChange(v) }} />
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t shrink-0 space-y-2">
        <Button className="w-full h-9 gap-2" onClick={applyAndSave}>
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Zapisano!' : 'Zastosuj i zapisz'}
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 h-8 gap-1.5 text-xs" onClick={restoreAll} disabled={!hasChanges}>
            <History className="w-3.5 h-3.5" /> Przywróć oryginalne
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 h-8 gap-1.5 text-xs" onClick={exportCss}>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            CSS
          </Button>
        </div>
      </div>
    </div>
  )
}
