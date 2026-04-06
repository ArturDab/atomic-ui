import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { ModelPicker } from './_ModelPicker'
import { ChatMessages } from './_ChatMessage'
import { ChatInput } from './_ChatInput'
import type { Message } from './_ChatMessage'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus, CheckSquare, ChevronDown, ChevronUp, SlidersHorizontal,
} from 'lucide-react'

const CHAT_LIST = [
  { id: '1',  title: 'Jeśli poproszę Cię tutaj o kod HTML newslettera, t...', time: '20 mar', active: true },
  { id: '2',  title: 'Sprawdzam Cię ;)', time: '20 mar' },
  { id: '3',  title: 'OK, sprawdzam, czy działa, czy rozmawiam z Kimś...', time: '20 mar' },
  { id: '4',  title: 'Sprawdzam, czy wszystko działa, czy jesteśmy połąc...', time: '20 mar' },
  { id: '5',  title: 'COPY & PASTE THIS PROMPT INTO AI: Role: You are...', time: '20 mar' },
  { id: '6',  title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar' },
  { id: '7',  title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar' },
  { id: '8',  title: 'Czy działasz?', time: '20 mar' },
  { id: '9',  title: 'Jesteś?', time: '20 mar' },
  { id: '10', title: 'test', time: '20 mar' },
  { id: '11', title: 'Zrób mi jakiś przykładowy artifact.', time: '20 mar' },
  { id: '12', title: 'Napisz bardzo szczegółowy przewodnik po historii...', time: '20 mar' },
  { id: '13', title: 'Nowa konwersacja', time: '20 mar' },
  { id: '14', title: 'test', time: '20 mar' },
]

const CODE = '<!DOCTYPE html>\n<html lang="pl">\n<head>\n  <meta charset="UTF-8">\n  <style>\n    body { margin: 0; font-family: Arial, sans-serif; }\n    .wrapper { max-width: 600px; margin: 0 auto; }\n    .header { padding: 24px; text-align: center; }\n    .content { padding: 32px 24px; }\n  </style>\n</head>\n<body>\n  <div class="wrapper">\n    <div class="header">\n      <img src="logo.png" alt="Logo" width="200">\n    </div>\n    <div class="content">\n      <!-- treść newslettera -->\n    </div>\n  </div>\n</body>\n</html>'

const MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    agentName: 'Asystent',
    modelBadge: 'GPT-4o',
    text: '```html\n' + CODE + '\n```\n\nThis HTML template follows your provided guidelines, featuring a single-column layout, inline CSS for compatibility, and placeholders for images.',
    tokens: '2010 tok',
    time: '9.65s',
  },
  {
    id: '2',
    role: 'user',
    userInitials: 'AK',
    text: 'Czy możesz wyświetlić mi ten kod z podglądem w bocznej kolumnie jako artefakt?',
  },
  {
    id: '3',
    role: 'assistant',
    agentName: 'Asystent',
    modelBadge: 'GPT-4o',
    text: 'Niestety, nie jestem w stanie bezpośrednio wyświetlić kodu HTML jako artefaktu z podglądem w bocznej kolumnie. Jednak mogę dostarczyć ci kod HTML, który możesz skopiować i wkleić do edytora HTML lub platformy do tworzenia e-maili.',
    tokens: '2795 tok',
    time: '1.92s',
  },
]

function ParamsPopover() {
  const [temp, setTemp] = React.useState([0.7])
  const [maxTokens, setMaxTokens] = React.useState([2000])
  const [topP, setTopP] = React.useState([1])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 gap-2 text-sm">
          <SlidersHorizontal className="w-4 h-4" />
          Parametry
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <div className="space-y-5">
          <p className="text-sm font-semibold">Parametry modelu</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Temperatura</Label>
              <span className="text-sm font-mono text-muted-foreground">{temp[0]}</span>
            </div>
            <Slider value={temp} onValueChange={setTemp} min={0} max={2} step={0.1} />
            <p className="text-xs text-muted-foreground">0 = deterministyczne · 2 = bardzo losowe</p>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Max tokenów</Label>
              <span className="text-sm font-mono text-muted-foreground">{maxTokens[0]}</span>
            </div>
            <Slider value={maxTokens} onValueChange={setMaxTokens} min={256} max={8192} step={256} />
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">Top P</Label>
              <span className="text-sm font-mono text-muted-foreground">{topP[0]}</span>
            </div>
            <Slider value={topP} onValueChange={setTopP} min={0} max={1} step={0.05} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default function AIChatScreen() {
  const [systemPromptOpen, setSystemPromptOpen] = React.useState(false)
  const [model, setModel] = React.useState('OPENAI/GPT-4O')

  const configBar = (
    <div className="flex items-center gap-2">
      <Tabs defaultValue="chat">
        <TabsList className="h-9">
          <TabsTrigger value="chat" className="text-sm h-8 px-4">Chat</TabsTrigger>
          <TabsTrigger value="completion" className="text-sm h-8 px-4">Completion</TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator orientation="vertical" className="h-5" />
      <ModelPicker value={model} onChange={setModel} />
      <div className="ml-auto">
        <ParamsPopover />
      </div>
    </div>
  )

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-chat" />

      {/* Chat list */}
      <div className="w-72 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <Button className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Nowy czat
          </Button>
        </div>
        <div className="flex items-center px-4 py-2">
          <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground px-2">
            <CheckSquare className="w-4 h-4" /> Zaznacz
          </Button>
        </div>
        <p className="px-4 pb-2 text-xs text-muted-foreground/70">
          Sortowanie aktywne · przeciąganie wyłączone
        </p>
        <ScrollArea className="flex-1">
          {CHAT_LIST.map(chat => (
            <button
              key={chat.id}
              className={`w-full text-left px-4 py-3 border-b transition-colors hover:bg-muted/50 ${chat.active ? 'bg-muted' : ''}`}
            >
              <p className="text-sm leading-snug line-clamp-2 mb-1">{chat.title}</p>
              <p className="text-xs text-muted-foreground">{chat.time}</p>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
          <h1 className="text-base font-semibold flex-1 truncate">
            Jeśli poproszę Cię tutaj o kod HTML newslettera, t...
          </h1>
        </div>

        {/* System prompt */}
        <div className="border-b">
          <button
            className="w-full flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors"
            onClick={() => setSystemPromptOpen(o => !o)}
          >
            <span className="text-sm text-muted-foreground">Prompt systemowy</span>
            {systemPromptOpen
              ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
              : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </button>
          {systemPromptOpen && (
            <div className="px-6 pb-4">
              <div className="rounded-md border bg-muted/40 px-4 py-3 text-sm text-muted-foreground font-mono leading-relaxed">
                Role: You are a World-Class UI/UX Designer and HTML Email Developer...
              </div>
            </div>
          )}
        </div>

        <ScrollArea className="flex-1">
          <ChatMessages messages={MESSAGES} />
        </ScrollArea>

        <ChatInput
          placeholder="Napisz wiadomość... (Enter = wyślij, Shift+Enter = nowa linia)"
          hint="Shift + Enter nowa linia"
          configBar={configBar}
        />
      </div>
    </div>
  )
}
