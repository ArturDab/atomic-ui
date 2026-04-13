import * as React from 'react'
import { AppSidebar } from '@/components/blocks/app-sidebar'
import { PromptCard } from '@/components/blocks/prompt-card'
import { FilterBar } from '@/components/blocks/filter-bar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const PROMPTS = [
  { category: 'SEO', title: 'Artykuł blogowy SEO', description: 'Pełny artykuł z H1, wstępem, sekcjami, FAQ i meta description. Zoptymalizowany pod konkretną frazę kluczową.', paramCount: 3 },
  { category: 'Social', title: 'Post LinkedIn', description: 'Angażujący post z mocnym hookiem, historią lub obserwacją i konkretnym CTA. Format przyjazny algorytmowi.', paramCount: 2 },
  { category: 'Email', title: 'Newsletter tygodniowy', description: 'Newsletter z podsumowaniem tygodnia, linkami do artykułów i sekcją "co warto wiedzieć".', paramCount: 4 },
  { category: 'Blog', title: 'Recenzja produktu', description: 'Obiektywna recenzja z oceną, plusami i minusami, porównaniem i finalnym werdyktem.', paramCount: 5 },
  { category: 'E-commerce', title: 'Opis produktu', description: 'Przekonujący opis z benefitami, specyfikacją i odpowiedziami na obiekcje klientów.', paramCount: 4 },
  { category: 'PR', title: 'Komunikat prasowy', description: 'Profesjonalny press release zgodny z formatem AP Style. Zawiera lead, cytat i notę o firmie.', paramCount: 3 },
  { category: 'SEO', title: 'Pillar page', description: 'Obszerna strona filarowa (2500+ słów) obejmująca cały temat i linkująca do artykułów klastra.', paramCount: 4 },
  { category: 'Social', title: 'Wątek na X (Twitter)', description: 'Wątek 8-12 tweetów z hookiem, rozwinięciem i puentą. Zoptymalizowany pod zasięg organiczny.', paramCount: 3 },
  { category: 'Email', title: 'Sekwencja onboardingowa', description: 'Seria 5 emaili powitalnych prowadząca nowego użytkownika przez kluczowe funkcje produktu.', paramCount: 6 },
]

const CATEGORIES = ['Wszystkie', 'SEO', 'Social', 'Email', 'Blog', 'E-commerce', 'PR']

const FILTERS = [
  { key: 'sort', label: 'Sortuj', options: [{ value: 'recent', label: 'Ostatnio użyte' }, { value: 'name', label: 'Alfabetycznie' }] },
]

export default function PromptsScreen() {
  const [activeCategory, setActiveCategory] = React.useState('Wszystkie')
  const filtered = activeCategory === 'Wszystkie' ? PROMPTS : PROMPTS.filter(p => p.category === activeCategory)

  return (
    <div className="flex h-full">
      <AppSidebar activeHref="/prompts" user={{ name: 'Artur K.', email: 'artur@simplimo.pl', initials: 'AK' }} />
      <div className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
        <div className="border-b bg-white px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Prompty</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{PROMPTS.length} szablonów</p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Nowy prompt
          </Button>
        </div>

        <div className="border-b bg-white px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex gap-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  activeCategory === cat
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <FilterBar placeholder="Szukaj szablonów..." filters={FILTERS} />
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl">
            {filtered.map(p => <PromptCard key={p.title} {...p} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
