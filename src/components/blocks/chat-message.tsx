import { cn } from '@/lib/utils'
import { Sparkles } from 'lucide-react'

type MessageRole = 'user' | 'assistant'

interface ChatMessageProps {
  role: MessageRole
  content: string
  timestamp?: string
  userInitials?: string
}

export function ChatMessage({ role, content, timestamp, userInitials = 'U' }: ChatMessageProps) {
  const isAssistant = role === 'assistant'

  return (
    <div className={cn('flex gap-3', isAssistant ? 'items-start' : 'items-start flex-row-reverse')}>
      <div className={cn(
        'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold mt-0.5',
        isAssistant ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground'
      )}>
        {isAssistant ? <Sparkles className='w-3.5 h-3.5' /> : userInitials}
      </div>

      <div className={cn('flex flex-col gap-1 max-w-[85%]', !isAssistant && 'items-end')}>
        <div className={cn(
          'rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
          isAssistant
            ? 'bg-muted/60 text-foreground rounded-tl-sm'
            : 'bg-foreground text-background rounded-tr-sm'
        )}>
          {content}
        </div>
        {timestamp && (
          <span className='text-xs text-muted-foreground px-1'>{timestamp}</span>
        )}
      </div>
    </div>
  )
}
