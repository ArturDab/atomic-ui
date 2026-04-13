/**
 * Zephyr – Design System
 * Dokumentacja tokenów UI: kolory, typografia, spacing, radius, cienie, komponenty.
 * Prawa kolumna: mini podgląd interfejsu z tokenami na żywo.
 */
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
  Wind, Sparkles, Send, Check, Copy, ChevronDown, X,
  Search, Upload, Link2, Plus, Monitor, Smartphone,
} from 'lucide-react'

// ── Tokeny Zephyra ─────────────────────────────────────────────────────────────

const COLORS = {
  'Akcent (Sky)': [
    { name: 'sky-50',  hex: '#f0f9ff', label: 'Background tint' },
    { name: 'sky-100', hex: '#e0f2fe', label: 'Hover light' },
    { name: 'sky-200', hex: '#bae6fd', label: 'Border accent' },
    { name: 'sky-400', hex: '#38bdf8', label: 'Icon / ilustracja' },
    { name: 'sky-500', hex: '#0ea5e9', label: 'Primary — główny akcent' },
    { name: 'sky-600', hex: '#0284c7', label: 'Hover / pressed' },
    { name: 'sky-700', hex: '#0369a1', label: 'Dark accent' },
    { name: 'sky-900', hex: '#0c4a6e', label: 'Text on light' },
  ],
  'Neutralne': [
    { name: 'slate-50',  hex: '#f8fafc', label: 'App background' },
    { name: 'slate-100', hex: '#f1f5f9', label: 'Muted / panel' },
    { name: 'slate-200', hex: '#e2e8f0', label: 'Border' },
    { name: 'slate-400', hex: '#94a3b8', label: 'Placeholder' },
    { name: 'slate-500', hex: '#64748b', label: 'Muted text' },
    { name: 'slate-700', hex: '#334155', label: 'Body text' },
    { name: 'slate-900', hex: '#0f172a', label: 'Foreground' },
    { name: '#ffffff',   hex: '#ffffff', label: 'Background / card' },
  ],
  'Semantyczne': [
    { name: 'emerald-500', hex: '#10b981', label: 'Success / exported' },
    { name: 'amber-500',   hex: '#f59e0b', label: 'Warning / draft' },
    { name: 'red-500',     hex: '#ef4444', label: 'Error / delete' },
    { name: 'violet-500',  hex: '#8b5cf6', label: 'AI / generated' },
  ],
}

const TYPE_SCALE = [
  { name: 'xs',   size: '11px', lh: '1.5', use: 'Badge, meta, timestamp' },
  { name: 'sm',   size: '12px', lh: '1.5', use: 'Caption, helper text' },
  { name: 'base', size: '13px', lh: '1.6', use: 'Body — nawigacja, listy' },
  { name: 'md',   size: '14px', lh: '1.6', use: 'Body — główna treść UI' },
  { name: 'lg',   size: '16px', lh: '1.5', use: 'Nagłówki sekcji, przyciski' },
  { name: 'xl',   size: '18px', lh: '1.4', use: 'Tytuły kart, page h1' },
  { name: '2xl',  size: '22px', lh: '1.3', use: 'Dashboard stats' },
]

const SPACING = [2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48]

const RADII = [
  { name: 'sm',  px: '6px',  use: 'Badge, tag, chip' },
  { name: 'md',  px: '8px',  use: 'Input, button' },
  { name: 'lg',  px: '12px', use: 'Card, panel, dropdown' },
  { name: 'xl',  px: '16px', use: 'Modal, sheet, AI chat bubble' },
  { name: 'full','px': '9999px', use: 'Avatar, dot indicator' },
]

const SHADOWS = [
  { name: 'none', css: 'none',                                           use: 'Flat elements' },
  { name: 'sm',   css: '0 1px 2px rgba(0,0,0,.06)',                     use: 'Card default' },
  { name: 'md',   css: '0 4px 12px rgba(0,0,0,.08)',                    use: 'Dropdown, popover' },
  { name: 'lg',   css: '0 8px 30px rgba(0,0,0,.12)',                    use: 'Modal, sheet' },
  { name: 'focus','css': '0 0 0 2px #0ea5e9',                           use: 'Focus ring (sky-500)' },
]

// ── Mini UI Preview ────────────────────────────────────────────────────────────

