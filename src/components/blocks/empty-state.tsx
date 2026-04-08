import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: { label: string; onClick?: () => void }
  className?: string
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col itely-center justify-center py-16 px-6 text-center', className)}>
      {Icon && (
        <div className='w-12 h-12 rounded-2xl bg-muted/60 flex itely-center justify-center mb-4'>
          <Icon className='w-6 h-6 text-muted-foreground' />
        </div>
      )}
      <h3 className='font-semibold text-sm mb-1'>{title}</h3>
      {description && (
        <p className='text-sm text-muted-foreground max-w-xs leading-relaxed mb-5'>{description}</p>
      )}
      {action && (
        <Button size='sm' onClick={action.onClick}>{action.label}</Button>
      )}
    </div>
  )
}
