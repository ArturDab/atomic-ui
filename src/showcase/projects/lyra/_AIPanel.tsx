import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import {
  Sparkles, Send, Trash2, SlidersHorizontal, ChevronRight,
  Copy, PenLine, Zap, RotateCcw, X, Eye, EyeOff, Coins,
  BookOpen, FileText, History, Plus, ChevronDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  tokens?: number
  time?: string
}

interface AIPanelProps {
  onClose?: () => void
  contextTitle?: string   // tytuł rozdziału/artykułu
  contextType?: 'chapter' | 'article' | 'book'
  className?: string
}

// Poziom kontekstu: rozdział vs cała książka
type ContextLevel = 'chapter' | 'book'

const QUICK_ACTIONS = [
  { label: 'Kontynuuj tekst',   icon: Zap,      prompt: 'Kontynuuj pisanie od miejsca, w którym skończyłem. Napisz następne 2–3 zdania.' },
  { label: 'Popraw styl',       icon: Sparkles, prompt: 'Przeanalizuj styl i zaproponuj konkretne ulepszenia.' },
  { label: 'Sprawdź spójność',  icon: BookOpen, prompt: 'Sprawdź spójność z resztą dokumentu.' },
  { label: 'Skróć',             icon: ChevronRight, prompt: 'Skróć aktualny fragment o ~30%, zachowując sens.' },
]

const DEMO_MESSAGES: Message[] = [
  {
    id: '1', role: 'user', time: '14:08',
    content: 'Napisz wstęp do rozdziału o implementacji agentów AI w małych firmach.',
  },
  {
    id: '2', role: 'assistant', time: '14:08', tokens: 890,
    content: 'Implementacja agentów AI w małych firmach to dziś nie tylko możliwość, ale coraz częściej konieczność konkurencyjna. W przeciwieństwie do dużych korporacji, małe przedsiębiorstwa dysponują ograniczonymi zasobami, dlatego automatyzacja powtarzalnych procesów przynosi tu nieproporcjonalnie duże korzyści.\n\nW tym rozdziale omówimy praktyczne podejście do wdrożenia pierwszego agenta – bez rozbudowanej infrastruktury i bez zatrudniania specjalistów.',
  },
]

// ── Komponent ─────────────────────────────────────────────────────────────────

