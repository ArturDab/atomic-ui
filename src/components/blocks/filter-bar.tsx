import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  placeholder?: string
  filters?: Array<{ key: string; label: string; options: FilterOption[] }>
  onSearch?: (value: string) => void
  onFilter?: (key: string, value: string) => void
  className?: string
}

export function FilterBar({
  placeholder = 'Szukaj...',
  filters,
  onSearch,
  onFilter,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className='relative flex-1 max-w-xs'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none' />
        <input
          type='text'
          placeholder={placeholder}
          onChange={e => onSearch?.(e.target.value)}
          className='w-full pl-8 pr-4 h-9 text-sm border rounded-lg bg-background outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground/60'
        />
      </div>

      {filters?.map(filter => (
        <Select key={filter.key} onValueChange={val => onFilter?.(filter.key, val)}>
          <SelectTrigger className='h-9 w-auto min-w-[110px] text-sm bg-background'>
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>{filter.label}: Wszystkie</SelectItem>
            {filter.options.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
