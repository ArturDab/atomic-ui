/**
 * Zephyr – Docs & Prompty
 * Identyczna struktura jak Lyra (ProjectDocsScreen).
 * Trzy zakładki: Sesja Atomic UI / Sesja Zephyr / CLAUDE.md
 * Edytowalne pola zapisują się w localStorage.
 */
import React, { useState } from 'react'
import { ClipboardCopy, Check, Pencil, BookOpen, Code2, Wind } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'zephyr-docs-values'

function loadValues(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function saveValues(v: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
}

// ── Edytowalne pole ───────────────────────────────────────────────────────────

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

// ── Przycisk kopiowania ───────────────────────────────────────────────────────

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

// ── Sekcje ────────────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'atomic',  label: 'Sesja Atomic UI',           icon: BookOpen },
  { id: 'zephyr',  label: 'Sesja Zephyr (nowy projekt)', icon: Wind    },
  { id: 'claude',  label: 'CLAUDE.md aplikacji',        icon: Code2   },
]

// ── Główny komponent ──────────────────────────────────────────────────────────

export default function ZephyrDocsScreen() {
  const [values, setValues] = useState<Record<string, string>>(() => loadValues())
  const [active, setActive] = useState('atomic')

  const onChange = (key: string, val: string) => {
    const next = { ...values, [key]: val }
    setValues(next)
    saveValues(next)
  }

  // ── Generatory promptów ─────────────────────────────────────────────────────

  const atomicPrompt = () => {
    const token = values['atomic_token'] || 'UZUPEŁNIJ_TOKEN'
    return `# Atomic UI – sesja robocza

## Repo
GitHub: https://github.com/ArturDab/atomic-ui
Token: ${token}
Vercel: https://atomic-ui-sandy.vercel.app

## Projekt: Zephyr
Faza: Makiety + Design System + Moduły
Widoki: 6 makiet, 4 motywy (Sky/Slate/Sage/Noir), 3 hooki w src/modules/zephyr/

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
- Moduły w src/modules/zephyr/ – hooki + typy
- Buduj → npm run build → zero błędów → push

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`
  }

  const zephyrPrompt = () => {
    const token = values['zephyr_token'] || 'UZUPEŁNIJ_TOKEN'
    const repo = values['zephyr_repo'] || 'https://github.com/OWNER/zephyr.git'
    const vercel = values['zephyr_vercel'] || 'https://zephyr.vercel.app'
    const supabase = values['zephyr_supabase'] || 'https://xyz.supabase.co'
    const supabaseKey = values['zephyr_supabase_key'] || 'eyJ...'
    const anthropic = values['anthropic_key'] || 'sk-ant-...'
    const cfUrl = values['cf_url'] || 'https://images.zephyr.app'
    return `# Zephyr – sesja robocza

## Repo
GitHub: ${repo}
Token: ${token}
Vercel: ${vercel}

## Backend
Supabase URL: ${supabase}
Supabase Anon Key: ${supabaseKey}

## AI
Anthropic API Key: ${anthropic}

## Cloudflare (grafiki)
R2 Public URL: ${cfUrl}

## Stack
Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui + Supabase + Vercel

## Czym jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji obsługujących wielu klientów.
Konfiguracja per klient: kolory, font, instrukcje AI, biblioteka sekcji HTML, UTM-y.
Workflow: wybierz klienta → brief → sekcje → grafiki → AI generuje HTML → podgląd → eksport.

## Moduły z Atomic UI
Źródło: github.com/ArturDab/atomic-ui (src/modules/zephyr/)
Hooki: useClients, useNewsletterCreator, useArtifact
Zasada: logika UI zostaje, warstwa danych (Supabase) się zmienia.

## Workflow
git clone https://OWNER:${token}@... /tmp/zephyr
git config user.email "claude@anthropic.com"
git config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

## Zasady
- h-14 dla wszystkich nagłówków pierwszego rzędu
- CSS variables zamiast hardkodowanych kolorów w UI
- HTML emaili: inline styles są wymagane (emaile nie obsługują CSS class)
- npm run build przed każdym push – zero błędów TypeScript

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`
  }

  const claudeMd = () => {
    const token = values['zephyr_token'] || 'TOKEN'
    return `# Zephyr – instrukcja dla Claude

## Czym jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji obsługujących wielu klientów.
Generuje gotowy HTML do wklejenia w Klaviyo/Mailchimp/SendGrid.
Konfiguracja per klient: kolory, font, instrukcje AI, biblioteka sekcji, UTM-y.

## Repo
GitHub: ${values['zephyr_repo'] || 'https://github.com/OWNER/zephyr.git'}
Token: ${token} (przekazywany przez użytkownika na początku sesji)
Vercel: ${values['zephyr_vercel'] || 'https://zephyr.vercel.app'}

## Workflow
git clone https://OWNER:TOKEN@... /tmp/zephyr
git config user.email "claude@anthropic.com" && git config user.name "Claude"
# po zmianach: git add -A && git commit -m "..." && git push origin main

## Stack
Next.js 14 + TypeScript + Tailwind CSS v3 + Shadcn/ui + Supabase + Vercel + Cloudflare R2

## Struktura projektu
src/
├── app/(app)/clients/        – lista klientów
├── app/(app)/clients/[id]/   – konfiguracja klienta
├── app/(app)/creator/        – kreator newslettera
├── app/(app)/artifact/       – podgląd + edycja
├── app/(app)/history/        – archiwum
├── app/api/generate/         – generacja HTML przez Anthropic API
├── app/api/upload/           – upload grafik do Cloudflare R2
├── modules/zephyr/           – hooki i typy (skopiowane z Atomic UI)
├── lib/supabase.ts           – klient Supabase
└── lib/ai.ts                 – wywołania Anthropic API

## Zasady kodu
- h-14 dla wszystkich nagłówków pierwszego rzędu (NIEPODWAŻALNE)
- CSS variables, nigdy hardkodowane kolory w UI
- HTML emaili: inline styles są wymagane (emaile nie obsługują CSS class)
- npm run build przed każdym push – zero błędów TypeScript

## Makiety
https://atomic-ui-sandy.vercel.app/projects/zephyr`
  }

  // ── Render ──────────────────────────────────────────────────────────────────

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

      {/* Treść */}
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
                  ['## Projekt: Zephyr'],
                  ['Faza: Makiety + Design System + Moduły'],
                  ['Widoki: 6 makiet, 4 motywy (Sky/Slate/Sage/Noir), 3 hooki'],
                  [''],
                  ['Sklonuj repo, przeczytaj CLAUDE.md i zacznij.'],
                ]}
              />

              <CopyButton label="Kopiuj prompt startowy Atomic UI" getText={atomicPrompt} />

              <div className="border-t pt-6 space-y-3">
                <h3 className="text-sm font-semibold">Stan projektu Zephyr w Atomic UI</h3>
                {[
                  { label: 'Makiety',      value: '6 widoków',                       done: true  },
                  { label: 'Design System', value: '4 motywy (Sky, Slate, Sage, Noir)', done: true  },
                  { label: 'Moduły',       value: '3 hooki, 14 typów TS',             done: true  },
                  { label: 'Supabase schema', value: 'SQL gotowy (SUPABASE_SCHEMA.sql)', done: true },
                  { label: 'Implementacja funkcjonalna', value: 'Claude Code → repo Zephyr', done: false },
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

          {/* Sesja Zephyr */}
          {active === 'zephyr' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">Prompt startowy – Zephyr</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Wklej to na początku każdej sesji w projekcie Claude "Zephyr".
                  Uzupełnij wszystkie podświetlone pola.
                </p>
              </div>

              <EditableCode
                values={values}
                onChange={onChange}
                lines={[
                  ['# Zephyr – sesja robocza'],
                  [''],
                  ['## Repo'],
                  ['GitHub: ', { key: 'zephyr_repo', placeholder: 'https://github.com/OWNER/zephyr.git' }],
                  ['Token: ',  { key: 'zephyr_token', placeholder: 'ghp_...' }],
                  ['Vercel: ', { key: 'zephyr_vercel', placeholder: 'https://zephyr.vercel.app' }],
                  [''],
                  ['## Backend'],
                  ['Supabase URL: ', { key: 'zephyr_supabase', placeholder: 'https://xyz.supabase.co' }],
                  ['Supabase Anon Key: ', { key: 'zephyr_supabase_key', placeholder: 'eyJ...' }],
                  [''],
                  ['## AI'],
                  ['Anthropic API Key: ', { key: 'anthropic_key', placeholder: 'sk-ant-...' }],
                  [''],
                  ['## Cloudflare (grafiki)'],
                  ['R2 Public URL: ', { key: 'cf_url', placeholder: 'https://images.zephyr.app' }],
                  [''],
                  ['## Moduły z Atomic UI'],
                  ['Hooki: useClients, useNewsletterCreator, useArtifact'],
                  [''],
                  ['Sklonuj repo, przeczytaj CLAUDE.md i zacznij.'],
                ]}
              />

              <CopyButton label="Kopiuj prompt startowy Zephyr" getText={zephyrPrompt} />
            </>
          )}

          {/* CLAUDE.md */}
          {active === 'claude' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">CLAUDE.md – Zephyr</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Ten plik trafia do korzenia repo aplikacji Zephyr.
                  Claude Code czyta go automatycznie przy każdej sesji.
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
