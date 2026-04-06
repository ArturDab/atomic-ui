import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Plus, Star, MessageSquarePlus, SlidersHorizontal,
  Trash2, Upload, MessageSquare, Users, ChevronRight,
  AtSign, Send,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Data ──────────────────────────────────────────────────────────────────────

const TEAMS = [
  { id: '1', name: 'Tworzenie treści', desc: 'Redaktor, copywriter i specjalista SEO do profesjonalnych treści' },
  { id: '2', name: 'Tworzenie treści', desc: 'Redaktor, copywriter i specjalista SEO do profesjonalnych treści', active: true },
  { id: '3', name: 'test', desc: 'test' },
  { id: '4', name: 'Prompt Panel Dev Team', desc: 'Zespół do pracy nad aplikacją Prompt Panel' },
  { id: '5', name: 'test', desc: 'test' },
]

const CHAT_HISTORY = Array.from({ length: 9 }, (_, i) => ({ id: String(i), label: 'Nowy czat' }))

const AGENTS = [
  { id: 'e', initial: 'E', name: 'Editor-in-Chief', desc: 'Lead editor. Review and improve content for cl...', enabled: true },
  { id: 'c', initial: 'C', name: 'Copywriter',       desc: 'Creative copywriter. Write compelling, clear an...', enabled: true },
  { id: 's', initial: 'S', name: 'SEO Specialist',   desc: 'SEO expert. Optimize content for search engi...', enabled: true },
]

