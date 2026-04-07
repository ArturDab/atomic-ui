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
  Hash, ArrowRight, X, Play, RotateCcw, Copy, Coins,
  BookMarked, Video, Newspaper, Megaphone, Pin, PinOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ALL_GENERATORS = [
  { icon: FileText,    name: 'Artykuł blogowy',    slug: 'article',    category: 'Tworzenie treści' },
  { icon: ShoppingBag, name: 'Opis produktu',      slug: 'product',    category: 'Tworzenie treści' },
  { icon: Mail,        name: 'Email marketingowy', slug: 'email',      category: 'Tworzenie treści' },
  { icon: Newspaper,   name: 'Newsletter',         slug: 'newsletter', category: 'Tworzenie treści' },
  { icon: Share2,      name: 'Post social media',  slug: 'social',     category: 'Tworzenie treści' },
  { icon: Video,       name: 'Skrypt wideo',       slug: 'script',     category: 'Tworzenie treści' },
  { icon: Megaphone,   name: 'Kopia reklamowa',    slug: 'ad',         category: 'Tworzenie treści' },
  { icon: AlignLeft,   name: 'Streszczenie',       slug: 'summary',    category: 'Analiza i edycja' },
  { icon: SpellCheck2, name: 'Korekta i redakcja', slug: 'proofread',  category: 'Analiza i edycja' },
  { icon: RotateCcw,   name: 'Przepisanie tekstu', slug: 'rewrite',    category: 'Analiza i edycja' },
  { icon: Languages,   name: 'Tłumaczenie',        slug: 'translate',  category: 'Językowe' },
  { icon: Search,      name: 'SEO meta tagi',      slug: 'seo',        category: 'SEO i techniczne' },
  { icon: HelpCircle,  name: 'Generator FAQ',      slug: 'faq',        category: 'SEO i techniczne' },
]

const CATEGORIES = ['Tworzenie treści', 'Analiza i edycja', 'Językowe', 'SEO i techniczne']

// Historia ma podgląd fragmentu treści – wyraźnie odróżnia się od kafli generatorów
const HISTORY = [
  {
    id: '1', type: 'Artykuł blogowy', slug: 'article',
    topic: 'Jak stworzyć skuteczny zespół agentów AI?',
    excerpt: 'Tworzenie skutecznego zespołu agentów AI to wyzwanie, które wymaga starannego planowania i kluczowej strategii...',
    words: 980, date: 'dziś, 14:22',
  },
  {
    id: '2', type: 'Post social media', slug: 'social',
    topic: 'Launch Animails – nowa aplikacja dla miłośników zwierząt',
    excerpt: 'Poznajcie Animails 🐾 – nową aplikację dla miłośników zwierząt! Zarządzaj zdrowiem pupila, znajdź weterynarza...',
    words: 220, date: 'dziś, 11:05',
  },
  {
    id: '3', type: 'Email marketingowy', slug: 'email',
    topic: 'Newsletter Q1 – podsumowanie wyników',
    excerpt: 'Witaj! Pierwszy kwartał za nami – czas na podsumowanie. W Q1 osiągnęliśmy rekordowe wyniki sprzedaży...',
    words: 540, date: 'wczoraj',
  },
  {
    id: '4', type: 'SEO meta tagi', slug: 'seo',
    topic: 'Strona główna Beezu.pl',
    excerpt: 'Title: Beezu – Biżuteria Złota i Srebrna | Sklep Online | Meta: Odkryj unikalną biżuterię złotą...',
    words: 160, date: '18 mar',
  },
]

