import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  X, Globe, CheckCircle2, AlertCircle, Loader2, Calendar,
  Tag, Image, ChevronDown, ChevronRight, ExternalLink,
  FileText, Code2, List, Quote, Heading1, Heading2,
  Check, Zap, RefreshCw, Search, Share2, Star,
  BarChart2, Layout, Link2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PublishMode = 'publish' | 'schedule' | 'draft'

const BLOCK_MAP = [
  { from: 'Nagłówek H1', to: 'core/heading (level 1)', icon: Heading1 },
  { from: 'Nagłówek H2', to: 'core/heading (level 2)', icon: Heading2 },
  { from: 'Akapit',      to: 'core/paragraph',         icon: FileText },
  { from: 'Lista',       to: 'core/list',              icon: List },
  { from: 'Cytat',       to: 'core/quote',             icon: Quote },
  { from: 'Obraz',       to: 'core/image',             icon: Image, note: 'Wgrywany przez WP Media API' },
  { from: 'HTML',        to: 'core/html',              icon: Code2, note: 'Wklejany bez zmian' },
  { from: 'Blok AI',     to: 'core/paragraph',         icon: Zap, note: 'Konwertowany do akapitu' },
]

const WP_CATEGORIES = ['AI & Automatyzacja', 'Content Marketing', 'E-commerce', 'SEO']
const WP_TAGS = ['AI', 'content', 'marketing', '2025']

// ── Rank Math SEO Panel ────────────────────────────────────────────────────

