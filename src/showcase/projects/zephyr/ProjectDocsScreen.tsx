/**
 * Zephyr – Docs & Prompty
 * Model: prompty są źródłem prawdy. Wartości zastępują placeholdery bezpośrednio
 * w tekstach. Gotowe teksty (z wartościami) zapisywane w GitHub Gist.
 */
import React, { useState, useEffect, useRef } from 'react'
import { ClipboardCopy, Check, Pencil, BookOpen, Code2, Wind,
         ExternalLink, Rocket, Cloud, CloudOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getStoredToken, setStoredToken, getStoredGistId, loadConfig, saveConfig } from '../_gist-storage'

const DEFAULT: Record<string, string> = {
  atomic: `# Atomic UI – sesja robocza

## Repo
GitHub: https://github.com/ArturDab/atomic-ui
Token: <<ATOMIC_TOKEN>>
Vercel: https://atomic-ui-sandy.vercel.app

## Projekt: Zephyr
Faza: Makiety + Design System + Moduły
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
PostgreSQL: <<ZEPHYR_RAILWAY_DB>>
S3 Endpoint: <<ZEPHYR_S3_ENDPOINT>>
S3 Access Key: <<ZEPHYR_S3_ACCESS>>
S3 Secret Key: <<ZEPHYR_S3_SECRET>>

## AI
Anthropic API Key: <<ANTHROPIC_KEY>>

## Stack
Next.js 14 + TypeScript + Tailwind v3 + Shadcn/ui
Railway PostgreSQL + Railway S3 + Auth.js + Drizzle ORM + Vercel

## Moduły z Atomic UI
Hooki: useClients, useNewsletterCreator, useArtifact

## Workflow
git clone <<ZEPHYR_REPO_CLONE>> /tmp/zephyr
git config user.email "claude@anthropic.com" && git config user.name "Claude"
cd /tmp/zephyr && npm run build
git add -A && git commit -m "feat/fix: opis" && git push origin main

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`,

  claude: `# Zephyr – instrukcja dla Claude

## Czym jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji obsługujących wielu klientów.
Konfiguracja per klient: kolory, font, instrukcje AI, biblioteka sekcji HTML, UTM-y.

## Repo
GitHub: <<ZEPHYR_REPO>>
Vercel: <<ZEPHYR_VERCEL>>

## Stack
Next.js 14 + TypeScript + Tailwind CSS v3 + Shadcn/ui
Railway PostgreSQL + Railway S3 Bucket + Auth.js + Drizzle ORM + Vercel

## Struktura
src/app/(app)/clients/      – lista klientów
src/app/(app)/creator/      – kreator newslettera
src/app/(app)/artifact/     – podgląd + edycja HTML
src/app/(auth)/             – login, register (Auth.js)
src/modules/zephyr/         – hooki i typy (z Atomic UI)
src/lib/auth.ts             – konfiguracja Auth.js
src/lib/db.ts               – Drizzle ORM + Railway PostgreSQL
src/lib/storage.ts          – S3 client (Railway Bucket)
src/lib/ai.ts               – wywołania Anthropic API

## Zmienne środowiskowe
DATABASE_URL                – <<ZEPHYR_RAILWAY_DB>>
AUTH_SECRET                 – generuj: openssl rand -base64 32
ANTHROPIC_API_KEY           – <<ANTHROPIC_KEY>>
RAILWAY_BUCKET_ENDPOINT     – <<ZEPHYR_S3_ENDPOINT>>
RAILWAY_BUCKET_ACCESS_KEY   – <<ZEPHYR_S3_ACCESS>>
RAILWAY_BUCKET_SECRET_KEY   – <<ZEPHYR_S3_SECRET>>
RAILWAY_BUCKET_NAME         – zephyr-images

## Zasady
- h-14 dla wszystkich nagłówków pierwszego rzędu (NIEPODWAŻALNE)
- CSS variables, nigdy hardkodowane kolory w UI
- HTML emaili: inline styles są wymagane
- npm run build przed każdym push – zero błędów TypeScript

## Makiety
https://atomic-ui-sandy.vercel.app/projects/zephyr`,
}

