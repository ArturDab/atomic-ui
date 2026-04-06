import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Check, ChevronDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Model {
  id: string
  name: string
  provider: string
  tag?: string
}

const PROVIDERS = ['Wszystkie', 'OpenAI', 'Anthropic', 'Google', 'Meta', 'Mistral']

const MODELS: Model[] = [
  // OpenAI
  { id: 'OPENAI/GPT-5.4-NANO',    name: 'GPT-5.4 Nano',    provider: 'OpenAI' },
  { id: 'OPENAI/GPT-5.4-MINI',    name: 'GPT-5.4 Mini',    provider: 'OpenAI' },
  { id: 'OPENAI/GPT-5.4-PRO',     name: 'GPT-5.4 Pro',     provider: 'OpenAI' },
  { id: 'OPENAI/GPT-5.4',         name: 'GPT-5.4',          provider: 'OpenAI' },
  { id: 'OPENAI/GPT-5.3-CHAT',    name: 'GPT-5.3 Chat',    provider: 'OpenAI' },
  { id: 'OPENAI/GPT-5.3-CODEX',   name: 'GPT-5.3 Codex',  provider: 'OpenAI' },
  { id: 'OPENAI/GPT-4O',          name: 'GPT-4o',           provider: 'OpenAI', tag: 'Popularny' },
  { id: 'OPENAI/GPT-4O-MINI',     name: 'GPT-4o mini',     provider: 'OpenAI' },
  // Anthropic
  { id: 'ANTHROPIC/CLAUDE-SONNET-4', name: 'Claude Sonnet 4', provider: 'Anthropic', tag: 'Nowy' },
  { id: 'ANTHROPIC/CLAUDE-OPUS-4',   name: 'Claude Opus 4',   provider: 'Anthropic' },
  { id: 'ANTHROPIC/CLAUDE-HAIKU-4',  name: 'Claude Haiku 4',  provider: 'Anthropic' },
  // Google
  { id: 'GOOGLE/GEMINI-2.5-PRO',  name: 'Gemini 2.5 Pro',  provider: 'Google', tag: 'Nowy' },
  { id: 'GOOGLE/GEMINI-2.5-FLASH',name: 'Gemini 2.5 Flash', provider: 'Google' },
  { id: 'GOOGLE/GEMINI-2.0-PRO',  name: 'Gemini 2.0 Pro',  provider: 'Google' },
  // Meta
  { id: 'META/LLAMA-3.3-70B',     name: 'Llama 3.3 70B',   provider: 'Meta' },
  { id: 'META/LLAMA-3.1-8B',      name: 'Llama 3.1 8B',    provider: 'Meta' },
  // Mistral
  { id: 'MISTRAL/MISTRAL-LARGE',  name: 'Mistral Large',   provider: 'Mistral' },
  { id: 'MISTRAL/MISTRAL-SMALL',  name: 'Mistral Small',   provider: 'Mistral' },
]

const PROVIDER_ICONS: Record<string, React.ReactNode> = {
  OpenAI:    <span className="w-4 h-4 rounded-full bg-foreground flex items-center justify-center text-[8px] font-bold text-background shrink-0">O</span>,
  Anthropic: <span className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">A</span>,
  Google:    <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white shrink-0">G</span>,
  Meta:      <span className="w-4 h-4 rounded-full bg-blue-700 flex items-center justify-center text-[8px] font-bold text-white shrink-0">M</span>,
  Mistral:   <span className="w-4 h-4 rounded-full bg-orange-700 flex items-center justify-center text-[8px] font-bold text-white shrink-0">M</span>,
}

interface ModelPickerProps {
  value: string
  onChange: (id: string) => void
}

export function ModelPicker({ value, onChange }: ModelPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const [activeProvider, setActiveProvider] = React.useState('Wszystkie')

  const selected = MODELS.find(m => m.id === value)

  const filtered = MODELS.filter(m => {
    const matchesProvider = activeProvider === 'Wszystkie' || m.provider === activeProvider
    const matchesSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.id.toLowerCase().includes(search.toLowerCase())
    return matchesProvider && matchesSearch
  })

  const grouped = filtered.reduce<Record<string, Model[]>>((acc, m) => {
    if (!acc[m.provider]) acc[m.provider] = []
    acc[m.provider].push(m)
    return acc
  }, {})

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 text-sm min-w-36 justify-between">
          <span className="flex items-center gap-1.5 truncate">
            {selected && PROVIDER_ICONS[selected.provider]}
            <span className="truncate">{selected?.name ?? 'Wybierz model'}</span>
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2.5 border-b">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <Input
            placeholder="Szukaj modelu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border-0 h-7 p-0 text-sm focus-visible:ring-0 bg-transparent"
            autoFocus
          />
        </div>

        {/* Provider tabs */}
        <div className="flex gap-1 px-2 py-2 border-b overflow-x-auto">
          {PROVIDERS.map(p => (
            <button
              key={p}
              onClick={() => setActiveProvider(p)}
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors shrink-0',
                activeProvider === p
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              )}
            >
              {p !== 'Wszystkie' && PROVIDER_ICONS[p]}
              {p}
            </button>
          ))}
        </div>

        {/* Model list */}
        <ScrollArea className="max-h-72">
          {Object.entries(grouped).length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Brak wyników</p>
          ) : (
            Object.entries(grouped).map(([provider, models]) => (
              <div key={provider}>
                <div className="flex items-center gap-2 px-3 py-2 bg-muted/30">
                  {PROVIDER_ICONS[provider]}
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{provider}</span>
                </div>
                {models.map(model => (
                  <button
                    key={model.id}
                    onClick={() => { onChange(model.id); setOpen(false) }}
                    className={cn(
                      'w-full flex items-center justify-between px-3 py-2.5 hover:bg-muted/50 transition-colors',
                      value === model.id && 'bg-muted'
                    )}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{model.name}</span>
                        {model.tag && (
                          <span className="text-[10px] bg-muted border rounded-full px-1.5 py-0.5 text-muted-foreground font-medium">{model.tag}</span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono">{provider} · {model.id}</span>
                    </div>
                    {value === model.id && <Check className="w-4 h-4 text-foreground shrink-0" />}
                  </button>
                ))}
                <Separator />
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
