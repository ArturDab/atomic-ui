import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  placeholder?: string
  filters?: Array<{ key: string; label: string; options: FilterOption[] }>
  onSearch?: (value: string) => void
  className?: string
}

export function FilterBar({ placeholder = 'Szukaj...', filters, onSearch, className }: FilterBarProps) {
  return (
    <div className={cn('flex itely-center gap-2', className)}>
      <div className='relative flex-1 max-w-xs'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none' />
        <input
          type='text'
          placeholder={placeholder}
          onChange={e => onSearch?.(e.target.value)}
          className='w-full pl-8 pr-4 py-2 text-sm border rounded-lg bg-white outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground'
        />
      </div>

      {filters?.map(filter => (
        <select
          key={filter.key}
          className='h-9 px-3 text-sm border rounded-lg bg-white text-foreground outline-none focus:ring-1 focus:ring-ring cursor-pointer'
        >
          <option value=''>{filter.label}</option>
          {filter.options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ))}

      <Button variant='outline' size='sm' className='h-9 gap-1.5 ml-auto'>
        <SlidersHorizontal className='w-3.5 h-3.5' />
        Filtry
      </Button>
    </div>
  )
}
