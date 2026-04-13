/**
 * Zephyr – Docs & Prompty
 * Konfiguracja zapisywana w prywatnym GitHub Gist (trwałe, między urządzeniami).
 * Stack: GitHub + Vercel + Railway (PostgreSQL + S3 Bucket) + Auth.js
 */
import React, { useState, useEffect, useCallback } from 'react'
import { ClipboardCopy, Check, Pencil, BookOpen, Code2, Wind,
         ExternalLink, Rocket, Cloud, CloudOff, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  getStoredToken, setStoredToken, getStoredGistId,
  loadConfig, saveConfig,
} from '../_gist-storage'

const LS_VALUES = 'zephyr-docs-values'
function lsLoad(): Record<string, string> {
  try { return JSON.parse(localStorage.getItem(LS_VALUES) || '{}') } catch { return {} }
}
function lsSave(v: Record<string, string>) {
  localStorage.setItem(LS_VALUES, JSON.stringify(v))
}

function EditableField({ fieldKey, placeholder, values, onChange }: {
  fieldKey: string; placeholder: string
  values: Record<string, string>; onChange: (k: string, v: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const val = values[fieldKey] || ''
  const start = () => { setEditing(true); setDraft(val) }
  const confirm = () => { onChange(fieldKey, draft); setEditing(false) }
  if (editing) return (
    <span className="inline-flex items-center gap-1">
      <input autoFocus value={draft} onChange={e => setDraft(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') confirm(); if (e.key === 'Escape') setEditing(false) }}
        className="bg-background border rounded px-1.5 py-0.5 text-xs font-mono outline-none focus:ring-1 focus:ring-ring min-w-[200px]"
        placeholder={placeholder} />
      <button onClick={confirm} className="text-emerald-600"><Check className="w-3 h-3" /></button>
    </span>
  )
  return (
    <button onClick={start}
      className={cn('inline-flex items-center gap-1 px-1.5 rounded border transition-colors group text-xs font-mono',
        val ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100')}
      title="Kliknij aby edytować">
      {val || `← ${placeholder}`}
      <Pencil className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100" />
    </button>
  )
}

function EditableCode({ lines, values, onChange }: {
  lines: (string | { key: string; placeholder: string })[][]
  values: Record<string, string>; onChange: (k: string, v: string) => void
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

function CopyButton({ label, getText }: { label: string; getText: () => string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(getText()); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg border bg-white hover:bg-muted transition-colors font-medium">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <ClipboardCopy className="w-3.5 h-3.5" />}
      {copied ? 'Skopiowano!' : label}
    </button>
  )
}

interface StepItem { number: number; title: string; link?: string; content: React.ReactNode }
function StepList({ steps }: { steps: StepItem[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, idx) => (
        <div key={step.number} className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold shrink-0">
              {step.number}
            </div>
            {idx < steps.length - 1 && <div className="w-px flex-1 bg-border min-h-[16px]" />}
          </div>
          <div className="pb-6 flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold">{step.title}</p>
              {step.link && (
                <a href={step.link} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary flex items-center gap-1 hover:underline">
                  Otwórz <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <div className="text-sm text-foreground/70 space-y-1">{step.content}</div>
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
  const [values, setValues] = useState<Record<string, string>>(lsLoad)
  const [active, setActive] = useState('wdrozenie')
  const [token, setToken] = useState(getStoredToken)
  const [tokenDraft, setTokenDraft] = useState('')
  const [editingToken, setEditingToken] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved' | 'error' | 'loading'>('idle')
  const [gistId, setGistId] = useState(getStoredGistId)

  useEffect(() => {
    if (!token) return
    setSyncStatus('loading')
    loadConfig(token, gistId).then(config => {
      if (config) { setValues(config); setSyncStatus('saved') }
      else setSyncStatus('idle')
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onChange = useCallback(async (key: string, val: string) => {
    const next = { ...values, [key]: val }
    setValues(next)
    lsSave(next)                          // zawsze lokalnie
    if (!token) return                    // Gist tylko jeśli token
    setSyncStatus('saving')
    const id = await saveConfig(token, next, gistId || undefined)
    if (id) { setGistId(id); setSyncStatus('saved') }
    else setSyncStatus('error')
  }, [values, token, gistId])

  const confirmToken = async () => {
    const t = tokenDraft.trim()
    if (!t) return
    setToken(t); setStoredToken(t); setEditingToken(false)
    setSyncStatus('loading')
    const config = await loadConfig(t, gistId)
    if (config) {
      const merged = { ...values, ...config }  // Gist wygrywa w konflikcie
      setValues(merged)
      lsSave(merged)
      setSyncStatus('saved')
    } else {
      const id = await saveConfig(t, values, undefined)
      if (id) { setGistId(id); setSyncStatus('saved') }
      else setSyncStatus('error')
    }
  }

  // ── Prompty ─────────────────────────────────────────────────────────────────

  const atomicToken = values['atomic_token'] || 'UZUPEŁNIJ_TOKEN'

  const atomicPrompt = () => `# Atomic UI – sesja robocza

## Repo
GitHub: https://github.com/ArturDab/atomic-ui
Token: ${atomicToken}
Vercel: https://atomic-ui-sandy.vercel.app

## Projekt: Zephyr
Faza: Makiety + Design System + Moduły
Widoki: 6 makiet, 4 motywy, 3 hooki

## Workflow
git clone https://ArturDab:${atomicToken}@github.com/ArturDab/atomic-ui.git /tmp/atomic-ui
git -C /tmp/atomic-ui config user.email "claude@anthropic.com"
git -C /tmp/atomic-ui config user.name "Claude"

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`

  const sessionPrompt = () => `# Zephyr – sesja robocza

## Repo
GitHub: ${values['zephyr_repo'] || 'UZUPEŁNIJ'}
Token: ${values['zephyr_token'] || 'UZUPEŁNIJ_TOKEN'}
Vercel: ${values['zephyr_vercel'] || 'UZUPEŁNIJ'}

## Backend (Railway)
PostgreSQL: ${values['zephyr_railway_db'] || 'UZUPEŁNIJ'}
S3 Bucket URL: ${values['zephyr_railway_s3'] || 'UZUPEŁNIJ'}
S3 Access Key: ${values['zephyr_s3_access'] || 'UZUPEŁNIJ'}
S3 Secret Key: ${values['zephyr_s3_secret'] || 'UZUPEŁNIJ'}

## AI
Anthropic API Key: ${values['anthropic_key'] || 'UZUPEŁNIJ'}

## Stack
Next.js 14 + TypeScript + Tailwind v3 + Shadcn/ui
Railway PostgreSQL + Railway S3 + Auth.js + Drizzle ORM + Vercel

## Moduły z Atomic UI
Hooki: useClients, useNewsletterCreator, useArtifact

## Workflow
git clone https://OWNER:${values['zephyr_token'] || 'TOKEN'}@... /tmp/zephyr
git config user.email "claude@anthropic.com" && git config user.name "Claude"
cd /tmp/zephyr && npm run build
git add -A && git commit -m "feat/fix: opis" && git push origin main

Sklonuj repo, przeczytaj CLAUDE.md i zacznij.`

  const claudeMd = () => `# Zephyr – instrukcja dla Claude

## Czym jest Zephyr
SaaS do tworzenia newsletterów HTML dla agencji obsługujących wielu klientów.
Konfiguracja per klient: kolory, font, instrukcje AI, biblioteka sekcji HTML, UTM-y.

## Repo
GitHub: ${values['zephyr_repo'] || 'UZUPEŁNIJ'}
Vercel: ${values['zephyr_vercel'] || 'UZUPEŁNIJ'}

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
DATABASE_URL                – Railway PostgreSQL connection string
AUTH_SECRET                 – generuj: openssl rand -base64 32
ANTHROPIC_API_KEY           – klucz Anthropic
RAILWAY_BUCKET_ENDPOINT     – https://storage.railway.app
RAILWAY_BUCKET_ACCESS_KEY   – z Railway Bucket → Credentials
RAILWAY_BUCKET_SECRET_KEY   – z Railway Bucket → Credentials
RAILWAY_BUCKET_NAME         – nazwa bucketa

## Zasady
- h-14 dla wszystkich nagłówków pierwszego rzędu (NIEPODWAŻALNE)
- CSS variables, nigdy hardkodowane kolory w UI
- HTML emaili: inline styles są wymagane
- npm run build przed każdym push – zero błędów TypeScript

## Makiety
https://atomic-ui-sandy.vercel.app/projects/zephyr`

  // ── Pasek synchronizacji ────────────────────────────────────────────────────

  const SyncBar = () => (
    <div className="h-14 border-b flex items-center px-6 gap-3 bg-background shrink-0">
      <div className="flex items-center gap-2 flex-1">
        {syncStatus === 'loading' && <><Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" /><span className="text-xs text-muted-foreground">Ładowanie...</span></>}
        {syncStatus === 'saving'  && <><Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" /><span className="text-xs text-muted-foreground">Zapisywanie...</span></>}
        {syncStatus === 'saved'   && <><Cloud className="w-3.5 h-3.5 text-emerald-500" /><span className="text-xs text-emerald-600">Zapisano w GitHub Gist</span></>}
        {syncStatus === 'error'   && <><CloudOff className="w-3.5 h-3.5 text-destructive" /><span className="text-xs text-destructive">Błąd zapisu – sprawdź token</span></>}
        {syncStatus === 'idle' && !token && <><CloudOff className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-xs text-muted-foreground">Wpisz token GitHub aby włączyć synchronizację</span></>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-xs text-muted-foreground">GitHub token:</span>
        {editingToken ? (
          <span className="inline-flex items-center gap-1">
            <input autoFocus value={tokenDraft} onChange={e => setTokenDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') confirmToken(); if (e.key === 'Escape') setEditingToken(false) }}
              type="password"
              className="bg-background border rounded px-2 py-1 text-xs font-mono outline-none focus:ring-1 focus:ring-ring w-48"
              placeholder="ghp_..." />
            <button onClick={confirmToken} className="text-emerald-600"><Check className="w-3.5 h-3.5" /></button>
          </span>
        ) : (
          <button onClick={() => { setTokenDraft(token); setEditingToken(true) }}
            className={cn('text-xs font-mono px-2 py-1 rounded border transition-colors',
              token ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100')}>
            {token ? '●●●●●●●●' : '← wpisz token'}
            <Pencil className="w-2.5 h-2.5 inline ml-1 opacity-50" />
          </button>
        )}
      </div>
    </div>
  )

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
          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-medium text-amber-800 mb-1">Pola edytowalne</p>
            <p className="text-[10px] text-amber-700 leading-relaxed">Kliknij podświetlone pola. Zapisują się automatycznie w GitHub Gist.</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">

            {active === 'wdrozenie' && (<>
              <div>
                <h1 className="text-xl font-semibold">Wdrożenie Zephyra – krok po kroku</h1>
                <p className="text-sm text-muted-foreground mt-1">Co musisz zrobić sam, a co zrobi Claude Code automatycznie.</p>
              </div>
              <div className="border rounded-xl p-4 bg-emerald-50 border-emerald-200">
                <p className="text-sm font-semibold text-emerald-800 mb-1">Claude Code robi automatycznie</p>
                <ul className="text-xs text-emerald-700 space-y-0.5 list-disc list-inside">
                  <li>Instaluje Next.js, Tailwind, Shadcn i zależności</li>
                  <li>Kopiuje moduły (hooki, typy) z Atomic UI</li>
                  <li>Konfiguruje Auth.js, Drizzle ORM i schemat bazy</li>
                  <li>Konfiguruje S3 client dla Railway Bucket</li>
                  <li>Buduje widoki według prototypów z Atomic UI</li>
                  <li>Deployuje na Vercel przy każdym push</li>
                </ul>
              </div>
              <StepList steps={[
                { number: 1, title: 'Utwórz repo na GitHubie', link: 'https://github.com/new', content: (<>
                    <p>github.com/new → nazwa <code className="bg-muted px-1 rounded text-xs">zephyr</code> → <strong>Private</strong> → Create repository.</p>
                    <p className="mt-1">Wygeneruj token: <strong>Settings → Developer settings → Personal access tokens → Generate new token (classic)</strong>. Zakres: <code className="bg-muted px-1 rounded text-xs">repo</code>.</p>
                    <div className="mt-2 space-y-1">
                      <div><EditableField fieldKey="zephyr_token" placeholder="ghp_..." values={values} onChange={onChange} /></div>
                      <div><EditableField fieldKey="zephyr_repo" placeholder="https://github.com/OWNER/zephyr" values={values} onChange={onChange} /></div>
                    </div>
                  </>), },
                { number: 2, title: 'Podłącz repo do Vercela', link: 'https://vercel.com/new', content: (<>
                    <p>vercel.com/new → Import Git Repository → wybierz <code className="bg-muted px-1 rounded text-xs">zephyr</code> → Deploy.</p>
                    <div className="mt-2"><EditableField fieldKey="zephyr_vercel" placeholder="https://zephyr.vercel.app" values={values} onChange={onChange} /></div>
                  </>), },
                { number: 3, title: 'Utwórz bazę PostgreSQL w Railway', link: 'https://railway.app', content: (<>
                    <p>railway.app → New Project → Add PostgreSQL. Skopiuj <strong>DATABASE_URL</strong> z zakładki Variables.</p>
                    <div className="mt-2"><EditableField fieldKey="zephyr_railway_db" placeholder="postgresql://user:pass@host:5432/zephyr" values={values} onChange={onChange} /></div>
                  </>), },
                { number: 4, title: 'Utwórz S3 Bucket w Railway (grafiki)', link: 'https://railway.app', content: (<>
                    <p>W tym samym projekcie Railway → New → Bucket. Po utworzeniu skopiuj z zakładki <strong>Credentials</strong>:</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-24 shrink-0">Endpoint:</span>
                        <EditableField fieldKey="zephyr_railway_s3" placeholder="https://storage.railway.app" values={values} onChange={onChange} />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-24 shrink-0">Access Key:</span>
                        <EditableField fieldKey="zephyr_s3_access" placeholder="access-key..." values={values} onChange={onChange} />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-24 shrink-0">Secret Key:</span>
                        <EditableField fieldKey="zephyr_s3_secret" placeholder="secret-key..." values={values} onChange={onChange} />
                      </div>
                    </div>
                  </>), },
                { number: 5, title: 'Klucz Anthropic API', link: 'https://console.anthropic.com/settings/keys', content: (<>
                    <p>console.anthropic.com → Create Key. Skopiuj – zobaczysz go tylko raz.</p>
                    <div className="mt-2"><EditableField fieldKey="anthropic_key" placeholder="sk-ant-..." values={values} onChange={onChange} /></div>
                  </>), },
                { number: 6, title: 'Wklej CLAUDE.md do repo', content: (
                    <p>Skopiuj CLAUDE.md z zakładki obok → GitHub: "Add file" → "Create new file" → nazwa: <code className="bg-muted px-1 rounded text-xs">CLAUDE.md</code>.</p>
                  ), },
                { number: 7, title: 'Uruchom Claude Code', content: (
                    <p>Wklej prompt z zakładki "Sesja Zephyr". Na końcu dopisz: <em>"Zacznij od Iteracji 1 – setup projektu."</em></p>
                  ), },
              ]} />
            </>)}

            {active === 'atomic' && (<>
              <div>
                <h1 className="text-xl font-semibold">Prompt startowy – Atomic UI</h1>
                <p className="text-sm text-muted-foreground mt-1">Wklej to na początku każdej sesji w projekcie Claude "Atomic UI".</p>
              </div>
              <EditableCode values={values} onChange={onChange} lines={[
                ['# Atomic UI – sesja robocza'],
                [''],
                ['## Repo'],
                ['GitHub: https://github.com/ArturDab/atomic-ui'],
                ['Token: ', { key: 'atomic_token', placeholder: 'ghp_...' }],
                ['Vercel: https://atomic-ui-sandy.vercel.app'],
                [''],
                ['## Projekt: Zephyr'],
                ['Faza: Makiety + Design System + Moduły'],
                ['Widoki: 6 makiet, 4 motywy, 3 hooki'],
                [''],
                ['Sklonuj repo, przeczytaj CLAUDE.md i zacznij.'],
              ]} />
              <CopyButton label="Kopiuj prompt startowy Atomic UI" getText={atomicPrompt} />
              <div className="border-t pt-6 space-y-3">
                <h3 className="text-sm font-semibold">Stan projektu Zephyr w Atomic UI</h3>
                {[
                  { label: 'Makiety',         value: '6 widoków',                        done: true  },
                  { label: 'Design System',   value: '4 motywy (Sky/Slate/Sage/Noir)',    done: true  },
                  { label: 'Moduły',          value: '3 hooki, 14 typów TS',             done: true  },
                  { label: 'Implementacja',   value: 'Claude Code → repo Zephyr',         done: false },
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
            </>)}

            {active === 'session' && (<>
              <div>
                <h1 className="text-xl font-semibold">Prompt startowy – Zephyr</h1>
                <p className="text-sm text-muted-foreground mt-1">Wklej to na początku każdej sesji w Claude Code.</p>
              </div>
              <EditableCode values={values} onChange={onChange} lines={[
                ['# Zephyr – sesja robocza'],
                [''],
                ['## Repo'],
                ['GitHub: ', { key: 'zephyr_repo', placeholder: 'https://github.com/OWNER/zephyr' }],
                ['Token: ',  { key: 'zephyr_token', placeholder: 'ghp_...' }],
                ['Vercel: ', { key: 'zephyr_vercel', placeholder: 'https://zephyr.vercel.app' }],
                [''],
                ['## Backend (Railway)'],
                ['PostgreSQL: ',    { key: 'zephyr_railway_db', placeholder: 'postgresql://...' }],
                ['S3 Endpoint: ',   { key: 'zephyr_railway_s3', placeholder: 'https://storage.railway.app' }],
                ['S3 Access Key: ', { key: 'zephyr_s3_access', placeholder: 'access-key...' }],
                ['S3 Secret Key: ', { key: 'zephyr_s3_secret', placeholder: 'secret-key...' }],
                [''],
                ['## AI'],
                ['Anthropic: ', { key: 'anthropic_key', placeholder: 'sk-ant-...' }],
                [''],
                ['Sklonuj repo, przeczytaj CLAUDE.md i zacznij.'],
              ]} />
              <CopyButton label="Kopiuj prompt startowy Zephyr" getText={sessionPrompt} />
            </>)}

            {active === 'claude' && (<>
              <div>
                <h1 className="text-xl font-semibold">CLAUDE.md – Zephyr</h1>
                <p className="text-sm text-muted-foreground mt-1">Ten plik trafia do korzenia repo. Claude Code czyta go automatycznie.</p>
              </div>
              <div className="bg-muted/50 border rounded-lg overflow-hidden">
                <pre className="px-4 py-3 text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">{claudeMd()}</pre>
              </div>
              <CopyButton label="Kopiuj CLAUDE.md" getText={claudeMd} />
            </>)}

          </div>
        </div>
      </div>
    </div>
  )
}
