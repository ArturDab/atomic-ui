import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Plus, CheckSquare, ChevronDown, ChevronUp,
  Paperclip, Send, Sparkles, Copy, ThumbsUp,
  ThumbsDown, RotateCcw, Clock,
} from 'lucide-react'

const CHAT_LIST = [
  { id: '1', title: 'Jeśli poproszę Cię tutaj o kod HTML newslettera, t...', time: '20 mar', active: true },
  { id: '2', title: 'Sprawdzam Cię ;)', time: '20 mar' },
  { id: '3', title: 'OK, sprawdzam, czy działa, czy rozmawiam z Kimś...', time: '20 mar' },
  { id: '4', title: 'Sprawdzam, czy wszystko działa, czy jesteśmy połąc...', time: '20 mar' },
  { id: '5', title: 'COPY & PASTE THIS PROMPT INTO AI: Role: You are...', time: '20 mar' },
  { id: '6', title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar' },
  { id: '7', title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar' },
  { id: '8', title: 'Czy działasz?', time: '20 mar' },
  { id: '9', title: 'Jesteś?', time: '20 mar' },
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

export default function AIChatScreen() {
  const [systemPromptOpen, setSystemPromptOpen] = React.useState(false)
  const [input, setInput] = React.useState('')

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-chat" />

      {/* Chat list */}
      <div className="w-72 border-r flex flex-col shrink-0">
        <div className="p-3 border-b">
          <Button className="w-full gap-2" size="sm">
            <Plus className="w-3.5 h-3.5" />
            Nowy czat
          </Button>
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs text-muted-foreground px-2">
            <CheckSquare className="w-3.5 h-3.5" />
            Zaznacz
          </Button>
        </div>

        <p className="px-3 pb-2 text-[10px] text-muted-foreground">
          Sortowanie aktywne · przeciąganie wyłączone
        </p>

        <ScrollArea className="flex-1">
          {CHAT_LIST.map(chat => (
            <button
              key={chat.id}
              className={`w-full text-left px-3 py-2.5 border-b hover:bg-muted/50 transition-colors ${chat.active ? 'bg-muted' : ''}`}
            >
              <p className="text-xs leading-snug line-clamp-2 mb-0.5">{chat.title}</p>
              <p className="text-[10px] text-muted-foreground">{chat.time}</p>
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Title */}
        <div className="h-12 border-b flex items-center px-5 gap-3 shrink-0">
          <h1 className="text-sm font-semibold flex-1 truncate">
            Jeśli poproszę Cię tutaj o kod HTML newslettera, t...
          </h1>
          <Badge variant="outline" className="font-mono text-xs shrink-0">GPT-4o</Badge>
        </div>

        <ScrollArea className="flex-1">
          {/* System prompt */}
          <div className="border-b">
            <button
              className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted/40 transition-colors"
              onClick={() => setSystemPromptOpen(o => !o)}
            >
              <span className="text-xs text-muted-foreground font-medium">Prompt systemowy</span>
              {systemPromptOpen
                ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
            </button>
            {systemPromptOpen && (
              <div className="px-5 pb-3">
                <div className="rounded-md border bg-muted/40 px-3 py-2.5 text-xs text-muted-foreground font-mono leading-relaxed">
                  Role: You are a World-Class UI/UX Designer and HTML Email Developer with 15+ years of experience...
                </div>
              </div>
            )}
          </div>

          <div className="p-5 space-y-6 max-w-3xl">

            {/* Assistant: code block */}
            <div className="flex gap-3">
              <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                <AvatarFallback className="text-xs"><Sparkles className="w-3.5 h-3.5" /></AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold">Asystent</span>
                  <Badge variant="outline" className="text-[10px] font-mono py-0">GPT-4o</Badge>
                  <span className="text-[10px] text-muted-foreground">13:24</span>
                </div>

                {/* Code */}
                <div className="rounded-md border bg-muted/60 mb-3">
                  <div className="flex items-center justify-between px-3 py-2 border-b">
                    <span className="text-[10px] font-mono text-muted-foreground">html</span>
                    <Button variant="ghost" size="sm" className="h-6 gap-1 text-[10px] px-2">
                      <Copy className="w-3 h-3" /> Kopiuj
                    </Button>
                  </div>
                  <pre className="px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto max-h-44 text-foreground/80">
{CODE}
                  </pre>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  This HTML template follows your provided guidelines, featuring a single-column layout, inline CSS for compatibility, and placeholders for images.
                </p>

                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mr-2">
                    <Clock className="w-3 h-3" /> 2010 tokenów · 9.65s
                  </span>
                  {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
                    <Button key={i} variant="ghost" size="icon" className="h-6 w-6">
                      <Icon className="w-3 h-3" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* User message */}
            <div className="flex justify-end gap-3">
              <div className="max-w-[70%] bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
                Czy możesz wyświetlić mi ten kod z podglądem w bocznej kolumnie jako artefakt?
              </div>
              <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                <AvatarFallback className="text-xs">AK</AvatarFallback>
              </Avatar>
            </div>

            {/* Assistant: text reply */}
            <div className="flex gap-3">
              <Avatar className="w-7 h-7 shrink-0 mt-0.5">
                <AvatarFallback className="text-xs"><Sparkles className="w-3.5 h-3.5" /></AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold">Asystent</span>
                  <Badge variant="outline" className="text-[10px] font-mono py-0">GPT-4o</Badge>
                  <span className="text-[10px] text-muted-foreground">13:24</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Niestety, nie jestem w stanie bezpośrednio wyświetlić kodu HTML jako artefaktu z podglądem w bocznej kolumnie. Jednak mogę dostarczyć ci kod HTML, który możesz skopiować i wkleić do edytora HTML lub platformy do tworzenia e-maili, aby zobaczyć, jak wygląda w przeglądarce.
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1 mr-2">
                    <Clock className="w-3 h-3" /> 2795 tokenów · 1.92s
                  </span>
                  {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
                    <Button key={i} variant="ghost" size="icon" className="h-6 w-6">
                      <Icon className="w-3 h-3" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </ScrollArea>

        {/* Input */}
        <div className="border-t p-4">
          <div className="border rounded-lg focus-within:ring-1 focus-within:ring-ring overflow-hidden">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Napisz wiadomość... (Enter = wyślij, Shift+Enter = nowa linia)"
              className="border-0 rounded-none focus-visible:ring-0 text-sm bg-background"
            />
            <div className="flex items-center justify-between px-3 py-2 border-t bg-muted/20">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Paperclip className="w-3.5 h-3.5" />
                </Button>
                <span className="text-xs text-muted-foreground">+0 tokenów</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground">Shift + Enter nowa linia</span>
                <Button size="sm" className="h-7 gap-1.5 text-xs">
                  <Send className="w-3.5 h-3.5" /> Wyślij
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
