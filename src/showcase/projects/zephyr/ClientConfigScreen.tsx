/**
 * Zephyr – Client Config
 * Konfiguracja klienta: wygląd, instrukcje AI, presets UTM, sekcje.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Palette, Sparkles, Link2, Layers, Plus, Trash2, Eye, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

const FONT_OPTIONS = [
  { value: 'inter',        label: 'Inter' },
  { value: 'dm-sans',      label: 'DM Sans' },
  { value: 'georgia',      label: 'Georgia' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'roboto',       label: 'Roboto' },
]

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'divider' | 'footer'

interface ClientSection {
  id: string
  name: string
  type: SectionType
  source: 'global' | 'custom'
}

const CLIENT_SECTIONS: ClientSection[] = [
  { id: '1', name: 'Nagłówek Animails',       type: 'header',  source: 'custom' },
  { id: '2', name: 'Hero z banerem',           type: 'hero',    source: 'global' },
  { id: '3', name: 'Produkty – 3 kolumny',    type: 'product', source: 'global' },
  { id: '4', name: 'Tekst + przycisk CTA',    type: 'cta',     source: 'custom' },
  { id: '5', name: 'Sekcja promocyjna z kodem', type: 'content', source: 'custom' },
  { id: '6', name: 'Stopka z linkami',         type: 'footer',  source: 'global' },
]

const SECTION_TYPE_COLOR: Record<SectionType, string> = {
  header:  'bg-blue-50 text-blue-700 border-blue-200',
  hero:    'bg-purple-50 text-purple-700 border-purple-200',
  cta:     'bg-amber-50 text-amber-700 border-amber-200',
  product: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  content: 'bg-slate-50 text-slate-700 border-slate-200',
  divider: 'bg-rose-50 text-rose-700 border-rose-200',
  footer:  'bg-neutral-50 text-neutral-700 border-neutral-200',
}

const SECTION_TYPE_LABEL: Record<SectionType, string> = {
  header: 'Nagłówek', hero: 'Hero', cta: 'CTA', product: 'Produkt',
  content: 'Treść', divider: 'Separator', footer: 'Stopka',
}

export default function ClientConfigScreen() {
  const [headingFont, setHeadingFont] = React.useState('dm-sans')
  const [bodyFont, setBodyFont]       = React.useState('inter')
  const [primaryColor, setPrimaryColor] = React.useState('#0ea5e9')
  const [accentColor, setAccentColor]   = React.useState('#0369a1')
  const [bgColor, setBgColor]           = React.useState('#f0f9ff')
  const [textColor, setTextColor]       = React.useState('#0f172a')
  const [systemInstructions, setSystemInstructions] = React.useState(
    'Jesteś asystentem marketingowym specjalizującym się w newsletterach dla sklepu zoologicznego Animails. Twój ton jest ciepły, przyjazny i ekspercki. Piszesz po polsku. Unikasz żargonu branżowego.'
  )
  const [copyGuidelines, setCopyGuidelines] = React.useState(
    '- Zawsze zaczynaj od mocnego hook\'a w pierwszym zdaniu\n- CTA musi być konkretne i mieć poczucie pilności\n- Długość: 300–600 słów widocznych treści\n- Emoji dozwolone, max 2–3 na cały mail\n- Unikaj słów: "rewolucyjny", "przełomowy", "innowacyjny"'
  )
  const [utmSource, setUtmSource] = React.useState('newsletter')
  const [utmMedium, setUtmMedium] = React.useState('email')

  const tabs = [
    { value: 'appearance', label: 'Wygląd',        icon: Palette  },
    { value: 'ai',         label: 'Instrukcje AI', icon: Sparkles },
    { value: 'utm',        label: 'Presets UTM',   icon: Link2    },
    { value: 'sections',   label: 'Sekcje',        icon: Layers   },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs font-bold">
          AN
        </div>
        <div className="flex-1">
          <h1 className="text-sm font-semibold">Animails</h1>
          <p className="text-xs text-muted-foreground">Konfiguracja klienta</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Save className="w-3.5 h-3.5" />
          Zapisz zmiany
        </Button>
      </div>

      <Tabs defaultValue="appearance" className="flex-1 overflow-hidden flex flex-col">
        <div className="border-b px-6 shrink-0">
          <TabsList className="h-10 bg-transparent p-0 gap-0">
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5"
              >
                <Icon className="w-3.5 h-3.5" />{label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-auto">
          {/* ── Wygląd ── */}
          <TabsContent value="appearance" className="mt-0">
            <div className="max-w-2xl mx-auto p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Kolory marki</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Kolor główny', value: primaryColor, set: setPrimaryColor },
                    { label: 'Akcent',        value: accentColor,  set: setAccentColor  },
                    { label: 'Tło',           value: bgColor,      set: setBgColor      },
                    { label: 'Tekst',         value: textColor,    set: setTextColor    },
                  ].map(({ label, value, set }) => (
                    <div key={label}>
                      <Label className="text-xs mb-1.5 block">{label}</Label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={e => set(e.target.value)}
                          className="w-9 h-9 rounded-lg cursor-pointer border border-border p-0.5"
                        />
                        <Input
                          value={value}
                          onChange={e => set(e.target.value)}
                          className="h-9 font-mono text-sm flex-1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3">Fonty</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs mb-1.5 block">Nagłówki</Label>
                    <select
                      value={headingFont}
                      onChange={e => setHeadingFont(e.target.value)}
                      className="w-full h-9 px-3 text-sm border rounded-md bg-background"
                    >
                      {FONT_OPTIONS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs mb-1.5 block">Treść</Label>
                    <select
                      value={bodyFont}
                      onChange={e => setBodyFont(e.target.value)}
                      className="w-full h-9 px-3 text-sm border rounded-md bg-background"
                    >
                      {FONT_OPTIONS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3">Podgląd palety</h3>
                <div className="rounded-xl border overflow-hidden" style={{ backgroundColor: bgColor }}>
                  <div className="h-12 flex items-center px-6" style={{ backgroundColor: primaryColor }}>
                    <span className="text-white font-semibold text-sm">Animails Newsletter</span>
                  </div>
                  <div className="p-6">
                    <p className="text-lg font-bold mb-2" style={{ color: textColor }}>
                      Tytuł artykułu w newsletterze
                    </p>
                    <p className="text-sm mb-4" style={{ color: textColor, opacity: 0.75 }}>
                      Przykładowy tekst treści newslettera. Tu będzie właściwa treść wygenerowana przez AI na podstawie Twoich instrukcji i briefu.
                    </p>
                    <button
                      className="px-5 py-2 rounded-lg text-white text-sm font-medium"
                      style={{ backgroundColor: accentColor }}
                    >
                      Sprawdź teraz →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Instrukcje AI ── */}
          <TabsContent value="ai" className="mt-0">
            <div className="max-w-2xl mx-auto p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-1">Instrukcje systemowe</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Kim jest AI? Jaki ma styl, ton, specjalizację? To podstawowy kontekst dla każdej generacji.
                </p>
                <Textarea
                  value={systemInstructions}
                  onChange={e => setSystemInstructions(e.target.value)}
                  className="min-h-[140px] text-sm resize-none"
                />
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-1">Wytyczne copy</h3>
                <p className="text-xs text-muted-foreground mb-3">
                  Konkretne zasady pisania copy: długość, struktura, zakazane słowa, emoji, CTA.
                </p>
                <Textarea
                  value={copyGuidelines}
                  onChange={e => setCopyGuidelines(e.target.value)}
                  className="min-h-[160px] text-sm resize-none font-mono"
                />
              </div>

              <div className="p-4 bg-muted/40 rounded-xl border text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Jak to działa?</p>
                <p>
                  AI łączy instrukcje systemowe + wytyczne copy + brief newslettera + wybrane sekcje,
                  generując gotowy kod HTML. Instrukcje tu zdefiniowane są bazą dla każdego nowego newslettera tego klienta.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* ── UTM ── */}
          <TabsContent value="utm" className="mt-0">
            <div className="max-w-2xl mx-auto p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-1">Domyślne parametry UTM</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Zapisane dla tego klienta.{' '}
                  <code className="bg-muted px-1 rounded">utm_campaign</code>{' '}
                  wypełniasz dla każdego newslettera osobno w kreatorze.
                </p>
                <div className="space-y-4 max-w-sm">
                  <div>
                    <Label className="text-xs mb-1.5 block">utm_source</Label>
                    <Input
                      value={utmSource}
                      onChange={e => setUtmSource(e.target.value)}
                      className="h-9 text-sm font-mono"
                    />
                  </div>
                  <div>
                    <Label className="text-xs mb-1.5 block">utm_medium</Label>
                    <Input
                      value={utmMedium}
                      onChange={e => setUtmMedium(e.target.value)}
                      className="h-9 text-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-semibold mb-3">Przykład wygenerowanego URL</h3>
                <div className="bg-muted rounded-lg px-4 py-3 text-xs font-mono text-muted-foreground break-all">
                  https://animails.pl/produkt/karma-royal-canin
                  <span className="text-foreground font-semibold">
                    ?utm_source={utmSource}&utm_medium={utmMedium}&utm_campaign=kwiecien-2026
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Sekcje ── */}
          <TabsContent value="sections" className="mt-0">
            <div className="p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold">Sekcje Animails</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Sekcje dostępne w kreatorze dla tego klienta
                  </p>
                </div>
                <Button size="sm" className="h-8 gap-1.5 text-xs">
                  <Plus className="w-3.5 h-3.5" />
                  Dodaj z biblioteki
                </Button>
              </div>
              <div className="space-y-2">
                {CLIENT_SECTIONS.map(section => (
                  <div
                    key={section.id}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-card hover:shadow-sm transition-shadow"
                  >
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab shrink-0" />
                    <div className="flex-1 flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={cn('text-xs border shrink-0', SECTION_TYPE_COLOR[section.type])}
                      >
                        {SECTION_TYPE_LABEL[section.type]}
                      </Badge>
                      <span className="text-sm">{section.name}</span>
                      {section.source === 'global' && (
                        <span className="text-xs text-muted-foreground">(globalna)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
