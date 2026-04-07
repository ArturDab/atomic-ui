/**
 * AI Studio 2.0
 *
 * Kluczowe zmiany vs v1:
 * 1. Brak galerii kart – zamiast tego command palette z wyszukiwarką na środku
 * 2. Historia nie jest osobną kolumną – jest stroną startową (ostatnie generacje jako karty)
 * 3. Edytor wysuwa się bez zmiany URL – panel formularza slide-in z lewej
 * 4. Generatory jako lista z pogrupowanym menu, nie siatka kart
 * 5. "Szybki start" zamiast "Polecane" – 3 najczęstsze akcje jako duże przyciski
 */
import * as React from 'react'
import { CP2Sidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  Search, FileText, Mail, Share2, AlignLeft, Languages,
  SpellCheck2, HelpCircle, ShoppingBag, Wand2, Clock,
  Hash, ArrowRight, X, Play, ChevronDown, RotateCcw,
  Copy, Coins, BookMarked, Video, Newspaper, Megaphone,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const QUICK_START = [
  { icon: FileText, label: 'Artykuł blogowy', desc: 'SEO · długoformatowy', slug: 'article' },
  { icon: Mail,     label: 'Email marketingowy', desc: 'Kampanie · CTA', slug: 'email' },
  { icon: Share2,   label: 'Post social media', desc: 'LinkedIn · Instagram · X', slug: 'social' },
]

const GROUPS = [
  { label: 'Tworzenie treści', items: [
    { icon: FileText,    name: 'Artykuł blogowy',   slug: 'article' },
    { icon: ShoppingBag, name: 'Opis produktu',     slug: 'product' },
    { icon: Mail,        name: 'Email marketingowy',slug: 'email' },
    { icon: Newspaper,   name: 'Newsletter',        slug: 'newsletter' },
    { icon: Share2,      name: 'Post social media', slug: 'social' },
    { icon: Video,       name: 'Skrypt wideo',      slug: 'script' },
    { icon: Megaphone,   name: 'Kopia reklamowa',   slug: 'ad' },
  ]},
  { label: 'Analiza i edycja', items: [
    { icon: AlignLeft,   name: 'Streszczenie',       slug: 'summary' },
    { icon: SpellCheck2, name: 'Korekta i redakcja', slug: 'proofread' },
    { icon: RotateCcw,   name: 'Przepisanie tekstu', slug: 'rewrite' },
  ]},
  { label: 'Językowe', items: [
    { icon: Languages,   name: 'Tłumaczenie',         slug: 'translate' },
  ]},
  { label: 'SEO i techniczne', items: [
    { icon: Search,      name: 'SEO meta tagi',  slug: 'seo' },
    { icon: HelpCircle,  name: 'Generator FAQ',  slug: 'faq' },
  ]},
]

const HISTORY = [
  { id: '1', type: 'Artykuł blogowy', topic: 'Jak stworzyć skuteczny zespół agentów AI?', words: 980, date: 'dziś, 14:22' },
  { id: '2', type: 'Post social media', topic: 'Launch Animails – nowa aplikacja dla miłośników zwierząt', words: 220, date: 'dziś, 11:05' },
  { id: '3', type: 'Email marketingowy', topic: 'Newsletter Q1 – podsumowanie wyników', words: 540, date: 'wczoraj' },
  { id: '4', type: 'SEO meta tagi', topic: 'Strona główna Beezu.pl', words: 160, date: '18 mar' },
]

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Artykuł blogowy': FileText,
  'Post social media': Share2,
  'Email marketingowy': Mail,
  'SEO meta tagi': Search,
  'Streszczenie': AlignLeft,
  'Tłumaczenie': Languages,
}

const CONTENT = [
  { type: 'h1', text: 'Jak Stworzyć Skuteczny Zespół Agentów AI?' },
  { type: 'p',  text: 'Tworzenie skutecznego zespołu agentów AI to wyzwanie, które wymaga starannego planowania. Agenci AI mogą przekształcić sposób funkcjonowania firm, zwiększając efektywność i wspierając innowacje.' },
  { type: 'h2', text: '1. Zrozum cel i zakres działań' },
  { type: 'p',  text: 'Przed rozpoczęciem budowania zespołu, kluczowe jest zrozumienie ich roli:' },
  { type: 'li', text: '**Cele biznesowe:** Upewnij się, że cele agentów są zgodne ze strategiami firmy.' },
  { type: 'li', text: '**Identyfikacja zadań:** Jasno określ, jakie zadania agenci będą realizować.' },
  { type: 'h2', text: '2. Wybór odpowiednich narzędzi' },
  { type: 'p',  text: 'Agenci AI wymagają odpowiedniego zaplecza technologicznego.' },
]