function RankMathPanel({ values, onChange }: {
  values: Record<string, string>
  onChange: (k: string, v: string) => void
}) {
  const [activeTab, setActiveTab] = React.useState<'general' | 'social' | 'schema'>('general')

  const field = (key: string, label: string, placeholder: string, type: 'input' | 'textarea' = 'input', maxLen?: number) => (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium">{label}</label>
        {maxLen && (
          <span className={cn('text-[10px] tabular-nums', (values[key]?.length || 0) > maxLen ? 'text-red-500' : 'text-muted-foreground')}>
            {values[key]?.length || 0}/{maxLen}
          </span>
        )}
      </div>
      {type === 'textarea' ? (
        <textarea value={values[key] || ''} onChange={e => onChange(key, e.target.value)}
          placeholder={placeholder} rows={2}
          className="w-full text-sm border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground" />
      ) : (
        <Input value={values[key] || ''} onChange={e => onChange(key, e.target.value)}
          placeholder={placeholder} className="h-9 text-sm" />
      )}
    </div>
  )

  return (
    <div className="border rounded-xl overflow-hidden">
      {/* Rank Math header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-orange-50 border-b border-orange-100">
        <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center">
          <BarChart2 className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-semibold text-orange-800">Rank Math SEO</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">82</span>
          </div>
          <span className="text-xs text-orange-700">Score</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {[
          { id: 'general', label: 'Ogólne', icon: Search },
          { id: 'social',  label: 'Social',  icon: Share2 },
          { id: 'schema',  label: 'Schema',  icon: Layout },
        ].map(tab => {
          const Icon = tab.icon
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-colors border-b-2',
                activeTab === tab.id ? 'border-orange-500 text-orange-700 font-medium' : 'border-transparent text-muted-foreground hover:text-foreground')}>
              <Icon className="w-3.5 h-3.5" />{tab.label}
            </button>
          )
        })}
      </div>

      <div className="px-4 py-4 space-y-4">
        {activeTab === 'general' && (
          <>
            {/* Focus Keyword */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-orange-500" />
                Fraza kluczowa (Focus Keyword)
              </label>
              <Input value={values['rm_focus'] || ''} onChange={e => onChange('rm_focus', e.target.value)}
                placeholder="np. AI content marketing 2025" className="h-9 text-sm" />
              <p className="text-[10px] text-muted-foreground">Rank Math sprawdza czy fraza pojawia się w tytule, URL, meta opisie i treści.</p>
            </div>

            {/* SEO Title */}
            {field('rm_title', 'SEO Title', 'Jak AI Zmienia Content Marketing w 2025 Roku', 'input', 60)}
            <div className="text-[10px] text-muted-foreground -mt-2 px-1">
              Podgląd SERP: <span className="text-blue-600">{values['rm_title'] || 'Jak AI Zmienia Content Marketing w 2025 Roku'}</span>
            </div>

            {/* Meta Description */}
            {field('rm_desc', 'Meta Description', 'Odkryj jak sztuczna inteligencja rewolucjonizuje content marketing. Praktyczny przewodnik z przykładami.', 'textarea', 160)}

            {/* Canonical URL */}
            {field('rm_canonical', 'Canonical URL', 'https://twojadomena.pl/jak-ai-zmienia-content-marketing')}

            {/* Robots */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Robots Meta</label>
              <div className="flex flex-wrap gap-2">
                {['index', 'follow', 'noindex', 'nofollow', 'noarchive', 'nosnippet'].map(r => (
                  <button key={r} onClick={() => {
                    const current = (values['rm_robots'] || 'index,follow').split(',')
                    const opp = r.startsWith('no') ? r.slice(2) : 'no' + r
                    const filtered = current.filter(x => x !== opp && x !== r)
                    onChange('rm_robots', [...filtered, r].join(','))
                  }}
                    className={cn('text-[10px] px-2 py-1 rounded border transition-colors',
                      (values['rm_robots'] || 'index,follow').includes(r)
                        ? 'bg-foreground text-background border-foreground font-medium'
                        : 'border-border text-muted-foreground hover:border-foreground/30')}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'social' && (
          <>
            {/* OG Title */}
            {field('og_title', 'OG Title (Facebook / LinkedIn)', 'Jak AI Zmienia Content Marketing w 2025 Roku')}
            {field('og_desc', 'OG Description', 'Praktyczny przewodnik po AI w content marketingu', 'textarea')}

            {/* OG Image */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium">OG Image</label>
              <div className="border-2 border-dashed rounded-xl p-4 text-center hover:border-foreground/30 cursor-pointer transition-colors"
                onClick={() => onChange('og_image', 'https://example.com/og-image.jpg')}>
                {values['og_image'] ? (
                  <div className="space-y-2">
                    <div className="w-full h-28 rounded-lg bg-muted flex items-center justify-center">
                      <Image className="w-8 h-8 text-muted-foreground/40" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{values['og_image']}</p>
                  </div>
                ) : (
                  <>
                    <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground">Kliknij aby dodać obraz OG (1200×630px)</p>
                  </>
                )}
              </div>
            </div>

            {/* Twitter Card */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Twitter Card</label>
              <select value={values['tw_card'] || 'summary_large_image'}
                onChange={e => onChange('tw_card', e.target.value)}
                className="w-full text-sm border rounded-lg px-3 py-2 bg-background">
                <option value="summary_large_image">Summary Large Image</option>
                <option value="summary">Summary</option>
              </select>
            </div>
            {field('tw_title', 'Twitter Title', 'Jak AI Zmienia Content Marketing')}
          </>
        )}

        {activeTab === 'schema' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Typ Schema</label>
              <select value={values['schema_type'] || 'Article'}
                onChange={e => onChange('schema_type', e.target.value)}
                className="w-full text-sm border rounded-lg px-3 py-2 bg-background">
                <option value="Article">Article</option>
                <option value="BlogPosting">BlogPosting</option>
                <option value="HowTo">HowTo</option>
                <option value="FAQPage">FAQPage</option>
                <option value="NewsArticle">NewsArticle</option>
                <option value="Review">Review</option>
                <option value="Product">Product</option>
              </select>
            </div>
            {field('schema_author', 'Autor', 'Artur Kamiński')}
            {field('schema_org', 'Organizacja / Marka', 'Simplimo')}
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Data publikacji</label>
              <Input type="date" value={values['schema_date'] || new Date().toISOString().slice(0,10)}
                onChange={e => onChange('schema_date', e.target.value)} className="h-9 text-sm" />
            </div>
            {/* FAQ pairs */}
            <div className="space-y-2">
              <label className="text-xs font-medium">FAQ Schema (opcjonalnie)</label>
              <div className="space-y-2 border rounded-lg p-3">
                {[1,2].map(n => (
                  <div key={n} className="space-y-1">
                    <Input placeholder={`Pytanie ${n}`} className="h-8 text-xs" />
                    <textarea placeholder={`Odpowiedź ${n}`} rows={1}
                      className="w-full text-xs border rounded px-2 py-1.5 resize-none outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full h-7 text-xs">+ Dodaj pytanie</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Główny panel ───────────────────────────────────────────────────────────

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
  const [publishMode, setPublishMode] = React.useState<PublishMode>('publish')
  const [scheduleDate, setScheduleDate] = React.useState('2025-04-15')
  const [scheduleTime, setScheduleTime] = React.useState('09:00')
  const [selectedCategories, setSelectedCategories] = React.useState(['AI & Automatyzacja'])
  const [selectedTags, setSelectedTags] = React.useState(['AI', 'content'])
  const [showBlockMap, setShowBlockMap] = React.useState(false)
  const [exporting, setExporting] = React.useState(false)
  const [exported, setExported] = React.useState(false)
  const [seoValues, setSeoValues] = React.useState<Record<string, string>>({
    rm_robots: 'index,follow', schema_type: 'Article'
  })
  const [featuredImage, setFeaturedImage] = React.useState<string | null>(null)
  const [excerpt, setExcerpt] = React.useState('')

  const onSeoChange = (k: string, v: string) => setSeoValues(p => ({ ...p, [k]: v }))
  const toggleCat = (c: string) => setSelectedCategories(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])
  const toggleTag = (t: string) => setSelectedTags(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => { setExporting(false); setExported(true) }, 2200)
  }

  return (
    <div className="bg-background rounded-2xl shadow-2xl border w-full max-w-2xl mx-4 flex flex-col max-h-[90vh]"
      onClick={e => e.stopPropagation()}>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Eksport do WordPress</h2>
            <p className="text-xs text-foreground/60 mt-0.5 truncate max-w-xs">{articleTitle}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-foreground/40 hover:text-foreground transition-colors p-1.5 hover:bg-muted rounded-lg">
          <X className="w-4 h-4" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-6 py-5 space-y-5">

          {/* WP Connection status */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border bg-emerald-50 border-emerald-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-sm font-medium">Połączono z animails.pl</p>
                <p className="text-xs text-foreground/60">WordPress REST API · admin</p>
              </div>
            </div>
            <button className="text-xs text-foreground/55 hover:text-foreground flex items-center gap-1">
              <RefreshCw className="w-3 h-3" /> Zmień
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Słów', value: wordCount.toLocaleString() },
              { label: 'Bloków Gutenberga', value: blockCount },
              { label: 'Obrazów', value: 1 },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/30 rounded-xl p-3 text-center">
                <p className="text-lg font-semibold">{value}</p>
                <p className="text-[10px] text-foreground/55 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Block map */}
          <div>
            <button onClick={() => setShowBlockMap(o => !o)}
              className="flex items-center gap-2 text-sm font-medium w-full text-left">
              {showBlockMap ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Mapowanie bloków → Gutenberg
            </button>
            {showBlockMap && (
              <div className="mt-3 border rounded-xl overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 flex text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">
                  <span className="flex-1">Manuscript</span><span className="flex-1">Gutenberg</span>
                </div>
                {BLOCK_MAP.map(b => (
                  <div key={b.from} className="flex items-center px-4 py-2 border-t gap-4">
                    <div className="flex-1 flex items-center gap-2 text-xs">
                      <b.icon className="w-3.5 h-3.5 text-foreground/40" />{b.from}
                    </div>
                    <ChevronRight className="w-3 h-3 text-foreground/25" />
                    <div className="flex-1 text-xs">
                      <span className="font-mono text-blue-600">{b.to}</span>
                      {b.note && <p className="text-[10px] text-foreground/50">{b.note}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Featured Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-foreground/50" />
              Grafika wyróżniająca
            </label>
            <div className={cn(
              'border-2 rounded-xl overflow-hidden transition-all cursor-pointer',
              featuredImage ? 'border-foreground/20' : 'border-dashed hover:border-foreground/30'
            )} onClick={() => !featuredImage && setFeaturedImage('placeholder')}>
              {featuredImage ? (
                <div className="relative">
                  <div className="w-full h-36 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-10 h-10 mx-auto mb-2 text-blue-400" strokeWidth={1.5} />
                      <p className="text-xs text-blue-600 font-medium">hero-ai-marketing.png</p>
                      <p className="text-[10px] text-blue-500">1200 × 630 · 284 KB</p>
                    </div>
                  </div>
                  <div className="px-4 py-2.5 border-t flex items-center justify-between">
                    <div className="space-y-1 flex-1 mr-3">
                      <Input placeholder="Alt text grafiki" defaultValue="Schemat działania agentów AI w e-commerce" className="h-7 text-xs" />
                    </div>
                    <button onClick={e => { e.stopPropagation(); setFeaturedImage(null) }}
                      className="text-xs text-red-500 hover:text-red-600 shrink-0">Usuń</button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">Kliknij aby dodać grafikę wyróżniającą</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">Zalecane: 1200×630px</p>
                </div>
              )}
            </div>
          </div>

          {/* Categories & Tags */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-foreground/50" />Kategorie
            </label>
            <div className="flex flex-wrap gap-2">
              {WP_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => toggleCat(cat)}
                  className={cn('text-xs px-3 py-1.5 rounded-full border transition-colors',
                    selectedCategories.includes(cat)
                      ? 'bg-foreground text-background border-foreground font-medium'
                      : 'border-border text-foreground/65 hover:border-foreground/40')}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tagi</label>
            <div className="flex flex-wrap gap-2">
              {WP_TAGS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={cn('text-xs px-2.5 py-1 rounded-md border transition-colors',
                    selectedTags.includes(tag)
                      ? 'bg-foreground text-background border-foreground'
                      : 'border-border text-foreground/65 hover:border-foreground/40')}>
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium flex items-center justify-between">
              Excerpt
              <span className="text-xs text-foreground/40 font-normal">{excerpt.length}/160</span>
            </label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value.slice(0,160))}
              placeholder="Krótki opis widoczny na listach postów..."
              rows={2} className="w-full text-sm border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground" />
          </div>

          {/* Rank Math */}
          <RankMathPanel values={seoValues} onChange={onSeoChange} />

          <Separator />

          {/* Publish mode */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Publikacja</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'publish',  label: 'Opublikuj',  desc: 'Natychmiast', icon: Globe },
                { id: 'schedule', label: 'Zaplanuj',   desc: 'Wybierz datę', icon: Calendar },
                { id: 'draft',    label: 'Szkic WP',   desc: 'Do edycji',    icon: FileText },
              ] as const).map(opt => (
                <button key={opt.id} onClick={() => setPublishMode(opt.id)}
                  className={cn('flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all',
                    publishMode === opt.id ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/30')}>
                  <opt.icon className={cn('w-4 h-4', publishMode === opt.id ? 'text-foreground' : 'text-foreground/40')} />
                  <span className="text-xs font-medium">{opt.label}</span>
                  <span className="text-[10px] text-foreground/50">{opt.desc}</span>
                </button>
              ))}
            </div>
            {publishMode === 'schedule' && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-foreground/55 mb-1 block">Data</label>
                  <Input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="h-9 text-sm" />
                </div>
                <div className="w-28">
                  <label className="text-xs text-foreground/55 mb-1 block">Godzina</label>
                  <Input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} className="h-9 text-sm" />
                </div>
              </div>
            )}
          </div>

        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="px-6 py-4 border-t shrink-0 bg-muted/20">
        {exported ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm font-medium text-emerald-700">
                  {publishMode === 'publish' ? 'Opublikowano!' : publishMode === 'schedule' ? 'Zaplanowano!' : 'Zapisano jako szkic'}
                </p>
                <p className="text-xs text-foreground/55">animails.pl/jak-ai-zmienia-content-marketing</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 h-9">
              <ExternalLink className="w-3.5 h-3.5" /> Otwórz
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button variant="outline" className="h-10" onClick={onClose}>Anuluj</Button>
            <Button className="flex-1 h-10 gap-2" onClick={handleExport} disabled={exporting}>
              {exporting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Wysyłam...</>
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
  )
}
