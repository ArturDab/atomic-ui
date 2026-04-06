// Layout D: Command palette + karty bez opisów
// Filozofia: szybkie działanie, minimalizm – użytkownik zna już generatory,
// nie potrzebuje opisów przy każdym. Hover odkrywa opis.

import { useState } from 'react'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  FileText, ShoppingBag, Mail, Share2, AlignLeft,
  Languages, SpellCheck2, HelpCircle, Search as SearchIcon,
  Wand2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const GROUPS = [
  {
    label: 'Tworzenie treści',
    items: [
      { slug: 'article',   icon: FileText,    name: 'Artykuł blogowy',    desc: 'Długoformatowe treści zoptymalizowane pod SEO.' },
      { slug: 'product',   icon: ShoppingBag, name: 'Opis produktu',      desc: 'Opisy e-commerce podkreślające korzyści.' },
      { slug: 'email',     icon: Mail,        name: 'Email marketingowy', desc: 'Kampanie z angażującym tematem i CTA.' },
      { slug: 'social',    icon: Share2,      name: 'Post social media',  desc: 'Posty dla LinkedIn, Facebook, Instagram, X.' },
    ],
  },
  {
    label: 'Analiza i edycja',
    items: [
      { slug: 'summary',   icon: AlignLeft,   name: 'Streszczenie',      desc: 'Kondensuj długie teksty do kluczowych punktów.' },
      { slug: 'proofread', icon: SpellCheck2, name: 'Korekta i redakcja', desc: 'Popraw gramatykę, styl i czytelność.' },
      { slug: 'translate', icon: Languages,   name: 'Tłumaczenie',       desc: 'Profesjonalne tłumaczenia z zachowaniem tonu.' },
    ],
  },
  {
    label: 'SEO i techniczne',
    items: [
      { slug: 'faq',  icon: HelpCircle,  name: 'Generator FAQ',   desc: 'Pytania i odpowiedzi pod SEO i featured snippets.' },
      { slug: 'seo',  icon: SearchIcon,  name: 'SEO meta tagi',   desc: 'Title tagi, meta description, Open Graph.' },
    ],
  },
]

export default function AIStudioScreenD() {
  const [search, setSearch] = useState('')
  const [hovered, setHovered] = useState<string | null>(null)

  const allItems = GROUPS.flatMap(g => g.items)
  const isSearching = search.trim().length > 0

  const searchResults = isSearching
    ? allItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    : []

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <ScrollArea className="flex-1">
          <div className="max-w-3xl mx-auto px-8">

            {/* Search hero */}
            <div className="py-10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-foreground flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-6 h-6 text-background" strokeWidth={1.5} />
              </div>
              <h1 className="text-xl font-semibold mb-5">Co chcesz wygenerować?</h1>
              <div className="relative max-w-md mx-auto">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj generatora..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-11 h-11 text-base"
                  autoFocus
                />
              </div>
            </div>

            {/* Search results */}
            {isSearching && (
              <div className="mb-8">
                <p className="text-xs text-muted-foreground mb-3">
                  {searchResults.length === 0
                    ? 'Brak wyników'
                    : `${searchResults.length} wynik${searchResults.length > 1 ? 'i' : ''}`}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {searchResults.map(item => (
                    <GeneratorTile
                      key={item.slug}
                      item={item}
                      hovered={hovered === item.slug}
                      onHover={setHovered}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Grouped grid */}
            {!isSearching && (
              <div className="pb-8 space-y-8">
                {GROUPS.map(group => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                      {group.label}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {group.items.map(item => (
                        <GeneratorTile
                          key={item.slug}
                          item={item}
                          hovered={hovered === item.slug}
                          onHover={setHovered}
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
  )
}

function GeneratorTile({
  item,
  hovered,
  onHover,
}: {
  item: { slug: string; icon: React.ComponentType<{ className?: string }>; name: string; desc: string }
  hovered: boolean
  onHover: (slug: string | null) => void
}) {
  return (
    <button
      className={cn(
        'flex items-center gap-3 px-4 py-3.5 border rounded-xl bg-white text-left transition-all',
        hovered
          ? 'border-foreground/30 shadow-sm'
          : 'hover:border-foreground/20'
      )}
      onMouseEnter={() => onHover(item.slug)}
      onMouseLeave={() => onHover(null)}
    >
      <div className={cn(
        'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors',
        hovered ? 'bg-foreground' : 'bg-muted'
      )}>
        <item.icon className={cn('w-4 h-4 transition-colors', hovered ? 'text-background' : 'text-muted-foreground')} />
      </div>
      <div className="min-w-0">
        <p className="font-medium text-sm truncate">{item.name}</p>
        <p className={cn(
          'text-xs leading-snug transition-all overflow-hidden',
          hovered ? 'text-muted-foreground max-h-8 mt-0.5' : 'max-h-0 text-transparent'
        )}>
          {item.desc}
        </p>
      </div>
    </button>
  )
}
