import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  SidePanel, SidePanelList,
  SidePanelItem, SidePanelItemTitle, SidePanelItemMeta,
} from './_SidePanel'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  FileText, ShoppingBag, Mail, Share2, AlignLeft,
  Languages, SpellCheck2, HelpCircle, Search as SearchIcon,
  ArrowRight, Clock, Plus, Video, Newspaper, RefreshCw,
  BarChart2, MessageCircle, Tag, Megaphone, BookOpen, Code2,
  Pin, PinOff,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Dane ──────────────────────────────────────────────────────────────────────

const ALL_GENERATORS = [
  // Tworzenie treści
  { slug: 'article',    icon: FileText,      name: 'Artykuł blogowy',     category: 'Tworzenie treści',    desc: 'Długoformatowe treści SEO z H1, sekcjami i meta description.' },
  { slug: 'product',    icon: ShoppingBag,   name: 'Opis produktu',       category: 'Tworzenie treści',    desc: 'Przekonujące opisy e-commerce z benefitami i CTA.' },
  { slug: 'email',      icon: Mail,          name: 'Email marketingowy',  category: 'Tworzenie treści',    desc: 'Kampanie z angażującym tematem, treścią i wezwaniem do działania.' },
  { slug: 'newsletter', icon: Newspaper,     name: 'Newsletter',          category: 'Tworzenie treści',    desc: 'Regularne wydania z podsumowaniem i linkami.' },
  { slug: 'social',     icon: Share2,        name: 'Post social media',   category: 'Tworzenie treści',    desc: 'Posty dostosowane do platformy – LinkedIn, Facebook, Instagram, X.' },
  { slug: 'script',     icon: Video,         name: 'Skrypt wideo',        category: 'Tworzenie treści',    desc: 'Scenariusz na YouTube, Reels lub podcast.' },
  { slug: 'ad',         icon: Megaphone,     name: 'Kopia reklamowa',     category: 'Tworzenie treści',    desc: 'Teksty na Google Ads, Meta Ads i bannery.' },
  { slug: 'press',      icon: BookOpen,      name: 'Komunikat prasowy',   category: 'Tworzenie treści',    desc: 'PR release w formacie AP Style z cytatem i notą.' },
  // Analiza i edycja
  { slug: 'summary',    icon: AlignLeft,     name: 'Streszczenie',        category: 'Analiza i edycja',    desc: 'Kondensuj długie teksty zachowując kluczowe informacje.' },
  { slug: 'proofread',  icon: SpellCheck2,   name: 'Korekta i redakcja',  category: 'Analiza i edycja',    desc: 'Popraw gramatykę, styl, czytelność i ton.' },
  { slug: 'rewrite',    icon: RefreshCw,     name: 'Przepisanie tekstu',  category: 'Analiza i edycja',    desc: 'Zmień styl, ton lub poziom złożoności.' },
  { slug: 'review',     icon: MessageCircle, name: 'Analiza tekstu',      category: 'Analiza i edycja',    desc: 'Ocena tonu, czytelności i potencjału konwersji.' },
  // Językowe
  { slug: 'translate',  icon: Languages,     name: 'Tłumaczenie',         category: 'Językowe',            desc: 'Profesjonalne tłumaczenia z zachowaniem kontekstu.' },
  { slug: 'simplify',   icon: BookOpen,      name: 'Uproszczenie języka', category: 'Językowe',            desc: 'Adaptuj tekst do prostszego lub bardziej eksperckiego odbiorcy.' },
  // SEO i techniczne
  { slug: 'seo',        icon: SearchIcon,    name: 'SEO meta tagi',       category: 'SEO i techniczne',    desc: 'Title tagi, meta description, Open Graph i słowa kluczowe.' },
  { slug: 'faq',        icon: HelpCircle,    name: 'Generator FAQ',       category: 'SEO i techniczne',    desc: 'Pytania i odpowiedzi pod SEO i featured snippets.' },
  { slug: 'schema',     icon: Code2,         name: 'Schema markup',       category: 'SEO i techniczne',    desc: 'Structured data JSON-LD dla Google.' },
  { slug: 'alt',        icon: Tag,           name: 'Alt texty zdjęć',     category: 'SEO i techniczne',    desc: 'Opisy zdjęć dla SEO i dostępności.' },
  { slug: 'report',     icon: BarChart2,     name: 'Raport wyników',      category: 'SEO i techniczne',    desc: 'Podsumowanie danych analitycznych w formie narracji.' },
]

