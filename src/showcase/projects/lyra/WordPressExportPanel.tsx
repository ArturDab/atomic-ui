import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Globe, CheckCircle2, Loader2, Calendar, Tag, Image,
  ChevronDown, ChevronRight, ExternalLink, FileText,
  Code2, List, Quote, Heading1, Heading2, Check, Zap,
  RefreshCw, BarChart2, Share2, Layout, Star, Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PublishMode = 'publish' | 'schedule' | 'draft'

const BLOCK_MAP = [
  { from: 'Nagłówek H1', to: 'core/heading (level 1)', icon: Heading1 },
  { from: 'Nagłówek H2', to: 'core/heading (level 2)', icon: Heading2 },
  { from: 'Akapit',      to: 'core/paragraph',         icon: FileText },
  { from: 'Lista',       to: 'core/list',              icon: List },
  { from: 'Cytat',       to: 'core/quote',             icon: Quote },
  { from: 'Obraz',       to: 'core/image (+ Media API)', icon: Image },
  { from: 'HTML',        to: 'core/html',              icon: Code2 },
  { from: 'Blok AI',     to: 'core/paragraph',         icon: Zap },
]

const WP_CATEGORIES = ['AI & Automatyzacja', 'Content Marketing', 'E-commerce', 'SEO']
const WP_TAGS = ['AI', 'content', 'marketing', '2025']

// ── Rank Math SEO ─────────────────────────────────────────────────────────────

