import * as React from 'react'
import { MoreHorizontal, Globe, Clock, CheckCircle2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DocumentStatus = 'draft' | 'published' | 'scheduled'

interface DocumentCardProps {
  title: string
  excerpt?: string
  status: DocumentStatus
  updatedAt: string
  platform?: string
  categories?: string[]
  onEdit?: () => void
  onMore?: () => void
}

const STATUS_CONFIG: Record<DocumentStatus, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }> = {
  draft:     { label: 'Szkic',        icon: Clock,         className: 'bg-muted text-muted-foreground border-transparent' },
  published: { label: 'Opublikowany', icon: CheckCircle2,  className: 'bg-green-50 text-green-700 border-green-200' },
  scheduled: { label: 'Zaplanowany',  icon: Clock,         className: 'bg-blue-50 text-blue-700 border-blue-200' },
}

export function DocumentCard({ title, excerpt, status, updatedAt, platform, categories, onEdit, onMore }: DocumentCardProps) {
  const cfg = STATUS_CONFIG[status]
  const StatusIcon = cfg.icon

  return (
    <div className='border rounded-xl bg-white p-5 hover:border-foreground/20 hover:shadow-sm transition-all group'>
      <div className='flex items-start justify-between gap-3 mb-3'>
        <Badge variant='outline' className={cn('gap-1 text-xs font-medium', cfg.className)}>
          <StatusIcon className='w-3 h-3' />
          {cfg.label}
        </Badge>
        <Button
          variant='ghost' size='icon'
          className='h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity shrink-0'
          onClick={onMore}
        >
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </div>

      <h3 className='font-semibold text-sm leading-snug mb-1.5 line-clamp-2'>{title}</h3>

      {excerpt && (
        <p className='text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3'>{excerpt}</p>
      )}

      <div className='flex items-center justify-between mt-3 pt-3 border-t'>
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          {platform && (
            <span className='flex items-center gap-1'>
              <Globe className='w-3 h-3' />
              {platform}
            </span>
          )}
          {categories && categories.length > 0 && (
            <span className='text-muted-foreground/60'>·</span>
          )}
          {categories?.slice(0, 2).map(c => (
            <span key={c} className='text-muted-foreground/80'>{c}</span>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-xs text-muted-foreground'>{updatedAt}</span>
          <Button size='sm' variant='outline' className='h-7 text-xs' onClick={onEdit}>
            Edytuj
          </Button>
        </div>
      </div>
    </div>
  )
}