export default function AIStudioScreen() {
  const [search, setSearch] = React.useState('')
  const [editorOpen, setEditorOpen] = React.useState(false)
  const [selectedGen, setSelectedGen] = React.useState<string | null>(null)
  const [hasContent, setHasContent] = React.useState(false)

  const openEditor = (slug: string) => {
    setSelectedGen(slug)
    setEditorOpen(true)
    setHasContent(false)
  }

  const allItems = GROUPS.flatMap(g => g.items)
  const searchResults = search.trim()
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : []

  const formatBold = (text: string) => text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  )

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="ai-studio" />

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">

        {/* Generator panel slide-in */}
        {editorOpen && (
          <div className="w-80 border-r flex flex-col shrink-0 bg-background">
            <div className="h-14 border-b flex items-center gap-3 px-4 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <span className="font-semibold text-sm flex-1">Artykuł blogowy</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditorOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">Temat <span className="text-destructive">*</span></Label>
                  <Input placeholder="Np. Jak stworzyć skuteczny zespół agentów AI?" className="text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Ton</Label>
                  <Select>
                    <SelectTrigger className="text-sm"><SelectValue placeholder="Wybierz ton..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profesjonalny</SelectItem>
                      <SelectItem value="casual">Swobodny</SelectItem>
                      <SelectItem value="authoritative">Autorytatywny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Długość</Label>
                  <Select>
                    <SelectTrigger className="text-sm"><SelectValue placeholder="Wybierz długość..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Krótki (400–600 słów)</SelectItem>
                      <SelectItem value="medium">Średni (800–1200 słów)</SelectItem>
                      <SelectItem value="long">Długi (1500–2500 słów)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Język</Label>
                  <Select>
                    <SelectTrigger className="text-sm"><SelectValue placeholder="Wybierz język..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pl">Polski</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Dodatkowe instrukcje</Label>
                  <Textarea placeholder="Słowa kluczowe, styl, CTA..." className="text-sm resize-none min-h-20" />
                </div>
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <Button className="w-full gap-2" onClick={() => setHasContent(true)}>
                <Play className="w-4 h-4" /> Generuj
              </Button>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
            <h1 className="text-base font-semibold">AI Studio</h1>
            {editorOpen && hasContent && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" /> 978 tok
                  <Clock className="w-3.5 h-3.5 ml-1" /> 18.6s
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8"><RotateCcw className="w-4 h-4" /></Button>
                <Separator orientation="vertical" className="h-5" />
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
                  <BookMarked className="w-4 h-4" /> W dokumentach
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
                  <Copy className="w-4 h-4" /> Kopiuj
                </Button>
              </div>
            )}
          </div>

          {/* Show generator output or home screen */}
          {editorOpen && hasContent ? (
            <ScrollArea className="flex-1">
              <div className="max-w-2xl mx-auto px-8 py-8">
                {CONTENT.map((block, i) => {
                  switch (block.type) {
                    case 'h1': return <h1 key={i} className="text-2xl font-bold mb-4">{block.text}</h1>
                    case 'h2': return <h2 key={i} className="text-lg font-bold mb-3 mt-6">{block.text}</h2>
                    case 'p':  return <p key={i} className="text-base leading-relaxed mb-3">{block.text}</p>
                    case 'li': return (
                      <div key={i} className="flex gap-2 mb-2">
                        <span className="text-muted-foreground mt-1.5 shrink-0">•</span>
                        <p className="text-base leading-relaxed">{formatBold(block.text)}</p>
                      </div>
                    )
                  }
                })}
              </div>
            </ScrollArea>
          ) : editorOpen && !hasContent ? (
            // Empty state when editor open but not generated yet
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <Wand2 className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-semibold mb-1">Gotowy do generowania</p>
                <p className="text-sm text-muted-foreground max-w-xs">Wypełnij formularz po lewej i kliknij Generuj.</p>
              </div>
            </div>
          ) : (
            // Home – search + quick start + history
            <ScrollArea className="flex-1">
              <div className="max-w-2xl mx-auto px-6 py-8">

                {/* Search */}
                <div className="relative mb-8">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj generatora..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-11 h-11 text-base"
                    autoFocus
                  />
                </div>

                {/* Search results */}
                {search.trim() ? (
                  <div>
                    {searchResults.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">Brak wyników dla „{search}"</p>
                    ) : (
                      <div className="space-y-1">
                        {searchResults.map(item => (
                          <button key={item.slug} onClick={() => openEditor(item.slug)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-white hover:border-foreground/20 hover:shadow-sm transition-all text-left group">
                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                              <item.icon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="font-medium text-sm flex-1">{item.name}</p>
                            <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Quick start */}
                    <div className="mb-8">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Szybki start</p>
                      <div className="grid grid-cols-3 gap-3">
                        {QUICK_START.map(qs => (
                          <button key={qs.slug} onClick={() => openEditor(qs.slug)}
                            className="flex flex-col items-start p-4 border rounded-xl bg-white hover:border-foreground/25 hover:shadow-sm transition-all group text-left">
                            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mb-3">
                              <qs.icon className="w-4 h-4 text-foreground" />
                            </div>
                            <p className="font-semibold text-sm mb-0.5">{qs.label}</p>
                            <p className="text-xs text-muted-foreground">{qs.desc}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Recent generations */}
                    {HISTORY.length > 0 && (
                      <div className="mb-8">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Ostatnie generacje</p>
                        <div className="space-y-2">
                          {HISTORY.map(item => {
                            const Icon = TYPE_ICONS[item.type] ?? FileText
                            return (
                              <button key={item.id}
                                className="w-full flex items-center gap-3 px-4 py-3 border rounded-xl bg-white hover:border-foreground/20 hover:shadow-sm transition-all text-left group">
                                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                  <Icon className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-muted-foreground mb-0.5">{item.type}</p>
                                  <p className="text-sm font-medium leading-snug truncate">{item.topic}</p>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                                    <Hash className="w-3 h-3" />{item.words}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground/60 mt-0.5">{item.date}</p>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* All generators grouped */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Wszystkie generatory</p>
                      <div className="space-y-4">
                        {GROUPS.map(group => (
                          <div key={group.label}>
                            <p className="text-xs text-muted-foreground font-medium mb-2 px-1">{group.label}</p>
                            <div className="grid grid-cols-2 gap-2">
                              {group.items.map(item => (
                                <button key={item.slug} onClick={() => openEditor(item.slug)}
                                  className="flex items-center gap-2.5 px-3 py-2.5 border rounded-xl bg-white hover:border-foreground/20 hover:shadow-sm transition-all text-left group">
                                  <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                    <item.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                  </div>
                                  <p className="font-medium text-sm">{item.name}</p>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </>
                )}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  )
}
