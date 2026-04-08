import { ArrowRight, Sliders } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PromptCardProps {
  category: string
  title: string
  description: string
  paramCount: number
  categoryColor?: string
  onUse?: () => void
}

const CATEGORY_COLORS: Record<string, string> = {
  'SEO':       'bg-violet-50 text-violet-700 border-violet-200',
  'Social':    'bg-pink-50 text-pink-700 border-pink-200',
  'Email':     'bg-orange-50 text-orange-700 border-orange-200',
  'Blog':      'bg-blue-50 text-blue-700 border-blue-200',
  'E-commerce':'bg-green-50 text-green-700 border-green-200',
  'PR':        'bg-yellow-50 text-yellow-700 border-yellow-200',
}

export function PromptCard({ category, title, description, paramCount, onUse }: PromptCardProps) {
  const colorClass = CATEGORY_COLORS[category] ?? 'bg-muted text-muted-foreground border-transparent'

  return (
    <div className='border rounded-xl bg-white p-5 hover:border-foreground/20 hover:shadow-sm transition-all flex flex-col gap-3 group'>
      <div className='flex itely-center justify-between'>
        <Badge variant='outline' className={cn('text-xs font-medium', colorClass)}>
          {category}
        </Badge>
      </div>

      <div>
        <h3 className='font-semibold text-sm mb-1'>{title}</h3>
        <p className='text-xs text-muted-foreground leading-relaxed line-clamp-2'>{description}</p>
      </div>

      <div className='flex itely-center justify-between pt-2 border-t mt-auto'>
        <span className='flex itely-center gap-1.5 text-xs text-muted-foreground'>
          <Sliders className='w-3 h-3' />
          {paramCount} {paramCount === 1 ? 'parametr' : paramCount < 5 ? 'parametry' : 'parametrów'}
        </span>
        <Button
          size='sm'
          className='h-7 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={onUse}
        >
          Użyj <ArrowRight className='w-3 h-3' />
        </Button>
      </div>
    </div>
  )
}