const CATEGORY_ORDER = ['Tworzenie treści', 'Analiza i edycja', 'Językowe', 'SEO i techniczne']

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'Artykuł blogowy':    FileText,
  'Post social media':  Share2,
  'Email marketingowy': Mail,
  'SEO meta tagi':      SearchIcon,
  'Opis produktu':      ShoppingBag,
  'Streszczenie':       AlignLeft,
  'Tłumaczenie':        Languages,
  'Generator FAQ':      HelpCircle,
  'Korekta i redakcja': SpellCheck2,
}

const HISTORY = [
  { id: '1', type: 'Artykuł blogowy',    topic: 'Jak stworzyć skuteczny zespół agentów AI?',               date: 'dzisiaj', words: 980  },
  { id: '2', type: 'Post social media',  topic: 'Launch Animails – nowa aplikacja dla miłośników zwierząt', date: 'dzisiaj', words: 220  },
  { id: '3', type: 'Email marketingowy', topic: 'Newsletter Q1 – podsumowanie wyników',                     date: 'wczoraj', words: 540  },
  { id: '4', type: 'Artykuł blogowy',    topic: 'Jak skutecznie pracować na home office?',                  date: 'wczoraj', words: 1240 },
  { id: '5', type: 'SEO meta tagi',      topic: 'Strona główna Beezu.pl',                                   date: '18.03',   words: 160  },
  { id: '6', type: 'Opis produktu',      topic: 'Kolczyki złote z cyrkonem – Beezu kolekcja wiosna',        date: '18.03',   words: 310  },
  { id: '7', type: 'Streszczenie',       topic: 'Raport: AI w marketingu 2025 – McKinsey',                  date: '17.03',   words: 430  },
]

// ── Komponent ─────────────────────────────────────────────────────────────────

