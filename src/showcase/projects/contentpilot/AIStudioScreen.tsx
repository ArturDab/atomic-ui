import { Link, useParams } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Wand2 } from 'lucide-react'

const GENERATORS = [
  {
    slug: 'article',
    name: 'Artykuł blogowy',
    desc: 'Generuj angażujące wpisy na bloga, artykuły i treści długoformatowe zoptymalizowane pod SEO.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="30" y="20" width="140" height="12" rx="3" fill="#e2e8f0"/>
        <rect x="30" y="40" width="110" height="8" rx="2" fill="#cbd5e1"/>
        <rect x="30" y="55" width="140" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="66" width="120" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="77" width="130" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="95" width="60" height="25" rx="3" fill="#e2e8f0"/>
        <rect x="98" y="95" width="72" height="8" rx="2" fill="#cbd5e1"/>
        <rect x="98" y="109" width="52" height="6" rx="2" fill="#e2e8f0"/>
      </svg>
    ),
  },
  {
    slug: 'product',
    name: 'Opis produktu',
    desc: 'Twórz przekonujące opisy e-commerce, które podkreślają korzyści i zachęcają do zakupu.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="60" y="15" width="80" height="70" rx="4" fill="#e2e8f0"/>
        <circle cx="100" cy="45" r="18" fill="#cbd5e1"/>
        <rect x="70" y="92" width="60" height="8" rx="2" fill="#94a3b8"/>
        <rect x="35" y="108" width="130" height="6" rx="2" fill="#e2e8f0"/>
        <circle cx="72" cy="125" r="5" fill="#94a3b8"/>
        <circle cx="90" cy="125" r="5" fill="#e2e8f0"/>
        <circle cx="108" cy="125" r="5" fill="#e2e8f0"/>
      </svg>
    ),
  },
  {
    slug: 'email',
    name: 'Email marketingowy',
    desc: 'Twórz skuteczne kampanie emailowe z tematami, treścią i wezwaniami do działania.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="30" y="25" width="140" height="90" rx="4" fill="#e2e8f0"/>
        <rect x="30" y="25" width="140" height="30" rx="4" fill="#cbd5e1"/>
        <circle cx="100" cy="40" r="8" fill="#94a3b8"/>
        <rect x="50" y="65" width="100" height="6" rx="2" fill="#cbd5e1"/>
        <rect x="60" y="76" width="80" height="6" rx="2" fill="#e2e8f0" opacity="0.8"/>
        <rect x="70" y="87" width="60" height="14" rx="3" fill="#94a3b8"/>
      </svg>
    ),
  },
  {
    slug: 'social',
    name: 'Post social media',
    desc: 'Twórz angażujące posty na LinkedIn, Facebook, Instagram i X zoptymalizowane pod każdą platformę.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="30" y="20" width="140" height="16" rx="3" fill="#e2e8f0"/>
        <circle cx="48" cy="55" r="12" fill="#cbd5e1"/>
        <rect x="68" y="48" width="80" height="8" rx="2" fill="#94a3b8"/>
        <rect x="68" y="60" width="55" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="80" width="140" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="91" width="110" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="108" width="30" height="14" rx="7" fill="#e2e8f0"/>
        <rect x="66" y="108" width="30" height="14" rx="7" fill="#e2e8f0"/>
        <rect x="102" y="108" width="40" height="14" rx="7" fill="#cbd5e1"/>
      </svg>
    ),
  },
  {
    slug: 'summary',
    name: 'Streszczenie tekstu',
    desc: 'Kondensuj długie teksty do zwięzłych, czytelnych streszczeń zachowujących kluczowe informacje.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="20" width="70" height="8" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="33" width="70" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="44" width="70" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="55" width="70" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="66" width="50" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="77" width="70" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="20" y="88" width="60" height="6" rx="2" fill="#e2e8f0"/>
        <path d="M105 70 L125 70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
        <path d="M115 60 L125 70 L115 80" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="130" y="30" width="50" height="8" rx="2" fill="#94a3b8"/>
        <rect x="130" y="45" width="50" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="130" y="56" width="40" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="130" y="67" width="45" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="130" y="78" width="35" height="6" rx="2" fill="#e2e8f0"/>
      </svg>
    ),
  },
  {
    slug: 'translate',
    name: 'Tłumaczenie',
    desc: 'Profesjonalne tłumaczenia z zachowaniem kontekstu, tonu i niuansów językowych.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="20" y="30" width="70" height="80" rx="4" fill="#e2e8f0"/>
        <rect x="30" y="42" width="50" height="6" rx="2" fill="#94a3b8"/>
        <rect x="30" y="54" width="40" height="5" rx="2" fill="#cbd5e1"/>
        <rect x="30" y="64" width="45" height="5" rx="2" fill="#cbd5e1"/>
        <text x="45" y="100" fontFamily="serif" fontSize="14" fill="#94a3b8" fontWeight="bold">EN</text>
        <rect x="110" y="30" width="70" height="80" rx="4" fill="#e2e8f0"/>
        <rect x="120" y="42" width="50" height="6" rx="2" fill="#94a3b8"/>
        <rect x="120" y="54" width="40" height="5" rx="2" fill="#cbd5e1"/>
        <rect x="120" y="64" width="45" height="5" rx="2" fill="#cbd5e1"/>
        <text x="135" y="100" fontFamily="serif" fontSize="14" fill="#94a3b8" fontWeight="bold">PL</text>
      </svg>
    ),
  },
  {
    slug: 'proofread',
    name: 'Korekta i redakcja',
    desc: 'Popraw gramatykę, styl i czytelność tekstu. Przepisz, skróć lub nadaj inny ton.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="30" y="20" width="120" height="8" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="34" width="140" height="6" rx="2" fill="#fca5a5" opacity="0.6"/>
        <rect x="30" y="45" width="100" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="56" width="130" height="6" rx="2" fill="#fca5a5" opacity="0.6"/>
        <rect x="30" y="67" width="110" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="30" y="85" width="140" height="6" rx="2" fill="#86efac" opacity="0.7"/>
        <rect x="30" y="96" width="120" height="6" rx="2" fill="#86efac" opacity="0.7"/>
        <rect x="30" y="107" width="100" height="6" rx="2" fill="#86efac" opacity="0.7"/>
        <circle cx="160" cy="35" r="10" fill="#e2e8f0"/>
        <path d="M155 35 L158 38 L165 31" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    slug: 'faq',
    name: 'Generator FAQ',
    desc: 'Generuj realistyczne pytania i odpowiedzi zoptymalizowane pod SEO i featured snippets.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="40" cy="40" r="12" fill="#e2e8f0"/>
        <text x="36" y="45" fontSize="14" fill="#94a3b8" fontWeight="bold">Q</text>
        <rect x="60" y="34" width="100" height="6" rx="2" fill="#94a3b8"/>
        <rect x="60" y="45" width="75" height="5" rx="2" fill="#e2e8f0"/>
        <circle cx="40" cy="80" r="12" fill="#e2e8f0"/>
        <text x="36" y="85" fontSize="14" fill="#94a3b8" fontWeight="bold">Q</text>
        <rect x="60" y="74" width="110" height="6" rx="2" fill="#94a3b8"/>
        <rect x="60" y="85" width="80" height="5" rx="2" fill="#e2e8f0"/>
        <circle cx="40" cy="116" r="12" fill="#e2e8f0"/>
        <text x="36" y="121" fontSize="14" fill="#94a3b8" fontWeight="bold">Q</text>
        <rect x="60" y="110" width="90" height="6" rx="2" fill="#94a3b8"/>
        <rect x="60" y="121" width="65" height="5" rx="2" fill="#e2e8f0"/>
      </svg>
    ),
  },
  {
    slug: 'seo',
    name: 'SEO meta tagi',
    desc: 'Generuj zoptymalizowane title tagi, meta description, Open Graph i słowa kluczowe.',
    illustration: (
      <svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="100" cy="50" r="18" fill="none" stroke="#e2e8f0" strokeWidth="3"/>
        <circle cx="100" cy="50" r="6" fill="none" stroke="#e2e8f0" strokeWidth="3"/>
        <line x1="114" y1="64" x2="130" y2="80" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round"/>
        <rect x="30" y="88" width="140" height="8" rx="2" fill="#94a3b8"/>
        <rect x="45" y="102" width="110" height="6" rx="2" fill="#e2e8f0"/>
        <rect x="55" y="113" width="90" height="6" rx="2" fill="#e2e8f0"/>
      </svg>
    ),
  },
]

export default function AIStudioScreen() {
  const { projectSlug } = useParams<{ projectSlug: string }>()

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <div className="flex-1 overflow-y-auto bg-[#fafafa]">
          {/* Header */}
          <div className="flex flex-col items-center pt-12 pb-8 px-6">
            <div className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center mb-4">
              <Wand2 className="w-8 h-8 text-background" strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight mb-2">AI Studio</h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm leading-relaxed">
              Generuj profesjonalne treści za pomocą szablonów AI. Wybierz generator i uzupełnij szczegóły.
            </p>
          </div>

          {/* Generator grid */}
          <div className="px-8 pb-12 max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-3 gap-4">
              {GENERATORS.map(gen => (
                <Link
                  key={gen.slug}
                  to={`/projects/${projectSlug}/ai-studio/${gen.slug}`}
                  className="border rounded-xl bg-white hover:border-foreground/30 hover:shadow-sm transition-all overflow-hidden group"
                >
                  <div className="h-36 bg-muted/20 flex items-center justify-center px-6 py-4 border-b">
                    {gen.illustration}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-sm mb-1">{gen.name}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{gen.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
