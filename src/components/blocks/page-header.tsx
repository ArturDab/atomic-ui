import * as React from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
    <div className={cn('border-b bg-white px-6 py-4', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className='flex items-center gap-1 mb-1'>
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronLeft className='w-3 h-3 text-muted-foreground rotate-180' />}
              <span className={cn('text-xs', crumb.href ? 'text-muted-foreground hover:text-foreground cursor-pointer' : 'text-muted-foreground')}>
                {crumb.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h1 className='text-xl font-semibold tracking-tight'>{title}</h1>
          {description && <p className='text-sm text-muted-foreground mt-0.5'>{description}</p>}
        </div>
        {actions && <div className='flex items-center gap-2 shrink-0'>{actions}</div>}
      </div>
    </div>
  )
}