export default function AIStudioScreenC() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const [search, setSearch] = useState('')
  const [activeHistory, setActiveHistory] = useState<string | null>(null)
  const [pinned, setPinned] = useState<Set<string>>(new Set(['article', 'email', 'social']))

  const togglePin = (slug: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPinned(prev => {
      const next = new Set(prev)
      next.has(slug) ? next.delete(slug) : next.add(slug)
      return next
    })
  }

  const isSearching = search.trim().length > 0
  const searchResults = isSearching
    ? ALL_GENERATORS.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.desc.toLowerCase().includes(search.toLowerCase())
      )
    : []

  const pinnedGenerators = ALL_GENERATORS.filter(g => pinned.has(g.slug))

  const grouped = CATEGORY_ORDER.map(cat => ({
    label: cat,
    items: ALL_GENERATORS.filter(g => g.category === cat),
  }))

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <div className="flex flex-1 overflow-hidden">

          {/* Lewy panel – historia */}
          <SidePanel>
            <SidePanelList>
              {HISTORY.map(item => {
                const Icon = TYPE_ICONS[item.type] ?? FileText
                return (
                  <SidePanelItem
                    key={item.id}
                    active={activeHistory === item.id}
                    onClick={() => setActiveHistory(item.id)}
                  >
                    <div className="flex items-start gap-2.5">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground mb-0.5">{item.type}</p>
                        <p className="text-sm leading-snug line-clamp-2">{item.topic}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5">
                          <Clock className="w-3 h-3" />
                          {item.date} · {item.words.toLocaleString()} słów
                        </p>
                      </div>
                    </div>
                  </SidePanelItem>
                )
              })}
            </SidePanelList>
          </SidePanel>

          {/* Główna strefa */}
          <ScrollArea className="flex-1 bg-[#fafafa]">
            <div className="max-w-3xl mx-auto px-8 py-8">

              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-xl font-semibold tracking-tight mb-1">AI Studio</h1>
                  <p className="text-sm text-muted-foreground">Wybierz generator i zacznij tworzyć</p>
                </div>
                <div className="relative w-52 shrink-0">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Szukaj generatora..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 h-9 text-sm bg-white"
                  />
                </div>
              </div>

              {/* Wyniki wyszukiwania */}
              {isSearching && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {searchResults.length === 0 ? 'Brak wyników' : `${searchResults.length} generatorów`}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {searchResults.map(gen => (
                      <GeneratorCard
                        key={gen.slug}
                        gen={gen}
                        projectSlug={projectSlug!}
                        isPinned={pinned.has(gen.slug)}
                        onTogglePin={togglePin}
                        compact
                      />
                    ))}
                  </div>
                </div>
              )}

              {!isSearching && (
                <div className="space-y-8">

                  {/* Przypięte */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                      Przypięte
                    </p>
                    {pinnedGenerators.length === 0 ? (
                      <div className="border border-dashed rounded-xl bg-white/60 flex flex-col items-center justify-center py-8 text-center px-6">
                        <Pin className="w-5 h-5 text-muted-foreground/50 mb-2" />
                        <p className="text-sm font-medium text-muted-foreground">Brak przypiętych generatorów</p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          Kliknij ikonę pinezki przy dowolnym generatorze poniżej.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-4">
                        {pinnedGenerators.map(gen => (
                          <GeneratorCard
                            key={gen.slug}
                            gen={gen}
                            projectSlug={projectSlug!}
                            isPinned
                            onTogglePin={togglePin}
                            featured
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Kategorie */}
                  {grouped.map(cat => (
                    <div key={cat.label}>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                        {cat.label}
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {cat.items.map(gen => (
                          <GeneratorCard
                            key={gen.slug}
                            gen={gen}
                            projectSlug={projectSlug!}
                            isPinned={pinned.has(gen.slug)}
                            onTogglePin={togglePin}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                </div>
              )}

            </div>
          </ScrollArea>

        </div>
      </div>
    </div>
  )
}

// ── Generator card ─────────────────────────────────────────────────────────────

interface Gen {
  slug: string
  icon: React.ComponentType<{ className?: string }>
  name: string
  desc: string
  badge?: string
}

function GeneratorCard({
  gen, projectSlug, isPinned, onTogglePin, featured = false, compact = false,
}: {
  gen: Gen
  projectSlug: string
  isPinned: boolean
  onTogglePin: (slug: string, e: React.MouseEvent) => void
  featured?: boolean
  compact?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative group">
          <Link
            to={`/projects/${projectSlug}/ai-studio/${gen.slug}`}
            className={cn(
              'flex text-left border rounded-xl bg-white transition-all hover:border-foreground/25 hover:shadow-sm',
              featured ? 'flex-col p-5' : 'items-center gap-3 px-4 py-3.5'
            )}
          >
            {featured ? (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <gen.icon className="w-5 h-5 text-foreground" />
                  </div>
                  {'badge' in gen && gen.badge && (
                    <Badge variant="secondary" className="text-xs">{gen.badge}</Badge>
                  )}
                </div>
                <p className="font-semibold text-sm mb-1.5">{gen.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{gen.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  Użyj <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </>
            ) : (
              <>
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <gen.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="font-medium text-sm flex-1 text-left">{gen.name}</p>
              </>
            )}
          </Link>

          {/* Pin button */}
          <button
            onClick={e => onTogglePin(gen.slug, e)}
            title={isPinned ? 'Odepnij' : 'Przypnij'}
            className={cn(
              'absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center transition-all',
              isPinned
                ? 'text-foreground bg-muted opacity-100'
                : 'text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-muted'
            )}
          >
            {isPinned
              ? <PinOff className="w-3 h-3" />
              : <Pin className="w-3 h-3" />}
          </button>
        </div>
      </TooltipTrigger>
      {compact && (
        <TooltipContent side="bottom" className="max-w-52 text-xs">
          {gen.desc}
        </TooltipContent>
      )}
    </Tooltip>
  )
}
