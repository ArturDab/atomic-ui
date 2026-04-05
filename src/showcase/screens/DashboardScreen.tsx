import { AppSidebar } from '@/components/blocks/app-sidebar'
import { StatCard } from '@/components/blocks/stat-card'
import { DocumentCard } from '@/components/blocks/document-card'
import { PromptCard } from '@/components/blocks/prompt-card'
import { Button } from '@/components/ui/button'
import { FileText, BookOpen, Zap, TrendingUp, Plus } from 'lucide-react'

const RECENT_DOCS = [
  { title: 'Jak pisać treści SEO, które naprawdę działają w 2025 roku', status: 'published' as const, updatedAt: 'wczoraj', platform: 'WordPress', categories: ['SEO', 'Marketing'] },
  { title: '10 narzędzi AI dla content marketerów – przegląd i porównanie', status: 'draft' as const, updatedAt: '2 godz. temu', platform: 'WordPress', categories: ['AI', 'Narzędzia'] },
  { title: 'Newsletter: Trendy w AI – wydanie #14', status: 'scheduled' as const, updatedAt: 'jutro 10:00', platform: 'Mailchimp' },
]

const QUICK_PROMPTS = [
  { category: 'SEO', title: 'Artykuł blogowy', description: 'Pełny artykuł SEO z nagłówkami, wstępem i meta description.', paramCount: 3 },
  { category: 'Social', title: 'Post LinkedIn', description: 'Angażujący post z hookiem, historią i silnym CTA.', paramCount: 2 },
  { category: 'Email', title: 'Newsletter tygodniowy', description: 'Newsletter z podsumowaniem tygodnia i linkami do artykułów.', paramCount: 4 },
]

export default function DashboardScreen() {
  return (
    <div className="flex h-full">
      <AppSidebar activeHref="/dashboard" user={{ name: 'Artur K.', email: 'artur@simplimo.pl', initials: 'AK' }} />
      <div className="flex-1 overflow-y-auto bg-[#fafafa]">
        <div className="border-b bg-white px-8 py-5">
          <p className="text-xs text-muted-foreground mb-0.5">Poniedziałek, 7 kwietnia 2025</p>
          <h1 className="text-2xl font-semibold tracking-tight">Dzień dobry, Artur 👋</h1>
        </div>

        <div className="px-8 py-6 space-y-8 max-w-5xl">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Wszystkie dokumenty" value={47} trend={12} trendLabel="ten miesiąc" icon={FileText} />
            <StatCard label="Opublikowane" value={31} trend={8} trendLabel="ten miesiąc" icon={BookOpen} />
            <StatCard label="Szablony promptów" value={18} trend={3} trendLabel="nowe" icon={Zap} />
            <StatCard label="Wygenerowane słowa" value="124k" trend={22} trendLabel="ten miesiąc" icon={TrendingUp} />
          </div>

          {/* Recent docs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold">Ostatnie dokumenty</h2>
              <Button size="sm" className="h-8 gap-1.5 text-xs">
                <Plus className="w-3.5 h-3.5" /> Nowy dokument
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {RECENT_DOCS.map(doc => (
                <DocumentCard key={doc.title} {...doc}
                  excerpt="Poznaj sprawdzone techniki i strategie, które pomogą Ci tworzyć treści wysoko pozycjonowane w Google."
                />
              ))}
            </div>
          </div>

          {/* Quick start */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold">Szybki start</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Wybierz szablon i zacznij generować</p>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                Wszystkie prompty →
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {QUICK_PROMPTS.map(p => <PromptCard key={p.title} {...p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