const FIELDS = [
  { key: 'ATOMIC_TOKEN',      label: 'Atomic UI token (GitHub)',  placeholder: 'ghp_...' },
  { key: 'ZEPHYR_TOKEN',      label: 'Zephyr token (GitHub)',     placeholder: 'ghp_...' },
  { key: 'ZEPHYR_REPO',       label: 'Zephyr repo URL',           placeholder: 'https://github.com/OWNER/zephyr' },
  { key: 'ZEPHYR_REPO_CLONE', label: 'Zephyr clone URL',          placeholder: 'https://OWNER:TOKEN@github.com/OWNER/zephyr.git' },
  { key: 'ZEPHYR_VERCEL',     label: 'Zephyr Vercel URL',         placeholder: 'https://zephyr.vercel.app' },
  { key: 'ZEPHYR_RAILWAY_DB', label: 'Railway PostgreSQL URL',    placeholder: 'postgresql://user:pass@host:5432/zephyr' },
  { key: 'ZEPHYR_S3_ENDPOINT',label: 'Railway S3 Endpoint',       placeholder: 'https://storage.railway.app' },
  { key: 'ZEPHYR_S3_ACCESS',  label: 'Railway S3 Access Key',     placeholder: 'access-key...' },
  { key: 'ZEPHYR_S3_SECRET',  label: 'Railway S3 Secret Key',     placeholder: 'secret-key...' },
  { key: 'ANTHROPIC_KEY',     label: 'Anthropic API Key',         placeholder: 'sk-ant-...' },
]

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard.writeText(getText()); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
      className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border bg-background hover:bg-muted transition-colors">
      {copied ? <><Check className="w-3 h-3 text-emerald-500" />Skopiowano</> : <><ClipboardCopy className="w-3 h-3" />Kopiuj</>}
    </button>
  )
}

