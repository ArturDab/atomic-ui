/**
 * Zephyr – Creator
 * Formularz briefu: temat, sekcje, grafiki (→ Cloudflare), URL-e + UTM.
 * Po lewej formularz, po prawej podsumowanie + przycisk generacji.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Plus, Upload, X, GripVertical, Link2, Sparkles, Image as ImageIcon,
  ChevronDown, Info,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Typy ─────────────────────────────────────────────────────────────────────

type SectionType = 'header' | 'hero' | 'cta' | 'product' | 'content' | 'footer'

interface SelectedSection {
  id: string
  name: string
  type: SectionType
}

interface UploadedImage {
  id: string
  name: string
  cfUrl: string
}

interface UrlEntry {
  id: string
  label: string
  url: string
}

// ── Dane demo ─────────────────────────────────────────────────────────────────

const AVAILABLE_SECTIONS: SelectedSection[] = [
  { id: 'g1',  name: 'Nagłówek z logo i menu',    type: 'header'  },
  { id: 'c1',  name: 'Nagłówek Animails',          type: 'header'  },
  { id: 'g2',  name: 'Hero full-width z obrazem',  type: 'hero'    },
  { id: 'g3',  name: 'Hero split 50/50',           type: 'hero'    },
  { id: 'c2',  name: 'Sekcja promocyjna z kodem', type: 'cta'     },
  { id: 'c3',  name: 'Karma – produkty tygodnia', type: 'product' },
  { id: 'g4',  name: 'Produkty 3 kolumny',         type: 'product' },
  { id: 'g5',  name: 'Tekst + CTA wyśrodkowany',  type: 'cta'     },
  { id: 'g7',  name: 'Stopka standardowa',         type: 'footer'  },
]

const SECTION_TYPE_COLOR: Record<SectionType, string> = {
  header:  'bg-blue-50 text-blue-700 border-blue-200',
  hero:    'bg-purple-50 text-purple-700 border-purple-200',
  cta:     'bg-amber-50 text-amber-700 border-amber-200',
  product: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  content: 'bg-slate-50 text-slate-700 border-slate-200',
  footer:  'bg-neutral-100 text-neutral-700 border-neutral-200',
}

const SECTION_TYPE_LABEL: Record<SectionType, string> = {
  header: 'Nagłówek', hero: 'Hero', cta: 'CTA',
  product: 'Produkt', content: 'Treść', footer: 'Stopka',
}

const DEMO_IMAGES: UploadedImage[] = [
  { id: 'i1', name: 'banner-wiosna.jpg',      cfUrl: 'https://cf.animails.pl/img/banner-wiosna.jpg' },
  { id: 'i2', name: 'karma-royal-canin.png',  cfUrl: 'https://cf.animails.pl/img/karma-rc.png' },
]

const DEMO_URLS: UrlEntry[] = [
  { id: 'u1', label: 'Strona główna promocji', url: 'https://animails.pl/wiosna-2026' },
  { id: 'u2', label: 'Karma Royal Canin',       url: 'https://animails.pl/karma/royal-canin' },
]

// ── Section Picker ────────────────────────────────────────────────────────────

function SectionPicker({
  selected,
  onSelect,
  onRemove,
}: {
  selected: SelectedSection[]
  onSelect: (s: SelectedSection) => void
  onRemove: (id: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const available = AVAILABLE_SECTIONS.filter(s => !selected.find(sel => sel.id === s.id))

  return (
    <div>
      <div className="space-y-1.5 mb-2">
        {selected.map((section, i) => (
          <div key={section.id} className="flex items-center gap-2 p-2.5 border rounded-lg bg-card group">
            <GripVertical className="w-3.5 h-3.5 text-muted-foreground cursor-grab shrink-0" />
            <span className="text-xs text-muted-foreground w-4 shrink-0 tabular-nums">{i + 1}.</span>
            <Badge variant="outline" className={cn('text-xs border shrink-0', SECTION_TYPE_COLOR[section.type])}>
              {SECTION_TYPE_LABEL[section.type]}
            </Badge>
            <span className="text-xs flex-1 truncate">{section.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
              onClick={() => onRemove(section.id)}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-full text-xs gap-1.5 justify-start"
          onClick={() => setOpen(v => !v)}
        >
          <Plus className="w-3.5 h-3.5" />
          Dodaj sekcję
          <ChevronDown className={cn('w-3.5 h-3.5 ml-auto transition-transform', open && 'rotate-180')} />
        </Button>
        {open && available.length > 0 && (
          <div className="absolute top-9 left-0 right-0 bg-popover border rounded-lg shadow-lg z-10 max-h-52 overflow-auto">
            {available.map(s => (
              <button
                key={s.id}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted text-left"
                onClick={() => { onSelect(s); setOpen(false) }}
              >
                <Badge variant="outline" className={cn('text-xs border shrink-0', SECTION_TYPE_COLOR[s.type])}>
                  {SECTION_TYPE_LABEL[s.type]}
                </Badge>
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Główny ekran ─────────────────────────────────────────────────────────────

export default function CreatorScreen() {
  const [subject,  setSubject]  = React.useState('Wiosenna promocja – do -40% na karmy!')
  const [preheader, setPreheader] = React.useState('Sprawdź, co przygotowaliśmy dla Twojego pupila na tę wiosnę 🐾')
  const [brief, setBrief] = React.useState(
    'Newsletter wiosenny z promocją na karmy dla psów i kotów. Główna akcja: -40% na karmy Royal Canin i Hill\'s. Pokaż 2–3 konkretne produkty z cenami. Przypomnij o darmowej dostawie od 150 zł. Ton radosny, wiosenno-świąteczny.'
  )
  const [selectedSections, setSelectedSections] = React.useState<SelectedSection[]>([
    { id: 'c1', name: 'Nagłówek Animails',         type: 'header'  },
    { id: 'g2', name: 'Hero full-width z obrazem', type: 'hero'    },
    { id: 'c3', name: 'Karma – produkty tygodnia', type: 'product' },
    { id: 'c2', name: 'Sekcja promocyjna z kodem', type: 'cta'     },
    { id: 'g7', name: 'Stopka standardowa',        type: 'footer'  },
  ])
  const [images, setImages] = React.useState<UploadedImage[]>(DEMO_IMAGES)
  const [urls,   setUrls]   = React.useState<UrlEntry[]>(DEMO_URLS)
  const [campaign, setCampaign] = React.useState('wiosna-2026')

  const removeImage = (id: string) => setImages(prev => prev.filter(i => i.id !== id))
  const removeUrl   = (id: string) => setUrls(prev => prev.filter(u => u.id !== id))

  return (
    <div className="flex h-full bg-background overflow-hidden">

      {/* ── Lewa: formularz ── */}
      <div className="flex flex-col flex-1 overflow-hidden border-r min-w-0">
        {/* Header */}
        <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            AN
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">Animails</p>
            <h1 className="text-sm font-semibold leading-tight truncate">Nowy newsletter</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">

          {/* Temat i preheader */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Temat i preheader
            </h2>
            <div className="space-y-3">
              <div>
                <Label className="text-xs mb-1.5 block">Temat maila</Label>
                <Input value={subject} onChange={e => setSubject(e.target.value)} className="h-9 text-sm" />
              </div>
              <div>
                <Label className="text-xs mb-1.5 block">Preheader</Label>
                <Input value={preheader} onChange={e => setPreheader(e.target.value)} className="h-9 text-sm" />
                <p className="text-xs text-muted-foreground mt-1">
                  Tekst widoczny w skrzynce po temacie, przed otwarciem maila.
                </p>
              </div>
            </div>
          </section>

          <Separator />

          {/* Brief */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Brief</h2>
            <p className="text-xs text-muted-foreground mb-3">
              Opisz, co ma znaleźć się w newsletterze. AI na tej podstawie wygeneruje całe copy i złoży HTML.
            </p>
            <Textarea
              value={brief}
              onChange={e => setBrief(e.target.value)}
              className="min-h-[120px] text-sm resize-none"
              placeholder="Opisz temat, akcję promocyjną, produkty, ton, co podkreślić..."
            />
          </section>

          <Separator />

          {/* Sekcje */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Sekcje ({selectedSections.length})
            </h2>
            <SectionPicker
              selected={selectedSections}
              onSelect={s => setSelectedSections(prev => [...prev, s])}
              onRemove={id => setSelectedSections(prev => prev.filter(s => s.id !== id))}
            />
          </section>

          <Separator />

          {/* Grafiki */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Grafiki
            </h2>
            <div className="space-y-2 mb-2">
              {images.map(img => (
                <div key={img.id} className="flex items-center gap-2 p-2.5 border rounded-lg bg-card group">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
                    <ImageIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{img.name}</p>
                    <p className="text-xs text-muted-foreground truncate font-mono">{img.cfUrl}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                    onClick={() => removeImage(img.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="h-8 w-full text-xs gap-1.5">
              <Upload className="w-3.5 h-3.5" />
              Wgraj grafiki (→ Cloudflare)
            </Button>
          </section>

          <Separator />

          {/* URL-e + UTM */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
              URL-e i UTM
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <Label className="text-xs shrink-0">utm_campaign:</Label>
              <Input
                value={campaign}
                onChange={e => setCampaign(e.target.value)}
                className="h-7 text-xs font-mono w-40"
              />
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Info className="w-3 h-3" />
                source: newsletter · medium: email
              </div>
            </div>
            <div className="space-y-2 mb-2">
              {urls.map(url => (
                <div key={url.id} className="p-2.5 border rounded-lg bg-card group">
                  <div className="flex items-center gap-2 mb-1">
                    <Link2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-xs font-medium flex-1">{url.label}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                      onClick={() => removeUrl(url.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground font-mono ml-5 truncate">
                    {url.url}
                    <span className="text-sky-600">
                      ?utm_source=newsletter&utm_medium=email&utm_campaign={campaign}
                    </span>
                  </p>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="h-8 w-full text-xs gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              Dodaj URL
            </Button>
          </section>
        </div>
      </div>

      {/* ── Prawa: podsumowanie + generuj ── */}
      <div className="w-72 xl:w-80 flex flex-col shrink-0 bg-muted/30">
        <div className="h-14 border-b flex items-center px-4 shrink-0">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Podsumowanie</span>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* Temat */}
          <div className="bg-card border rounded-lg p-3">
            <p className="text-xs text-muted-foreground mb-0.5">Temat</p>
            <p className="text-xs font-semibold">{subject || '—'}</p>
            {preheader && (
              <p className="text-xs text-muted-foreground mt-1 italic leading-relaxed">{preheader}</p>
            )}
          </div>

          {/* Sekcje */}
          <div>
            <p className="text-xs text-muted-foreground mb-1.5">
              {selectedSections.length} sekcji
            </p>
            <div className="space-y-1">
              {selectedSections.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-4 tabular-nums">{i + 1}.</span>
                  <Badge variant="outline" className={cn('text-xs border shrink-0', SECTION_TYPE_COLOR[s.type])}>
                    {SECTION_TYPE_LABEL[s.type]}
                  </Badge>
                  <span className="truncate">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Grafiki */}
          {images.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">{images.length} grafik</p>
              {images.map(img => (
                <div key={img.id} className="flex items-center gap-1.5 text-xs py-0.5">
                  <ImageIcon className="w-3 h-3 text-muted-foreground shrink-0" />
                  <span className="truncate">{img.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* URL-e */}
          {urls.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground mb-1.5">
                {urls.length} URL-e z UTM ({campaign})
              </p>
              {urls.map(url => (
                <p key={url.id} className="text-xs text-muted-foreground truncate py-0.5">
                  · {url.label}
                </p>
              ))}
            </div>
          )}

          {/* Info */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-700">
            <p className="font-medium mb-1">Gotowe do generacji</p>
            <p>
              AI użyje instrukcji klienta Animails + brief + {selectedSections.length} sekcji
              {images.length > 0 ? ` + ${images.length} grafik` : ''}.
            </p>
          </div>
        </div>

        {/* Generate */}
        <div className="p-4 border-t shrink-0">
          <Button className="w-full h-10 gap-2 text-sm">
            <Sparkles className="w-4 h-4" />
            Generuj newsletter
          </Button>
        </div>
      </div>
    </div>
  )
}
