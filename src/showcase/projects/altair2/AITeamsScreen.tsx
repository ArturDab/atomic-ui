/**
 * AI Teams 2.0
 *
 * Kluczowe zmiany vs v1:
 * 1. Progressive disclosure – zamiast trzy kolumny od razu, najpierw wybierasz zespół
 * 2. Karty zespołów zamiast listy – więcej kontekstu, widoczni agenci
 * 3. Header czatu pokazuje agentów jako avatary z kolorami, bez oddzielnego prawego panelu
 * 4. Prawy panel kontekstowy – collapse/expand, nie zawsze zajmuje miejsce
 * 5. Agent "pisze" – wizualne wskaźniki aktywności
 */
import * as React from 'react'
import { CP2Sidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Plus, Users, MessageSquarePlus, ChevronRight,
  Upload, Coins, Clock, ThumbsUp, ThumbsDown,
  RotateCcw, Copy, Send, Paperclip, Settings2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const AGENT_COLOR: Record<string, string> = {
  e: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  c: 'bg-blue-100 text-blue-700 border-blue-200',
  s: 'bg-orange-100 text-orange-700 border-orange-200',
}

const TEAMS = [
  {
    id: '1', name: 'Tworzenie treści', active: true,
    desc: 'Redaktor, copywriter i specjalista SEO',
    agents: ['E', 'C', 'S'],
    agentColors: [AGENT_COLOR.e, AGENT_COLOR.c, AGENT_COLOR.s],
    lastMsg: 'Co konkretnie mamy przygotować?',
    lastTime: '2 min temu',
  },
  {
    id: '2', name: 'Prompt Panel Dev Team',
    desc: 'Zespół do pracy nad aplikacją Prompt Panel',
    agents: ['D', 'B'],
    agentColors: ['bg-violet-100 text-violet-700 border-violet-200', 'bg-pink-100 text-pink-700 border-pink-200'],
    lastMsg: 'Nowy czat',
    lastTime: 'wczoraj',
  },
]

const MESSAGES = [
  { id: '1', role: 'user', text: 'Czy jesteście gotowi do pracy?', initials: 'AK' },
  { id: '2', role: 'agent', agent: 'c', name: 'Copywriter',
    text: 'Cześć @AK, oczywiście! Daj mi znać, co konkretnie potrzebujesz.',
    tokens: '2.2s' },
  { id: '3', role: 'agent', agent: 's', name: 'SEO Specialist',
    text: '@AK, gotowy. Jak Copywriter przygotuje zarys, zadbam o słowa kluczowe i nagłówki.',
    tokens: '936 tok · 1.8s' },
  { id: '4', role: 'agent', agent: 'e', name: 'Editor-in-Chief', summary: true,
    text: 'Zespół gotowy. Potrzebujemy jednak więcej informacji – czy to artykuł, email czy coś innego?\n\n**Co konkretnie mamy przygotować i jaki masz deadline?**',
    tokens: '1179 tok · 6.4s' },
  { id: '5', role: 'user', text: 'Wymyślmy copy do reklamy Animails.', initials: 'AK' },
  { id: '6', role: 'agent', agent: 'c', name: 'Copywriter',
    text: 'Świetnie! Żeby trafić w odpowiedni ton, powiedz mi: kto jest grupą docelową i jaki jest główny benefit produktu?' },
]

const AGENTS_CONFIG = [
  { id: 'e', initial: 'E', name: 'Editor-in-Chief', role: 'Redaktor naczelny', enabled: true },
  { id: 'c', initial: 'C', name: 'Copywriter', role: 'Tworzenie treści', enabled: true },
  { id: 's', initial: 'S', name: 'SEO Specialist', role: 'Optymalizacja', enabled: true },
]

export default function AITeamsScreen() {
  const [rightOpen, setRightOpen] = React.useState(true)
  const [agents, setAgents] = React.useState(AGENTS_CONFIG)
  const [limit, setLimit] = React.useState([20])

  const toggleAgent = (id: string) =>
    setAgents(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="ai-teams" />

      {/* Team list – slim, no competing with chat */}
      <div className="w-64 border-r flex flex-col shrink-0">
        <div className="h-14 border-b flex itely-center px-3">
          <Button className="w-full gap-2 justify-start h-10">
            <Plus className="w-4 h-4 shrink-0" /> Utwórz zespół
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {TEAMS.map(team => (
              <button key={team.id} className={cn(
                'w-full text-left p-3 rounded-xl border transition-all hover:border-foreground/20',
                team.active ? 'border-foreground/30 bg-muted' : 'border-transparent'
              )}>
                {/* Agent avatars */}
                <div className="flex itely-center gap-1.5 mb-2">
                  {team.agents.map((a, i) => (
                    <div key={i} className={cn('w-6 h-6 rounded-full border flex itely-center justify-center text-[10px] font-bold', team.agentColors[i])}>
                      {a}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-medium leading-tight">{team.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{team.lastMsg}</p>
                <p className="text-[10px] text-muted-foreground/60 mt-1">{team.lastTime}</p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header – agenci jako avatary, nie jako oddzielny panel */}
        <div className="h-14 border-b flex itely-center px-5 gap-3 shrink-0">
          <div>
            <p className="text-sm font-semibold leading-tight">Tworzenie treści</p>
            <div className="flex itely-center gap-1.5 mt-0.5">
              {AGENTS_CONFIG.filter(a => a.enabled).map(a => (
                <div key={a.id} className={cn('w-5 h-5 rounded-full border flex itely-center justify-center text-[9px] font-bold', AGENT_COLOR[a.id])}>
                  {a.initial}
                </div>
              ))}
              <span className="text-[10px] text-muted-foreground">
                {AGENTS_CONFIG.filter(a => a.enabled).length} agentów aktywnych
              </span>
            </div>
          </div>

          <div className="flex itely-center gap-1 ml-auto">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
              <MessageSquarePlus className="w-4 h-4" /> Nowy czat
            </Button>
            <Button
              variant={rightOpen ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setRightOpen(o => !o)}
              title="Konfiguracja zespołu"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="py-6 px-5 space-y-5 max-w-2xl mx-auto">
            {MESSAGES.map(msg => {
              if (msg.role === 'user') return (
                <div key={msg.id} className="flex justify-end gap-3">
                  <div className="max-w-[72%] bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
                    {msg.text}
                  </div>
                  <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                    <AvatarFallback className="text-xs font-semibold">{msg.initials}</AvatarFallback>
                  </Avatar>
                </div>
              )

              return (
                <div key={msg.id} className="flex gap-3">
                  <div className={cn('w-7 h-7 rounded-full border flex itely-center justify-center text-xs font-semibold shrink-0 mt-0.5', AGENT_COLOR[msg.agent!])}>
                    {msg.agent!.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex itely-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold">{msg.name}</span>
                      {msg.summary && (
                        <Badge variant="outline" className="text-[10px] py-0">Podsumowanie</Badge>
                      )}
                    </div>
                    <div className={cn('rounded-xl px-4 py-3 text-sm leading-relaxed border', msg.summary ? 'bg-muted/60' : 'bg-muted/30')}>
                      {msg.text.split('\n\n').map((para, i) => (
                        <p key={i} className={i > 0 ? 'mt-3' : ''}>
                          {para.startsWith('**') && para.endsWith('**')
                            ? <strong>{para.slice(2, -2)}</strong>
                            : para}
                        </p>
                      ))}
                    </div>
                    {msg.tokens && (
                      <div className="flex itely-center gap-1 mt-1.5">
                        <span className="text-[10px] text-muted-foreground flex itely-center gap-1">
                          <Coins className="w-3 h-3" /> {msg.tokens}
                        </span>
                        <div className="flex ml-auto">
                          {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
                            <Button key={i} variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                              <Icon className="w-3 h-3" />
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-3">
          <div className="max-w-2xl mx-auto">
            <div className="border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-ring">
              <textarea
                placeholder="Napisz wiadomość do zespołu... (@agent żeby wspomnieć agenta)"
                rows={1}
                className="w-full resize-none px-4 pt-3 pb-2 text-sm outline-none bg-transparent placeholder:text-muted-foreground leading-relaxed"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <div className="flex itely-center justify-between px-3 py-2 border-t bg-muted/20">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex itely-center gap-2">
                  <span className="text-[10px] text-muted-foreground">⏎ wyślij · @agent wspomnienie</span>
                  <Button size="sm" className="h-7 gap-1.5 text-xs px-3">
                    <Send className="w-3.5 h-3.5" /> Wyślij
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsible right panel */}
      {rightOpen && (
        <div className="w-64 border-l flex flex-col shrink-0 overflow-y-auto bg-background">
          <div className="h-14 border-b flex itely-center justify-between px-4 shrink-0">
            <span className="text-sm font-semibold">Konfiguracja</span>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setRightOpen(false)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 space-y-5">

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Agenci</p>
              <div className="space-y-2">
                {agents.map(a => (
                  <div key={a.id} className="flex itely-center gap-3 p-2.5 border rounded-xl">
                    <div className={cn('w-7 h-7 rounded-full border flex itely-center justify-center text-xs font-semibold shrink-0', AGENT_COLOR[a.id])}>
                      {a.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{a.name}</p>
                      <p className="text-[10px] text-muted-foreground">{a.role}</p>
                    </div>
                    <Switch checked={a.enabled} onCheckedChange={() => toggleAgent(a.id)} />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Pliki kontekstowe</p>
              <div className="border border-dashed rounded-xl flex flex-col itely-center py-5 gap-2 text-muted-foreground">
                <Upload className="w-4 h-4" />
                <p className="text-xs">Przeciągnij lub kliknij</p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex itely-center justify-between mb-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Limit historii</p>
                <span className="text-sm font-semibold tabular-nums">{limit[0]}</span>
              </div>
              <Slider value={limit} onValueChange={setLimit} min={10} max={50} step={5} />
              <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                Zakres 10–50. Mniejsza wartość = mniej tokenów.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