function PromptBlock({ text, onChange }: { text: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <textarea value={text} onChange={e => onChange(e.target.value)} rows={Math.max(8, text.split('\n').length + 1)}
        className="w-full bg-muted/50 border rounded-lg px-4 py-3 text-xs font-mono leading-relaxed resize-none outline-none focus:ring-1 focus:ring-ring" />
      <div className="absolute top-2 right-2"><CopyButton getText={() => text} /></div>
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
          <div className="pb-6 flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold">{step.title}</p>
              {step.link && <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center gap-1 hover:underline">Otwórz <ExternalLink className="w-3 h-3" /></a>}
            </div>
            <div className="text-sm text-foreground/70 space-y-2">{step.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const SECTIONS = [
  { id: 'wdrozenie', label: 'Wdrożenie',           icon: Rocket   },
  { id: 'atomic',    label: 'Sesja Atomic UI',      icon: BookOpen },
  { id: 'session',   label: 'Sesja Zephyr',         icon: Wind     },
  { id: 'claude',    label: 'CLAUDE.md aplikacji',  icon: Code2    },
]

export default function ZephyrDocsScreen() {
  const [texts, setTexts] = useState<Record<string, string>>(DEFAULT)
  const [active, setActive] = useState('wdrozenie')
  const [token, setToken]   = useState(getStoredToken)
  const [tokenDraft, setTokenDraft] = useState('')
  const [editingToken, setEditingToken] = useState(false)
  const [gistId, setGistId] = useState(getStoredGistId)
  const [syncStatus, setSyncStatus] = useState<'idle'|'loading'|'saving'|'saved'|'error'>('idle')
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!token) return
    setSyncStatus('loading')
    loadConfig(token, gistId).then(data => {
      if (data?.zephyr_texts) { setTexts(JSON.parse(data.zephyr_texts)); setSyncStatus('saved') }
      else setSyncStatus('idle')
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const persistTexts = (updated: Record<string, string>, tok = token, gId = gistId) => {
    if (!tok) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    setSyncStatus('saving')
    saveTimer.current = setTimeout(async () => {
      const id = await saveConfig(tok, { zephyr_texts: JSON.stringify(updated) }, gId || undefined)
      if (id) { setGistId(id); setSyncStatus('saved') }
      else setSyncStatus('error')
    }, 600)
  }

  const substituteAll = (placeholder: string, value: string) => {
    const re = new RegExp(`<<${placeholder}>>`, 'g')
    const updated = Object.fromEntries(Object.entries(texts).map(([k, v]) => [k, v.replace(re, value)]))
    setTexts(updated)
    persistTexts(updated)
  }

  const onFieldConfirm = (fieldKey: string) => {
    const val = (drafts[fieldKey] || '').trim(); if (!val) return
    substituteAll(fieldKey, val)
    setDrafts(d => ({ ...d, [fieldKey]: '' }))
  }

  const onTextChange = (key: string, value: string) => {
    const updated = { ...texts, [key]: value }
    setTexts(updated); persistTexts(updated)
  }

  const confirmToken = async () => {
    const t = tokenDraft.trim(); if (!t) return
    setToken(t); setStoredToken(t); setEditingToken(false); setSyncStatus('loading')
    const data = await loadConfig(t, gistId)
    if (data?.zephyr_texts) { setTexts(JSON.parse(data.zephyr_texts)); setSyncStatus('saved') }
    else persistTexts(texts, t, gistId)
  }

  const isFilled = (key: string) => !Object.values(texts).some(v => v.includes(`<<${key}>>`))

  const SyncBar = () => (
    <div className="h-14 border-b flex items-center px-6 gap-3 bg-background shrink-0">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {syncStatus === 'loading' && <><Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Ładowanie z Gista...</span></>}
        {syncStatus === 'saving'  && <><Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Zapisywanie...</span></>}
        {syncStatus === 'saved'   && <><Cloud className="w-3.5 h-3.5 text-emerald-500 shrink-0" /><span className="text-xs text-emerald-600">Zapisano w GitHub Gist</span></>}
        {syncStatus === 'error'   && <><CloudOff className="w-3.5 h-3.5 text-destructive shrink-0" /><span className="text-xs text-destructive">Błąd – sprawdź token</span></>}
        {syncStatus === 'idle' && !token && <><CloudOff className="w-3.5 h-3.5 text-muted-foreground shrink-0" /><span className="text-xs text-muted-foreground">Wpisz token GitHub aby włączyć synchronizację</span></>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-muted-foreground">GitHub token:</span>
        {editingToken ? (
          <span className="inline-flex items-center gap-1">
            <input autoFocus value={tokenDraft} onChange={e => setTokenDraft(e.target.value)} type="password"
              onKeyDown={e => { if (e.key === 'Enter') confirmToken(); if (e.key === 'Escape') setEditingToken(false) }}
              className="bg-background border rounded px-2 py-1 text-xs font-mono outline-none focus:ring-1 w-44" placeholder="ghp_..." />
            <button onClick={confirmToken} className="text-emerald-600"><Check className="w-3.5 h-3.5" /></button>
          </span>
        ) : (
          <button onClick={() => { setTokenDraft(token); setEditingToken(true) }}
            className={cn('text-xs font-mono px-2 py-1 rounded border gap-1 inline-flex items-center',
              token ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-700')}>
            {token ? '●●●●●●●●' : '← wpisz token'}
            <Pencil className="w-2.5 h-2.5 opacity-50" />
          </button>
        )}
      </div>
    </div>
  )

  const QuickField = ({ fieldKey, label, placeholder }: { fieldKey: string; label: string; placeholder: string }) => {
    const filled = isFilled(fieldKey)
    return (
      <div className="flex items-center gap-3">
        <span className={cn('w-2 h-2 rounded-full shrink-0', filled ? 'bg-emerald-500' : 'bg-amber-400')} />
        <span className="text-xs text-muted-foreground w-44 shrink-0">{label}</span>
        {filled ? (
          <span className="text-xs text-emerald-600">✓ wpisano</span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <input value={drafts[fieldKey] || ''} onChange={e => setDrafts(d => ({ ...d, [fieldKey]: e.target.value }))}
              onKeyDown={e => { if (e.key === 'Enter') onFieldConfirm(fieldKey) }}
              className="bg-background border rounded px-2 py-1 text-xs font-mono outline-none focus:ring-1 focus:ring-ring min-w-[200px]"
              placeholder={placeholder} />
            <button onClick={() => onFieldConfirm(fieldKey)} className="h-7 px-2.5 rounded bg-foreground text-background text-xs">Wstaw</button>
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <SyncBar />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-52 border-r shrink-0 p-4">
          <p className="text-xs font-semibold text-foreground/55 uppercase tracking-widest mb-4">Dokumentacja</p>
          <nav className="space-y-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)}
                className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2',
                  active === s.id ? 'bg-foreground text-background font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                <s.icon className="w-3.5 h-3.5 shrink-0" />{s.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 p-3 bg-muted/50 border rounded-lg space-y-1.5">
            {FIELDS.map(f => (
              <div key={f.key} className="flex items-center gap-1.5">
                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', isFilled(f.key) ? 'bg-emerald-500' : 'bg-amber-400')} />
                <span className="text-[10px] text-muted-foreground truncate">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">

            {active === 'wdrozenie' && (<>
              <div>
                <h1 className="text-xl font-semibold">Wdrożenie Zephyra</h1>
                <p className="text-sm text-muted-foreground mt-1">Uzupełnij wartości – zostaną wstawione bezpośrednio do promptów i CLAUDE.md.</p>
              </div>
              <div className="border rounded-xl p-5 space-y-3">
                <p className="text-sm font-semibold mb-1">Szybkie wypełnienie</p>
                {FIELDS.map(f => <QuickField key={f.key} fieldKey={f.key} label={f.label} placeholder={f.placeholder} />)}
              </div>
              <StepList steps={[
                { number: 1, title: 'Utwórz repo na GitHubie', link: 'https://github.com/new', content: (
                    <p>github.com/new → nazwa <code className="bg-muted px-1 rounded text-xs">zephyr</code> → <strong>Private</strong>. Wygeneruj Personal Access Token (zakres: <code className="bg-muted px-1 rounded text-xs">repo</code>).</p>
                  ) },
                { number: 2, title: 'Podłącz repo do Vercela', link: 'https://vercel.com/new', content: (
                    <p>vercel.com/new → Import → wybierz <code className="bg-muted px-1 rounded text-xs">zephyr</code> → Deploy.</p>
                  ) },
                { number: 3, title: 'Utwórz bazę PostgreSQL w Railway', link: 'https://railway.app', content: (
                    <p>New Project → Add PostgreSQL → skopiuj <strong>DATABASE_URL</strong> z Variables.</p>
                  ) },
                { number: 4, title: 'Utwórz S3 Bucket w Railway', link: 'https://railway.app', content: (
                    <p>W tym samym projekcie Railway → New → Bucket. Skopiuj z zakładki <strong>Credentials</strong>: Endpoint, Access Key, Secret Key.</p>
                  ) },
                { number: 5, title: 'Klucz Anthropic API', link: 'https://console.anthropic.com/settings/keys', content: (
                    <p>console.anthropic.com → Create Key. Zobaczysz go tylko raz – wstaw od razu.</p>
                  ) },
                { number: 6, title: 'Wklej CLAUDE.md do repo', content: (
                    <p>Skopiuj z zakładki "CLAUDE.md aplikacji" → GitHub: repo → Add file → <code className="bg-muted px-1 rounded text-xs">CLAUDE.md</code>.</p>
                  ) },
                { number: 7, title: 'Uruchom Claude Code', content: (
                    <p>Wklej prompt z zakładki "Sesja Zephyr". Dopisz: <em>"Zacznij od Iteracji 1 – setup projektu."</em></p>
                  ) },
              ]} />
            </>)}

            {active === 'atomic' && (<>
              <div><h1 className="text-xl font-semibold">Prompt startowy – Atomic UI</h1><p className="text-sm text-muted-foreground mt-1">Wklej na początku każdej sesji w projekcie Claude "Atomic UI".</p></div>
              <PromptBlock text={texts.atomic} onChange={v => onTextChange('atomic', v)} />
            </>)}

            {active === 'session' && (<>
              <div><h1 className="text-xl font-semibold">Prompt startowy – Zephyr</h1><p className="text-sm text-muted-foreground mt-1">Wklej na początku każdej sesji w Claude Code.</p></div>
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
