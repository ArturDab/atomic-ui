/**
 * Documents 2.0
 *
 * Kluczowe zmiany vs v1:
 * 1. Full-width domyślnie – edytor bez lewego panelu po otwarciu dokumentu
 * 2. Lewy panel slide-in – widoczny gdy przeglądasz dokumenty, chowa się gdy piszesz
 * 3. AI jako floating action – pływający przycisk zamiast schowanej ikonki,
 *    otwiera slide-in panel z prawej z pełnym kontekstem
 * 4. Toolbar above content, nie nad całym ekranem – dotyczy tylko edytora
 * 5. Document breadcrumb z metadanymi – folder, projekt, ostatnia edycja
 */
import * as React from 'react'
import { CP2Sidebar } from './_Sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import {
  FilePlus2, FolderPlus, Search, Star, ChevronDown,
  ChevronRight, FileText, FolderClosed, Trash2, Copy, Download,
  Wand2, Sparkles, Bold, Italic, Underline, List, ListOrdered,
  AlignLeft, AlignCenter, Quote, Minus, Link2, Undo2, Redo2,
  PanelLeft, X, Clock, Hash,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const DOC_CONTENT = [
  { type: 'h1', text: 'Jak Stworzyć Skuteczny Zespół Agentów AI?' },
  { type: 'p',  text: 'Tworzenie skutecznego zespołu agentów AI to wyzwanie, które wymaga starannego planowania i kluczowej strategii. Agenci AI mogą przekształcić sposób funkcjonowania firm, zwiększając efektywność i wspierając innowacje.' },
  { type: 'h2', text: '1. Zrozum cel i zakres działań' },
  { type: 'p',  text: 'Przed rozpoczęciem budowania zespołu agentów AI, kluczowe jest dokładne zrozumienie ich roli i celów:' },
  { type: 'li', text: '**Określenie celów biznesowych:** Upewnij się, że cele agentów są zgodne z ogólnymi strategiami firmy.' },
  { type: 'li', text: '**Identyfikacja zadań:** Jasno określ, jakie zadania agenci będą realizować.' },
  { type: 'h2', text: '2. Wybór odpowiednich narzędzi' },
  { type: 'p',  text: 'Agenci AI wymagają odpowiedniego zaplecza technologicznego, aby działać skutecznie.' },
]