function MiniCreatorPreview() {
  return (
    <div className="flex h-full rounded-xl border overflow-hidden bg-background text-foreground">
      {/* Left: form */}
      <div className="flex flex-col flex-1 border-r overflow-hidden">
        {/* Header */}
        <div className="h-10 border-b flex items-center px-4 gap-2 shrink-0 bg-white">
          <div className="w-5 h-5 rounded-md bg-sky-500 flex items-center justify-center">
            <Wind className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-semibold flex-1 truncate">Animails · Nowy newsletter</span>
        </div>

        {/* Form body */}
        <div className="flex-1 overflow-hidden px-4 py-3 space-y-3">
          {/* Subject */}
          <div>
            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Temat</p>
            <div className="h-6 rounded-md border bg-white text-[11px] px-2 flex items-center text-slate-700 truncate">
              Wiosenna promocja – do -40% na karmy!
            </div>
          </div>

          {/* Brief */}
          <div>
            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Brief</p>
            <div className="h-14 rounded-md border bg-white p-2 text-[10px] text-slate-500 leading-relaxed">
              Newsletter wiosenny z promocją na karmy. Główna akcja: -40% Royal Canin i Hill's...
            </div>
          </div>

          {/* Sections */}
          <div>
            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Sekcje</p>
            <div className="space-y-1">
              {[
                { label: 'Nagłówek Animails', type: 'header', color: 'bg-blue-50 text-blue-700' },
                { label: 'Hero full-width', type: 'hero', color: 'bg-purple-50 text-purple-700' },
                { label: 'Karma – produkty', type: 'product', color: 'bg-emerald-50 text-emerald-700' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded border bg-white">
                  <span className="text-[9px] text-slate-400 w-3">{i + 1}.</span>
                  <span className={cn('text-[9px] px-1.5 py-0.5 rounded font-medium', s.color)}>{s.type}</span>
                  <span className="text-[10px] text-slate-600 truncate flex-1">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Grafiki</p>
            <div className="flex items-center gap-1.5 px-2 py-1.5 rounded border bg-slate-50">
              <Upload className="w-3 h-3 text-slate-400" />
              <span className="text-[10px] text-slate-500">Wgraj grafiki → Cloudflare</span>
            </div>
          </div>
        </div>

        {/* Generate button */}
        <div className="p-3 border-t shrink-0">
          <div className="h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span className="text-[11px] font-medium">Generuj newsletter</span>
          </div>
        </div>
      </div>

      {/* Right: summary */}
      <div className="w-32 flex flex-col bg-slate-50">
        <div className="h-10 border-b flex items-center px-3 shrink-0">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Podsumowanie</span>
        </div>
        <div className="flex-1 p-3 space-y-3 overflow-hidden">
          {/* Subject preview */}
          <div className="bg-white rounded-lg border p-2">
            <p className="text-[9px] text-slate-400 mb-0.5">Temat</p>
            <p className="text-[10px] font-medium text-slate-700 line-clamp-2 leading-snug">Wiosenna promocja – -40% karmy!</p>
          </div>

          {/* Sections */}
          <div className="space-y-1">
            <p className="text-[9px] text-slate-400">3 sekcje</p>
            {['Nagłówek', 'Hero', 'Produkty'].map((s, i) => (
              <div key={i} className="flex items-center gap-1 text-[10px] text-slate-500">
                <span className="text-[9px] text-slate-300 w-3">{i + 1}.</span>{s}
              </div>
            ))}
          </div>

          {/* Info box */}
          <div className="bg-sky-50 border border-sky-200 rounded-lg p-2">
            <p className="text-[9px] font-medium text-sky-700">Gotowe do generacji</p>
            <p className="text-[9px] text-sky-600 mt-0.5 leading-relaxed">AI + brief + 3 sekcje</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sekcje tokenów ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/60 mb-3">
      {children}
    </h2>
  )
}

function ColorSection() {
  const [copied, setCopied] = React.useState<string | null>(null)
  const copy = (hex: string) => {
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="space-y-6">
      {Object.entries(COLORS).map(([group, swatches]) => (
        <div key={group}>
          <SectionTitle>{group}</SectionTitle>
          <div className="grid grid-cols-4 gap-2">
            {swatches.map(s => (
              <button
                key={s.name}
                onClick={() => copy(s.hex)}
                className="group text-left"
              >
                <div
                  className="w-full h-10 rounded-lg border mb-1.5 relative overflow-hidden"
                  style={{ backgroundColor: s.hex }}
                >
                  {copied === s.hex && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-[11px] font-medium text-foreground truncate">{s.name}</p>
                <p className="text-[10px] text-muted-foreground truncate">{s.label}</p>
                <p className="text-[10px] font-mono text-muted-foreground/70">{s.hex}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographySection() {
  return (
    <div className="space-y-2">
      <SectionTitle>Skala typograficzna · DM Sans</SectionTitle>
      <div className="space-y-1">
        {TYPE_SCALE.map(t => (
          <div key={t.name} className="flex items-baseline gap-4 py-2.5 border-b last:border-0">
            <div className="w-8 shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground/60">{t.name}</span>
            </div>
            <div className="w-12 shrink-0 text-right">
              <span className="text-[10px] font-mono text-muted-foreground">{t.size}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="font-medium text-foreground leading-none"
                style={{ fontSize: t.size, lineHeight: t.lh }}
              >
                Kreator newsletterów Zephyr
              </span>
            </div>
            <div className="w-40 shrink-0">
              <span className="text-[10px] text-muted-foreground">{t.use}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <SectionTitle>Monospacer · JetBrains Mono</SectionTitle>
        <div className="bg-slate-900 rounded-xl p-4 text-sm font-mono text-slate-300 leading-relaxed">
          <span className="text-slate-500">{'<!-- '}</span>
          <span className="text-sky-400">newsletter.html</span>
          <span className="text-slate-500">{' -->'}</span>
          <br />
          <span className="text-amber-300">{'<table '}</span>
          <span className="text-sky-300">width</span>
          <span className="text-slate-400">{"=\"600\""}</span>
          <span className="text-amber-300">{'>'}</span>
          <br />
          <span className="ml-4 text-slate-500">{'// Wygenerowano przez Zephyr AI'}</span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          Używany w edytorze HTML, podglądzie kodu i snippet'ach sekcji.
        </p>
      </div>
    </div>
  )
}

function SpacingSection() {
  return (
    <div>
      <SectionTitle>Spacing scale · 4px base unit</SectionTitle>
      <div className="space-y-2">
        {SPACING.map(sp => (
          <div key={sp} className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-muted-foreground w-12 shrink-0 text-right">
              {sp * 4}px
            </span>
            <span className="text-[10px] text-muted-foreground w-8 shrink-0">
              {sp}
            </span>
            <div
              className="bg-sky-400/70 rounded-sm h-4"
              style={{ width: sp * 4 }}
            />
            <span className="text-[10px] text-muted-foreground">
              {sp <= 2 ? 'gap-xs / micro' : sp <= 4 ? 'padding sm' : sp <= 8 ? 'padding md' : sp <= 12 ? 'padding lg' : sp <= 16 ? 'sekcja' : 'sekcja duża'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RadiusSection() {
  return (
    <div>
      <SectionTitle>Border radius</SectionTitle>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {RADII.map(r => (
          <div key={r.name} className="flex flex-col items-center gap-2 p-4 bg-white border rounded-xl">
            <div
              className="w-14 h-14 border-2 border-slate-900/20 bg-slate-100"
              style={{ borderRadius: r.px }}
            />
            <div className="text-center">
              <p className="text-xs font-semibold">{r.name}</p>
              <p className="text-[10px] font-mono text-muted-foreground">{r.px}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{r.use}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Shadows</SectionTitle>
      <div className="space-y-3">
        {SHADOWS.map(s => (
          <div key={s.name} className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg bg-white border shrink-0"
              style={{ boxShadow: s.css }}
            />
            <div>
              <p className="text-xs font-semibold">{s.name}</p>
              <p className="text-[10px] text-muted-foreground">{s.use}</p>
              <p className="text-[10px] font-mono text-muted-foreground/60">{s.css}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComponentsSection() {
  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div>
        <SectionTitle>Buttons</SectionTitle>
        <div className="flex flex-wrap gap-3 items-center p-4 bg-white border rounded-xl">
          <button className="h-9 px-4 rounded-lg bg-slate-900 text-white text-sm font-medium flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />Generuj newsletter
          </button>
          <button className="h-9 px-4 rounded-lg border bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            <Copy className="w-3.5 h-3.5" />Kopiuj HTML
          </button>
          <button className="h-8 px-3 rounded-lg bg-sky-500 text-white text-xs font-medium flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />Nowy klient
          </button>
          <button className="h-8 px-3 rounded-lg border border-slate-200 text-xs text-slate-500">
            Anuluj
          </button>
          <button className="h-8 w-8 rounded-lg border flex items-center justify-center text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div>
        <SectionTitle>Badges · status i typy</SectionTitle>
        <div className="flex flex-wrap gap-2 p-4 bg-white border rounded-xl">
          {[
            { label: 'Aktywny',       cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: 'Pauza',         cls: 'bg-slate-100 text-slate-600 border-slate-200' },
            { label: 'Wygenerowany',  cls: 'bg-sky-50 text-sky-700 border-sky-200' },
            { label: 'Wyeksportowany',cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: 'Szkic',         cls: 'bg-slate-100 text-slate-500 border-slate-200' },
            { label: 'Nagłówek',      cls: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Hero',          cls: 'bg-purple-50 text-purple-700 border-purple-200' },
            { label: 'Produkt',       cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: 'CTA',           cls: 'bg-amber-50 text-amber-700 border-amber-200' },
            { label: 'Stopka',        cls: 'bg-neutral-100 text-neutral-600 border-neutral-200' },
          ].map(b => (
            <span key={b.label} className={cn('text-xs px-2 py-0.5 rounded-md border font-medium', b.cls)}>
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <SectionTitle>Inputs i form</SectionTitle>
        <div className="p-4 bg-white border rounded-xl space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              readOnly
              defaultValue=""
              placeholder="Szukaj klienta..."
              className="w-full pl-9 h-9 text-sm border rounded-lg bg-background outline-none"
            />
          </div>
          <div className="flex gap-2">
            <input
              readOnly
              defaultValue="newsletter"
              className="flex-1 h-9 text-sm border rounded-lg px-3 bg-background font-mono outline-none"
            />
            <div className="h-9 px-3 flex items-center gap-1.5 text-xs text-muted-foreground border rounded-lg bg-muted/30">
              <Link2 className="w-3.5 h-3.5" />utm_source
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div>
        <SectionTitle>Cards</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          {/* Client card mini */}
          <div className="bg-white border rounded-xl p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                AN
              </div>
              <div>
                <p className="text-sm font-semibold">Animails</p>
                <p className="text-xs text-muted-foreground">24 newslettery</p>
              </div>
            </div>
            <div className="flex gap-2 pt-3 border-t">
              <div className="flex-1 h-7 rounded-lg bg-slate-900 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-[11px] text-white font-medium">Nowy</span>
              </div>
              <div className="h-7 w-7 rounded-lg border flex items-center justify-center">
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Desktop/mobile toggle */}
          <div className="bg-white border rounded-xl p-4 flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground">Podgląd toggle</p>
            <div className="flex items-center border rounded-lg overflow-hidden w-fit">
              {[
                { icon: Monitor, label: 'Desktop', active: true },
                { icon: Smartphone, label: 'Mobile', active: false },
              ].map(({ icon: Icon, label, active }) => (
                <button
                  key={label}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors',
                    active ? 'bg-foreground text-background' : 'text-muted-foreground'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />{label}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Używany w ArtifactScreen do przełączania widoków podglądu.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Główny ekran ──────────────────────────────────────────────────────────────

type Tab = 'colors' | 'type' | 'spacing' | 'components'

const TABS: { id: Tab; label: string }[] = [
  { id: 'colors',     label: 'Kolory' },
  { id: 'type',       label: 'Typografia' },
  { id: 'spacing',    label: 'Spacing & Radius' },
  { id: 'components', label: 'Komponenty' },
]

export default function DesignSystemScreen() {
  const [tab, setTab] = React.useState<Tab>('colors')

  return (
    <div className="flex flex-col h-full bg-[#fafafa]">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-6 gap-4 shrink-0 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
            <Wind className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Zephyr Design System</p>
            <p className="text-[11px] text-muted-foreground leading-tight">sky-500 · DM Sans · 4px base</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0.5 ml-6 border-r pr-6">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                tab === t.id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Token count */}
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          <span><span className="font-semibold text-foreground">28</span> kolorów</span>
          <span><span className="font-semibold text-foreground">7</span> stopni typografii</span>
          <span><span className="font-semibold text-foreground">5</span> radiusów</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Token docs – scrollable */}
        <div className="flex-1 overflow-auto p-6">
          {tab === 'colors'     && <ColorSection />}
          {tab === 'type'       && <TypographySection />}
          {tab === 'spacing'    && <SpacingSection />}
          {tab === 'components' && <ComponentsSection />}
        </div>

        {/* Live preview – fixed right panel */}
        <div className="w-80 xl:w-96 border-l flex flex-col shrink-0 bg-white">
          <div className="h-10 border-b flex items-center px-4 shrink-0">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Podgląd UI
            </span>
          </div>
          <div className="flex-1 overflow-hidden p-4">
            <MiniCreatorPreview />
          </div>
          <div className="border-t px-4 py-3 bg-muted/30 shrink-0">
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Miniatura <strong>CreatorScreen</strong> — pokazuje tokeny kolorów, typografii i komponentów zastosowane w widoku kreatora.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
