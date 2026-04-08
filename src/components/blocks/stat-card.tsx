import * as React from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  label: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: React.ComponentType<{ className?: string }>
}

export function StatCard({ label, value, trend, trendLabel, icon: Icon }: StatCardProps) {
  const isPositive = trend !== undefined && trend > 0
  const isNegative = trend !== undefined && trend < 0
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus

  return (
    <div className='border rounded-xl bg-white p-5'>
      <div className='flex itely-start justify-between mb-3'>
        <p className='text-sm text-muted-foreground'>{label}</p>
        {Icon && (
          <div className='w-8 h-8 rounded-lg bg-muted/60 flex itely-center justify-center'>
            <Icon className='w-4 h-4 text-muted-foreground' />
          </div>
        )}
      </div>
      <p className='text-3xl font-semibold tracking-tight'>{value}</p>
      {trend !== undefined && (
        <div className={cn(
          'flex itely-center gap-1 mt-2 text-xs font-medium',
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-muted-foreground'
        )}>
          <TrendIcon className='w-3.5 h-3.5' />
          {isPositive && '+'}{trend} {trendLabel ?? 'vs poprzedni miesiąc'}
        </div>
      )}
    </div>
  )
}
