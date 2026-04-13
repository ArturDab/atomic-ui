/**
 * Zephyr – Creator
 * Używa: ScrollArea, Separator, Badge z ui/
 * 2-kolumnowy layout: formularz | podsumowanie
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus, Upload, X, GripVertical, Link2, Sparkles, Image as ImageIcon, ChevronDown, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'footer'
interface SelectedSection { id: string; name: string; type: SectionType }
interface UploadedImage { id: string; name: string; cfUrl: string }
interface UrlEntry { id: string; label: string; url: string }

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

const AVAILABLE_SECTIONS: SelectedSection[] = [
  { id: '1', name: 'Nagłówek Animails',         type: 'header'  },
  { id: '2', name: 'Hero full-width z obrazem',  type: 'hero'    },
  { id: '3', name: 'Karma – produkty tygodnia',  type: 'product' },
  { id: '4', name: 'Sekcja promocyjna z kodem',  type: 'cta'     },
  { id: '5', name: 'Stopka standardowa',         type: 'footer'  },
]

export default function CreatorScreen() {
  const [subject, setSubject] = React.useState('Wiosenna promocja – do -40% na karmy!')
  const [preheader, setPreheader] = React.useState('Sprawdź, co przygotowaliśmy dla Twojego pupila na tę wiosnę')
  const [brief, setBrief] = React.useState('Newsletter wiosenny z promocją na karmy dla psów i kotów. Główna akcja: -40% na karmy Royal Canin i Hill\'s. Pokaż 2–3 konkretne produkty z cenami. Przypomnij o darmowej dostawie od 150 zł. Ton radosny, wiosenno-świąteczny.')
  const [sections, setSections] = React.useState<SelectedSection[]>([
    { id: '1', name: 'Nagłówek Animails',         type: 'header'  },
    { id: '2', name: 'Hero full-width z obrazem',  type: 'hero'    },
    { id: '3', name: 'Karma – produkty tygodnia',  type: 'product' },
    { id: '4', name: 'Sekcja promocyjna z kodem',  type: 'cta'     },
    { id: '5', name: 'Stopka standardowa',         type: 'footer'  },
  ])
  const [images] = React.useState<UploadedImage[]>([
    { id: '1', name: 'banner-wiosna.jpg',      cfUrl: 'https://cf.animails.pl/img/banner-wiosna.jpg' },
    { id: '2', name: 'karma-royal-canin.png',  cfUrl: 'https://cf.animails.pl/img/karma-rc.png'     },
  ])
  const [urls] = React.useState<UrlEntry[]>([
    { id: '1', label: 'Strona główna promocji', url: 'https://animails.pl/wiosna' },
    { id: '2', label: 'Karma Royal Canin',       url: 'https://animails.pl/royal-canin' },
  ])
  const [showSections, setShowSections] = React.useState(false)
  const [campaign, setCampaign] = React.useState('wiosna-2026')

  const removeSection = (id: string) => setSections(prev => prev.filter(s => s.id !== id))

  return (
    <div className="flex h-full bg-background">
      {/* ── Lewa kolumna – formularz ── */}
      <ScrollArea className="flex-1 border-r">
        <div className="px-6 py-5 space-y-6 max-w-2xl">

          {/* Klient */}
          <div className="flex items-center gap-3 pb-4 border-b">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center text-background text-xs font-bold shrink-0">AN</div>
            <div>
              <p className="text-xs font-semibold">Animails</p>
              <p className="text-[10px] text-muted-foreground">Instrukcje AI aktywne · Sky design system</p>
            </div>
          </div>

          {/* Temat i preheader */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Temat i preheader</p>
            <div className="space-y-1.5">
              <Label className="text-xs">Temat maila</Label>
              <Input value={subject} onChange={e => setSubject(e.target.value)} className="text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Preheader</Label>
              <Input value={preheader} onChange={e => setPreheader(e.target.value)} className="text-sm" />
              <p className="text-[10px] text-muted-foreground">Tekst widoczny w skrzynce przed otwarciem maila.</p>
            </div>
          </div>

          <Separator />

          {/* Brief */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Brief</Label>
            <p className="text-[10px] text-muted-foreground">Opisz, co ma znaleźć się w newsletterze. AI na tej podstawie wygeneruje całe copy i złoży HTML.</p>
            <Textarea value={brief} onChange={e => setBrief(e.target.value)}
              className="text-sm min-h-[100px] resize-none" />
          </div>

          <Separator />

          {/* Sekcje */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sekcje ({sections.length})</p>
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1"
                onClick={() => setShowSections(v => !v)}>
                <Plus className="w-3.5 h-3.5" />Dodaj sekcję
                <ChevronDown className={cn('w-3 h-3 transition-transform', showSections && 'rotate-180')} />
              </Button>
            </div>

            {showSections && (
              <div className="border rounded-lg divide-y bg-muted/30">
                {AVAILABLE_SECTIONS.filter(s => !sections.find(sel => sel.id === s.id)).map(s => (
                  <button key={s.id} onClick={() => setSections(prev => [...prev, s])}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors text-left">
                    <SectionTypeBadge type={s.type} />
                    <span className="text-xs">{s.name}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2">
              {sections.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 bg-card border rounded-xl px-4 py-2.5">
                  <GripVertical className="w-4 h-4 text-muted-foreground/40 cursor-grab shrink-0" />
                  <span className="text-xs text-muted-foreground w-4 shrink-0">{i + 1}.</span>
                  <SectionTypeBadge type={s.type} />
                  <span className="text-xs flex-1">{s.name}</span>
                  <button onClick={() => removeSection(s.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Grafiki */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Grafiki</p>
            <div className="space-y-2">
              {images.map(img => (
                <div key={img.id} className="flex items-center gap-3 bg-card border rounded-xl px-4 py-2.5">
                  <ImageIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{img.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{img.cfUrl}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full h-8 gap-1.5 text-xs border-dashed">
              <Upload className="w-3.5 h-3.5" />Wgraj grafiki (→ Cloudflare)
            </Button>
          </div>

          <Separator />

          {/* URL-e i UTM */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">URL-e i UTM</p>
              <div className="flex items-center gap-1 bg-muted rounded-md px-2 py-0.5">
                <Info className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">source: newsletter · medium: email</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">utm_campaign</Label>
              <Input value={campaign} onChange={e => setCampaign(e.target.value)}
                className="h-8 text-xs font-mono" placeholder="wiosna-2026" />
            </div>
            <div className="space-y-2">
              {urls.map(u => (
                <div key={u.id} className="flex items-center gap-3 bg-card border rounded-xl px-4 py-2.5">
                  <Link2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{u.label}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{u.url}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-4" />
        </div>
      </ScrollArea>

      {/* ── Prawa kolumna – podsumowanie + CTA ── */}
      <div className="w-72 shrink-0 flex flex-col">
        <div className="h-14 border-b flex items-center px-4 shrink-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Podsumowanie</p>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-4 py-4 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-semibold text-muted-foreground">Temat</p>
              <p className="text-xs font-medium">{subject || '—'}</p>
              {preheader && <p className="text-[10px] text-muted-foreground italic">{preheader}</p>}
            </div>
            <Separator />
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-muted-foreground">{sections.length} sekcji</p>
              {sections.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground w-3">{i + 1}.</span>
                  <Badge variant="secondary" className="text-[10px] px-1.5">{s.type}</Badge>
                  <span className="text-[10px] truncate">{s.name}</span>
                </div>
              ))}
            </div>
            {images.length > 0 && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold text-muted-foreground">{images.length} grafik</p>
                  {images.map(img => (
                    <p key={img.id} className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" />{img.name}
                    </p>
                  ))}
                </div>
              </>
            )}
            {urls.length > 0 && (
              <>
                <Separator />
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold text-muted-foreground">{urls.length} URL-e z UTM ({campaign})</p>
                  {urls.map(u => <p key={u.id} className="text-[10px] text-muted-foreground truncate">· {u.label}</p>)}
                </div>
              </>
            )}
            <Separator />
            <div className="p-3 bg-muted/60 border rounded-lg">
              <p className="text-[10px] font-semibold mb-1">Gotowe do generacji</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                AI użyje instrukcji klienta Animails + brief + {sections.length} sekcji + {images.length} grafik.
              </p>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 border-t shrink-0">
          <Button className="w-full gap-2">
            <Sparkles className="w-4 h-4" />Generuj newsletter
          </Button>
        </div>
      </div>
    </div>
  )
}