const CONTENT = [
  { type: 'h1', text: 'Jak Stworzyć Skuteczny Zespół Agentów AI?' },
  { type: 'p',  text: 'Tworzenie skutecznego zespołu agentów AI to wyzwanie, które wymaga starannego planowania. Agenci AI mogą przekształcić sposób funkcjonowania firm.' },
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
  const [hasContent, setHasContent] = React.useState(false)
  const [pinned, setPinned] = React.useState<Set<string>>(new Set(['article', 'email', 'social']))

  const openEditor = (slug: string) => { setEditorOpen(true); setHasContent(false) }

  const togglePin = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setPinned(prev => {
      const n = new Set(prev)
      n.has(slug) ? n.delete(slug) : n.add(slug)
      return n
    })
  }

  const pinnedGenerators = ALL_GENERATORS.filter(g => pinned.has(g.slug))

  const searchResults = search.trim()
    ? ALL_GENERATORS.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : []

  const formatBold = (text: string) => text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  )

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="ai-studio" />

      <div className="flex-1 flex overflow-hidden">

        {/* Slide-in form panel */}
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

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
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
          ) : editorOpen ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <Wand2 className="w-7 h-7 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-semibold mb-1">Gotowy do generowania</p>
                <p className="text-sm text-muted-foreground">Wypełnij formularz i kliknij Generuj.</p>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1 bg-[#fafafa]">
              <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj generatora..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-11 h-11 text-base bg-white"
                  />
                </div>

                {search.trim() ? (
                  // Search results
                  <div className="space-y-1">
                    {searchResults.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-8">Brak wyników dla „{search}"</p>
                    ) : searchResults.map(item => (
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
                ) : (
                  <>

                    {/* Przypięte – user controls */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Przypięte</p>
                      {pinnedGenerators.length === 0 ? (
                        <div className="border border-dashed rounded-xl bg-white/60 flex flex-col items-center py-7 text-center px-6">
                          <Pin className="w-5 h-5 text-muted-foreground/40 mb-2" />
                          <p className="text-sm font-medium text-muted-foreground">Brak przypiętych generatorów</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Kliknij ikonę pinezki przy dowolnym generatorze poniżej.</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-3">
                          {pinnedGenerators.map(gen => (
                            <div key={gen.slug} className="relative group/pin">
                              <button onClick={() => openEditor(gen.slug)}
                                className="w-full flex flex-col items-start p-4 border rounded-xl bg-white hover:border-foreground/25 hover:shadow-sm transition-all text-left">
                                <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center mb-3">
                                  <gen.icon className="w-4 h-4 text-foreground" />
                                </div>
                                <p className="font-semibold text-sm">{gen.name}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{gen.category}</p>
                              </button>
                              <button
                                onClick={e => togglePin(gen.slug, e)}
                                className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center bg-muted text-foreground opacity-0 group-hover/pin:opacity-100 transition-opacity"
                              >
                                <PinOff className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Historia – inny wzorzec niż kafle */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Ostatnie generacje</p>
                        <button className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                          Pełna historia <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Timeline list – zupełnie inny wygląd niż kafle generatorów */}
                      <div className="space-y-0 border rounded-xl bg-white overflow-hidden">
                        {HISTORY.map((item, i) => (
                          <div key={item.id}>
                            {i > 0 && <Separator />}
                            <button
                              onClick={() => openEditor(item.slug)}
                              className="w-full text-left px-4 py-3.5 hover:bg-muted/40 transition-colors group flex items-start gap-4"
                            >
                              {/* Lewa kreska kolorystyczna – timeline accent */}
                              <div className="w-0.5 h-full bg-muted rounded-full self-stretch shrink-0 mt-1 min-h-[2.5rem]" />

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="secondary" className="text-[10px] h-4 px-1.5 font-medium shrink-0">
                                    {item.type}
                                  </Badge>
                                  <span className="text-[10px] text-muted-foreground/60">{item.date}</span>
                                  <span className="text-[10px] text-muted-foreground/60 ml-auto flex items-center gap-1">
                                    <Hash className="w-3 h-3" />{item.words}
                                  </span>
                                </div>
                                {/* Tytuł */}
                                <p className="text-sm font-medium leading-snug mb-1 truncate">{item.topic}</p>
                                {/* Podgląd tekstu – tego nie ma w kaflach generatorów */}
                                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-1">{item.excerpt}</p>
                              </div>

                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Wszystkie generatory – kafle */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Wszystkie generatory</p>
                      <div className="space-y-4">
                        {CATEGORIES.map(cat => {
                          const items = ALL_GENERATORS.filter(g => g.category === cat)
                          return (
                            <div key={cat}>
                              <p className="text-xs text-muted-foreground font-medium mb-2 px-1">{cat}</p>
                              <div className="grid grid-cols-2 gap-2">
                                {items.map(gen => (
                                  <div key={gen.slug} className="relative group/tile">
                                    <button onClick={() => openEditor(gen.slug)}
                                      className="w-full flex items-center gap-2.5 px-3 py-2.5 border rounded-xl bg-white hover:border-foreground/20 hover:shadow-sm transition-all text-left">
                                      <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                        <gen.icon className="w-3.5 h-3.5 text-muted-foreground" />
                                      </div>
                                      <p className="font-medium text-sm flex-1">{gen.name}</p>
                                    </button>
                                    <button
                                      onClick={e => togglePin(gen.slug, e)}
                                      className={cn(
                                        'absolute top-1.5 right-1.5 w-6 h-6 rounded-md flex items-center justify-center transition-all',
                                        pinned.has(gen.slug)
                                          ? 'bg-muted text-foreground opacity-100'
                                          : 'text-muted-foreground opacity-0 group-hover/tile:opacity-100 hover:bg-muted'
                                      )}
                                    >
                                      {pinned.has(gen.slug)
                                        ? <PinOff className="w-3 h-3" />
                                        : <Pin className="w-3 h-3" />}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
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
