import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  FileText, ShoppingBag, Mail, Share2, AlignLeft,
  Languages, SpellCheck2, HelpCircle, Search as SearchIcon,
  ArrowRight, Clock, Plus, Wand2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Dane ──────────────────────────────────────────────────────────────────────

const FEATURED = [
  {
    slug: 'article', icon: FileText,
    name: 'Artykuł blogowy',
    desc: 'Generuj angażujące, długoformatowe treści zoptymalizowane pod SEO. Dodaj temat, wybierz ton i długość.',
    badge: 'Najpopularniejszy',
  },
  {
    slug: 'email', icon: Mail,
    name: 'Email marketingowy',
    desc: 'Twórz skuteczne kampanie emailowe z angażującym tematem, spójną treścią i wezwaniem do działania.',
    badge: 'Nowy',
  },
  {
    slug: 'social', icon: Share2,
    name: 'Post social media',
    desc: 'Angażujące posty dostosowane do platformy – LinkedIn, Facebook, Instagram lub X.',
    badge: null,
  },
]

const SECONDARY = [
  { slug: 'product',   icon: ShoppingBag, name: 'Opis produktu' },
  { slug: 'summary',   icon: AlignLeft,   name: 'Streszczenie tekstu' },
  { slug: 'translate', icon: Languages,   name: 'Tłumaczenie' },
  { slug: 'proofread', icon: SpellCheck2, name: 'Korekta i redakcja' },
  { slug: 'faq',       icon: HelpCircle,  name: 'Generator FAQ' },
  { slug: 'seo',       icon: SearchIcon,  name: 'SEO meta tagi' },
]

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
  { id: '1', type: 'Artykuł blogowy',    topic: 'Jak stworzyć skuteczny zespół agentów AI?',              date: 'dzisiaj',  words: 980  },
  { id: '2', type: 'Post social media',  topic: 'Launch Animails – nowa aplikacja dla miłośników zwierząt', date: 'dzisiaj', words: 220  },
  { id: '3', type: 'Email marketingowy', topic: 'Newsletter Q1 – podsumowanie wyników',                    date: 'wczoraj', words: 540  },
  { id: '4', type: 'Artykuł blogowy',    topic: 'Jak skutecznie pracować na home office?',                 date: 'wczoraj', words: 1240 },
  { id: '5', type: 'SEO meta tagi',      topic: 'Strona główna Beezu.pl',                                  date: '18.03',   words: 160  },
  { id: '6', type: 'Opis produktu',      topic: 'Kolczyki złote z cyrkonem – Beezu kolekcja wiosna',       date: '18.03',   words: 310  },
  { id: '7', type: 'Streszczenie',       topic: 'Raport: AI w marketingu 2025 – McKinsey',                 date: '17.03',   words: 430  },
  { id: '8', type: 'Tłumaczenie',        topic: 'Privacy Policy – EN → PL',                                date: '15.03',   words: 1800 },
  { id: '9', type: 'Generator FAQ',      topic: 'Najczęstsze pytania o sklep Beezu.pl',                    date: '14.03',   words: 620  },
]

// ── Komponent ──────────────────────────────────────────────────────────────────

export default function AIStudioScreenC() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const [search, setSearch] = useState('')
  const [activeHistory, setActiveHistory] = useState<string | null>(null)

  const allGenerators = [...FEATURED, ...SECONDARY]
  const isSearching = search.trim().length > 0
  const searchResults = isSearching
    ? allGenerators.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <div className="flex flex-1 overflow-hidden">

          {/* Lewy panel – historia generacji (spójny z AI Chat / AI Teams) */}
          <div className="w-72 border-r flex flex-col shrink-0">

            <div className="p-4 border-b">
              <Button className="w-full gap-2">
                <Plus className="w-4 h-4" />
                Nowa generacja
              </Button>
            </div>

            <div className="px-4 py-2.5 border-b flex items-center gap-2">
              <Wand2 className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                Historia generacji
              </span>
            </div>

            <ScrollArea className="flex-1">
              {HISTORY.map(item => {
                const Icon = TYPE_ICONS[item.type] ?? FileText
                const isActive = activeHistory === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveHistory(item.id)}
                    className={cn(
                      'w-full text-left px-4 py-3 border-b transition-colors hover:bg-muted/50',
                      isActive && 'bg-muted'
                    )}
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
                  </button>
                )
              })}
            </ScrollArea>

          </div>

          {/* Główna strefa – generatory */}
          <ScrollArea className="flex-1 bg-[#fafafa]">
            <div className="px-8 py-8 max-w-3xl">

              {/* Header z wyszukiwarką */}
              <div className="flex items-start justify-between gap-4 mb-6">
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
                <div>
                  <p className="text-xs text-muted-foreground mb-3">
                    {searchResults.length === 0 ? 'Brak wyników' : `${searchResults.length} generatorów`}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {searchResults.map(gen => (
                      <Link
                        key={gen.slug}
                        to={`/projects/${projectSlug}/ai-studio/${gen.slug}`}
                        className="flex items-center gap-3 bg-white border rounded-xl px-4 py-3 hover:border-foreground/25 hover:shadow-sm transition-all group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <gen.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm flex-1">{gen.name}</p>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Polecane */}
              {!isSearching && (
                <>
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                      Polecane
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {FEATURED.map(gen => (
                        <Link
                          key={gen.slug}
                          to={`/projects/${projectSlug}/ai-studio/${gen.slug}`}
                          className="flex flex-col text-left border rounded-xl bg-white p-5 hover:border-foreground/25 hover:shadow-sm transition-all group"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                              <gen.icon className="w-5 h-5 text-foreground" />
                            </div>
                            {gen.badge && (
                              <Badge variant="secondary" className="text-xs">{gen.badge}</Badge>
                            )}
                          </div>
                          <p className="font-semibold text-sm mb-1.5">{gen.name}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed flex-1">{gen.desc}</p>
                          <div className="flex items-center gap-1 mt-4 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            Użyj <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {/* Pozostałe */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                      Pozostałe generatory
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {SECONDARY.map(gen => (
                        <Link
                          key={gen.slug}
                          to={`/projects/${projectSlug}/ai-studio/${gen.slug}`}
                          className="flex items-center gap-3 text-left border rounded-xl bg-white px-4 py-3 hover:border-foreground/25 hover:shadow-sm transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <gen.icon className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <p className="font-medium text-sm flex-1">{gen.name}</p>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}

            </div>
          </ScrollArea>

        </div>
      </div>
    </div>
  )
}
