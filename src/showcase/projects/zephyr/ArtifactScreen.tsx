/**
 * Zephyr – Artifact
 * Wynik generacji: podgląd newslettera (desktop/mobile) + czat AI do edycji + edytor HTML.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Monitor, Smartphone, Copy, Download, Send, Sparkles,
  RotateCcw, Code2, Eye, ChevronRight, Zap, X,
  Check, Mail, Coins,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Demo HTML newslettera ─────────────────────────────────────────────────────

const DEMO_SUBJECT   = 'Wiosenna promocja – do -40% na karmy!'
const DEMO_PREHEADER = 'Sprawdź, co przygotowaliśmy dla Twojego pupila na tę wiosnę 🐾'

// Symulacja HTML newslettera renderowana jako styled React
function NewsletterPreview({ mobile }: { mobile: boolean }) {
  const width = mobile ? 375 : 600

  return (
    <div style={{ width, maxWidth: '100%', margin: '0 auto', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0ea5e9', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>🐾 Animails</span>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Psy', 'Koty', 'Promocje'].map(l => (
            <span key={l} style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{l}</span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#fbbf24', color: '#92400e', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, marginBottom: 12, letterSpacing: 0.5 }}>
          WIOSENNA PROMOCJA
        </div>
        <h1 style={{ fontSize: mobile ? 26 : 32, fontWeight: 800, color: '#0c4a6e', margin: '0 0 12px', lineHeight: 1.2 }}>
          Do -40% na karmy<br />dla Twojego pupila!
        </h1>
        <p style={{ color: '#0369a1', fontSize: 15, margin: '0 0 24px', lineHeight: 1.6 }}>
          Tylko do niedzieli. Nie przegap najlepszej okazji tej wiosny – Twój pupil zasługuje na najlepsze.
        </p>
        <a href="#" style={{ backgroundColor: '#0ea5e9', color: '#fff', padding: '13px 28px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 14, display: 'inline-block' }}>
          Sprawdź ofertę →
        </a>
      </div>

      {/* Produkty */}
      <div style={{ backgroundColor: '#fff', padding: '32px 24px' }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 20, textAlign: 'center' }}>
          Wybrane produkty w promocji
        </h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: mobile ? 'wrap' : 'nowrap' }}>
          {[
            { name: 'Royal Canin Adult', animal: '🐕', price: '89,90 zł', was: '149,90 zł', badge: '-40%' },
            { name: "Hill's Science Plan", animal: '🐈', price: '79,90 zł', was: '119,90 zł', badge: '-33%' },
            { name: 'Purina Pro Plan', animal: '🐕', price: '94,90 zł', was: '134,90 zł', badge: '-29%' },
          ].map(product => (
            <div key={product.name} style={{
              flex: mobile ? '1 1 45%' : '1',
              border: '1px solid #e2e8f0',
              borderRadius: 10,
              padding: 16,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{product.animal}</div>
              <div style={{ backgroundColor: '#0ea5e9', color: '#fff', borderRadius: 12, padding: '2px 8px', fontSize: 11, fontWeight: 700, display: 'inline-block', marginBottom: 8 }}>
                {product.badge}
              </div>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', margin: '0 0 4px' }}>{product.name}</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: '#0ea5e9', margin: '0 0 2px' }}>{product.price}</p>
              <p style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through', margin: '0 0 12px' }}>{product.was}</p>
              <a href="#" style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '8px 16px', borderRadius: 6, textDecoration: 'none', fontSize: 12, fontWeight: 600, display: 'block' }}>
                Kup teraz
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Promo code */}
      <div style={{ backgroundColor: '#fff7ed', border: '2px dashed #fb923c', margin: '0 24px 24px', borderRadius: 12, padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#9a3412', margin: '0 0 8px' }}>Użyj kodu i uzyskaj dodatkowe -5%:</p>
        <div style={{ backgroundColor: '#fff', border: '1px solid #fb923c', borderRadius: 8, padding: '10px 20px', display: 'inline-block', letterSpacing: 4, fontWeight: 800, fontSize: 20, color: '#ea580c' }}>
          WIOSNA5
        </div>
        <p style={{ fontSize: 11, color: '#c2410c', margin: '8px 0 0' }}>Ważny do 20.04.2026 · min. zamówienie 100 zł</p>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 8px' }}>🐾 Animails · ul. Zwierzęca 12, Warszawa</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
          {['Regulamin', 'Polityka prywatności', 'Wypisz się'].map(l => (
            <a key={l} href="#" style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <p style={{ fontSize: 10, color: '#cbd5e1', margin: 0 }}>
          Wygenerowano przez Zephyr · animails.pl
        </p>
      </div>
    </div>
  )
}

// ── Wiadomości AI ─────────────────────────────────────────────────────────────

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  tokens?: number
  time: string
}

const DEMO_MESSAGES: Message[] = [
  {
    id: '1', role: 'user', time: '14:08',
    content: 'Wygeneruj newsletter wiosenny dla Animails. Brief: -40% na karmy Royal Canin i Hill\'s. 5 sekcji: nagłówek, hero, produkty, kod promo, stopka.',
  },
  {
    id: '2', role: 'assistant', time: '14:09', tokens: 2840,
    content: 'Newsletter gotowy! Wygenerowałem pełny kod HTML z:\n\n• Nagłówkiem z logo i nawigacją\n• Hero z gradientem i głównym CTA\n• Siatką 3 produktów z cenami i odznakami rabatów\n• Sekcją z kodem WIOSNA5 (+5% zniżki)\n• Stopką z linkami i unsubscribe\n\nChcesz coś zmienić?',
  },
  {
    id: '3', role: 'user', time: '14:11',
    content: 'Zmień kolor hero z niebieskiego na bardziej zielony. Wiosenna energia.',
  },
  {
    id: '4', role: 'assistant', time: '14:11', tokens: 420,
    content: 'Zaktualizowałem gradient w sekcji hero z #e0f2fe→#bae6fd na #dcfce7→#bbf7d0 (zielona paleta). Odświeżyłem też kolor przycisku CTA na emerald-600. Podgląd zaktualizowany.',
  },
]

const QUICK_ACTIONS = [
  { label: 'Zmień CTA',       icon: Zap,      prompt: 'Zaproponuj mocniejszy tekst CTA.' },
  { label: 'Skróć treść',     icon: ChevronRight, prompt: 'Skróć treść o 20%, zachowaj sens.' },
  { label: 'Popraw nagłówek', icon: Sparkles, prompt: 'Napisz 3 warianty nagłówka hero.' },
  { label: 'Dodaj sekcję',    icon: Mail,     prompt: 'Dodaj sekcję z testimonialem klienta.' },
]

// ── Główny ekran ─────────────────────────────────────────────────────────────

export default function ArtifactScreen() {
  const [mobile, setMobile]   = React.useState(false)
  const [tab, setTab]         = React.useState<'preview' | 'code'>('preview')
  const [messages, setMessages] = React.useState<Message[]>(DEMO_MESSAGES)
  const [input, setInput]     = React.useState('')
  const [copied, setCopied]   = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', time: '14:12', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
  }

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const DEMO_HTML = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${DEMO_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'DM Sans',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:24px 0;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;">

        <!-- Header -->
        <tr><td style="background:#0ea5e9;padding:16px 24px;">
          <span style="color:#fff;font-weight:700;font-size:18px;">🐾 Animails</span>
        </td></tr>

        <!-- Hero -->
        <tr><td style="background:linear-gradient(135deg,#e0f2fe,#bae6fd);padding:40px 24px;text-align:center;">
          <h1 style="font-size:32px;color:#0c4a6e;margin:0 0 12px;">
            Do -40% na karmy<br/>dla Twojego pupila!
          </h1>
          <a href="https://animails.pl/wiosna-2026?utm_source=newsletter&utm_medium=email&utm_campaign=wiosna-2026"
             style="background:#0ea5e9;color:#fff;padding:13px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">
            Sprawdź ofertę →
          </a>
        </td></tr>

        <!-- ... pozostałe sekcje ... -->

      </table>
    </td></tr>
  </table>
</body>
</html>`

  return (
    <div className="flex h-full bg-background overflow-hidden">

      {/* ── Lewa: AI Chat ── */}
      <div className="w-80 xl:w-96 flex flex-col border-r shrink-0">
        {/* Chat header */}
        <div className="h-14 border-b flex items-center px-4 gap-3 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold">Asystent Zephyr</p>
            <p className="text-xs text-muted-foreground">Animails · wiosna-2026</p>
          </div>
          <Badge variant="secondary" className="text-xs gap-1">
            <Coins className="w-3 h-3" />
            3 260
          </Badge>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-3">
          <div className="space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn('flex flex-col', msg.role === 'user' ? 'items-end' : 'items-start')}>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-foreground text-background rounded-br-sm'
                      : 'bg-muted rounded-bl-sm'
                  )}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                  {msg.tokens && (
                    <span className="text-xs text-muted-foreground">{msg.tokens.toLocaleString()} tokens</span>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick actions */}
        <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
          {QUICK_ACTIONS.map(({ label, icon: Icon, prompt }) => (
            <button
              key={label}
              onClick={() => setInput(prompt)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-muted hover:bg-muted/80 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="w-3 h-3" />
              {label}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-4 pb-4 shrink-0">
          <div className="flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder="Zmień, popraw, dodaj sekcję..."
              className="resize-none text-xs min-h-[36px] max-h-24 py-2"
              rows={1}
            />
            <Button size="icon" className="h-9 w-9 shrink-0" onClick={sendMessage} disabled={!input.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Prawa: podgląd + HTML ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-14 border-b flex items-center px-4 gap-3 shrink-0">
          {/* Temat + preheader */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate">{DEMO_SUBJECT}</p>
            <p className="text-xs text-muted-foreground truncate italic">{DEMO_PREHEADER}</p>
          </div>

          {/* View toggle */}
          <div className="flex items-center border rounded-lg overflow-hidden shrink-0">
            <button
              onClick={() => { setTab('preview'); setMobile(false) }}
              className={cn('flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors', tab === 'preview' && !mobile ? 'bg-foreground text-background' : 'hover:bg-muted')}
            >
              <Monitor className="w-3.5 h-3.5" />Desktop
            </button>
            <button
              onClick={() => { setTab('preview'); setMobile(true) }}
              className={cn('flex items-center gap-1.5 px-3 py-1.5 text-xs border-l transition-colors', tab === 'preview' && mobile ? 'bg-foreground text-background' : 'hover:bg-muted')}
            >
              <Smartphone className="w-3.5 h-3.5" />Mobile
            </button>
            <button
              onClick={() => setTab('code')}
              className={cn('flex items-center gap-1.5 px-3 py-1.5 text-xs border-l transition-colors', tab === 'code' ? 'bg-foreground text-background' : 'hover:bg-muted')}
            >
              <Code2 className="w-3.5 h-3.5" />HTML
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs" onClick={handleCopy}>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Skopiowano' : 'Kopiuj HTML'}
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs">
              <Download className="w-3.5 h-3.5" />
              Pobierz .html
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-100">
          {tab === 'preview' ? (
            <div className="min-h-full flex justify-center py-8 px-4">
              <div className={cn('bg-white shadow-xl', mobile ? 'rounded-3xl overflow-hidden' : 'rounded-lg overflow-hidden')}>
                {mobile && (
                  <div className="h-6 bg-slate-800 flex items-center justify-center">
                    <div className="w-16 h-1 bg-slate-600 rounded-full" />
                  </div>
                )}
                <NewsletterPreview mobile={mobile} />
              </div>
            </div>
          ) : (
            <div className="h-full p-4">
              <div className="h-full bg-slate-900 rounded-lg overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono ml-2">newsletter.html</span>
                  <div className="flex-1" />
                  <Button size="sm" variant="ghost" className="h-6 text-xs text-slate-400 hover:text-white gap-1">
                    <RotateCcw className="w-3 h-3" />Regeneruj
                  </Button>
                </div>
                <textarea
                  readOnly
                  value={DEMO_HTML}
                  className="flex-1 w-full bg-slate-900 text-slate-300 font-mono text-xs p-4 resize-none outline-none leading-relaxed"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
