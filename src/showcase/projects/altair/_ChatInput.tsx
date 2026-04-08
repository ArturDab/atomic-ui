import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Paperclip, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  placeholder?: string
  hint?: React.ReactNode
  configBar?: React.ReactNode   // slot nad inputem (pasek modelu, parametrów itp.)
  className?: string
}

export function ChatInput({
  placeholder = 'Napisz wiadomość...',
  hint,
  configBar,
  className,
}: ChatInputProps) {
  const [value, setValue] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-grow textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // submit
    }
  }

  return (
    <div className={cn('border-t bg-background', className)}>
      <div className="max-w-2xl mx-auto px-6 py-3">

        {/* Config bar slot */}
        {configBar && (
          <div className="mb-3">{configBar}</div>
        )}

        {/* Input box */}
        <div className="border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-ring">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full resize-none px-4 py-3 text-base outline-none bg-transparent placeholder:text-muted-foreground leading-relaxed"
            style={{ minHeight: '48px', maxHeight: '200px' }}
          />
          <div className="flex itely-center justify-between px-3 py-2 border-t bg-muted/20">
            <div className="flex itely-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">+0 tokenów</span>
            </div>
            <div className="flex itely-center gap-3">
              {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
              <Button size="sm" className="gap-1.5">
                <Send className="w-4 h-4" /> Wyślij
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
