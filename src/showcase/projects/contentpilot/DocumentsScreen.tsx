import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  FilePlus2, FolderOpen, Search, Star, ChevronDown,
  Trash2, Copy, Download, Wand2, Undo2, Redo2,
  Bold, Italic, Underline, Strikethrough, Code,
  Highlighter, List, ListOrdered, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Quote, Minus, Link2, Type,
  ChevronRight, FolderClosed, FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Dane ──────────────────────────────────────────────────────────────────────

const FOLDERS = [
  {
    id: 'interia', name: 'Interia', count: 0,
    documents: [],
  },
  {
    id: 'dokumenty', name: 'Dokumenty', count: 1,
    documents: [
      { id: 'd2', name: 'Nowy dokument', date: '27 mar', active: true },
    ],
  },
]

const TOOLBAR_GROUPS = [
  [{ icon: Undo2 }, { icon: Redo2 }],
  [{ label: '¶' }, { label: 'H1' }, { label: 'H2' }, { label: 'H3' }],
  [{ icon: Bold, active: false }, { icon: Italic }, { icon: Underline }, { icon: Strikethrough }, { icon: Code }, { icon: Highlighter }],
  [{ icon: List }, { icon: ListOrdered }],
  [{ icon: AlignLeft }, { icon: AlignCenter }, { icon: AlignRight }, { icon: AlignJustify }],
  [{ icon: Quote }, { icon: Minus }, { icon: Link2 }, { icon: Type }],
]

// ── Screen ────────────────────────────────────────────────────────────────────

export default function DocumentsScreen() {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set(['dokumenty']))
  const [aiPanelOpen, setAiPanelOpen] = React.useState(false)
  const [starred] = React.useState(true)

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="documents" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'Dokumenty' }]} />

        <div className="flex flex-1 overflow-hidden">

          {/* Lewy panel */}
          <div className="w-80 border-r flex flex-col shrink-0">

            {/* Nowy dokument + folder */}
            <div className="p-3 border-b flex items-center gap-2">
              <Button className="flex-1 gap-2 justify-start text-sm h-9">
                <FilePlus2 className="w-4 h-4" />
                Nowy dokument
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                <FolderOpen className="w-4 h-4" />
              </Button>
            </div>

            {/* Szukaj */}
            <div className="px-3 py-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input placeholder="Szukaj" className="pl-8 h-8 text-sm bg-muted/40 border-0 focus-visible:ring-0" />
              </div>
            </div>

            {/* Tabs */}
            <div className="px-3 py-2 border-b flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-foreground text-background text-xs font-medium">
                <span className="text-[10px]">↕</span> Najnowsze
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                Zaznacz
              </button>
            </div>
            <p className="px-3 py-1.5 text-[10px] text-muted-foreground/60 border-b">
              Sortowanie aktywne · przeciąganie wyłączone
            </p>

            <ScrollArea className="flex-1">
              {/* Gwiazdkowany dokument */}
              <button className="w-full text-left px-3 py-2.5 flex items-center gap-2 bg-amber-50 border-b hover:bg-amber-100 transition-colors">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                <span className="text-sm font-medium">Nowy dokument</span>
              </button>

              {/* Foldery */}
              {FOLDERS.map(folder => (
                <div key={folder.id}>
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted/40 transition-colors"
                  >
                    {expandedFolders.has(folder.id)
                      ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    }
                    <FolderClosed className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm flex-1 text-left">{folder.name}</span>
                    <span className="text-xs text-muted-foreground/60">{folder.count}</span>
                  </button>

                  {expandedFolders.has(folder.id) && (
                    <div className="ml-6">
                      {folder.documents.length === 0 ? (
                        <p className="px-3 py-2 text-xs text-muted-foreground/50 italic">
                          Przeciągnij elementy tutaj
                        </p>
                      ) : (
                        folder.documents.map(doc => (
                          <button
                            key={doc.id}
                            className={cn(
                              'w-full flex items-center gap-2 px-3 py-2 hover:bg-muted/40 transition-colors border-l-2',
                              doc.active ? 'bg-muted/60 border-l-foreground' : 'border-l-transparent'
                            )}
                          >
                            <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-sm truncate">{doc.name}</p>
                              <p className="text-[10px] text-muted-foreground">
                                Dokumenty · {doc.date}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Edytor */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Nagłówek dokumentu */}
            <div className="h-12 border-b flex items-center px-5 gap-3 shrink-0">
              <h1 className="text-base font-semibold flex-1">Nowy dokument</h1>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Star className={cn('w-4 h-4', starred && 'fill-amber-400 text-amber-400')} />
              </Button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground border rounded-md px-2.5 py-1.5 hover:bg-muted/40 transition-colors">
                <span className="w-3 h-3 rounded-full border border-muted-foreground/40 inline-block" />
                Bez projektu
                <ChevronDown className="w-3 h-3" />
              </button>
              <div className="flex items-center gap-1 ml-auto">
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
                  <Wand2 className="w-3.5 h-3.5" /> AI
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-sm">
                  <Copy className="w-3.5 h-3.5" /> Kopiuj
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-5 mx-1" />
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Toolbar formatowania */}
            <div className="h-11 border-b flex items-center px-4 gap-1 shrink-0 overflow-x-auto">
              {TOOLBAR_GROUPS.map((group, gi) => (
                <React.Fragment key={gi}>
                  {gi > 0 && <div className="w-px h-5 bg-border mx-1 shrink-0" />}
                  {group.map((btn, bi) => (
                    'label' in btn ? (
                      <button key={bi} className="h-7 px-2 rounded text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0">
                        {btn.label}
                      </button>
                    ) : (
                      <button
                        key={bi}
                        className={cn(
                          'h-7 w-7 rounded flex items-center justify-center transition-colors shrink-0',
                          (btn as { active?: boolean }).active
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {'icon' in btn && btn.icon && <btn.icon className="w-3.5 h-3.5" />}
                      </button>
                    )
                  ))}
                </React.Fragment>
              ))}
            </div>

            {/* Obszar pisania */}
            <ScrollArea className="flex-1">
              <div className="max-w-2xl mx-auto px-8 py-10">
                <p className="text-muted-foreground/50 text-base">Zacznij pisać...</p>
              </div>
            </ScrollArea>
          </div>

          {/* Prawy panel AI – zwinięty */}
          <div className={cn(
            'border-l flex flex-col shrink-0 transition-all overflow-hidden',
            aiPanelOpen ? 'w-72' : 'w-9'
          )}>
            <button
              onClick={() => setAiPanelOpen(o => !o)}
              className="h-12 flex items-center justify-center hover:bg-muted/40 transition-colors shrink-0 border-b"
            >
              <Wand2 className="w-4 h-4 text-muted-foreground" />
            </button>
            {aiPanelOpen && (
              <div className="flex-1 p-4">
                <p className="text-xs text-muted-foreground">Panel AI asystenta</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
