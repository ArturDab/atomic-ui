/**
 * ChatPanel – współdzielony panel czatu AI.
 * Używany w: Lyra (_AIPanel), Zephyr (ArtifactScreen)
 * Różni się: quick actions, nagłówek, placeholder – reszta identyczna.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Sparkles, Send, RotateCcw, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  time?: string
  tokens?: number
}

export interface QuickAction {
  label: string
  prompt: string
}

export interface ChatPanelProps {
  title: string
  subtitle?: string
  messages: ChatMessage[]
  quickActions?: QuickAction[]
  placeholder?: string
  metaBadge?: React.ReactNode     // np. licznik tokenów
  onSend: (content: string) => void
  onClear?: () => void
  onClose?: () => void
  isLoading?: boolean
  className?: string
}

export function ChatPanel({
  title,
  subtitle,
  messages,
  quickActions = [],
  placeholder = 'Napisz wiadomość...',
  metaBadge,
  onSend,
  onClear,
  onClose,
  isLoading = false,
  className,
}: ChatPanelProps) {
  const [input, setInput] = React.useState('')
  const endRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className={cn('flex flex-col bg-background', className)}>
      {/* ── Nagłówek ─────────────────────────────────────────────────────── */}
      <div className='h-14 border-b flex items-center px-4 gap-3 shrink-0'>
        <div className='w-7 h-7 rounded-lg bg-foreground flex items-center justify-center shrink-0'>
          <Sparkles className='w-3.5 h-3.5 text-background' />
        </div>
        <div className='flex-1 min-w-0'>
          <p className='text-xs font-semibold'>{title}</p>
          {subtitle && <p className='text-[10px] text-muted-foreground truncate'>{subtitle}</p>}
        </div>
        <div className='flex items-center gap-1'>
          {metaBadge}
          {onClear && (
            <Button variant='ghost' size='icon' className='h-7 w-7' onClick={onClear} title='Wyczyść historię'>
              <RotateCcw className='w-3.5 h-3.5' />
            </Button>
          )}
          {onClose && (
            <Button variant='ghost' size='icon' className='h-7 w-7' onClick={onClose}>
              <X className='w-3.5 h-3.5' />
            </Button>
          )}
        </div>
      </div>

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      {quickActions.length > 0 && (
        <div className='px-4 pt-3 pb-2 flex flex-wrap gap-1.5 border-b'>
          {quickActions.map(({ label, prompt }) => (
            <button key={label} onClick={() => setInput(prompt)}
              className='text-[11px] px-2.5 py-1 rounded-full bg-muted hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-colors'>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ── Wiadomości ────────────────────────────────────────────────────── */}
      <ScrollArea className='flex-1'>
        <div className='px-4 py-4 space-y-4'>
          {messages.map(msg => (
            <div key={msg.id} className={cn('flex flex-col', msg.role === 'user' ? 'items-end' : 'items-start')}>
              <div className={cn(
                'max-w-[88%] rounded-xl px-3 py-2.5 text-xs leading-relaxed',
                msg.role === 'user'
                  ? 'bg-foreground text-background rounded-br-sm'
                  : 'bg-muted rounded-bl-sm'
              )}>
                <p className='whitespace-pre-line'>{msg.content}</p>
              </div>
              {(msg.time || msg.tokens) && (
                <div className='flex items-center gap-2 mt-1 px-1'>
                  {msg.time && <span className='text-[10px] text-muted-foreground'>{msg.time}</span>}
                  {msg.tokens && (
                    <span className='text-[10px] text-muted-foreground'>
                      {msg.tokens.toLocaleString()} tokens
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className='flex items-start'>
              <div className='bg-muted rounded-xl rounded-bl-sm px-3 py-2.5'>
                <span className='inline-flex gap-0.5'>
                  {[0, 150, 300].map(d => (
                    <span key={d} className='w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce'
                      style={{ animationDelay: `${d}ms`, animationDuration: '600ms' }} />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* ── Input ─────────────────────────────────────────────────────────── */}
      <Separator />
      <div className='p-3 shrink-0'>
        <div className='flex gap-2 items-end'>
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
            placeholder={placeholder}
            className='resize-none text-xs min-h-[36px] max-h-24 py-2 bg-muted/40 border-0 focus-visible:ring-1'
            rows={1}
          />
          <Button size='icon' className='h-9 w-9 shrink-0' onClick={send} disabled={!input.trim() || isLoading}>
            <Send className='w-3.5 h-3.5' />
          </Button>
        </div>
      </div>
    </div>
  )
}
