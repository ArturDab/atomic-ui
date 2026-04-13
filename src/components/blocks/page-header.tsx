import * as React from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
  description?: string
  className?: string
}

export function PageHeader({ title, breadcrumbs, actions, description, className }: PageHeaderProps) {
  return (
    <div className={cn('h-14 border-b bg-background flex items-center px-6 shrink-0', className)}>
      <div className='flex items-center justify-between w-full gap-4'>
        <div className='flex flex-col justify-center min-w-0'>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <div className='flex items-center gap-1 mb-0.5'>
              {breadcrumbs.map((crumb, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ChevronLeft className='w-3 h-3 text-muted-foreground rotate-180' />}
                  <span className={cn(
                    'text-xs text-muted-foreground',
                    crumb.href && 'hover:text-foreground cursor-pointer transition-colors'
                  )}>
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </div>
          )}
          <h1 className='text-base font-semibold leading-none truncate'>{title}</h1>
          {description && <p className='text-xs text-muted-foreground mt-0.5'>{description}</p>}
        </div>
        {actions && <div className='flex items-center gap-2 shrink-0'>{actions}</div>}
      </div>
    </div>
  )
}
