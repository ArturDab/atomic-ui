import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Pencil, Check, ClipboardCopy } from 'lucide-react'


// ── Przycisk kopiowania promptu ───────────────────────────────────────────────

function CopyPromptButton({ label, getText }: { label: string; getText: () => string }) {
  const [copied, setCopied] = React.useState(false)
  const copy = () => {
    navigator.clipboard.writeText(getText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-white hover:bg-muted transition-colors font-medium">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
      {copied ? 'Skopiowano!' : label}
    </button>
  )
}

// ── Edytowalny blok kodu ──────────────────────────────────────────────────────
// Pola z [[ ]] są edytowalne i zapisywane w localStorage

const EDITABLE_KEY = 'docs-editable-values'

function loadValues(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(EDITABLE_KEY) || '{}') } catch { return {} }
}
function saveValues(v: Record<string, string>) {
  localStorage.setItem(EDITABLE_KEY, JSON.stringify(v))
}

function EditableCode({ template, fields }: { template: string; fields: string[] }) {
  const [values, setValues] = useState<Record<string, string>>(() => loadValues())
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState('')

  const startEdit = (field: string) => {
    setEditing(field)
    setDraft(values[field] || '')
  }
  const confirm = () => {
    if (!editing) return
    const next = { ...values, [editing]: draft }
    setValues(next)
    saveValues(next)
    setEditing(null)
  }

  // Render template with editable slots
  const parts = template.split(/(\[\[[\w_]+\]\])/g)

  return (
    <div className="bg-muted/50 border rounded-lg overflow-hidden">
      <pre className="px-4 py-3 text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
        {parts.map((part, i) => {
          const match = part.match(/^\[\[([\w_]+)\]\]$/)
          if (!match) return <span key={i}>{part}</span>
          const field = match[1]
          const val = values[field] || ''
          if (editing === field) {
            return (
              <span key={i} className="inline-flex items-center gap-1">
                <input
                  autoFocus
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') setEditing(null) }}
                  className="bg-background border rounded px-1.5 py-0.5 text-xs font-mono outline-none focus:ring-1 focus:ring-ring min-w-[180px]"
                  placeholder={`wpisz ${field}...`}
                />
                <button onClick={confirm} className="text-emerald-600 hover:text-emerald-700">
                  <Check className="w-3 h-3" />
                </button>
              </span>
            )
          }
          return (
            <button key={i} onClick={() => startEdit(field)}
              className={cn(
                'inline-flex items-center gap-1 px-1.5 rounded border transition-colors group',
                val
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                  : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 animate-pulse'
              )}
              title="Kliknij aby edytować"
            >
              {val || `← uzupełnij`}
              <Pencil className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100" />
            </button>
          )
        })}
      </pre>
    </div>
  )
}

// ── Zwykły kod (nieinteraktywny) ──────────────────────────────────────────────
function Code({ children }: { children: string }) {
  return (
    <pre className="bg-muted/50 border rounded-lg px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
      {children}
    </pre>
  )
}

// ── Sekcja ────────────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {children}
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-xs text-muted-foreground/70 flex gap-2">
      <span className="shrink-0">↳</span><span>{children}</span>
    </p>
  )
}

