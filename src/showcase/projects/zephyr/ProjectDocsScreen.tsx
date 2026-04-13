/**
 * Zephyr – Docs & Prompty
 * Storage: plik config/docs-config.json w repo GitHub (permanentny).
 * Wpisz wartość → "Wstaw" → podstawia się w tekstach → auto-zapis do repo.
 */
import React, { useState, useEffect, useRef } from 'react'
import { ClipboardCopy, Check, BookOpen, Code2, Wind,
         ExternalLink, Rocket, Cloud, CloudOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { repoLoad, repoSave } from '../_repo-storage'

// ── Domyślne teksty ───────────────────────────────────────────────────────────

const DEFAULT: Record<string, string> = {
  atomic: `# Atomic UI – sesja robocza

## Repo
GitHub: https://github.com/ArturDab/atomic-ui
Token: <<ATOMIC_TOKEN>>
Vercel: https://atomic-ui-sandy.vercel.app

## Projekt: Zephyr
Faza: Design System + Moduły
Widoki: 6 makiet, 4 motywy, 3 hooki

## Workflow
git clone https://ArturDab:<<ATOMIC_TOKEN>>@github.com/ArturDab/atomic-ui.git /tmp/atomic-ui
git -C /tmp/atomic-ui config user.email "claude@anthropic.com"
git -C /tmp/atomic-ui config user.name "Claude"

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`,

  session: `# Zephyr – sesja robocza

## Repo
GitHub: <<ZEPHYR_REPO>>
Token: <<ZEPHYR_TOKEN>>
Vercel: <<ZEPHYR_VERCEL>>

## Backend (Railway)
PostgreSQL: <<ZEPHYR_RAILWAY>>
S3 Endpoint: <<ZEPHYR_S3_ENDPOINT>>
S3 Access Key: <<ZEPHYR_S3_ACCESS>>
S3 Secret Key: <<ZEPHYR_S3_SECRET>>

## AI
Anthropic API Key: <<ANTHROPIC_KEY>>

## Stack
Next.js 14 + TypeScript + Tailwind v3 + Shadcn/ui + Railway PostgreSQL + Auth.js + Vercel

## Moduły z Atomic UI
Hooki: useClients, useNewsletterCreator, useArtifact

## Workflow
git clone https://OWNER:<<ZEPHYR_TOKEN>>@github.com/OWNER/zephyr.git /tmp/zephyr
git config user.email "claude@anthropic.com" && git config user.name "Claude"
cd /tmp/zephyr && npm run build
git add -A && git commit -m "feat/fix: opis" && git push origin main

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`,

  claude: `# Zephyr – instrukcja dla Claude

## Czym jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji obsługujących wielu klientów.

## Repo
GitHub: <<ZEPHYR_REPO>>
Vercel: <<ZEPHYR_VERCEL>>

## Stack
Next.js 14 + TypeScript + Tailwind CSS v3 + Shadcn/ui
Railway PostgreSQL + Auth.js + Drizzle ORM + Vercel

## Struktura
src/app/(app)/          – widoki aplikacji
src/app/(auth)/         – login, register (Auth.js)
src/modules/zephyr/       – hooki i typy (z Atomic UI)
src/lib/auth.ts         – konfiguracja Auth.js
src/lib/db.ts           – Drizzle ORM + Railway PostgreSQL
src/lib/ai.ts           – wywołania Anthropic API

## Zmienne środowiskowe
DATABASE_URL                – <<ZEPHYR_RAILWAY>>
AUTH_SECRET                 – generuj: openssl rand -base64 32
ANTHROPIC_API_KEY           – <<ANTHROPIC_KEY>>
RAILWAY_BUCKET_ENDPOINT     – <<ZEPHYR_S3_ENDPOINT>>
RAILWAY_BUCKET_ACCESS_KEY   – <<ZEPHYR_S3_ACCESS>>
RAILWAY_BUCKET_SECRET_KEY   – <<ZEPHYR_S3_SECRET>>
RAILWAY_BUCKET_NAME         – zephyr-images

## Workflow sesji
git clone https://OWNER:<<ZEPHYR_TOKEN>>@github.com/OWNER/zephyr.git /tmp/zephyr
git config user.email "claude@anthropic.com" && git config user.name "Claude"
cd /tmp/zephyr && npm run build
git add -A && git commit -m "feat/fix: opis" && git push origin main

## Zasady
- h-14 dla wszystkich nagłówków pierwszego rzędu (NIEPODWAŻALNE)
- CSS variables, nigdy hardkodowane kolory
- npm run build przed każdym push – zero błędów TypeScript

## Makiety
https://atomic-ui-sandy.vercel.app/projects/zephyr`,
}

const FIELDS = [
  { key: 'ATOMIC_TOKEN', label: 'Atomic UI GitHub token', placeholder: 'ghp_...' },
  { key: 'ZEPHYR_TOKEN',   label: 'Zephyr GitHub token',      placeholder: 'ghp_...' },
  { key: 'ZEPHYR_REPO',    label: 'Zephyr repo URL',          placeholder: 'https://github.com/ArturDab/zephyr' },
  { key: 'ZEPHYR_VERCEL',  label: 'Zephyr Vercel URL',        placeholder: 'https://zephyr.vercel.app' },
  { key: 'ZEPHYR_RAILWAY', label: 'Railway PostgreSQL URL',  placeholder: 'postgresql://user:pass@host:5432/zephyr' },
  { key: 'ZEPHYR_S3_ENDPOINT', label: 'Railway S3 Endpoint',    placeholder: 'https://storage.railway.app' },
  { key: 'ZEPHYR_S3_ACCESS',   label: 'Railway S3 Access Key',  placeholder: 'access-key...' },
  { key: 'ZEPHYR_S3_SECRET',   label: 'Railway S3 Secret Key',  placeholder: 'secret-key...' },
  { key: 'ANTHROPIC_KEY',      label: 'Anthropic API Key',      placeholder: 'sk-ant-...' },
]

const SECTIONS = [
  { id: 'wdrozenie', label: 'Wdrożenie',           icon: Rocket   },
  { id: 'atomic',    label: 'Sesja Atomic UI',      icon: BookOpen },
  { id: 'session',   label: 'Sesja Zephyr',           icon: Wind     },
  { id: 'claude',    label: 'CLAUDE.md aplikacji',  icon: Code2    },
]

// ── Komponenty ────────────────────────────────────────────────────────────────

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(getText()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-background hover:bg-muted transition-colors font-medium">
      {copied ? <><Check className="w-3 h-3 text-emerald-500" />Skopiowano</> : <><ClipboardCopy className="w-3 h-3" />Kopiuj</>}
    </button>
  )
}

