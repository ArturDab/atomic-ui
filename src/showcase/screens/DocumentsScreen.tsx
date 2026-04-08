import { AppSidebar } from '@/components/blocks/app-sidebar'
import { DocumentCard } from '@/components/blocks/document-card'
import { FilterBar } from '@/components/blocks/filter-bar'
import { EmptyState } from '@/components/blocks/empty-state'
import { Button } from '@/components/ui/button'
import { Plus, FileText } from 'lucide-react'

const DOCUMENTS = [
  { title: 'Jak pisać treści SEO, które naprawdę działają w 2025 roku', excerpt: 'Poznaj sprawdzone techniki optymalizacji treści, które pomogą Ci osiągać wysokie pozycje w Google.', status: 'published' as const, updatedAt: 'wczoraj', platform: 'WordPress', categories: ['SEO', 'Marketing'] },
  { title: '10 narzędzi AI dla content marketerów – przegląd i porównanie', excerpt: 'Zestawienie najlepszych narzędzi sztucznej inteligencji, które zmienią sposób tworzenia treści.', status: 'draft' as const, updatedAt: '2 godz. temu', platform: 'WordPress', categories: ['AI', 'Narzędzia'] },
  { title: 'Newsletter: Trendy w AI – wydanie #14', excerpt: 'Co nowego w świecie sztucznej inteligencji? Przegląd najważniejszych wydarzeń tygodnia.', status: 'scheduled' as const, updatedAt: 'jutro 10:00', platform: 'Mailchimp', categories: ['AI'] },
  { title: 'Recenzja: Claude 3.5 Sonnet – czy to najlepszy model do pisania?', excerpt: 'Testujemy najnowszy model Anthropic w praktycznych zadaniach content marketingowych.', status: 'published' as const, updatedAt: '3 dni temu', platform: 'WordPress', categories: ['AI', 'Recenzje'] },
  { title: 'Poradnik: Automatyzacja content marketingu z Make.com', excerpt: 'Jak zbudować przepływ automatyzacji, który będzie generował i publikował treści za Ciebie.', status: 'draft' as const, updatedAt: '5 dni temu', platform: 'WordPress', categories: ['Automatyzacja'] },
  { title: 'Case study: Jak Beezu zwiększyło ruch organiczny o 140%', excerpt: 'Analiza działań SEO i content marketingowych, które przyniosły spektakularne wyniki w 6 miesięcy.', status: 'draft' as const, updatedAt: 'tydzień temu', platform: 'WordPress', categories: ['Case study', 'SEO'] },
]

const FILTERS = [
  { key: 'status', label: 'Status', options: [{ value: 'draft', label: 'Szkice' }, { value: 'published', label: 'Opublikowane' }, { value: 'scheduled', label: 'Zaplanowane' }] },
  { key: 'platform', label: 'Platforma', options: [{ value: 'wordpress', label: 'WordPress' }, { value: 'mailchimp', label: 'Mailchimp' }] },
  { key: 'sort', label: 'Sortuj', options: [{ value: 'updated', label: 'Data edycji' }, { value: 'created', label: 'Data utworzenia' }] },
]

export default function DocumentsScreen() {
  return (
    <div className="flex h-full">
      <AppSidebar activeHref="/documents" user={{ name: 'Artur K.', email: 'artur@simplimo.pl', initials: 'AK' }} />
      <div className="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
        <div className="border-b bg-white px-8 py-4 flex itely-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Dokumenty</h1>
            <p className="text-xs text-muted-foreground mt-0.5">47 dokumentów łącznie</p>
          </div>
          <Button size="sm" className="gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Nowy dokument
          </Button>
        </div>

        <div className="px-8 py-4 border-b bg-white">
          <FilterBar placeholder="Szukaj dokumentów..." filters={FILTERS} />
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl">
            {DOCUMENTS.map(doc => (
              <DocumentCard key={doc.title} {...doc} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
