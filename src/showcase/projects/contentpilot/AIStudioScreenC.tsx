// Layout C: Wyróżnione + siatka
// Filozofia: hierarchia ważności – trzy polecane na górze jako duże karty,
// reszta jako kompaktowa siatka poniżej

import { useParams } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  FileText, ShoppingBag, Mail, Share2, AlignLeft,
  Languages, SpellCheck2, HelpCircle, Search as SearchIcon,
  ArrowRight, Sparkles,
} from 'lucide-react'

const FEATURED = [
  {
    slug: 'article',
    icon: FileText,
    name: 'Artykuł blogowy',
    desc: 'Generuj angażujące, długoformatowe treści zoptymalizowane pod SEO. Dodaj temat, wybierz ton i długość.',
    badge: 'Najpopularniejszy',
  },
  {
    slug: 'email',
    icon: Mail,
    name: 'Email marketingowy',
    desc: 'Twórz skuteczne kampanie emailowe z angażującym tematem, spójną treścią i wezwaniem do działania.',
    badge: 'Nowy',
  },
  {
    slug: 'social',
    icon: Share2,
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

export default function AIStudioScreenC() {
  const { projectSlug } = useParams<{ projectSlug: string }>()

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <ScrollArea className="flex-1 bg-[#fafafa]">
          <div className="max-w-4xl mx-auto px-8 py-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold tracking-tight mb-1">AI Studio</h1>
                <p className="text-sm text-muted-foreground">Wybierz generator i zacznij tworzyć</p>
              </div>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="w-4 h-4" />
                Historia generacji
              </Button>
            </div>

            {/* Featured – 3 duże karty */}
            <div className="mb-8">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Polecane
              </p>
              <div className="grid grid-cols-3 gap-4">
                {FEATURED.map(gen => (
                  <button
                    key={gen.slug}
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
                  </button>
                ))}
              </div>
            </div>

            {/* Secondary – kompaktowa siatka */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Pozostałe generatory
              </p>
              <div className="grid grid-cols-3 gap-3">
                {SECONDARY.map(gen => (
                  <button
                    key={gen.slug}
                    className="flex items-center gap-3 text-left border rounded-xl bg-white px-4 py-3 hover:border-foreground/25 hover:shadow-sm transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <gen.icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <p className="font-medium text-sm">{gen.name}</p>
                    <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
