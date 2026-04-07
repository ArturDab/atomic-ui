/**
 * WordPressExportPanel – eksport artykułu do WordPress jako bloki Gutenberga.
 * Mapowanie: każdy blok treści → osobny wp:core blok.
 * Opcje: Opublikuj / Zaplanuj / Szkic + data + kategorie.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  X, Globe, CheckCircle2, AlertCircle, Loader2, Calendar,
  Tag, User, Image, ChevronDown, ChevronRight, ExternalLink,
  FileText, Code2, List, Quote, Heading1, Heading2, Hash,
  Clock, Check, Zap, Settings, RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PublishMode = 'publish' | 'schedule' | 'draft'
type WPStatus = 'disconnected' | 'connecting' | 'connected'

// Mapowanie bloków treści na bloki Gutenberga
const BLOCK_MAP = [
  { from: 'Nagłówek H1',  fromIcon: Heading1, to: 'core/heading (level 1)', toIcon: Heading1, note: 'Ustawiany jako główny tytuł wpisu' },
  { from: 'Nagłówek H2',  fromIcon: Heading2, to: 'core/heading (level 2)', toIcon: Heading2 },
  { from: 'Akapit',       fromIcon: FileText,  to: 'core/paragraph',         toIcon: FileText },
  { from: 'Lista',        fromIcon: List,      to: 'core/list',              toIcon: List },
  { from: 'Cytat',        fromIcon: Quote,     to: 'core/quote',             toIcon: Quote },
  { from: 'Obraz',        fromIcon: Image,     to: 'core/image',             toIcon: Image,   note: 'Wgrywany przez WP Media API' },
  { from: 'Blok HTML',    fromIcon: Code2,     to: 'core/html',              toIcon: Code2,   note: 'Wklejany bez zmian' },
  { from: 'Blok AI',      fromIcon: Zap,       to: 'core/paragraph',         toIcon: FileText, note: 'Konwertowany do akapitu' },
]

const WP_CATEGORIES = ['AI & Automatyzacja', 'Content Marketing', 'E-commerce', 'SEO']
const WP_TAGS = ['AI', 'content', 'marketing', '2025']

interface WordPressExportPanelProps {
  onClose: () => void
  articleTitle?: string
  wordCount?: number
  blockCount?: number
}

export default function WordPressExportPanel({
  onClose,
  articleTitle = 'Jak AI Zmienia Content Marketing w 2025 Roku',
  wordCount = 2840,
  blockCount = 13,
}: WordPressExportPanelProps) {
  const [wpStatus, setWpStatus] = React.useState<WPStatus>('connected')
  const [publishMode, setPublishMode] = React.useState<PublishMode>('publish')
  const [scheduleDate, setScheduleDate] = React.useState('2025-04-15')
  const [scheduleTime, setScheduleTime] = React.useState('09:00')
  const [selectedCategories, setSelectedCategories] = React.useState(['AI & Automatyzacja'])
  const [selectedTags, setSelectedTags] = React.useState(['AI', 'content'])
  const [showBlockMap, setShowBlockMap] = React.useState(false)
  const [exporting, setExporting] = React.useState(false)
  const [exported, setExported] = React.useState(false)
  const [wpUrl] = React.useState('animails.pl')
  const [excerpt, setExcerpt] = React.useState('')
  const [featuredImageSet, setFeaturedImageSet] = React.useState(false)

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => { setExporting(false); setExported(true) }, 2200)
  }

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl border w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
              <Globe className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold">Eksport do WordPress</h2>
              <p className="text-xs text-foreground/55 mt-0.5 truncate max-w-xs">{articleTitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-foreground/40 hover:text-foreground transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-6 py-5 space-y-5">

            {/* Status połączenia WP */}
            <div className={cn(
              'flex items-center justify-between p-3.5 rounded-xl border',
              wpStatus === 'connected' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
            )}>
              <div className="flex items-center gap-2.5">
                {wpStatus === 'connected'
                  ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  : <AlertCircle className="w-4 h-4 text-amber-600" />}
                <div>
                  <p className="text-sm font-medium">
                    {wpStatus === 'connected' ? `Połączono z ${wpUrl}` : 'Brak połączenia z WordPress'}
                  </p>
                  <p className="text-xs text-foreground/60">
                    {wpStatus === 'connected' ? 'WordPress REST API · Zalogowany jako admin' : 'Skonfiguruj połączenie w ustawieniach'}
                  </p>
                </div>
              </div>
              <button className="text-xs text-foreground/55 hover:text-foreground flex items-center gap-1 transition-colors">
                <RefreshCw className="w-3 h-3" /> Zmień
              </button>
            </div>

            {/* Podsumowanie treści */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Słów', value: wordCount.toLocaleString(), icon: Hash },
                { label: 'Bloków Gutenberga', value: blockCount, icon: FileText },
                { label: 'Obrazów', value: 1, icon: Image },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-muted/30 rounded-xl p-3 text-center">
                  <Icon className="w-4 h-4 mx-auto mb-1.5 text-foreground/40" />
                  <p className="text-lg font-semibold tracking-tight">{value}</p>
                  <p className="text-[10px] text-foreground/55 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Mapowanie bloków */}
            <div>
              <button
                onClick={() => setShowBlockMap(o => !o)}
                className="flex items-center gap-2 text-sm font-medium w-full text-left hover:text-foreground/80 transition-colors">
                {showBlockMap ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                Mapowanie bloków → Gutenberg
                <Badge variant="outline" className="text-[10px] ml-1">
                  {BLOCK_MAP.length} typów
                </Badge>
              </button>
              {showBlockMap && (
                <div className="mt-3 border rounded-xl overflow-hidden">
                  <div className="bg-muted/30 px-4 py-2 flex text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">
                    <span className="flex-1">Blok Manuscript</span>
                    <span className="flex-1">Blok Gutenberg</span>
                  </div>
                  <div className="divide-y">
                    {BLOCK_MAP.map(b => (
                      <div key={b.from} className="flex items-center px-4 py-2.5 gap-4">
                        <div className="flex-1 flex items-center gap-2">
                          <b.fromIcon className="w-3.5 h-3.5 text-foreground/40 shrink-0" />
                          <span className="text-xs">{b.from}</span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-foreground/25 shrink-0" />
                        <div className="flex-1 flex items-center gap-2">
                          <b.toIcon className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <div>
                            <span className="text-xs font-mono text-blue-600">{b.to}</span>
                            {b.note && <p className="text-[10px] text-foreground/50">{b.note}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Kategorie */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-foreground/50" /> Kategorie
              </label>
              <div className="flex flex-wrap gap-2">
                {WP_CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => toggleCategory(cat)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-full border transition-colors',
                      selectedCategories.includes(cat)
                        ? 'bg-foreground text-background border-foreground font-medium'
                        : 'border-border text-foreground/65 hover:border-foreground/40'
                    )}>
                    {cat}
                  </button>
                ))}
                <button className="text-xs px-3 py-1.5 rounded-full border border-dashed text-foreground/40 hover:border-foreground/30 hover:text-foreground/60 transition-colors">
                  + Dodaj
                </button>
              </div>
            </div>

            {/* Tagi */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tagi</label>
              <div className="flex flex-wrap gap-2">
                {WP_TAGS.map(tag => (
                  <button key={tag} onClick={() => toggleTag(tag)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-md border transition-colors',
                      selectedTags.includes(tag)
                        ? 'bg-foreground text-background border-foreground'
                        : 'border-border text-foreground/65 hover:border-foreground/40'
                    )}>
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center justify-between">
                Opis (excerpt)
                <span className="text-xs text-foreground/40 font-normal">{excerpt.length}/160</span>
              </label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value.slice(0, 160))}
                placeholder="Krótki opis widoczny w wynikach wyszukiwania..."
                rows={2}
                className="w-full text-sm border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"
              />
            </div>

            {/* Grafika wyróżniająca */}
            <div className="flex items-center justify-between p-3 rounded-xl border">
              <div className="flex items-center gap-2.5">
                <Image className="w-4 h-4 text-foreground/40" />
                <div>
                  <p className="text-sm font-medium">Grafika wyróżniająca</p>
                  <p className="text-xs text-foreground/55">
                    {featuredImageSet ? 'Ustawiona · hero-ai-marketing.png' : 'Nie ustawiona'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5"
                onClick={() => setFeaturedImageSet(o => !o)}>
                {featuredImageSet ? 'Zmień' : 'Dodaj'}
              </Button>
            </div>

            <Separator />

            {/* Tryb publikacji */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Publikacja</label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { id: 'publish',  label: 'Opublikuj',  desc: 'Natychmiast', icon: Globe },
                  { id: 'schedule', label: 'Zaplanuj',   desc: 'Wybierz datę', icon: Calendar },
                  { id: 'draft',    label: 'Szkic WP',   desc: 'Do dalszej edycji', icon: FileText },
                ] as { id: PublishMode; label: string; desc: string; icon: React.ComponentType<{className?:string}> }[]).map(opt => (
                  <button key={opt.id} onClick={() => setPublishMode(opt.id)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all',
                      publishMode === opt.id
                        ? 'border-foreground bg-muted/30 font-medium'
                        : 'border-border hover:border-foreground/30'
                    )}>
                    <opt.icon className={cn('w-4 h-4', publishMode === opt.id ? 'text-foreground' : 'text-foreground/40')} />
                    <span className="text-xs font-medium">{opt.label}</span>
                    <span className="text-[10px] text-foreground/50">{opt.desc}</span>
                  </button>
                ))}
              </div>

              {publishMode === 'schedule' && (
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs text-foreground/55">Data</label>
                    <Input type="date" value={scheduleDate}
                      onChange={e => setScheduleDate(e.target.value)} className="h-9 text-sm" />
                  </div>
                  <div className="w-28 space-y-1">
                    <label className="text-xs text-foreground/55">Godzina</label>
                    <Input type="time" value={scheduleTime}
                      onChange={e => setScheduleTime(e.target.value)} className="h-9 text-sm" />
                  </div>
                </div>
              )}
            </div>

          </div>
        </ScrollArea>

        {/* Footer CTA */}
        <div className="px-6 py-4 border-t shrink-0 bg-muted/20">
          {exported ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-medium text-emerald-700">Wysłano do WordPress!</p>
                  <p className="text-xs text-foreground/55">
                    {publishMode === 'publish' ? 'Artykuł opublikowany' :
                     publishMode === 'schedule' ? `Zaplanowany na ${scheduleDate} ${scheduleTime}` :
                     'Zapisany jako szkic'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5 h-9">
                <ExternalLink className="w-3.5 h-3.5" /> Otwórz w WP
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex-none h-10" onClick={onClose}>Anuluj</Button>
              <Button className="flex-1 h-10 gap-2" onClick={handleExport} disabled={exporting || wpStatus !== 'connected'}>
                {exporting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Wysyłam {blockCount} bloków...</>
                ) : publishMode === 'publish' ? (
                  <><Globe className="w-4 h-4" /> Opublikuj w WordPress</>
                ) : publishMode === 'schedule' ? (
                  <><Calendar className="w-4 h-4" /> Zaplanuj publikację</>
                ) : (
                  <><FileText className="w-4 h-4" /> Zapisz jako szkic</>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
