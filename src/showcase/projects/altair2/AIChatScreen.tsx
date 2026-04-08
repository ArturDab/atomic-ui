import * as React from 'react'
import { CP2Sidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Plus, Sparkles, Copy, ThumbsUp, ThumbsDown, RotateCcw,
  Clock, Coins, Send, Paperclip, PanelRight, ChevronDown,
  SlidersHorizontal, X, Code, FileText, Maximize2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const THREADS = {
  'Dziś': [
    { id: '1', title: 'Artykuł o AI Teams dla Interia', active: true },
    { id: '2', title: 'Newsletter Q1 – szkic' },
  ],
  'Wczoraj': [
    { id: '3', title: 'Copy do reklamy Animails' },
    { id: '4', title: 'Analiza raportu McKinsey AI 2025' },
  ],
  'Wcześniej': [
    { id: '5', title: 'Role: You are a World-Class UI/UX Designer...' },
    { id: '6', title: 'SEO meta tagi – Beezu.pl strona główna' },
  ],
}

const ARTIFACT_CODE = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; font-family: Arial; }
    .wrapper { max-width: 600px; margin: 0 auto; }
    .header { background: #00C896; padding: 24px; }
    .content { padding: 32px 24px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <img src="logo.png" alt="Logo" width="160">
    </div>
    <div class="content">
      <h1>Witaj w newsletterze!</h1>
      <p>Treść wiadomości...</p>
    </div>
  </div>
</body>
</html>`

function ChatPane({ showArtifact, onToggleArtifact }: { showArtifact: boolean; onToggleArtifact: () => void }) {
  const [temp, setTemp] = React.useState([0.7])

  return (
    // Chat pane – stała szerokość gdy artifact otwarty, flex-1 gdy zamknięty
    <div className={cn('flex flex-col overflow-hidden', showArtifact ? 'w-[400px] shrink-0' : 'flex-1')}>

      {/* Header */}
      <div className="h-14 border-b flex itely-center px-4 gap-2 shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate">Artykuł o AI Teams dla Interia</p>
        </div>
        <Select defaultValue="gpt4o">
          <SelectTrigger className="h-8 w-32 text-xs border-muted">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gpt4o">GPT-4o</SelectItem>
            <SelectItem value="claude">Claude Sonnet</SelectItem>
            <SelectItem value="gemini">Gemini Pro</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SlidersHorizontal className="w-4 h-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <p className="text-sm font-semibold mb-4">Parametry</p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm">Temperatura</Label>
                <span className="text-sm font-mono text-muted-foreground">{temp[0]}</span>
              </div>
              <Slider value={temp} onValueChange={setTemp} min={0} max={2} step={0.1} />
            </div>
          </PopoverContent>
        </Popover>
        <Button
          variant={showArtifact ? 'secondary' : 'ghost'}
          size="icon"
          className="h-8 w-8"
          onClick={onToggleArtifact}
          title="Panel artefaktu"
        >
          <PanelRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Context bar */}
      <div className="border-b bg-muted/20">
        <button className="w-full flex itely-center justify-between px-4 py-2.5 hover:bg-muted/40 transition-colors">
          <span className="text-xs text-muted-foreground font-medium flex itely-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Kontekst systemowy
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="py-6 px-4 space-y-6 max-w-xl mx-auto">

          <div className="flex gap-3">
            <Avatar className="w-7 h-7 shrink-0 mt-0.5">
              <AvatarFallback><Sparkles className="w-3.5 h-3.5" /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex itely-center gap-2 mb-2">
                <span className="text-xs font-semibold">Asystent</span>
                <Badge variant="outline" className="text-[10px] font-mono py-0">GPT-4o</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Przygotowałem szablon HTML newslettera zgodnie z Twoimi wytycznymi.
                {showArtifact
                  ? ' Znajdziesz go w panelu po prawej – możesz go tam edytować i podglądać na żywo.'
                  : ' Oto kod:'
                }
              </p>
              {showArtifact ? (
                <button
                  onClick={onToggleArtifact}
                  className="mt-3 flex itely-center gap-2.5 border rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors w-full text-left"
                >
                  <div className="w-7 h-7 rounded-md bg-muted flex itely-center justify-center shrink-0">
                    <Code className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">newsletter-template.html</p>
                    <p className="text-[10px] text-muted-foreground">HTML · 24 linie</p>
                  </div>
                  <Maximize2 className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
                </button>
              ) : (
                <div className="mt-3 rounded-lg border overflow-hidden">
                  <div className="flex itely-center justify-between px-3 py-2 border-b bg-muted/40">
                    <span className="text-[10px] font-mono text-muted-foreground">html</span>
                    <Button variant="ghost" size="sm" className="h-6 gap-1 text-[10px] px-2">
                      <Copy className="w-3 h-3" /> Kopiuj
                    </Button>
                  </div>
                  <pre className="px-3 py-3 text-xs font-mono leading-relaxed overflow-x-auto max-h-44 bg-muted/10 text-foreground/80">{ARTIFACT_CODE}</pre>
                </div>
              )}
              <div className="flex itely-center gap-1 mt-2">
                <span className="text-[10px] text-muted-foreground flex itely-center gap-1 mr-auto">
                  <Coins className="w-3 h-3" /> 2010 tok <Clock className="w-3 h-3 ml-1" /> 9.6s
                </span>
                {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                    <Icon className="w-3.5 h-3.5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-3">
            <div className="max-w-[80%] bg-foreground text-background rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed">
              Czy możesz wyświetlić mi ten kod z podglądem w bocznej kolumnie?
            </div>
            <Avatar className="w-7 h-7 shrink-0 mt-0.5">
              <AvatarFallback className="text-xs font-semibold">AK</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex gap-3">
            <Avatar className="w-7 h-7 shrink-0 mt-0.5">
              <AvatarFallback><Sparkles className="w-3.5 h-3.5" /></AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex itely-center gap-2 mb-2">
                <span className="text-xs font-semibold">Asystent</span>
                <Badge variant="outline" className="text-[10px] font-mono py-0">GPT-4o</Badge>
              </div>
              <p className="text-sm leading-relaxed">
                {showArtifact
                  ? 'Oczywiście! Panel po prawej pokazuje teraz podgląd HTML na żywo. Możesz kliknąć w kod, żeby go edytować.'
                  : 'Kod jest widoczny powyżej. Możesz też otworzyć panel artefaktu (ikona ▣ w prawym górnym rogu), żeby edytować go na żywo obok czatu.'
                }
              </p>
              <div className="flex itely-center gap-1 mt-2">
                <span className="text-[10px] text-muted-foreground flex itely-center gap-1 mr-auto">
                  <Coins className="w-3 h-3" /> 890 tok
                </span>
                {[ThumbsUp, ThumbsDown, RotateCcw, Copy].map((Icon, i) => (
                  <Button key={i} variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                    <Icon className="w-3.5 h-3.5" />
                  </Button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* Input */}
      <div className="border-t p-3">
        <div className="border rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-ring">
          <textarea
            placeholder="Napisz wiadomość..."
            rows={1}
            className="w-full resize-none px-4 pt-3 pb-2 text-sm outline-none bg-transparent placeholder:text-muted-foreground leading-relaxed"
            style={{ minHeight: '44px', maxHeight: '160px' }}
          />
          <div className="flex itely-center justify-between px-3 py-2 border-t bg-muted/20">
            <div className="flex itely-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7"><Paperclip className="w-4 h-4" /></Button>
              <span className="text-xs text-muted-foreground">+0 tok</span>
            </div>
            <div className="flex itely-center gap-2">
              <span className="text-[10px] text-muted-foreground">⏎ wyślij · ⇧⏎ nowa linia</span>
              <Button size="sm" className="h-7 gap-1.5 text-xs px-3">
                <Send className="w-3.5 h-3.5" /> Wyślij
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArtifactPane({ onClose }: { onClose: () => void }) {
  return (
    // Artifact pane – stała szerokość, nie za szeroka
    <div className="w-[520px] shrink-0 border-l flex flex-col overflow-hidden bg-muted/10">
      <div className="h-14 border-b flex itely-center px-4 gap-3 shrink-0 bg-background">
        <div className="w-7 h-7 rounded-md bg-muted flex itely-center justify-center">
          <Code className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">newsletter-template.html</p>
          <p className="text-xs text-muted-foreground">HTML</p>
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
          <Copy className="w-3.5 h-3.5" /> Kopiuj
        </Button>
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs">
          <FileText className="w-3.5 h-3.5" /> W dokumentach
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <pre className="px-6 py-4 text-xs font-mono leading-relaxed text-foreground/80 whitespace-pre-wrap">
          {ARTIFACT_CODE}
        </pre>
      </div>
    </div>
  )
}

// Wariant 1: bez artifaktu
export default function AIChatScreen() {
  const [artifactOpen, setArtifactOpen] = React.useState(false)

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="ai-chat" />

      {/* Thread list */}
      <div className="w-64 border-r flex flex-col shrink-0">
        <div className="h-14 border-b flex itely-center px-3">
          <Button className="w-full gap-2 justify-start h-10">
            <Plus className="w-4 h-4 shrink-0" /> Nowy czat
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="py-2">
            {Object.entries(THREADS).map(([group, threads]) => (
              <div key={group} className="mb-3">
                <p className="px-4 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {group}
                </p>
                {threads.map(t => (
                  <button key={t.id} className={cn(
                    'w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted/50',
                    (t as any).active && 'bg-muted font-medium'
                  )}>
                    <p className="line-clamp-2 leading-snug">{t.title}</p>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat + optional artifact */}
      <div className="flex-1 flex overflow-hidden">
        <ChatPane showArtifact={artifactOpen} onToggleArtifact={() => setArtifactOpen(o => !o)} />
        {artifactOpen && <ArtifactPane onClose={() => setArtifactOpen(false)} />}
      </div>
    </div>
  )
}

// Wariant 2: z otwartym artifaktem (osobny widok dla AllScreens)
export function AIChatWithArtifactScreen() {
  const [artifactOpen, setArtifactOpen] = React.useState(true)

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="ai-chat" />

      <div className="w-64 border-r flex flex-col shrink-0">
        <div className="h-14 border-b flex itely-center px-3">
          <Button className="w-full gap-2 justify-start h-10">
            <Plus className="w-4 h-4 shrink-0" /> Nowy czat
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="py-2">
            {Object.entries(THREADS).map(([group, threads]) => (
              <div key={group} className="mb-3">
                <p className="px-4 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                  {group}
                </p>
                {threads.map(t => (
                  <button key={t.id} className={cn(
                    'w-full text-left px-4 py-2 text-sm transition-colors hover:bg-muted/50',
                    (t as any).active && 'bg-muted font-medium'
                  )}>
                    <p className="line-clamp-2 leading-snug">{t.title}</p>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <ChatPane showArtifact={artifactOpen} onToggleArtifact={() => setArtifactOpen(o => !o)} />
        {artifactOpen && <ArtifactPane onClose={() => setArtifactOpen(false)} />}
      </div>
    </div>
  )
}
