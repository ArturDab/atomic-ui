import { useState } from 'react'
import { cn } from '@/lib/utils'

const SECTIONS = [
  { id: 'workflow', label: 'Workflow' },
  { id: 'modules',  label: 'Moduły' },
  { id: 'apps',     label: 'Nowa aplikacja' },
  { id: 'memory',   label: 'Pamięć Claude' },
]

const CONTENT: Record<string, { title: string; body: React.ReactNode }> = {

  workflow: {
    title: 'Workflow – każda sesja',
    body: (
      <div className="space-y-6">
        <Section title="Klonowanie repo">
          <Code>{`git clone https://ArturDab:TOKEN@github.com/ArturDab/atomic-ui.git /tmp/atomic-ui
git -C /tmp/atomic-ui config user.email "claude@anthropic.com"
git -C /tmp/atomic-ui config user.name "Claude"`}</Code>
          <Note>Token przekazujesz Claude na początku sesji lub wklejasz z Prompt startowego.</Note>
        </Section>

        <Section title="Po zmianach">
          <Code>{`npm run build   # zero błędów przed push
git add -A
git commit -m "opis zmian"
git push origin main
# Vercel deployuje automatycznie (~60s)`}</Code>
        </Section>

        <Section title="Prompt startowy – Atomic UI">
          <Code>{`# Atomic UI – sesja robocza

Repo: https://github.com/ArturDab/atomic-ui
Token: ghp_...
Vercel: https://atomic-ui-sandy.vercel.app

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`}</Code>
          <Note>Wklej to na początku każdej nowej konwersacji w projekcie Atomic UI.</Note>
        </Section>

        <Section title="Struktura repo">
          <Code>{`src/components/ui/      – atomy bazowe (Shadcn)
src/components/blocks/  – bloki kompozytowe (SidePanel, etc.)
src/modules/            – moduły gotowe do przeniesienia do aplikacji
src/showcase/           – prototypy i demonstracje
src/registry/           – dokumentacja wyświetlana w tej bibliotece`}</Code>
        </Section>

        <Section title="Tokeny layoutu – niepodważalne">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 pr-6 font-semibold">Element</th>
                <th className="py-2 font-semibold">Token</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ['Nagłówek pierwszego rzędu', 'h-14'],
                ['Przycisk głównej akcji', 'h-10, justify-start, ikona mr-2'],
                ['SidePanel szerokość', 'w-72'],
                ['Item padding w SidePanel', 'px-4 py-2.5'],
                ['Tekst główny', 'text-sm'],
                ['Tekst pomocniczy', 'text-xs text-muted-foreground'],
              ].map(([el, tok]) => (
                <tr key={el}>
                  <td className="py-2 pr-6 text-muted-foreground">{el}</td>
                  <td className="py-2 font-mono text-xs bg-muted/30 px-2 rounded">{tok}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </div>
    ),
  },

  modules: {
    title: 'Moduły – co to jest i jak powstają',
    body: (
      <div className="space-y-6">
        <Section title="Definicja">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Moduł to kompletny, funkcjonalny fragment UI gotowy do przeniesienia do dowolnej aplikacji.
            Przyjmuje dane przez propsy, nie hardkoduje niczego wewnątrz, nie wie nic o aplikacji host.
          </p>
        </Section>

        <Section title="Jak powstaje moduł">
          <ol className="space-y-3 text-sm">
            {[
              'Prototyp w showcase/ jest zatwierdzony wizualnie i UX-owo',
              'Claude identyfikuje co pochodzi z zewnątrz (dane, callbacki, konfiguracja)',
              'Definiuje interfejs propsów TypeScript',
              'Zastępuje hardkodowane dane propsami',
              'Przenosi do src/modules/[nazwa]/',
              'Showcase używa teraz modułu z przykładowymi danymi',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <Note>Nie piszemy modułów od zera – przenosimy i refaktorujemy istniejące widoki.</Note>
        </Section>

        <Section title="Struktura modułu">
          <Code>{`src/modules/documents/
├── index.tsx          – główny komponent, eksport publiczny
├── types.ts           – interfejsy propsów i typów danych
├── hooks/
│   └── useDocuments.ts  – logika stanu, bez danych
└── components/
    └── ...            – podkomponenty wewnętrzne`}</Code>
        </Section>

        <Section title="Przenoszenie do aplikacji">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Wykonuje Claude. Użytkownik tylko podaje nazwę modułu i repo docelowe.
          </p>
          <ol className="space-y-2 text-sm">
            {[
              'Skopiuj src/modules/[nazwa] do repo aplikacji',
              'Podmień tokeny design systemu (CSS variables lub Tailwind config)',
              'Podłącz do backendu aplikacji (zastąp puste hooki prawdziwymi)',
              'Nie zmieniaj logiki UI',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    ),
  },

  apps: {
    title: 'Nowa aplikacja – jak zacząć',
    body: (
      <div className="space-y-6">
        <Section title="Krok 1 – nowy projekt Claude">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Każda aplikacja docelowa ma osobny projekt w Claude.ai. Nie mieszaj z projektem Atomic UI.
            Nazwij projekt tak jak aplikację.
          </p>
        </Section>

        <Section title="Krok 2 – Prompt startowy nowej aplikacji">
          <Code>{`# [NazwaAplikacji] – sesja robocza

## Repo
GitHub: https://github.com/[owner]/[nazwa].git
Token: ghp_...
Deploy: [Vercel/Railway URL]

## Stack
[np. Next.js 14 + Supabase + Vercel]

## Moduły z Atomic UI
[lista modułów do przeniesienia]

## Co robimy dzisiaj
[opis zadania na tę sesję]

---
Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`}</Code>
          <Note>CLAUDE.md aplikacji Claude tworzy przy pierwszym setupie, wypełniając rzeczywistą strukturę projektu.</Note>
        </Section>

        <Section title="Krok 3 – design system">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Na początku pierwszej sesji Claude proponuje 3 warianty design systemu do wyboru
            (kolory, fonty, radius, ogólny styl). Użytkownik wybiera jeden.
            Claude wdraża go jako tokeny CSS/Tailwind i przenosi moduły.
          </p>
        </Section>

        <Section title="Szablon CLAUDE.md aplikacji">
          <Code>{`# [NazwaAplikacji] – instrukcja dla Claude

## Czym jest ten projekt
[Jeden akapit: co robi, dla kogo, główny cel.]

## Repo
GitHub: https://github.com/[owner]/[nazwa].git
Token: ghp_... (przekazywany przez użytkownika na początku sesji)
Deploy: [URL]

## Workflow
git clone https://[owner]:TOKEN@... /tmp/[nazwa]
git config user.email "claude@anthropic.com"
git config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

## Stack
[rzeczywisty stack]

## Design system
Wariant: [nazwa wybranego wariantu]
Tokeny: [ścieżka do pliku]

## Moduły z Atomic UI
Źródło: github.com/ArturDab/atomic-ui
Logika UI: nie zmieniaj – zmieniaj tylko warstwę danych.

## Zasady kodu
Dziedziczone z Atomic UI (CLAUDE.md w tamtym repo).
Dodatkowe zasady tej aplikacji:
- [specyficzne dla projektu]`}</Code>
        </Section>
      </div>
    ),
  },

  memory: {
    title: 'Pamięć Claude – co widzę, czego nie widzę',
    body: (
      <div className="space-y-6">
        <Section title="Co pamiętam między sesjami">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              'Ogólny kontekst z userMemories (kim jesteś, jakie projekty prowadzisz, preferencje)',
              'To co jest zapisane w CLAUDE.md – jeśli mi każesz to przeczytać',
              'Historia z narzędzia past_chats – jeśli sesja jest w tym samym projekcie Claude',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-600 shrink-0">✓</span> {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Czego nie pamiętam">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              'Szczegółów kodu napisanego w poprzedniej sesji',
              'Które dokładnie pliki zostały zmienione',
              'Rozmów z innych projektów Claude',
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-muted-foreground/50 shrink-0">✗</span> {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Dlatego CLAUDE.md jest ważniejszy niż pamięć">
          <p className="text-sm text-muted-foreground leading-relaxed">
            CLAUDE.md w repo to moje pierwsze źródło prawdy. Klonuję repo → czytam plik → wiem gdzie jestem.
            Pamięć uzupełnia kontekst, ale nie zastępuje dokumentacji w kodzie.
          </p>
        </Section>

        <Section title="Jak zacząć nową sesję">
          <ol className="space-y-2 text-sm">
            {[
              'Otwórz projekt Claude (Atomic UI lub aplikacja)',
              'Wklej Prompt startowy z tokenem',
              'Napisz co chcesz zrobić w tej sesji',
              'Claude klonuje repo, czyta CLAUDE.md, zaczyna',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0">{i + 1}</span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    ),
  },
}

// ── Subkomponenty ─────────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {children}
    </div>
  )
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-muted/50 border rounded-lg px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
      {children}
    </pre>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-xs text-muted-foreground/70 flex gap-2">
      <span className="shrink-0">↳</span>
      <span>{children}</span>
    </p>
  )
}

// ── Główna strona ─────────────────────────────────────────────────────────────

export default function DocsPage() {
  const [active, setActive] = useState('workflow')
  const section = CONTENT[active]

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-48 border-r shrink-0 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Dokumentacja</p>
        <nav className="space-y-1">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                active === s.id
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8">
          <h1 className="text-xl font-semibold mb-6">{section.title}</h1>
          {section.body}
        </div>
      </div>
    </div>
  )
}
