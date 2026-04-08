/**
 * SelectionMenu – popup przy zaznaczeniu tekstu w edytorze.
 * Inspirowany SelectionMenu + InlineAIPopup z Lyra Replit.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Wand2, Scissors, ArrowUpRight, RefreshCw, Sparkles,
  MessageSquare, Copy, MoreHorizontal, GraduationCap, Coffee,
  Send, ChevronDown, Check, X, RotateCcw, ArrowDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const PRIMARY_ACTIONS = [
  { id: 'improve', label: 'Popraw', icon: Wand2 },
  { id: 'expand',  label: 'Rozwiń',  icon: ArrowUpRight },
  { id: 'shorten', label: 'Skróć',   icon: Scissors },
  { id: 'rewrite', label: 'Przepisz', icon: RefreshCw },
]
const SECONDARY_ACTIONS = [
  { id: 'formal',   label: 'Formalniej', icon: GraduationCap },
  { id: 'casual',   label: 'Swobodniej', icon: Coffee },
  { id: 'dialog',   label: 'Na dialog',  icon: MessageSquare },
  { id: 'continue', label: 'Kontynuuj', icon: Sparkles },
]

type Phase = 'input' | 'loading' | 'result'

interface SelectionMenuProps {
  selectedText: string
  onClose: () => void
  style?: React.CSSProperties
}

export function SelectionMenu({ selectedText, onClose, style }: SelectionMenuProps) {
  const [showMore, setShowMore] = React.useState(false)
  const [phase, setPhase] = React.useState<Phase>('input')
  const [custom, setCustom] = React.useState('')
  const [label, setLabel] = React.useState('')

  const run = (actionLabel: string) => {
    setLabel(actionLabel)
    setPhase('loading')
    setTimeout(() => setPhase('result'), 1500)
  }

  const RESULT = 'Implementacja agentów AI w małych firmach przynosi nieproporcjonalnie duże korzyści w stosunku do zainwestowanych środków, szczególnie w obszarze automatyzacji powtarzalnych procesów operacyjnych.'

  return (
    <div
      className="fixed z-[100] w-[340px] bg-background border rounded-2xl shadow-xl overflow-hidden"
      style={style}
    >
      {phase === 'input' && (
        <>
          {/* Zaznaczony tekst */}
          <div className="px-4 py-3 border-b">
            <p className="text-xs text-foreground/85 line-clamp-2 leading-relaxed">
              „{selectedText.length > 80 ? selectedText.slice(0, 80) + '…' : selectedText}"
            </p>
            <p className="text-[10px] text-foreground/60 mt-0.5">{selectedText.length} znaków</p>
          </div>

          {/* Custom input */}
          <div className="px-3 py-2 border-b flex itely-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={custom}
              onChange={e => setCustom(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && custom.trim()) run(custom.trim()) }}
              placeholder="Własna instrukcja..."
              className="flex-1 text-sm outline-none bg-transparent placeholder:text-muted-foreground/50"
            />
            {custom.trim() && (
              <button onClick={() => run(custom.trim())}
                className="w-6 h-6 rounded-lg bg-foreground text-background flex itely-center justify-center">
                <Send className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Primary actions */}
          <div className="flex itely-center gap-0.5 p-2 border-b">
            {PRIMARY_ACTIONS.map(a => (
              <button key={a.id} onClick={() => run(a.label)}
                className="flex flex-col itely-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <a.icon className="w-4 h-4" />
                <span className="text-[10px] font-medium">{a.label}</span>
              </button>
            ))}
            <button onClick={() => setShowMore(o => !o)}
              className={cn('flex flex-col itely-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted transition-colors', showMore && 'bg-muted')}>
              <MoreHorizontal className="w-4 h-4" />
              <span className="text-[10px] font-medium">Więcej</span>
            </button>
          </div>

          {/* Secondary actions */}
          {showMore && (
            <div className="flex itely-center gap-0.5 p-2 border-b">
              {SECONDARY_ACTIONS.map(a => (
                <button key={a.id} onClick={() => run(a.label)}
                  className="flex flex-col itely-center gap-1 px-3 py-2 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <a.icon className="w-4 h-4" />
                  <span className="text-[10px] font-medium">{a.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Copy */}
          <div className="p-2">
            <button onClick={onClose}
              className="w-full flex itely-center justify-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted transition-colors">
              <Copy className="w-4 h-4" /> Kopiuj
            </button>
          </div>
        </>
      )}

      {phase === 'loading' && (
        <div className="px-4 py-5 space-y-3">
          <div className="flex itely-center justify-between">
            <div className="flex itely-center gap-2">
              <div className="flex gap-1">
                {[0, 120, 240].map(d => (
                  <span key={d} className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce"
                    style={{ animationDelay: `${d}ms`, animationDuration: '700ms' }} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{label}...</span>
            </div>
            <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
          </div>
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-muted rounded-full w-full" />
            <div className="h-3 bg-muted/70 rounded-full w-[85%]" />
            <div className="h-3 bg-muted/50 rounded-full w-[65%]" />
          </div>
        </div>
      )}

      {phase === 'result' && (
        <>
          <div className="px-4 pt-3 pb-2">
            <div className="flex itely-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-[11px] text-foreground/85 font-medium">{label}</span>
              <div className="flex-1" />
              <button onClick={() => setPhase('input')}><RotateCcw className="w-3.5 h-3.5 text-muted-foreground" /></button>
              <button onClick={() => { navigator.clipboard?.writeText(RESULT) }}><Copy className="w-3.5 h-3.5 text-muted-foreground" /></button>
              <button onClick={onClose} className="ml-1"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
            </div>
            <p className="text-sm leading-relaxed bg-emerald-50 text-foreground px-3 py-2.5 rounded-lg border border-emerald-100">
              {RESULT}
            </p>
          </div>
          <div className="px-3 pb-3 space-y-1.5">
            <Button className="w-full h-9 gap-2" onClick={onClose}>
              <Check className="w-4 h-4" /> Zamień zaznaczony tekst
            </Button>
            <div className="flex gap-1.5">
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs gap-1.5" onClick={onClose}>
                <ArrowDown className="w-3.5 h-3.5" /> Wstaw poniżej
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs" onClick={() => setPhase('input')}>
                Odrzuć
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
