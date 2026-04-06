// Layout B: Lista z filtrowaniem po kategorii po lewej stronie
// Filozofia: maksymalna gęstość informacji, szybkie skanowanie, mniej klikania

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  FileText, ShoppingBag, Mail, Share2, AlignLeft,
  Languages, SpellCheck2, HelpCircle, Search as SearchIcon,
  ArrowRight, Wand2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { id: 'all',        label: 'Wszystkie',   count: 9 },
  { id: 'content',    label: 'Treść',       count: 3 },
  { id: 'social',     label: 'Social media', count: 1 },
  { id: 'technical',  label: 'Techniczne',  count: 2 },
  { id: 'language',   label: 'Językowe',    count: 2 },
  { id: 'optimize',   label: 'Optymalizacja', count: 1 },
]

const GENERATORS = [
  { slug: 'article',   icon: FileText,    name: 'Artykuł blogowy',       category: 'content',   desc: 'Generuj angażujące wpisy na bloga zoptymalizowane pod SEO.',             time: '~15s' },
  { slug: 'product',   icon: ShoppingBag, name: 'Opis produktu',         category: 'content',   desc: 'Przekonujące opisy e-commerce podkreślające korzyści.',                  time: '~8s' },
  { slug: 'email',     icon: Mail,        name: 'Email marketingowy',    category: 'content',   desc: 'Skuteczne kampanie z tematami, treścią i CTA.',                          time: '~10s' },
  { slug: 'social',    icon: Share2,      name: 'Post social media',     category: 'social',    desc: 'Angażujące posty na LinkedIn, Facebook, Instagram i X.',                 time: '~6s' },
  { slug: 'summary',   icon: AlignLeft,   name: 'Streszczenie tekstu',   category: 'language',  desc: 'Kondensuj długie teksty do zwięzłych, czytelnych streszczeń.',           time: '~5s' },
  { slug: 'translate', icon: Languages,   name: 'Tłumaczenie',           category: 'language',  desc: 'Profesjonalne tłumaczenia z zachowaniem kontekstu i tonu.',              time: '~8s' },
  { slug: 'proofread', icon: SpellCheck2, name: 'Korekta i redakcja',    category: 'optimize',  desc: 'Popraw gramatykę, styl i czytelność. Przepisz lub skróć.',               time: '~7s' },
  { slug: 'faq',       icon: HelpCircle,  name: 'Generator FAQ',         category: 'technical', desc: 'Pytania i odpowiedzi zoptymalizowane pod SEO i featured snippets.',       time: '~10s' },
  { slug: 'seo',       icon: SearchIcon,  name: 'SEO meta tagi',         category: 'technical', desc: 'Title tagi, meta description, Open Graph i słowa kluczowe.',             time: '~5s' },
]

export default function AIStudioScreenB() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = GENERATORS.filter(g => {
    const matchCat = activeCategory === 'all' || g.category === activeCategory
    const matchSearch = !search || g.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar – kategorie */}
          <div className="w-56 border-r flex flex-col shrink-0 bg-background">
            <div className="p-4 border-b">
              <div className="flex items-center gap-2 mb-1">
                <Wand2 className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold text-sm">AI Studio</span>
              </div>
              <p className="text-xs text-muted-foreground">Wybierz generator treści</p>
            </div>

            <nav className="p-2 flex-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                    activeCategory === cat.id
                      ? 'bg-foreground text-background font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <span>{cat.label}</span>
                  <span className={cn(
                    'text-xs tabular-nums',
                    activeCategory === cat.id ? 'text-background/70' : 'text-muted-foreground/60'
                  )}>{cat.count}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Lista generatorów */}
          <div className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
            <div className="px-6 py-3 border-b bg-background">
              <div className="relative max-w-sm">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Szukaj generatora..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-2 max-w-3xl">
                {filtered.map(gen => (
                  <button
                    key={gen.slug}
                    className="w-full flex items-center gap-4 bg-white border rounded-xl px-5 py-4 hover:border-foreground/25 hover:shadow-sm transition-all text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <gen.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-sm">{gen.name}</p>
                        <Badge variant="outline" className="text-xs">{gen.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{gen.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

        </div>
      </div>
    </div>
  )
}
