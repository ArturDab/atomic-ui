import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Undo2, Redo2, Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, List, ListOrdered,
  Quote, Minus, Link2, Image, Code2, LayoutTemplate,
  Heading1, Heading2, Heading3, Type,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ToolbarProps {
  wordCount?: number
  chapterWordCount?: number
  onInsertBlock?: (type: string) => void
  className?: string
}

function ToolBtn({ icon: Icon, label, onClick, active, className }: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            'h-7 w-7 rounded flex items-center justify-center transition-colors',
            active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            className
          )}
        >
          <Icon className="w-3.5 h-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">{label}</TooltipContent>
    </Tooltip>
  )
}

export function EditorToolbar({ wordCount, chapterWordCount, onInsertBlock, className }: ToolbarProps) {
  return (
    <div className={cn('h-11 border-b flex items-center px-4 gap-1 bg-background overflow-x-auto shrink-0', className)}>
      <ToolBtn icon={Undo2} label="Cofnij (Ctrl+Z)" />
      <ToolBtn icon={Redo2} label="Ponów (Ctrl+Y)" />
      <div className="w-px h-5 bg-border mx-1 shrink-0" />
      <ToolBtn icon={Type}     label="Akapit" />
      <ToolBtn icon={Heading1} label="Nagłówek H1" />
      <ToolBtn icon={Heading2} label="Nagłówek H2" />
      <ToolBtn icon={Heading3} label="Nagłówek H3" />
      <div className="w-px h-5 bg-border mx-1 shrink-0" />
      <ToolBtn icon={Bold}        label="Pogrubienie (Ctrl+B)" />
      <ToolBtn icon={Italic}      label="Kursywa (Ctrl+I)" />
      <ToolBtn icon={Underline}   label="Podkreślenie (Ctrl+U)" />
      <ToolBtn icon={Strikethrough} label="Przekreślenie" />
      <div className="w-px h-5 bg-border mx-1 shrink-0" />
      <ToolBtn icon={AlignLeft}   label="Do lewej" active />
      <ToolBtn icon={AlignCenter} label="Wyśrodkuj" />
      <ToolBtn icon={AlignRight}  label="Do prawej" />
      <div className="w-px h-5 bg-border mx-1 shrink-0" />
      <ToolBtn icon={List}        label="Lista punktowana" />
      <ToolBtn icon={ListOrdered} label="Lista numerowana" />
      <ToolBtn icon={Quote}       label="Cytat" />
      <ToolBtn icon={Minus}       label="Linia podziału" />
      <ToolBtn icon={Link2}       label="Link" />
      <div className="w-px h-5 bg-border mx-1 shrink-0" />
      <ToolBtn icon={Image}       label="Obraz / grafika AI" onClick={() => onInsertBlock?.('image')} />
      <ToolBtn icon={Code2}       label="Blok HTML" onClick={() => onInsertBlock?.('html')} />
      <ToolBtn icon={LayoutTemplate} label="Blok promptu" onClick={() => onInsertBlock?.('prompt')} />
      {(wordCount !== undefined || chapterWordCount !== undefined) && (
        <>
          <div className="flex-1" />
          <span className="text-xs text-muted-foreground shrink-0 mr-2">
            {chapterWordCount !== undefined ? `${chapterWordCount} / ` : ''}
            {wordCount !== undefined ? `${wordCount} słów` : ''}
          </span>
        </>
      )}
    </div>
  )
}
