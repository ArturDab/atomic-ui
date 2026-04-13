/**
 * Zephyr – Docs & Prompty
 * Gotowy prompt startowy dla Claude Code + instrukcja krok po kroku.
 * Uzupełnij pola – zapisują się w przeglądarce, prompt generuje się automatycznie.
 */
import React, { useState } from 'react'
import { ClipboardCopy, Check, Pencil, Wind, Code2, BookOpen, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'zephyr-docs-values'
function load(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { return {} }
}
function save(v: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
}

// ── Edytowalne pole ───────────────────────────────────────────────────────────

function Field({ fieldKey, placeholder, values, onChange }: {
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
          className="bg-background border rounded px-1.5 py-0.5 text-xs font-mono outline-none focus:ring-1 focus:ring-ring min-w-[220px]"
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
      title="Kliknij aby uzupełnić">
      {val || `← ${placeholder}`}
      <Pencil className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
    </button>
  )
}

// ── Blok kodu z edytowalnymi polami ──────────────────────────────────────────

function CodeBlock({ lines, values, onChange }: {
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
                : <Field key={j} fieldKey={part.key} placeholder={part.placeholder} values={values} onChange={onChange} />
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
    setTimeout(() => setCopied(false), 2500)
  }
  return (
    <button onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg border bg-white hover:bg-muted transition-colors font-medium">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
      {copied ? 'Skopiowano!' : label}
    </button>
  )
}

// ── Krok instalacji ───────────────────────────────────────────────────────────

function Step({ number, title, children, link }: {
  number: number; title: string; children: React.ReactNode; link?: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center gap-1">
        <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">
          {number}
        </div>
        <div className="w-px flex-1 bg-border min-h-[16px]" />
      </div>
      <div className="pb-6 flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <p className="text-sm font-semibold">{title}</p>
          {link && (
            <a href={link} target="_blank" rel="noopener noreferrer"
              className="text-xs text-primary flex items-center gap-1 hover:underline">
              Otwórz <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
        <div className="text-sm text-foreground/70 space-y-2">{children}</div>
      </div>
    </div>
  )
}

// ── Główny widok ──────────────────────────────────────────────────────────────

const SECTIONS = [
  { id: 'setup',  label: 'Krok po kroku',      icon: BookOpen },
  { id: 'prompt', label: 'Prompt do Claude Code', icon: Wind },
  { id: 'claude', label: 'CLAUDE.md',           icon: Code2 },
]

export default function ZephyrDocsScreen() {
  const [values, setValues] = useState<Record<string, string>>(load)
  const [active, setActive] = useState('setup')

  const onChange = (key: string, val: string) => {
    const next = { ...values, [key]: val }
    setValues(next)
    save(next)
  }

  const v = (key: string, fallback = '') => values[key] || fallback

  // Prompt startowy dla Claude Code
  const promptText = () => `# Zephyr – sesja Claude Code

## Repo
GitHub: ${v('zephyr_repo', 'https://github.com/TwojLogin/zephyr')}
Token: ${v('zephyr_token', 'UZUPEŁNIJ')}
Vercel: ${v('zephyr_vercel', 'https://zephyr.vercel.app')}

## Backend
Supabase URL: ${v('supabase_url', 'UZUPEŁNIJ')}
Supabase Anon Key: ${v('supabase_anon', 'UZUPEŁNIJ')}

## AI
Anthropic API Key: ${v('anthropic_key', 'UZUPEŁNIJ')}

## Cloudflare (grafiki newsletterów)
Account ID: ${v('cf_account', 'UZUPEŁNIJ')}
R2 Bucket: ${v('cf_bucket', 'zephyr-images')}
R2 Public URL: ${v('cf_url', 'https://images.zephyr.app')}

## Stack
Next.js 14 (App Router) + TypeScript + Tailwind v3 + Shadcn/ui + Supabase + Vercel

## Makiety
Prototypy: https://atomic-ui-sandy.vercel.app/projects/zephyr
Repo Atomic UI: https://github.com/ArturDab/atomic-ui
Moduły do skopiowania: src/modules/zephyr/

## Co to jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji/freelancerów obsługujących wielu klientów.
Każdy klient ma własną konfigurację: kolory, font, instrukcje AI, bibliotekę sekcji HTML, wzorce UTM.
Workflow: wybierz klienta → brief → sekcje → grafiki → AI generuje HTML → podgląd → eksport.

## Startowy checklist sesji
\`\`\`bash
git clone https://TwojLogin:TOKEN@github.com/TwojLogin/zephyr.git /tmp/zephyr
git -C /tmp/zephyr config user.email "claude@anthropic.com"
git -C /tmp/zephyr config user.name "Claude"
cat /tmp/zephyr/CLAUDE.md
git -C /tmp/zephyr log --oneline -5
\`\`\`

## Zasady kodu
- h-14 dla wszystkich nagłówków pierwszego rzędu
- CSS variables zamiast hardkodowanych kolorów
- npm run build przed każdym push – zero błędów TypeScript
- HTML emaili: inline styles są poprawne i wymagane

## Co robimy dziś
[WPISZ ZADANIE]`

  // CLAUDE.md dla nowego repo
  const claudeMdText = () => `# Zephyr – instrukcja dla Claude

## Czym jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji obsługujących wielu klientów.
Generuje gotowy HTML do wklejenia w Klaviyo/Mailchimp/SendGrid.
Konfiguracja per klient: kolory, font, instrukcje AI, biblioteka sekcji, UTM-y.

## Repo i deploy
GitHub: ${v('zephyr_repo', 'UZUPEŁNIJ')}
Vercel: ${v('zephyr_vercel', 'UZUPEŁNIJ')}
Supabase: ${v('supabase_url', 'UZUPEŁNIJ')}

## Workflow sesji
\`\`\`bash
git clone https://TwojLogin:TOKEN@github.com/TwojLogin/zephyr.git /tmp/zephyr
git -C /tmp/zephyr config user.email "claude@anthropic.com"
git -C /tmp/zephyr config user.name "Claude"
# przed każdym push:
cd /tmp/zephyr && npm run build
git add -A && git commit -m "feat/fix: opis"
git push https://TwojLogin:TOKEN@github.com/TwojLogin/zephyr.git main
\`\`\`

## Stack
Next.js 14 (App Router) + TypeScript + Tailwind CSS v3 + Shadcn/ui
Supabase (baza + auth + storage) + Vercel + Cloudflare R2

## Struktura
src/app/(app)/clients/        – lista klientów
src/app/(app)/clients/[id]/   – konfiguracja klienta
src/app/(app)/creator/        – kreator newslettera
src/app/(app)/artifact/       – podgląd + edycja
src/app/(app)/history/        – archiwum
src/app/api/generate/         – generacja HTML przez Anthropic API
src/app/api/upload/           – upload grafik do Cloudflare
src/modules/zephyr/           – hooki i typy (skopiowane z Atomic UI)
src/lib/supabase.ts           – klient Supabase
src/lib/ai.ts                 – wywołania Anthropic API

## Zasady
- h-14 dla wszystkich nagłówków pierwszego rzędu (NIEPODWAŻALNE)
- CSS variables, nigdy hardkodowane kolory w UI
- HTML emaili: inline styles są wymagane (emaile nie obsługują CSS class)
- npm run build przed każdym push – zero błędów TypeScript

## Makiety
https://atomic-ui-sandy.vercel.app/projects/zephyr`

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
            Kliknij podświetlone pola żeby wpisać dane. Zapisują się automatycznie w przeglądarce.
          </p>
        </div>
      </div>

      {/* Treść */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">

          {/* KROK PO KROKU */}
          {active === 'setup' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">Przygotowanie Zephyra – krok po kroku</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Co musisz zrobić sam (zajmie ok. 15 minut), a co zrobi Claude Code.
                </p>
              </div>

              <div className="border rounded-xl p-5 bg-emerald-50 border-emerald-200">
                <p className="text-sm font-semibold text-emerald-800 mb-1">Co robi Claude (automatycznie)</p>
                <ul className="text-xs text-emerald-700 space-y-1 list-disc list-inside">
                  <li>Instaluje Next.js, Tailwind, Shadcn i wszystkie zależności</li>
                  <li>Kopiuje moduły (hooki, typy) z Atomic UI</li>
                  <li>Konfiguruje Supabase client i tworzy tabele</li>
                  <li>Buduje wszystkie widoki według prototypów</li>
                  <li>Deployuje na Vercel przy każdym push</li>
                </ul>
              </div>

              <div className="space-y-0">

                <Step number={1} title="Utwórz repo na GitHubie" link="https://github.com/new">
                  <p>Idź na github.com/new, nazwij repo <code className="bg-muted px-1 rounded">zephyr</code>,
                  ustaw jako <strong>Private</strong>, kliknij "Create repository".</p>
                  <p className="mt-2">Następnie wygeneruj token dostępu: <strong>Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token</strong>. Zaznacz zakres <code className="bg-muted px-1 rounded">repo</code>. Skopiuj token i wklej poniżej:</p>
                  <div className="mt-2">
                    <Field fieldKey="zephyr_token" placeholder="ghp_..." values={values} onChange={onChange} />
                    <Field fieldKey="zephyr_repo" placeholder="https://github.com/TwojLogin/zephyr" values={values} onChange={onChange} />
                  </div>
                </Step>

                <Step number={2} title="Podłącz repo do Vercela" link="https://vercel.com/new">
                  <p>Idź na vercel.com/new, wybierz "Import Git Repository", zaloguj się GitHubem,
                  wybierz repo <code className="bg-muted px-1 rounded">zephyr</code>. Kliknij Deploy.
                  Vercel będzie teraz automatycznie deployować każdy push.</p>
                  <div className="mt-2">
                    <Field fieldKey="zephyr_vercel" placeholder="https://zephyr.vercel.app" values={values} onChange={onChange} />
                  </div>
                </Step>

                <Step number={3} title="Utwórz projekt Supabase (dev)" link="https://supabase.com/dashboard/new">
                  <p>Idź na supabase.com, kliknij "New project", nazwij <code className="bg-muted px-1 rounded">zephyr-dev</code>,
                  wybierz region (Frankfurt). Po chwili projekt będzie gotowy.</p>
                  <p className="mt-1">Skopiuj z <strong>Project Settings → API</strong>: URL projektu i klucz "anon public".</p>
                  <div className="mt-2 space-y-1">
                    <div><Field fieldKey="supabase_url" placeholder="https://xyz.supabase.co" values={values} onChange={onChange} /></div>
                    <div><Field fieldKey="supabase_anon" placeholder="eyJ... (anon key)" values={values} onChange={onChange} /></div>
                  </div>
                </Step>

                <Step number={4} title="Zdobądź klucz Anthropic API" link="https://console.anthropic.com/settings/keys">
                  <p>Idź na console.anthropic.com, kliknij "Create Key". Skopiuj klucz – zobaczysz go tylko raz.</p>
                  <div className="mt-2">
                    <Field fieldKey="anthropic_key" placeholder="sk-ant-..." values={values} onChange={onChange} />
                  </div>
                </Step>

                <Step number={5} title="Utwórz bucket w Cloudflare R2 (grafiki)" link="https://dash.cloudflare.com/">
                  <p>Zaloguj się na dash.cloudflare.com. Idź do <strong>R2 Object Storage → Create bucket</strong>,
                  nazwij <code className="bg-muted px-1 rounded">zephyr-images</code>. Następnie w <strong>Manage R2 API Tokens</strong> utwórz token z uprawnieniami "Object Read & Write".</p>
                  <p className="mt-1 text-xs text-foreground/50">Jeśli nie masz konta Cloudflare – możesz zacząć bez R2, upload grafik dodamy później.</p>
                  <div className="mt-2 space-y-1">
                    <div><Field fieldKey="cf_account" placeholder="Account ID" values={values} onChange={onChange} /></div>
                    <div><Field fieldKey="cf_bucket" placeholder="zephyr-images" values={values} onChange={onChange} /></div>
                    <div><Field fieldKey="cf_url" placeholder="https://images.zephyr.app" values={values} onChange={onChange} /></div>
                  </div>
                </Step>

                <Step number={6} title="Wklej CLAUDE.md do repo">
                  <p>Skopiuj CLAUDE.md (zakładka obok) i wklej jako pierwszy plik do repo przez interfejs GitHuba
                  (repo → "creating a new file" → nazwa: <code className="bg-muted px-1 rounded">CLAUDE.md</code>).</p>
                </Step>

                <Step number={7} title="Uruchom Claude Code z promptem startowym">
                  <p>Otwórz Claude Code w terminalu w folderze projektu.
                  Skopiuj prompt z zakładki "Prompt do Claude Code" i wklej jako pierwszą wiadomość.
                  Na końcu napisz: <em>"Zacznij od Iteracji 1 – setup projektu."</em></p>
                </Step>

              </div>
            </>
          )}

          {/* PROMPT STARTOWY */}
          {active === 'prompt' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">Prompt startowy – Claude Code</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Kopiuj to na początku każdej sesji w Claude Code. Uzupełnij pola w zakładce "Krok po kroku".
                </p>
              </div>

              <div className="bg-muted/50 border rounded-lg overflow-hidden">
                <pre className="px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap text-foreground/80">
                  {promptText()}
                </pre>
              </div>

              <CopyButton label="Kopiuj prompt startowy" getText={promptText} />

              <div className="border-t pt-5 space-y-3">
                <p className="text-sm font-semibold">Stan projektu Zephyr</p>
                {[
                  { label: 'Makiety UI', value: '7 widoków w Atomic UI', done: true },
                  { label: 'Design System', value: '4 motywy (Sky/Slate/Sage/Noir)', done: true },
                  { label: 'Moduły (hooki + typy)', value: 'useClients, useNewsletterCreator, useArtifact', done: true },
                  { label: 'Supabase schema', value: 'Gotowy SQL do wykonania', done: true },
                  { label: 'Implementacja funkcjonalna', value: 'Claude Code → repo Zephyr', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm text-foreground/80">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{item.value}</span>
                      <div className={cn('w-2 h-2 rounded-full', item.done ? 'bg-emerald-500' : 'bg-amber-400')} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CLAUDE.md */}
          {active === 'claude' && (
            <>
              <div>
                <h1 className="text-xl font-semibold">CLAUDE.md – Zephyr</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Ten plik wchodzi do korzenia repo Zephyra. Claude Code czyta go automatycznie przy każdej sesji.
                </p>
              </div>

              <div className="bg-muted/50 border rounded-lg overflow-hidden">
                <pre className="px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap text-foreground/80">
                  {claudeMdText()}
                </pre>
              </div>

              <CopyButton label="Kopiuj CLAUDE.md" getText={claudeMdText} />
            </>
          )}

        </div>
      </div>
    </div>
  )
}