function RankMath() {
  const [tab, setTab] = React.useState<'general'|'social'|'schema'>('general')
  const [vals, setVals] = React.useState<Record<string,string>>({
    rm_robots: 'index,follow', schema_type: 'Article',
    schema_date: new Date().toISOString().slice(0,10),
  })
  const set = (k: string, v: string) => setVals(p => ({...p, [k]: v}))

  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-orange-50 border-b border-orange-100">
        <div className="w-5 h-5 rounded bg-orange-500 flex items-center justify-center">
          <BarChart2 className="w-3 h-3 text-white" />
        </div>
        <span className="text-sm font-semibold text-orange-800">Rank Math SEO</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-[9px] text-white font-bold">82</span>
          </div>
          <span className="text-xs text-orange-600">Wynik SEO</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {([
          { id: 'general', label: 'Ogólne',  Icon: Search },
          { id: 'social',  label: 'Social',   Icon: Share2 },
          { id: 'schema',  label: 'Schema',   Icon: Layout },
        ] as const).map(({id, label, Icon}) => (
          <button key={id} onClick={() => setTab(id)}
            className={cn('flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs border-b-2 transition-colors',
              tab === id ? 'border-orange-500 text-orange-700 font-medium' : 'border-transparent text-muted-foreground hover:text-foreground')}>
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-4">
        {tab === 'general' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-orange-500" />
                Fraza kluczowa (Focus Keyword)
              </label>
              <Input value={vals.rm_focus||''} onChange={e=>set('rm_focus',e.target.value)}
                placeholder="np. AI content marketing 2025" className="h-9 text-sm" />
              <p className="text-[10px] text-muted-foreground">Rank Math sprawdza obecność frazy w tytule, URL, opisie i treści.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex justify-between">
                SEO Title
                <span className={cn('text-[10px]', (vals.rm_title||'').length>60?'text-red-500':'text-muted-foreground')}>
                  {(vals.rm_title||'').length}/60
                </span>
              </label>
              <Input value={vals.rm_title||''} onChange={e=>set('rm_title',e.target.value)}
                placeholder="Jak AI Zmienia Content Marketing w 2025 Roku" className="h-9 text-sm" />
              <p className="text-[10px] text-blue-600 truncate">
                ▶ {vals.rm_title || 'Jak AI Zmienia Content Marketing w 2025 Roku'}
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex justify-between">
                Meta Description
                <span className={cn('text-[10px]', (vals.rm_desc||'').length>160?'text-red-500':'text-muted-foreground')}>
                  {(vals.rm_desc||'').length}/160
                </span>
              </label>
              <textarea value={vals.rm_desc||''} onChange={e=>set('rm_desc',e.target.value)} rows={2}
                placeholder="Odkryj jak AI rewolucjonizuje content marketing. Praktyczny przewodnik z przykładami."
                className="w-full text-sm border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Canonical URL</label>
              <Input value={vals.canonical||''} onChange={e=>set('canonical',e.target.value)}
                placeholder="https://twojadomena.pl/slug" className="h-9 text-sm" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Robots Meta</label>
              <div className="flex flex-wrap gap-1.5">
                {['index','follow','noindex','nofollow','noarchive','nosnippet'].map(r => (
                  <button key={r} onClick={() => {
                    const cur = (vals.rm_robots||'index,follow').split(',').filter(Boolean)
                    const opp = r.startsWith('no') ? r.slice(2) : 'no'+r
                    set('rm_robots', [...cur.filter(x=>x!==opp&&x!==r), r].join(','))
                  }}
                    className={cn('text-[10px] px-2.5 py-1 rounded-md border transition-colors',
                      (vals.rm_robots||'index,follow').split(',').includes(r)
                        ? 'bg-foreground text-background border-foreground font-medium'
                        : 'border-border text-foreground/65 hover:border-foreground/40')}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === 'social' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">OG Image (1200×630px)</label>
              <div className={cn('border-2 rounded-xl overflow-hidden cursor-pointer transition-all',
                vals.og_image ? 'border-foreground/20' : 'border-dashed hover:border-foreground/30')}
                onClick={() => set('og_image', 'placeholder')}>
                {vals.og_image ? (
                  <div>
                    <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-7 h-7 mx-auto mb-1 text-blue-400" strokeWidth={1.5} />
                        <p className="text-[10px] text-blue-600">og-image.png · 1200×630</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <Image className="w-6 h-6 mx-auto mb-1 text-muted-foreground/40" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground">Dodaj obraz OG</p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">OG Title</label>
              <Input value={vals.og_title||''} onChange={e=>set('og_title',e.target.value)}
                placeholder="Jak AI Zmienia Content Marketing" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">OG Description</label>
              <textarea value={vals.og_desc||''} onChange={e=>set('og_desc',e.target.value)} rows={2}
                placeholder="Krótki opis dla Facebooka i LinkedIn"
                className="w-full text-sm border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Twitter Card</label>
              <select value={vals.tw_card||'summary_large_image'} onChange={e=>set('tw_card',e.target.value)}
                className="w-full text-sm border rounded-lg px-3 py-2 bg-background">
                <option value="summary_large_image">Summary Large Image</option>
                <option value="summary">Summary</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Twitter Title</label>
              <Input value={vals.tw_title||''} onChange={e=>set('tw_title',e.target.value)}
                placeholder="Jak AI Zmienia Content Marketing" className="h-9 text-sm" />
            </div>
          </>
        )}

        {tab === 'schema' && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Typ Schema.org</label>
              <select value={vals.schema_type||'Article'} onChange={e=>set('schema_type',e.target.value)}
                className="w-full text-sm border rounded-lg px-3 py-2 bg-background">
                {['Article','BlogPosting','HowTo','FAQPage','NewsArticle','Review','Product'].map(t=>(
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Autor</label>
              <Input value={vals.schema_author||''} onChange={e=>set('schema_author',e.target.value)}
                placeholder="Artur Kamiński" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Organizacja</label>
              <Input value={vals.schema_org||''} onChange={e=>set('schema_org',e.target.value)}
                placeholder="Simplimo" className="h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Data publikacji</label>
              <Input type="date" value={vals.schema_date||''} onChange={e=>set('schema_date',e.target.value)} className="h-9 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium">FAQ Schema (opcjonalnie)</label>
              <div className="border rounded-lg p-3 space-y-2">
                {[1,2].map(n=>(
                  <div key={n} className="space-y-1">
                    <Input placeholder={`Pytanie ${n}`} className="h-8 text-xs" />
                    <textarea placeholder={`Odpowiedź ${n}`} rows={1}
                      className="w-full text-xs border rounded px-2 py-1.5 resize-none outline-none focus:ring-1 focus:ring-ring" />
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full h-7 text-xs gap-1">
                  + Dodaj pytanie
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Główny panel ──────────────────────────────────────────────────────────────

export default function WordPressExportPanel() {
  const [publishMode, setPublishMode] = React.useState<PublishMode>('publish')
  const [scheduleDate, setScheduleDate] = React.useState('2025-04-15')
  const [scheduleTime, setScheduleTime] = React.useState('09:00')
  const [selCats, setSelCats] = React.useState(['AI & Automatyzacja'])
  const [selTags, setSelTags] = React.useState(['AI', 'content'])
  const [showBlockMap, setShowBlockMap] = React.useState(false)
  const [exporting, setExporting] = React.useState(false)
  const [exported, setExported] = React.useState(false)
  const [featuredImage, setFeaturedImage] = React.useState(false)
  const [excerpt, setExcerpt] = React.useState('')

  const toggleCat = (c: string) => setSelCats(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c])
  const toggleTag = (t: string) => setSelTags(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t])

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
          <Globe className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h1 className="text-base font-semibold">Eksport do WordPress</h1>
          <p className="text-xs text-foreground/60">Jak AI Zmienia Content Marketing w 2025 Roku</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-card text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            animails.pl · WordPress REST API
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Zmień
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT COLUMN: Content settings */}
        <div className="space-y-5">
          <div className="bg-card border rounded-2xl p-5 space-y-5">
            <h2 className="text-sm font-semibold">Treść i metadane</h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[{l:'Słów',v:'2 840'},{l:'Bloków',v:'13'},{l:'Obrazów',v:'1'}].map(({l,v})=>(
                <div key={l} className="bg-muted/30 rounded-xl p-3 text-center">
                  <p className="text-lg font-semibold">{v}</p>
                  <p className="text-[10px] text-foreground/55 mt-0.5">{l}</p>
                </div>
              ))}
            </div>

            {/* Block map */}
            <div>
              <button onClick={()=>setShowBlockMap(o=>!o)}
                className="flex items-center gap-2 text-sm font-medium w-full text-left">
                {showBlockMap ? <ChevronDown className="w-4 h-4"/>:<ChevronRight className="w-4 h-4"/>}
                Mapowanie bloków → Gutenberg
              </button>
              {showBlockMap && (
                <div className="mt-3 border rounded-xl overflow-hidden">
                  <div className="bg-muted/30 px-4 py-1.5 flex text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">
                    <span className="flex-1">Lyra</span><span className="flex-1">Gutenberg</span>
                  </div>
                  {BLOCK_MAP.map(b=>(
                    <div key={b.from} className="flex items-center px-4 py-2 border-t gap-3 text-xs">
                      <div className="flex items-center gap-1.5 flex-1 text-foreground/70">
                        <b.icon className="w-3.5 h-3.5 text-foreground/40 shrink-0"/>{b.from}
                      </div>
                      <ChevronRight className="w-3 h-3 text-foreground/25 shrink-0"/>
                      <span className="flex-1 font-mono text-blue-600 text-[11px]">{b.to}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-foreground/50"/>Grafika wyróżniająca
              </label>
              <div className={cn('border-2 rounded-xl overflow-hidden cursor-pointer transition-all',
                featuredImage?'border-foreground/20':'border-dashed hover:border-foreground/30')}
                onClick={()=>!featuredImage&&setFeaturedImage(true)}>
                {featuredImage ? (
                  <div>
                    <div className="w-full h-36 bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-10 h-10 mx-auto mb-2 text-blue-400" strokeWidth={1.5}/>
                        <p className="text-xs text-blue-600 font-medium">hero-ai-marketing.png</p>
                        <p className="text-[10px] text-blue-500">1200 × 630 · 284 KB</p>
                      </div>
                    </div>
                    <div className="px-4 py-2.5 border-t bg-card flex items-center gap-3">
                      <Input placeholder="Alt text: Schemat agentów AI w e-commerce" className="h-7 text-xs flex-1" defaultValue="Schemat działania agentów AI w e-commerce" />
                      <button onClick={e=>{e.stopPropagation();setFeaturedImage(false)}}
                        className="text-xs text-red-500 hover:text-red-600 shrink-0 whitespace-nowrap">Usuń</button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <Image className="w-8 h-8 mx-auto mb-2 text-muted-foreground/40" strokeWidth={1.5}/>
                    <p className="text-sm text-muted-foreground">Kliknij aby dodać grafikę wyróżniającą</p>
                    <p className="text-xs text-muted-foreground/60 mt-0.5">Zalecane: 1200×630px</p>
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-foreground/50"/>Kategorie
              </label>
              <div className="flex flex-wrap gap-2">
                {WP_CATEGORIES.map(cat=>(
                  <button key={cat} onClick={()=>toggleCat(cat)}
                    className={cn('text-xs px-3 py-1.5 rounded-full border transition-colors',
                      selCats.includes(cat)?'bg-foreground text-background border-foreground font-medium':'border-border text-foreground/65 hover:border-foreground/40')}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tagi</label>
              <div className="flex flex-wrap gap-2">
                {WP_TAGS.map(tag=>(
                  <button key={tag} onClick={()=>toggleTag(tag)}
                    className={cn('text-xs px-2.5 py-1 rounded-md border transition-colors',
                      selTags.includes(tag)?'bg-foreground text-background border-foreground':'border-border text-foreground/65 hover:border-foreground/40')}>
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex justify-between">
                Excerpt
                <span className="text-xs text-foreground/40 font-normal">{excerpt.length}/160</span>
              </label>
              <textarea value={excerpt} onChange={e=>setExcerpt(e.target.value.slice(0,160))} rows={2}
                placeholder="Krótki opis widoczny na listach postów..."
                className="w-full text-sm border rounded-lg px-3 py-2 resize-none outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground"/>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: SEO + Publish */}
        <div className="space-y-5">
          {/* Rank Math */}
          <RankMath />

          {/* Publish mode */}
          <div className="bg-card border rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">Publikacja</h2>
            <div className="grid grid-cols-3 gap-2">
              {([
                {id:'publish'  as const, label:'Opublikuj', desc:'Natychmiast', Icon:Globe},
                {id:'schedule' as const, label:'Zaplanuj',  desc:'Wybierz datę', Icon:Calendar},
                {id:'draft'    as const, label:'Szkic WP',  desc:'Do edycji',   Icon:FileText},
              ]).map(({id,label,desc,Icon})=>(
                <button key={id} onClick={()=>setPublishMode(id)}
                  className={cn('flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all',
                    publishMode===id?'border-foreground bg-muted/30':'border-border hover:border-foreground/30')}>
                  <Icon className={cn('w-4 h-4',publishMode===id?'text-foreground':'text-foreground/40')}/>
                  <span className="text-xs font-medium">{label}</span>
                  <span className="text-[10px] text-foreground/50">{desc}</span>
                </button>
              ))}
            </div>
            {publishMode==='schedule' && (
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-foreground/55 mb-1 block">Data</label>
                  <Input type="date" value={scheduleDate} onChange={e=>setScheduleDate(e.target.value)} className="h-9 text-sm"/>
                </div>
                <div className="w-28">
                  <label className="text-xs text-foreground/55 mb-1 block">Godzina</label>
                  <Input type="time" value={scheduleTime} onChange={e=>setScheduleTime(e.target.value)} className="h-9 text-sm"/>
                </div>
              </div>
            )}

            {exported ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600"/>
                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      {publishMode==='publish'?'Opublikowano!':publishMode==='schedule'?'Zaplanowano!':'Zapisano szkic'}
                    </p>
                    <p className="text-xs text-emerald-600/70">animails.pl/jak-ai-zmienia-content-marketing</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-1.5 h-8 border-emerald-300">
                  <ExternalLink className="w-3.5 h-3.5"/> Otwórz
                </Button>
              </div>
            ) : (
              <Button className="w-full h-10 gap-2" onClick={()=>{setExporting(true);setTimeout(()=>{setExporting(false);setExported(true)},2200)}} disabled={exporting}>
                {exporting ? (
                  <><Loader2 className="w-4 h-4 animate-spin"/> Wysyłam 13 bloków...</>
                ) : publishMode==='publish' ? (
                  <><Globe className="w-4 h-4"/> Opublikuj w WordPress</>
                ) : publishMode==='schedule' ? (
                  <><Calendar className="w-4 h-4"/> Zaplanuj publikację</>
                ) : (
                  <><FileText className="w-4 h-4"/> Zapisz jako szkic</>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
