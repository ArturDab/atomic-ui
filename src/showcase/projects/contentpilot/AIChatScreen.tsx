import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { cn } from '@/lib/utils'
import {
  Plus, CheckSquare, ChevronDown, ChevronUp,
  Paperclip, Send, Sparkles, Copy, ThumbsUp,
  ThumbsDown, RotateCcw, Clock,
} from 'lucide-react'

const CHAT_LIST = [
  { id: '1', title: 'Jeśli poproszę Cię tutaj o kod HTML newslettera, t...', time: '20 mar, 21:47', active: true },
  { id: '2', title: 'Sprawdzam Cię ;)', time: '20 mar, 21:47' },
  { id: '3', title: 'OK, sprawdzam, czy działa, czy rozmawiam z Kimś z...', time: '20 mar, 21:47' },
  { id: '4', title: 'Sprawdzam, czy wszystko działa, czy jesteśmy połąc...', time: '20 mar, 21:47' },
  { id: '5', title: 'Sprawdzam Cię ;)', time: '20 mar, 21:47' },
  { id: '6', title: 'test', time: '20 mar, 21:47' },
  { id: '7', title: 'COPY & PASTE THIS PROMPT INTO AI: Role: You are a...', time: '20 mar, 21:47' },
  { id: '8', title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar, 21:47' },
  { id: '9', title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar, 21:47' },
  { id: '10', title: 'Role: You are a World-Class UI/UX Designer and HTM...', time: '20 mar, 21:47' },
  { id: '11', title: 'Czy działasz?', time: '20 mar, 21:47' },
  { id: '12', title: 'Jesteś?', time: '20 mar, 21:47' },
  { id: '13', title: 'test', time: '20 mar, 21:47' },
  { id: '14', title: 'Zrób mi jakiś przykładowy artifact.', time: '20 mar, 21:47' },
  { id: '15', title: 'Napisz bardzo szczegółowy przewodnik po historii s...', time: '20 mar, 21:47' },
  { id: '16', title: 'test', time: '20 mar, 21:47' },
  { id: '17', title: 'test', time: '20 mar, 21:47' },
  { id: '18', title: 'Nowa konwersacja', time: '20 mar, 21:47' },
  { id: '19', title: 'test', time: '20 mar, 21:47' },
  { id: '20', title: 'test', time: '20 mar, 21:47' },
]

const CODE_SNIPPET = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>Newsletter</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #fff; }
    .header { background: #00C896; padding: 24px; text-align: center; }
    .content { padding: 32px 24px; }
    .footer { padding: 16px 24px; background: #f5f5f5; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="https://placeholder.com/200x60/logo.png" alt="Logo" width="200">
    </div>
    <div class="content">
      <!-- treść newslettera -->
    </div>
    <div class="footer">
      <!-- stopka -->
    </div>
  </div>
</body>
</html>`

export default function AIChatScreen() {
  const [systemPromptOpen, setSystemPromptOpen] = React.useState(false)
  const [input, setInput] = React.useState('')
  const [tokens] = React.useState(0)

  return (
    <div className="flex h-full bg-white">
      <CPSidebar active="ai-chat" />

      {/* Chat list */}
      <div className="w-[280px] border-r flex flex-col bg-white shrink-0">
        {/* Header */}
        <div className="px-3 pt-3 pb-2">
          <button className="w-full flex items-center justify-center gap-2 bg-[#00C896] hover:bg-[#00b589] text-white text-sm font-semibold rounded-lg py-2.5 px-4 transition-colors">
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Nowy czat
          </button>
        </div>

        <div className="px-3 py-1.5 flex items-center justify-between">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <CheckSquare className="w-3.5 h-3.5" />
            Zaznacz
          </button>
        </div>

        <div className="px-3 py-1">
          <p className="text-[10px] text-muted-foreground/60">Sortowanie aktywne · przeciąganie wyłączone</p>
        </div>

        {/* Chat items */}
        <div className="flex-1 overflow-y-auto">
          {CHAT_LIST.map(chat => (
            <button
              key={chat.id}
              className={cn(
                'w-full text-left px-3 py-2.5 border-b border-border/40 hover:bg-muted/40 transition-colors',
                chat.active && 'bg-[#00C896]/8 border-l-2 border-l-[#00C896]'
              )}
            >
              <p className={cn(
                'text-xs leading-snug line-clamp-1',
                chat.active ? 'font-medium text-foreground' : 'text-foreground/80'
              )}>
                {chat.title}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{chat.time}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Title bar */}
        <div className="h-12 border-b flex items-center px-6 gap-3 shrink-0">
          <h1 className="text-sm font-semibold text-foreground flex-1 truncate">
            Jeśli poproszę Cię tutaj o kod HTML newslettera, t...
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono">GPT-4o</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {/* System prompt bar */}
          <div className="border-b bg-muted/20">
            <button
              className="w-full flex items-center justify-between px-6 py-3 hover:bg-muted/40 transition-colors"
              onClick={() => setSystemPromptOpen(o => !o)}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">Prompt systemowy</span>
              </div>
              {systemPromptOpen
                ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              }
            </button>
            {systemPromptOpen && (
              <div className="px-6 pb-4">
                <div className="rounded-lg bg-muted/60 p-3 font-mono text-xs text-muted-foreground leading-relaxed">
                  Role: You are a World-Class UI/UX Designer and HTML Email Developer with 15+ years of experience creating professional, visually stunning email templates...
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-6 space-y-6 max-w-4xl mx-auto w-full">
            {/* Assistant message with code */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00C896] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold">ASYSTENT</span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5 font-mono">GPT-4o</span>
                  <span className="text-[10px] text-muted-foreground">13:24</span>
                </div>

                {/* Code block */}
                <div className="rounded-lg border bg-[#0f1117] overflow-hidden mb-3">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                    <span className="text-xs text-white/50 font-mono">html</span>
                    <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white/80 transition-colors">
                      <Copy className="w-3 h-3" />
                      Kopiuj
                    </button>
                  </div>
                  <pre className="px-4 py-3 text-xs text-green-400/90 font-mono leading-relaxed overflow-x-auto max-h-48">
{CODE_SNIPPET}
                  </pre>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  This HTML template follows your provided guidelines, featuring a single-column layout, inline CSS for compatibility, and placeholders for images. Adjust the colors and content to match your brand.
                </p>

                {/* Message meta */}
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 2010 tokenów · 9.65s
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><RotateCcw className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* User message */}
            <div className="flex justify-end gap-3">
              <div className="max-w-[70%]">
                <div className="bg-[#00C896] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
                  Czy możesz wyświetlić mi ten kod z podglądem w bocznej kolumnie jako artefakt?
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[10px] text-muted-foreground">13:24</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#00C896] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white">
                U
              </div>
            </div>

            {/* Assistant reply */}
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-[#00C896] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold">ASYSTENT</span>
                  <span className="text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5 font-mono">GPT-4o</span>
                  <span className="text-[10px] text-muted-foreground">13:24</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  Niestety, nie jestem w stanie bezpośrednio wyświetlić kodu HTML jako artefaktu z podglądem w bocznej kolumnie. Jednak mogę dostarczyć ci kod HTML, który możesz skopiować i wkleić do edytora HTML lub platformy do tworzenia e-maili, aby zobaczyć, jak wygląda w przeglądarce. Jeśli masz inne pytania dotyczące kodu lub potrzebujesz dalszej pomocy, daj mi znać!
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 2795 tokenów · 1.92s
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><RotateCcw className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-muted-foreground hover:text-foreground rounded transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="border-t px-6 py-4 bg-white">
          <div className="border rounded-xl bg-muted/20 focus-within:border-ring/50 transition-colors">
            <div className="px-4 py-3">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Napisz wiadomość... (Enter = wyślij, Shift+Enter = nowa linia)"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2 border-t border-border/40">
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <span className="text-xs text-muted-foreground">+{tokens} tokenów</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Shift + Enter nowa linia</span>
                <button className="w-8 h-8 rounded-lg bg-[#00C896] hover:bg-[#00b589] flex items-center justify-center transition-colors">
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
