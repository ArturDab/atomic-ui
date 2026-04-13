import * as React from 'react'
import { CheckCircle2, AlertCircle, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ConnectionStatus = 'connected' | 'error' | 'disconnected'

interface ConnectionCardProps {
  platform: string
  url: string
  status: ConnectionStatus
  meta?: string
  icon?: React.ComponentType<{ className?: string }>
  onDisconnect?: () => void
  onReconnect?: () => void
}

const STATUS_CONFIG: Record<ConnectionStatus, { label: string; className: string; icon: React.ComponentType<{ className?: string }> }> = {
  connected:    { label: 'Połączono',       className: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle2 },
  error:        { label: 'Błąd połączenia', className: 'bg-red-50 text-red-700 border-red-200',       icon: AlertCircle },
  disconnected: { label: 'Rozłączono',      className: 'bg-muted text-muted-foreground border-transparent', icon: AlertCircle },
}

export function ConnectionCard({ platform, url, status, meta, icon: Icon = Globe, onDisconnect, onReconnect }: ConnectionCardProps) {
  const cfg = STATUS_CONFIG[status]
  const StatusIcon = cfg.icon

  return (
    <div className='border rounded-xl bg-white p-4 flex items-center gap-4'>
      <div className='w-10 h-10 rounded-lg bg-muted/60 flex items-center justify-center shrink-0'>
        <Icon className='w-5 h-5 text-muted-foreground' />
      </div>

      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 mb-0.5'>
          <p className='font-medium text-sm'>{platform}</p>
          <Badge variant='outline' className={cn('text-xs gap-1', cfg.className)}>
            <StatusIcon className='w-3 h-3' />
            {cfg.label}
          </Badge>
        </div>
        <p className='text-xs text-muted-foreground truncate'>{url}</p>
        {meta && <p className='text-xs text-muted-foreground mt-0.5'>{meta}</p>}
      </div>

      {status === 'connected' && (
        <Button variant='ghost' size='sm' className='h-8 text-xs text-muted-foreground' onClick={onDisconnect}>
          Rozłącz
        </Button>
      )}
      {status !== 'connected' && (
        <Button variant='outline' size='sm' className='h-8 text-xs' onClick={onReconnect}>
          Połącz
        </Button>
      )}
    </div>
  )
}
