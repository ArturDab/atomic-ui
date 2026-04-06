import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus, CheckSquare, ChevronDown, ChevronUp,
  Paperclip, Send, Sparkles, Copy, ThumbsUp,
  ThumbsDown, RotateCcw, Clock, SlidersHorizontal,
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

const CODE = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; font-family: Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .header { padding: 24px; text-align: center; }
    .content { padding: 32px 24px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="logo.png" alt="Logo" width="200">
    </div>
    <div class="content">
      <!-- treść newslettera -->
    </div>
  </div>
</body>
</html>`

function MessageActions() {
  return (
    <div className="flex items-center gap-1 mt-3">
      {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
        <Button key={i} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
          <Icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  )
}

function ParamsPopover() {
  const [temp, setTemp] = React.useState([0.7])
  const [maxTokens, setMaxTokens] = React.useState([2000])
  const [topP, setTopP] = React.useState([1])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-2 text-sm">
          <SlidersHorizontal className="w-3.5 h-3.5" />
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
            <p className="text-xs text-muted-foreground">Kreatywność odpowiedzi. 0 = deterministyczne, 2 = bardzo losowe.</p>
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
  const [input, setInput] = React.useState('')

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-chat" />

      {/* ── Chat list ── */}
      <div className="w-72 border-r flex flex-col shrink-0">
        <div className="p-4 border-b">
          <Button className="w-full gap-2">
            <Plus className="w-4 h-4" />
            Nowy czat
          </Button>
        </div>

        <div className="flex items-center px-4 py-2">
          <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-muted-foreground px-2">
            <CheckSquare className="w-4 h-4" />
            Zaznacz
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

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="h-14 border-b flex items-center px-6 gap-3 shrink-0">
          <h1 className="text-base font-semibold flex-1 truncate">
            Jeśli poproszę Cię tutaj o kod HTML newslettera, t...
          </h1>
        </div>

        {/* System prompt bar */}
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
                Role: You are a World-Class UI/UX Designer and HTML Email Developer with 15+ years of experience...
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1">
          <div className="py-8 px-6">
            <div className="max-w-2xl mx-auto space-y-8">

              {/* Assistant: code */}
              <div className="flex gap-4">
                <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                  <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold">Asystent</span>
                    <Badge variant="outline" className="font-mono text-xs">GPT-4o</Badge>
                    <span className="text-xs text-muted-foreground">13:24</span>
                  </div>

                  <div className="rounded-md border overflow-hidden mb-4">
                    <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/40">
                      <span className="text-xs font-mono text-muted-foreground">html</span>
                      <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs">
                        <Copy className="w-3.5 h-3.5" /> Kopiuj
                      </Button>
                    </div>
                    <pre className="px-4 py-3 text-sm font-mono leading-relaxed overflow-x-auto max-h-48 bg-muted/20 text-foreground/80">{CODE}</pre>
                  </div>

                  <p className="text-base leading-relaxed text-muted-foreground">
                    This HTML template follows your provided guidelines, featuring a single-column layout, inline CSS for compatibility, and placeholders for images.
                  </p>

                  <div className="flex items-center mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> 2010 tokenów · 9.65s
                    </span>
                    <div className="ml-auto"><MessageActions /></div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* User */}
              <div className="flex gap-4 justify-end">
                <div className="max-w-[75%] bg-foreground text-background rounded-2xl rounded-tr-sm px-5 py-3 text-base leading-relaxed">
                  Czy możesz wyświetlić mi ten kod z podglądem w bocznej kolumnie jako artefakt?
                </div>
                <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                  <AvatarFallback className="text-sm">AK</AvatarFallback>
                </Avatar>
              </div>

              {/* Assistant: text */}
              <div className="flex gap-4">
                <Avatar className="w-8 h-8 shrink-0 mt-0.5">
                  <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold">Asystent</span>
                    <Badge variant="outline" className="font-mono text-xs">GPT-4o</Badge>
                    <span className="text-xs text-muted-foreground">13:24</span>
                  </div>
                  <p className="text-base leading-relaxed">
                    Niestety, nie jestem w stanie bezpośrednio wyświetlić kodu HTML jako artefaktu z podglądem w bocznej kolumnie. Jednak mogę dostarczyć ci kod HTML, który możesz skopiować i wkleić do edytora HTML lub platformy do tworzenia e-maili.
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> 2795 tokenów · 1.92s
                    </span>
                    <div className="ml-auto"><MessageActions /></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </ScrollArea>

        {/* ── Input area ── */}
        <div className="border-t bg-background">
          <div className="max-w-2xl mx-auto px-6 py-3">

            {/* Pasek konfiguracji – jedna linia */}
            <div className="flex items-center gap-2 mb-3">
              <Tabs defaultValue="chat">
                <TabsList className="h-8">
                  <TabsTrigger value="chat" className="text-sm h-7 px-4">Chat</TabsTrigger>
                  <TabsTrigger value="completion" className="text-sm h-7 px-4">Completion</TabsTrigger>
                </TabsList>
              </Tabs>

              <Separator orientation="vertical" className="h-5" />

              <Select defaultValue="gpt4o">
                <SelectTrigger className="h-8 w-36 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt4o">GPT-4o</SelectItem>
                  <SelectItem value="gpt4o-mini">GPT-4o mini</SelectItem>
                  <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
                  <SelectItem value="claude-haiku">Claude Haiku</SelectItem>
                  <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                </SelectContent>
              </Select>

              <div className="ml-auto">
                <ParamsPopover />
              </div>
            </div>

            {/* Pole tekstowe */}
            <div className="border rounded-lg focus-within:ring-1 focus-within:ring-ring overflow-hidden">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Napisz wiadomość... (Enter = wyślij, Shift+Enter = nowa linia)"
                className="border-0 rounded-none focus-visible:ring-0 text-base py-3"
              />
              <div className="flex items-center justify-between px-3 py-2.5 border-t bg-muted/20">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">+0 tokenów</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Shift + Enter nowa linia</span>
                  <Button size="sm" className="gap-1.5">
                    <Send className="w-4 h-4" /> Wyślij
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