// ── Sekcje docs ───────────────────────────────────────────────────────────────
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
        <Section title="Prompt startowy – Atomic UI (kliknij pola żeby uzupełnić)">
          <EditableCode
            fields={['TOKEN']}
            template={`# Atomic UI – sesja robocza

Repo: https://github.com/ArturDab/atomic-ui
Token: [[TOKEN]]
Vercel: https://atomic-ui-sandy.vercel.app

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`}
          />
          <div className="mt-2 flex gap-2">
            <CopyPromptButton
              label="Kopiuj prompt startowy Atomic UI"
              getText={() => {
                const values = loadValues()
                return `# Atomic UI – sesja robocza

Repo: https://github.com/ArturDab/atomic-ui
Token: ${values['TOKEN'] || 'UZUPEŁNIJ_TOKEN'}
Vercel: https://atomic-ui-sandy.vercel.app

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`
              }}
            />
          </div>
          <Note>Wklej to na początku każdej nowej konwersacji w projekcie Atomic UI. Token zapisuje się w przeglądarce.</Note>
        </Section>

        <Section title="Klonowanie repo (Claude robi to sam)">
          <EditableCode
            fields={['TOKEN']}
            template={`git clone https://ArturDab:[[TOKEN]]@github.com/ArturDab/atomic-ui.git /tmp/atomic-ui
git -C /tmp/atomic-ui config user.email "claude@anthropic.com"
git -C /tmp/atomic-ui config user.name "Claude"`}
          />
        </Section>

        <Section title="Po zmianach">
          <Code>{`npm run build   # zero błędów przed push
git add -A && git commit -m "opis" && git push origin main
# Vercel deployuje automatycznie (~60s)`}</Code>
        </Section>

        <Section title="Tokeny layoutu – niepodważalne">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="border-b text-left">
              <th className="py-2 pr-6 font-semibold">Element</th>
              <th className="py-2 font-semibold">Token</th>
            </tr></thead>
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
            Przyjmuje dane przez propsy, nie hardkoduje niczego, nie wie nic o aplikacji-hoście.
          </p>
        </Section>

        <Section title="Jak powstaje moduł (Claude robi to sam)">
          <ol className="space-y-3 text-sm">
            {[
              'Prototyp w showcase/ jest zatwierdzony wizualnie i UX-owo',
              'Identyfikacja propsów – co pochodzi z zewnątrz (dane, callbacki, konfiguracja)',
              'Definicja interfejsu TypeScript',
              'Wymiana hardkodowanych danych na propsy',
              'Przeniesienie do src/modules/[nazwa]/',
              'Showcase używa teraz modułu z przykładowymi danymi',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-muted-foreground">{step}</span>
              </li>
            ))}
          </ol>
          <Note>Nie piszemy modułów od zera – refaktorujemy istniejące widoki z showcase.</Note>
        </Section>

        <Section title="Struktura modułu">
          <Code>{`src/modules/[nazwa]/
├── index.tsx       – główny komponent, eksport publiczny
├── types.ts        – interfejsy propsów i typów danych
├── hooks/          – logika stanu, bez danych
└── components/     – podkomponenty wewnętrzne`}</Code>
        </Section>

        <Section title="Przenoszenie do aplikacji">
          <ol className="space-y-2 text-sm">
            {[
              'Skopiuj src/modules/[nazwa] do repo docelowej aplikacji',
              'Podmień tokeny design systemu (CSS variables lub Tailwind config)',
              'Podłącz do backendu aplikacji (zastąp puste hooki prawdziwymi)',
              'Nie zmieniaj logiki UI – tylko warstwa danych',
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
            Każda aplikacja docelowa ma osobny projekt w Claude.ai.
            Nie mieszaj z projektem Atomic UI.
          </p>
        </Section>

        <Section title="Krok 2 – Prompt startowy nowej aplikacji (uzupełnij pola)">
          <EditableCode
            fields={['NAZWA', 'OWNER', 'REPO_TOKEN', 'DEPLOY_URL', 'STACK', 'MODUŁY']}
            template={`# [[NAZWA]] – sesja robocza

Repo: https://github.com/[[OWNER]]/[[NAZWA]].git
Token: [[REPO_TOKEN]]
Deploy: [[DEPLOY_URL]]

Stack: [[STACK]]
Moduły z Atomic UI: [[MODUŁY]]

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`}
          />
          <Note>Każda aplikacja ma osobny zestaw pól. Token zapisuje się lokalnie w przeglądarce.</Note>
        </Section>

        <Section title="Krok 3 – design system">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Na początku pierwszej sesji Claude proponuje 3 warianty design systemu do wyboru.
            Po wyborze wdraża tokeny i przenosi moduły z Atomic UI.
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
git config user.email "claude@anthropic.com" && git config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

## Stack
[rzeczywisty stack]

## Design system
Wariant: [nazwa wybranego wariantu]
Tokeny: [ścieżka do pliku]

## Moduły z Atomic UI
Źródło: github.com/ArturDab/atomic-ui
Zasada: logika UI zostaje, warstwa danych się zmienia.

## Zasady kodu
Dziedziczone z Atomic UI (CLAUDE.md tamtego repo).
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
              'Ogólny kontekst z userMemories (kim jesteś, projekty, preferencje)',
              'Zawartość CLAUDE.md – jeśli mi każesz ją przeczytać',
              'Historia z narzędzia past_chats – jeśli sesja jest w tym samym projekcie',
            ].map((item, i) => (
              <li key={i} className="flex gap-2"><span className="text-emerald-600 shrink-0">✓</span> {item}</li>
            ))}
          </ul>
        </Section>

        <Section title="Czego nie pamiętam">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              'Szczegółów kodu z poprzedniej sesji',
              'Które dokładnie pliki zostały zmienione',
              'Rozmów z innych projektów Claude',
            ].map((item, i) => (
              <li key={i} className="flex gap-2"><span className="text-muted-foreground/50 shrink-0">✗</span> {item}</li>
            ))}
          </ul>
          <Note>CLAUDE.md w repo jest ważniejszy niż pamięć. Klonuję repo → czytam plik → wiem gdzie jestem.</Note>
        </Section>

        <Section title="Jak zacząć nową sesję">
          <ol className="space-y-2 text-sm">
            {[
              'Otwórz projekt Claude (Atomic UI lub aplikacja)',
              'Wklej Prompt startowy z tokenem (z zakładki Workflow powyżej)',
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

// ── Główna strona ─────────────────────────────────────────────────────────────
export default function DocsPage() {
  const [active, setActive] = useState('workflow')
  const section = CONTENT[active]

  return (
    <div className="flex h-full">
      <div className="w-48 border-r shrink-0 p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Dokumentacja</p>
        <nav className="space-y-1">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                active === s.id
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}>
              {s.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8">
          <h1 className="text-xl font-semibold mb-6">{section.title}</h1>
          {section.body}
        </div>
      </div>
    </div>
  )
}