function PromptBlock({ text, onChange }: { text: string; onChange: (v: string) => void }) {
  const rows = Math.max(10, text.split('\n').length + 2)
  return (
    <div className="relative group">
      <textarea value={text} onChange={e => onChange(e.target.value)} rows={rows}
        className="w-full bg-muted/40 border rounded-xl px-4 py-3 text-xs font-mono leading-relaxed resize-none outline-none focus:ring-1 focus:ring-ring transition-colors" />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton getText={() => text} />
      </div>
    </div>
  )
}

interface StepItem { number: number; title: string; link?: string; content: React.ReactNode }
function StepList({ steps }: { steps: StepItem[] }) {
  return (
    <div>
      {steps.map((step, idx) => (
        <div key={step.number} className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">{step.number}</div>
            {idx < steps.length - 1 && <div className="w-px flex-1 bg-border min-h-[16px]" />}
          </div>
          <div className="pb-5 flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <p className="text-sm font-semibold">{step.title}</p>
              {step.link && <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">Otwórz <ExternalLink className="w-3 h-3" /></a>}
            </div>
            <div className="text-sm text-foreground/70">{step.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Główny komponent ──────────────────────────────────────────────────────────

export default function ZephyrDocsScreen() {
  const [texts, setTexts]       = useState<Record<string, string>>(DEFAULT)
  const [active, setActive]     = useState('wdrozenie')
  const [syncStatus, setSyncStatus] = useState<'loading'|'saving'|'saved'|'error'>('loading')
  const [drafts, setDrafts]     = useState<Record<string, string>>({})
  const saveTimer               = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fullConfig              = useRef<Record<string, string>>({})

  // Załaduj przy starcie
  useEffect(() => {
    repoLoad().then(config => {
      if (config) {
        fullConfig.current = config
        if (config.zephyr_texts) setTexts(JSON.parse(config.zephyr_texts))
        setSyncStatus('saved')
      } else {
        setSyncStatus('error')
      }
    })
  }, [])

  // Zapisz (debounced 800ms)
  const persist = (updated: Record<string, string>) => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSyncStatus('saving')
    saveTimer.current = setTimeout(async () => {
      const payload = { ...fullConfig.current, zephyr_texts: JSON.stringify(updated) }
      const ok = await repoSave(payload)
      if (ok) { fullConfig.current = payload; setSyncStatus('saved') }
      else setSyncStatus('error')
    }, 800)
  }

  const substituteAll = (placeholder: string, value: string) => {
    const re = new RegExp(`<<${placeholder}>>`, 'g')
    const updated = Object.fromEntries(Object.entries(texts).map(([k, v]) => [k, v.replace(re, value)]))
    setTexts(updated)
    persist(updated)
  }

  const onTextChange = (key: string, value: string) => {
    const updated = { ...texts, [key]: value }
    setTexts(updated)
    persist(updated)
  }

  const onFieldConfirm = (fieldKey: string) => {
    const val = (drafts[fieldKey] || '').trim()
    if (!val) return
    substituteAll(fieldKey, val)
    setDrafts(d => ({ ...d, [fieldKey]: '' }))
  }

  const isFilled = (key: string) => !Object.values(texts).some(v => v.includes(`<<${key}>>`))

  return (
    <div className="flex flex-col h-full">
      {/* Status bar */}
      <div className="h-10 border-b flex items-center px-6 gap-2 bg-background shrink-0">
        {syncStatus === 'loading' && <><Loader2 className="w-3 h-3 animate-spin text-muted-foreground" /><span className="text-xs text-muted-foreground">Ładowanie z repozytorium...</span></>}
        {syncStatus === 'saving'  && <><Loader2 className="w-3 h-3 animate-spin text-muted-foreground" /><span className="text-xs text-muted-foreground">Zapisywanie...</span></>}
        {syncStatus === 'saved'   && <><Cloud className="w-3 h-3 text-emerald-500" /><span className="text-xs text-emerald-600">Zapisano w repozytorium GitHub</span></>}
        {syncStatus === 'error'   && <><CloudOff className="w-3 h-3 text-destructive" /><span className="text-xs text-destructive">Błąd zapisu – sprawdź połączenie</span></>}
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 border-r shrink-0 p-4 flex flex-col gap-4">
          <div>
            <p className="text-xs font-semibold text-foreground/55 uppercase tracking-widest mb-3">Dokumentacja</p>
            <nav className="space-y-1">
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                    active === s.id ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                  <s.icon className="w-3.5 h-3.5 shrink-0" />{s.label}
                </button>
              ))}
            </nav>
          </div>
          {/* Checklist */}
          <div className="p-3 bg-muted/40 border rounded-lg space-y-1.5">
            <p className="text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mb-2">Uzupełniono</p>
            {FIELDS.map(f => (
              <div key={f.key} className="flex items-center gap-1.5">
                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', isFilled(f.key) ? 'bg-emerald-500' : 'bg-amber-400')} />
                <span className="text-[10px] text-muted-foreground truncate">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Treść */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">

            {active === 'wdrozenie' && (<>
              <div>
                <h1 className="text-xl font-semibold">Wdrożenie Lyry</h1>
                <p className="text-sm text-muted-foreground mt-1">Uzupełnij wartości – zostaną wstawione we wszystkich promptach i CLAUDE.md i zapisane na stałe.</p>
              </div>

              <div className="border rounded-xl divide-y">
                {FIELDS.map(f => {
                  const filled = isFilled(f.key)
                  return (
                    <div key={f.key} className="flex items-center gap-4 px-4 py-3">
                      <span className={cn('w-2 h-2 rounded-full shrink-0', filled ? 'bg-emerald-500' : 'bg-amber-400')} />
                      <span className="text-xs text-muted-foreground w-44 shrink-0">{f.label}</span>
                      {filled ? (
                        <span className="text-xs text-emerald-600 font-medium">✓ wpisano i zapisano</span>
                      ) : (
                        <div className="flex items-center gap-2 flex-1">
                          <input value={drafts[f.key] || ''}
                            onChange={e => setDrafts(d => ({ ...d, [f.key]: e.target.value }))}
                            onKeyDown={e => { if (e.key === 'Enter') onFieldConfirm(f.key) }}
                            placeholder={f.placeholder}
                            className="flex-1 bg-muted/40 border rounded-lg px-3 py-1.5 text-xs font-mono outline-none focus:ring-1 focus:ring-ring" />
                          <button onClick={() => onFieldConfirm(f.key)}
                            className="shrink-0 h-7 px-3 rounded-lg bg-foreground text-background text-xs font-medium hover:bg-foreground/80 transition-colors">
                            Wstaw
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <StepList steps={[
                { number: 1, title: 'Utwórz repo na GitHubie', link: 'https://github.com/new', content: (
                    <p>github.com/new → nazwa <code className="bg-muted px-1 rounded text-xs">zephyr</code> → <strong>Private</strong>. Wygeneruj PAT (zakres: <code className="bg-muted px-1 rounded text-xs">repo</code>). Wpisz tokeny powyżej.</p>
                  ) },
                { number: 2, title: 'Podłącz repo do Vercela', link: 'https://vercel.com/new', content: (
                    <p>vercel.com/new → Import → <code className="bg-muted px-1 rounded text-xs">zephyr</code> → Deploy. Wpisz URL powyżej.</p>
                  ) },
                { number: 3, title: 'Utwórz bazę w Railway', link: 'https://railway.app', content: (
                    <p>New Project → Add PostgreSQL → skopiuj <strong>DATABASE_URL</strong>. Wpisz powyżej.</p>
                  ) },
                { number: 4, title: 'Utwórz S3 Bucket w Railway', link: 'https://railway.app', content: (
                    <p>W tym samym projekcie → New → Bucket. Skopiuj Endpoint, Access Key i Secret Key z zakładki <strong>Credentials</strong>.</p>
                  ) },
                { number: 5, title: 'Wklej CLAUDE.md do repo', content: (
                    <p>Skopiuj z zakładki "CLAUDE.md aplikacji" → GitHub: Add file → <code className="bg-muted px-1 rounded text-xs">CLAUDE.md</code>.</p>
                  ) },
                { number: 6, title: 'Uruchom Claude Code', content: (
                    <p>Wklej prompt z "Sesja Zephyr". Dopisz: <em>"Zacznij od Iteracji 1."</em></p>
                  ) },
              ]} />
            </>)}

            {active === 'atomic' && (<>
              <div><h1 className="text-xl font-semibold">Prompt – Atomic UI</h1><p className="text-sm text-muted-foreground mt-1">Sesja robocza w projekcie Claude "Atomic UI".</p></div>
              <PromptBlock text={texts.atomic} onChange={v => onTextChange('atomic', v)} />
            </>)}

            {active === 'session' && (<>
              <div><h1 className="text-xl font-semibold">Prompt – Sesja Zephyr</h1><p className="text-sm text-muted-foreground mt-1">Sesja robocza w Claude Code dla repo Zephyr.</p></div>
              <PromptBlock text={texts.session} onChange={v => onTextChange('session', v)} />
            </>)}

            {active === 'claude' && (<>
              <div><h1 className="text-xl font-semibold">CLAUDE.md – Zephyr</h1><p className="text-sm text-muted-foreground mt-1">Wklej do korzenia repo jako plik CLAUDE.md.</p></div>
              <PromptBlock text={texts.claude} onChange={v => onTextChange('claude', v)} />
            </>)}

          </div>
        </div>
      </div>
    </div>
  )
}