export function AIPanel({ onClose, contextTitle, contextType = 'chapter', className }: AIPanelProps) {
  const [messages, setMessages] = React.useState<Message[]>(DEMO_MESSAGES)
  const [input, setInput] = React.useState('')
  const [showSettings, setShowSettings] = React.useState(false)
  const [showInstructions, setShowInstructions] = React.useState(false)
  const [instructions, setInstructions] = React.useState(
    'Pisz w stylu przystępnym, ale eksperckim. Unikaj żargonu. Tekst po polsku.'
  )
  // Dla książki: przełącznik kontekstu rozdział ↔ cała książka
  const [contextLevel, setContextLevel] = React.useState<ContextLevel>('chapter')
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const isBook = contextType === 'chapter' || contextType === 'book'

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const now = new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: input, time: now }])
    setInput('')
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(), role: 'assistant', time: now, tokens: 42,
        content: 'Rozumiem. Pracuję nad tym fragmentem – dam Ci wersję do oceny za chwilę.',
      }])
    }, 800)
  }

  return (
    <div className={cn('flex flex-col bg-background border-l', className)}>

      {/* ── Header – h-14, bez truncation ────────────────────────── */}
      <div className="h-14 border-b flex itely-center gap-2.5 px-4 shrink-0">
        <Sparkles className="w-4 h-4 text-muted-foreground shrink-0" />
        <span className="text-sm font-semibold flex-1">Asystent AI</span>
        {/* Ikony – nie tłoczą tytułu bo tytuł jest teraz osobno */}
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"
          onClick={() => setShowSettings(o => !o)} title="Ustawienia">
          <SlidersHorizontal className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0"
          onClick={() => setMessages([])} disabled={messages.length === 0} title="Wyczyść konwersację">
          <Trash2 className="w-4 h-4" />
        </Button>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={onClose}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* ── Kontekst – osobny wiersz pod headerem, nie ucina ─────── */}
      {(contextTitle || isBook) && (
        <div className="border-b px-4 py-2 shrink-0 bg-muted/20">
          <div className="flex itely-center gap-2">
            {/* Dla książek: przełącznik rozdział / cała książka */}
            {isBook ? (
              <div className="flex itely-center gap-1 bg-muted rounded-lg p-0.5 text-xs">
                <button
                  onClick={() => setContextLevel('chapter')}
                  className={cn(
                    'flex itely-center gap-1 px-2.5 py-1 rounded-md transition-colors',
                    contextLevel === 'chapter'
                      ? 'bg-background text-foreground shadow-sm font-medium'
                      : 'text-foreground/60 hover:text-foreground'
                  )}>
                  <FileText className="w-3 h-3" /> Rozdział
                </button>
                <button
                  onClick={() => setContextLevel('book')}
                  className={cn(
                    'flex itely-center gap-1 px-2.5 py-1 rounded-md transition-colors',
                    contextLevel === 'book'
                      ? 'bg-background text-foreground shadow-sm font-medium'
                      : 'text-foreground/60 hover:text-foreground'
                  )}>
                  <BookOpen className="w-3 h-3" /> Książka
                </button>
              </div>
            ) : (
              <FileText className="w-3 h-3 text-muted-foreground shrink-0" />
            )}

            {/* Tytuł kontekstu – pełny tekst, wrap dozwolony */}
            {contextTitle && (
              <span className="text-xs text-foreground/60 leading-tight flex-1 min-w-0">
                {contextLevel === 'book' ? 'Strategie Contentowe dla Ekspertów' : contextTitle}
              </span>
            )}
          </div>

          {/* Historia konwersacji – link do archiwum */}
          <div className="flex itely-center gap-2 mt-1.5">
            <button className="flex itely-center gap-1 text-[10px] text-foreground/60 hover:text-foreground/70 transition-colors">
              <History className="w-2.5 h-2.5" />
              {contextLevel === 'chapter' ? 'Historia tego rozdziału' : 'Historia tej książki'}
            </button>
            <span className="text-foreground/25">·</span>
            <button className="flex itely-center gap-1 text-[10px] text-foreground/60 hover:text-foreground/70 transition-colors">
              <Plus className="w-2.5 h-2.5" />
              Nowa konwersacja
            </button>
          </div>
        </div>
      )}

      {/* ── Settings ─────────────────────────────────────────────── */}
      {showSettings && (
        <div className="border-b px-4 py-3 bg-muted/30 space-y-3 shrink-0">
          <div className="flex itely-center justify-between">
            <p className="text-xs font-semibold">Ustawienia AI</p>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowSettings(false)}>
              <X className="w-3 h-3" />
            </Button>
          </div>
          <select className="w-full text-xs border rounded-md px-2 py-1.5 bg-background">
            <option>OpenAI GPT-4o</option>
            <option>Claude Sonnet 4</option>
            <option>Gemini Pro</option>
          </select>
          <div className="flex itely-center gap-2 text-xs text-foreground/60">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            Dodaj klucz API w ustawieniach aplikacji
          </div>
          <button
            onClick={() => setShowInstructions(o => !o)}
            className="flex itely-center gap-1 text-xs text-foreground/60 hover:text-foreground transition-colors">
            {showInstructions ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            Instrukcje systemowe
          </button>
          {showInstructions && (
            <Textarea
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
              className="text-xs min-h-16 resize-none"
              placeholder="Opisz styl, ton, kontekst, persony..."
            />
          )}
        </div>
      )}

      {/* ── Wiadomości ───────────────────────────────────────────── */}
      <ScrollArea className="flex-1">
        {messages.length === 0 ? (
          <div className="flex flex-col itely-center justify-center py-10 gap-3 text-center px-4">
            <div className="w-10 h-10 rounded-full bg-muted flex itely-center justify-center">
              <Sparkles className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-medium">Jak mogę pomóc?</p>
              <p className="text-xs text-foreground/60 mt-0.5">
                {contextLevel === 'chapter'
                  ? 'Znam treść tego rozdziału.'
                  : 'Znam strukturę całej książki.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center mt-1 w-full">
              {QUICK_ACTIONS.map(a => (
                <button key={a.label}
                  onClick={() => { setInput(a.prompt); textareaRef.current?.focus() }}
                  className="flex itely-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/70 transition-colors text-foreground/85 hover:text-foreground">
                  <a.icon className="w-3 h-3" /> {a.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4 px-3 space-y-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn('flex gap-2.5', msg.role === 'user' && 'justify-end')}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-muted border flex itely-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}
                <div className={cn(
                  'max-w-[88%] rounded-xl px-3 py-2.5 text-sm leading-relaxed',
                  msg.role === 'user' ? 'bg-foreground text-background' : 'bg-muted/50 border'
                )}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  {msg.role === 'assistant' && (
                    <div className="flex itely-center gap-2 mt-2 pt-2 border-t border-border/50">
                      {msg.tokens && (
                        <span className="text-[10px] text-foreground/60 flex itely-center gap-1">
                          <Coins className="w-2.5 h-2.5" /> {msg.tokens} tok
                        </span>
                      )}
                      {msg.time && (
                        <span className="text-[10px] text-foreground/55">{msg.time}</span>
                      )}
                      <div className="flex gap-1 ml-auto">
                        {[Copy, PenLine, RotateCcw].map((Icon, i) => (
                          <button key={i}
                            className="w-5 h-5 flex itely-center justify-center text-foreground/55 hover:text-foreground transition-colors rounded">
                            <Icon className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>

      {/* ── Input ────────────────────────────────────────────────── */}
      <div className="p-3 border-t shrink-0">
        <div className="border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-ring">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={contextLevel === 'book'
              ? 'Zapytaj o całą książkę...'
              : 'Zapytaj o ten rozdział...'}
            rows={2}
            className="w-full resize-none px-3 pt-2.5 pb-2 text-sm outline-none bg-transparent placeholder:text-muted-foreground leading-relaxed"
            style={{ maxHeight: '120px' }}
          />
          <div className="flex itely-center justify-between px-2 py-1.5 border-t bg-muted/20">
            <span className="text-[10px] text-foreground/65">⏎ wyślij · ⇧⏎ nowa linia</span>
            <Button size="sm" className="h-7 gap-1.5 text-xs px-3" onClick={send} disabled={!input.trim()}>
              <Send className="w-3.5 h-3.5" /> Wyślij
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
