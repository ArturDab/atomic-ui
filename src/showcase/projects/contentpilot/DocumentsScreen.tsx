import * as React from 'react'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import {
  SidePanel, SidePanelHeader, SidePanelAction, SidePanelSearch,
  SidePanelToolbar, SidePanelNote, SidePanelItem, SidePanelItemTitle,
  SidePanelItemMeta, SidePanelList,
} from './_SidePanel'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  FilePlus2, FolderOpen, Star, ChevronDown, Trash2, Copy,
  Download, Wand2, Undo2, Redo2, Bold, Italic, Underline,
  Strikethrough, Code, Highlighter, List, ListOrdered, AlignLeft,
  AlignCenter, AlignRight, AlignJustify, Quote, Minus, Link2, Type,
  ChevronRight, FolderClosed, FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const FOLDERS = [
  { id: 'interia',   name: 'Interia',   count: 0, documents: [] },
  { id: 'dokumenty', name: 'Dokumenty', count: 1,
    documents: [{ id: 'd2', name: 'Nowy dokument', date: '27 mar', active: true }] },
]

const TOOLBAR_GROUPS = [
  [{ icon: Undo2 }, { icon: Redo2 }],
  [{ label: '¶' }, { label: 'H1' }, { label: 'H2' }, { label: 'H3' }],
  [{ icon: Bold }, { icon: Italic }, { icon: Underline }, { icon: Strikethrough }, { icon: Code }, { icon: Highlighter }],
  [{ icon: List }, { icon: ListOrdered }],
  [{ icon: AlignLeft }, { icon: AlignCenter }, { icon: AlignRight }, { icon: AlignJustify }],
  [{ icon: Quote }, { icon: Minus }, { icon: Link2 }, { icon: Type }],
]

export default function DocumentsScreen() {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set(['dokumenty']))
  const [aiPanelOpen, setAiPanelOpen] = React.useState(false)

  const toggleFolder = (id: string) =>
    setExpandedFolders(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="documents" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'Dokumenty' }]} />
        <div className="flex flex-1 overflow-hidden">

          <SidePanel>
            <SidePanelHeader>
              <SidePanelAction icon={FilePlus2} label="Nowy dokument" />
              <Button variant="outline" size="icon" className="h-10 w-10 shrink-0">
                <FolderOpen className="w-4 h-4" />
              </Button>
            </SidePanelHeader>
            <SidePanelSearch placeholder="Szukaj" />
            <SidePanelToolbar>
              <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-foreground text-background text-xs font-medium">
                <span className="text-[10px]">↕</span> Najnowsze
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1">
                Zaznacz
              </button>
            </SidePanelToolbar>
            <SidePanelNote>Sortowanie aktywne · przeciąganie wyłączone</SidePanelNote>
            <SidePanelList>
              {/* Gwiazdkowany dokument */}
              <SidePanelItem className="bg-amber-50 hover:bg-amber-100">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0 mt-0.5" />
                <SidePanelItemTitle className="font-medium">Nowy dokument</SidePanelItemTitle>
              </SidePanelItem>

              {/* Foldery */}
              {FOLDERS.map(folder => (
                <div key={folder.id}>
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full flex items-center gap-2 px-4 py-3 border-b hover:bg-muted/50 transition-colors"
                  >
                    {expandedFolders.has(folder.id)
                      ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
                    <FolderClosed className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    <span className="text-sm flex-1 text-left">{folder.name}</span>
                    <span className="text-xs text-muted-foreground/60">{folder.count}</span>
                  </button>

                  {expandedFolders.has(folder.id) && (
                    <div>
                      {folder.documents.length === 0 ? (
                        <p className="px-8 py-3 text-xs text-muted-foreground/50 italic border-b">
                          Przeciągnij elementy tutaj
                        </p>
                      ) : (
                        folder.documents.map(doc => (
                          <button key={doc.id}
                            className={cn(
                              'w-full flex items-center gap-3 px-8 py-3 border-b hover:bg-muted/50 transition-colors border-l-2',
                              doc.active ? 'bg-muted border-l-foreground' : 'border-l-transparent'
                            )}>
                            <FileText className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-sm truncate">{doc.name}</p>
                              <p className="text-xs text-muted-foreground">Dokumenty · {doc.date}</p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </SidePanelList>
          </SidePanel>

          {/* Edytor */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="h-12 border-b flex items-center px-5 gap-3 shrink-0">
              <h1 className="text-base font-semibold flex-1">Nowy dokument</h1>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </Button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground border rounded-md px-2.5 py-1.5 hover:bg-muted/40 transition-colors">
                <span className="w-3 h-3 rounded-full border border-muted-foreground/40 inline-block" />
                Bez projektu <ChevronDown className="w-3 h-3" />
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
                      <button key={bi} className="h-7 w-7 rounded flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0">
                        {'icon' in btn && btn.icon && <btn.icon className="w-3.5 h-3.5" />}
                      </button>
                    )
                  ))}
                </React.Fragment>
              ))}
            </div>

            <ScrollArea className="flex-1">
              <div className="max-w-2xl mx-auto px-8 py-10">
                <p className="text-muted-foreground/50 text-base">Zacznij pisać...</p>
              </div>
            </ScrollArea>
          </div>

          {/* Panel AI – zwinięty */}
          <div className={cn('border-l flex flex-col shrink-0 transition-all overflow-hidden', aiPanelOpen ? 'w-72' : 'w-9')}>
            <button onClick={() => setAiPanelOpen(o => !o)}
              className="h-12 flex items-center justify-center hover:bg-muted/40 transition-colors shrink-0 border-b">
              <Wand2 className="w-4 h-4 text-muted-foreground" />
            </button>
            {aiPanelOpen && (
              <div className="flex-1 p-4">
                <p className="text-sm font-medium mb-1">Panel AI asystenta</p>
                <p className="text-xs text-muted-foreground">Zaznacz fragment tekstu, aby użyć asystenta.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
