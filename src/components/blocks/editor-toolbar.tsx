import { ChevronLeft, Save, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DocumentStatus = 'draft' | 'published' | 'scheduled'

interface EditorToolbarProps {
  title?: string
  status?: DocumentStatus
  onBack?: () => void
  onSave?: () => void
  onPublish?: () => void
  onTitleChange?: (value: string) => void
  isSaving?: boolean
  className?: string
}

const STATUS_LABELS: Record<DocumentStatus, string> = {
  draft: 'Szkic',
  published: 'Opublikowany',
  scheduled: 'Zaplanowany',
}

export function EditorToolbar({ title, status = 'draft', onBack, onSave, onPublish, onTitleChange, isSaving, className }: EditorToolbarProps) {
  return (
    <div className={cn('h-14 border-b bg-white flex items-center px-4 gap-3', className)}>
      <Button variant='ghost' size='icon' className='h-8 w-8 shrink-0' onClick={onBack}>
        <ChevronLeft className='w-4 h-4' />
      </Button>

      <input
        type='text'
        value={title}
        onChange={e => onTitleChange?.(e.target.value)}
        placeholder='Tytuł dokumentu...'
        className='flex-1 text-sm font-medium bg-transparent outline-none placeholder:text-muted-foreground min-w-0'
      />

      <div className='flex items-center gap-2 shrink-0'>
        <Badge variant='outline' className='text-xs text-muted-foreground'>
          {STATUS_LABELS[status]}
        </Badge>
        <Button variant='ghost' size='sm' className='h-8 gap-1.5 text-xs' onClick={onSave} disabled={isSaving}>
          <Save className='w-3.5 h-3.5' />
          {isSaving ? 'Zapisuję...' : 'Zapisz'}
        </Button>
        <Button size='sm' className='h-8 gap-1.5 text-xs' onClick={onPublish}>
          <Globe className='w-3.5 h-3.5' />
          Opublikuj
        </Button>
      </div>
    </div>
  )
}