const MESSAGES = [
  {
    id: '1', from: 'user', name: 'ArturD',
    text: 'Czy jesteście gotowi do pracy?',
  },
  {
    id: '2', from: 'agent', agent: 'c', agentName: 'COPYWRITER',
    text: 'Cześć @ArturD, oczywiście, że jesteśmy gotowi do pracy! Daj mi znać, co konkretnie chcesz, żebym przygotował, i zajmę się tym od razu. Jeśli masz jakieś dodatkowe informacje, które mogą się przydać, śmij je śmiało.',
    tokens: '2.2s',
  },
  {
    id: '3', from: 'agent', agent: 's', agentName: 'SEO SPECIALIST',
    text: '@ArturD, tak, jestem gotowy. Jak tylko @Copywriter przygotuje zarys treści, od razu wejdę w to, żeby zadbać o dobór słów kluczowych, zoptymalizować nagłówki i przygotować skuteczne meta opisy.',
    tokens: '936 tok', time: '1.8s',
  },
  {
    id: '4', from: 'agent', agent: 'e', agentName: 'EDITOR-IN-CHIEF', summary: true,
    text: '@ArturD, tak, zespół jest gotowy do pracy. @Copywriter czeka na szczegóły projektu, żeby od razu przygotować treści, a @SEO Specialist jest gotowy do optymalizacji jak tylko będzie miał zarys materiałów.\n\nJednak żeby ruszyć efektywnie, potrzebujemy więcej informacji. Nie wiemy, czy to artykuł, strona produktowa, kampania mailingowa czy coś zupełnie innego. Bez tego trudno będzie dobrać odpowiedni ton, długość i strategię SEO. Ryzykujemy, że przygotujemy coś, co będzie wymagało dużych poprawek.\n\n**Co konkretnie mamy przygotować i jaki masz deadline?**',
    tokens: '1179 tok', time: '6.4s',
  },
  {
    id: '5', from: 'user', name: 'ArturD',
    text: 'Wymyślmy copy do reklamy Animails.',
  },
  {
    id: '6', from: 'agent', agent: 'c', agentName: 'COPYWRITER',
    text: '@ArturD, świetnie, że startujemy z tworzeniem copy do reklamy Animails! Aby stworzyć coś naprawdę angażującego, dobrze byłoby wiedzieć trochę więcej. Kim dokładnie jest nasza grupa docelowa? Czy chcemy skupić się na konkretnym aspekcie produktu, czy mamy pełną swobodę twórczą? Jakie kanały planujesz wykorzystać do tej kampanii?',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

const AGENT_COLORS: Record<string, string> = {
  e: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  c: 'bg-blue-100 text-blue-700 border-blue-200',
  s: 'bg-orange-100 text-orange-700 border-orange-200',
}

function AgentAvatar({ agent }: { agent: string }) {
  const a = AGENTS.find(x => x.id === agent)
  return (
    <div className={cn('w-8 h-8 rounded-full border flex items-center justify-center text-sm font-semibold shrink-0', AGENT_COLORS[agent] ?? 'bg-muted')}>
      {a?.initial}
    </div>
  )
}

function MessageBubble({ msg }: { msg: typeof MESSAGES[0] }) {
  if (msg.from === 'user') {
    return (
      <div className="flex justify-end gap-3 items-start">
        <div className="max-w-[65%]">
          <p className="text-xs text-muted-foreground text-right mb-1 font-medium">{msg.name}</p>
          <div className="bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
            {msg.text}
          </div>
        </div>
        <Avatar className="w-8 h-8 shrink-0 mt-5">
          <AvatarFallback className="text-xs font-semibold">A</AvatarFallback>
        </Avatar>
      </div>
    )
  }

  const lines = msg.text.split('\n\n')

  return (
    <div className="flex gap-3 items-start">
      <AgentAvatar agent={msg.agent!} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold tracking-wide">{msg.agentName}</span>
          {msg.summary && (
            <Badge variant="outline" className="text-xs gap-1 border-amber-300 text-amber-700 bg-amber-50">
              Podsumowanie
            </Badge>
          )}
        </div>
        <div className={cn(
          'rounded-lg px-4 py-3 text-sm leading-relaxed',
          msg.summary ? 'bg-amber-50 border border-amber-200' : 'bg-muted/50 border'
        )}>
          {lines.map((line, i) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="font-semibold mt-2">{line.slice(2, -2)}</p>
            }
            return <p key={i} className={i > 0 ? 'mt-3' : ''}>{line}</p>
          })}
        </div>
        {(msg.tokens || msg.time) && (
          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            {msg.tokens && <span className="flex items-center gap-1"><Plus className="w-3 h-3" />{msg.tokens}</span>}
            {msg.time && <span>{msg.time}</span>}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function AITeamsScreen() {
  const [agents, setAgents] = React.useState(AGENTS)
  const [limit, setLimit] = React.useState([20])
  const [input, setInput] = React.useState('')

  const toggleAgent = (id: string) => {
    setAgents(prev => prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a))
  }

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-teams" />

      {/* ── Team list ── */}
      <div className="w-72 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <Button className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Utwórz zespół
          </Button>
        </div>

        <div className="px-4 py-2">
          <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground px-2">
            <span className="text-xs">⊞</span> Zaznacz
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="pb-2">
            {TEAMS.map(team => (
              <button
                key={team.id}
                className={cn(
                  'w-full text-left px-4 py-3 border-b flex items-start gap-3 hover:bg-muted/50 transition-colors',
                  team.active && 'bg-muted'
                )}
              >
                <Users className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{team.name}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">{team.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="px-4 pt-3 pb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Historia czatów
            </p>
          </div>
          {CHAT_HISTORY.map(c => (
            <button
              key={c.id}
              className={cn(
                'w-full text-left px-4 py-2.5 flex items-center gap-3 hover:bg-muted/50 transition-colors',
                c.id === '5' && 'bg-muted'
              )}
            >
              <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm">{c.label}</span>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* ── Chat area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
          <h1 className="text-base font-semibold">Tworzenie treści</h1>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
            <Star className="w-4 h-4" />
          </Button>
          <Badge variant="outline" className="gap-1.5 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            3 Aktywni agenci
          </Badge>
          <div className="flex items-center gap-1 ml-auto">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
              <MessageSquarePlus className="w-4 h-4" />
              Nowy czat
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="py-6 px-6 space-y-6 max-w-3xl mx-auto">
            {MESSAGES.map(msg => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 items-center border rounded-lg px-4 py-2.5 focus-within:ring-1 focus-within:ring-ring">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Napisz wiadomość do zespołu..."
                className="border-0 p-0 text-base focus-visible:ring-0 bg-transparent"
              />
              <Button size="icon" className="h-8 w-8 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 px-1">
              Shift + Enter for new line · <AtSign className="w-3 h-3 inline" /> to mention agent
            </p>
          </div>
        </div>

      </div>

      {/* ── Right panel ── */}
      <div className="w-72 border-l flex flex-col shrink-0 overflow-y-auto">

        {/* Panel header */}
        <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Przegląd zespołu
          </span>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 space-y-6">

          {/* Team summary */}
          <div className="flex items-start gap-3 p-3 border rounded-lg">
            <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold">Tworzenie treści</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                Redaktor, copywriter i specjalista SEO do profesjonalnych treści
              </p>
            </div>
          </div>

          <Separator />

          {/* Active agents */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Aktywni agenci
              </p>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="space-y-2">
              {agents.map(agent => (
                <div key={agent.id} className="flex items-center gap-3 p-2.5 border rounded-lg">
                  <div className={cn(
                    'w-7 h-7 rounded-full border flex items-center justify-center text-xs font-semibold shrink-0',
                    AGENT_COLORS[agent.id]
                  )}>
                    {agent.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{agent.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{agent.desc}</p>
                  </div>
                  <Switch
                    checked={agent.enabled}
                    onCheckedChange={() => toggleAgent(agent.id)}
                    className="shrink-0"
                  />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Context files */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Pliki kontekstowe
              </p>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Upload className="w-3.5 h-3.5" />
              </Button>
            </div>
            <div className="border rounded-lg border-dashed flex flex-col items-center justify-center py-6 text-muted-foreground gap-2">
              <Upload className="w-5 h-5" />
              <p className="text-xs">Brak plików</p>
            </div>
          </div>

          <Separator />

          {/* Message history limit */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Limit historii wiadomości
              </p>
              <span className="text-sm font-semibold tabular-nums">{limit[0]}</span>
            </div>
            <Slider
              value={limit}
              onValueChange={setLimit}
              min={10}
              max={50}
              step={5}
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zakres: 10–50 wiadomości. Mniejsza wartość oszczędza tokeny (szybciej + taniej).
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}
