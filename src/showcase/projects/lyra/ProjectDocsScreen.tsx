/**
 * ProjectDocsScreen – dokumentacja per projekt.
 * Zawiera gotowy prompt startowy z edytowalnymi polami.
 * Per-projekt: oddzielne pola dla Atomic UI i dla docelowej aplikacji.
 */
import React, { useState, useEffect } from 'react'
import { ClipboardCopy, Check, Pencil, BookOpen, Code2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Edytowalne pole ───────────────────────────────────────────────────────────

const STORAGE_KEY = 'lyra-docs-values'

function loadValues(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveValues(v: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
}

function EditableField({ fieldKey, placeholder, values, onChange }: {
  fieldKey: string
  placeholder: string
  values: Record<string, string>
  onChange: (key: string, val: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const val = values[fieldKey] || ''

  const start = () => { setEditing(true); setDraft(val) }
  const confirm = () => { onChange(fieldKey, draft); setEditing(false) }

  if (editing) {
    return (
      <span className="inline-flex items-center gap-1">
        <input autoFocus value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') setEditing(false) }}
          className="bg-background border rounded px-1.5 py-0.5 text-xs font-mono outline-none focus:ring-1 focus:ring-ring min-w-[180px]"
          placeholder={placeholder}
        />
        <button onClick={confirm} className="text-emerald-600 hover:text-emerald-700">
          <Check className="w-3 h-3" />
        </button>
      </span>
    )
  }

  return (
    <button onClick={start}
      className={cn(
        'inline-flex items-center gap-1 px-1.5 rounded border transition-colors group text-xs font-mono',
        val ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
      )}
      title="Kliknij aby edytować">
      {val || `← ${placeholder}`}
      <Pencil className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
    </button>
  )
}

// ── Kod z edytowalnymi polami ─────────────────────────────────────────────────

function EditableCode({ lines, values, onChange }: {
  lines: (string | { key: string; placeholder: string })[][]
  values: Record<string, string>
  onChange: (key: string, val: string) => void
}) {
  return (
    <div className="bg-muted/50 border rounded-lg overflow-hidden">
      <pre className="px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap">
        {lines.map((line, i) => (
          <React.Fragment key={i}>
            {line.map((part, j) =>
              typeof part === 'string'
                ? <span key={j}>{part}</span>
                : <EditableField key={j} fieldKey={part.key} placeholder={part.placeholder} values={values} onChange={onChange} />
            )}
            {i < lines.length - 1 && '\n'}
          </React.Fragment>
        ))}
      </pre>
    </div>
  )
}

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyButton({ label, getText }: { label: string; getText: () => string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(getText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg border bg-white hover:bg-muted transition-colors font-medium">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
      {copied ? 'Skopiowano!' : label}
    </button>
  )
}

// ── Sekcje docs ───────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'atomic',   label: 'Sesja Atomic UI',          icon: BookOpen  },
  { id: 'lyra',     label: 'Sesja Lyra (nowy projekt)', icon: Sparkles  },
  { id: 'claude',   label: 'CLAUDE.md aplikacji',       icon: Code2     },
]

export default function ProjectDocsScreen() {
  const [values, setValues] = useState<Record<string, string>>(() => loadValues())
  const [active, setActive] = useState('atomic')

  const onChange = (key: string, val: string) => {
    const next = { ...values, [key]: val }
    setValues(next)
    saveValues(next)
  }

  // Zbuduj prompt z wartości
  const atomicPrompt = () => {
    const token = values['atomic_token'] || 'UZUPEŁNIJ_TOKEN'
    return `# Atomic UI – sesja robocza

## Repo
GitHub: https://github.com/ArturDab/atomic-ui
Token: ${token}
Vercel: https://atomic-ui-sandy.vercel.app

## Projekt: Lyra
Faza: Design System + Moduły
Widoki: 7 makiet, 3 motywy (Ink/Nova/Folio), 4 hooki w src/modules/lyra/

## Stack
React 18 + TypeScript + Vite 5 + Tailwind CSS v3 + Shadcn/ui

## Workflow
git clone https://ArturDab:${token}@github.com/ArturDab/atomic-ui.git /tmp/atomic-ui
git -C /tmp/atomic-ui config user.email "claude@anthropic.com"
git -C /tmp/atomic-ui config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

## Zasady
- h-14 dla wszystkich nagłówków pierwszego rzędu
- text-foreground/85 minimum dla elementów nawigacyjnych
- Moduły w src/modules/[nazwa]/ – hooki + typy + komponenty
- Buduj → npm run build → zero błędów → push

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`
  }

  const lyraPrompt = () => {
    const repoToken = values['lyra_token'] || 'UZUPEŁNIJ_TOKEN'
    const repoUrl = values['lyra_repo'] || 'https://github.com/OWNER/lyra.git'
    const vercel = values['lyra_vercel'] || 'https://lyra.vercel.app'
    const supabase = values['lyra_supabase'] || 'https://xyz.supabase.co'
    const designSystem = values['lyra_ds'] || 'Ink'
    return `# Lyra – sesja robocza

## Repo
GitHub: ${repoUrl}
Token: ${repoToken}
Deploy: ${vercel}

## Backend
Supabase: ${supabase}

## Stack
Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui + Supabase + Vercel

## Design System
Wariant: ${designSystem}
Tokeny: src/styles/tokens.css

## Moduły z Atomic UI
Źródło: github.com/ArturDab/atomic-ui (src/modules/lyra/)
Hooki: useDashboard, useArticleEditor, useBookEditor, useAIConversation
Zasada: logika UI zostaje, warstwa danych (Supabase) się zmienia.

## Workflow
git clone https://OWNER:${repoToken}@... /tmp/lyra
git config user.email "claude@anthropic.com"
git config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`
  }

  const claudeMd = () => {
    const repoToken = values['lyra_token'] || 'TOKEN'
    const designSystem = values['lyra_ds'] || 'Ink'
    return `# Lyra – instrukcja dla Claude

## Czym jest ten projekt
Lyra to aplikacja do tworzenia treści z AI – artykuły, opracowania i książki.
Użytkownicy mogą pisać, edytować z pomocą AI i publikować bezpośrednio do WordPress.

## Repo
GitHub: ${values['lyra_repo'] || 'https://github.com/OWNER/lyra.git'}
Token: ${repoToken} (przekazywany przez użytkownika na początku sesji)
Deploy: ${values['lyra_vercel'] || 'https://lyra.vercel.app'}

## Workflow
git clone https://OWNER:TOKEN@... /tmp/lyra
git config user.email "claude@anthropic.com" && git config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

## Stack
Next.js 14 + TypeScript + Tailwind CSS v3 + Shadcn/ui + Supabase + Vercel

## Design System
Wariant: ${designSystem}
Tokeny CSS: src/styles/tokens.css
Zasada: nigdy nie używaj hardkodowanych kolorów – tylko tokeny.

## Moduły z Atomic UI
Źródło: github.com/ArturDab/atomic-ui
Zasada: logika UI pochodzi z modułów, warstwa danych (Supabase) w src/lib/db/

## Struktura projektu
src/
├── app/              – Next.js App Router
├── components/       – UI komponenty (zaadaptowane z Atomic UI)
├── modules/          – Skopiowane z Atomic UI src/modules/
├── lib/
│   ├── db/           – Supabase queries
│   └── ai/           – API calls do modeli AI
├── styles/
│   └── tokens.css    – Design system tokens
└── types/            – Globalne typy

## Zasady kodu
- Dziedziczone z Atomic UI (CLAUDE.md tamtego repo)
- Wszystkie dane przez src/lib/db/ – nigdy bezpośrednio w komponentach
- AI calls przez src/lib/ai/ – nigdy inline w komponentach
- h-14 dla wszystkich nagłówków pierwszego rzędu (token niepodważalny)`
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-52 border-r shrink-0 p-4">
        <p className="text-xs font-semibold text-foreground/55 uppercase tracking-widest mb-4">Dokumentacja</p>
        <nav className="space-y-1">
          {SECTIONS.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={cn(
                'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                active === s.id
                  ? 'bg-foreground text-background font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}>
              <s.icon className="w-3.5 h-3.5 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>

        <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs font-medium text-amber-800 mb-1">Pola edytowalne</p>
          <p className="text-[10px] text-amber-700 leading-relaxed">
            Kliknij podświetlone pola żeby wpisać token, URL i inne dane. Zapisują się w przeglądarce.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">

          {/* Sesja Atomic UI */}
          {active === 'atomic' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">Prompt startowy – Atomic UI</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Wklej to na początku każdej sesji w projekcie Claude "Atomic UI".
                  Uzupełnij token klikając podświetlone pole.
                </p>
              </div>

              <EditableCode
                values={values}
                onChange={onChange}
                lines={[
                  ['# Atomic UI – sesja robocza'],
                  [''],
                  ['## Repo'],
                  ['GitHub: https://github.com/ArturDab/atomic-ui'],
                  ['Token: ', { key: 'atomic_token', placeholder: 'ghp_...' }],
                  ['Vercel: https://atomic-ui-sandy.vercel.app'],
                  [''],
                  ['## Projekt: Lyra'],
                  ['Faza: Design System + Moduły'],
                  ['Widoki: 7 makiet, 3 motywy (Ink/Nova/Folio), 4 hooki'],
                  [''],
                  ['Sklonuj repo, przeczytaj CLAUDE.md i zacznij.'],
                ]}
              />

              <CopyButton label="Kopiuj prompt startowy Atomic UI" getText={atomicPrompt} />

              <div className="border-t pt-6 space-y-3">
                <h3 className="text-sm font-semibold">Stan projektu Lyra</h3>
                {[
                  { label: 'Makiety', value: '7 widoków', done: true },
                  { label: 'Design System', value: '3 motywy (Ink, Nova, Folio)', done: true },
                  { label: 'Moduły', value: '4 hooki, 12 typów TS', done: true },
                  { label: 'Komponenty UI do modułów', value: 'W toku', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm text-foreground/80">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{item.value}</span>
                      {item.done
                        ? <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        : <div className="w-2 h-2 rounded-full bg-amber-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Sesja Lyra */}
          {active === 'lyra' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">Prompt startowy – Lyra</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Wklej to na początku każdej sesji w projekcie Claude "Lyra".
                  Uzupełnij wszystkie podświetlone pola.
                </p>
              </div>

              <EditableCode
                values={values}
                onChange={onChange}
                lines={[
                  ['# Lyra – sesja robocza'],
                  [''],
                  ['## Repo'],
                  ['GitHub: ', { key: 'lyra_repo', placeholder: 'https://github.com/OWNER/lyra.git' }],
                  ['Token: ', { key: 'lyra_token', placeholder: 'ghp_...' }],
                  ['Deploy: ', { key: 'lyra_vercel', placeholder: 'https://lyra.vercel.app' }],
                  [''],
                  ['## Backend'],
                  ['Supabase: ', { key: 'lyra_supabase', placeholder: 'https://xyz.supabase.co' }],
                  ['Supabase key: ', { key: 'lyra_supabase_key', placeholder: 'eyJ...' }],
                  [''],
                  ['## Design System'],
                  ['Wariant: ', { key: 'lyra_ds', placeholder: 'Ink / Nova / Folio' }],
                  [''],
                  ['## Moduły z Atomic UI'],
                  ['Hooki: useDashboard, useArticleEditor, useBookEditor, useAIConversation'],
                  [''],
                  ['Sklonuj repo, przeczytaj CLAUDE.md i zacznij.'],
                ]}
              />

              <CopyButton label="Kopiuj prompt startowy Lyra" getText={lyraPrompt} />
            </>
          )}

          {/* CLAUDE.md */}
          {active === 'claude' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">CLAUDE.md – Lyra</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Ten plik trafia do korzenia repo aplikacji Lyra.
                  Claude czyta go przy każdym klonowaniu.
                </p>
              </div>

              <div className="bg-muted/50 border rounded-lg overflow-hidden">
                <pre className="px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
                  {claudeMd()}
                </pre>
              </div>

              <CopyButton label="Kopiuj CLAUDE.md" getText={claudeMd} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
