/**
 * Zephyr – Client Config
 * Używa: Tabs, Badge, ScrollArea, Separator z ui/
 * Tabs pattern identyczny z SectionLibraryScreen.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Save, Palette, Sparkles, Link2, Layers, Plus, Trash2, Eye, GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

const FONT_OPTIONS = [
  { value: 'inter',        label: 'Inter' },
  { value: 'dm-sans',      label: 'DM Sans' },
  { value: 'georgia',      label: 'Georgia' },
  { value: 'merriweather', label: 'Merriweather' },
  { value: 'helvetica',    label: 'Helvetica' },
]

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'footer'
interface ClientSection { id: string; name: string; type: SectionType; source: 'global' | 'custom' }

const CLIENT_SECTIONS: ClientSection[] = [
  { id: '1', name: 'Nagłówek Animails',       type: 'header',  source: 'custom' },
  { id: '2', name: 'Hero full-width z obrazem', type: 'hero',  source: 'global' },
  { id: '3', name: 'Karma – produkty tygodnia', type: 'product', source: 'custom' },
  { id: '4', name: 'CTA z kodem rabatowym',   type: 'cta',     source: 'custom' },
  { id: '5', name: 'Stopka standardowa',      type: 'footer',  source: 'global' },
]

const TYPE_META: Record<SectionType, { label: string; short: string }> = {
  header:  { label: 'Nagłówek', short: 'H' },
  hero:    { label: 'Hero',     short: '◈' },
  cta:     { label: 'CTA',      short: '→' },
  product: { label: 'Produkt',  short: '☰' },
  content: { label: 'Treść',    short: 'T' },
  footer:  { label: 'Stopka',   short: 'F' },
}

function SectionTypeBadge({ type }: { type: SectionType }) {
  const meta = TYPE_META[type]
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-mono text-foreground/65 shrink-0 select-none">
      <span className="text-foreground/35 text-[9px] leading-none">{meta.short}</span>
      <span>{meta.label}</span>
    </span>
  )
}

function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg border shrink-0 cursor-pointer" style={{ backgroundColor: color }} />
        <Input defaultValue={color} className="h-8 text-xs font-mono" />
      </div>
    </div>
  )
}

export default function ClientConfigScreen() {
  const [primaryColor, setPrimaryColor] = React.useState('#0ea5e9')
  const [aiPrompt, setAiPrompt] = React.useState('Piszesz newslettery dla sklepu zoologicznego Animails. Ton: ciepły, przyjazny, skierowany do właścicieli psów i kotów. Unikaj formalnego języka. Zawsze podkreślaj troskę o zwierzęta.')
  const [aiGuidelines, setAiGuidelines] = React.useState('- Max 3 sekcje produktowe\n- Zawsze dodaj sekcję z darmową dostawą\n- CTA: krótkie, max 5 słów\n- Nie używaj słowa "promocja" – używaj "oferta specjalna"')

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-background text-xs font-bold shrink-0">AN</div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold leading-none">Animails</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">Konfiguracja klienta</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Save className="w-3.5 h-3.5" />Zapisz zmiany
        </Button>
      </div>

      {/* ── Tabs z ui/ – identyczny wzorzec jak SectionLibrary ── */}
      <Tabs defaultValue="appearance" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="h-10 bg-transparent p-0 gap-0 border-b rounded-none px-6 justify-start shrink-0">
          {[
            { value: 'appearance', label: 'Wygląd',       icon: Palette  },
            { value: 'ai',         label: 'Instrukcje AI', icon: Sparkles },
            { value: 'utm',        label: 'Wzorce UTM',    icon: Link2    },
            { value: 'sections',   label: 'Sekcje',        icon: Layers   },
          ].map(tab => (
            <TabsTrigger key={tab.value} value={tab.value}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 h-10 text-xs gap-1.5">
              <tab.icon className="w-3.5 h-3.5" />{tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Wygląd ── */}
        <TabsContent value="appearance" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="max-w-lg mx-auto px-8 py-6 space-y-6">
              <div>
                <p className="text-sm font-semibold mb-4">Kolory marki</p>
                <div className="grid grid-cols-2 gap-4">
                  {/* Kolor główny – reaktywny z podglądem */}
                  <div className="space-y-1.5">
                    <Label className="text-xs">Kolor główny</Label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={primaryColor}
                        onChange={e => setPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border cursor-pointer p-0.5 bg-transparent" />
                      <Input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)}
                        className="h-8 text-xs font-mono" />
                    </div>
                  </div>
                  <ColorSwatch color="#0284c7" label="Kolor akcentu" />
                  <ColorSwatch color="#f8fafc" label="Tło emaila" />
                  <ColorSwatch color="#0f172a" label="Kolor tekstu" />
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-semibold mb-4">Typografia</p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Font nagłówków</Label>
                    <div className="grid grid-cols-5 gap-2">
                      {FONT_OPTIONS.map(f => (
                        <button key={f.value}
                          className={cn('px-2 py-1.5 text-xs rounded-lg border transition-colors',
                            f.value === 'inter' ? 'bg-foreground text-background border-foreground' : 'hover:bg-muted')}>
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Logo URL</Label>
                    <Input placeholder="https://cdn.animails.pl/logo.png" className="h-8 text-xs" />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-sm font-semibold mb-3">Podgląd nagłówka emaila</p>
                <div className="border rounded-lg overflow-hidden">
                  <div style={{ backgroundColor: primaryColor, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'Inter, sans-serif' }}>Animails</span>
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12 }}>Sklep dla pupili</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* ── Instrukcje AI ── */}
        <TabsContent value="ai" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="max-w-lg mx-auto px-8 py-6 space-y-6">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">System prompt dla AI</Label>
                <p className="text-[10px] text-muted-foreground">Instrukcje przekazywane modelowi przed każdą generacją. Kim jest marka, jaki ton, czego unikać.</p>
                <Textarea value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                  className="text-xs min-h-[120px] resize-none" />
              </div>
              <Separator />
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Wytyczne copywriterskie</Label>
                <p className="text-[10px] text-muted-foreground">Szczegółowe reguły dotyczące struktury, długości i stylu.</p>
                <Textarea value={aiGuidelines} onChange={e => setAiGuidelines(e.target.value)}
                  className="text-xs min-h-[100px] resize-none font-mono" />
              </div>
              <div className="p-3 bg-muted/50 border rounded-lg">
                <p className="text-[10px] text-muted-foreground leading-relaxed">
                  Te instrukcje są łączone z briefem przy każdej generacji. Im bardziej szczegółowe, tym lepsza jakość output.
                </p>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* ── UTM ── */}
        <TabsContent value="utm" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="max-w-lg mx-auto px-8 py-6 space-y-4">
              {[
                { name: 'Kampania wiosenna', source: 'newsletter', medium: 'email', campaign: 'wiosna-2026' },
                { name: 'Newsletter miesięczny', source: 'newsletter', medium: 'email', campaign: 'monthly' },
                { name: 'Promocja flash', source: 'newsletter', medium: 'email', campaign: 'flash-sale' },
              ].map((preset, i) => (
                <div key={i} className="bg-card border rounded-xl px-4 py-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold">{preset.name}</p>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground leading-relaxed">
                    utm_source={preset.source}&utm_medium={preset.medium}&utm_campaign={preset.campaign}
                  </p>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full h-8 gap-1.5 text-xs border-dashed">
                <Plus className="w-3.5 h-3.5" />Dodaj wzorzec UTM
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* ── Sekcje ── */}
        <TabsContent value="sections" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="max-w-lg mx-auto px-8 py-6 space-y-3">
              <p className="text-xs text-muted-foreground">Sekcje HTML dostępne dla tego klienta w kreatorze. Przeciągnij żeby zmienić kolejność.</p>
              {CLIENT_SECTIONS.map(s => (
                <div key={s.id} className="bg-card border rounded-xl px-4 py-3 flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab shrink-0" />
                  <SectionTypeBadge type={s.type} />
                  <p className="text-sm font-medium flex-1">{s.name}</p>
                  <Badge variant={s.source === 'global' ? 'secondary' : 'outline'} className="text-[10px] shrink-0">
                    {s.source === 'global' ? 'Globalna' : 'Własna'}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full h-8 gap-1.5 text-xs border-dashed">
                <Plus className="w-3.5 h-3.5" />Przypisz sekcję z biblioteki
              </Button>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}