export default function DocumentsScreen() {
  const [leftOpen, setLeftOpen] = React.useState(true)
  const [aiOpen, setAiOpen] = React.useState(false)
  const [expandedFolders, setExpandedFolders] = React.useState(new Set(['dokumenty']))

  const toggleFolder = (id: string) =>
    setExpandedFolders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((p, i) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={i}>{p.slice(2, -2)}</strong>
        : p
    )
  }

  return (
    <div className="flex h-full bg-background">
      <CP2Sidebar active="documents" />

      {/* Toggleable left panel */}
      {leftOpen && (
        <div className="w-60 border-r flex flex-col shrink-0">
          <div className="p-3 border-b flex items-center gap-2">
            <Button className="flex-1 gap-2 justify-start h-9 text-sm">
              <FilePlus2 className="w-4 h-4 shrink-0 mr-0" /> Nowy dokument
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
              <FolderPlus className="w-4 h-4" />
            </Button>
          </div>

          <div className="px-3 py-2 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input placeholder="Szukaj" className="pl-8 h-8 text-sm bg-muted/30 border-0 focus-visible:ring-0" />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {/* Starred */}
            <button className="w-full text-left px-4 py-2.5 flex items-center gap-2.5 border-b bg-amber-50 hover:bg-amber-100 transition-colors">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-sm font-medium line-clamp-2 text-left leading-snug">Jak Stworzyć Skuteczny Zespół Agentów AI?</span>
            </button>

            {/* Folders */}
            {[
              { id: 'interia', name: 'Interia', count: 3, docs: [
                { name: 'Newsy o grach – Q1 2025', date: '2 godz. temu', active: true },
                { name: 'Recenzja Clair Obscur', date: 'wczoraj' },
              ]},
              { id: 'dokumenty', name: 'Dokumenty', count: 2, docs: [
                { name: 'Jak Stworzyć Skuteczny Zespół...', date: '27 mar' },
              ]},
            ].map(folder => (
              <div key={folder.id}>
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 border-b hover:bg-muted/50 transition-colors group"
                >
                  {expandedFolders.has(folder.id)
                    ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                  <FolderClosed className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span className="text-sm flex-1 text-left">{folder.name}</span>
                  <span className="text-xs text-muted-foreground/60">{folder.count}</span>
                </button>
                {expandedFolders.has(folder.id) && folder.docs.map((doc, i) => (
                  <button key={i} className={cn(
                    'w-full flex items-center gap-2.5 pl-9 pr-4 py-2.5 border-b hover:bg-muted/50 transition-colors border-l-2',
                    (doc as any).active ? 'bg-muted border-l-foreground' : 'border-l-transparent'
                  )}>
                    <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm line-clamp-2 leading-snug">{doc.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{doc.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </ScrollArea>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Document header – minimalistyczny, metadata w jednej linii */}
        <div className="h-14 border-b flex items-center px-5 gap-3 shrink-0">
          {!leftOpen && (
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setLeftOpen(true)}>
              <PanelLeft className="w-4 h-4" />
            </Button>
          )}
          {leftOpen && (
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setLeftOpen(false)}>
              <PanelLeft className="w-4 h-4" />
            </Button>
          )}

          {/* Breadcrumb z metadanymi */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-1 min-w-0">
            <span className="hover:text-foreground cursor-pointer transition-colors">Interia</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium truncate">Jak Stworzyć Skuteczny Zespół Agentów AI?</span>
          </div>

          {/* Meta + actions */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" /> 2 godz. temu
            </span>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Hash className="w-3 h-3" /> 820 słów
            </span>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
              <Copy className="w-3.5 h-3.5" /> Kopiuj
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Toolbar – minimalistyczny, tylko najważniejsze */}
        <div className="border-b flex items-center px-5 gap-0.5 h-10 shrink-0 overflow-x-auto">
          {[[Undo2, Redo2], [Bold, Italic, Underline], [List, ListOrdered], [AlignLeft, AlignCenter], [Quote, Minus, Link2]].map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <div className="w-px h-4 bg-border mx-1.5 shrink-0" />}
              {group.map((Icon, bi) => (
                <button key={bi} className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Content – full width, max-width centered */}
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto px-8 py-10">
            {DOC_CONTENT.map((block, i) => {
              switch (block.type) {
                case 'h1': return <h1 key={i} className="text-2xl font-bold mb-4 mt-2">{block.text}</h1>
                case 'h2': return <h2 key={i} className="text-lg font-bold mb-3 mt-6">{block.text}</h2>
                case 'p':  return <p key={i} className="text-base leading-relaxed mb-3 text-foreground">{block.text}</p>
                case 'li': return (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-muted-foreground mt-1.5 shrink-0">•</span>
                    <p className="text-base leading-relaxed">{formatBold(block.text)}</p>
                  </div>
                )
              }
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Floating AI button */}
      {!aiOpen && (
        <button
          onClick={() => setAiOpen(true)}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-foreground text-background shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-10"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      )}

      {/* AI slide-in panel */}
      {aiOpen && (
        <div className="w-72 border-l flex flex-col shrink-0 bg-background">
          <div className="h-12 border-b flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Asystent AI</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setAiOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3 text-center">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Wand2 className="w-5 h-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-medium">Co chcesz poprawić?</p>
            <p className="text-xs text-muted-foreground">Zaznacz fragment tekstu lub opisz, co zmienić.</p>
            <Separator className="w-full" />
            <div className="w-full space-y-1.5">
              {['Popraw gramatykę i styl', 'Skróć ten akapit', 'Przetłumacz na angielski', 'Dodaj więcej szczegółów'].map(s => (
                <button key={s} className="w-full text-left text-xs px-3 py-2 border rounded-lg hover:bg-muted transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3 border-t">
            <div className="border rounded-lg overflow-hidden">
              <textarea
                placeholder="Opisz co zmienić..."
                rows={2}
                className="w-full resize-none px-3 py-2.5 text-sm outline-none bg-transparent placeholder:text-muted-foreground"
              />
              <div className="flex justify-end px-2 py-1.5 border-t bg-muted/20">
                <Button size="sm" className="h-7 text-xs gap-1">
                  <Send className="w-3 h-3" /> Wyślij
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

import { Send } from 'lucide-react'
