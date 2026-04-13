import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThumbsUp, ThumbsDown, RotateCcw, Copy, Sparkles, Coins } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Message {
  id: string
  role: 'user' | 'assistant'
  // For user messages
  userName?: string
  userInitials?: string
  // For assistant messages
  agentName?: string       // Display label e.g. "COPYWRITER"
  agentInitial?: string    // Single letter e.g. "C"
  agentColor?: string      // Tailwind classes for colored avatar
  modelBadge?: string      // e.g. "GPT-4o"
  isSummary?: boolean
  // Content
  text: string
  // Meta
  tokens?: string
  time?: string
}

// ── Text formatting ────────────────────────────────────────────────────────────
// Supports: **bold**, inline code `code`

function FormattedText({ text }: { text: string }) {
  const paragraphs = text.split('\n\n')
  return (
    <>
      {paragraphs.map((para, i) => {
        // Bold + code inline formatting
        const parts = para.split(/(\*\*[^*]+\*\*|`[^`]+`)/)
        const rendered = parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>
          }
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={j} className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{part.slice(1, -1)}</code>
          }
          return part
        })
        return (
          <p key={i} className={cn('text-base leading-relaxed', i > 0 && 'mt-3')}>
            {rendered}
          </p>
        )
      })}
    </>
  )
}

// ── Message actions ────────────────────────────────────────────────────────────

function MessageActions({ tokens, time }: { tokens?: string; time?: string }) {
  return (
    <div className="flex items-center gap-1 mt-2">
      {(tokens || time) && (
        <span className="text-xs text-muted-foreground flex items-center gap-1 mr-2">
          {tokens && <><Coins className="w-3 h-3" /> {tokens}</>}
          {time && <span className="ml-1">{time}</span>}
        </span>
      )}
      {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
        <Button key={i} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <Icon className="w-3.5 h-3.5" />
        </Button>
      ))}
    </div>
  )
}

// ── ChatMessage ────────────────────────────────────────────────────────────────

export function ChatMessage({ msg }: { msg: Message }) {

  // User message
  if (msg.role === 'user') {
    return (
      <div className="flex gap-3 justify-end items-start">
        <div className="max-w-[72%]">
          {msg.userName && (
            <p className="text-xs text-muted-foreground text-right mb-1 font-medium uppercase tracking-wide">
              {msg.userName}
            </p>
          )}
          <div className="bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
            <FormattedText text={msg.text} />
          </div>
        </div>
        <Avatar className="w-8 h-8 shrink-0 mt-5">
          <AvatarFallback className="text-xs font-semibold">
            {msg.userInitials ?? 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    )
  }

  // Assistant / agent message
  const hasColoredAvatar = !!msg.agentColor

  return (
    <div className="flex gap-3 items-start">
      {/* Avatar */}
      {hasColoredAvatar ? (
        <div className={cn(
          'w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold shrink-0 mt-5',
          msg.agentColor
        )}>
          {msg.agentInitial}
        </div>
      ) : (
        <Avatar className="w-8 h-8 shrink-0 mt-5">
          <AvatarFallback>
            <Sparkles className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          {msg.agentName && (
            <span className="text-xs font-semibold tracking-wide uppercase">{msg.agentName}</span>
          )}
          {msg.modelBadge && (
            <Badge variant="outline" className="font-mono text-xs">{msg.modelBadge}</Badge>
          )}
          {msg.isSummary && (
            <Badge variant="outline" className="text-xs">Podsumowanie</Badge>
          )}
        </div>

        {/* Bubble */}
        <div className={cn(
          'rounded-lg px-4 py-3 text-base border',
          msg.isSummary ? 'bg-muted/60' : 'bg-muted/40'
        )}>
          <FormattedText text={msg.text} />
        </div>

        <MessageActions tokens={msg.tokens} time={msg.time} />
      </div>
    </div>
  )
}

// ── ChatMessages list ──────────────────────────────────────────────────────────

export function ChatMessages({ messages, maxWidth = 'max-w-2xl' }: { messages: Message[]; maxWidth?: string }) {
  return (
    <div className="py-8 px-6">
      <div className={cn('mx-auto space-y-6', maxWidth)}>
        {messages.map(msg => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
      </div>
    </div>
  )
}
